"use client";
import { FaGitAlt, FaGithub, FaReact, FaAngular, FaSass, FaFigma, FaBootstrap, FaNodeJs } from "react-icons/fa";
import { RiCss3Fill, RiHtml5Fill, RiTailwindCssFill, RiNextjsFill, RiFlutterFill } from "react-icons/ri";
import { SiRedux, SiNodedotjs, SiTypescript, SiJavascript, SiWebpack, SiVite, SiJest, SiReacttable, SiMongodb, SiExpress, SiMongoose } from "react-icons/si";
import { TbApi, TbBrandReactNative } from "react-icons/tb";
import SkillCard from "../SkillCard";
import { jetbrainsMono } from "@/app/font";

const skillCategories = [
    {
        title: "Core Technologies",
        skills: [
            { name: "JavaScript (ES6+)", icon: <SiJavascript />, hoverColor: "group-hover:text-yellow-400" },
            { name: "TypeScript", icon: <SiTypescript />, hoverColor: "group-hover:text-sky-500" },
            { name: "HTML5", icon: <RiHtml5Fill />, hoverColor: "group-hover:text-orange-500" },
            { name: "CSS3", icon: <RiCss3Fill />, hoverColor: "group-hover:text-blue-500" },
        ]
    },
    {
        title: "Frontend Frameworks",
        skills: [
            { name: "React.js", icon: <FaReact />, hoverColor: "group-hover:text-cyan-300" },
            { name: "Angular", icon: <FaAngular />, hoverColor: "group-hover:text-red-600" },
            { name: "Next.js", icon: <RiNextjsFill />, hoverColor: "group-hover:text-black dark:group-hover:text-white" },
            { name: "Redux", icon: <SiRedux />, hoverColor: "group-hover:text-purple-500" },
        ]
    },
    {
        title: "Backend & Database",
        skills: [
            { name: "Node.js", icon: <FaNodeJs />, hoverColor: "group-hover:text-green-600" },
            { name: "Express.js", icon: <SiExpress />, hoverColor: "group-hover:text-gray-600 dark:group-hover:text-white" },
            { name: "MongoDB", icon: <SiMongodb />, hoverColor: "group-hover:text-green-500" },
            { name: "Mongoose", icon: <SiMongoose />, hoverColor: "group-hover:text-red-800" },
            { name: "REST APIs", icon: <TbApi />, hoverColor: "group-hover:text-blue-400" },
        ]
    },
    {
        title: "Mobile Development",
        skills: [
            { name: "React Native", icon: <TbBrandReactNative />, hoverColor: "group-hover:text-cyan-400" },
            { name: "Flutter", icon: <RiFlutterFill />, hoverColor: "group-hover:text-blue-400" },
        ]
    },
    {
        title: "Styling & UI",
        skills: [
            { name: "Tailwind CSS", icon: <RiTailwindCssFill />, hoverColor: "group-hover:text-cyan-400" },
            { name: "Bootstrap", icon: <FaBootstrap />, hoverColor: "group-hover:text-purple-600" },
            { name: "Sass/SCSS", icon: <FaSass />, hoverColor: "group-hover:text-pink-400" },
            { name: "Styled Components", icon: <SiReacttable />, hoverColor: "group-hover:text-pink-300" },
        ]
    },
    {
        title: "Tools & Build Systems",
        skills: [
            { name: "Git", icon: <FaGitAlt />, hoverColor: "group-hover:text-orange-600" },
            { name: "GitHub", icon: <FaGithub />, hoverColor: "group-hover:text-gray-500" },
            { name: "Webpack", icon: <SiWebpack />, hoverColor: "group-hover:text-blue-500" },
            { name: "Vite", icon: <SiVite />, hoverColor: "group-hover:text-purple-400" },
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className={` ${jetbrainsMono.className} flex flex-col gap-10 py-16 px-4`}>
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-4xl md:text-6xl text-center font-bold">
                    My Skills
                </h1>
                <p className="text-muted-foreground text-center mt-2">
                    Technologies I work with
                </p>
            </div>
            <div className="max-w-6xl mx-auto w-full space-y-12">
                {skillCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-6">
                        <h2 className="text-2xl font-semibold text-center text-[#e8390d]">
                            {category.title}
                        </h2>
                        <div className="flex flex-wrap gap-6 items-center justify-center">
                            {category.skills.map((skill, skillIndex) => (
                                <SkillCard key={skillIndex} {...skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
