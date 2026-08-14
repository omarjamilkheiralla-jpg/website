"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BotanicalOrb from "./BotanicalOrb";
import { chatCopy } from "@/content/chat";
import {
  OPENING,
  questionById,
  questionsInTopic,
  topics,
  type Question,
  type TopicId,
} from "@/content/chat-answers";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * The Rosica assistant.
 *
 * Guided, not conversational: the visitor picks from questions the brand has
 * actually answered rather than typing into a box and hoping. That is a
 * deliberate trade. It cannot answer anything unexpected — but it also cannot
 * invent an ingredient, a price or a delivery promise, which for a cosmetics
 * brand is the failure that matters. Anything outside the bank is handed to
 * info@rosica.ae, which is a real answer rather than a guess.
 *
 * It needs no configuration and works the moment it is deployed. If an
 * ANTHROPIC_API_KEY is ever set, `ai` turns on and a text box appears
 * underneath, so typed questions reach the full assistant while the guided
 * route keeps working exactly as before.
 *
 * The panel is pinned to the inline start — bottom-left in English,
 * bottom-right in Arabic, mirroring like the rest of the site.
 */

type Turn =
  | { role: "visitor"; text: string }
  | {
      role: "bot";
      text: string[];
      /** `external` links leave the site — the online store — and open in a new tab. */
      link?: { href: string; label: string; external?: boolean };
    };

