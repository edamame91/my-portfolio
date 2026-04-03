export default function Footer({ colorMode, onToggleColorMode }) {
  const nextThemeLabel = colorMode === "dark" ? "Light" : "Dark";

  function handleBackToTop() {
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-actions">
          <button
            type="button"
            className="btn btn--ghost footer-theme-toggle"
            onClick={onToggleColorMode}
            aria-label={`Switch to ${nextThemeLabel.toLowerCase()} theme`}
          >
            {nextThemeLabel} theme
          </button>

          <button
            type="button"
            className="footer-link-button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
