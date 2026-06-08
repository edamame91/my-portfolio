import { Link } from "react-router-dom";

export default function Section({ id, title, subtitle, titleTo, children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="section-header">
        {titleTo ? (
          <Link
            className="section-title-link"
            to={titleTo}
            aria-label={`View all ${title.toLowerCase()}`}
          >
            <h2 id={headingId}>{title}</h2>
          </Link>
        ) : (
          <h2 id={headingId}>{title}</h2>
        )}
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
