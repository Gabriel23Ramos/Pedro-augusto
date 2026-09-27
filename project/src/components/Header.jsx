import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#agendamento", label: "Agendamento" },
  { href: "#localizacao", label: "Localização" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-mist/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <a href="#topo" className="flex flex-col leading-none">
          <span
            className={`font-display text-xl md:text-[1.4rem] font-semibold tracking-wide transition-colors ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Pedro Augusto
          </span>
          <span
            className={`mt-1 text-[10px] md:text-[11px] font-semibold tracking-[0.32em] transition-colors ${
              scrolled ? "text-teal" : "text-teal-bright"
            }`}
          >
            MASSOTERAPEUTA
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                scrolled ? "text-navy/80 hover:text-teal" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5584996685070"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-bright hover:scale-[1.03] active:scale-95"
          >
            <WhatsAppIcon size={15} />
            (84) 99668-5070
          </a>
        </nav>

        <button
          className={`md:hidden ${scrolled ? "text-navy" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-mist border-t border-navy/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-navy font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5584996685070"
            className="flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon size={15} /> (84) 99668-5070
          </a>
        </div>
      )}
    </header>
  );
}
