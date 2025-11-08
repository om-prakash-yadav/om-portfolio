import Image from "next/image";
import React, { useEffect, useState } from "react";
import { techIconMap } from "./navPages/Projects";

interface ProjectCardProps {
    title: string;
    description: string;
    thumbnail: string;
    techStack: string[];
    gradient: string;
    onClick?: () => void;
}

export default function ProjectCard({
    title,
    description,
    thumbnail,
    techStack,
    gradient,
    onClick,
}: ProjectCardProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);

    const lightShadow = {
        boxShadow: `
      rgba(0, 0, 0, 0.5) 0px 15px 25px,
      rgba(0, 0, 0, 0.35) 0px 10px 15px,
      rgba(0, 0, 0, 0.25) 0px 4px 6px
    `,
    };

    const darkShadow = {
        boxShadow: `
      rgba(200, 200, 200, 0.2) 2px 2px 6px,
      rgba(160, 160, 160, 0.15) 0px 6px 10px
    `,
    };

    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer border-[10px] dark:border-slate-900 rounded-xl overflow-hidden group transition-all duration-300 min-h-[350px] md:h-[320px]"
            style={{
                ...(isDarkMode ? lightShadow : darkShadow),
                background: `radial-gradient(circle at 50% 0%, ${gradient})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

            {/* Main content - Row layout */}
            <div className="relative z-10 h-full flex flex-col md:flex-row items-stretch p-6 gap-6">
                {/* Left side - Text content */}
                <div className="flex-1 flex flex-col justify-between text-white">
                    <div className="flex-grow">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed"
                           dangerouslySetInnerHTML={{
                               __html: description.replace(/160\+/g, '<span class="font-bold text-yellow-300">160+</span>')
                           }}
                        />
                    </div>

                    {/* Tech stack at bottom */}
                    <div className="flex gap-2 mt-6 flex-wrap">
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center text-[20px] md:text-[24px] shadow-lg transition-transform duration-300 hover:scale-110 relative group/tech"
                                title={tech.charAt(0).toUpperCase() + tech.slice(1)}
                            >
                                {techIconMap[tech] || null}
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    {tech === 'ts' ? 'TypeScript' : 
                                     tech === 'api' ? 'API' : 
                                     tech === 'jwt' ? 'JWT' : 
                                     tech.charAt(0).toUpperCase() + tech.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="hidden md:flex md:w-[45%] items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={thumbnail}
                            alt={title}
                            width={400}
                            height={300}
                            className="object-contain w-full h-full max-h-[260px] rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
