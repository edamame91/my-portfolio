import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { THEME_MENU_OPTIONS } from "../data/themes";

const navItems = [
  { label: "About", to: "/?section=about" },
  { label: "Projects", to: "/?section=projects" },
  { label: "Skills", to: "/?section=skills" },
  { label: "Contact", to: "/?section=contact" },
];

export default function Header({ name, selectedTheme, onThemeChange }) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  const renderNavLinks = () =>
    navItems.map((item) => (
      <li key={item.to}>
        <Link to={item.to}>{item.label}</Link>
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
    THEME_MENU_OPTIONS.find((theme) => theme.value === selectedTheme)?.label ??
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
              aria-label="Select theme"
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
                aria-label="Theme options"
              >
                {THEME_MENU_OPTIONS.map((theme) => {
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
