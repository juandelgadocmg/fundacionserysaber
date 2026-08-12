import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { programas } from '../data/content';
import { useReveal } from '../lib/useReveal';

const estilos = {
  SER: { bg: 'bg-morado', text: 'text-morado', soft: 'bg-morado/8' },
  SABER: { bg: 'bg-turquesa', text: 'text-turquesa-deep', soft: 'bg-turquesa/10' },
  HACER: { bg: 'bg-naranja', text: 'text-naranja-deep', soft: 'bg-naranja/10' },
};

export default function ProgramaDetalle() {
  useReveal();
  const { slug } = useParams();
  const programa = programas.find((p) => p.slug === slug);

  useEffect(() => {
    if (programa) document.title = `${programa.nombre} | Fundación Ser & Saber`;
  }, [programa]);

  if (!programa) return <Navigate to="/programas" replace />;
  const s = estilos[programa.eje];

  return (
    <>
      <section className={`${s.soft} py-16 md:py-20`}>
        <div className="container-page">
          <Link to="/programas" className="text-sm font-semibold text-ink/60 hover:text-morado">
            ← Todos los programas
          </Link>
          <span className={`inline-block mt-4 text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1 ${s.bg} text-white`}>
            Eje {programa.eje}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 text-balance">
            {programa.nombre}
          </h1>
          <p className="mt-4 text-ink/70 max-w-2xl leading-relaxed">{programa.descripcion}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-10 reveal">
            <div>
              <h2 className="font-display font-bold text-xl text-ink">Objetivo</h2>
              <p className="mt-2 text-ink/70 leading-relaxed">
                Este contenido se completa desde el panel administrativo con la información oficial
                del programa una vez esté disponible.
              </p>
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">¿A quién está dirigido?</h2>
              <p className="mt-2 text-ink/70 leading-relaxed">
                Información pendiente de cargar por el equipo de la Fundación.
              </p>
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">¿Cómo funciona?</h2>
              <p className="mt-2 text-ink/70 leading-relaxed">
                Información pendiente de cargar por el equipo de la Fundación.
              </p>
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">Resultados esperados</h2>
              <p className="mt-2 text-ink/70 leading-relaxed">
                Información pendiente de cargar por el equipo de la Fundación.
              </p>
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink">¿Cómo participar?</h2>
              <p className="mt-2 text-ink/70 leading-relaxed">
                Información pendiente de cargar por el equipo de la Fundación.
              </p>
            </div>
          </div>

          <aside className="reveal h-fit rounded-3xl bg-mist p-6 space-y-3 sticky top-24">
            <Link
              to="/voluntariado"
              className={`block text-center rounded-full ${s.bg} px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105`}
            >
              Quiero participar
            </Link>
            <Link
              to="/donar"
              className="block text-center rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-bold text-ink hover:border-morado hover:text-morado transition-colors"
            >
              Quiero apoyar este programa
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
