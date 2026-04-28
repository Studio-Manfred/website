import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/sections/Hero";
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
      <NavBar />
      <main>
        <Hero />
        <Marquee />
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
