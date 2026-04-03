import { Link } from "react-router-dom";

export default function Footer({ name, colorMode, onToggleColorMode }) {
  const nextThemeLabel = colorMode === "dark" ? "Light" : "Dark";

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p>
          © {new Date().getFullYear()} {name}
        </p>

        <div className="footer-actions">
          <button
            type="button"
            className="btn btn--ghost footer-theme-toggle"
            onClick={onToggleColorMode}
            aria-label={`Switch to ${nextThemeLabel.toLowerCase()} theme`}
          >
            {nextThemeLabel} theme
          </button>

          <Link to="/" aria-label="Go to homepage">
            Back to home ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
