import FAQ from "./_components/faq"
import HeroSection from "./_components/hero-section"
import Programacao from "./_components/programacao"
import RSVP from "./_components/rsvp"
import Detalhes from "./_components/detalhes"
import Cronometro from "./_components/cronometro"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero em fullscreen - fora do container */}
      <HeroSection />

      {/* Demais seções dentro do container */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
        <Cronometro />
        <Detalhes />
        <Programacao />
        <FAQ />
        <RSVP />
      </div>
    </div>
  );
}
