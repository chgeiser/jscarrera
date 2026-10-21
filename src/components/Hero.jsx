import { CONFIG, waLink } from '../config.js';

const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__stripes" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Taller mecánico</p>
          <h1>Tu auto en manos<br /><span>de expertos.</span></h1>
          <p className="lead">
            Mantención, diagnóstico y reparación con la precisión de un equipo de carrera.
            Agenda tu hora directamente por WhatsApp.
          </p>
          <div className="hero__cta">
            <a href={waLink('Hola, quisiera agendar una hora.')} target="_blank" rel="noopener noreferrer" className="btn btn--red">Agendar hora</a>
          </div>
          <ul className="hero__facts">
            <li><strong>Lun – Vie</strong><span>{pad(CONFIG.openHour)}:00 – {pad(CONFIG.closeHour)}:00 hrs.</span></li>
            <li><strong>Recepción</strong><span>hasta {pad(CONFIG.lastSlotHour)}:00 hrs.</span></li>
          </ul>
        </div>
        <div className="hero__logo">
          <img src="/logo.png" alt="" />
        </div>
      </div>
    </section>
  );
}
