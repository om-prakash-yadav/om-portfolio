import { Heart, Shield } from "lucide-react";
import React, { JSX, useState } from "react";
import ProjectCard from "../ProjectCard";
import ProjectModal from "../ProjectModal"; // ⬅️ You must have this file
import { jetbrainsMono } from "@/app/font";

import { FaReact, FaAngular } from "react-icons/fa";
import { SiTypescript, SiRedux, SiFlutter, SiDart, SiBootstrap, SiSitecore } from "react-icons/si";
import { TbApi } from "react-icons/tb";

export const techIconMap: Record<string, JSX.Element> = {
  react: <FaReact className="text-cyan-300" />,
  angular: <FaAngular className="text-red-600" />,
  redux: <SiRedux className="text-purple-500" />,
  ts: <SiTypescript className="text-blue-500" />,
  api: <TbApi className="text-blue-400" />,
  jwt: <Shield className="text-green-500" />,
  flutter: <SiFlutter className="text-blue-400" />,
  dart: <SiDart className="text-blue-500" />,
  bootstrap: <SiBootstrap className="text-purple-600" />,
  sitecore: <SiSitecore className="text-red-500" />,
};

const projects = [
  {
    title: "Liquid Glass Nav",
    description: "A highly customizable Flutter package for creating stunning glassmorphism bottom navigation bars with 160+ downloads on pub.dev. Features smooth animations, haptic feedback, badge support, and multiple animation types.",
    thumbnail: "https://raw.githubusercontent.com/om-prakash-yadav/liquid-glass-navigation/main/screenshots/badges.png",
    images: [
      "https://raw.githubusercontent.com/om-prakash-yadav/liquid-glass-navigation/main/screenshots/gradient.png",
      "https://raw.githubusercontent.com/om-prakash-yadav/liquid-glass-navigation/main/screenshots/badges.png",
      "https://raw.githubusercontent.com/om-prakash-yadav/liquid-glass-navigation/main/screenshots/minimal.png",
    ],
    techStack: ["flutter", "dart"],
    gradient: "#a78bfa, #7c3aed",
    github: "https://github.com/om-prakash-yadav/liquid-glass-navigation",
    live: "https://pub.dev/packages/liquid_glass_nav",
  },
  {
    title: "Passion Browser",
    description: "A modern, feature-rich web browser built with Flutter, featuring built-in ad blocking and Material Design 3 UI with dark/light themes.",
    thumbnail: "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/home%20page.jpg",
    images: [
      "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/home%20page.jpg",
      "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/light%20theme%20of%20home%20page.jpg",
      "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/App%20mode.jpg",
      "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/quick%20menu.jpg",
      "https://raw.githubusercontent.com/om-prakash-yadav/passion-browser/main/.github/assets/settings.jpg",
    ],
    techStack: ["flutter", "dart"],
    gradient: "#86efac, #10b981",
    github: "https://github.com/om-prakash-yadav/passion-browser",
    live: "https://github.com/om-prakash-yadav/passion-browser/releases/tag/1.0.0",
  },
  {
    title: "Homekich - Home-Cooked Food Delivery",
    description: "Home-cooked meals, nostalgic snacks, and handmade bites—fresh from local kitchens to you. Flutter-based mobile application connecting home chefs with food lovers. Currently in development and launching soon in the US. Features intuitive UI, real-time order tracking, and seamless payment integration.",
    thumbnail: "/homekich/1.png",
    isMobileApp: true,
    images: [
      "/homekich/1.png",
      "/homekich/2.png",
      "/homekich/3.png",
      "/homekich/4.png",
      "/homekich/5.png",
      "/homekich/6.png",
    ],
    techStack: ["flutter", "dart", "api"],
    gradient: "#60a5fa, #3b82f6",
    github: "https://github.com/om-prakash-yadav",
    live: "https://www.homekich.com/",
  },
  {
    title: "Wikolo - Social Media Platform",
    description: "Production-ready Flutter application delivering seamless social media experience across iOS and Android. Architected and developed high-performance mobile app with real-time features, state management using Provider/Bloc, and RESTful API integration. Implemented responsive UI/UX with custom animations, infinite scroll feeds, and optimized image loading. Built scalable architecture with clean code principles, achieving smooth 60fps performance and <2s app launch time.",
    thumbnail: "/wikolo/No-1.png",
    isMobileApp: true,
    images: [
      "/wikolo/No-1.png",
      "/wikolo/No-2.png",
      "/wikolo/No-3.png",
      "/wikolo/No-4.png",
      "/wikolo/No-6.png",
      "/wikolo/15.png",
    ],
    techStack: ["flutter", "dart", "api"],
    gradient: "#f59e0b, #ef4444",
    github: "https://github.com/om-prakash-yadav",
    live: "https://wikolo.com/",
  },
  {
    title: "Henry Schein Global E-commerce Platform (GEP)",
    description: "Deloitte USI project: Worked on pricing, promotions, and order flow for Henry Schein's Global E-commerce Platform using Angular, Bootstrap, and Sitecore. Built reusable components as per design system in Figma. Supported 1M+ global customers across 300+ clinical solutions. Received two awards for exceptional delivery.",
    thumbnail: "/henry-schein.png",
    techStack: ["angular", "bootstrap", "sitecore"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "https://github.com/om-prakash-yadav",
    live: "#",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div id="projects" className={`  ${jetbrainsMono.className} flex flex-col gap-10 items-center justify-center px-4 pb-20 w-full max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex gap-2 text-[#e8390d]">
          Made with <Heart />
        </p>
        <h1 className="text-4xl md:text-6xl text-center font-bold">
          My Projects
        </h1>
      </div>

      {/* Cards */}
      <div className={`${jetbrainsMono.className} flex flex-col gap-6 w-full `}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
