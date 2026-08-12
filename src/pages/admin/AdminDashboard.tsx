import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Users, UserPlus, BookOpen, FolderKanban, Mail, HeartHandshake } from 'lucide-react';

type Stats = {
  voluntarios: number;
  nuevosVoluntarios: number;
  programas: number;
  proyectos: number;
  contactos: number;
  donaciones: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const since = new Date();
      since.setDate(since.getDate() - 30);

      const [vol, nuevos, prog, proy, cont, don] = await Promise.all([
        supabase.from('voluntarios').select('id', { count: 'exact', head: true }),
        supabase.from('voluntarios').select('id', { count: 'exact', head: true }).gte('created_at', since.toISOString()),
        supabase.from('programas').select('id', { count: 'exact', head: true }),
        supabase.from('proyectos').select('id', { count: 'exact', head: true }),
        supabase.from('contactos').select('id', { count: 'exact', head: true }),
        supabase.from('donaciones').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        voluntarios: vol.count ?? 0,
        nuevosVoluntarios: nuevos.count ?? 0,
        programas: prog.count ?? 0,
        proyectos: proy.count ?? 0,
        contactos: cont.count ?? 0,
        donaciones: don.count ?? 0,
      });
    }
    load();
  }, []);

  const tarjetas = [
    { label: 'Voluntarios registrados', value: stats?.voluntarios, icon: Users },
    { label: 'Nuevos voluntarios (30 días)', value: stats?.nuevosVoluntarios, icon: UserPlus },
    { label: 'Programas', value: stats?.programas, icon: BookOpen },
    { label: 'Proyectos', value: stats?.proyectos, icon: FolderKanban },
    { label: 'Contactos recibidos', value: stats?.contactos, icon: Mail },
    { label: 'Donaciones', value: stats?.donaciones, icon: HeartHandshake },
  ];

  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl text-ink mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tarjetas.map((t) => (
          <div key={t.label} className="rounded-2xl bg-white p-6 shadow-sm">
            <t.icon className="text-morado" size={22} />
            <p className="mt-3 text-2xl font-display font-extrabold text-ink">
              {t.value ?? '—'}
            </p>
            <p className="text-sm text-ink/60 mt-1">{t.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink/40 mt-6">
        Las cifras se calculan en tiempo real desde Supabase. Ejecuta el script SQL provisto para crear
        las tablas necesarias.
      </p>
    </div>
  );
}
