import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import { marca } from '../data/content';

export function TratamientoDatos() {
  useEffect(() => { document.title = 'Política de tratamiento de datos | Fundación Ser & Saber'; }, []);
  return (
    <>
      <PageHero eyebrow="Legal" titulo="Política de tratamiento de datos personales" />
      <section className="py-14">
        <div className="container-page max-w-2xl text-sm text-ink/70 leading-relaxed space-y-4">
          <p>
            {marca.nombre} trata los datos personales recolectados a través de este sitio (formularios de
            voluntariado, contacto y alianzas) con el único fin de gestionar los procesos institucionales
            relacionados con voluntariado, donaciones, alianzas y comunicación con la comunidad.
          </p>
          <p>
            El texto completo de esta política será publicado por la Fundación desde el panel
            administrativo. Este espacio queda preparado para su carga oficial.
          </p>
        </div>
      </section>
    </>
  );
}

export function Terminos() {
  useEffect(() => { document.title = 'Términos y condiciones | Fundación Ser & Saber'; }, []);
  return (
    <>
      <PageHero eyebrow="Legal" titulo="Términos y condiciones" />
      <section className="py-14">
        <div className="container-page max-w-2xl text-sm text-ink/70 leading-relaxed space-y-4">
          <p>
            El uso de este sitio web implica la aceptación de los términos que {marca.nombre} defina
            oficialmente. El texto completo será publicado por la Fundación desde el panel administrativo.
          </p>
        </div>
      </section>
    </>
  );
}
