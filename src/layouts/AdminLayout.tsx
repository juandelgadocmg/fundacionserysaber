import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../lib/useAdminAuth';
import { supabase } from '../lib/supabaseClient';
import {
  LayoutDashboard, Users, BookOpen, FolderKanban, Handshake, Mail, HeartHandshake, Settings, LogOut,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/voluntarios', label: 'Voluntarios', icon: Users },
  { to: '/admin/programas', label: 'Programas', icon: BookOpen },
  { to: '/admin/proyectos', label: 'Proyectos', icon: FolderKanban },
  { to: '/admin/aliados', label: 'Aliados', icon: Handshake },
  { to: '/admin/contactos', label: 'Contactos', icon: Mail },
  { to: '/admin/donaciones', label: 'Donaciones', icon: HeartHandshake },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminLayout() {
  const { session, loading } = useAdminAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-ink/50">Cargando...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-mist">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-morado-deep text-white p-5">
        <h1 className="font-display font-extrabold text-lg mb-8 px-2">Ser &amp; Saber · Admin</h1>
        <nav className="flex-1 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/60 hover:text-white"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