export default function ChatWidget({ locale, ai }: { locale: Locale; ai: boolean }) {
  const copy = chatCopy[locale];
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [offered, setOffered] = useState<string[]>(OPENING);
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState("");

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Keep the newest message in view. */
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, offered, pending]);

  /* Escape closes, and focus goes back where it came from. */
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const reset = useCallback(() => {
    setTurns([]);
    setTopic(null);
    setOffered(OPENING);
  }, []);

  /** Answer one of the prepared questions. */
  const answer = useCallback(
    (question: Question) => {
      if (pending) return;

      setTurns((current) => [...current, { role: "visitor", text: question.q[locale] }]);
      setTopic(question.topic);
      setOffered([]);
      setPending(true);

      /*
        A beat before the reply lands. The answer is already in memory, so this
        is pure theatre — but an answer that appears in the same frame as the
        question reads as a menu opening, not as being replied to.
      */
      const beat = reduceMotion ? 0 : 420;
      window.setTimeout(() => {
        setTurns((current) => [
          ...current,
          {
            role: "bot",
            text: question.a[locale],
            link: question.link
              ? {
                  // An external href is a full URL and must not be prefixed.
                  href: question.link.external
                    ? question.link.href
                    : localePath(locale, question.link.href),
                  label: question.link.label[locale],
                  external: question.link.external,
                }
              : undefined,
          },
        ]);
        // Follow-ups if the question names any, otherwise the rest of its topic.
        const rest = questionsInTopic(question.topic)
          .map((q) => q.id)
          .filter((id) => id !== question.id);
        setOffered((question.next ?? rest).filter((id) => id !== question.id).slice(0, 4));
        setPending(false);
      }, beat);
    },
    [locale, pending, reduceMotion],
  );

  const chooseTopic = useCallback((id: TopicId) => {
    setTopic(id);
    setOffered(questionsInTopic(id).map((q) => q.id));
  }, []);

  /** Free text, only reachable when the AI assistant is configured. */
  const ask = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, 1500);
      if (!question || pending) return;

      const history = [
        ...turns.map((t) => ({
          role: t.role === "visitor" ? ("user" as const) : ("assistant" as const),
          content: t.role === "visitor" ? t.text : t.text.join("\n\n"),
        })),
        { role: "user" as const, content: question },
      ];

      setTurns((current) => [
        ...current,
        { role: "visitor", text: question },
        { role: "bot", text: [""] },
      ]);
      setDraft("");
      setOffered([]);
      setPending(true);

      const write = (value: string) =>
        setTurns((current) => {
          const next = [...current];
          next[next.length - 1] = { role: "bot", text: [value] };
          return next;
        });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, messages: history }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          write(response.status === 429 ? copy.busy : copy.error);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let reply = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          reply += decoder.decode(value, { stream: true });
          write(reply);
        }
        if (!reply.trim()) write(copy.error);
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") write(copy.error);
      } finally {
        abortRef.current = null;
        setPending(false);
        setOffered(topic ? questionsInTopic(topic).map((q) => q.id).slice(0, 4) : OPENING);
      }
    },
    [copy.busy, copy.error, locale, pending, topic, turns],
  );

  const fade = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 14, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.97 },
      };

  const chip =
    "rounded-full border border-gold/40 px-3 py-1.5 text-[0.6875rem] leading-none text-ink-muted transition-colors duration-300 hover:border-gold hover:text-green";

  return (
    <div className="pointer-events-none fixed bottom-5 start-5 z-50 flex flex-col items-start gap-3 sm:bottom-7 sm:start-7">
      <AnimatePresence>
        {open ? (
          <motion.div
            {...fade}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="false"
            aria-label={copy.title}
            className="pointer-events-auto flex h-[min(34rem,calc(100dvh-8rem))] w-[min(23.5rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-gold/35 bg-cream shadow-[0_24px_60px_-24px_rgba(30,30,26,0.45)]"
          >
            {/* A <header> here would register as a second banner landmark. */}
            <div className="flex items-start justify-between gap-3 bg-forest px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-gold">
                  <BotanicalOrb className="h-8 w-8" />
                </span>
                <div>
                  <p className="font-serif text-lg leading-tight text-cream">{copy.title}</p>
                  <p className="mt-0.5 text-[0.6875rem] text-gold-pale">{copy.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label={copy.close}
                className="-me-1 shrink-0 rounded-md p-1.5 text-gold-pale transition-colors duration-300 hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-5 py-4"
            >
              <p className="rounded-lg rounded-ss-none bg-shell px-4 py-3 text-sm leading-relaxed text-ink">
                {copy.greeting}
              </p>

              {turns.map((turn, i) =>
                turn.role === "visitor" ? (
                  <p
                    key={i}
                    className="mt-3 ms-8 rounded-lg rounded-se-none bg-green px-4 py-3 text-sm leading-relaxed text-cream"
                  >
                    {turn.text}
                  </p>
                ) : (
                  <div
                    key={i}
                    className="mt-3 space-y-2.5 rounded-lg rounded-ss-none bg-shell px-4 py-3 text-sm leading-relaxed text-ink"
                  >
                    {turn.text.map((paragraph, j) => (
                      <p key={j} className="whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                    {turn.link ? (
                      turn.link.external ? (
                        <a
                          href={turn.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-block text-xs font-medium text-gold-deep"
                        >
                          {turn.link.label} →
                        </a>
                      ) : (
                        <Link
                          href={turn.link.href}
                          onClick={() => setOpen(false)}
                          className="link-underline inline-block text-xs font-medium text-gold-deep"
                        >
                          {turn.link.label} →
                        </Link>
                      )
                    ) : null}
                  </div>
                ),
              )}

              {pending ? (
                <p className="mt-3 rounded-lg rounded-ss-none bg-shell px-4 py-3 text-sm text-ink-muted italic">
                  {copy.thinking}
                </p>
              ) : null}

              {offered.length && !pending ? (
                <div className="mt-5">
                  <p className="eyebrow text-green">
                    {turns.length === 0 ? copy.popular : copy.more}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {offered.map((id) => {
                      const question = questionById(id);
                      if (!question) return null;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => answer(question)}
                            className="w-full rounded-lg border border-gold/40 px-4 py-2.5 text-start text-xs leading-relaxed text-ink-muted transition-colors duration-300 hover:border-gold hover:bg-shell hover:text-green"
                          >
                            {question.q[locale]}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {!pending ? (
                <div className="mt-5">
                  <p className="eyebrow text-green">{copy.browse}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => chooseTopic(t.id)}
                        aria-pressed={topic === t.id}
                        className={`${chip} ${
                          topic === t.id ? "border-gold bg-shell text-green" : ""
                        }`}
                      >
                        {t.label[locale]}
                      </button>
                    ))}
                    {turns.length ? (
                      <button type="button" onClick={reset} className={chip}>
                        {copy.restart}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            {ai ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(draft);
                }}
                className="border-t border-gold/25 px-4 pt-3 pb-2"
              >
                <div className="flex items-center gap-2">
                  <label htmlFor="rosica-chat-input" className="sr-only">
                    {copy.placeholder}
                  </label>
                  <input
                    id="rosica-chat-input"
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={copy.placeholder}
                    maxLength={1500}
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-md border border-gold/35 bg-cream px-3.5 py-2.5 text-sm text-ink transition-colors duration-300 placeholder:text-ink-muted/70 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={pending || !draft.trim()}
                    className="shrink-0 rounded-md bg-gold px-4 py-2.5 text-[0.6875rem] font-medium tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:bg-green hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copy.send}
                  </button>
                </div>
              </form>
            ) : null}

            <p className="border-t border-gold/25 px-5 py-3 text-[0.6875rem] leading-relaxed text-ink-muted">
              {ai ? copy.aiDisclaimer : copy.disclaimer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-gold shadow-[0_14px_30px_-12px_rgba(30,30,26,0.6)] transition-[background-color,transform] duration-300 ease-out hover:bg-green hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <BotanicalOrb className="h-8 w-8" />
        )}
      </button>
    </div>
  );
}
