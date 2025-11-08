"use client";
import { Mail, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { jetbrainsMono } from "@/app/font";

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:omprakashnitdgp@gmail.com";
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/om-prakash-yadav", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/om-prakash-yadav", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/itsme_omprakash", label: "Twitter" },
  ];

  return (
    <div id="contact" className={`${jetbrainsMono.className} w-full min-h-screen flex items-center justify-center px-6 py-24 text-foreground`}>
      <div className="mx-auto text-center max-w-4xl w-full">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-16">
          <button
            onClick={handleEmailClick}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background hover:scale-105 transition-all text-lg font-medium shadow-lg hover:shadow-xl"
          >
            <Mail size={24} className="group-hover:rotate-12 transition-transform" />
            Get in Touch
          </button>
          <p className="text-muted-foreground mt-4 text-sm">omprakashnitdgp@gmail.com</p>
        </div>

        {/* Social Links */}
        <div className="mb-12">
          <p className="text-muted-foreground mb-6 text-sm uppercase tracking-wider">Or connect with me on</p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full border border-border hover:border-foreground transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <MapPin size={16} />
          <span>Based in India</span>
        </div>
      </div>
    </div>
  );
}
