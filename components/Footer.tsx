"use client";
import { jetbrainsMono } from "@/app/font";

export default function Footer() {
  return (
    <footer
      className={`${jetbrainsMono.className} w-full text-muted-foreground border-t border-border py-6 px-4 mb-22 md:mb-0 flex items-center justify-center text-sm`}
    >
      <p className="text-center">
        © {new Date().getFullYear()} Om Prakash Yadav. All rights reserved.
      </p>
    </footer>
  );
}
