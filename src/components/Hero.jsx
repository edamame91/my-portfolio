export default function Hero({ profile }) {
  return (
    <section id="top" className="hero-panel" aria-labelledby="hero-heading">
      <p className="eyebrow">Open to Year in Industry placement</p>
      <h1 id="hero-heading">{profile.name}</h1>
      <h4 className="hero-panel__role">{profile.role}</h4>
      <p className="hero-panel__headline">{profile.headline}</p>
      <p className="hero-panel__summary">{profile.summary}</p>
      <p className="hero-panel__seeking">{profile.seeking}</p>
      <div className="hero-panel__actions">
        <a
          className="btn btn--primary"
          href={profile.cta.primary.href}
          target="_blank"
          rel="noreferrer"
        >
          {profile.cta.primary.label}
        </a>
        <a className="btn btn--ghost" href={profile.cta.secondary.href}>
          {profile.cta.secondary.label}
        </a>
      </div>
    </section>
  );
}
