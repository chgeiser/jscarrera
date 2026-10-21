import { CONFIG, igLink, mailLink, waLink } from '../config.js';
import { InstagramIcon, MailIcon, WhatsAppIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src="/logo.png" alt={CONFIG.name} />
        <div className="footer__social">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
          <a href={igLink()} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href={mailLink()} aria-label="Correo"><MailIcon /></a>
        </div>
        <p>© {new Date().getFullYear()} {CONFIG.name} · Taller Mecánico - Desarrollado por <a href="https://www.chgdesarrollo.cl" target="_blank" rel="noopener noreferrer">chgdesarrollo</a></p>
      </div>
    </footer>
  );
}
