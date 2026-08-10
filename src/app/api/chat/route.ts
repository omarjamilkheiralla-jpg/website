import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { systemPromptFor } from "@/lib/chat/knowledge";
import type { Locale } from "@/lib/i18n";

/**
 * The Rosica assistant.
 *
 * Streams a reply from Claude, grounded in a brief assembled from the site's
 * own content modules (see `@/lib/chat/knowledge`) so the assistant cannot
 * invent product or ingredient claims — the thing that actually matters for a
 * cosmetics brand.
 *
 *   ANTHROPIC_API_KEY   required, from console.anthropic.com
 *
 * Without it the route answers 503 with `reason: "unconfigured"` and the widget
 * hides itself, exactly as the contact form falls back rather than dead-ends.
 *
 * The response body is plain UTF-8 text, streamed. No JSON envelope per chunk:
 * the client appends whatever arrives straight into the bubble.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-5";

/** Caps. A chat widget on a brochure site needs none of the headroom. */
const MAX_CHARS = 1500;
/** Turns kept, newest last. Ten user + ten assistant is a long conversation. */
const MAX_TURNS = 20;

/**
 * Crude per-IP throttle.
 *
 * In-process, so on serverless it only limits what one warm instance sees —
 * which is still most of what a single abusive client hits. It is a speed bump,
 * not a security boundary; put a real limiter at the edge if this ever gets
 * traffic worth abusing.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(value: unknown): Turn[] {
  if (!Array.isArray(value)) return [];

  const turns = value.flatMap((entry): Turn[] => {
    if (typeof entry !== "object" || entry === null) return [];
    const { role, content } = entry as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return [];
    if (typeof content !== "string" || !content.trim()) return [];
    return [{ role, content: content.slice(0, MAX_CHARS) }];
  });

  // The API requires the history to start with a user turn.
  const trimmed = turns.slice(-MAX_TURNS);
  const first = trimmed.findIndex((t) => t.role === "user");
  return first === -1 ? [] : trimmed.slice(first);
}

/**
 * Built on first use, not at import. The unconfigured deployment is the common
 * case here, and constructing a client is exactly the sort of thing that starts
 * throwing on a missing key in some future version — which would turn a clean
 * 503 into a 500 on every page that has the widget.
 */
let client: Anthropic | undefined;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }
  client ??= new Anthropic();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (throttled(ip)) {
    return NextResponse.json({ ok: false, reason: "rate-limited" }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const messages = parseTurns(payload.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const locale: Locale = payload.locale === "ar" ? "ar" : "en";

  const stream = client.messages.stream({
    model: MODEL,
    /*
      Generous only because it is a ceiling, not a target: adaptive thinking
      shares this budget with the reply, and truncating mid-sentence in front of
      a customer is worse than an unused allowance. Brevity is asked for in the
      system prompt, where it belongs.
    */
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    /*
      Low effort suits the job. These are short answers read from a brief that
      is already in the prompt, and a shop assistant that pauses to deliberate
      before saying which shampoo is sulfate-free feels broken, not thoughtful.
    */
    output_config: { effort: "low" },
    system: [
      {
        type: "text",
        text: systemPromptFor(locale),
        // Identical on every request in a locale, so it should be paid for once.
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await stream.finalMessage();
        /*
          A refusal arrives with no text at all, so without this the visitor
          would watch the typing indicator stop and nothing appear.
        */
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              locale === "ar"
                ? "عذرًا، لا أستطيع مساعدتك في هذا الطلب. يسعدني الإجابة عن أي سؤال عن روزيكا."
                : "Sorry — I can't help with that one. I'm happy to answer anything about Rosica.",
            ),
          );
        }
      } catch (error) {
        // Never log the transcript: it is a stranger's message to the brand.
        const status = error instanceof Anthropic.APIError ? error.status : "unknown";
        console.error("Chat: the model request failed", status);
        controller.error(error);
        return;
      }
      controller.close();
    },
    cancel() {
      // The visitor closed the panel or navigated away — stop paying for tokens.
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Vercel and nginx both buffer text/plain otherwise, which loses the point.
      "X-Accel-Buffering": "no",
    },
  });
}
