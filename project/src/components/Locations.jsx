import { MapPin, Home, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Nova Parnamirim",
    address: "Rua das Flores, 694",
    fullAddress: "Rua das Flores, 694, Nova Parnamirim, Parnamirim - RN",
  },
  {
    name: "Zona Norte de Natal",
    address: "Av. Paulistana, 2303A",
    fullAddress: "Av. Paulistana, 2303A - Potengi, Natal - RN, 59108-120",
  },
];

export default function Locations() {
  return (
    <section id="localizacao" className="scroll-mt-24 bg-mist py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-4">
          <p className="text-teal tracking-[0.25em] text-xs font-semibold mb-4">
            ONDE ATENDEMOS
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">
            Consultório ou no seu endereço
          </h2>
        </div>
        <p className="flex items-center gap-2 max-w-xl text-navy/65 mb-12">
          <Home size={15} className="text-teal shrink-0" />
          Também atendemos a domicílio, em toda a região.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
            >
              <iframe
                title={`Mapa — ${loc.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(loc.fullAddress)}&output=embed`}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-5">
                <h3 className="font-display text-lg text-navy mb-1.5">{loc.name}</h3>
                <p className="flex items-start gap-2 text-sm text-navy/65 mb-4">
                  <MapPin size={15} className="text-teal shrink-0 mt-0.5" />
                  {loc.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.fullAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-bright transition-colors"
                >
                  Como chegar
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
