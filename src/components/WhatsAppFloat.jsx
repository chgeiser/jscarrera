import { waLink } from '../config.js';
import { WhatsAppIcon } from './Icons.jsx';

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hola, quisiera hacer una consulta.')}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
