const clients = [
  "Boka Direkt",
  "Mentimeter",
  "Fishbrain",
  "Svea Bank",
  "Trygg-Hansa",
];

export function Clients() {
  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-12">
      <div className="mx-auto" style={{ maxWidth: "var(--size-container-2xl)" }}>
        <h2
          className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[#1e1e24] mb-12"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Brands that trust us
        </h2>
        <div className="flex flex-wrap gap-3">
          {clients.map((client) => (
            <span
              key={client}
              className="px-6 py-3 rounded-[var(--radius-full)] border border-[#1e1e24]/20 text-[#1e1e24] font-semibold"
              style={{ fontSize: "var(--font-size-md)" }}
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
