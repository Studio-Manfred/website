"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  label: string;
};

export function CaseLightbox({ src, alt, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">
        {label}
      </p>
      <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px", border: "1px solid var(--color-border-default)" }}
        />
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.55)", color: "white", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "4px" }}>
          Click to enlarge
        </div>
      </div>
      <p className="font-light text-[var(--color-text-muted)] mt-2" style={{ fontSize: "12px" }}>
        No real numbers or data — the visualisations are examples with sample data only.
      </p>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", cursor: "zoom-out" }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={src}
              alt={alt}
              style={{ maxWidth: "100%", maxHeight: "90vh", display: "block", borderRadius: "8px" }}
            />
            <button
              onClick={() => setOpen(false)}
              style={{ position: "absolute", top: "-16px", right: "-16px", width: "32px", height: "32px", borderRadius: "50%", background: "white", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700, color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}