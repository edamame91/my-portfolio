import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ProjectMedia({ item, projectTitle, priority = false, sizes }) {
  const isPlaceholder = /placeholder|hero\.png/i.test(item.src || "");
  const srcSet = item.srcSet
    ? typeof item.srcSet === "string"
      ? item.srcSet
      : Object.entries(item.srcSet)
          .map(([width, src]) => `${src} ${width}w`)
          .join(", ")
    : undefined;
  const resolvedSizes = sizes || item.sizes || "(max-width: 900px) 100vw, 80vw";

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
      sizes={srcSet ? resolvedSizes : undefined}
      alt={item.alt || `${projectTitle} preview image`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width="1280"
      height="720"
    />
  );
}

function FullProjectEntry({ project, isActive, isFirst }) {
  const media = project.media || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState(null);
  const [lightboxTouchStartY, setLightboxTouchStartY] = useState(null);

  useEffect(() => {
    setCurrentIndex(0);
    setIsLightboxOpen(false);
    setLightboxIndex(0);
    setZoomPercent(100);
  }, [project.id]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousInLightbox();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextInLightbox();
      }
    }

    document.body.classList.add("has-modal-open");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("has-modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, lightboxIndex, media.length]);

  const hasMedia = media.length > 0;
  const hasMultipleMedia = media.length > 1;
  const activeItem = hasMedia ? media[currentIndex] : null;
  const lightboxItem = hasMedia ? media[lightboxIndex] : null;
  const canZoom = lightboxItem?.kind !== "video";

  function showPrevious() {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }

  function showNext() {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }

  function showPreviousInLightbox() {
    setLightboxIndex((prev) => (prev - 1 + media.length) % media.length);
    setZoomPercent(100);
  }

  function showNextInLightbox() {
    setLightboxIndex((prev) => (prev + 1) % media.length);
    setZoomPercent(100);
  }

  function openLightboxAt(index) {
    const item = media[index];

    if (!item || item.kind === "video") {
      return;
    }

    setLightboxIndex(index);
    setZoomPercent(100);
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setCurrentIndex(lightboxIndex);
    setIsLightboxOpen(false);
    setZoomPercent(100);
  }

  function zoomIn() {
    setZoomPercent((prev) => Math.min(400, prev + 25));
  }

  function zoomOut() {
    setZoomPercent((prev) => Math.max(50, prev - 25));
  }

  function resetZoom() {
    setZoomPercent(100);
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

  function handleLightboxTouchStart(event) {
    const touch = event.changedTouches?.[0];

    if (!touch) {
      return;
    }

    setLightboxTouchStartX(touch.clientX);
    setLightboxTouchStartY(touch.clientY);
  }

  function handleLightboxTouchEnd(event) {
    if (lightboxTouchStartX === null || lightboxTouchStartY === null) {
      return;
    }

    const touch = event.changedTouches?.[0];

    if (!touch) {
      setLightboxTouchStartX(null);
      setLightboxTouchStartY(null);
      return;
    }

    const deltaX = touch.clientX - lightboxTouchStartX;
    const deltaY = touch.clientY - lightboxTouchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        showNextInLightbox();
      } else {
        showPreviousInLightbox();
      }
    }

    setLightboxTouchStartX(null);
    setLightboxTouchStartY(null);
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
            {activeItem.kind === "video" ? (
              <ProjectMedia
                item={activeItem}
                projectTitle={project.title}
                priority={isFirst && currentIndex === 0}
              />
            ) : (
              <button
                type="button"
                className="project-media-trigger"
                onClick={() => openLightboxAt(currentIndex)}
                aria-label={`Open ${activeItem.alt || `${project.title} media`} fullscreen`}
              >
                <ProjectMedia
                  item={activeItem}
                  projectTitle={project.title}
                  priority={isFirst && currentIndex === 0}
                />
              </button>
            )}
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

      {isLightboxOpen && lightboxItem ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} fullscreen media viewer`}
          onClick={closeLightbox}
        >
          <div
            className="project-lightbox-inner"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-lightbox-toolbar">
              <span className="project-lightbox-counter" aria-live="polite">
                {lightboxIndex + 1} / {media.length}
              </span>
              {canZoom ? (
                <div className="project-lightbox-zoom-controls">
                  <button
                    type="button"
                    className="project-carousel-button"
                    onClick={zoomOut}
                    aria-label="Zoom out image"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="project-carousel-button"
                    onClick={resetZoom}
                    aria-label="Reset image zoom"
                  >
                    {zoomPercent}%
                  </button>
                  <button
                    type="button"
                    className="project-carousel-button"
                    onClick={zoomIn}
                    aria-label="Zoom in image"
                  >
                    +
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                className="project-carousel-button"
                onClick={closeLightbox}
                aria-label="Close fullscreen media"
              >
                ✕
              </button>
            </div>

            <div
              className="project-lightbox-frame"
              onTouchStart={
                hasMultipleMedia ? handleLightboxTouchStart : undefined
              }
              onTouchEnd={hasMultipleMedia ? handleLightboxTouchEnd : undefined}
            >
              {lightboxItem.kind === "video" ? (
                <ProjectMedia
                  item={lightboxItem}
                  projectTitle={project.title}
                />
              ) : (
                <img
                  className="project-lightbox-media"
                  src={lightboxItem.src}
                  srcSet={
                    lightboxItem.srcSet
                      ? typeof lightboxItem.srcSet === "string"
                        ? lightboxItem.srcSet
                        : Object.entries(lightboxItem.srcSet)
                            .map(([width, src]) => `${src} ${width}w`)
                            .join(", ")
                      : undefined
                  }
                  sizes={
                    lightboxItem.srcSet
                      ? lightboxItem.sizes || "(max-width: 1200px) 100vw, 90vw"
                      : undefined
                  }
                  alt={
                    lightboxItem.alt || `${project.title} fullscreen preview`
                  }
                  style={{ transform: `scale(${zoomPercent / 100})` }}
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>

            {hasMultipleMedia ? (
              <div className="project-carousel-controls">
                <button
                  type="button"
                  className="project-carousel-button"
                  onClick={showPreviousInLightbox}
                  aria-label={`Show previous fullscreen media for ${project.title}`}
                >
                  ←
                </button>
                <div className="project-carousel-dots" role="tablist">
                  {media.map((item, index) => {
                    const label =
                      item.alt || `${project.title} media ${index + 1}`;
                    const isSelected = index === lightboxIndex;

                    return (
                      <button
                        type="button"
                        key={`${project.id}-lightbox-${item.src}-${index}`}
                        className={`project-carousel-dot${isSelected ? " is-active" : ""}`}
                        onClick={() => {
                          setLightboxIndex(index);
                          setZoomPercent(100);
                        }}
                        aria-label={`Show ${label} in fullscreen`}
                        aria-selected={isSelected}
                        role="tab"
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="project-carousel-button"
                  onClick={showNextInLightbox}
                  aria-label={`Show next fullscreen media for ${project.title}`}
                >
                  →
                </button>
              </div>
            ) : null}
          </div>
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
          <Link className="btn btn--ghost" to="/">
            ← Back to portfolio
          </Link>
        </div>

        <div className="grid grid--project-entries">
          {projects.map((project, index) => (
            <FullProjectEntry
              key={project.id}
              project={project}
              isActive={project.id === activeEntry}
              isFirst={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
