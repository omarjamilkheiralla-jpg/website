"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { chatCopy } from "@/content/chat";
import type { Locale } from "@/lib/i18n";

/**
 * The Rosica assistant, as a floating panel on every page.
 *
 * Answers stream in from /api/chat, which grounds them in the site's own
 * content. Three things are deliberate:
 *
 *  - Whether this renders at all is decided on the server, from whether an API
 *    key is configured (see layout.tsx). A chat button that opens onto an error
 *    is worse than no chat button, and settling it server-side costs no extra
 *    request and cannot flash a launcher that then disappears.
 *  - The transcript lives in component state only. Nothing is stored, so
 *    nothing has to be disclosed, expired or deleted.
 *  - The panel is pinned to the inline end, so it sits bottom-right in English
 *    and bottom-left in Arabic without a second set of styles.
 */

type Turn = { role: "user" | "assistant"; content: string };

function Bubble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 5h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H14l-7 5v-5H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 14h.01M16 14h.01M21.5 14h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ChatWidget({ locale }: { locale: Locale }) {
  const copy = chatCopy[locale];
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Keep the newest message in view as it streams in. */
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, pending]);

  /* Escape closes, and focus goes back where it came from. */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* Abandon an in-flight reply if the widget unmounts. */
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim().slice(0, 1500);
      if (!text || pending) return;

      const history = [...turns, { role: "user" as const, content: text }];
      setTurns([...history, { role: "assistant", content: "" }]);
      setDraft("");
      setPending(true);

      /** Replace the trailing (assistant) turn as the answer arrives. */
      const write = (content: string) =>
        setTurns((current) => {
          const next = [...current];
          next[next.length - 1] = { role: "assistant", content };
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
        let answer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          write(answer);
        }

        if (!answer.trim()) write(copy.error);
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") write(copy.error);
      } finally {
        abortRef.current = null;
        setPending(false);
      }
    },
    [copy.busy, copy.error, locale, pending, turns],
  );

  const fade = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  return (
    <div className="pointer-events-none fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:end-7">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            {...fade}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="false"
            aria-label={copy.title}
            className="pointer-events-auto flex h-[min(32rem,calc(100dvh-8rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-gold/35 bg-cream shadow-[0_24px_60px_-24px_rgba(30,30,26,0.45)]"
          >
            {/* A <header> here would register as a second banner landmark
                alongside the site header, so this stays a plain div. */}
            <div className="flex items-start justify-between gap-3 bg-forest px-5 py-4">
              <div>
                <p className="font-serif text-lg leading-tight text-cream">{copy.title}</p>
                <p className="mt-0.5 text-[0.6875rem] text-gold-pale">{copy.subtitle}</p>
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
                <CloseGlyph />
              </button>
            </div>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-atomic="false"
              className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
            >
              <p className="rounded-lg rounded-ss-none bg-shell px-4 py-3 text-sm leading-relaxed text-ink">
                {copy.greeting}
              </p>

              {turns.map((turn, i) =>
                turn.role === "user" ? (
                  <p
                    key={i}
                    className="ms-8 rounded-lg rounded-se-none bg-green px-4 py-3 text-sm leading-relaxed text-cream"
                  >
                    {turn.content}
                  </p>
                ) : (
                  <p
                    key={i}
                    className="rounded-lg rounded-ss-none bg-shell px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-ink"
                  >
                    {turn.content || (
                      <span className="text-ink-muted italic">{copy.thinking}</span>
                    )}
                  </p>
                ),
              )}

              {turns.length === 0 ? (
                <ul className="space-y-2 pt-1">
                  {copy.suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => ask(suggestion)}
                        className="w-full rounded-lg border border-gold/40 px-4 py-2.5 text-start text-xs leading-relaxed text-ink-muted transition-colors duration-300 hover:border-gold hover:text-green"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(draft);
              }}
              className="border-t border-gold/25 px-4 pt-3 pb-4"
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
                  className="shrink-0 rounded-md bg-gold px-4 py-2.5 text-[0.6875rem] font-medium tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:bg-green hover:text-cream disabled:cursor-not-allowed disabled:opacity-50 rtl:tracking-normal rtl:normal-case"
                >
                  {copy.send}
                </button>
              </div>
              <p className="mt-2.5 text-[0.6875rem] leading-relaxed text-ink-muted">
                {copy.disclaimer}
              </p>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-green text-cream shadow-[0_14px_30px_-12px_rgba(30,30,26,0.6)] transition-[background-color,transform] duration-300 ease-out hover:bg-green-deep hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      >
        {open ? <CloseGlyph /> : <Bubble className="h-6 w-6" />}
      </button>
    </div>
  );
}
