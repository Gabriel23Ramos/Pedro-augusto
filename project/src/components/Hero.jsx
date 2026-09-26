import { Phone, CalendarCheck, MapPin } from "lucide-react";
import pedro from "../assets/pedro-foto.png";

// soft fade so the photo blends into the background instead of cutting off abruptly
const photoMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
};

function LocationBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-teal-bright/35 bg-white/5 px-3.5 py-1.5 text-[10px] md:text-xs font-semibold text-teal-bright ${className}`}
    >
      <MapPin size={12} className="shrink-0" />
      Atende em consultório e a domicílio
    </span>
  );
}

export default function Hero() {
  return (
    <section id="topo" className="relative bg-navy overflow-hidden pt-24 pb-0 md:pt-40">
      {/* glow behind photo */}
      <div className="pointer-events-none absolute right-[-6rem] top-16 md:top-24 h-[24rem] w-[24rem] md:h-[34rem] md:w-[34rem] rounded-full bg-teal/25 blur-[90px] md:blur-[110px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* MOBILE layout: text on the left, photo on the right, near the top */}
        <div className="flex md:hidden items-start justify-between gap-4 mb-8">
          <div className="flex-1 pt-1">
            <LocationBadge className="mb-3" />
            <p className="text-sand tracking-[0.16em] text-[10px] font-semibold mb-2">
              FISIOTERAPIA &amp; TERAPIAS MANUAIS
            </p>
            <h1 className="font-display text-2xl leading-[1.15] text-white">
              Relaxamento e cuidado{" "}
              <span className="italic text-teal-bright">em cada detalhe</span>
            </h1>
          </div>

          <img
            src={pedro}
            alt="Pedro Augusto, fisioterapeuta"
            style={photoMask}
            className="w-28 sm:w-32 h-auto shrink-0 drop-shadow-[0_18px_22px_rgba(0,0,0,0.4)]"
          />
        </div>

        <div className="grid md:grid-cols-2 items-end gap-10 pb-14 md:pb-28">
          <div>
            {/* DESKTOP-only heading (shown beside the big photo instead) */}
            <div className="hidden md:block">
              <LocationBadge className="mb-5" />
              <p className="text-sand tracking-[0.25em] text-xs font-semibold mb-5">
                FISIOTERAPIA &amp; TERAPIAS MANUAIS
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-white">
                Relaxamento e cuidado
                <br />
                <span className="italic text-teal-bright">em cada detalhe</span>
              </h1>
            </div>

            <p className="text-white/70 text-base sm:text-lg max-w-md leading-relaxed md:mt-6">
              Sessões pensadas para aliviar tensões, devolver mobilidade e trazer
              leveza ao seu corpo — com técnicas manuais e terapia de calor.
            </p>

            <div className="mt-7 md:mt-9 flex flex-wrap gap-3.5 md:gap-4">
              <a
                href="#agendamento"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 md:px-7 py-3 md:py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal/20 transition-all hover:bg-teal-bright hover:scale-[1.03] active:scale-95"
              >
                <CalendarCheck size={17} />
                Agendar sessão
              </a>
              <a
                href="https://wa.me/5584996685070"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 md:px-7 py-3 md:py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/10 hover:scale-[1.03] active:scale-95"
              >
                <Phone size={16} />
                (84) 99668-5070
              </a>
            </div>
          </div>

          {/* DESKTOP-only big photo */}
          <div className="hidden md:flex relative justify-center md:justify-end">
            <img
              src={pedro}
              alt="Pedro Augusto, fisioterapeuta"
              style={photoMask}
              className="relative z-10 w-72 md:w-[22rem] h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
            />
          </div>
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
