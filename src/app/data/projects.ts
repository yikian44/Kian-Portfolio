export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  idx: string;
  title: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  img: string;
  heroImg: string;
  secondImg: string;
  tags: readonly string[];
  tagline: string;
  liveUrl?: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "jalan-square",
    idx: "01",
    title: "JALAN SQUARE",
    category: "UI / UX",
    year: "2026",
    role: "Designer",
    duration: "4 weeks",
    img: "/jalan-square-cover.jpg",
    heroImg: "/jalan-square-cover.jpg",
    secondImg: "/jalan-square-cover.jpg",
    tags: ["UI/UX", "Interactive"],
    tagline: "Interactive spatial UI prototype exploring modern digital interactions.",
    liveUrl: "https://www.figma.com/proto/UvyZ4mWLooxRDjwbhJFRAj/Jalan-Square?node-id=451-610&t=c2dQCzUzX64cykse-1",
    overview: "Jalan Square is an interactive design prototype created to explore spatial UI elements and responsive user navigation.",
    challenge: "Designing an intuitive, fluid interactive layout within constrained viewports while preserving clarity.",
    approach: ["Figma Prototyping", "Interactive Spatial UI"],
    outcome: "Successfully delivered an interactive prototype validated through user feedback.",
    metrics: [{ value: "100%", label: "Completion" }],
  },
  {
    id: 2,
    slug: "imperfect-vessel",
    idx: "02",
    title: "IMPERFECT VESSEL",
    category: "Web Experience",
    year: "2026",
    role: "Designer & Developer",
    duration: "4 weeks",
    img: "/imperfect-vessel-cover.png",
    heroImg: "/imperfect-vessel-cover.png",
    secondImg: "/imperfect-vessel-cover.png",
    tags: ["Web Design", "Development"],
    tagline: "Creative web story experience blending typography and interactive visuals.",
    liveUrl: "https://yikian44.github.io/Imperfect-vessel-1/",
    overview: "Imperfect Vessel explores immersive web storytelling through atmospheric graphics and dynamic motion.",
    challenge: "Balancing rich expressive animations with smooth rendering performance across devices.",
    approach: ["Web Development", "UI Animation", "Creative Direction"],
    outcome: "Successfully launched an engaging web experience with fluid interactions.",
    metrics: [{ value: "100%", label: "Completion" }],
  },
  {
    id: 3,
    slug: "daily-sedap",
    idx: "03",
    title: "DAILY SEDAP",
    category: "Content & Video",
    year: "2025",
    role: "Content Creator",
    duration: "Ongoing",
    img: "/daily-sedap.jpg",
    heroImg: "/daily-sedap.jpg",
    secondImg: "/daily-sedap.jpg",
    tags: ["Social Media", "Video"],
    tagline: "Engaging culinary TikTok content series highlighting local food culture.",
    liveUrl: "https://www.tiktok.com/@dailysedap?refer=creator_embed",
    overview: "Daily Sedap is a short-form video series bringing local Malaysian food culture to social media audiences.",
    challenge: "Crafting fast-paced, visually appealing content that retains high viewer engagement.",
    approach: ["Video Editing", "Content Strategy", "Trend Analysis"],
    outcome: "Achieved strong audience growth and viral reach across TikTok.",
    metrics: [{ value: "High", label: "Engagement" }],
  },
  {
    id: 4,
    slug: "lobster-atlas",
    idx: "04",
    title: "LOBSTER ATLAS",
    category: "Interactive Atlas",
    year: "2025",
    role: "Designer & Developer",
    duration: "4 weeks",
    img: "/lobster-atlas-cover-2.jpg",
    heroImg: "/lobster-atlas-cover-2.jpg",
    secondImg: "/lobster-atlas-cover-2.jpg",
    tags: ["Web Design", "Development"],
    tagline: "Interactive species atlas mapping lobster biology and geographic distribution.",
    liveUrl: "https://lobsteryikian.netlify.app/",
    overview: "Lobster Atlas is an educational web application mapping marine species data through interactive charts.",
    challenge: "Structuring complex species datasets into clean, accessible visual interfaces.",
    approach: ["Data Mapping", "Web Development", "UI Design"],
    outcome: "Deployed an intuitive, interactive atlas that simplifies marine research data.",
    metrics: [{ value: "100%", label: "Completion" }],
  }
];
