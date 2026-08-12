import { useEffect, useState, type FormEvent } from 'react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabaseClient';
import { datosContacto, marca } from '../data/content';
import { useReveal } from '../lib/useReveal';
import { CheckCircle2, Loader2, MapPin, Mail, Phone } from 'lucide-react';

const inputCls = 'w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-morado outline-none bg-white';
const labelCls = 'block text-sm font-semibold text-ink/80 mb-1.5';

export default function Contacto() {
  useReveal();
  useEffect(() => { document.title = 'Contacto | Fundación Ser & Saber'; }, []);

  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.nombre || !form.email || !form.mensaje) {
      setError('Completa nombre, correo y mensaje.');
      return;
    }
    setEnviando(true);
    const { error: dbError } = await supabase.from('contactos').insert(form);
    setEnviando(false);
    if (dbError) {
      setError('No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.');
      console.error(dbError);
      return;
    }
    setEnviado(true);
  }

  return (
    <>
      <PageHero eyebrow="Contacto" titulo="Hablemos" texto={`${marca.nombre} · ${marca.ciudad}`} />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div className="reveal space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="text-morado shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-ink/70">{datosContacto.direccion || marca.ciudad}</p>
            </div>
            {datosContacto.email && (
              <div className="flex items-start gap-3">
                <Mail className="text-morado shrink-0 mt-0.5" size={20} />
                <a href={`mailto:${datosContacto.email}`} className="text-sm text-ink/70 hover:text-morado">{datosContacto.email}</a>
              </div>
            )}
            {datosContacto.whatsapp && (
              <div className="flex items-start gap-3">
                <Phone className="text-morado shrink-0 mt-0.5" size={20} />
                <a href={`https://wa.me/${datosContacto.whatsapp}`} className="text-sm text-ink/70 hover:text-morado">{datosContacto.whatsapp}</a>
              </div>
            )}
            {!datosContacto.email && !datosContacto.whatsapp && (
              <p className="text-xs text-ink/40 rounded-xl border border-dashed border-ink/15 p-4">
                El correo, WhatsApp, dirección exacta y redes sociales se mostrarán aquí cuando la
                Fundación los configure en el panel administrativo.
              </p>
            )}
          </div>

          <div className="reveal">
            {enviado ? (
              <div className="rounded-3xl bg-mist p-10 text-center">
                <CheckCircle2 className="mx-auto text-turquesa" size={48} />
                <h3 className="font-display font-bold text-xl mt-4">¡Mensaje enviado!</h3>
                <p className="mt-2 text-ink/70">Gracias por escribirnos. Te responderemos pronto.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className={labelCls}>Nombre *</label>
                  <input required className={inputCls} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Correo *</label>
                    <input required type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Teléfono</label>
                    <input className={inputCls} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Mensaje *</label>
                  <textarea required rows={5} className={inputCls} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} />
                </div>
                {error && <p className="text-sm font-semibold text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={enviando}
                  className="inline-flex items-center gap-2 rounded-full bg-morado px-8 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {enviando && <Loader2 className="animate-spin" size={16} />}
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
