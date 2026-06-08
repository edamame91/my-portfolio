export function handleBackToTop() {
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-actions">
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
