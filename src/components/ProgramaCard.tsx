import { Link } from 'react-router-dom';
import type { Programa } from '../data/content';

const estilos = {
  SER: 'bg-morado/10 text-morado',
  SABER: 'bg-turquesa/10 text-turquesa-deep',
  HACER: 'bg-naranja/10 text-naranja-deep',
};

export default function ProgramaCard({ programa }: { programa: Programa }) {
  return (
    <Link
      to={`/programas/${programa.slug}`}
      className="reveal group block rounded-3xl bg-white border border-ink/5 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <span className={`inline-block text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1 ${estilos[programa.eje]}`}>
        {programa.eje}
      </span>
      <h3 className="font-display font-bold text-lg mt-4 text-ink group-hover:text-morado transition-colors">
        {programa.nombre}
      </h3>
      <p className="mt-2 text-sm text-ink/65 leading-relaxed">{programa.descripcion}</p>
      <span className="inline-block mt-4 text-sm font-bold text-morado">Conocer programa →</span>
    </Link>
  );
}
