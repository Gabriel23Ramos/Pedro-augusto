import { Wind, Droplets, Activity, Dumbbell, Hand, Flame, Disc } from "lucide-react";

import bambuterapia from "../assets/services/bambuterapia.jpg";
import drenagemLinfatica from "../assets/services/drenagem-linfatica.jpg";
import liberacaoMiofascial from "../assets/services/liberacao-miofascial.jpg";
import massagemDesportiva from "../assets/services/massagem-desportiva.jpg";
import massagemRelaxante from "../assets/services/massagem-relaxante.jpg";
import pedrasQuentes from "../assets/services/pedras-quentes.jpg";
import ventosaterapia from "../assets/services/ventosaterapia.jpg";

const services = [
  {
    icon: Wind,
    image: bambuterapia,
    title: "Bambuterapia",
    text: "Bambus aquecidos deslizam sobre a musculatura, intensificando o relaxamento e a sensação de alívio.",
  },
  {
    icon: Droplets,
    image: drenagemLinfatica,
    title: "Drenagem linfática",
    text: "Reduz o inchaço e ajuda o corpo a eliminar toxinas com movimentos suaves e ritmados.",
  },
  {
    icon: Activity,
    image: liberacaoMiofascial,
    title: "Liberação miofascial",
    text: "Alivia pontos de dor e devolve mobilidade, trabalhando as tensões presas na fáscia muscular.",
  },
  {
    icon: Dumbbell,
    image: massagemDesportiva,
    title: "Massagem desportiva",
    text: "Prepara ou recupera a musculatura de quem treina, aliviando sobrecarga e prevenindo lesões.",
  },
  {
    icon: Hand,
    image: massagemRelaxante,
    title: "Massagem relaxante",
    text: "Alivia o estresse e proporciona relaxamento profundo através de toques calmos e contínuos.",
  },
  {
    icon: Flame,
    image: pedrasQuentes,
    title: "Pedras quentes",
    text: "Terapia de calor que potencializa o relaxamento e a liberação de tensões musculares.",
  },
  {
    icon: Disc,
    image: ventosaterapia,
    title: "Ventosaterapia",
    text: "Estimula a circulação sanguínea e ajuda a reduzir tensões acumuladas no tecido muscular.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="text-teal tracking-[0.25em] text-xs font-semibold mb-4">
            NOSSOS SERVIÇOS
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">
            Técnicas para cada tipo de cuidado
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, image, title, text }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/0 to-navy/0" />
              </div>

              <span className="absolute top-[9.75rem] left-5 flex h-11 w-11 items-center justify-center rounded-full bg-teal text-white shadow-md ring-4 ring-white">
                <Icon size={20} strokeWidth={1.8} />
              </span>

              <div className="px-5 pb-6 pt-8">
                <h3 className="font-display text-lg text-navy mb-1.5">{title}</h3>
                <p className="text-sm text-navy/65 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
