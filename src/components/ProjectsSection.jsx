import Section from "./Section";
import { Link } from "react-router-dom";

function ProjectMedia({ item, projectTitle, priority = false }) {
  const isPlaceholder = /placeholder|hero\.png/i.test(item.src || "");
  const srcSet = item.srcSet
    ? typeof item.srcSet === "string"
      ? item.srcSet
      : Object.entries(item.srcSet)
          .map(([width, src]) => `${src} ${width}w`)
          .join(", ")
    : undefined;
  const sizes =
    item.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

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
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={item.alt || `${projectTitle} preview image`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width="1280"
      height="720"
    />
  );
}

function ProjectCard({ project, priority = false }) {
  const [preview] = project.media || [];

  return (
    <Link
      className="project-card-link"
      to={`/projects?entry=${encodeURIComponent(project.id)}`}
      aria-label={`Open full project entry for ${project.title}`}
    >
      <article className="card project-card">
        {preview ? (
          <ProjectMedia
            item={preview}
            projectTitle={project.title}
            priority={priority}
          />
        ) : null}
        <div className="project-card-top">
          <h3 className="project-card-title">{project.title}</h3>
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
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>
    </Section>
  );
}
