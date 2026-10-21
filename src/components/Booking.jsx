import { useMemo, useState } from 'react';
import Calendar from './Calendar.jsx';
import { SERVICE_NAMES } from './Services.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { CONFIG, waLink } from '../config.js';
import { load, save } from '../storage.js';
import { SLOTS, formatLong, isSlotAvailable, searchAvailability, toKey } from '../schedule.js';

const STORAGE_KEY = 'jsc_bookings';
const EMPTY = { name: '', phone: '', car: '', plate: '', service: '', notes: '' };

export default function Booking() {
  const [bookings, setBookings] = useState(() => load(STORAGE_KEY, []));
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [searchHour, setSearchHour] = useState('');
  const [results, setResults] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  const slotStates = useMemo(
    () => (date ? SLOTS.map((t) => ({ t, ok: isSlotAvailable(date, t, bookings) })) : []),
    [date, bookings]
  );

  const pick = (d, t = '') => {
    setDate(d);
    setTime(t);
    setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setError('');
  };

  const runSearch = () => setResults(searchAvailability(bookings, searchHour));

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!date || !time) return setError('Selecciona un día y una hora.');
    if (!form.name.trim() || !form.phone.trim() || !form.car.trim() || !form.service)
      return setError('Completa nombre, teléfono, vehículo y servicio.');
    if (!/^[+\d\s()-]{8,}$/.test(form.phone.trim())) return setError('Ingresa un teléfono válido.');
    if (!isSlotAvailable(date, time, bookings)) return setError('Esa hora ya no está disponible, elige otra.');

    const booking = { ...form, date: toKey(date), time, createdAt: Date.now() };
    const next = [...bookings, booking];
    setBookings(next);
    save(STORAGE_KEY, next);

    const msg =
      `Hola ${CONFIG.name}, agendé una hora:\n` +
      `📅 ${formatLong(date)} a las ${time} hrs.\n` +
      `👤 ${booking.name} (${booking.phone})\n` +
      `🚗 ${booking.car}${booking.plate ? ` – ${booking.plate.toUpperCase()}` : ''}\n` +
      `🔧 ${booking.service}` +
      (booking.notes ? `\n📝 ${booking.notes}` : '');

    setConfirmed({ date, time, name: booking.name, wa: waLink(msg) });
    setForm(EMPTY);
    setTime('');
    setResults(null);
  };

  return (
    <section className="section" id="agenda">
      <div className="container">
        <p className="eyebrow">Reserva en línea</p>
        <h2 className="section__title">Agenda tu hora</h2>
        <p className="section__sub">
          Atendemos de lunes a viernes de 09:00 a 18:00 hrs. La última hora de recepción es a las 15:00 hrs.
        </p>

        <div className="booking">
          <div className="card">
            <div className="search">
              <label htmlFor="searchHour">Buscar hora disponible</label>
              <div className="search__row">
                <select id="searchHour" value={searchHour} onChange={(e) => setSearchHour(e.target.value)}>
                  <option value="">Cualquier hora</option>
                  {SLOTS.map((t) => <option key={t} value={t}>{t} hrs.</option>)}
                </select>
                <button type="button" className="btn btn--red btn--sm" onClick={runSearch}>Buscar</button>
              </div>
              {results && (
                <div className="search__results" aria-live="polite">
                  {results.length === 0 ? (
                    <p className="muted">No hay disponibilidad para esa hora en los próximos meses.</p>
                  ) : (
                    <>
                      <p className="muted">Próximas horas disponibles:</p>
                      <div className="chips">
                        {results.map((r) => (
                          <button type="button" className="chip" key={toKey(r.date) + r.time} onClick={() => pick(r.date, r.time)}>
                            {r.date.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' })} · {r.time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <Calendar month={month} onMonthChange={setMonth} selected={date} onSelect={(d) => pick(d)} bookings={bookings} />
          </div>

          <div className="card">
            <h3 className="booking__date">
              {date ? <>Horas para el <span>{formatLong(date)}</span></> : 'Selecciona un día en el calendario'}
            </h3>

            {date && (
              <div className="slots">
                {slotStates.map(({ t, ok }) => (
                  <button
                    type="button"
                    key={t}
                    className={`slot${time === t ? ' is-selected' : ''}`}
                    disabled={!ok}
                    onClick={() => { setTime(t); setError(''); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <form className="form" onSubmit={submit} noValidate>
              <div className="form__grid">
                <label>Nombre
                  <input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Juan Pérez" />
                </label>
                <label>Teléfono
                  <input name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" placeholder="+56 9 1234 5678" />
                </label>
                <label>Vehículo
                  <input name="car" value={form.car} onChange={update} placeholder="Marca, modelo y año" />
                </label>
                <label>Patente
                  <input name="plate" value={form.plate} onChange={update} placeholder="ABCD12" />
                </label>
                <label className="form__full">Servicio
                  <select name="service" value={form.service} onChange={update}>
                    <option value="">Selecciona un servicio</option>
                    {SERVICE_NAMES.map((s) => <option key={s}>{s}</option>)}
                    <option>Otro</option>
                  </select>
                </label>
                <label className="form__full">Comentario (opcional)
                  <textarea name="notes" rows="3" value={form.notes} onChange={update} placeholder="Cuéntanos qué le pasa a tu auto" />
                </label>
              </div>
              {error && <p className="form__error" role="alert">{error}</p>}
              <button type="submit" className="btn btn--red btn--block" disabled={!date || !time}>
                {date && time ? `Confirmar reserva · ${time} hrs.` : 'Confirmar reserva'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {confirmed && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setConfirmed(null)}>
          <div className="modal__box card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal__check">✓</div>
            <h3 id="modalTitle">¡Reserva registrada!</h3>
            <p>
              {confirmed.name}, te esperamos el <strong>{formatLong(confirmed.date)}</strong> a las{' '}
              <strong>{confirmed.time} hrs.</strong>
            </p>
            <a href={confirmed.wa} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--block">
              <WhatsAppIcon width="20" height="20" /> Confirmar por WhatsApp
            </a>
            <button type="button" className="btn btn--ghost btn--block" onClick={() => setConfirmed(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}
