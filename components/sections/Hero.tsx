import { HeroIntro } from "@/components/HeroIntro";
import { Section } from "@/components/Section";

export function Hero() {
  return (
    <Section
      background="blue"
      width="wide"
      padding="none"
      align="center"
      className="min-h-screen flex items-center py-24"
    >
      <HeroIntro />
    </Section>
  );
}
