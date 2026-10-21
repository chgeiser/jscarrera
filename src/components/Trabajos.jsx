import { useEffect, useState } from 'react';
import { STATS, TRABAJOS } from '../data/trabajos.js';

const ALL = 'Todos';
const CATEGORIES = [ALL, ...new Set(TRABAJOS.map((t) => t.category))];

function Photo({ item }) {
  if (item.image) return <img src={item.image} alt={`${item.title} – ${item.vehicle}`} loading="lazy" />;
  return (
    <div className="work__placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M3 19h18M5 19l2-12h10l2 12M7 7l10 12M17 7L7 19" /></svg>
      <span>Foto próximamente</span>
    </div>
  );
}

export default function Trabajos() {
  const [filter, setFilter] = useState(ALL);
  const [open, setOpen] = useState(null);

  const items = filter === ALL ? TRABAJOS : TRABAJOS.filter((t) => t.category === filter);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section className="section section--dark" id="trabajos">
      <div className="container">
        <p className="eyebrow">Portafolio</p>
        <h2 className="section__title">Trabajos realizados</h2>
        <p className="section__sub">Algunos de los proyectos que han pasado por nuestro taller, desde mantenciones hasta jaulas para competición.</p>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value}{s.suffix}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="filters" role="tablist" aria-label="Filtrar trabajos">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`chip${filter === c ? ' is-active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="works">
          {items.map((t) => (
            <button type="button" className="work" key={t.title} onClick={() => setOpen(t)}>
              <div className="work__media"><Photo item={t} /></div>
              <div className="work__body">
                <span className="work__tag">{t.category}</span>
                <h3>{t.title}</h3>
                <p>{t.vehicle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="modal__box modal__box--wide card" role="dialog" aria-modal="true" aria-labelledby="workTitle">
            <div className="work__media work__media--lg"><Photo item={open} /></div>
            <span className="work__tag">{open.category}</span>
            <h3 id="workTitle">{open.title}</h3>
            <p className="muted">{open.vehicle}</p>
            <p>{open.description}</p>
            <a href="#agenda" className="btn btn--red btn--block" onClick={() => setOpen(null)}>Agendar un trabajo similar</a>
            <button type="button" className="btn btn--ghost btn--block" onClick={() => setOpen(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}
