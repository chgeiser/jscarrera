// Datos del taller: edita aquí número, Instagram, dirección y horarios.
export const CONFIG = {
  name: 'JS Carrera',
  whatsapp: '56997728106', // formato internacional sin "+" ni espacios
  whatsappLabel: '+56 9 9772 8106',
  instagram: 'js.carrera', // usuario sin "@"
  email: 'jscarrera@gmail.com',
  address: 'Av. Alemparte 5965, Concepción',
  // 36°46'08.8"S 73°05'06.1"W
  lat: -36.769111,
  lng: -73.085028,

  // Horario de atención 09:00 – 18:00, última hora de recepción 15:00
  openHour: 9,
  closeHour: 18,
  lastSlotHour: 15,
  slotMinutes: 60,
  workDays: [1, 2, 3, 4, 5], // 0 = domingo … 6 = sábado
  maxPerSlot: 1, // vehículos que se reciben por bloque
  monthsAhead: 2,
};

export const waLink = (text = '') =>
  `https://wa.me/${CONFIG.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const igLink = () => `https://instagram.com/${CONFIG.instagram}`;

export const mailLink = (subject = 'Consulta desde la web') =>
  `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}`;

export const mapEmbed = () =>
  `https://maps.google.com/maps?q=${CONFIG.lat},${CONFIG.lng}&z=17&hl=es&output=embed`;

export const mapDirections = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${CONFIG.lat},${CONFIG.lng}`;
