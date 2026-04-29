export function Footer() {
  return (
    <>
      {/* Studio Manfred AB */}
      <section className="cursor-white bg-[var(--color-business-blue)] text-white text-center px-6 md:px-12 pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto" style={{ maxWidth: "960px" }}>
          <h2
            className="font-extrabold text-white mb-10"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            Studio Manfred AB
          </h2>
          <p
            className="font-light text-white/90 leading-relaxed"
            style={{ fontSize: "clamp(1.125rem, 2.5vw, 2rem)" }}
          >
            Stockholm, Sweden
            <br />
            079 — 336 29 10
            <br />
            <a
              href="mailto:hello@studiomanfred.com"
              className="underline underline-offset-2 text-[#efd6d3] hover:text-white transition-colors"
            >
              hello@studiomanfred.com
            </a>
            <br />
            Organisational number: 559419-6171
          </p>
        </div>
      </section>

      {/* SeventyOne Group */}
      <section className="cursor-white bg-[var(--color-business-blue)] text-white text-center px-6 md:px-12 pb-28 md:pb-40">
        <div className="mx-auto" style={{ maxWidth: "960px" }}>
          <h2
            className="font-extrabold text-white mb-10"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            SeventyOne Group
          </h2>
          <p
            className="font-light text-white/90 leading-relaxed mb-10"
            style={{ fontSize: "clamp(1.125rem, 2.5vw, 2rem)" }}
          >
            We are part of the SeventyOne Group. Our fellow companies include{" "}
            <a
              href="https://seventyoneconsulting.se/"
              className="font-semibold underline underline-offset-2 text-[#efd6d3] hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              SeventyOne Consulting
            </a>
            , experts in leadership, product, design and change, and{" "}
            <a
              href="https://www.matherstudio.se/about-us"
              className="font-semibold underline underline-offset-2 text-[#efd6d3] hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mather Studio
            </a>
            , a curated network of top-tier independent contractors. Hello there{" "}
            <a href="https://www.seventyoneconsulting.se/kontakt/hakan-appelgren" className="text-[#efd6d3] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">@håkan</a>,{" "}
            <a href="https://www.seventyoneconsulting.se/kontakt/david-cederblad" className="text-[#efd6d3] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">@david</a> and{" "}
            <a href="https://www.matherstudio.se/contact" className="text-[#efd6d3] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">@moa</a> 👋🏽
          </p>
          <a
            href="https://www.studiomanfred.com/privacy-policy"
            className="font-light underline underline-offset-2 text-[#efd6d3] hover:text-white transition-colors"
            style={{ fontSize: "clamp(1.125rem, 2.5vw, 2rem)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </section>
    </>
  );
}
