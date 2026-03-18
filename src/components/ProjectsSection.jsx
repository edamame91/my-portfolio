import Section from "./Section";
import { Link } from "react-router-dom";

function ProjectMedia({ item, projectTitle }) {
  const isPlaceholder = /placeholder|hero\.png/i.test(item.src || "");

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
      className={`project-media${isPlaceholder ? " project-media--placeholder" : ""}`}
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
  const [preview] = project.media || [];

  return (
    <Link
      className="project-card-link"
      to={`/projects?entry=${encodeURIComponent(project.id)}`}
      aria-label={`Open full project entry for ${project.title}`}
    >
      <article className="card project-card">
        {preview ? (
          <ProjectMedia item={preview} projectTitle={project.title} />
        ) : null}
        <div className="project-card-top">
          <h3 className="py-3">{project.title}</h3>
        </div>
        <p>{project.blurb}</p>
        <ul className="pill-list" aria-label={`${project.title} technologies`}>
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="project-card-cta">View full project →</p>
      </article>
    </Link>
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
