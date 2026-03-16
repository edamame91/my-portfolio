import Section from "./Section";

const about = {
  subtitle: "Software Engineering Student",
};

export default function AboutSection({ profile }) {
  const frameworkLogos = profile.frameworkLogos ?? [];

  return (
    <Section
      id="about"
      title={<span className="text-gradient h1">{profile.name}</span>}
      subtitle={about.subtitle}
    >
      <div className="about-content">
        <article className="card about-card">
          <p>
            I’m a first-class Software Engineering student with a strong
            interest in C#, systems programming, and full-stack development. I
            enjoy building robust software with clear architecture and
            maintainable code.
          </p>
          <p>
            My university and project work cover the full delivery lifecycle,
            from requirements to implementation, testing, and iteration in Agile
            teams.
          </p>
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
    </Section>
  );
}
