import { FadeIn } from "@/components/FadeIn";
import { GroupChat } from "@/components/GroupChat";
import { GroupHeadline } from "@/components/GroupHeadline";
import { GroupPeople } from "@/components/GroupPeople";
import { GROUP_LEAD } from "@/lib/group";
import type { PersonStatus } from "@/lib/group-status";
import { fontSize } from "@/lib/typography";

export function GroupLanding({ statuses }: { statuses?: Record<string, PersonStatus> }) {
  return (
    <div className="mx-auto px-6 pb-20 md:px-12 md:pb-32" style={{ maxWidth: "1200px" }}>
      <header className="py-6 md:py-8">
        <p className="text-xl font-extrabold tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)] md:text-2xl">
          71collective
        </p>
      </header>
      <main id="main" tabIndex={-1} className="pt-12 md:pt-20">
        <FadeIn>
          <div className="mb-14 md:mb-20">
            <GroupHeadline />
            <p className="mt-6 font-light text-[var(--color-text-primary)]" style={{ fontSize: fontSize.lead }}>
              {GROUP_LEAD}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={1}>
          <section aria-labelledby="ask-us-heading">
            <h2 id="ask-us-heading" className="sr-only">
              Fråga oss
            </h2>
            <GroupChat />
          </section>
        </FadeIn>
        <FadeIn>
          <GroupPeople statuses={statuses} />
        </FadeIn>
      </main>
    </div>
  );
}
