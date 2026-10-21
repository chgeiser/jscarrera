const SERVICES = [
  {
    title: 'Mantención',
    text: 'Cambio de aceite, filtros, bujías y revisión según kilometraje.',
    icon: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />,
  },
  {
    title: 'Diagnóstico',
    text: 'Escáner computacional y revisión de fallas eléctricas y de motor.',
    icon: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  },
  {
    title: 'Frenos y suspensión',
    text: 'Pastillas, discos, amortiguadores, alineación y balanceo.',
    icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></>,
  },
  {
    title: 'Mecánica general',
    text: 'Embrague, distribución, refrigeración y reparaciones mayores.',
    icon: <path d="M4 17V9l4-4h8l4 4v8M4 17h16M7 17v2M17 17v2M8 12h8" />,
  },
  {
    title: 'Jaulas de competición',
    text: 'Fabricación de jaulas antivuelco a medida para autos de carrera.',
    icon: <path d="M3 19h18M5 19l2-12h10l2 12M7 7l10 12M17 7L7 19M9 3v4M15 3v4" />,
  },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.title);

export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <p className="eyebrow">Lo que hacemos</p>
        <h2 className="section__title">Servicios</h2>
        <div className="services">
          {SERVICES.map((s) => (
            <article className="service" key={s.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
