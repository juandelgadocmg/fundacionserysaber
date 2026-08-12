# Fundación Ser & Saber — Sitio web institucional

Sitio construido con **React + TypeScript + Tailwind CSS v4 + React Router + Supabase**.

## Estructura

```
src/
  components/     Header, Footer, Hero, secciones de home, LogoMark, etc.
  pages/          Páginas públicas (Home, Nosotros, Programas, Voluntariado, ...)
  pages/admin/    Panel administrativo (login, dashboard, voluntarios, etc.)
  layouts/        SiteLayout (público) y AdminLayout (protegido)
  data/content.ts Todo el contenido institucional en un solo lugar editable
  lib/            Cliente de Supabase y hooks (reveal on scroll, auth)
supabase/
  schema.sql      Script SQL completo: tablas + RLS + catálogo de programas
```

## Cómo subir esto a Lovable

**Opción A — Recomendada: GitHub**
1. Sube este proyecto a un repositorio de GitHub (puedes arrastrar la carpeta en github.com o usar `git push`).
2. En Lovable, elige "Import from GitHub" y selecciona el repositorio.
3. Conecta Supabase desde el botón nativo de Lovable (esto configura automáticamente `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).
4. Ve a Supabase → SQL Editor → pega y ejecuta el contenido de `supabase/schema.sql`.
5. En Supabase → Authentication → agrega un usuario (correo/contraseña) para poder entrar a `/admin`.

**Opción B — Local primero**
```bash
npm install
cp .env.example .env   # completa con tus datos de Supabase
npm run dev
```

## Panel administrativo

- URL: `/admin` (redirige a `/admin/login` si no hay sesión).
- La autenticación es 100% de Supabase Auth — crea los usuarios del equipo desde el dashboard de Supabase (Authentication → Users → Add user), no hay registro público.
- Antes de crear usuarios admin, ejecuta `supabase/schema.sql` para que existan las tablas.

## Contenido pendiente por completar (a propósito, sin datos inventados)

Editables en `src/data/content.ts`:
- `datosContacto`: teléfono, WhatsApp, correo, dirección, redes sociales.

Editables desde `/admin` una vez cargados datos reales:
- Cifras de impacto (actualmente solo indicadores cualitativos).
- Datos bancarios y botón de pago para donaciones.
- Contenido detallado de cada programa (objetivo, a quién está dirigido, cómo funciona, resultados esperados, cómo participar) — actualmente cada página de programa muestra un texto de marcador de posición.
- Proyectos (la sección está lista pero vacía hasta que se publiquen proyectos reales).

## Notas técnicas

- Tailwind v4 (sin `tailwind.config.js`; los tokens de diseño viven en `src/index.css` con `@theme`).
- El formulario de voluntariado replica exactamente el formulario institucional oficial (información personal, perfil, áreas de servicio SER/SABER/HACER, disponibilidad, dones y motivación, autorizaciones) y guarda cada registro en la tabla `voluntarios` de Supabase.
- RLS (Row Level Security) está activo en todas las tablas: el público solo puede insertar en los formularios; solo usuarios autenticados (el equipo) pueden leer, editar o eliminar.
