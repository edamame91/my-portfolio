const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const themeOptions = [
  { label: "Peppermint", value: "peppermint" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Pistachio", value: "pistachio" },
  { label: "Cantelope", value: "cantelope" },
  { label: "Grape", value: "grape" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Foam Banana", value: "foam-banana" },
];

export default function Header({ name, selectedTheme, onThemeChange }) {
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Back to top">
        {name}
      </a>

      <div className="header-controls">
        <nav aria-label="Primary navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <label className="theme-select-wrap">
          <span className="theme-select-label"></span>
          <select
            className="theme-select"
            aria-label="Select color theme"
            value={selectedTheme}
            onChange={(event) => onThemeChange(event.target.value)}
          >
            {themeOptions.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
