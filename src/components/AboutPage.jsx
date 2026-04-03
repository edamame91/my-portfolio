import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main id="main-content" className="site-main site-main--about">
      <section
        className="about-page-section"
        aria-labelledby="about-page-heading"
      >
        <article className="card about-page-card">
          <h2 id="about-page-heading">About Me</h2>

          <div className="about-page-prose">
            <h3>Who I Am</h3>
            <p>
              I’m a Software Engineering student, currently on track for a
              first. I got into programming because I like understanding how
              things work, but I stuck with it because I enjoy building things
              that feel right to use, not just things that technically work.
            </p>
            <p>
              I tend to sit somewhere between frontend, systems, and full-stack.
              I like clean logic, but I also care about how someone experiences
              what I build.
            </p>

            <hr className="about-page-divider" />

            <h3>What I Do</h3>
            <p>
              I build software with the user in mind from the start. Whether
              it’s a mobile app, a desktop tool, or something web-based, I’m
              usually asking the same question: does this actually help, and
              does it make sense to use?
            </p>
            <p>
              <Link to="/projects">Take a look at my projects.</Link>
            </p>

            <hr className="about-page-divider" />

            <h3>What I’m Interested In</h3>
            <p>
              Accessibility is a constant thread in my work. Good software
              should reach as many people as possible, and the gap between what
              is technically possible and what actually gets shipped is still
              too wide. Gaming accessibility in particular has seen some
              exciting progress recently and it is something I follow closely.
            </p>
            <p>
              I’m also interested in where AI tools actually improve workflows,
              especially around UX and development, rather than just being added
              for the sake of it.
            </p>
            <p>
              More broadly, I enjoy working across different layers of software.
              Frontend, backend, systems and game development all scratch
              slightly different itches, and I’m still figuring out where I want
              to specialise long-term.
            </p>

            <hr className="about-page-divider" />

            <h3>Beyond the Editor</h3>
            <p>
              I play a lot of games, which is probably where my interest in
              interaction and accessibility started.
            </p>
            <p>
              I run a small homelab and mess around with hardware and smart home
              setups, which keeps me thinking beyond just application code.
            </p>
            <p>
              I also do pottery. It’s slower, more hands-on, and very
              unforgiving, which makes it a nice contrast to programming.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
