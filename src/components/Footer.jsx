import { handleBackToTop } from "../lib/scroll";

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
