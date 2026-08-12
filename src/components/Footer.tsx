import { Link } from 'react-router-dom';
import { marca, datosContacto } from '../data/content';
import LogoMark from './LogoMark';

const cols = [
  { title: 'Fundación', links: [
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/programas', label: 'Programas' },
    { to: '/proyectos', label: 'Proyectos' },
    { to: '/impacto', label: 'Impacto' },
  ]},
  { title: 'Ejes', links: [
    { to: '/programas?eje=SER', label: 'SER' },
    { to: '/programas?eje=SABER', label: 'SABER' },
    { to: '/programas?eje=HACER', label: 'HACER' },
  ]},
  { title: 'Participa', links: [
    { to: '/voluntariado', label: 'Voluntariado' },
    { to: '/donar', label: 'Donaciones' },
    { to: '/aliados', label: 'Aliados' },
    { to: '/contacto', label: 'Contacto' },
  ]},
];

export default function Footer() {
  return (
    <footer className="bg-morado-deep text-white mt-24">
      <div className="container-page py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <LogoMark size={32} />
            <span className="font-display font-extrabold text-xl">ser &amp; saber</span>
          </div>
          <p className="text-white/70 text-sm max-w-xs text-balance">{marca.lema}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-white/50 mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/80 hover:text-turquesa text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} {marca.nombre} · {marca.ciudad}</p>
          <div className="flex gap-5">
            <Link to="/legal/tratamiento-datos" className="hover:text-white/80">Política de tratamiento de datos</Link>
            <Link to="/legal/terminos" className="hover:text-white/80">Términos y condiciones</Link>
          </div>
        </div>
      </div>
      {!datosContacto.email && (
        <div className="sr-only">Datos de contacto pendientes de configuración institucional.</div>
      )}
    </footer>
  );
}
