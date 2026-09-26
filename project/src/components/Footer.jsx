import { MessageCircle, MapPin, Home } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const addresses = [
  "Rua das Flores, 694, Nova Parnamirim, Parnamirim",
  "Av. Paulistana, 2303A, Zona Norte, Natal",
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/60 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-10 pb-10 border-b border-white/10">
          {/* Brand + social */}
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-white/90">
              Pedro Augusto
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.32em] text-teal-bright">
              MASSOTERAPEUTA
            </span>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://wa.me/5584996685070"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:border-teal-bright hover:text-teal-bright transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://www.instagram.com/pa.massoterapeuta/"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:border-teal-bright hover:text-teal-bright transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm md:pt-1">
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
            <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
            <a href="#agendamento" className="hover:text-white transition-colors">Agendamento</a>
          </div>

          {/* Addresses */}
          <div id="localizacao" className="max-w-xs scroll-mt-24">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/40 mb-3">
              <Home size={13} className="text-teal-bright" />
              ATENDE TAMBÉM A DOMICÍLIO
            </p>
            <ul className="space-y-2.5 text-sm">
              {addresses.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <MapPin size={15} className="text-teal-bright shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="pt-6 text-xs text-white/35">
          © {new Date().getFullYear()} Pedro Augusto Massoterapeuta. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
