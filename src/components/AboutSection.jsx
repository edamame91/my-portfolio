export default function AboutSection({ profile }) {
  const frameworkLogos = profile.frameworkLogos ?? [];

  return (
    <section id="about" className="hero-panel" aria-labelledby="hero-heading">
      <div className="about-content">
        <article className="card about-card">
          <h2 id="hero-heading" className="section-header">
            About
          </h2>
          <p className="hero-panel-headline about-headline">
            {profile.headline}
          </p>
          <p className="hero-panel-seeking">{profile.seeking}</p>
        </article>
        <article
          className="card about-frameworks-card"
          aria-label="Core stack logos"
        >
          <ul
            className="about-frameworks"
            aria-label="Main frameworks and languages"
          >
            {frameworkLogos.map((logo) => (
              <li key={logo.name} className="framework-item" title={logo.name}>
                <img
                  className="framework-logo"
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
