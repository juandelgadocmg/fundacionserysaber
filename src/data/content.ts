// Contenido institucional de la Fundación Ser & Saber.
// Todo lo que aparece aquí proviene del brief/documentos institucionales.
// Los campos vacíos (dirección, teléfono, redes, cifras) se dejan listos
// para completarse desde el panel de configuración — no se inventan datos.

export type Eje = 'SER' | 'SABER' | 'HACER';

export const ejeColor: Record<Eje, { bg: string; text: string; ring: string }> = {
  SER: { bg: 'bg-morado', text: 'text-morado', ring: 'ring-morado' },
  SABER: { bg: 'bg-turquesa', text: 'text-turquesa', ring: 'ring-turquesa' },
  HACER: { bg: 'bg-naranja', text: 'text-naranja', ring: 'ring-naranja' },
};

export const marca = {
  nombre: 'Fundación Ser & Saber',
  lema: 'Ser para crecer, saber para transformar y hacer para generar impacto.',
  formula: 'SER + SABER + HACER = TRANSFORMACIÓN CON PROPÓSITO',
  ciudad: 'Bucaramanga, Santander, Colombia',
};

export const ejes: {
  eje: Eje;
  subtitulo: string;
  descripcion: string;
  lineas: string[];
}[] = [
  {
    eje: 'SER',
    subtitulo: 'Desarrollo humano, inclusión y bienestar',
    descripcion:
      'Fortalecemos a las personas desde su identidad, autoestima, valores, proyecto de vida, salud emocional, liderazgo, convivencia, espiritualidad, inclusión y sentido de propósito.',
    lineas: [
      'Servicio, solidaridad y asistencia humanitaria',
      'Familia, crianza y protección',
      'Mujer, dignidad y restauración',
      'Niñez, adolescencia y juventud con propósito',
      'Adulto mayor, cuidado y dignidad',
      'Paz, perdón, reconciliación y resocialización',
      'Salud física, emocional y espiritual',
      'Inclusión, discapacidad y comunidad',
    ],
  },
  {
    eje: 'SABER',
    subtitulo: 'Formación, conocimiento, competencias y oportunidades',
    descripcion:
      'Fortalecemos el acceso al conocimiento, el desarrollo de competencias, la permanencia educativa, la inclusión digital, la formación para el trabajo, el emprendimiento, la ciudadanía y la educación ambiental.',
    lineas: [
      'Alfabetización, nivelación y aprendizajes básicos',
      'Permanencia educativa, tutorías y acompañamiento escolar',
      'Competencias digitales, tecnología e innovación social',
      'Formación para el trabajo, empleabilidad y oficios',
      'Emprendimiento, economía popular y autonomía financiera',
      'Bilingüismo, comunicación y expresión',
      'Educación para la ciudadanía, derechos y cultura de paz',
      'Educación ambiental, ciencia y desarrollo sostenible',
    ],
  },
  {
    eje: 'HACER',
    subtitulo: 'Acción, emprendimiento e impacto',
    descripcion:
      'Convertimos los aprendizajes y capacidades en acciones concretas al servicio de las comunidades.',
    lineas: [
      'Emprendimiento, productividad y generación de ingresos',
      'Empleabilidad, habilidades laborales y proyecto productivo',
      'Acción comunitaria, voluntariado y transformación territorial',
      'Seguridad alimentaria, nutrición y apoyo básico',
      'Inclusión, accesibilidad y vida digna',
      'Medio ambiente, territorio y sostenibilidad comunitaria',
      'Cultura, recreación, arte y expresión comunitaria',
      'Gestión de proyectos, alianzas y sostenibilidad institucional',
    ],
  },
];

export const poblaciones: string[] = [
  'Niños, niñas y adolescentes',
  'Jóvenes',
  'Mujeres',
  'Familias',
  'Adultos mayores',
  'Personas con discapacidad',
  'Cuidadores',
  'Migrantes',
  'Personas privadas de la libertad y en proceso de resocialización',
  'Habitantes de calle',
  'Comunidades rurales',
  'Personas desempleadas',
  'Familias en situación de vulnerabilidad',
  'Líderes comunitarios',
];

export type Programa = {
  slug: string;
  nombre: string;
  eje: Eje;
  descripcion: string;
};

