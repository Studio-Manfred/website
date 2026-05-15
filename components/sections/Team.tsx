"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { useState, useEffect, useRef } from "react";

const team = [
  { name: "Selma Hallqvist", role: "Senior Product Designer", photo: "/team/selma.jpg" },
  { name: "Axel Nathorst-Böös", role: "Design & Product Leadership", photo: "/team/axel.jpg" },
  { name: "Moa Bogren", role: "Senior User Research (UXR)", photo: "/team/moa.jpg" },
  { name: "Jens Wedin", role: "Design Director & Service Designer", photo: "/team/jens.jpg" },
];

const raveFrames = [
  { animation: "spinFrame 1.5s linear infinite", borderRadius: "0%" },
  { animation: "morphFrame 2s ease-in-out infinite", borderRadius: "50%" },
  { animation: "spinFrame 2s linear infinite reverse", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
  { animation: "bounceFrame 1s ease-in-out infinite", borderRadius: "20%" },
];

const raveColors = [
  ["#ff00ff", "#00ffff"],
  ["#ffff00", "#ff6600"],
  ["#00ff88", "#ff0066"],
  ["#ff00ff", "#ffff00"],
];

const emojis = ["⭐", "🌈", "💫", "🔥", "⚡", "🎉", "💥", "🌀", "👾", "🎸"];

type Floater = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
};

export function Team() {
  const [rave, setRave] = useState(false);
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (rave) {
      intervalRef.current = setInterval(() => {
        const newFloater: Floater = {
          id: idRef.current++,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * 100,
          y: 110,
          speed: 2 + Math.random() * 3,
          size: 20 + Math.random() * 30,
          rotation: Math.random() * 360,
        };
        setFloaters((prev) => [...prev.slice(-20), newFloater]);
      }, 300);

      flashRef.current = setInterval(() => {
        setFlash((f) => !f);
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flashRef.current) clearInterval(flashRef.current);
      // Intentional: clear visual state when rave switches off. The cascading
      // render is the desired UX (snap back to the calm layout immediately).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFloaters([]);
      setFlash(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flashRef.current) clearInterval(flashRef.current);
    };
  }, [rave]);

  return (
    <section
      className="py-28 md:py-40 px-6 md:px-12 relative overflow-hidden"
      style={{
        background: rave
          ? flash ? "#0a001a" : "#12002e"
          : "white",
        transition: "background 0.2s ease",
      }}
    >
      <style>{`
        @keyframes spinFrame {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes morphFrame {
          0%, 100% { border-radius: 50%; }
          25% { border-radius: 20% 80% 80% 20% / 20% 20% 80% 80%; }
          50% { border-radius: 80% 20% 20% 80%; }
          75% { border-radius: 50% 50% 20% 80% / 80% 50% 50% 20%; }
        }
        @keyframes bounceFrame {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(5deg); }
          75% { transform: scale(0.95) rotate(-5deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-120vh) rotate(720deg); opacity: 0; }
        }
        @keyframes ravePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        @keyframes colorShift {
          0% { border-color: #ff00ff; box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff; }
          25% { border-color: #00ffff; box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff; }
          50% { border-color: #ffff00; box-shadow: 0 0 20px #ffff00, 0 0 40px #ffff00; }
          75% { border-color: #ff6600; box-shadow: 0 0 20px #ff6600, 0 0 40px #ff6600; }
          100% { border-color: #ff00ff; box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff; }
        }
        .rave-name {
          animation: colorShift 2s linear infinite;
          -webkit-background-clip: text;
        }
        .rave-btn {
          animation: ravePulse 0.5s ease-in-out infinite;
        }
      `}</style>

      {/* Floating emojis */}
      {floaters.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            bottom: "-10%",
            fontSize: `${f.size}px`,
            animation: `floatUp ${f.speed}s ease-out forwards`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {f.emoji}
        </div>
      ))}

      <div className="mx-auto relative" style={{ maxWidth: "1200px", zIndex: 1 }}>
        <FadeIn>
          <h2
            className="leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-16 md:mb-20 text-center"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              animation: rave ? "colorShift 1s linear infinite" : "none",
            }}
          >
            <span
              className="font-light"
              style={{ color: rave ? "#ff00ff" : "var(--color-text-primary)" }}
            >
              Meet the{" "}
            </span>
            <span
              className="font-extrabold"
              style={{ color: rave ? "#00ffff" : "var(--color-business-blue)" }}
            >
              Mmmms
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col gap-4">
                <div style={{ position: "relative" }}>
                  {/* Outer spinning ring */}
                  {rave && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-8px",
                        borderRadius: raveFrames[i].borderRadius,
                        border: `4px solid ${raveColors[i][0]}`,
                        animation: raveFrames[i].animation,
                        boxShadow: `0 0 20px ${raveColors[i][0]}, 0 0 40px ${raveColors[i][0]}`,
                        zIndex: 2,
                      }}
                    />
                  )}
                  {/* Inner spinning ring */}
                  {rave && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-16px",
                        borderRadius: raveFrames[i].borderRadius,
                        border: `2px dashed ${raveColors[i][1]}`,
                        animation: `${raveFrames[i].animation.replace("1.5s", "3s").replace("2s", "4s")} reverse`,
                        boxShadow: `0 0 15px ${raveColors[i][1]}`,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <div
                    className="aspect-square w-full overflow-hidden relative"
                    style={{
                      borderRadius: rave ? raveFrames[i].borderRadius : "0%",
                      transition: "border-radius 0.5s ease",
                    }}
                  >
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div>
                  <p
                    className="font-extrabold"
                    style={{
                      fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
                      color: rave ? raveColors[i][0] : "var(--color-text-primary)",
                    }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="font-light mt-1"
                    style={{
                      fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                      color: rave ? "rgba(255,255,255,0.6)" : "var(--color-text-primary)",
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => setRave(!rave)}
            className={rave ? "rave-btn" : ""}
            style={{
              padding: "16px 48px",
              fontSize: "1.1rem",
              fontWeight: 800,
              border: rave ? "3px solid #ff00ff" : "3px solid var(--color-business-blue)",
              borderRadius: "100px",
              background: rave ? "transparent" : "var(--color-business-blue)",
              color: rave ? "#ff00ff" : "white",
              cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: rave ? "0 0 30px #ff00ff, 0 0 60px #ff00ff" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {rave ? "✕ Stop the rave" : "Make it rave 🎉"}
          </button>
        </div>
      </div>
    </section>
  );
}