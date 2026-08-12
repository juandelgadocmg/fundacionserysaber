import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminSimpleTable({
  titulo, tabla, columnas,
}: {
  titulo: string;
  tabla: string;
  columnas: { key: string; label: string }[];
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase.from(tabla).select('*').order('created_at', { ascending: false });
      setRows(data ?? []);
      setLoading(false);
    }
    load();
  }, [tabla]);

  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl text-ink mb-6">{titulo}</h1>
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-mist text-ink/60 text-left">
            <tr>{columnas.map((c) => <th key={c.key} className="px-4 py-3 font-semibold whitespace-nowrap">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columnas.length} className="px-4 py-8 text-center text-ink/40">Cargando...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={columnas.length} className="px-4 py-8 text-center text-ink/40">Todavía no hay registros.</td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} className="border-t border-ink/5">
                {columnas.map((c) => (
                  <td key={c.key} className="px-4 py-3 whitespace-nowrap">{String(r[c.key] ?? '—')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
