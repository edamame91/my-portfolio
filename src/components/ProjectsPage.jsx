import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

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

function FullProjectEntry({ project, isActive }) {
  const media = project.media || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  const hasMedia = media.length > 0;
  const hasMultipleMedia = media.length > 1;
  const activeItem = hasMedia ? media[currentIndex] : null;

  function showPrevious() {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }

  function showNext() {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }

  function handleTouchStart(event) {
    const touch = event.changedTouches?.[0];

    if (!touch) {
      return;
    }

    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  }

  function handleTouchEnd(event) {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    const touch = event.changedTouches?.[0];

    if (!touch) {
      setTouchStartX(null);
      setTouchStartY(null);
      return;
    }

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  }

  function handleCarouselKeyDown(event) {
    if (!hasMultipleMedia) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <article
      id={`project-${project.id}`}
      className={`card project-entry${isActive ? " project-entry--active" : ""}`}
      aria-labelledby={`project-title-${project.id}`}
      tabIndex={-1}
    >
      <div className="project-card-top">
        <h3 className="project-title" id={`project-title-${project.id}`}>
          {project.title}
        </h3>
      </div>
      {activeItem ? (
        <div
          className="project-carousel"
          aria-label={`${project.title} media carousel`}
          onKeyDown={handleCarouselKeyDown}
          tabIndex={hasMultipleMedia ? 0 : -1}
        >
          <div
            className="project-carousel-frame"
            onTouchStart={hasMultipleMedia ? handleTouchStart : undefined}
            onTouchEnd={hasMultipleMedia ? handleTouchEnd : undefined}
          >
            <ProjectMedia item={activeItem} projectTitle={project.title} />
          </div>

          {hasMultipleMedia ? (
            <>
              <div className="project-carousel-controls">
                <button
                  type="button"
                  className="project-carousel-button"
                  onClick={showPrevious}
                  aria-label={`Show previous media for ${project.title}`}
                >
                  ←
                </button>
                <span className="project-carousel-count" aria-live="polite">
                  {currentIndex + 1} / {media.length}
                </span>
                <button
                  type="button"
                  className="project-carousel-button"
                  onClick={showNext}
                  aria-label={`Show next media for ${project.title}`}
                >
                  →
                </button>
              </div>

              <div className="project-carousel-dots" role="tablist">
                {media.map((item, index) => {
                  const label =
                    item.alt || `${project.title} media ${index + 1}`;
                  const isSelected = index === currentIndex;

                  return (
                    <button
                      type="button"
                      key={`${project.id}-${item.src}-${index}`}
                      className={`project-carousel-dot${isSelected ? " is-active" : ""}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Show ${label}`}
                      aria-selected={isSelected}
                      role="tab"
                    />
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <p>{project.blurb}</p>
      <p className="project-card-impact">{project.impact}</p>

      {project.details?.length ? (
        <ul
          className="project-details-list"
          aria-label={`${project.title} details`}
        >
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
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

export default function ProjectsPage({ projects }) {
  const [searchParams] = useSearchParams();
  const activeEntry = searchParams.get("entry");

  useEffect(() => {
    if (!activeEntry) {
      return;
    }

    const target = document.getElementById(`project-${activeEntry}`);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus({ preventScroll: true });
  }, [activeEntry]);

  return (
    <main id="main-content" className="site-main site-main--projects">
      <section className="section" aria-labelledby="projects-page-heading">
        <div className="section-header projects-page-header">
          <h2 id="projects-page-heading">Projects</h2>
          <p>Full project entries with context, outcomes, and demos.</p>
          <Link className="btn btn--ghost" to="/">
            ← Back to portfolio
          </Link>
        </div>

        <div className="grid grid--project-entries">
          {projects.map((project) => (
            <FullProjectEntry
              key={project.id}
              project={project}
              isActive={project.id === activeEntry}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
