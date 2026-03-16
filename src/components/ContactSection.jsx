import Section from "./Section";

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2 .5v.35l7 4.2 7-4.2V7h-14Zm14 2.68-6.49 3.89a1 1 0 0 1-1.02 0L5 9.68V17h14V9.68Z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.89c-2.78.61-3.37-1.18-3.37-1.18-.46-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.32 1.08 2.88.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.93 0-1.08.39-1.97 1.02-2.66-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.02A9.54 9.54 0 0 1 12 6.84c.85 0 1.71.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.43.21 2.48.11 2.74.64.69 1.02 1.58 1.02 2.66 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M6.94 8.5a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48ZM5.4 9.83h3.1V19H5.4V9.83Zm5.05 0h2.97v1.25h.04c.42-.78 1.43-1.6 2.95-1.6 3.15 0 3.74 2.07 3.74 4.76V19h-3.1v-4.2c0-1-.02-2.28-1.39-2.28s-1.6 1.08-1.6 2.21V19h-3.1V9.83Z"
    />
  </svg>
);

export default function ContactSection({ email, links }) {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="contact-card card">
        <div className="contact-actions" aria-label="Contact options">
          <a className="btn btn--ghost contact-action" href={`mailto:${email}`}>
            <MailIcon />
            <span>Email</span>
          </a>

          <a
            className="btn btn--ghost contact-action"
            href={links.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>

          <a
            className="btn btn--ghost contact-action"
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
