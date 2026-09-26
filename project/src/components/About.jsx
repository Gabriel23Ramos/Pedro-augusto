import logoCircular from "../assets/logo-circular.png";

export default function About() {
  return (
    <section id="sobre" className="bg-mist py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[auto_1fr] items-center gap-12">
        <img
          src={logoCircular}
          alt="Selo Pedro Augusto Massoterapeuta"
          className="w-36 md:w-44 mx-auto md:mx-0"
        />
        <div className="max-w-2xl">
          <p className="text-teal tracking-[0.25em] text-xs font-semibold mb-4">
            SOBRE O ATENDIMENTO
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">
            Um cuidado feito na medida do seu corpo
          </h2>
          <p className="mt-5 text-navy/70 leading-relaxed">
            Sou Pedro Augusto, massoterapeuta, e trabalho com técnicas manuais
            e terapias complementares para aliviar dores, reduzir o estresse
            e devolver a sensação de leveza ao dia a dia. Cada sessão é
            conduzida com atenção aos detalhes, do ambiente ao ritmo das
            técnicas, para que o atendimento seja, além de eficaz, um
            momento só seu.
          </p>
        </div>
      </div>
    </section>
  );
}
