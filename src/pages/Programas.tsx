import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ProgramaCard from '../components/ProgramaCard';
import { programas, type Eje } from '../data/content';
import { useReveal } from '../lib/useReveal';

const ejesFiltro: (Eje | 'TODOS')[] = ['TODOS', 'SER', 'SABER', 'HACER'];

export default function Programas() {
  useReveal();
  const [params, setParams] = useSearchParams();
  const ejeParam = (params.get('eje') as Eje) || 'TODOS';
  const [eje, setEje] = useState<Eje | 'TODOS'>(ejeParam);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => { document.title = 'Programas | Fundación Ser & Saber'; }, []);
  useEffect(() => { setEje(ejeParam); }, [ejeParam]);

  const filtrados = useMemo(() => {
    return programas.filter((p) => {
      const coincideEje = eje === 'TODOS' || p.eje === eje;
      const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return coincideEje && coincideTexto;
    });
  }, [eje, busqueda]);

  return (
    <>
      <PageHero
        eyebrow="Catálogo de programas"
        titulo="Programas que fortalecen, forman y transforman"
        texto="Explora nuestras líneas de acción organizadas por eje. Filtra según el área que más te interese."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-3 mb-10 reveal">
            {ejesFiltro.map((e) => (
              <button
                key={e}
                onClick={() => {
                  setEje(e);
                  if (e === 'TODOS') params.delete('eje'); else params.set('eje', e);
                  setParams(params, { replace: true });
                }}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  eje === e ? 'bg-morado text-white' : 'bg-morado/8 text-morado hover:bg-morado/15'
                }`}
              >
                {e === 'TODOS' ? 'Todos' : e}
              </button>
            ))}
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar programa..."
              className="ml-auto w-full sm:w-64 rounded-full border border-ink/10 px-5 py-2 text-sm focus:border-morado outline-none"
              aria-label="Buscar programa"
            />
          </div>

          {filtrados.length === 0 ? (
            <p className="text-ink/60 text-center py-16">No encontramos programas con ese filtro.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtrados.map((p) => (
                <ProgramaCard key={p.slug} programa={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
