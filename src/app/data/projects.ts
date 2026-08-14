export interface ProjectMetric {
  value: string;
  label: string;
}

export interface CaseStudyBlock {
  type: "text-image" | "card-grid" | "full-image" | "comparison";
  sectionNumber?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imagePosition?: "left" | "right";
  images?: string[];
  comparisonLabels?: string[];
  cards?: Array<{ title: string; desc: string }>;
}

export interface CaseStudyData {
  audience?: string;
  objectives?: Array<{ title: string; desc: string }>;
  canvaEmbedUrl?: string;
  storyBlocks?: CaseStudyBlock[];
  ctaButtons?: Array<{ label: string; url: string }>;
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
  ctaLabel?: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  gallery?: string[];
  stamps?: string[];
  gifUrl?: string;
  desktopImg?: string;
  extraImages?: string[];
  metrics: ProjectMetric[];
  caseStudy?: CaseStudyData;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "jalan-square",
    idx: "01",
    title: "JALAN SQUARE",
    category: "App",
    year: "2026",
    role: "UI/UX Designer",
    tools: "Figma",
    duration: "September 2025 - February 2026",
    img: "/jalan-square-cover.jpg",
    heroImg: "/jalan-square-cover.jpg",
    secondImg: "/jalan-square-cover.jpg",
    gallery: [
      "/jalan-square-cover.jpg",
      "/jalan-square-welcome.png",
      "/jalan-square-kaki-ikut.png",
      "/jalan-square-si-kepala.png",
      "/jalan-square-board.png",
      "/jalan-square-cari-dulu.png",
      "/jalan-square-batu-caves.png",
      "/jalan-square-group-map.png",
      "/jalan-square-board-detail.png",
    ],
    stamps: [
      "/jalan-square-stamp-belum.png",
      "/jalan-square-stamp-kautim.png",
    ],
    gifUrl: "/jalan-square-demo.gif",
    tags: ["UI/UX", "Interactive"],
    tagline: "Let every group member participate in the planning process and make Malaysian group trips easier, fairer and more organized.",
    liveUrl: "https://www.figma.com/proto/UvyZ4mWLooxRDjwbhJFRAj/Jalan-Square?node-id=451-610&t=c2dQCzUzX64cykse-1",
    ctaLabel: "View in Figma",
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
      "/imperfect-vessel-editor.png",
      "/imperfect-vessel-result-1.png",
      "/imperfect-vessel-community.png",
      "/imperfect-vessel-result-2.png",
    ],
    desktopImg: "/imperfect-vessel-desktop.png",
    extraImages: [
      "/imperfect-vessel-faces.png",
    ],
    tags: ["Web Design", "Development"],
    tagline: "Help users recognize their perfectionistic behaviours and reappreciate flaws, accidents and incompleteness as part of beauty.",
    liveUrl: "https://yikian44.github.io/Imperfect-vessel-1/",
    ctaLabel: "View Project",
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
    ],
    tags: ["Social Media", "Video"],
    tagline: "The project aims to highlight these underappreciated cultural details through engaging short-form videos. It encourages local and international audiences to appreciate Malaysia’s food heritage while giving greater visibility to local food establishments and communities.",
    liveUrl: "https://www.tiktok.com/@dailysedap?refer=creator_embed",
    ctaLabel: "Watch On TikTok",
    overview: "Sedap Daily is a TikTok video series that explores Malaysian food culture through mamaks, hawker centres, kopitiams and warungs. Beyond showcasing food, the project documents the people, sounds, routines and social interactions that shape each dining experience.",
    challenge: "Malaysian food culture is often represented only through famous dishes and popular restaurants. Everyday details—such as food preparation, conversations, local rituals and relationships between communities—are frequently overlooked, despite being essential to the culture’s identity.",
    approach: ["Video Editing", "Content Strategy", "Trend Analysis"],
    outcome: "Achieved strong audience growth and viral reach across TikTok.",
    metrics: [{ value: "High", label: "Engagement" }],
  },
  {
    id: 4,
    slug: "lobster-atlas",
    idx: "04",
    title: "LOBSTER ATLAS",
    category: "Web Interactive Design",
    year: "2025",
    role: "UI/UX Designer",
    tools: "Figma • Adobe Animate",
    duration: "September 2025 - January 2026",
    img: "/lobster-atlas-cover-2.jpg",
    heroImg: "/lobster-atlas-cover-2.jpg",
    secondImg: "/lobster-atlas-cover-2.jpg",
    desktopImg: "/lobster-atlas-map.png",
    gallery: [
      "/lobster-atlas-cover-2.jpg",
      "/lobster-illustration-1.png",
      "/lobster-illustration-2.png",
      "/lobster-illustration-3.png",
      "/lobster-illustration-4.png",
    ],
    tags: ["Web Design", "Development"],
    tagline: "To create an accessible and engaging digital atlas that helps users discover, compare, and understand lobster species through clear data visualisations and interactive exploration.",
    liveUrl: "https://lobsteryikian.netlify.app/",
    ctaLabel: "View Project",
    overview: "Lobster Atlas is an educational web application that transforms lobster species data into interactive maps and visualisations, making marine biology easier to explore and understand.",
    challenge: "Scientific data about lobster species, biology, and geographic distribution is often complex, text-heavy, and difficult for general audiences to understand.",
    approach: ["Data Mapping", "Web Development", "UI Design"],
    outcome: "Deployed an intuitive, interactive atlas that simplifies marine research data.",
    metrics: [{ value: "100%", label: "Completion" }],
  },
  {
    id: 5,
    slug: "nour",
    idx: "05",
    title: "NOUR",
    category: "App",
    year: "2026",
    role: "UI/UX Designer",
    tools: "Figma",
    duration: "April 2026 - August 2026",
    img: "/nour-cover.png",
    heroImg: "/nour-cover.png",
    secondImg: "/nour-cover.png",
    gallery: [
      "/nour-cover.png",
    ],
    tags: ["UI/UX", "Mobile App"],
    tagline: "Create a seamless meal subscription experience that makes healthy eating easier through personalized meal plans, simple tracking, and daily nutritional guidance.",
    liveUrl: "https://www.figma.com/proto/aa4GQ7RYPKDKV5hvtnit7I/Nour-App?node-id=3602-2601&p=f&t=IWN8dCCmAWF4bGVe-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3564%3A7021&show-proto-sidebar=1",
    ctaLabel: "View In Figma",
    overview: "Nour is a personalized meal subscription app that helps Malaysians build healthier eating habits through customized local meal plans, nutrition tracking, and an AI-powered assistant.",
    challenge: "Maintaining a healthy diet can be difficult without convenient guidance that fits individual nutritional goals, busy routines, and local food preferences.",
    approach: ["UI/UX Prototyping", "Personalized Meal Architecture", "AI Assistant Integration"],
    outcome: "Designed an intuitive mobile app experience with personalized subscription flows and daily nutritional tracking.",
    metrics: [{ value: "100%", label: "Completion" }],
    caseStudy: {
      audience: "Health-conscious Malaysians, busy working professionals, & fitness enthusiasts (Ages 18 - 45)",
      canvaEmbedUrl: "https://www.canva.com/design/DAHQAyavrVQ/view?embed",
      objectives: [
        { title: "Personalized Subscriptions", desc: "Empower users with tailored dietary plans including Protein Plus, Essential Vegan, High Fiber, and Gluten Free choices." },
        { title: "AI Assistant Guidance", desc: "Integrate Nour Chatbot to provide 24/7 real-time macro calculation, meal swap suggestions, and diet advice." },
        { title: "Simplified Onboarding", desc: "Streamline user goal configuration into a seamless 3-step setup to eliminate decision fatigue." },
        { title: "Localized Meal Ecosystem", desc: "Connect users with 1000+ certified local healthy recipes and restaurant partners across Malaysia." }
      ],
      storyBlocks: [
        {
          type: "text-image",
          sectionNumber: "03",
          title: "User Journey & Goal Setup",
          subtitle: "Empowering users through structured wellness choices",
          description: "The onboarding flow allows users to select core wellness targets—such as clean eating, boosting energy, reducing stress, or building muscle. The interface dynamically updates to recommend personalized subscription plans matching their daily caloric needs.",
          imagePosition: "right",
          images: ["/nour-cover.png"]
        },
        {
          type: "card-grid",
          sectionNumber: "04",
          title: "Core Product Features",
          subtitle: "Four pillars supporting seamless daily nutrition",
          cards: [
            { title: "Flex Meal Subscriptions", desc: "Easily modify or switch meal plan tiers between Protein Plus, Essential Vegan, and High Fiber week-by-week." },
            { title: "Auto Meal Planner", desc: "Automated daily meal suggestions pre-scheduled directly into your personal calendar." },
            { title: "Nour AI Chatbot", desc: "24/7 conversational assistant for real-time calorie tracking and nutrition Q&A." },
            { title: "Local Kitchen Network", desc: "Direct partnerships with certified healthy food providers across major Malaysian urban hubs." }
          ]
        },
        {
          type: "full-image",
          sectionNumber: "05",
          title: "High-Fidelity Interface Showcase",
          subtitle: "Clean, accessible mobile UI design System",
          description: "Full app flow screens illustrating goal selection, subscription customization, AI chatbot interactions, and weekly meal schedule tracking.",
          images: ["/nour-cover.png"]
        }
      ],
      ctaButtons: [
        { label: "View Prototype In Figma", url: "https://www.figma.com/proto/aa4GQ7RYPKDKV5hvtnit7I/Nour-App?node-id=3602-2601&p=f&t=IWN8dCCmAWF4bGVe-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3564%3A7021&show-proto-sidebar=1" }
      ]
    }
  }
];


