export default function PageHero({
  eyebrow,
  titulo,
  texto,
}: {
  eyebrow: string;
  titulo: string;
  texto?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-mist py-16 md:py-20">
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-turquesa/10 blur-2xl" />
      <div className="container-page relative">
        <span className="text-xs font-bold uppercase tracking-wide text-morado">{eyebrow}</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-2 max-w-3xl text-balance">
          {titulo}
        </h1>
        {texto && <p className="mt-4 text-ink/70 max-w-2xl leading-relaxed">{texto}</p>}
      </div>
    </section>
  );
}
