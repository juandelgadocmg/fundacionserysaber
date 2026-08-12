import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import { useReveal } from '../lib/useReveal';

export default function Proyectos() {
  useReveal();
  useEffect(() => { document.title = 'Proyectos | Fundación Ser & Saber'; }, []);

  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        titulo="Proyectos que generan oportunidades"
        texto="Aquí se mostrarán los proyectos actuales y futuros de la Fundación, con su estado, población beneficiaria y objetivo."
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="reveal rounded-3xl border-2 border-dashed border-ink/15 p-16 text-center">
            <p className="text-ink/60 max-w-md mx-auto">
              Todavía no hay proyectos cargados. Cuando el equipo administrativo publique proyectos desde
              el panel, aparecerán aquí como tarjetas con imagen, eje, población beneficiaria, objetivo y
              estado (Próximamente, En ejecución o Finalizado).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
