import { Link } from 'react-router-dom';
import { HandHeart, HeartHandshake, Handshake, Users } from 'lucide-react';

const tarjetas = [
  { icon: HandHeart, titulo: 'Voluntario', texto: 'Comparte tu tiempo y tus talentos.', to: '/voluntariado', color: 'bg-morado' },
  { icon: HeartHandshake, titulo: 'Donante', texto: 'Contribuye a transformar necesidades en oportunidades.', to: '/donar', color: 'bg-naranja' },
  { icon: Handshake, titulo: 'Aliado', texto: 'Construyamos proyectos de impacto juntos.', to: '/aliados', color: 'bg-turquesa' },
  { icon: Users, titulo: 'Beneficiario', texto: 'Conoce nuestras oportunidades y procesos.', to: '/programas', color: 'bg-morado' },
];

export default function ComoParticipar() {
  return (
    <section className="py-20 md:py-28 bg-mist">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs font-bold uppercase tracking-wide text-naranja-deep">Cómo puedes participar</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-2">Elige tu manera de aportar</h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tarjetas.map((t, i) => (
            <Link
              key={t.titulo}
              to={t.to}
              className="reveal group rounded-3xl bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${t.color}`}>
                <t.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-lg mt-4">{t.titulo}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">{t.texto}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
