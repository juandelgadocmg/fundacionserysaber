import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="container-page">
        <p className="font-display font-extrabold text-6xl text-morado/20">404</p>
        <h1 className="font-display font-extrabold text-2xl text-ink mt-4">Página no encontrada</h1>
        <p className="text-ink/60 mt-2">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="inline-block mt-8 rounded-full bg-morado px-6 py-3 text-sm font-bold text-white">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
