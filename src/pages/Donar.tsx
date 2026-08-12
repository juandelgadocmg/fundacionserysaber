import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useReveal } from '../lib/useReveal';
import { CreditCard, Package, Handshake } from 'lucide-react';

export default function Donar() {
  useReveal();
  useEffect(() => { document.title = 'Donar | Fundación Ser & Saber'; }, []);

  return (
    <>
      <PageHero
        eyebrow="Donaciones"
        titulo="Tu aporte puede convertirse en una oportunidad"
        texto="Las donaciones pueden apoyar procesos sociales, educativos, productivos y comunitarios de la Fundación."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid sm:grid-cols-3 gap-5">
          <div className="reveal rounded-3xl bg-mist p-7">
            <CreditCard className="text-naranja" size={28} />
            <h2 className="font-display font-bold text-lg mt-4">Donar</h2>
            <p className="mt-2 text-sm text-ink/65 leading-relaxed">
              El botón de pago en línea se habilitará aquí cuando la Fundación configure su pasarela de pagos.
            </p>
            <button disabled className="mt-5 w-full rounded-full bg-naranja/40 px-6 py-3 text-sm font-bold text-white cursor-not-allowed">
              Próximamente
            </button>
          </div>
          <div className="reveal rounded-3xl bg-mist p-7">
            <Package className="text-turquesa-deep" size={28} />
            <h2 className="font-display font-bold text-lg mt-4">Donar en especie</h2>
            <p className="mt-2 text-sm text-ink/65 leading-relaxed">
              Escríbenos para coordinar una donación en especie (alimentos, materiales, elementos para los programas).
            </p>
            <Link to="/contacto" className="mt-5 block text-center rounded-full bg-turquesa px-6 py-3 text-sm font-bold text-white">
              Contactar
            </Link>
          </div>
          <div className="reveal rounded-3xl bg-mist p-7">
            <Handshake className="text-morado" size={28} />
            <h2 className="font-display font-bold text-lg mt-4">Ser aliado</h2>
            <p className="mt-2 text-sm text-ink/65 leading-relaxed">
              Si representas una empresa u organización, conoce cómo aliarte con la Fundación.
            </p>
            <Link to="/aliados" className="mt-5 block text-center rounded-full bg-morado px-6 py-3 text-sm font-bold text-white">
              Quiero ser aliado
            </Link>
          </div>
        </div>

        <div className="reveal container-page mt-10 rounded-2xl border border-dashed border-ink/15 p-6 text-sm text-ink/50">
          Los datos de transferencia bancaria se publicarán aquí una vez sean cargados por el equipo
          administrativo de la Fundación, desde el panel de Configuración.
        </div>
      </section>
    </>
  );
}
