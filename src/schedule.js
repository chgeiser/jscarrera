import { CONFIG } from './config.js';

const pad = (n) => String(n).padStart(2, '0');

// Bloques de recepción: 09:00, 10:00 … 15:00 (nunca después de lastSlotHour)
export const SLOTS = (() => {
  const out = [];
  for (let m = CONFIG.openHour * 60; m <= CONFIG.lastSlotHour * 60; m += CONFIG.slotMinutes) {
    out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  }
  return out;
})();

export const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromKey = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const lastBookableDay = () => {
  const t = startOfDay(new Date());
  return new Date(t.getFullYear(), t.getMonth() + CONFIG.monthsAhead + 1, 0);
};

export const formatLong = (d) =>
  d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

// Ocupación simulada para que la demo se vea realista (determinística por fecha).
const DEMO_OCCUPANCY = true;
function demoTaken(key, time) {
  if (!DEMO_OCCUPANCY) return false;
  let h = 0;
  for (const c of key + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 100 < 28;
}

export function isOpenDay(d) {
  const day = startOfDay(d);
  return (
    CONFIG.workDays.includes(day.getDay()) &&
    day >= startOfDay(new Date()) &&
    day <= lastBookableDay()
  );
}

export function isSlotAvailable(date, time, bookings) {
  if (!isOpenDay(date)) return false;
  const key = toKey(date);
  const [hh, mm] = time.split(':').map(Number);
  const slotStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hh, mm);
  if (slotStart <= new Date()) return false;
  if (demoTaken(key, time)) return false;
  const count = bookings.filter((b) => b.date === key && b.time === time).length;
  return count < CONFIG.maxPerSlot;
}

export const freeSlots = (date, bookings) => SLOTS.filter((t) => isSlotAvailable(date, t, bookings));

// Próximos días con disponibilidad (opcionalmente para una hora específica)
export function searchAvailability(bookings, time = '', limit = 6) {
  const results = [];
  const end = lastBookableDay();
  for (let d = startOfDay(new Date()); d <= end && results.length < limit; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const times = time ? (isSlotAvailable(date, time, bookings) ? [time] : []) : freeSlots(date, bookings);
    if (times.length) results.push({ date, time: times[0] });
  }
  return results;
}
