import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { THEME_MENU_OPTIONS } from "../data/themes";
import { handleBackToTop } from "../lib/scroll";

// pull the ?section=x target out of a nav link
function getSectionId(to) {
  const query = to.split("?")[1];
  return query ? new URLSearchParams(query).get("section") : null;
}

const navItems = [
  { label: "About", to: "/" },
  { label: "Projects", to: "/?section=projects" },
  { label: "Skills", to: "/?section=skills" },
  { label: "Contact", to: "/?section=contact" },
];

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="4.2" fill="currentColor" />
    <g
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    >
      <line x1="12" y1="2.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21.5" y2="12" />
      <line x1="5.1" y1="5.1" x2="6.8" y2="6.8" />
      <line x1="17.2" y1="17.2" x2="18.9" y2="18.9" />
      <line x1="5.1" y1="18.9" x2="6.8" y2="17.2" />
      <line x1="17.2" y1="6.8" x2="18.9" y2="5.1" />
    </g>
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M20 14.5A8 8 0 0 1 9.5 4a.8.8 0 0 0-1.1-.9A9 9 0 1 0 20.9 15.6a.8.8 0 0 0-.9-1.1Z"
    />
  </svg>
);

export default function Header({
  name,
  selectedTheme,
  onThemeChange,
  colorMode,
  onToggleColorMode,
}) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const desktopThemeMenuRef = useRef(null);
  const mobileThemeMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  function closeMobileMenu() {
    setIsThemeMenuOpen(false);
    setIsMobileMenuOpen(false);
  }

  function handleAboutNavClick(event, onNavigate) {
    event.preventDefault();
    onNavigate?.();
    navigate("/");
    window.requestAnimationFrame(() => handleBackToTop());
  }

  const renderNavLinks = (onNavigate) =>
    navItems.map((item) => {
      const sectionId = getSectionId(item.to);
      const isAbout = item.to === "/";
      const isActive = isAbout
        ? location.pathname === "/" && !activeSection
        : sectionId === activeSection;

      return (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={(event) => {
              if (isAbout) {
                handleAboutNavClick(event, onNavigate);
                return;
              }

              onNavigate?.();
            }}
            className={isActive ? "active" : undefined}
            aria-current={isActive ? "true" : undefined}
          >
            {item.label}
          </Link>
        </li>
      );
    });

  // subtle backdrop blur once the page is scrolled
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // highlight the nav link for whichever section is in view (home only)
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return undefined;
    }

    const sectionIds = navItems
      .map((item) => getSectionId(item.to))
      .filter(Boolean);

    function getSectionTop(element) {
      return element.getBoundingClientRect().top + window.scrollY;
    }

    function updateActiveSection() {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && getSectionTop(section) <= marker) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom && document.getElementById("contact")) {
        current = "contact";
      }

      setActiveSection(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      setActiveSection("");
    };
  }, [location.pathname]);

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
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
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
            className="color-mode-toggle"
            onClick={onToggleColorMode}
            aria-label={
              colorMode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

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
