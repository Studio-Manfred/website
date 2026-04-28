import { Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

const team = [
  { name: "Selma Hallqvist", role: "Senior Product Designer", initials: "SH" },
  { name: "Axel Nathorst-Böös", role: "Design & Product Leadership", initials: "AN" },
  { name: "Moa Bogren", role: "Senior User Research (UXR)", initials: "MB" },
  { name: "Jens Wedin", role: "Design Director & Service Designer", initials: "JW" },
];

export function Team() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto" style={{ maxWidth: "var(--size-container-2xl)" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)] mb-16 md:mb-20 text-center"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Meet the Mmmms
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col gap-4 text-center">
                {/* Replace with <Image> once team photos are added */}
                <div
                  className="aspect-[3/4] w-full bg-[var(--color-bg-muted)] rounded-[var(--radius-sm)] flex items-center justify-center overflow-hidden"
                >
                  <span className="font-extrabold text-[var(--color-text-disabled)]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {member.initials}
                  </span>
                </div>
                <div>
                  <Typography variant="body" as="p" className="font-bold">
                    {member.name}
                  </Typography>
                  <Typography variant="bodySmall" color="muted" as="p" className="mt-0.5 font-light">
                    {member.role}
                  </Typography>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
