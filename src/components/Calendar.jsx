import { freeSlots, isOpenDay, lastBookableDay, startOfDay, toKey } from '../schedule.js';

const WEEK = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export default function Calendar({ month, onMonthChange, selected, onSelect, bookings }) {
  const year = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(year, m, 1);
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // semana parte el lunes

  const today = startOfDay(new Date());
  const canPrev = new Date(year, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(year, m + 1, 1) <= lastBookableDay();

  const label = first.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(<span key={`e${i}`} />);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, m, day);
    const free = isOpenDay(date) ? freeSlots(date, bookings).length : 0;
    const state = free === 0 ? 'off' : free <= 2 ? 'few' : 'free';
    const isSel = selected && toKey(selected) === toKey(date);
    const isToday = toKey(date) === toKey(today);
    cells.push(
      <button
        type="button"
        key={day}
        className={`cal__day cal__day--${state}${isSel ? ' is-selected' : ''}${isToday ? ' is-today' : ''}`}
        disabled={state === 'off'}
        onClick={() => onSelect(date)}
        aria-label={`${day}, ${free} horas disponibles`}
      >
        {day}
        {state !== 'off' && <i className={`dot dot--${state}`} />}
      </button>
    );
  }

  return (
    <div className="cal">
      <div className="cal__head">
        <button type="button" className="cal__nav" disabled={!canPrev} onClick={() => onMonthChange(new Date(year, m - 1, 1))} aria-label="Mes anterior">‹</button>
        <h3>{label}</h3>
        <button type="button" className="cal__nav" disabled={!canNext} onClick={() => onMonthChange(new Date(year, m + 1, 1))} aria-label="Mes siguiente">›</button>
      </div>
      <div className="cal__week">{WEEK.map((w) => <span key={w}>{w}</span>)}</div>
      <div className="cal__grid">{cells}</div>
      <div className="cal__legend">
        <span><i className="dot dot--free" />Disponible</span>
        <span><i className="dot dot--few" />Pocas horas</span>
        <span><i className="dot dot--off" />Cerrado / lleno</span>
      </div>
    </div>
  );
}
