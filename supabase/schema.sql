-- ============================================================
-- FUNDACIÓN SER & SABER — Esquema de base de datos (Supabase)
-- Ejecutar completo en: Supabase → SQL Editor → New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- TABLA: voluntarios
-- ============================================================
create table if not exists public.voluntarios (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Información personal
  nombre text not null,
  identificacion text,
  fecha_nacimiento date,
  edad integer,
  ciudad text,
  direccion text,
  telefono text not null,
  email text not null,

  -- Perfil
  profesion text,
  nivel_educativo text,
  experiencia_voluntariado text,
  experiencia text,
  habilidades text,

  -- Área de servicio
  ejes_interes text[] default '{}',
  areas_interes text[] default '{}',

  -- Disponibilidad
  frecuencia text,
  dias_disponibles text[] default '{}',
  horarios text[] default '{}',
  fuera_bucaramanga boolean,
  vehiculo text,
  observaciones text,

  -- Dones y motivación
  talento_mayor text,
  talento_bendice_otros text,
  motivo_voluntariado text,
  expectativa_aporte text,

  -- Autorizaciones
  autorizacion_datos boolean not null default false,
  autorizacion_fotos boolean not null default false,
  recibir_informacion boolean not null default false,

  -- Gestión interna
  estado text not null default 'Nuevo'
    check (estado in ('Nuevo', 'Contactado', 'En proceso', 'Activo', 'Inactivo'))
);

create index if not exists idx_voluntarios_estado on public.voluntarios (estado);
create index if not exists idx_voluntarios_created_at on public.voluntarios (created_at desc);

-- ============================================================
-- TABLA: programas
-- ============================================================
create table if not exists public.programas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text unique not null,
  nombre text not null,
  eje text not null check (eje in ('SER', 'SABER', 'HACER')),
  descripcion text,
  objetivo text,
  dirigido_a text,
  como_funciona text,
  resultados_esperados text,
  como_participar text,
  poblacion_beneficiaria text[] default '{}',
  publicado boolean not null default true
);

create index if not exists idx_programas_eje on public.programas (eje);

-- ============================================================
-- TABLA: proyectos
-- ============================================================
create table if not exists public.proyectos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  eje text check (eje in ('SER', 'SABER', 'HACER')),
  descripcion text,
  poblacion_beneficiaria text,
  objetivo text,
  imagen_url text,
  estado text not null default 'Próximamente'
    check (estado in ('Próximamente', 'En ejecución', 'Finalizado')),
  publicado boolean not null default true
);

-- ============================================================
-- TABLA: contactos
-- ============================================================
create table if not exists public.contactos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text,
  mensaje text not null,
  atendido boolean not null default false
);

-- ============================================================
-- TABLA: donaciones
-- ============================================================
create table if not exists public.donaciones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  donante text,
  email text,
  telefono text,
  tipo text default 'Monetaria' check (tipo in ('Monetaria', 'Especie')),
  monto numeric,
  descripcion_especie text,
  estado text not null default 'Pendiente'
    check (estado in ('Pendiente', 'Confirmada', 'Anulada'))
);

