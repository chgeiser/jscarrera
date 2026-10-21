// Trabajos realizados. Para agregar uno:
// 1. Copia la foto en /public/trabajos/ (ej: public/trabajos/jaula-evo.jpg)
// 2. Agrega un objeto aquí con image: '/trabajos/jaula-evo.jpg'
// Si image está vacío se muestra una tarjeta de reemplazo.
export const TRABAJOS = [
  {
    title: 'Jaula antivuelco multipunto',
    category: 'Jaulas',
    vehicle: 'Mitsubishi Lancer Evo IX',
    description: 'Fabricación y soldadura de jaula multipunto en acero cromoly, con refuerzos de puertas y techo.',
    image: '',
  },
  {
    title: 'Jaula para rally',
    category: 'Jaulas',
    vehicle: 'Suzuki Swift Sport',
    description: 'Jaula a medida según reglamento de rally, con barras de protección lateral.',
    image: '',
  },
  {
    title: 'Ajuste de motor completo',
    category: 'Motor',
    vehicle: 'Toyota Corolla 1.8',
    description: 'Desarme, rectificado y armado de motor con kit de distribución nuevo.',
    image: '',
  },
  {
    title: 'Cambio de embrague',
    category: 'Mecánica general',
    vehicle: 'Nissan Navara',
    description: 'Reemplazo de kit de embrague y volante bimasa, prueba en ruta.',
    image: '',
  },
  {
    title: 'Frenos de alto rendimiento',
    category: 'Frenos y suspensión',
    vehicle: 'Volkswagen Golf GTI',
    description: 'Instalación de discos ranurados, pastillas deportivas y purga con líquido DOT 4.',
    image: '',
  },
  {
    title: 'Suspensión coilover',
    category: 'Frenos y suspensión',
    vehicle: 'Honda Civic',
    description: 'Montaje y regulación de suspensión coilover con alineación final.',
    image: '',
  },
];

// Cifras de la franja de logros (edítalas con los números reales del taller)
export const STATS = [
  { value: 500, suffix: '+', label: 'Trabajos realizados' },
  { value: 40, suffix: '+', label: 'Jaulas fabricadas' },
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 98, suffix: '%', label: 'Clientes satisfechos' },
];
