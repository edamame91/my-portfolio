import { Link } from "react-router-dom";

export default function Footer({ name }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p>
          © {new Date().getFullYear()} {name}. Built with React + Vite.
        </p>
        <Link to="/" aria-label="Go to homepage">
          Back to home ↑
        </Link>
      </div>
    </footer>
  );
}
