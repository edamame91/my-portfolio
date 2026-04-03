export const projects = [
  {
    id: "sheffield-city-council-app",
    title: "Sheffield City Council Mobile App",
    blurb:
      "A mobile application giving Sheffield residents self-service access to council services, local information, and civic tools, built to reduce inbound calls to the council.",
    impact:
      "Designed around real council objectives: cutting unnecessary contact volume by letting residents find answers, report issues, and complete tasks without calling or visiting in person.",
    tech: ["Flutter", "Dart", "Agile", "Mobile Development"],
    repoUrl: "https://github.com/edamame91",
    liveUrl: null,
    details: [
      "Built resident-facing flows for waste reporting, housing repairs, council tax, and bin collections; covering the most common reasons residents contact the council.",
      "Followed Sheffield Council's UX and design standards throughout, ensuring accessible, consistent interfaces across all service areas.",
      "Guided users to the right council form or service through a decision-tree wizard, reducing misdirected contacts and failed self-service attempts.",
      "Delivered offline-first for core features so residents can access services and local information without a reliable connection.",
      "Worked in an Agile team with iterative releases and regular stakeholder feedback to validate that flows met real council and resident needs.",
    ],
    media: [
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/council/home.webp",
        alt: "City council app home screen & weather",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/council/transport.webp",
        alt: "City council app transport list and map",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/council/bins.webp",
        alt: "City council app bins view",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/council/settings.webp",
        alt: "City council app settings view",
      },
      {
        kind: "video",
        src: import.meta.env.BASE_URL + "projects/council/sheffield-demo.mp4",
        type: "video/mp4",
        poster: import.meta.env.BASE_URL + "projects/council/home-p.webp",
        alt: "City council app demo walkthrough",
      },
    ],
    cardType: "tall",
    showOnHome: true,
    showOnProjectsPage: true,
    featured: true,
  },
  {
    id: "finance-tracker-csharp",
    title: "Fin Track",
    blurb:
      "A C# personal finance tracker for logging transactions and reviewing spending trends. Allows users to create and track budgets, generate spending reports and export data.",
    impact:
      "Strengthened object-oriented design, data modelling, and desktop app architecture skills.",
    tech: ["C#", ".NET", "OOP"],
    repoUrl: "https://github.com/edamame91/FinTrack",
    liveUrl: null,
    details: [
      "Created transaction logging and summary workflows focused on clarity and quick review of spending habits.",
      "Structured the app around object-oriented principles to keep business rules readable and maintainable.",
    ],
    media: [
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/fintrack/cdr-sum.webp",
        alt: "Finance tracker dashboard preview",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/fintrack/month-sum.webp",
        alt: "Finance tracker monthly summary",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/fintrack/total.webp",
        alt: "Finance tracker totals screen",
      },
    ],
    cardType: "tall",
    showOnHome: true,
    showOnProjectsPage: true,
    featured: true,
  },
  {
    id: "charity-donation-app",
    title: "Charity Donation Web App",
    blurb: "A full-stack donation platform with role-based access control. Features tailored dashboards for donors, admins and charity staff, with inventory management and analytics.",
    impact:
      "Demonstrated end-to-end product delivery from React UI to API and relational data layer.",
    tech: ["React", "Node.js", "SQLite", "REST APIs"],
    repoUrl: "https://github.com/edamame91/Sustainwear",
    liveUrl: null,
    details: [
      "Built responsive donation journeys with campaign browsing, contribution flow states, and clear user feedback.",
      "Implemented API-backed data handling patterns with reusable UI components to keep the product scalable.",
    ],
    media: [
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/sustainwear/dashboard.webp",
        alt: "Charity donation app interface preview",
      },
      {
        kind: "image",
        src:
          import.meta.env.BASE_URL + "projects/sustainwear/inv-overview.webp",
        alt: "Charity donation app inventory overview",
      },
      {
        kind: "image",
        src:
          import.meta.env.BASE_URL + "projects/sustainwear/inv-category.webp",
        alt: "Charity donation app category view",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/sustainwear/inv-search.webp",
        alt: "Charity donation app inventory search",
      },
      {
        kind: "video",
        src:
          import.meta.env.BASE_URL +
          "projects/sustainwear/sustainwear-demo.mp4",
        type: "video/mp4",
        poster:
          import.meta.env.BASE_URL + "projects/sustainwear/dashboard.webp",
        alt: "Sustainwear demo walkthrough",
      },
    ],
    showOnHome: true,
    showOnProjectsPage: true,
    featured: true,
  },
  {
    id: "ux-auditor",
    title: "UX Auditor",
    blurb:
      "An AI-powered interface audit tool that analyses web products and returns structured UX findings across visual hierarchy, accessibility, design system consistency, and more.",
    impact:
      "Built end-to-end using the Claude API with an agentic tool-use loop. Claude calls three specialist skills before synthesising a full audit report.",
    tech: ["React", "TypeScript", "Claude API", "Vite", "Tailwind", "Cursor"],
    repoUrl: "https://github.com/edamame91/ux-auditor",
    liveUrl: null,
    details: [
      "Implemented an agentic tool-use loop where Claude calls three function-calling skills: a design system checker, WCAG validator, and component pattern detector.",
      "Design system checker validates spacing against an 8pt grid, font sizes against a standard type scale, and flags colour token proliferation.",
      "WCAG validator maps accessibility findings to specific WCAG 2.1 AA criteria (contrast, focus visibility, name/role/value) with high/medium/low severity levels.",
      "Component pattern detector identifies inconsistent implementations of the same UI pattern, directly relevant to design system maintenance work.",
      "Added prompt caching on the system prompt to reduce API costs across repeated audit calls.",
      "Supports both URL-based audits and screenshot uploads, with audit history persisted to localStorage.",
    ],
    media: [
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/ux-auditor/pendo.webp",
        alt: "UX Auditor main dashboard showing audit input and results",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/ux-auditor/pendo-nav.webp",
        alt: "Audit findings for navigation and wayfinding",
      },
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "projects/ux-auditor/pendo-design.webp",
        alt: "Audit findings panel for design system and component consistency",
      },
    ],
    showOnHome: true,
    showOnProjectsPage: true,
  },
  {
    id: "2-5d-unity-game",
    title: "Echo Chamber",
    blurb: "A gameplay prototype built in Unity with C#.",
    impact:
      "Applied systems thinking to gameplay loops, state handling, and responsive interactions.",
    tech: ["Unity", "C#", "Game Development"],
    repoUrl: "https://github.com/edamame91",
    liveUrl: null,
    details: [
      "Designed a gameplay prototype with reusable interaction systems and manageable scene-level state transitions.",
      "Balanced mechanics and moment-to-moment responsiveness to improve core-loop pacing and player feel.",
    ],
    media: [
      {
        kind: "image",
        src: import.meta.env.BASE_URL + "placeholder.webp",

        alt: "2.5D Unity game scene preview",
      },
    ],
    showOnHome: false,
    showOnProjectsPage: false,
    featured: false,
  },
];