-- ============================================================
-- TABLA: aliados
-- ============================================================
create table if not exists public.aliados (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  organizacion text,
  cargo text,
  email text not null,
  telefono text,
  tipo_organizacion text,
  area_interes text,
  mensaje text,
  estado text not null default 'Nuevo'
    check (estado in ('Nuevo', 'Contactado', 'En proceso', 'Activo', 'Inactivo'))
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Regla general: el público (rol "anon") solo puede INSERTAR
-- en las tablas que alimentan los formularios públicos, nunca
-- leer, modificar ni borrar. El personal autenticado de la
-- Fundación (rol "authenticated", vía Supabase Auth) tiene
-- control total para gestionar la información desde el panel.
-- ============================================================

alter table public.voluntarios enable row level security;
alter table public.programas   enable row level security;
alter table public.proyectos   enable row level security;
alter table public.contactos   enable row level security;
alter table public.donaciones  enable row level security;
alter table public.aliados     enable row level security;

-- ---- voluntarios ----
create policy "Público puede registrarse como voluntario"
  on public.voluntarios for insert
  to anon
  with check (true);

create policy "Equipo autenticado gestiona voluntarios"
  on public.voluntarios for all
  to authenticated
  using (true)
  with check (true);

-- ---- programas (lectura pública, gestión interna) ----
create policy "Público puede ver programas publicados"
  on public.programas for select
  to anon
  using (publicado = true);

create policy "Equipo autenticado gestiona programas"
  on public.programas for all
  to authenticated
  using (true)
  with check (true);

-- ---- proyectos (lectura pública, gestión interna) ----
create policy "Público puede ver proyectos publicados"
  on public.proyectos for select
  to anon
  using (publicado = true);

create policy "Equipo autenticado gestiona proyectos"
  on public.proyectos for all
  to authenticated
  using (true)
  with check (true);

-- ---- contactos ----
create policy "Público puede enviar mensajes de contacto"
  on public.contactos for insert
  to anon
  with check (true);

create policy "Equipo autenticado gestiona contactos"
  on public.contactos for all
  to authenticated
  using (true)
  with check (true);

-- ---- donaciones ----
create policy "Público puede registrar una intención de donación"
  on public.donaciones for insert
  to anon
  with check (true);

create policy "Equipo autenticado gestiona donaciones"
  on public.donaciones for all
  to authenticated
  using (true)
  with check (true);

-- ---- aliados ----
create policy "Público puede proponer una alianza"
  on public.aliados for insert
  to anon
  with check (true);

create policy "Equipo autenticado gestiona aliados"
  on public.aliados for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- DATOS INICIALES DE PROGRAMAS (opcional)
-- Carga el catálogo base de programas para que también viva en
-- la base de datos, no solo en el código fuente del sitio.
-- Puedes omitir este bloque si prefieres seguir gestionando los
-- programas únicamente desde src/data/content.ts.
-- ============================================================

insert into public.programas (slug, nombre, eje, descripcion) values
  ('escuela-ser', 'Escuela SER', 'SER', 'Procesos de formación humana y fortalecimiento personal.'),
  ('mujeres-con-proposito', 'Mujeres con Propósito', 'SER', 'Acompañamiento a la dignidad y restauración de la mujer.'),
  ('jovenes-con-futuro', 'Jóvenes con Futuro', 'SER', 'Juventud con propósito y proyecto de vida.'),
  ('paz-en-comunidad', 'Paz en Comunidad', 'SER', 'Paz, perdón, reconciliación y resocialización.'),
  ('familias-con-proposito', 'Familias con Propósito', 'SER', 'Familia, crianza y protección.'),
  ('mentores-ser', 'Mentores SER', 'SER', 'Liderazgo, acompañamiento y sentido de propósito.'),
  ('mi-talento-mi-camino', 'Mi Talento, Mi Camino', 'SER', 'Identidad, talentos y proyecto de vida.'),
  ('ninos-con-esperanza', 'Niños con Esperanza', 'SER', 'Niñez y adolescencia con propósito.'),
  ('aprendo-para-avanzar', 'Aprendo para Avanzar', 'SABER', 'Aprendizajes básicos y nivelación educativa.'),
  ('alfabetizacion-con-proposito', 'Alfabetización con Propósito', 'SABER', 'Alfabetización y aprendizajes básicos.'),
  ('club-de-lectura-ser', 'Club de Lectura SER', 'SABER', 'Fomento de la lectura y la expresión.'),
  ('matematicas-para-la-vida', 'Matemáticas para la Vida', 'SABER', 'Competencias básicas aplicadas a la vida diaria.'),
  ('puente-escolar', 'Puente Escolar', 'SABER', 'Permanencia educativa y acompañamiento escolar.'),
  ('aula-abierta-ser', 'Aula Abierta SER', 'SABER', 'Tutorías y acompañamiento escolar.'),
  ('habitos-que-transforman', 'Hábitos que Transforman', 'SABER', 'Formación en hábitos y competencias para la vida.'),
  ('familias-que-acompanan-el-saber', 'Familias que Acompañan el Saber', 'SABER', 'Vinculación familiar en los procesos educativos.'),
  ('hacer-para-emprender', 'Hacer para Emprender', 'HACER', 'Emprendimiento y generación de ingresos.'),
  ('oficios-con-proposito', 'Oficios con Propósito', 'HACER', 'Formación en oficios y empleabilidad.'),
  ('mercadito-ser', 'Mercadito SER', 'HACER', 'Economía popular y proyectos productivos.'),
  ('semilla-productiva', 'Semilla Productiva', 'HACER', 'Proyectos productivos comunitarios.'),
  ('cocina-que-transforma', 'Cocina que Transforma', 'HACER', 'Seguridad alimentaria y nutrición.'),
  ('ruta-al-trabajo', 'Ruta al Trabajo', 'HACER', 'Empleabilidad y habilidades laborales.'),
  ('mi-primera-oportunidad', 'Mi Primera Oportunidad', 'HACER', 'Proyecto productivo y primer empleo.'),
  ('brigada-ser-en-comunidad', 'Brigada SER en Comunidad', 'HACER', 'Acción comunitaria y transformación territorial.'),
  ('manos-a-la-obra', 'Manos a la Obra', 'HACER', 'Acción social directa en comunidad.'),
  ('voluntarios-que-transforman', 'Voluntarios que Transforman', 'HACER', 'Movilización del banco de voluntarios.'),
  ('ecoser-comunidad', 'EcoSER Comunidad', 'HACER', 'Medio ambiente y sostenibilidad comunitaria.'),
  ('recicla-con-proposito', 'Recicla con Propósito', 'HACER', 'Sostenibilidad ambiental y territorio.'),
  ('siembra-esperanza', 'Siembra Esperanza', 'HACER', 'Gestión de proyectos y sostenibilidad institucional.')
on conflict (slug) do nothing;
