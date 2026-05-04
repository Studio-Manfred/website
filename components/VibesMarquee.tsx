"use client";

const images = [
  "/vibes/gotth\u00E4ng.jpeg",
  "/vibes/IMG_3542.jpeg",
  "/vibes/finbild1.jpeg",
  "/vibes/MIK_8943.jpg",
  "/vibes/brabild1.jpeg",
  "/vibes/moa-xconf.jpeg",
  "/vibes/IMG_3375.jpg",
  "/vibes/manfred-ws.jpeg",
  "/vibes/moa-katt.jpeg",
  "/vibes/axel-jens.jpeg",
  "/vibes/manfred-unn.jpeg",
  "/vibes/moa-jens.jpeg",
  "/vibes/moa%3C3.jpeg",
  "/vibes/ws-v\u00E4skan.jpeg",
  "/vibes/Image%20from%20iOS%20(6).jpg",
];

export function VibesMarquee() {
  return (
    <div style={{ overflow: "hidden", backgroundColor: "white", padding: "72px 0" }}>
      <style>{`
        @keyframes vibes-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .vibes-marquee {
          display: flex;
          gap: 100px;
          width: max-content;
          animation: vibes-scroll 60s linear infinite;
          will-change: transform;
        }
        .vibes-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="vibes-marquee">
        {[...images, ...images].map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            style={{ height: "380px", width: "auto", flexShrink: 0, display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}
