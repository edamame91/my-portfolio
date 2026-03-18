import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "About", to: "/?section=about", isPrimaryRoute: false },
  { label: "Projects", to: "/?section=projects", isPrimaryRoute: false },
  { label: "Skills", to: "/?section=skills", isPrimaryRoute: false },
  { label: "Contact", to: "/?section=contact", isPrimaryRoute: false },
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
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  const renderNavLinks = () =>
    navItems.map((item) => (
      <li key={item.to}>
        {item.isPrimaryRoute ? (
          <NavLink to={item.to}>{item.label}</NavLink>
        ) : (
          <Link to={item.to}>{item.label}</Link>
        )}
      </li>
    ));

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target)
      ) {
        setIsThemeMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsThemeMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedThemeLabel =
    themeOptions.find((theme) => theme.value === selectedTheme)?.label ??
    "Select theme";

  return (
    <>
      <header className="site-header">
        <Link
          to="/"
          className="brand text-gradient"
          aria-label="Go to homepage"
        >
          {name}
        </Link>

        <div className="header-controls">
          <nav
            className="primary-nav primary-nav--desktop"
            aria-label="Primary navigation"
          >
            <ul>{renderNavLinks()}</ul>
          </nav>

          <div className="theme-select-wrap" ref={themeMenuRef}>
            <button
              type="button"
              className="theme-select theme-menu-trigger"
              aria-haspopup="listbox"
              aria-labelledby="theme-menu-label"
              aria-expanded={isThemeMenuOpen}
              onClick={() => setIsThemeMenuOpen((prev) => !prev)}
            >
              <span>{selectedThemeLabel}</span>
              <span aria-hidden="true">▾</span>
            </button>

            {isThemeMenuOpen ? (
              <ul
                className="theme-menu"
                role="listbox"
                aria-labelledby="theme-menu-label"
              >
                {themeOptions.map((theme) => {
                  const isSelected = theme.value === selectedTheme;

                  return (
                    <li
                      key={theme.value}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        type="button"
                        className={`theme-option${isSelected ? " is-active" : ""}`}
                        onClick={() => {
                          onThemeChange(theme.value);
                          setIsThemeMenuOpen(false);
                        }}
                      >
                        {theme.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <ul>{renderNavLinks()}</ul>
      </nav>
    </>
  );
}
