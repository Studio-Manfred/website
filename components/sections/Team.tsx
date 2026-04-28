import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

const team = [
  { name: "Selma Hallqvist", role: "Senior Product Designer", photo: "/team/selma.jpg" },
  { name: "Axel Nathorst-Böös", role: "Design & Product Leadership", photo: "/team/axel.jpg" },
  { name: "Moa Bogren", role: "Senior User Research (UXR)", photo: "/team/moa.jpg" },
  { name: "Jens Wedin", role: "Design Director & Service Designer", photo: "/team/jens.jpg" },
];

export function Team() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <FadeIn>
          <h2
            className="leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-16 md:mb-20 text-center"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <span className="font-light text-[var(--color-text-primary)]">Meet the </span>
            <span className="font-extrabold text-[var(--color-business-blue)]">Mmmms</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-8 md:gap-10">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col gap-4">
                <div className="aspect-[3/4] w-full rounded-[var(--radius-sm)] overflow-hidden relative">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <p
                    className="font-extrabold text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.5rem)" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="font-light text-[var(--color-text-primary)] mt-1"
                    style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.25rem)" }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
