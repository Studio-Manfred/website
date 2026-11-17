// The password form in front of a locked case (STU-1156). A plain form that
// posts to a Server Function, so it works without JavaScript.

export function CasePasswordGate({ action, wrong }: { action: (formData: FormData) => Promise<void>; wrong: boolean }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "560px" }}>
        <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">Case</p>
        <h1
          className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          This case is password protected
        </h1>
        <p className="font-light text-[var(--color-text-primary)] mb-8" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7 }}>
          Enter the password you got from Studio Manfred to read it.
        </p>
        <form action={action} className="flex flex-col gap-3">
          <label htmlFor="case-password" className="text-sm font-bold text-[var(--color-text-primary)]">Password</label>
          <input
            id="case-password"
            name="password"
            type="password"
            required
            autoComplete="off"
            aria-invalid={wrong || undefined}
            aria-describedby={wrong ? "case-password-error" : undefined}
            className="rounded-md border border-[var(--color-border-default)] px-4 py-3 text-[var(--color-text-primary)]"
          />
          {wrong && (
            <p id="case-password-error" role="alert" className="text-sm text-[var(--color-text-primary)]">
              That password doesn’t open this case. Try again.
            </p>
          )}
          <button
            type="submit"
            className="self-start rounded-full bg-[var(--color-business-blue)] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
          >
            Open the case
          </button>
        </form>
      </div>
    </section>
  );
}
