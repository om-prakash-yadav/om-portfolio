"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { jetbrainsMono } from "@/app/font";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import { techIconMap } from "./navPages/Projects";

interface ProjectModalProps {
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  techStack: string[];
  gradient: string;
  github: string;
  live: string;
  onClose: () => void;
}

export default function ProjectModal({
  title,
  description,
  thumbnail,
  images,
  techStack,
  gradient,
  github,
  live,
  onClose,
}: ProjectModalProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const displayImages = images && images.length > 0 ? images : [thumbnail];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const lightShadow = {
    boxShadow: `
      rgba(0, 0, 0, 0.5) 0px 20px 30px,
      rgba(0, 0, 0, 0.4) 0px 12px 18px
    `,
  };

  const darkShadow = {
    boxShadow: `
      rgba(255, 255, 255, 0.2) 0px 4px 12px,
      rgba(255, 255, 255, 0.1) 0px 8px 24px
    `,
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center px-5 sm:px-4 py-8"
      onClick={onClose}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={false}
        className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-y-auto overflow-x-hidden group transition-all duration-300 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
        style={{
          ...(isDarkMode ? lightShadow : darkShadow),
          background: `radial-gradient(circle at 50% 0%, ${gradient})`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full z-50"
        >
          <X size={18} />
        </button>

        {/* Text + Tech + Links */}
        <div className="relative z-10 flex flex-col gap-3 text-white p-4 sm:p-5">
          <h2 className={`${jetbrainsMono.className} text-lg sm:text-xl md:text-2xl font-bold`}>
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{description}</p>

          {/* Image Carousel */}
          <div className="relative w-full min-h-[180px] sm:min-h-[320px] flex justify-center rounded-xl group/carousel">
            <img
              src={displayImages[currentImageIndex]}
              alt={`${title} screenshot ${currentImageIndex + 1}`}
              className="rounded-xl w-full h-full object-contain max-h-[320px]"
            />
            
            {/* Carousel Controls - Only show if multiple images */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Row - Show all images in one row */}
          {displayImages.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all border-2 ${
                    index === currentImageIndex
                      ? "border-white scale-105"
                      : "border-white/30 hover:border-white/60"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-14 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Links & Tech Stack */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-2 gap-3">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-black font-semibold px-3 py-1.5 text-sm rounded-3xl hover:opacity-80 transition"
              >
                <ExternalLink size={16} /> Live Preview
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-black font-semibold px-3 py-1.5 text-sm rounded-3xl hover:opacity-80 transition"
              >
                <FiGithub size={16} /> GitHub
              </a>
            </div>

            <div className="flex justify-center md:justify-end transition-all duration-500">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center text-[20px] sm:text-[22px] shadow-md transition-all duration-500`}
                  style={{ zIndex: techStack.length - index }}
                >
                  {techIconMap[tech] || null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}
