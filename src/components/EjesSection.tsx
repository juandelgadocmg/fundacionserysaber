import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ejes, type Eje } from '../data/content';

const estilos: Record<Eje, { bg: string; bgSoft: string; text: string; border: string }> = {
  SER: { bg: 'bg-morado', bgSoft: 'bg-morado/8', text: 'text-morado', border: 'border-morado' },
  SABER: { bg: 'bg-turquesa', bgSoft: 'bg-turquesa/10', text: 'text-turquesa-deep', border: 'border-turquesa' },
  HACER: { bg: 'bg-naranja', bgSoft: 'bg-naranja/10', text: 'text-naranja-deep', border: 'border-naranja' },
};

export default function EjesSection() {
  const [activo, setActivo] = useState<Eje>('SER');
  const data = ejes.find((e) => e.eje === activo)!;
  const s = estilos[activo];

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-bold uppercase tracking-wide text-naranja-deep">Nuestros ejes</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-2">
            Tres caminos, una sola transformación
          </h2>
        </div>

        <div className="flex justify-center gap-3 mt-10 mb-10 reveal">
          {ejes.map((e) => {
            const es = estilos[e.eje];
            const isActive = e.eje === activo;
            return (
              <button
                key={e.eje}
                onClick={() => setActivo(e.eje)}
                className={`rounded-full px-6 py-2.5 font-display font-bold text-sm transition-all ${
                  isActive ? `${es.bg} text-white shadow-md scale-105` : `${es.bgSoft} ${es.text}`
                }`}
              >
                {e.eje}
              </button>
            );
          })}
        </div>

        <div className={`reveal rounded-[2.5rem] border-2 ${s.border} ${s.bgSoft} p-8 md:p-12 grid md:grid-cols-[1fr_1.2fr] gap-10`}>
          <div>
            <h3 className={`font-display font-extrabold text-3xl ${s.text}`}>{data.eje}</h3>
            <p className="mt-1 font-semibold text-ink/80">{data.subtitulo}</p>
            <p className="mt-4 text-sm text-ink/70 leading-relaxed">{data.descripcion}</p>
            <Link
              to={`/programas?eje=${data.eje}`}
              className={`inline-block mt-6 rounded-full ${s.bg} px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105`}
            >
              Explorar Eje {data.eje}
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {data.lineas.map((linea) => (
              <li key={linea} className="flex items-start gap-2 text-sm text-ink/75 bg-white rounded-xl p-3.5 shadow-sm">
                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${s.bg} shrink-0`} />
                {linea}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
