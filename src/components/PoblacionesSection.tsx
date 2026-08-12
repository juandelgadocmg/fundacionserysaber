import { poblaciones } from '../data/content';

const fotos = [
  'photo-1503676260728-1c00da094a0b', 'photo-1529333166437-7750a6dd5a70',
  'photo-1491438590914-bc09fcaaf77a', 'photo-1476703993599-0035a21b17a9',
  'photo-1447069387593-a5de0862481e', 'photo-1509062522246-3755977927d7',
  'photo-1524504388940-b1c1722653e1', 'photo-1544027993-37dbfe43562a',
  'photo-1531844251246-9a1bfaae09fc', 'photo-1594708767771-a7502209ff51',
  'photo-1552058544-f2b08422138a', 'photo-1521791136064-7986c2920216',
  'photo-1543269865-cbf427effbad', 'photo-1522075469751-3a6694fb2f61',
];

export default function PoblacionesSection() {
  return (
    <section className="py-20 md:py-28 bg-mist">
      <div className="container-page">
        <div className="max-w-2xl reveal">
          <span className="text-xs font-bold uppercase tracking-wide text-morado">A quiénes servimos</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mt-2 text-balance">
            Trabajamos donde más se necesita
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {poblaciones.map((p, i) => (
            <div
              key={p}
              className="reveal group relative aspect-square rounded-3xl overflow-hidden shadow-sm"
              style={{ transitionDelay: `${(i % 8) * 60}ms` }}
            >
              <img
                src={`https://images.unsplash.com/${fotos[i % fotos.length]}?q=80&w=500&auto=format&fit=crop`}
                alt={p}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-morado-deep/85 via-morado-deep/10 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold leading-snug">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
