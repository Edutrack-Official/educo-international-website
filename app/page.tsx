import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Programs } from "@/components/sections/programs";
import { TestLab } from "@/components/sections/test-lab";
import { Destinations } from "@/components/sections/destinations";
import { Journey } from "@/components/sections/journey";
import { Skills } from "@/components/sections/skills";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { KidsClub } from "@/components/sections/kids-club";
import { Visit } from "@/components/sections/visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Programs />
      <TestLab />
      <Skills />
      <KidsClub />
      <Destinations />
      <Journey />
      <Reviews />
      <Faq />
      <Visit />
    </>
  );
}
