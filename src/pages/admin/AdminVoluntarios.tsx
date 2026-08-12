import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Download, Search } from 'lucide-react';

type Voluntario = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  email: string;
  profesion: string;
  ejes_interes: string[];
  areas_interes: string[];
  frecuencia: string;
  ciudad: string;
  estado: string;
};

const estados = ['Nuevo', 'Contactado', 'En proceso', 'Activo', 'Inactivo'];

function toCSV(rows: Voluntario[]) {
  const header = ['Nombre', 'WhatsApp', 'Correo', 'Profesión', 'Eje', 'Disponibilidad', 'Ciudad', 'Estado', 'Fecha'];
  const lines = rows.map((r) => [
    r.nombre, r.telefono, r.email, r.profesion, (r.ejes_interes || []).join('/'),
    r.frecuencia, r.ciudad, r.estado, new Date(r.created_at).toLocaleDateString('es-CO'),
  ].map((v) => `"${(v ?? '').toString().replace(/"/g, '""')}"`).join(','));
  return [header.join(','), ...lines].join('\n');
}

export default function AdminVoluntarios() {
  const [data, setData] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [selected, setSelected] = useState<Voluntario | null>(null);

  async function load() {
    setLoading(true);
    const { data: rows } = await supabase
      .from('voluntarios')
      .select('id, created_at, nombre, telefono, email, profesion, ejes_interes, areas_interes, frecuencia, ciudad, estado')
      .order('created_at', { ascending: false });
    setData(rows ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtrados = useMemo(() => {
    return data.filter((v) => {
      const coincideTexto = `${v.nombre} ${v.email} ${v.ciudad}`.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = !filtroEstado || v.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  }, [data, busqueda, filtroEstado]);

  async function cambiarEstado(id: string, estado: string) {
    await supabase.from('voluntarios').update({ estado }).eq('id', id);
    setData((d) => d.map((v) => (v.id === id ? { ...v, estado } : v)));
  }

  function exportarCSV() {
    const blob = new Blob([toCSV(filtrados)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voluntarios.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-extrabold text-2xl text-ink">Voluntarios</h1>
        <button onClick={exportarCSV} className="inline-flex items-center gap-2 rounded-full bg-morado px-5 py-2.5 text-sm font-bold text-white">
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" size={16} />
          <input
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, correo o ciudad..."
            className="w-full rounded-xl border border-ink/15 pl-9 pr-4 py-2.5 text-sm bg-white outline-none focus:border-morado"
          />
        </div>
        <select
          value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}
          className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm bg-white outline-none focus:border-morado"
        >
          <option value="">Todos los estados</option>
          {estados.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-mist text-ink/60 text-left">
            <tr>
              {['Nombre', 'WhatsApp', 'Correo', 'Profesión', 'Eje', 'Disponibilidad', 'Ciudad', 'Estado', 'Fecha'].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-ink/40">Cargando...</td></tr>
            ) : filtrados.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-ink/40">No hay voluntarios que coincidan.</td></tr>
            ) : filtrados.map((v) => (
              <tr key={v.id} className="border-t border-ink/5 hover:bg-mist/60 cursor-pointer" onClick={() => setSelected(v)}>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">{v.nombre}</td>
                <td className="px-4 py-3 whitespace-nowrap">{v.telefono}</td>
                <td className="px-4 py-3 whitespace-nowrap">{v.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{v.profesion}</td>
                <td className="px-4 py-3 whitespace-nowrap">{(v.ejes_interes || []).join(', ')}</td>
                <td className="px-4 py-3 whitespace-nowrap">{v.frecuencia}</td>
                <td className="px-4 py-3 whitespace-nowrap">{v.ciudad}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={v.estado} onChange={(e) => cambiarEstado(v.id, e.target.value)}
                    className="rounded-lg border border-ink/15 px-2 py-1 text-xs bg-white"
                  >
                    {estados.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-ink/50">{new Date(v.created_at).toLocaleDateString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-xl">{selected.nombre}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-ink/50 inline">Correo: </dt><dd className="inline">{selected.email}</dd></div>
              <div><dt className="text-ink/50 inline">WhatsApp: </dt><dd className="inline">{selected.telefono}</dd></div>
              <div><dt className="text-ink/50 inline">Profesión: </dt><dd className="inline">{selected.profesion}</dd></div>
              <div><dt className="text-ink/50 inline">Ciudad: </dt><dd className="inline">{selected.ciudad}</dd></div>
              <div><dt className="text-ink/50 inline">Eje: </dt><dd className="inline">{(selected.ejes_interes || []).join(', ')}</dd></div>
              <div><dt className="text-ink/50 inline">Áreas: </dt><dd className="inline">{(selected.areas_interes || []).join(', ')}</dd></div>
              <div><dt className="text-ink/50 inline">Disponibilidad: </dt><dd className="inline">{selected.frecuencia}</dd></div>
            </dl>
            <button onClick={() => setSelected(null)} className="mt-6 w-full rounded-full bg-morado px-6 py-2.5 text-sm font-bold text-white">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
