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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopThemeMenuRef = useRef(null);
  const mobileThemeMenuRef = useRef(null);

  function closeMobileMenu() {
    setIsThemeMenuOpen(false);
    setIsMobileMenuOpen(false);
  }

  const renderNavLinks = (onNavigate) =>
    navItems.map((item) => (
      <li key={item.to}>
        <Link to={item.to} onClick={onNavigate}>
          {item.label}
        </Link>
      </li>
    ));

  useEffect(() => {
    function handleClickOutside(event) {
      const isInsideDesktopThemeMenu =
        desktopThemeMenuRef.current &&
        desktopThemeMenuRef.current.contains(event.target);
      const isInsideMobileThemeMenu =
        mobileThemeMenuRef.current &&
        mobileThemeMenuRef.current.contains(event.target);

      if (!isInsideDesktopThemeMenu && !isInsideMobileThemeMenu) {
        setIsThemeMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsThemeMenuOpen(false);
        setIsMobileMenuOpen(false);
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

  function renderThemeSelector(menuRef, className) {
    return (
      <div className={`theme-select-wrap ${className}`} ref={menuRef}>
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
          <ul className="theme-menu" role="listbox" aria-label="Theme options">
            {THEME_MENU_OPTIONS.map((theme) => {
              const isSelected = theme.value === selectedTheme;

              return (
                <li key={theme.value} role="option" aria-selected={isSelected}>
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
    );
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Go to homepage">
          {name}
        </Link>

        <div className="header-controls">
          <nav
            className="primary-nav primary-nav--desktop"
            aria-label="Primary navigation"
          >
            <ul>{renderNavLinks()}</ul>
          </nav>

          {renderThemeSelector(
            desktopThemeMenuRef,
            "theme-select-wrap--desktop",
          )}

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => {
              setIsThemeMenuOpen(false);
              setIsMobileMenuOpen((prev) => !prev);
            }}
          >
            <span aria-hidden="true">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav-menu"
        className={`mobile-nav${isMobileMenuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />
        <div className="mobile-nav-panel">
          <ul>{renderNavLinks(closeMobileMenu)}</ul>
          {renderThemeSelector(mobileThemeMenuRef, "theme-select-wrap--mobile")}
        </div>
      </nav>
    </>
  );
}
