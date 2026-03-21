import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ProjectsPage from "./components/ProjectsPage";
import SkillsSection from "./components/SkillsSection";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { THEME_OPTIONS } from "./data/themes";

const THEME_KEY = "portfolio-theme";

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
      <AboutSection profile={profile} />

      <ProjectsSection projects={homeProjects} />
      <SkillsSection groups={skillGroups} />
      <ContactSection email={profile.email} links={profile.links} />
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

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
        <Route
          path="/projects"
          element={<ProjectsPage projects={projectsPageProjects} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer name={profile.name} />
    </>
  );
}
