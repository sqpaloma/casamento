"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import MetaLabel from "@/components/wedding/meta-label";

type Chapter = { year: string; title: string; text: string };

const chapters: Chapter[] = [
  {
    year: " - 2021",
    title: "O primeiro \"match\"",
    text: "Um encontro improvável. <br> <br> No meio de tantas pessoas, alguma coisa fez a gente parar ali. Conversa vai, conversa vem… e parecia que já existia intimidade antes mesmo do primeiro encontro. <br> Mas talvez o mais curioso seja tudo o que veio depois: as coincidências que começaram a aparecer como se a vida estivesse tentando nos juntar há muito tempo. Nós dois da engenharia mecânica. Nós dois trabalhando com ar-condicionado. Eu trabalhava em um prédio onde ele e sua familia frequentava — e provavelmente já cruzamos os mesmos corredores, os mesmos elevadores, sem nunca imaginar que um dia seríamos nós. <br> E a pergunta que nunca deixamos de lado: Será que a gente já não se conhecia antes? E mesmo sem perceber, talvez a nossa história já estivesse começando ali..",
  },
  {
    year: " - 2022",
    title: "O primeiro \"sim\"",
    text: " Cinco meses depois, veio o primeiro \"sim\". <br> <br> No alto do Pico do Jaraguá — depois de uma subida nada fácil — aconteceu um daqueles momentos que ficam guardados para sempre. Entre a vista mais bonita da cidade, uma cartinha escrita com carinho e um anel entregue com as mãos trêmulas, o namoro começou oficialmente.  <br> E talvez aquele dia tenha representado muito do que viria depois: que algumas das melhores coisas da vida começam justamente quando a gente resolve continuar subindo.",
  },
  {
    year: " - 2022 a 2023",
    title: "O primeiro lar",
    text: "Sem grandes anúncios, a vida foi simplesmente acontecendo. <br> <br> Entre visitas que demoravam mais do que o planejado, roupas ocupando espaço no armário e rotinas que começaram a se misturar, nasceu algo novo: um lar. <br> Aos poucos, tudo foi ganhando a forma deles. As conversas no fim do dia, os planos divididos, os pequenos detalhes da rotina e até as diferenças que, sem perceber, começaram a se encaixar. E foi assim que aquilo deixou de ser apenas uma casa. Virou o lugar onde a vida passou a fazer mais sentido juntos.",
  },
  {
    year: " - 2025",
    title: "O pedido",
    text: "Três anos depois, veio um novo capítulo. <br> <br> Durante uma viagem para a Bahia, em um caminho qualquer que parecia apenas parte da viagem, surgiu uma pausa inesperada. O cenário era bonito demais para simplesmente passar direto. <br> Sem plateia, sem ensaio e sem que ela imaginasse o que estava prestes a acontecer, os dois desceram do carro apenas para aproveitar o momento. E foi ali, no meio do nada e ao mesmo tempo no lugar certo, que veio o pedido. <br> Calmo. Simples. Verdadeiro. Só os dois, o silêncio ao redor e a certeza de que aquela história, que começou por acaso, já tinha se tornado destino.",
  },
  {
    year: " - 2026",
    title: "O agora",
    text: "E agora, depois de tantos encontros improváveis, coincidências e capítulos inesquecíveis, começa um novo começo.  <br> Entre risadas, desafios, mudanças, sonhos divididos e tantos momentos especiais, nós dois descobrimos que o mais importante nunca foi o acaso do encontro… mas a escolha diária de continuarem juntos. <br> E hoje, cercados pelas pessoas que mais amam, celebram tudo o que viveram até aqui — e tudo o que ainda está por vir. <br> <br> Porque essa história está só começando.",
  },
];

/** Turns literal `<br>`, `<br/>`, `</br>` in copy into real line breaks (React escapes HTML in strings). */
function chapterBodyWithLineBreaks(text: string) {
  const segments = text.split(/<\s*br\s*\/?\s*>|<\s*\/\s*br\s*>/gi);
  return segments.map((segment, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {segment}
    </Fragment>
  ));
}

export default function NossaHistoriaPage() {
  return (
    <div className="relative pt-32 pb-20">
      <section className="px-[5vw] md:px-[8vw] mb-20 md:mb-32">
        <MetaLabel className="mb-6">02 · O Arquivo</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Nossa História
        </h1>
        <p className="mt-10 max-w-xl text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
          Cada amor tem seu próprio tempo. O nosso demorou o tempo exato para se
          tornar verdadeiro.
        </p>
      </section>

      <section className="px-[5vw] md:px-[8vw]">
        <div className="relative">
          <div
            className="absolute left-0 md:left-[25%] top-0 bottom-0 w-px bg-[hsl(var(--border))]"
            aria-hidden
          />

          <div className="space-y-24 md:space-y-32">
            {chapters.map((c, i) => (
              <motion.article
                key={c.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid md:grid-cols-12 gap-6 md:gap-10"
              >
                <div className="md:col-span-3 pl-6 md:pl-0 md:pr-8">
                  <span
                    className="absolute left-[-5px] md:left-[calc(25%-5px)] top-2 w-[9px] h-[9px] rounded-full bg-[hsl(var(--primary))]"
                    aria-hidden
                  />
                  <MetaLabel className="mb-2">Capítulo 0{i + 1}</MetaLabel>
                  <span className="font-mono text-lg text-[hsl(var(--primary))]">
                    {c.year}
                  </span>
                </div>

                <div className="md:col-span-9 md:col-start-4 pl-6 md:pl-0 min-w-0">
                  <h2 className="font-display italic text-3xl md:text-5xl mb-5 leading-tight">
                    {c.title}
                  </h2>
                  <p className="text-[hsl(var(--muted-foreground))] text-lg leading-[1.7] text-justify max-w-none w-full hyphens-auto text-pretty">
                    {chapterBodyWithLineBreaks(c.text)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
