import { Link } from 'react-router-dom';
import { marca } from '../data/content';
import HiloSVG from './HiloSVG';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-20 md:pb-32">
      {/* Blobs de fondo */}
      <div className="pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-turquesa/10 blur-2xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-naranja/10 blur-2xl" />

      <div className="container-page grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-morado/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-morado">
            Fundación sin ánimo de lucro · {marca.ciudad}
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-balance mt-5 text-ink">
            Transformamos personas, fortalecemos capacidades y{' '}
            <span className="text-morado">generamos impacto.</span>
          </h1>
          <p className="mt-6 text-lg font-semibold text-turquesa-deep">{marca.lema}</p>
          <p className="mt-4 text-base text-ink/70 max-w-xl leading-relaxed">
            Fundación Ser &amp; Saber trabaja por la transformación integral de personas, familias y
            comunidades mediante procesos de desarrollo humano, formación y acción social.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#identidad"
              className="rounded-full bg-morado px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-morado/20 transition-transform hover:scale-105"
            >
              Conoce nuestro modelo
            </a>
            <Link
              to="/voluntariado"
              className="rounded-full border-2 border-morado px-7 py-3.5 text-sm font-bold text-morado transition-colors hover:bg-morado hover:text-white"
            >
              Quiero ser voluntario
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6">
            {(['SER', 'SABER', 'HACER'] as const).map((e) => (
              <div key={e} className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    e === 'SER' ? 'bg-morado' : e === 'SABER' ? 'bg-turquesa' : 'bg-naranja'
                  }`}
                />
                <span className="font-display font-bold text-sm tracking-wide text-ink/80">{e}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop"
              alt="Voluntarios y comunidad de la Fundación Ser & Saber trabajando juntos"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-morado-deep/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden sm:block rounded-3xl bg-white shadow-lg p-4 w-52">
            <HiloSVG className="w-full h-auto" />
            <p className="text-center text-[11px] font-bold text-ink/60 mt-1">SER · SABER · HACER</p>
          </div>
        </div>
      </div>
    </section>
  );
}
