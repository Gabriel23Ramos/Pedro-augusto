import { Check } from "lucide-react";

const benefits = [
  "Alívio de tensões e desconfortos musculares",
  "Maior mobilidade e sensação de liberdade nos movimentos",
  "Estímulo à circulação",
  "Redução da sensação de inchaço",
  "Relaxamento e redução do estresse",
  "Sensação de leveza e bem-estar",
  "Relaxamento profundo com o uso de pedras quentes",
];

export default function Benefits() {
  return (
    <section id="beneficios" className="relative bg-navy py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-[-8rem] bottom-[-6rem] h-[28rem] w-[28rem] rounded-full bg-teal/20 blur-[110px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-xl mb-14">
          <p className="text-sand tracking-[0.25em] text-xs font-semibold mb-4">
            O QUE UMA SESSÃO PODE PROPORCIONAR
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
            Benefícios que o seu corpo pode sentir
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20">
                <Check size={12} className="text-teal-bright" strokeWidth={3} />
              </span>
              <p className="text-white/80 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
