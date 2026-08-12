import { useEffect, useState, type FormEvent } from 'react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabaseClient';
import {
  areasVoluntariado, diasSemana, horariosDia,
} from '../data/content';
import { useReveal } from '../lib/useReveal';
import { CheckCircle2, Loader2 } from 'lucide-react';

type FormState = {
  nombre: string;
  identificacion: string;
  fecha_nacimiento: string;
  edad: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  email: string;
  profesion: string;
  nivel_educativo: string;
  experiencia_voluntariado: 'Sí' | 'No' | '';
  experiencia: string;
  habilidades: string;
  areas_ser: string[];
  areas_saber: string[];
  areas_hacer: string[];
  frecuencia: string;
  dias_disponibles: string[];
  horarios: string[];
  fuera_bucaramanga: 'Sí' | 'No' | '';
  vehiculo: 'Carro' | 'Moto' | 'No' | '';
  observaciones: string;
  talento_mayor: string;
  talento_bendice_otros: string;
  motivo_voluntariado: string;
  expectativa_aporte: string;
  autorizacion_datos: boolean;
  autorizacion_fotos: boolean;
  recibir_informacion: boolean;
  disposicion_iniciar: boolean;
};

const inicial: FormState = {
  nombre: '', identificacion: '', fecha_nacimiento: '', edad: '', ciudad: '', direccion: '',
  telefono: '', email: '', profesion: '', nivel_educativo: '', experiencia_voluntariado: '',
  experiencia: '', habilidades: '', areas_ser: [], areas_saber: [], areas_hacer: [], frecuencia: '',
  dias_disponibles: [], horarios: [], fuera_bucaramanga: '', vehiculo: '', observaciones: '',
  talento_mayor: '', talento_bendice_otros: '', motivo_voluntariado: '', expectativa_aporte: '',
  autorizacion_datos: false, autorizacion_fotos: false, recibir_informacion: false,
  disposicion_iniciar: false,
};

