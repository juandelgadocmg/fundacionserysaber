import { Link } from 'react-router-dom';
import HiloSVG from './HiloSVG';

export default function VoluntariadoTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-morado px-8 py-16 md:px-16 text-center">
          <div className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-turquesa/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-naranja/20 blur-2xl" />
          <HiloSVG className="w-64 h-auto mx-auto mb-6 opacity-90" />
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white text-balance max-w-2xl mx-auto">
            Tu servicio puede transformar vidas
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto leading-relaxed">
            Queremos construir un banco de voluntarios con personas dispuestas a poner sus talentos,
            conocimientos, tiempo y experiencia al servicio de otros.
          </p>
          <Link
            to="/voluntariado"
            className="inline-block mt-8 rounded-full bg-naranja px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Quiero ser voluntario
          </Link>
        </div>
      </div>
    </section>
  );
}
