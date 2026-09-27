"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { techIconMap } from "./navPages/Projects";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export interface ShowcaseProject {
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  techStack: string[];
  gradient: string;
  isMobileApp?: boolean;
  github?: string;
  live?: string;
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  onOpen: (project: ShowcaseProject) => void;
}

const techLabel = (tech: string) =>
  tech === "ts" ? "TypeScript" : tech === "api" ? "API" : tech === "jwt" ? "JWT" : tech.charAt(0).toUpperCase() + tech.slice(1);

function DeviceFrame({ project }: { project: ShowcaseProject }) {
  if (project.isMobileApp) {
    return (
      <Image
        src={project.thumbnail}
        alt={project.title}
        width={600}
        height={1300}
        sizes="260px"
        className="mx-auto h-full w-auto object-contain rounded-2xl shadow-2xl"
      />
    );
  }

  return (
    <div className="relative w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-black/5 dark:border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      {/* The screenshot keeps its own proportions, so nothing is cropped. */}
      <Image
        src={project.thumbnail}
        alt={project.title}
        width={1600}
        height={1000}
        sizes="(min-width: 768px) 45vw, 90vw"
        className="block w-full h-auto max-h-[52vh] object-contain bg-white dark:bg-neutral-950"
      />
    </div>
  );
}

function Panel({ project, index, total, onOpen }: { project: ShowcaseProject; index: number; total: number; onOpen: () => void }) {
  const [from, to] = project.gradient.split(/,(?![^(]*\))/).map((c) => c.trim());
  const hasLive = project.live && project.live !== "#";

  return (
    <article
      data-panel
      className="relative shrink-0 w-full md:w-[74vw] lg:w-[68vw] max-w-[1100px] [transform-style:preserve-3d]"
    >
      {/* Colour aura behind the panel, taken from the project's own gradient. */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-40 dark:opacity-30"
        style={{ background: `radial-gradient(circle at 30% 40%, ${from}, transparent 60%), radial-gradient(circle at 80% 70%, ${to ?? from}, transparent 55%)` }}
      />

      <div className="relative grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-10 items-center rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl p-5 md:p-8 shadow-xl">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.title} gallery`}
          className={`relative block w-full text-left cursor-pointer ${project.isMobileApp ? "h-[360px] md:h-[440px]" : ""}`}
        >
          <DeviceFrame project={project} />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-7xl font-bold text-transparent [-webkit-text-stroke:1px_#e8390d]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">/ {String(total).padStart(2, "0")}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
              >
                <span className="text-base">{techIconMap[tech]}</span>
                {techLabel(tech)}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onOpen}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8390d] text-white text-sm font-semibold hover:brightness-110 transition"
            >
              <Maximize2 size={15} /> View details
            </button>
            {hasLive && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-current/20 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                Live <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ projects, onOpen }: ProjectShowcaseProps) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");

      // Desktop: pin the section and carry the projects sideways past the viewer, coverflow style.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const trackEl = track.current!;
        const first = panels[0];
        const last = panels[panels.length - 1];
        // Travel from the first panel's centre to the last one's, so progress i/(n-1) centres panel i exactly.
        const distance = () => last.offsetLeft + last.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2);

        const slide = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const active = Math.min(panels.length, Math.round(self.progress * (panels.length - 1)) + 1);
              if (counter.current) counter.current.textContent = String(active).padStart(2, "0");
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        panels.forEach((panel) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            })
            .fromTo(
              panel,
              { rotateY: -38, z: -320, opacity: 0.35, transformPerspective: 1600 },
              { rotateY: 0, z: 0, opacity: 1, ease: "power2.out" }
            )
            .to(panel, { rotateY: 38, z: -320, opacity: 0.35, ease: "power2.in" });
        });

        // Settle on the nearest project once scrolling stops. ScrollTrigger's own snap scrolls natively,
        // which Lenis overrides, so the glide goes through Lenis instead.
        const settle = () => {
          const st = slide.scrollTrigger;
          if (!st || !st.isActive || panels.length < 2) return;
          const step = 1 / (panels.length - 1);
          const target = st.start + Math.round(st.progress / step) * step * (st.end - st.start);
          if (Math.abs(target - window.scrollY) > 2) smoothScrollTo(target, 0.7);
        };
        ScrollTrigger.addEventListener("scrollEnd", settle);

        // Triggers for later sections may already exist; re-order them so they account for the pin's scroll length.
        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
      });

      // Mobile: a vertical stack where each panel rises out of a tilted plane.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { rotateX: 28, y: 120, scale: 0.9, opacity: 0, transformPerspective: 1200, transformOrigin: "50% 0%" },
            {
              rotateX: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 95%", end: "top 60%", scrub: 1 },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    // ScrollTrigger drops pin spacing when the pinned element's parent is a flex container, so the pin gets a block parent.
    <div className="w-full">
    <div ref={section} className="relative w-full md:h-screen md:overflow-hidden flex flex-col justify-center">
      <div className="hidden md:flex absolute top-24 left-1/2 -translate-x-1/2 items-center gap-4 text-sm z-10">
        <span ref={counter} className="font-bold text-[#e8390d] tabular-nums">01</span>
        <div className="w-40 h-[2px] bg-current/15 overflow-hidden rounded-full">
          <div ref={bar} className="h-full bg-[#e8390d] origin-left" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="text-muted-foreground tabular-nums">{String(projects.length).padStart(2, "0")}</span>
      </div>

      <div
        ref={track}
        className="flex flex-col md:flex-row md:flex-nowrap items-center gap-16 md:gap-[8vw] px-4 md:px-[calc((100vw-min(74vw,1100px))/2)] lg:px-[calc((100vw-min(68vw,1100px))/2)] md:pt-16 will-change-transform"
      >
        {projects.map((project, index) => (
          <Panel key={project.title} project={project} index={index} total={projects.length} onOpen={() => onOpen(project)} />
        ))}
      </div>
    </div>
    </div>
  );
}