export const programas: Programa[] = [
  // SER
  { slug: 'escuela-ser', nombre: 'Escuela SER', eje: 'SER', descripcion: 'Procesos de formación humana y fortalecimiento personal.' },
  { slug: 'mujeres-con-proposito', nombre: 'Mujeres con Propósito', eje: 'SER', descripcion: 'Acompañamiento a la dignidad y restauración de la mujer.' },
  { slug: 'jovenes-con-futuro', nombre: 'Jóvenes con Futuro', eje: 'SER', descripcion: 'Juventud con propósito y proyecto de vida.' },
  { slug: 'paz-en-comunidad', nombre: 'Paz en Comunidad', eje: 'SER', descripcion: 'Paz, perdón, reconciliación y resocialización.' },
  { slug: 'familias-con-proposito', nombre: 'Familias con Propósito', eje: 'SER', descripcion: 'Familia, crianza y protección.' },
  { slug: 'mentores-ser', nombre: 'Mentores SER', eje: 'SER', descripcion: 'Liderazgo, acompañamiento y sentido de propósito.' },
  { slug: 'mi-talento-mi-camino', nombre: 'Mi Talento, Mi Camino', eje: 'SER', descripcion: 'Identidad, talentos y proyecto de vida.' },
  { slug: 'ninos-con-esperanza', nombre: 'Niños con Esperanza', eje: 'SER', descripcion: 'Niñez y adolescencia con propósito.' },
  // SABER
  { slug: 'aprendo-para-avanzar', nombre: 'Aprendo para Avanzar', eje: 'SABER', descripcion: 'Aprendizajes básicos y nivelación educativa.' },
  { slug: 'alfabetizacion-con-proposito', nombre: 'Alfabetización con Propósito', eje: 'SABER', descripcion: 'Alfabetización y aprendizajes básicos.' },
  { slug: 'club-de-lectura-ser', nombre: 'Club de Lectura SER', eje: 'SABER', descripcion: 'Fomento de la lectura y la expresión.' },
  { slug: 'matematicas-para-la-vida', nombre: 'Matemáticas para la Vida', eje: 'SABER', descripcion: 'Competencias básicas aplicadas a la vida diaria.' },
  { slug: 'puente-escolar', nombre: 'Puente Escolar', eje: 'SABER', descripcion: 'Permanencia educativa y acompañamiento escolar.' },
  { slug: 'aula-abierta-ser', nombre: 'Aula Abierta SER', eje: 'SABER', descripcion: 'Tutorías y acompañamiento escolar.' },
  { slug: 'habitos-que-transforman', nombre: 'Hábitos que Transforman', eje: 'SABER', descripcion: 'Formación en hábitos y competencias para la vida.' },
  { slug: 'familias-que-acompanan-el-saber', nombre: 'Familias que Acompañan el Saber', eje: 'SABER', descripcion: 'Vinculación familiar en los procesos educativos.' },
  // HACER
  { slug: 'hacer-para-emprender', nombre: 'Hacer para Emprender', eje: 'HACER', descripcion: 'Emprendimiento y generación de ingresos.' },
  { slug: 'oficios-con-proposito', nombre: 'Oficios con Propósito', eje: 'HACER', descripcion: 'Formación en oficios y empleabilidad.' },
  { slug: 'mercadito-ser', nombre: 'Mercadito SER', eje: 'HACER', descripcion: 'Economía popular y proyectos productivos.' },
  { slug: 'semilla-productiva', nombre: 'Semilla Productiva', eje: 'HACER', descripcion: 'Proyectos productivos comunitarios.' },
  { slug: 'cocina-que-transforma', nombre: 'Cocina que Transforma', eje: 'HACER', descripcion: 'Seguridad alimentaria y nutrición.' },
  { slug: 'ruta-al-trabajo', nombre: 'Ruta al Trabajo', eje: 'HACER', descripcion: 'Empleabilidad y habilidades laborales.' },
  { slug: 'mi-primera-oportunidad', nombre: 'Mi Primera Oportunidad', eje: 'HACER', descripcion: 'Proyecto productivo y primer empleo.' },
  { slug: 'brigada-ser-en-comunidad', nombre: 'Brigada SER en Comunidad', eje: 'HACER', descripcion: 'Acción comunitaria y transformación territorial.' },
  { slug: 'manos-a-la-obra', nombre: 'Manos a la Obra', eje: 'HACER', descripcion: 'Acción social directa en comunidad.' },
  { slug: 'voluntarios-que-transforman', nombre: 'Voluntarios que Transforman', eje: 'HACER', descripcion: 'Movilización del banco de voluntarios.' },
  { slug: 'ecoser-comunidad', nombre: 'EcoSER Comunidad', eje: 'HACER', descripcion: 'Medio ambiente y sostenibilidad comunitaria.' },
  { slug: 'recicla-con-proposito', nombre: 'Recicla con Propósito', eje: 'HACER', descripcion: 'Sostenibilidad ambiental y territorio.' },
  { slug: 'siembra-esperanza', nombre: 'Siembra Esperanza', eje: 'HACER', descripcion: 'Gestión de proyectos y sostenibilidad institucional.' },
];

export const indicadoresImpacto: string[] = [
  'Personas fortalecidas',
  'Capacidades desarrolladas',
  'Comunidades acompañadas',
  'Oportunidades generadas',
  'Voluntarios movilizados',
  'Alianzas construidas',
  'Proyectos ejecutados',
];

export const areasVoluntariado: Record<Eje, string[]> = {
  SER: [
    'Niñez, juventud y familias',
    'Mujeres y adulto mayor',
    'Desarrollo espiritual y proyecto de vida',
    'Inclusión y restauración',
    'Otro',
  ],
  SABER: [
    'Refuerzo escolar y alfabetización',
    'Tecnología y formación para el empleo',
    'Emprendimiento y educación financiera',
    'Formación y capacitación',
    'Otro',
  ],
  HACER: [
    'Brigadas y campañas solidarias',
    'Logística y donaciones',
    'Comunicaciones, diseño y redes',
    'Apoyo operativo',
    'Otro',
  ],
};

export const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const horariosDia = ['Mañana', 'Tarde', 'Noche'];
export const tiposAliado = [
  'Empresa', 'Universidad', 'Institución educativa', 'Entidad pública',
  'Iglesia', 'Fundación', 'Organización social', 'Profesional independiente', 'Voluntario',
];

// Datos de contacto: se dejan vacíos a propósito — se completan desde
// el panel de Configuración cuando existan datos oficiales reales.
export const datosContacto = {
  telefono: '',
  whatsapp: '',
  email: '',
  direccion: '',
  instagram: '',
  facebook: '',
  linkedin: '',
};
