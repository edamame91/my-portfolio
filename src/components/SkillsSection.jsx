import Section from "./Section";

export default function SkillsSection({ groups }) {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle=""
    >
      <div className="grid grid--skills">
        {groups.map((group) => (
          <article key={group.category} className="card skill-card">
            <h3>{group.category}</h3>
            <ul className="pill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
