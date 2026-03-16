import Section from "./Section";

function ProjectMedia({ item, projectTitle }) {
  if (item.kind === "video") {
    return (
      <video
        className="project-media"
        controls
        preload="metadata"
        playsInline
        poster={item.poster}
        aria-label={item.alt || `${projectTitle} demo video`}
      >
        <source src={item.src} type={item.type || "video/mp4"} />
      </video>
    );
  }

  return (
    <img
      className="project-media"
      src={item.src}
      alt={item.alt || `${projectTitle} preview image`}
      loading="lazy"
      decoding="async"
      width="1280"
      height="720"
    />
  );
}

function ProjectCard({ project }) {
  const media = project.media || [];
  const [preview, ...rest] = media;

  return (
    <article className="card project-card">
      {preview ? (
        <ProjectMedia item={preview} projectTitle={project.title} />
      ) : null}
      <div className="project-card-top">
        <h3>{project.title}</h3>
      </div>
      <p>{project.blurb}</p>
      <p className="project-card-impact">{project.impact}</p>

      {rest.length ? (
        <details className="project-media-more">
          <summary>More demos ({rest.length})</summary>
          <div className="project-media-grid">
            {rest.map((item, index) => (
              <ProjectMedia
                key={`${project.id}-${item.src}-${index}`}
                item={item}
                projectTitle={project.title}
              />
            ))}
          </div>
        </details>
      ) : null}

      <ul className="pill-list" aria-label={`${project.title} technologies`}>
        {project.tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="project-card-actions">
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        ) : null}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectsSection({ projects }) {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Take a look at some of my work"
    >
      <div className="grid grid--projects">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
