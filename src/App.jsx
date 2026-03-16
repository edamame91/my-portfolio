import { useEffect, useState } from "react";
import "./App.css";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import Section from "./components/Section";
import SkillsSection from "./components/SkillsSection";
import TimelineSection from "./components/TimelineSection";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { timeline } from "./data/timeline";

const THEME_KEY = "portfolio-theme";
const THEME_OPTIONS = [
  "peppermint",
  "raspberry",
  "pistachio",
  "cantelope",
  "grape",
  "blueberry",
  "foam-banana",
];

export default function App() {
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
      <main id="main-content" className="site-main">
        <Hero profile={profile} />

        <Section
          id="about"
          title="About"
          subtitle="Engineering-focused, collaborative, and driven by practical outcomes."
        >
          <article className="card about-card">
            <p>
              I’m a first-class Software Engineering student with a strong
              interest in C#, systems programming, and full-stack development. I
              enjoy building robust software with clear architecture and
              maintainable code.
            </p>
            <p>
              My university and project work cover the full delivery lifecycle,
              from requirements to implementation, testing, and iteration in
              Agile teams.
            </p>
          </article>
        </Section>

        <ProjectsSection projects={projects} />
        <SkillsSection groups={skillGroups} />
        <ContactSection email={profile.email} links={profile.links} />
      </main>
      <Footer name={profile.name} />
    </>
  );
}
