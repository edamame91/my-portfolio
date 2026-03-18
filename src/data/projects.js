export const projects = [
  {
    id: "sheffield-city-council-app",
    title: "Sheffield City Council Mobile App",
    blurb: "A mobile application for city services and local information.",
    impact:
      "Worked in a team environment using Agile practices, iterative releases, and stakeholder feedback.",
    tech: ["Flutter", "Dart", "Agile", "Mobile Development"],
    repoUrl: "https://github.com/edamame91",
    liveUrl: null,
    details: [
      "Collaborated in an Agile team to deliver service-directory and transit workflows through iterative milestones.",
      "Improved usability by validating navigation patterns with regular stakeholder feedback and sprint reviews.",
    ],
    media: [
      {
        kind: "image",
        src: "./projects/council/merged.webp",
        alt: "City council app home screen",
      },
      {
        kind: "image",
        src: "./projects/council/merged-transport.webp",
        alt: "City council app transport list and map",
      },
      {
        kind: "video",
        src: "./projects/council/council-demo.mp4",
        type: "video/mp4",
        poster: "./projects/council/home-screen.webp",
        alt: "City council app demo walkthrough",
      },
    ],
    featured: true,
  },
  {
    id: "finance-tracker-csharp",
    title: "Fin Track",
    blurb:
      "A C# personal finance tracker for logging transactions and reviewing spending trends.",
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
        src: "./projects/fintrack/cdr-sum.webp",
        alt: "Finance tracker dashboard preview",
      },
      {
        kind: "image",
        src: "./projects/fintrack/month-sum.webp",
        alt: "Finance tracker monthly summary",
      },
      {
        kind: "image",
        src: "./projects/fintrack/total.webp",
        alt: "Finance tracker totals screen",
      },
    ],
    featured: true,
  },
  {
    id: "charity-donation-app",
    title: "Charity Donation Web App",
    blurb:
      "A full-stack donation platform with campaign browsing and contribution workflows.",
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
        src: "./projects/sustainwear/dashboard.webp",
        alt: "Charity donation app interface preview",
      },
      {
        kind: "image",
        src: "./projects/sustainwear/inv-overview.webp",
        alt: "Charity donation app inventory overview",
      },
      {
        kind: "image",
        src: "./projects/sustainwear/inv-category.webp",
        alt: "Charity donation app category view",
      },
      {
        kind: "image",
        src: "./projects/sustainwear/inv-search.webp",
        alt: "Charity donation app inventory search",
      },
      {
        kind: "video",
        src: "./projects/sustainwear/sustainwear-demo.mp4",
        type: "video/mp4",
        poster: "./projects/sustainwear/dashboard.webp",
        alt: "Sustainwear demo walkthrough",
      },
    ],
    featured: true,
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
        src: "./placeholder.webp",

        alt: "2.5D Unity game scene preview",
      },
    ],
    featured: false,
  },
];
