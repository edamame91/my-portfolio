export default function Footer({ name }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p>
          © {new Date().getFullYear()} {name}. Built with React + Vite.
        </p>
        <a href="#top" aria-label="Back to top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
