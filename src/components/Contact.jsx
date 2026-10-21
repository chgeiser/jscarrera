import { CONFIG, igLink, mailLink, mapDirections, mapEmbed, waLink } from '../config.js';
import { ClockIcon, InstagramIcon, MailIcon, PinIcon, WhatsAppIcon } from './Icons.jsx';

export default function Contact() {
  return (
    <section className="section" id="contacto">
      <div className="container">
        <p className="eyebrow">Hablemos</p>
        <h2 className="section__title">Contacto</h2>
        <div className="contact">
          <a href={waLink('Hola, quisiera hacer una consulta.')} target="_blank" rel="noopener noreferrer" className="contact__card contact__card--wa">
            <WhatsAppIcon />
            <div><strong>WhatsApp</strong><span>{CONFIG.whatsappLabel}</span></div>
          </a>
          <a href={igLink()} target="_blank" rel="noopener noreferrer" className="contact__card contact__card--ig">
            <InstagramIcon />
            <div><strong>Instagram</strong><span>@{CONFIG.instagram}</span></div>
          </a>
          <a href={mailLink()} className="contact__card">
            <MailIcon />
            <div><strong>Correo</strong><span>{CONFIG.email}</span></div>
          </a>
          <div className="contact__card">
            <ClockIcon />
            <div><strong>Horario</strong><span>Lun – Vie · 09:00 – 18:00 hrs.<br />Recepción hasta 15:00 hrs.</span></div>
          </div>
          <a href={mapDirections()} target="_blank" rel="noopener noreferrer" className="contact__card">
            <PinIcon />
            <div><strong>Dirección</strong><span>{CONFIG.address}</span></div>
          </a>
        </div>

        <div className="map">
          <iframe
            title={`Ubicación de ${CONFIG.name}`}
            src={mapEmbed()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={mapDirections()} target="_blank" rel="noopener noreferrer" className="btn btn--red btn--sm map__btn">
            <PinIcon width="18" height="18" /> Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
