import { Hero } from "@/components/sections/Hero";
import { Tagline } from "@/components/sections/Tagline";
import { Mission } from "@/components/sections/Mission";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhatElse } from "@/components/sections/WhatElse";
import { JoinUs } from "@/components/sections/JoinUs";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { HomeMenu } from "@/components/HomeMenu";

export default function Home() {
  return (
    <>
      <HomeMenu />
      <main id="main" tabIndex={-1}>
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
