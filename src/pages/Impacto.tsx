import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import { indicadoresImpacto } from '../data/content';
import { useReveal } from '../lib/useReveal';
import {
  Users, Sparkles, Building2, Lightbulb, HandHeart, Handshake, ListChecks,
} from 'lucide-react';

const iconos = [Users, Sparkles, Building2, Lightbulb, HandHeart, Handshake, ListChecks];

export default function Impacto() {
  useReveal();
  useEffect(() => { document.title = 'Impacto | Fundación Ser & Saber'; }, []);

  return (
    <>
      <PageHero
        eyebrow="Nuestro impacto"
        titulo="El impacto empieza con una oportunidad"
        texto="Mientras consolidamos cifras oficiales, medimos nuestro trabajo a partir de indicadores cualitativos que reflejan el alcance real de nuestros procesos."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {indicadoresImpacto.map((ind, i) => {
            const Icon = iconos[i % iconos.length];
            return (
              <div key={ind} className="reveal rounded-3xl bg-mist p-7 text-center" style={{ transitionDelay: `${i * 60}ms` }}>
                <Icon className="mx-auto text-morado" size={30} />
                <p className="mt-4 font-display font-bold text-ink">{ind}</p>
                <p className="mt-1 text-xs text-ink/50">Cifra disponible próximamente</p>
              </div>
            );
          })}
        </div>
        <p className="container-page text-center text-sm text-ink/50 mt-10 reveal">
          Este espacio se actualizará con cifras oficiales desde el panel administrativo de la Fundación.
        </p>
      </section>
    </>
  );
}
