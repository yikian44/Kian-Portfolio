# Project Detail Content Guide

The Project Detail page is generated from `src/app/data/projects.ts`. You do
not need to edit `ProjectDetail.tsx` when adding project content.

## 1. Basic project information

Each project needs the following fields:

```ts
{
  id: 5,
  slug: "project-name",
  idx: "05",
  title: "PROJECT NAME",
  category: "UI/UX · Mobile App",
  year: "2026",
  role: "UI/UX Designer",
  duration: "8 weeks",
  img: "/project-cover.jpg",
  heroImg: "/project-hero.jpg",
  tags: ["UI/UX", "Research", "Prototype"],
  cardDescription:
    "One clear sentence explaining the project and its value.",
  liveUrl: "https://example.com",
  repositoryUrl: "https://github.com/example/project",
  tools: ["Figma", "React", "Firebase"],
  caseStudyStatus: "in-progress",
  sections: [],
}
```

`liveUrl` and `repositoryUrl` are optional. Remove either line when it is not
needed.

## 2. Recommended case-study structure

Add sections in the order you want them to appear:

```ts
sections: [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "Explain the project context, target users, and why the project matters.",
    ],
  },
  {
    id: "problem",
    title: "Problem",
    paragraphs: [
      "Describe the user problem and the evidence that helped you identify it.",
    ],
  },
  {
    id: "research",
    title: "Research & Insights",
    paragraphs: [
      "Summarize the research method and what you learned.",
    ],
    bullets: [
      "First important user insight",
      "Second important user insight",
      "Third important user insight",
    ],
    images: [
      {
        src: "/project-research.jpg",
        alt: "Research notes and affinity mapping",
        caption: "Interview findings grouped into themes",
      },
    ],
  },
  {
    id: "process",
    title: "Design Process",
    paragraphs: [
      "Explain the design decisions, iteration, and why the final direction was selected.",
    ],
    images: [
      {
        src: "/project-wireframes.jpg",
        alt: "Early project wireframes",
        caption: "Early wireframes",
      },
      {
        src: "/project-final-ui.jpg",
        alt: "Final project interface",
        caption: "Final interface",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing & Iteration",
    bullets: [
      "What was tested",
      "What users struggled with",
      "What changed after testing",
    ],
  },
  {
    id: "outcome",
    title: "Outcome",
    paragraphs: [
      "Describe the result using real evidence, feedback, or measurable outcomes.",
    ],
  },
  {
    id: "reflection",
    title: "Reflection",
    paragraphs: [
      "Explain what you learned and what you would improve next.",
    ],
  },
]
```

## 3. Add images

Place image files inside the `public` folder:

```text
public/project-name/
```

Reference them from `projects.ts` beginning with `/`:

```ts
src: "/project-name/research.jpg"
```

Always write a useful `alt` description. `caption` is optional.

## 4. Publish the case study

When the content is complete, change:

```ts
caseStudyStatus: "in-progress"
```

to:

```ts
caseStudyStatus: "published"
```

The “Case study in progress” labels will disappear automatically.
