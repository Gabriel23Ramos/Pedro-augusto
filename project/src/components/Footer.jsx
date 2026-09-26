import { Phone } from "lucide-react";
import logo from "../assets/logo-horizontal.png";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/60 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-white/10">
          <img src={logo} alt="Pedro Augusto Massoterapeuta" className="h-8 w-auto opacity-90" />

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
            <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
            <a href="#agendamento" className="hover:text-white transition-colors">Agendamento</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5584996685070"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:border-teal-bright hover:text-teal-bright transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        <p className="pt-6 text-xs text-white/35">
          © {new Date().getFullYear()} Pedro Augusto Massoterapeuta. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
