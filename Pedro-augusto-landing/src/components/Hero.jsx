import { Phone, CalendarCheck } from "lucide-react";
import pedro from "../assets/pedro-foto.png";

export default function Hero() {
  return (
    <section id="topo" className="relative bg-navy overflow-hidden pt-32 pb-0 md:pt-40">
      {/* glow behind photo */}
      <div className="pointer-events-none absolute right-[-6rem] top-24 h-[34rem] w-[34rem] rounded-full bg-teal/25 blur-[110px]" />

      <div className="max-w-6xl mx-auto px-6 relative grid md:grid-cols-2 items-end gap-10">
        <div className="pb-20 md:pb-28">
          <p className="text-sand tracking-[0.25em] text-xs font-semibold mb-5">
            MASSOTERAPIA &amp; TERAPIAS MANUAIS
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-white">
            Relaxamento e cuidado
            <br />
            <span className="italic text-teal-bright">em cada detalhe</span>
          </h1>
          <p className="mt-6 text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
            Sessões pensadas para aliviar tensões, devolver mobilidade e trazer
            leveza ao seu corpo — com técnicas manuais e terapia de calor.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#agendamento"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-white hover:bg-teal-bright transition-colors"
            >
              <CalendarCheck size={17} />
              Agendar sessão
            </a>
            <a
              href="https://wa.me/5584996685070"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              (84) 99668-5070
            </a>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <img
            src={pedro}
            alt="Pedro Augusto, massoterapeuta"
            className="relative z-10 w-56 sm:w-72 md:w-[22rem] h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* wave divider */}
      <svg
        className="relative block w-full text-mist"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,90 480,0 720,20 C960,40 1200,90 1440,40 L1440,90 L0,90 Z"
        />
      </svg>
    </section>
  );
}
