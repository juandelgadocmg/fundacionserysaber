import { useEffect, useState, type FormEvent } from 'react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabaseClient';
import { tiposAliado } from '../data/content';
import { useReveal } from '../lib/useReveal';
import { CheckCircle2, Loader2 } from 'lucide-react';

const inputCls = 'w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-morado outline-none bg-white';
const labelCls = 'block text-sm font-semibold text-ink/80 mb-1.5';

export default function Aliados() {
  useReveal();
  useEffect(() => { document.title = 'Aliados | Fundación Ser & Saber'; }, []);

  const [form, setForm] = useState({
    nombre: '', organizacion: '', cargo: '', email: '', telefono: '',
    tipo_organizacion: '', area_interes: '', mensaje: '',
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.nombre || !form.email) {
      setError('Por favor completa al menos tu nombre y correo.');
      return;
    }
    setEnviando(true);
    const { error: dbError } = await supabase.from('aliados').insert(form);
    setEnviando(false);
    if (dbError) {
      setError('No pudimos guardar tu propuesta. Intenta de nuevo en unos minutos.');
      console.error(dbError);
      return;
    }
    setEnviado(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Empresas y aliados"
        titulo="Construyamos impacto juntos"
        texto="Las alianzas permiten convertir necesidades sociales en oportunidades reales."
      />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="reveal space-y-6">
            <h2 className="font-display font-bold text-xl text-ink">¿Quiénes pueden ser aliados?</h2>
            <ul className="grid grid-cols-2 gap-2">
              {tiposAliado.map((t) => (
                <li key={t} className="text-sm bg-mist rounded-xl px-4 py-2.5 text-ink/75">{t}</li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            {enviado ? (
              <div className="rounded-3xl bg-mist p-10 text-center">
                <CheckCircle2 className="mx-auto text-turquesa" size={48} />
                <h3 className="font-display font-bold text-xl mt-4">¡Gracias por tu interés!</h3>
                <p className="mt-2 text-ink/70">Hemos recibido tu propuesta de alianza. Te contactaremos pronto.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Nombre *</label>
                    <input required className={inputCls} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Organización</label>
                    <input className={inputCls} value={form.organizacion} onChange={(e) => setForm({ ...form, organizacion: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Cargo</label>
                    <input className={inputCls} value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Correo *</label>
                    <input required type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Teléfono</label>
                    <input className={inputCls} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Tipo de organización</label>
                    <select className={inputCls} value={form.tipo_organizacion} onChange={(e) => setForm({ ...form, tipo_organizacion: e.target.value })}>
                      <option value="">Selecciona</option>
                      {tiposAliado.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Área de interés</label>
                  <input className={inputCls} value={form.area_interes} onChange={(e) => setForm({ ...form, area_interes: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Mensaje</label>
                  <textarea rows={4} className={inputCls} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} />
                </div>
                {error && <p className="text-sm font-semibold text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={enviando}
                  className="inline-flex items-center gap-2 rounded-full bg-morado px-8 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {enviando && <Loader2 className="animate-spin" size={16} />}
                  Proponer una alianza
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
