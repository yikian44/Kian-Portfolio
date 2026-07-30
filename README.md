# Kian Portfolio

Personal portfolio for Gan Yi Kian, a UI/UX designer based in Selangor,
Malaysia. The site presents selected UI/UX, interactive, web, and
creative-media projects through a blueprint-inspired visual system.

## Technology

- React + TypeScript
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js
- Motion
- Lenis

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Update projects

Project cards and case-study pages are generated from:

```text
src/app/data/projects.ts
```

Follow [PROJECT_DETAIL_GUIDE.md](./PROJECT_DETAIL_GUIDE.md) to add text,
process steps, images, live links, and repository links without changing the
page component.

## Project status

Projects can use either:

```ts
caseStudyStatus: "in-progress"
```

or:

```ts
caseStudyStatus: "published"
```

An in-progress project displays a clear status notice until the full case study
is ready.
