import { Hero } from "@/components/sections/Hero";
import { Tagline } from "@/components/sections/Tagline";
import { Mission } from "@/components/sections/Mission";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhatElse } from "@/components/sections/WhatElse";
import { JoinUs } from "@/components/sections/JoinUs";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Tagline />
        <Mission />
        <Services />
        <Marquee />
        <Team />
        <WhatElse />
        <JoinUs />
      </main>
      <Footer />
    </>
  );
}
