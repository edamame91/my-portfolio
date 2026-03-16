import Section from "./Section";

function TimelineBlock({ title, entries }) {
  return (
    <article className="timeline-block">
      <h3>{title}</h3>
      <div className="timeline-list">
        {entries.map((entry) => (
          <section
            key={`${entry.title}-${entry.period}`}
            className="card timeline-item"
          >
            <div className="timeline-item-head">
              <h4>{entry.title}</h4>
              <p>{entry.period}</p>
            </div>
            <ul>
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            {entry.highlights?.length ? (
              <>
                <p className="timeline-item-label">Highlights</p>
                <ul>
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

export default function TimelineSection({ timeline }) {
  return (
    <Section
      id="timeline"
      title="Experience & Education"
      subtitle="Evidence of consistent growth and engineering rigor."
    >
      <div className="grid grid--timeline">
        <TimelineBlock title="Experience" entries={timeline.experience} />
        <TimelineBlock title="Education" entries={timeline.education} />
      </div>
    </Section>
  );
}
