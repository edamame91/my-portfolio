import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import AboutPage from "./components/AboutPage";
import ProjectsSection from "./components/ProjectsSection";
import ProjectsPage from "./components/ProjectsPage";
import SkillsSection from "./components/SkillsSection";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { THEME_OPTIONS } from "./data/themes";

const THEME_KEY = "portfolio-theme";
const COLOR_MODE_KEY = "portfolio-color-mode";

function HomePage() {
  const location = useLocation();
  const homeProjects = projects
    .filter((project) => project.showOnHome === true)
    .slice(0, 4);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (!section) {
      return;
    }

    const target = document.getElementById(section);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.search]);

  return (
    <main id="main-content" className="site-main">
      <Link
        className="about-section-link home-reveal home-reveal--1"
        to="/about"
        aria-label="Read full about page"
      >
        <AboutSection profile={profile} />
      </Link>

      <div className="home-reveal home-reveal--2">
        <ProjectsSection projects={homeProjects} />
      </div>
      <div className="home-reveal home-reveal--3">
        <SkillsSection groups={skillGroups} />
      </div>
      <div className="home-reveal home-reveal--4">
        <ContactSection email={profile.email} links={profile.links} />
      </div>
    </main>
  );
}

export default function App() {
  const projectsPageProjects = projects.filter(
    (project) => project.showOnProjectsPage === true,
  );

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return THEME_OPTIONS.includes(savedTheme) ? savedTheme : "peppermint";
  });

  const [colorMode, setColorMode] = useState(() => {
    const savedColorMode = localStorage.getItem(COLOR_MODE_KEY);

    if (savedColorMode === "light" || savedColorMode === "dark") {
      return savedColorMode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
    localStorage.setItem(COLOR_MODE_KEY, colorMode);
  }, [colorMode]);

  function handleToggleColorMode() {
    setColorMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header
        name={profile.name}
        selectedTheme={theme}
        onThemeChange={setTheme}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/projects"
          element={<ProjectsPage projects={projectsPageProjects} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer colorMode={colorMode} onToggleColorMode={handleToggleColorMode} />
    </>
  );
}
