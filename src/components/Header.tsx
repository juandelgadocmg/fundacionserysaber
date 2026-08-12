import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, HandHeart, HeartHandshake } from 'lucide-react';
import LogoMark from './LogoMark';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/programas?eje=SER', label: 'SER' },
  { to: '/programas?eje=SABER', label: 'SABER' },
  { to: '/programas?eje=HACER', label: 'HACER' },
  { to: '/voluntariado', label: 'Voluntariado' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-white/60 backdrop-blur'
      }`}
    >
      <div className="container-page flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark size={38} />
          <span className="leading-tight">
            <span className="block font-display font-extrabold text-xl text-ink">
              ser <span className="text-morado">&amp;</span> saber
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50 -mt-1">
              fundación
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-morado ${
                  isActive ? 'text-morado' : 'text-ink/70'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/donar"
            className="inline-flex items-center gap-1.5 rounded-full bg-naranja px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105"
          >
            <HeartHandshake size={16} /> Donar
          </Link>
          <Link
            to="/voluntariado"
            className="inline-flex items-center gap-1.5 rounded-full bg-morado px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105"
          >
            <HandHeart size={16} /> Quiero ser voluntario
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-morado"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-morado/10 bg-white px-6 py-4">
          <nav className="flex flex-col gap-3" aria-label="Navegación móvil">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-ink/80 py-1"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex gap-3 mt-4">
            <Link to="/donar" onClick={() => setOpen(false)} className="flex-1 text-center rounded-full bg-naranja px-4 py-2.5 text-sm font-bold text-white">
              Donar
            </Link>
            <Link to="/voluntariado" onClick={() => setOpen(false)} className="flex-1 text-center rounded-full bg-morado px-4 py-2.5 text-sm font-bold text-white">
              Voluntario
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
