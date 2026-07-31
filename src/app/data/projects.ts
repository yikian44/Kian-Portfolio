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
  tools?: string;
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
  gallery?: string[];
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
    role: "UI/UX Designer",
    tools: "Figma",
    duration: "September 2025 - February 2026",
    img: "/jalan-square-cover.jpg",
    heroImg: "/jalan-square-cover.jpg",
    secondImg: "/jalan-square-cover.jpg",
    gallery: [
      "/jalan-square-cover.jpg",
      "/imperfect-vessel-cover.png",
      "/lobster-atlas-cover-2.jpg",
      "/daily-sedap.jpg",
    ],
    tags: ["UI/UX", "Interactive"],
    tagline: "Let every group member participate in the planning process and make Malaysian group trips easier, fairer and more organized.",
    liveUrl: "https://www.figma.com/proto/UvyZ4mWLooxRDjwbhJFRAj/Jalan-Square?node-id=451-610&t=c2dQCzUzX64cykse-1",
    overview: "Jalan Square is a mobile application that provides a collaborative travel-planning experience for young Malaysian travellers, helping groups discover local destinations, share ideas, vote and organize their trips together.\n\nThis is a UI/UX project focusing on localized travel content, group decision-making and shared trip organization.",
    challenge: "Planning a group trip often requires switching between WhatsApp, Google Maps, spreadsheets and multiple booking applications.\n\nThis causes information to become scattered, decisions to take longer, and most planning responsibilities to fall on one person.\n\nThis is mainly caused by:\n(1) Fragmented planning tools\n(2) Unclear group decisions\n(3) Unequal participation\n(4) Limited localized travel inspiration",
    approach: ["Figma Prototyping", "Interactive Spatial UI"],
    outcome: "Successfully delivered an interactive prototype validated through user feedback.",
    metrics: [{ value: "100%", label: "Completion" }],
  },
  {
    id: 2,
    slug: "imperfect-vessel",
    idx: "02",
    title: "IMPERFECT VESSEL",
    category: "Interactive Design",
    year: "2026",
    role: "UI/UX Designer",
    tools: "Antigravity",
    duration: "April 2026 - August 2026",
    img: "/imperfect-vessel-cover.png",
    heroImg: "/imperfect-vessel-cover.png",
    secondImg: "/imperfect-vessel-cover.png",
    gallery: [
      "/imperfect-vessel-cover.png",
      "/jalan-square-cover.jpg",
      "/lobster-atlas-cover-2.jpg",
      "/daily-sedap.jpg",
    ],
    tags: ["Web Design", "Development"],
    tagline: "Help users recognize their perfectionistic behaviours and reappreciate flaws, accidents and incompleteness as part of beauty.",
    liveUrl: "https://yikian44.github.io/Imperfect-vessel-1/",
    overview: "Imperfection Vessel is an interactive web experience that explores perfectionism and mental well-being through digital creation.\n\nUsers create their own vessel while the system observes their time and editing behaviour, then provides a reflection based on their creative process.\n\nThis is an experimental project combining UI/UX, creative coding and the philosophy of Wabi-Sabi.",
    challenge: "Perfectionism is more than simply wanting to produce good work.\n\nPeople with unhealthy perfectionistic tendencies often fear mistakes, repeatedly revise their work and connect their self-worth with their performance.\n\nThis may lead to:\n(1) Anxiety and self-doubt\n(2) Fear of failure or judgement\n(3) Procrastination\n(4) Mental exhaustion and burnout",
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
    role: "Editor",
    tools: "Premiere Pro • After Effects • CapCut • TikTok",
    duration: "February 2025 - March 2026",
    img: "/daily-sedap.jpg",
    heroImg: "/daily-sedap.jpg",
    secondImg: "/daily-sedap.jpg",
    gallery: [
      "/daily-sedap.jpg",
      "/jalan-square-cover.jpg",
      "/imperfect-vessel-cover.png",
      "/lobster-atlas-cover-2.jpg",
    ],
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
    role: "UI/UX Designer",
    tools: "Figma",
    duration: "September 2025 - February 2026",
    img: "/lobster-atlas-cover-2.jpg",
    heroImg: "/lobster-atlas-cover-2.jpg",
    secondImg: "/lobster-atlas-cover-2.jpg",
    gallery: [
      "/lobster-atlas-cover-2.jpg",
      "/imperfect-vessel-cover.png",
      "/jalan-square-cover.jpg",
      "/daily-sedap.jpg",
    ],
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
