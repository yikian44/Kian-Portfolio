import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate, Link, useOutletContext } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X, Lock } from "lucide-react";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

interface OutletCtx {
  isDark: boolean;
  primaryColor: string;
  isTouch: boolean;
}

/* ─── Smooth Pixel Brush Photo Card (No Artificial Colors + 32px Big Blocks + Line Interpolation) ─── */
function PixelGlitchPhotoCard({ imgSrc, alt, borderColor, index }: {
  imgSrc: string; alt: string; borderColor: string; primaryColor?: string; index?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const blocksRef = useRef<Map<string, { col: number; row: number; life: number; shiftX: number }>>(new Map());
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => { imageRef.current = img; };
  }, [imgSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tileSize = 32; // 32px large chunky pixel block squares

    const render = () => {
      const container = containerRef.current;
      const img = imageRef.current;

      if (container && canvas && ctx && img) {
        const rect = container.getBoundingClientRect();
        if (canvas.width !== Math.floor(rect.width) || canvas.height !== Math.floor(rect.height)) {
          canvas.width = Math.floor(rect.width);
          canvas.height = Math.floor(rect.height);
        }

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const blocks = blocksRef.current;
        blocks.forEach((block, key) => {
          block.life -= 0.035;
          if (block.life <= 0) {
            blocks.delete(key);
            return;
          }

          const bx = block.col * tileSize;
          const by = block.row * tileSize;
          const opacity = Math.sin(block.life * Math.PI);

          // Calculate source rectangle from original photo
          const sx = (bx / w) * img.width;
          const sy = (by / h) * img.height;
          const sw = (tileSize / w) * img.width;
          const sh = (tileSize / h) * img.height;

          ctx.save();
          ctx.globalAlpha = opacity * 0.95;

          // Draw sampled photo image block with a slight horizontal pixel shift
          const renderX = bx + block.shiftX * opacity;
          ctx.drawImage(img, sx, sy, sw, sh, renderX, by, tileSize - 1, tileSize - 1);

          ctx.restore();
        });
      }
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const addTilesAlongLine = (x0: number, y0: number, x1: number, y1: number) => {
    const tileSize = 32;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.ceil(dist / 8));
    const blocks = blocksRef.current;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const curX = x0 + (x1 - x0) * t;
      const curY = y0 + (y1 - y0) * t;

      const centerCol = Math.floor(curX / tileSize);
      const centerRow = Math.floor(curY / tileSize);

      for (let dc = -1; dc <= 1; dc++) {
        for (let dr = -1; dr <= 1; dr++) {
          const col = centerCol + dc;
          const row = centerRow + dr;
          const key = `${col}_${row}`;

          if (!blocks.has(key)) {
            blocks.set(key, {
              col,
              row,
              life: 0.9 + Math.random() * 0.25,
              shiftX: (Math.random() - 0.5) * 14,
            });
          }
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    if (lastMouseRef.current) {
      addTilesAlongLine(lastMouseRef.current.x, lastMouseRef.current.y, mx, my);
    } else {
      addTilesAlongLine(mx, my, mx, my);
    }
    lastMouseRef.current = { x: mx, y: my };
  };

  const handleMouseLeave = () => {
    lastMouseRef.current = null;
  };

  const isPhoneMockup = index !== undefined && index > 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden group cursor-crosshair flex items-center justify-center bg-transparent"
    >
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full object-contain block ${
          isPhoneMockup ? "h-[420px] md:h-[460px]" : "h-auto max-h-[540px]"
        }`}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
    </div>
  );
}


export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark, primaryColor } = useOutletContext<OutletCtx>();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);

  const project = PROJECTS.find((p) => p.slug === slug);
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) { navigate("/"); return; }
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
      // Hero entrance
      gsap.fromTo(".pd-hero-content",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(".pd-meta-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.5 }
      );

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".pd-section").forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // Rule draws
      gsap.utils.toArray<HTMLElement>(".pd-rule").forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });
    });
    return () => { try { ctx.revert(); } catch {} };
  }, [slug, project]);

  if (!project) return null;

  const textFg = isDark ? "#dce3f6" : "#0f0c0e";
  const bodyColor = isDark ? "rgba(220,227,246,0.68)" : "rgba(15,12,14,0.68)";
  const muted = isDark ? "rgba(220,227,246,0.38)" : "rgba(15,12,14,0.42)";
  const borderColor = isDark ? "rgba(91,134,239,0.12)" : "rgba(22,64,211,0.1)";

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[75vh] min-h-[480px] overflow-hidden">
        <img
          src={project.heroImg}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay — strengthened bottom opacity for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Back button — top left */}
        <Link
          to="/"
          className="absolute top-28 left-8 md:left-14 flex items-center gap-2 z-10 transition-all duration-300"
          style={{
            color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(8px)",
            padding: "6px 12px 6px 10px",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#fff";
            el.style.background = `${primaryColor}cc`;
            el.style.borderColor = primaryColor;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "rgba(255,255,255,0.85)";
            el.style.background = "rgba(0,0,0,0.28)";
            el.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <ArrowLeft size={13} strokeWidth={1.3} />
          <span className="font-mono text-[9px] uppercase tracking-[0.28em]">Portfolio</span>
        </Link>

        {/* Hero content — bottom */}
        <div className="pd-hero-content absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          <h1
            className="font-display font-bold leading-[0.88] mb-0"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.02em", color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
          >
            {project.title}
          </h1>
        </div>

        {/* Blueprint corner marks */}
        {(["top-0 right-0", "bottom-0 right-0"] as const).map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8 z-10`} style={{ opacity: 0.5 }}>
            <div className="absolute top-0 right-0 w-full h-px" style={{ background: primaryColor }} />
            <div className="absolute top-0 right-0 h-full w-px" style={{ background: primaryColor }} />
          </div>
        ))}
      </div>

      {/* ── Meta row (Category, Role, Tools, Duration) ── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 border-b"
        style={{ borderColor }}
      >
        {[
          { label: "Category", value: project.category },
          { label: "Role", value: project.role },
          { label: "Tools", value: project.tools || "Figma" },
          { label: "Duration", value: project.duration },
        ].map((item, i) => (
          <div
            key={i}
            className="pd-meta-item px-6 md:px-10 py-6 border-r last:border-r-0"
            style={{ borderColor }}
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.25em] mb-1.5" style={{ color: muted }}>
              {item.label}
            </p>
            <p className="font-body text-xs md:text-sm font-medium" style={{ color: textFg }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div ref={contentRef} className="px-8 md:px-14">

        {/* 01 — Overview */}
        <section className="pd-section py-10 md:py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>01</span>
            <h2 className="font-display font-bold mt-1"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: textFg }}>
              Overview
            </h2>
          </div>
          <p className="font-body text-sm md:text-base leading-[1.85] whitespace-pre-line" style={{ color: bodyColor }}>
            {project.overview}
          </p>
        </section>

        {/* 02 — Problem Statement */}
        <section className="pd-section py-10 md:py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>02</span>
            <h2 className="font-display font-bold mt-1"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: textFg }}>
              Problem Statement
            </h2>
          </div>
          <p className="font-body text-sm md:text-base leading-[1.85] whitespace-pre-line" style={{ color: bodyColor }}>
            {project.challenge}
          </p>
        </section>

        {/* 03 — Goal */}
        <section className="pd-section py-10 md:py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: primaryColor }}>03</span>
            <h2 className="font-display font-bold mt-1"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: textFg }}>
              Goal
            </h2>
          </div>
          <p className="font-body text-sm md:text-base leading-[1.85] whitespace-pre-line" style={{ color: bodyColor }}>
            {project.tagline}
          </p>
        </section>

        <div className="pd-rule h-px w-full" style={{ background: primaryColor, opacity: 0.22 }} />

        {/* ── Photo Showcase Section (Pixel Glitch Track Distortion) ── */}
        <section className="pd-section py-10 md:py-14 flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
          {/* Main Cover Image */}
          {project.gallery && project.gallery[0] && (
            <PixelGlitchPhotoCard
              index={0}
              imgSrc={project.gallery[0]}
              alt={`${project.title} — Cover`}
              borderColor={borderColor}
              primaryColor={primaryColor}
            />
          )}

          {/* Additional Images (e.g. App screens grid) */}
          {project.gallery && project.gallery.length > 1 && (
            <div className={`grid gap-4 md:gap-6 w-full max-w-5xl mx-auto items-center justify-items-center ${
              project.gallery.length - 1 >= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
            }`}>
              {project.gallery.slice(1).map((imgSrc, idx) => (
                <div key={idx + 1} className="w-full max-w-[220px] flex justify-center">
                  <PixelGlitchPhotoCard
                    index={idx + 1}
                    imgSrc={imgSrc}
                    alt={`${project.title} — photo ${idx + 2}`}
                    borderColor={borderColor}
                    primaryColor={primaryColor}
                  />
                </div>
              ))}
            </div>
          )}

          {/* GIF Animation Showcase below 4 screens */}
          {project.gifUrl && (
            <div className="w-full max-w-3xl mx-auto mt-4">
              <PixelGlitchPhotoCard
                imgSrc={project.gifUrl}
                alt={`${project.title} — Animated Showcase`}
                borderColor={borderColor}
                primaryColor={primaryColor}
              />
            </div>
          )}
        </section>

        <div className="pd-rule h-px w-full" style={{ background: primaryColor, opacity: 0.22 }} />

        {/* ── Bottom Action Row: View Project CTA ── */}
        <div className="pd-section py-10 md:py-12 flex items-center justify-end gap-3 md:gap-4 flex-wrap">
          {/* Case Study button with Lock icon in the middle */}
          <button
            onClick={() => setShowLockModal(true)}
            className="flex items-center gap-2 px-6 py-4 transition-all duration-300 font-mono text-[10px] uppercase tracking-[0.25em] group cursor-pointer"
            style={{
              color: isDark ? "rgba(220,227,246,0.75)" : "rgba(15,12,14,0.75)",
              border: `1px solid ${isDark ? "rgba(91,134,239,0.22)" : "rgba(22,64,211,0.18)"}`,
              background: isDark ? "rgba(20,24,40,0.5)" : "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = primaryColor;
              el.style.color = textFg;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = isDark ? "rgba(91,134,239,0.22)" : "rgba(22,64,211,0.18)";
              el.style.color = isDark ? "rgba(220,227,246,0.75)" : "rgba(15,12,14,0.75)";
            }}
            data-hover
          >
            <span>CASE</span>
            <Lock size={12} strokeWidth={1.5} style={{ color: primaryColor }} />
            <span>STUDY</span>
          </button>

          <a
            href={project.liveUrl || project.tagline.replace('Live Preview: ', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 transition-all duration-300 font-mono text-[10px] uppercase tracking-[0.25em] group"
            style={{
              color: primaryColor,
              border: `1px solid ${primaryColor}55`,
              background: `${primaryColor}0d`,
            }}
            data-hover
          >
            <span>View Project</span>
            <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ── Case Study Coming Soon Modal ── */}
      {showLockModal && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowLockModal(false)}
        >
          <div
            className="relative w-full max-w-sm p-8 border shadow-2xl transition-all text-center flex flex-col items-center gap-4"
            style={{
              background: isDark ? "#0e111d" : "#ffffff",
              borderColor: isDark ? "rgba(91,134,239,0.25)" : "rgba(22,64,211,0.2)",
              color: textFg,
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLockModal(false)}
              className="absolute top-4 right-4 p-1 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}15`, color: primaryColor }}>
              <Lock size={22} strokeWidth={1.5} />
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
                Coming Soon
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: muted }}>
                Case Study In Preparation
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Next project ─────────────────────────────────── */}
      <div className="pd-section" style={{ borderTop: `1px solid ${borderColor}` }}>
        <Link
          to={`/project/${nextProject.slug}`}
          className="group flex items-center justify-between px-8 md:px-14 py-10 md:py-14 transition-colors duration-300"
          style={{ background: "transparent" }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = isDark ? "rgba(91,134,239,0.04)" : "rgba(22,64,211,0.03)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] mb-2" style={{ color: muted }}>
              Next Project
            </p>
            <h3
              className="font-display font-bold transition-colors duration-300"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: textFg,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = primaryColor)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = textFg)}
            >
              {nextProject.title}
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: primaryColor }}>
              {nextProject.category} — {nextProject.year}
            </p>
          </div>
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:translate-x-2"
            style={{ border: `1px solid ${primaryColor}30`, color: primaryColor }}
          >
            <ArrowRight size={16} strokeWidth={1.2} />
          </div>
        </Link>
      </div>
    </div>
  );
}