const inputCls = 'w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-morado outline-none bg-white';
const labelCls = 'block text-sm font-semibold text-ink/80 mb-1.5';

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function Voluntariado() {
  useReveal();
  useEffect(() => { document.title = 'Voluntariado | Fundación Ser & Saber'; }, []);

  const [form, setForm] = useState<FormState>(inicial);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.autorizacion_datos) {
      setError('Debes autorizar el tratamiento de datos personales para continuar.');
      return;
    }
    if (!form.nombre || !form.email || !form.telefono) {
      setError('Por favor completa los campos obligatorios: nombre, correo y celular.');
      return;
    }

    setEnviando(true);
    const { error: dbError } = await supabase.from('voluntarios').insert({
      nombre: form.nombre,
      identificacion: form.identificacion,
      fecha_nacimiento: form.fecha_nacimiento || null,
      edad: form.edad ? Number(form.edad) : null,
      ciudad: form.ciudad,
      direccion: form.direccion,
      telefono: form.telefono,
      email: form.email,
      profesion: form.profesion,
      nivel_educativo: form.nivel_educativo,
      experiencia_voluntariado: form.experiencia_voluntariado,
      experiencia: form.experiencia,
      habilidades: form.habilidades,
      ejes_interes: [
        form.areas_ser.length ? 'SER' : null,
        form.areas_saber.length ? 'SABER' : null,
        form.areas_hacer.length ? 'HACER' : null,
      ].filter(Boolean),
      areas_interes: [...form.areas_ser, ...form.areas_saber, ...form.areas_hacer],
      frecuencia: form.frecuencia,
      dias_disponibles: form.dias_disponibles,
      horarios: form.horarios,
      fuera_bucaramanga: form.fuera_bucaramanga === 'Sí',
      vehiculo: form.vehiculo,
      observaciones: form.observaciones,
      talento_mayor: form.talento_mayor,
      talento_bendice_otros: form.talento_bendice_otros,
      motivo_voluntariado: form.motivo_voluntariado,
      expectativa_aporte: form.expectativa_aporte,
      autorizacion_datos: form.autorizacion_datos,
      autorizacion_fotos: form.autorizacion_fotos,
      recibir_informacion: form.recibir_informacion,
      estado: 'Nuevo',
    });
    setEnviando(false);

    if (dbError) {
      setError('Ocurrió un error al guardar tu registro. Por favor intenta de nuevo en unos minutos.');
      console.error(dbError);
      return;
    }
    setEnviado(true);
  }

  if (enviado) {
    return (
      <section className="py-28">
        <div className="container-page max-w-lg text-center">
          <CheckCircle2 className="mx-auto text-turquesa" size={56} />
          <h1 className="font-display font-extrabold text-3xl text-ink mt-6 text-balance">
            ¡Gracias por querer servir con propósito!
          </h1>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Hemos recibido tu registro. Pronto nos pondremos en contacto contigo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Banco de voluntarios"
        titulo="Tu servicio puede transformar vidas"
        texto="Queremos construir un banco de voluntarios con personas dispuestas a poner sus talentos, conocimientos, tiempo y experiencia al servicio de otros."
      />

      <section className="py-14 md:py-20">
        <form onSubmit={onSubmit} className="container-page max-w-3xl space-y-12 reveal">
          {/* Información personal */}
          <fieldset className="space-y-4">
            <legend className="font-display font-bold text-xl text-morado mb-2">Información personal</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nombres y apellidos *</label>
                <input required className={inputCls} value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Identificación</label>
                <input className={inputCls} value={form.identificacion} onChange={(e) => set('identificacion', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Fecha de nacimiento</label>
                <input type="date" className={inputCls} value={form.fecha_nacimiento} onChange={(e) => set('fecha_nacimiento', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Edad</label>
                <input type="number" min={0} className={inputCls} value={form.edad} onChange={(e) => set('edad', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Ciudad de residencia</label>
                <input className={inputCls} value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Dirección</label>
                <input className={inputCls} value={form.direccion} onChange={(e) => set('direccion', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Celular / WhatsApp *</label>
                <input required className={inputCls} value={form.telefono} onChange={(e) => set('telefono', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Correo electrónico *</label>
                <input required type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </div>
            </div>
          </fieldset>

          {/* Perfil */}
          <fieldset className="space-y-4">
            <legend className="font-display font-bold text-xl text-morado mb-2">Perfil</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Profesión u oficio</label>
                <input className={inputCls} value={form.profesion} onChange={(e) => set('profesion', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nivel educativo</label>
                <input className={inputCls} value={form.nivel_educativo} onChange={(e) => set('nivel_educativo', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>¿Ha participado antes en voluntariado?</label>
                <select className={inputCls} value={form.experiencia_voluntariado} onChange={(e) => set('experiencia_voluntariado', e.target.value as FormState['experiencia_voluntariado'])}>
                  <option value="">Selecciona</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Experiencia previa</label>
                <input className={inputCls} value={form.experiencia} onChange={(e) => set('experiencia', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Habilidades y talentos</label>
              <textarea rows={3} className={inputCls} value={form.habilidades} onChange={(e) => set('habilidades', e.target.value)} />
            </div>
          </fieldset>

          {/* Área donde le gustaría servir */}
          <fieldset className="space-y-4">
            <legend className="font-display font-bold text-xl text-morado mb-2">¿En qué te gustaría servir?</legend>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border-2 border-morado/20 bg-morado/5 p-5">
                <h3 className="font-display font-bold text-morado mb-3">SER</h3>
                <div className="space-y-2">
                  {areasVoluntariado.SER.map((area) => (
                    <label key={area} className="flex items-start gap-2 text-sm text-ink/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-morado"
                        checked={form.areas_ser.includes(area)}
                        onChange={() => set('areas_ser', toggleInArray(form.areas_ser, area))}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border-2 border-turquesa/25 bg-turquesa/5 p-5">
                <h3 className="font-display font-bold text-turquesa-deep mb-3">SABER</h3>
                <div className="space-y-2">
                  {areasVoluntariado.SABER.map((area) => (
                    <label key={area} className="flex items-start gap-2 text-sm text-ink/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-turquesa"
                        checked={form.areas_saber.includes(area)}
                        onChange={() => set('areas_saber', toggleInArray(form.areas_saber, area))}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border-2 border-naranja/25 bg-naranja/5 p-5">
                <h3 className="font-display font-bold text-naranja-deep mb-3">HACER</h3>
                <div className="space-y-2">
                  {areasVoluntariado.HACER.map((area) => (
                    <label key={area} className="flex items-start gap-2 text-sm text-ink/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-naranja"
                        checked={form.areas_hacer.includes(area)}
                        onChange={() => set('areas_hacer', toggleInArray(form.areas_hacer, area))}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Disponibilidad */}
          <fieldset className="space-y-4">
            <legend className="font-display font-bold text-xl text-morado mb-2">Disponibilidad</legend>
            <div>
              <label className={labelCls}>Frecuencia</label>
              <select className={inputCls} value={form.frecuencia} onChange={(e) => set('frecuencia', e.target.value)}>
                <option value="">Selecciona</option>
                {['Semanal', 'Quincenal', 'Mensual', 'Ocasional'].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <span className={labelCls}>Días disponibles</span>
              <div className="flex flex-wrap gap-2">
                {diasSemana.map((d) => (
                  <label key={d} className={`text-sm rounded-full px-4 py-1.5 cursor-pointer border ${form.dias_disponibles.includes(d) ? 'bg-turquesa text-white border-turquesa' : 'border-ink/15 text-ink/70'}`}>
                    <input type="checkbox" className="hidden" checked={form.dias_disponibles.includes(d)} onChange={() => set('dias_disponibles', toggleInArray(form.dias_disponibles, d))} />
                    {d}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className={labelCls}>Horarios</span>
              <div className="flex flex-wrap gap-2">
                {horariosDia.map((h) => (
                  <label key={h} className={`text-sm rounded-full px-4 py-1.5 cursor-pointer border ${form.horarios.includes(h) ? 'bg-naranja text-white border-naranja' : 'border-ink/15 text-ink/70'}`}>
                    <input type="checkbox" className="hidden" checked={form.horarios.includes(h)} onChange={() => set('horarios', toggleInArray(form.horarios, h))} />
                    {h}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>¿Puede participar fuera de Bucaramanga?</label>
                <select className={inputCls} value={form.fuera_bucaramanga} onChange={(e) => set('fuera_bucaramanga', e.target.value as FormState['fuera_bucaramanga'])}>
                  <option value="">Selecciona</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>¿Cuenta con vehículo?</label>
                <select className={inputCls} value={form.vehiculo} onChange={(e) => set('vehiculo', e.target.value as FormState['vehiculo'])}>
                  <option value="">Selecciona</option>
                  <option value="Carro">Carro</option>
                  <option value="Moto">Moto</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Observaciones sobre disponibilidad</label>
              <textarea rows={3} className={inputCls} value={form.observaciones} onChange={(e) => set('observaciones', e.target.value)} />
            </div>
          </fieldset>

          {/* Dones y motivación */}
          <fieldset className="space-y-4">
            <legend className="font-display font-bold text-xl text-morado mb-2">Dones y motivación</legend>
            <div>
              <label className={labelCls}>¿Cuál consideras que es el mayor talento que Dios te ha dado?</label>
              <textarea rows={2} className={inputCls} value={form.talento_mayor} onChange={(e) => set('talento_mayor', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>¿Cómo crees que ese talento puede bendecir a otros?</label>
              <textarea rows={2} className={inputCls} value={form.talento_bendice_otros} onChange={(e) => set('talento_bendice_otros', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>¿Por qué deseas ser voluntario(a) de la Fundación Ser &amp; Saber?</label>
              <textarea rows={2} className={inputCls} value={form.motivo_voluntariado} onChange={(e) => set('motivo_voluntariado', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>¿Qué esperas encontrar o aportar en esta misión?</label>
              <textarea rows={2} className={inputCls} value={form.expectativa_aporte} onChange={(e) => set('expectativa_aporte', e.target.value)} />
            </div>
          </fieldset>

          {/* Autorizaciones */}
          <fieldset className="space-y-3">
            <legend className="font-display font-bold text-xl text-morado mb-2">Autorizaciones</legend>
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" required className="mt-0.5 accent-morado" checked={form.autorizacion_datos} onChange={(e) => set('autorizacion_datos', e.target.checked)} />
              Autorizo el tratamiento de mis datos personales. *
            </label>
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" className="mt-0.5 accent-morado" checked={form.autorizacion_fotos} onChange={(e) => set('autorizacion_fotos', e.target.checked)} />
              Autorizo el uso de fotografías y videos con fines institucionales.
            </label>
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" className="mt-0.5 accent-morado" checked={form.recibir_informacion} onChange={(e) => set('recibir_informacion', e.target.checked)} />
              Deseo recibir información y convocatorias de la Fundación.
            </label>
            <label className="flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" className="mt-0.5 accent-morado" checked={form.disposicion_iniciar} onChange={(e) => set('disposicion_iniciar', e.target.checked)} />
              Estoy dispuesto(a) a iniciar mi proceso de voluntariado.
            </label>
          </fieldset>

          {error && <p className="text-sm font-semibold text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-morado px-8 py-4 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-60"
          >
            {enviando && <Loader2 className="animate-spin" size={16} />}
            {enviando ? 'Enviando...' : 'Enviar mi registro de voluntariado'}
          </button>
        </form>
      </section>
    </>
  );
}
