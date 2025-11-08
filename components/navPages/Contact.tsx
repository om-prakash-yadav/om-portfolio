"use client";
import { Mail } from "lucide-react";
import { jetbrainsMono } from "@/app/font";

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:omprakashnitdgp@gmail.com";
  };

  return (
    <div id="contact" className={`${jetbrainsMono.className} w-full max-w-4xl px-6 py-16 md:py-24 text-foreground`}>
      <div className="mx-auto text-center">
        <h2 className={` text-4xl md:text-6xl font-bold mb-6`}>
          <Mail className="inline-block mr-2" /> Contact Me
        </h2>
        <p className="text-muted-foreground mb-10">Let's work together or just say hi 👋</p>
        
        <button
          onClick={handleEmailClick}
          className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background hover:opacity-80 transition-all text-lg font-medium"
        >
          <Mail size={20} />
          Send me an email
        </button>
      </div>
    </div>
  );
}
