import { CalendarCheck, MapPin } from "lucide-react";
import pedro from "../assets/pedro-foto.png";
import WhatsAppIcon from "./icons/WhatsAppIcon";

// soft fade so the photo blends into the background instead of cutting off abruptly
const photoMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
};

function LocationBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] md:text-xs font-semibold text-teal-bright ${className}`}
    >
      <MapPin size={12} className="shrink-0" />
      Atende em consultório e a domicílio
    </span>
  );
}

function CTAButtons({ stacked = false }) {
  return (
    <div className={`flex ${stacked ? "flex-col w-full max-w-xs" : "flex-wrap"} gap-3.5 md:gap-4`}>
      <a
        href="#agendamento"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 md:px-7 py-3 md:py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal/20 transition-all hover:bg-teal-bright hover:scale-[1.02] active:scale-95 ${stacked ? "w-full" : ""}`}
      >
        <CalendarCheck size={17} />
        Agendar sessão
      </a>
      <a
        href="https://wa.me/5584996685070"
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 md:px-7 py-3 md:py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-95 ${stacked ? "w-full" : ""}`}
      >
        <WhatsAppIcon size={15} />
        (84) 99668-5070
      </a>
    </div>
  );
}

function SeeLocationsLink({ className = "" }) {
  return (
    <a
      href="#localizacao"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline underline-offset-4 decoration-white/25 hover:text-teal-bright hover:decoration-teal-bright transition-colors ${className}`}
    >
      <MapPin size={12} />
      Veja os locais de atendimento
    </a>
  );
}

export default function Hero() {
  return (
    <section id="topo" className="relative bg-navy overflow-hidden pt-24 pb-0 md:pt-40">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-20 h-[20rem] w-[20rem] rounded-full bg-teal/25 blur-[80px] md:hidden" />
      <div className="pointer-events-none absolute right-[-6rem] top-24 hidden h-[34rem] w-[34rem] rounded-full bg-teal/25 blur-[110px] md:block" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* MOBILE — centered, photo up top fading into the background */}
        <div className="flex md:hidden flex-col items-center text-center pb-14">
          <img
            src={pedro}
            alt="Pedro Augusto, massoterapeuta"
            style={photoMask}
            className="relative w-40 h-auto mb-5"
          />

          <LocationBadge className="mb-4" />

          <p className="text-sand tracking-[0.16em] text-[10px] font-semibold mb-2">
            MASSOTERAPIA &amp; TERAPIAS MANUAIS
          </p>
          <h1 className="font-display text-[1.65rem] leading-[1.18] text-white px-2">
            Relaxamento e cuidado{" "}
            <span className="italic text-teal-bright">em cada detalhe</span>
          </h1>
          <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-xs">
            Sessões pensadas para aliviar tensões, devolver mobilidade e trazer
            leveza ao seu corpo, com técnicas manuais e terapia de calor.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 w-full">
            <CTAButtons stacked />
          </div>

          <SeeLocationsLink className="mt-5" />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-2 items-end gap-10 pb-28">
          <div>
            <LocationBadge className="mb-5" />
            <p className="text-sand tracking-[0.25em] text-xs font-semibold mb-5">
              MASSOTERAPIA &amp; TERAPIAS MANUAIS
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-white">
              Relaxamento e cuidado
              <br />
              <span className="italic text-teal-bright">em cada detalhe</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-md leading-relaxed">
              Sessões pensadas para aliviar tensões, devolver mobilidade e trazer
              leveza ao seu corpo, com técnicas manuais e terapia de calor.
            </p>

            <div className="mt-9">
              <CTAButtons />
            </div>
            <SeeLocationsLink className="mt-5" />
          </div>

          <div className="relative flex justify-end">
            <img
              src={pedro}
              alt="Pedro Augusto, massoterapeuta"
              style={photoMask}
              className="relative z-10 w-72 md:w-[22rem] h-auto"
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
