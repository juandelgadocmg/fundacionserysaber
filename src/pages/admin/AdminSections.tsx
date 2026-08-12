import AdminSimpleTable from './AdminSimpleTable';

export function AdminAliados() {
  return (
    <AdminSimpleTable
      titulo="Aliados"
      tabla="aliados"
      columnas={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'organizacion', label: 'Organización' },
        { key: 'email', label: 'Correo' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'tipo_organizacion', label: 'Tipo' },
        { key: 'created_at', label: 'Fecha' },
      ]}
    />
  );
}

export function AdminContactos() {
  return (
    <AdminSimpleTable
      titulo="Contactos"
      tabla="contactos"
      columnas={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'email', label: 'Correo' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'mensaje', label: 'Mensaje' },
        { key: 'created_at', label: 'Fecha' },
      ]}
    />
  );
}

export function AdminDonaciones() {
  return (
    <AdminSimpleTable
      titulo="Donaciones"
      tabla="donaciones"
      columnas={[
        { key: 'donante', label: 'Donante' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'monto', label: 'Monto' },
        { key: 'estado', label: 'Estado' },
        { key: 'created_at', label: 'Fecha' },
      ]}
    />
  );
}

export function AdminProgramas() {
  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl text-ink mb-4">Programas</h1>
      <p className="text-sm text-ink/60 max-w-lg">
        El catálogo de programas se gestiona actualmente desde <code className="bg-mist px-1.5 py-0.5 rounded">src/data/content.ts</code>.
        Si prefieres editarlos desde aquí, se puede migrar ese contenido a la tabla <code className="bg-mist px-1.5 py-0.5 rounded">programas</code> de Supabase (incluida en el SQL) y construir un CRUD sobre ella.
      </p>
    </div>
  );
}

export function AdminProyectos() {
  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl text-ink mb-4">Proyectos</h1>
      <p className="text-sm text-ink/60 max-w-lg">
        Todavía no hay proyectos cargados. La tabla <code className="bg-mist px-1.5 py-0.5 rounded">proyectos</code> ya
        existe en Supabase (ver SQL); aquí se puede construir el formulario de creación cuando la Fundación
        tenga proyectos listos para publicar.
      </p>
    </div>
  );
}

export function AdminConfiguracion() {
  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl text-ink mb-4">Configuración</h1>
      <p className="text-sm text-ink/60 max-w-lg">
        Desde este módulo se podrán editar los datos de contacto (teléfono, correo, redes, dirección),
        los datos bancarios para donaciones y las cifras de impacto, una vez la Fundación los tenga
        disponibles. Por ahora estos campos están vacíos a propósito en <code className="bg-mist px-1.5 py-0.5 rounded">src/data/content.ts</code>.
      </p>
    </div>
  );
}
