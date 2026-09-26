import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "../assets/logo-horizontal.png";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#agendamento", label: "Agendamento" },
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
        <a href="#topo" className="flex items-center h-10">
          <img src={logo} alt="Pedro Augusto Massoterapeuta" className="h-9 w-auto" />
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
            className="flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-bright transition-colors"
          >
            <Phone size={15} strokeWidth={2.4} />
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
            <Phone size={15} /> (84) 99668-5070
          </a>
        </div>
      )}
    </header>
  );
}
