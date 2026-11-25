"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { BRANDS } from "@/components/group-brands";
import { ManfredMark, MatherMark, SeventyOneLeaf } from "@/components/GroupMarks";
import { GROUP_COMPANIES, type GroupCompany } from "@/lib/group";
import { emphasisParts, type Answers, type Turn } from "@/lib/group-ask";

const SUGGESTIONS = [
  "Vilka är ni?",
  "Vad är ni bäst på?",
  "Varför ska vi jobba med er?",
  "Hur kan ni hjälpa oss med AI?",
  "Vi ska bygga ett nytt produktteam, var börjar vi?",
  "Hur jobbar ni tillsammans som grupp?",
  "Vad gör er olika från andra konsultbolag?",
  "Hur kommer vi igång?",
];

const AVATAR = "flex size-11 shrink-0 items-center justify-center rounded-full";
const AVATAR_SMALL = "flex size-8 shrink-0 items-center justify-center rounded-full";

function Mark({ id, size, animated = false }: { id: string; size: number; animated?: boolean }) {
  if (id === "studio-manfred") return <ManfredMark size={size} />;
  if (id === "mather-studio") return <MatherMark size={size} animated={animated} />;
  return <SeventyOneLeaf size={size} className={animated ? "origin-bottom motion-safe:animate-think-sway" : undefined} />;
}

export function CompanyAvatar({ id, small = false }: { id: string; small?: boolean }) {
  const size = { "studio-manfred": small ? 26 : 36, "mather-studio": small ? 15 : 20, "seventyone-consulting": small ? 18 : 26 }[id] ?? 20;
  return (
    <span aria-hidden className={`${small ? AVATAR_SMALL : AVATAR} ${BRANDS[id].avatar}`}>
      <Mark id={id} size={size} />
    </span>
  );
}

// While a company is thinking its own mark moves in the bubble: SeventyOne's
// leaf sways, Manfred's M bounces, Mather's pixel mark builds block by block.
function Thinking({ company }: { company: GroupCompany }) {
  return (
    <span role="status" aria-label={`${company.name} tänker`} data-company={company.id} className="flex h-12 items-center">
      <span
        data-mark={company.id}
        className={company.id === "studio-manfred" ? "inline-flex motion-safe:animate-think-bounce" : "inline-flex"}
      >
        <Mark id={company.id} size={company.id === "studio-manfred" ? 48 : 32} animated />
      </span>
    </span>
  );
}

// Messages ease in: your question slides in from the right, the companies'
// bubbles follow one after another, and each answer's text unblurs into place
// in the same cascade when it arrives.
const STAGGER = 160;

function CompanyMessage({ company, text, index }: { company: GroupCompany; text?: string; index: number }) {
  const b = BRANDS[company.id];
  const headingId = useId();
  const delay = { animationDelay: `${(index + 1) * STAGGER}ms` };
  return (
    <li className="flex items-start gap-3 sm:pr-12 md:pr-24 motion-safe:animate-msg-in" style={delay}>
      <span className="max-sm:hidden">
        <CompanyAvatar id={company.id} />
      </span>
      <article aria-labelledby={headingId} aria-busy={!text} className="min-w-0 max-sm:flex-1">
        <div className="mb-2 flex items-center gap-2 sm:mb-1">
          <span className="sm:hidden">
            <CompanyAvatar id={company.id} small />
          </span>
          <h3 id={headingId} className={b.name}>
            {company.name}
          </h3>
        </div>
        <div className={`rounded-2xl rounded-tl-sm px-5 py-4 ${b.bubble}`}>
          {text ? (
            <p className={`whitespace-pre-line leading-relaxed motion-safe:animate-msg-reveal ${b.body}`} style={{ animationDelay: `${index * STAGGER}ms` }}>
              {emphasisParts(text).map((part, i) =>
                part.em ? (
                  <strong
                    key={i}
                    data-company={company.id}
                    className={`rounded-sm px-1 py-0.5 [box-decoration-break:clone] ${b.highlight}`}
                  >
                    {part.text}
                  </strong>
                ) : (
                  part.text
                ),
              )}
            </p>
          ) : (
            <Thinking company={company} />
          )}
        </div>
      </article>
    </li>
  );
}

function UserMessage({ question }: { question: string }) {
  return (
    <li aria-label={`Du: ${question}`} className="flex items-start justify-end gap-3 pl-10 md:pl-24 motion-safe:animate-msg-in-right">
      <div className="min-w-0 text-right">
        <p aria-hidden className="mb-1 font-semibold text-[var(--color-text-primary)]">
          Du
        </p>
        <p className="rounded-2xl rounded-tr-sm bg-[var(--color-bg-muted)] px-5 py-4 text-left text-[var(--color-text-primary)]">{question}</p>
      </div>
      <span aria-hidden className="max-sm:hidden">
        <span className={`${AVATAR} bg-[var(--color-text-primary)] text-sm font-semibold text-white`}>Du</span>
      </span>
    </li>
  );
}

function TurnMessages({ question, answers }: { question: string; answers?: Answers }) {
  return (
    <>
      <UserMessage question={question} />
      {GROUP_COMPANIES.map((c, i) => (
        <CompanyMessage key={c.id} company={c} index={i} text={answers?.[c.id]} />
      ))}
    </>
  );
}

export function GroupChat() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, [turns, pending]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    setPending(q);
    setError(false);
    setDraft("");
    try {
      const res = await fetch("/cases/71collective/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: turns }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const { answers } = (await res.json()) as { answers: Answers };
      setTurns((t) => [...t, { question: q, answers }]);
    } catch {
      setError(true);
      setDraft(q);
    } finally {
      setPending(null);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(draft);
  }


  return (
    <div className="text-left">

      <ol className="flex flex-col gap-5" aria-live="polite">
        {/* One list for answered and pending turns, so the pending turn keeps its
            key when the answer lands and only the text animates in. */}
        {[...turns, ...(pending ? [{ question: pending }] : [])].map((t, i) => (
          <TurnMessages key={i} question={t.question} answers={"answers" in t ? t.answers : undefined} />
        ))}
      </ol>
      <div ref={endRef} />

      {error && (
        <p role="alert" className="mt-6 text-[var(--color-text-primary)]">
          Det gick inte att få svar just nu. Försök igen om en stund.
        </p>
      )}

      {/* One scrollable row; the fade on the right hints there's more, and the
          spacer at the end lets the last suggestion clear the fade. */}
      <ul
        className="mt-8 mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_90%,transparent)]"
        aria-label="Förslag på frågor"
      >
        {SUGGESTIONS.map((s) => (
          <li key={s} className="shrink-0">
            <button
              type="button"
              onClick={() => ask(s)}
              disabled={!!pending}
              className="rounded-full border border-[var(--color-text-primary)] bg-white px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white disabled:opacity-50"
            >
              {s}
            </button>
          </li>
        ))}
        <li aria-hidden className="w-32 shrink-0" />
      </ul>

      <form onSubmit={onSubmit} className="flex gap-3">
        <label htmlFor="group-chat-question" className="sr-only">
          Din fråga
        </label>
        <input
          id="group-chat-question"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={500}
          placeholder="Skriv din fråga…"
          className="min-w-0 flex-1 rounded-full border border-[var(--color-text-primary)] bg-white px-5 py-3 text-[var(--color-text-primary)]"
        />
        <button
          type="submit"
          disabled={!!pending || !draft.trim()}
          className="cursor-white rounded-full bg-[var(--color-text-primary)] px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          Skicka
        </button>
      </form>
    </div>
  );
}
