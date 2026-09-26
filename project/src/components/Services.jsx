import { Wind, Droplets, Activity, Dumbbell, Hand, Flame, Disc } from "lucide-react";

const services = [
  {
    icon: Wind,
    title: "Bambuterapia",
    text: "Bambus aquecidos deslizam sobre a musculatura, intensificando o relaxamento e a sensação de alívio.",
  },
  {
    icon: Droplets,
    title: "Drenagem linfática",
    text: "Reduz o inchaço e ajuda o corpo a eliminar toxinas com movimentos suaves e ritmados.",
  },
  {
    icon: Activity,
    title: "Liberação miofascial",
    text: "Alivia pontos de dor e devolve mobilidade, trabalhando as tensões presas na fáscia muscular.",
  },
  {
    icon: Dumbbell,
    title: "Massagem desportiva",
    text: "Prepara ou recupera a musculatura de quem treina, aliviando sobrecarga e prevenindo lesões.",
  },
  {
    icon: Hand,
    title: "Massagem relaxante",
    text: "Alivia o estresse e proporciona relaxamento profundo através de toques calmos e contínuos.",
  },
  {
    icon: Flame,
    title: "Pedras quentes",
    text: "Terapia de calor que potencializa o relaxamento e a liberação de tensões musculares.",
  },
  {
    icon: Disc,
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 border-t border-navy/10 pt-6">
              <Icon className="shrink-0 text-teal mt-0.5" size={24} strokeWidth={1.8} />
              <div>
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
