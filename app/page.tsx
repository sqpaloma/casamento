"use client";

import { useState, useCallback } from "react";
import FAQ from "./_components/faq"
import HeroSection from "./_components/hero-section"
import RSVP from "./_components/rsvp"
import Cronometro from "./_components/cronometro"
import Programmation from "./_components/programmation"
import InvitationOverlay from "./_components/before-hero"

export default function Home() {
  const [invitationOpened, setInvitationOpened] = useState(false);

  const handleInvitationOpen = useCallback(() => {
    setInvitationOpened(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#C9DBF3]/10">
      {/* Overlay do convite - exibido antes de tudo */}
      <InvitationOverlay onOpen={handleInvitationOpen} />

      {/* Hero em fullscreen - fora do container */}
      <HeroSection shouldPlay={invitationOpened} />

      {/* Demais seções dentro do container */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
        <Cronometro />
        <Programmation />

        <FAQ />
        <RSVP />
      </div>
    </div>
  );
}
