"use client";

import dynamic from "next/dynamic";

// three.js is client-only and heavy, so it loads after the page instead of blocking it.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function BackgroundScene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Scene3D />
    </div>
  );
}
