import { Link } from 'react-router-dom';
import { programas } from '../data/content';
import ProgramaCard from './ProgramaCard';

const destacados = [
  'escuela-ser', 'aprendo-para-avanzar', 'hacer-para-emprender',
  'jovenes-con-futuro', 'puente-escolar', 'mercadito-ser',
  'mujeres-con-proposito', 'club-de-lectura-ser', 'brigada-ser-en-comunidad',
];

export default function ProgramasDestacados() {
  const lista = programas.filter((p) => destacados.includes(p.slug));
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap justify-between items-end gap-4 reveal">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wide text-turquesa-deep">Programas destacados</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-2 text-balance">
              Iniciativas que ya están en marcha
            </h2>
          </div>
          <Link
            to="/programas"
            className="rounded-full border-2 border-morado px-6 py-2.5 text-sm font-bold text-morado hover:bg-morado hover:text-white transition-colors"
          >
            Ver todos los programas
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lista.map((p) => (
            <ProgramaCard key={p.slug} programa={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
