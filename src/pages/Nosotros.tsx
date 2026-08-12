import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import IdentidadSection from '../components/IdentidadSection';
import { marca } from '../data/content';
import { useReveal } from '../lib/useReveal';

export default function Nosotros() {
  useReveal();
  useEffect(() => { document.title = 'Nosotros | Fundación Ser & Saber'; }, []);

  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        titulo="Una entidad sin ánimo de lucro con un modelo integral de transformación"
        texto="Trabajamos por la transformación integral de personas, familias, comunidades e instituciones mediante programas sociales, educativos, productivos, comunitarios y de cooperación."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink text-balance">
              Una visión integral del ser humano
            </h2>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Nuestro enfoque parte de fortalecer el interior de las personas, desarrollar sus
              capacidades y llevar esas capacidades a la acción mediante proyectos concretos de
              impacto social.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Somos <strong>{marca.nombre}</strong>, con referencia institucional en {marca.ciudad}.
            </p>
            <blockquote className="mt-8 border-l-4 border-naranja pl-5 font-display font-bold text-xl text-morado text-balance">
              "{marca.lema}"
            </blockquote>
          </div>
          <div className="reveal rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Equipo y comunidad de la Fundación Ser & Saber"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <IdentidadSection />
    </>
  );
}
