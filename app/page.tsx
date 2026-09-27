'use client';
import {Home} from "@/components/navPages/Home"
import { Projects } from '@/components/navPages/Projects';
import Contact from '@/components/navPages/Contact';
import SkillsSection from "@/components/navPages/Skills";
import Experience from "@/components/navPages/Experience";
import Footer from "@/components/Footer";
import ScrollChoreography from "@/components/ScrollChoreography";


export default function HomePage() {
  return (
    <main className="relative z-[1] flex flex-col items-center justify-center overflow-x-clip">
      <ScrollChoreography/>
      <Home/>
      <Experience/>
      <Projects/>
      <SkillsSection/>
      <Contact/>
      <Footer/>
    </main>
  );
}
