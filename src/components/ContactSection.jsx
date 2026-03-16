import Section from "./Section";

export default function ContactSection({ email, links }) {
  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="I’m open to Year in Industry opportunities and collaborative projects."
    >
      <div className="contact-card card">
        <a className="btn btn--primary" href={`mailto:${email}`}>
          {email}
        </a>
        <div className="contact-links" aria-label="External profiles">
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
