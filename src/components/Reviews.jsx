import { useState } from 'react';
import { load, save } from '../storage.js';
import { CONFIG, igLink } from '../config.js';
import { InstagramIcon } from './Icons.jsx';

const STORAGE_KEY = 'jsc_reviews';

const SEED = [
  { name: 'Camila R.', rating: 5, comment: 'Excelente atención, me explicaron todo lo que tenía el auto y cumplieron con el plazo. 100% recomendados.', date: '2026-09-28' },
  { name: 'Felipe M.', rating: 5, comment: 'Agendé por la web, llegué a la hora y me atendieron al tiro. Muy buen precio en la mantención.', date: '2026-09-15' },
  { name: 'Andrés T.', rating: 4, comment: 'Buen diagnóstico con escáner, encontraron la falla que otro taller no pudo. Volveré.', date: '2026-08-30' },
];

const Stars = ({ value }) => (
  <span className="stars" aria-label={`${value} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= Math.round(value) ? 'on' : ''}>★</span>
    ))}
  </span>
);

export default function Reviews() {
  const [reviews, setReviews] = useState(() => load(STORAGE_KEY, SEED));
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [thanks, setThanks] = useState(false);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!rating) return setError('Elige una calificación.');
    if (!name.trim() || comment.trim().length < 5) return setError('Escribe tu nombre y un comentario.');
    const next = [
      { name: name.trim(), rating, comment: comment.trim(), date: new Date().toISOString().slice(0, 10) },
      ...reviews,
    ];
    setReviews(next);
    save(STORAGE_KEY, next);
    setRating(0); setName(''); setComment(''); setError(''); setThanks(true);
    setTimeout(() => setThanks(false), 4000);
  };

  return (
    <section className="section section--dark" id="opiniones">
      <div className="container">
        <p className="eyebrow">Clientes</p>
        <h2 className="section__title">Opiniones</h2>

        <div className="reviews">
          <div className="card reviews__summary">
            <div className="score">{avg.toFixed(1)}</div>
            <Stars value={avg} />
            <p className="muted">{reviews.length} {reviews.length === 1 ? 'opinión' : 'opiniones'}</p>

            <form className="form" onSubmit={submit} noValidate>
              <h3>Deja tu experiencia</h3>
              <div className="rate" role="radiogroup" aria-label="Calificación" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    role="radio"
                    aria-checked={rating === i}
                    aria-label={`${i} estrellas`}
                    className={i <= (hover || rating) ? 'on' : ''}
                    onMouseEnter={() => setHover(i)}
                    onClick={() => setRating(i)}
                  >★</button>
                ))}
              </div>
              <label>Nombre
                <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              </label>
              <label>Comentario
                <textarea rows="4" value={comment} maxLength={500} onChange={(e) => setComment(e.target.value)} placeholder="¿Cómo fue tu experiencia en el taller?" />
              </label>
              {error && <p className="form__error" role="alert">{error}</p>}
              {thanks && <p className="form__ok">¡Gracias por tu opinión!</p>}
              <button type="submit" className="btn btn--red btn--block">Publicar opinión</button>
            </form>
          </div>

          <div className="reviews__list">
            {reviews.map((r, i) => (
              <article className="review card" key={r.date + r.name + i}>
                <header>
                  <span className="avatar">{r.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <time>{new Date(r.date + 'T12:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  </div>
                  <Stars value={r.rating} />
                </header>
                <p>{r.comment}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="instagram-reviews card">
          <div className="instagram-reviews__identity">
            <InstagramIcon />
            <div>
              <h3>Opiniones en Instagram</h3>
              <p className="muted">
                Mira las publicaciones y comentarios de nuestros clientes en @{CONFIG.instagram}.
              </p>
            </div>
          </div>
          <a href={igLink()} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            Ver perfil y comentarios
          </a>
        </div>
      </div>
    </section>
  );
}
