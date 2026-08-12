import { ejes } from '../data/content';
import HiloSVG from './HiloSVG';

const iconos: Record<string, string> = {
  SER: '◐',
  SABER: '◑',
  HACER: '◒',
};

export default function IdentidadSection() {
  return (
    <section id="identidad" className="py-20 md:py-28 bg-mist">
      <div className="container-page">
        <div className="max-w-2xl reveal">
          <span className="text-xs font-bold uppercase tracking-wide text-turquesa-deep">Nuestra identidad</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-2 text-balance">
            Una fundación que transforma de manera integral
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            No trabajamos mediante actividades aisladas, sino mediante procesos que conectan tres
            momentos de una misma transformación: el <strong className="text-morado">SER</strong> fortalece a
            la persona, el <strong className="text-turquesa-deep">SABER</strong> desarrolla sus capacidades y
            el <strong className="text-naranja-deep">HACER</strong> convierte esas capacidades en acción.
          </p>
        </div>

        <HiloSVG className="w-full h-auto max-w-3xl mx-auto my-10 hidden md:block" />

        <div className="grid md:grid-cols-3 gap-6">
          {ejes.map((e, i) => (
            <div
              key={e.eje}
              className="reveal rounded-3xl bg-white p-8 shadow-sm border border-ink/5"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white ${
                  e.eje === 'SER' ? 'bg-morado' : e.eje === 'SABER' ? 'bg-turquesa' : 'bg-naranja'
                }`}
              >
                {iconos[e.eje]}
              </div>
              <h3 className="font-display font-extrabold text-2xl mt-5 text-ink">{e.eje}</h3>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">{e.descripcion}</p>
            </div>
          ))}
        </div>

        <p className="reveal text-center font-display font-bold text-lg sm:text-xl text-morado mt-14 text-balance">
          SER + SABER + HACER = <span className="text-naranja-deep">TRANSFORMACIÓN CON PROPÓSITO</span>
        </p>
      </div>
    </section>
  );
}
