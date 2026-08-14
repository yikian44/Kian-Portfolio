import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate, useOutletContext } from "react-router";
import { ArrowLeft, ArrowUpRight, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const outletCtx = useOutletContext<{ isDark: boolean; primaryColor: string }>();
  const isDark = outletCtx?.isDark ?? true;
  const primaryColor = outletCtx?.primaryColor ?? "#1640d3";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allImages = [
    project.heroImg,
    ...(project.gallery || []),
    ...(project.extraImages || []),
  ].filter((img, idx, self) => img && self.indexOf(img) === idx);

  useEffect(() => {
    if (!project) {
      navigate("/");
      return;
    }
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug, project, navigate]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".cs-header-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );

      // Meta items staggered reveal
      gsap.fromTo(
        ".cs-meta-cell",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out", delay: 0.3 }
      );

      // Scroll reveals for sections
      gsap.utils.toArray<HTMLElement>(".cs-section").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Horizontal dividers animation
      gsap.utils.toArray<HTMLElement>(".cs-rule").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    });
    return () => {
      try {
        ctx.revert();
      } catch {}
    };
  }, [slug, project]);

  if (!project) return null;

  const textFg = isDark ? "#dce3f6" : "#0f0c0e";
  const bodyColor = isDark ? "rgba(220,227,246,0.72)" : "rgba(15,12,14,0.75)";
  const muted = isDark ? "rgba(220,227,246,0.38)" : "rgba(15,12,14,0.42)";
  const borderColor = isDark ? "rgba(91,134,239,0.15)" : "rgba(22,64,211,0.12)";
  const cardBg = isDark ? "rgba(20,24,40,0.55)" : "rgba(255,255,255,0.7)";

  const caseStudy = project.caseStudy || {};
  const objectives = caseStudy.objectives || [
    { title: "User-Centered Architecture", desc: "Design an intuitive layout that minimizes cognitive load and speeds up core user tasks." },
    { title: "Visual Consistency", desc: "Establish a cohesive design system with clear typography and harmonious color contrast." },
    { title: "Interactive Engagement", desc: "Incorporate micro-interactions and smooth transitions to improve overall user delight." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* ── Top Bar / Header ── */}
      <div className="px-8 md:px-14 pb-8 border-b" style={{ borderColor }}>
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/project/${project.slug}`}
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = primaryColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
          >
            <ArrowLeft size={13} strokeWidth={1.3} />
            <span>Back To Project</span>
          </Link>

          <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: primaryColor }}>
            Case Study // {project.idx}
          </span>
        </div>

        <div className="cs-header-content">
          <h1
            className="font-display font-bold leading-none mb-3"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)", letterSpacing: "-0.02em", color: textFg }}
          >
            {project.title}
          </h1>
          <p className="font-body text-sm md:text-base max-w-3xl leading-relaxed" style={{ color: bodyColor }}>
            {project.tagline}
          </p>
        </div>
      </div>

      {/* ── Clean Metadata Bar ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor }}>
        {[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration },
          { label: "Audience", value: caseStudy.audience || "General Audience & Digital Users" },
          { label: "Tools", value: project.tools || "Figma" },
        ].map((item, i) => (
          <div
            key={i}
            className="cs-meta-cell px-6 md:px-10 py-5 border-r last:border-r-0 border-b md:border-b-0"
            style={{ borderColor }}
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] mb-1.5" style={{ color: primaryColor }}>
              {item.label}
            </p>
            <p className="font-body text-xs md:text-sm font-medium" style={{ color: textFg }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main Content Container ── */}
      <div ref={contentRef} className="px-8 md:px-14">

        {/* ── 01 Overview & Problem Statement ── */}
        <section className="cs-section py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-b" style={{ borderColor }}>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>01 // OVERVIEW</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl mt-2 mb-4" style={{ color: textFg }}>
              Overview
            </h2>
            <p className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: bodyColor }}>
              {project.overview}
            </p>
          </div>

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>PROBLEM STATEMENT</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl mt-2 mb-4" style={{ color: textFg }}>
              The Challenge
            </h2>
            <p className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: bodyColor }}>
              {project.challenge}
            </p>
          </div>
        </section>

        {/* ── 02 Objectives & Target Audience ── */}
        <section className="cs-section py-12 md:py-16 border-b" style={{ borderColor }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>02 // OBJECTIVES</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl mt-2 mb-8" style={{ color: textFg }}>
            Core Objectives & Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className="p-6 rounded-lg transition-all duration-300 group border"
                style={{
                  background: cardBg,
                  borderColor,
                }}
              >
                <span className="font-mono text-[9px] tracking-widest block mb-3" style={{ color: primaryColor }}>
                  0{i + 1}
                </span>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: textFg }}>
                  {obj.title}
                </h3>
                <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: bodyColor }}>
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Process & Modular Story Blocks ── */}
        {caseStudy.storyBlocks && caseStudy.storyBlocks.map((block, i) => (
          <section key={i} className="cs-section py-12 md:py-16 border-b" style={{ borderColor }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>
              {block.sectionNumber || `0${i + 3}`} // PROCESS
            </span>
            {block.title && (
              <h2 className="font-display font-bold text-2xl md:text-3xl mt-2 mb-2" style={{ color: textFg }}>
                {block.title}
              </h2>
            )}
            {block.subtitle && (
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: muted }}>
                {block.subtitle}
              </p>
            )}

            {/* Type: Text + Image (Alternating Zigzag) */}
            {block.type === "text-image" && (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${block.imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
                <div className={block.imagePosition === "left" ? "md:order-2" : "md:order-1"}>
                  <p className="font-body text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: bodyColor }}>
                    {block.description}
                  </p>
                </div>

                {block.images && block.images[0] && (
                  <div
                    className={`relative group rounded-lg overflow-hidden border cursor-pointer ${block.imagePosition === "left" ? "md:order-1" : "md:order-2"}`}
                    style={{ borderColor }}
                    onClick={() => {
                      const idx = allImages.indexOf(block.images![0]);
                      setLightboxIndex(idx >= 0 ? idx : 0);
                    }}
                  >
                    <img src={block.images[0]} alt={block.title || "Process Image"} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Type: Card Grid */}
            {block.type === "card-grid" && block.cards && (
              <div>
                {block.description && (
                  <p className="font-body text-sm md:text-base leading-relaxed mb-8 max-w-3xl" style={{ color: bodyColor }}>
                    {block.description}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {block.cards.map((card, idx) => (
                    <div key={idx} className="p-6 rounded-lg border" style={{ background: cardBg, borderColor }}>
                      <h4 className="font-display font-bold text-base md:text-lg mb-2" style={{ color: textFg }}>
                        {card.title}
                      </h4>
                      <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: bodyColor }}>
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Type: Full Image Showcase */}
            {block.type === "full-image" && block.images && (
              <div className="flex flex-col gap-6">
                {block.description && (
                  <p className="font-body text-sm md:text-base leading-relaxed max-w-3xl mb-4" style={{ color: bodyColor }}>
                    {block.description}
                  </p>
                )}
                {block.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-lg overflow-hidden border cursor-pointer"
                    style={{ borderColor }}
                    onClick={() => {
                      const foundIdx = allImages.indexOf(img);
                      setLightboxIndex(foundIdx >= 0 ? foundIdx : 0);
                    }}
                  >
                    <img src={img} alt={`${block.title} ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center gap-2 font-mono text-xs">
                        <Maximize2 size={16} />
                        <span>Inspect High-Res</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* ── 04 Action CTA Buttons ── */}
        <section className="cs-section py-12 md:py-16 flex items-center justify-end gap-4 flex-wrap border-b" style={{ borderColor }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 transition-all duration-300 font-mono text-[10px] uppercase tracking-[0.25em] group rounded"
              style={{
                color: "#ffffff",
                background: primaryColor,
                border: `1px solid ${primaryColor}`,
              }}
            >
              <span>{project.ctaLabel || "View Live Prototype"}</span>
              <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </section>

        {/* ── 05 Next Project Navigation ── */}
        <section className="cs-section py-14 md:py-20 flex items-center justify-between flex-wrap gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] block mb-2" style={{ color: muted }}>
              Next Project →
            </span>
            <Link
              to={`/casestudy/${nextProject.slug}`}
              className="font-display font-bold text-3xl md:text-5xl transition-colors hover:opacity-80"
              style={{ color: textFg }}
            >
              {nextProject.title}
            </Link>
          </div>

          <Link
            to={`/casestudy/${nextProject.slug}`}
            className="flex items-center gap-3 px-6 py-3.5 border rounded font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
            style={{ borderColor, color: primaryColor }}
          >
            <span>Read Next Case Study</span>
            <ArrowRight size={14} />
          </Link>
        </section>
      </div>

      {/* ── Fullscreen Image Lightbox Modal ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev Arrow */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0));
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image Display */}
          <div className="max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImages[lightboxIndex]}
              alt={`Fullscreen ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
            />
          </div>

          {/* Next Arrow */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image Counter Footer */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 text-white/80 font-mono text-xs border border-white/10">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
