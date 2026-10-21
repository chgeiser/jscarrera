import { useState } from 'react';
import { waLink } from '../config.js';

const AGENDA_LINK = waLink('Hola, quisiera agendar una hora.');

const LINKS = [
  ['#servicios', 'Servicios'],
  ['#trabajos', 'Trabajos'],
  [AGENDA_LINK, 'Agenda', true],
  ['#opiniones', 'Opiniones'],
  ['#contacto', 'Contacto'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header" id="top">
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label="JS Carrera inicio">
          <img src="/logo.png" alt="JS Carrera" />
        </a>
        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {LINKS.map(([href, label, external]) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              onClick={close}
            >
              {label}
            </a>
          ))}
          <a href={AGENDA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--red btn--sm" onClick={close}>Agendar hora</a>
        </nav>
      </div>
    </header>
  );
}
