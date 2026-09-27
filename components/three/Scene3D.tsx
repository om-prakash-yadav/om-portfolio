"use client";

import { type ComponentRef, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const ACCENT = "#e8390d";
// How far the camera travels into the tunnel between the top and bottom of the page.
const TRAVEL = 58;
const TUNNEL_NEAR = 8;
const TUNNEL_FAR = -70;

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function Tunnel({ count, dark }: { count: number; dark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const neutral = new THREE.Color(dark ? "#ffffff" : "#2a2a2a");
    const accent = new THREE.Color(ACCENT);

    for (let i = 0; i < count; i++) {
      // Keep a clear core down the middle so the particles frame the content instead of covering it.
      const radius = 2.6 + Math.pow(Math.random(), 0.6) * 10;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = TUNNEL_NEAR - Math.random() * (TUNNEL_NEAR - TUNNEL_FAR);

      const color = Math.random() < 0.18 ? accent : neutral;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count, dark]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={dark ? 0.85 : 0.5}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Core({ dark, reduced }: { dark: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const motion = useRef({ progress: 0, velocity: 0 });

  useFrame(({ camera, pointer, clock, size }, dt) => {
    const m = motion.current;
    const t = clock.elapsedTime;
    const previous = m.progress;

    m.progress = THREE.MathUtils.damp(m.progress, reduced ? 0 : scrollProgress(), 4, dt);
    const speed = Math.abs(m.progress - previous) / Math.max(dt, 1e-3);
    m.velocity = THREE.MathUtils.damp(m.velocity, speed, 3, dt);

    // Fly the camera down the tunnel with the page, and lean it toward the pointer.
    camera.position.z = 6 - m.progress * TRAVEL;
    if (!reduced) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 2, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.4, 2, dt);
    }
    camera.lookAt(0, 0, camera.position.z - 10);

    const g = group.current;
    if (!g) return;

    // In the hero the core sits close, as a halo behind the photo. Past it, the core drops deeper into the
    // tunnel and swings wider, so it weaves around the content instead of sitting behind the text.
    const away = THREE.MathUtils.smoothstep(m.progress, 0, 0.12);
    const widthFactor = Math.min(1, size.width / 1100);
    // On narrow screens the photo sits above the name, centred, so the hero halo moves up behind it.
    const compact = size.width < 768;
    const heroX = compact ? 0 : 2.6 * widthFactor;
    const heroY = compact ? 1.1 : 0;
    // tanh flattens the cosine, so the core lingers at the edges and crosses the middle quickly.
    const sway = Math.tanh(3 * Math.cos(m.progress * Math.PI * 3));
    g.position.set(
      THREE.MathUtils.lerp(heroX, 6 * widthFactor * sway, away),
      THREE.MathUtils.lerp(heroY, 0.35 * Math.sin(m.progress * Math.PI * 5), away) + Math.sin(t * 0.8) * 0.12,
      camera.position.z - THREE.MathUtils.lerp(7, 16, away)
    );

    // Grow in once the preloader has cleared.
    const intro = THREE.MathUtils.smoothstep(t, 1.6, 3.2);
    // It shrinks as it crosses the middle, so it never sits full-size behind a heading.
    const crossing = THREE.MathUtils.lerp(1, THREE.MathUtils.lerp(0.3, 1, Math.abs(sway)), away);
    g.scale.setScalar(intro * (compact ? 0.72 : 1.1) * crossing);

    const spin = reduced ? 0 : 1;
    g.rotation.y += dt * spin * (0.25 + m.velocity * 6);
    g.rotation.x += dt * spin * (0.1 + m.velocity * 3);
    if (shell.current) shell.current.rotation.z -= dt * spin * 0.3;
    if (ringA.current) ringA.current.rotation.z += dt * spin * (0.6 + m.velocity * 4);
    if (ringB.current) ringB.current.rotation.z -= dt * spin * (0.4 + m.velocity * 3);
    if (material.current) material.current.distort = 0.3 + Math.min(m.velocity * 4, 0.35);
  });

  const line = dark ? "#ffffff" : "#1f1f1f";

  return (
    <group ref={group} scale={0}>
      <pointLight position={[2.5, 2.5, 3]} intensity={30} color="#ffffff" />
      <pointLight position={[-2.5, -1.5, 2]} intensity={25} color={ACCENT} />

      <mesh>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          ref={material}
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={dark ? 0.35 : 0.15}
          roughness={0.15}
          metalness={0.5}
          distort={0.3}
          speed={2}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color={line} wireframe transparent opacity={dark ? 0.22 : 0.18} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.95, 0.012, 16, 160]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.75} />
      </mesh>

      <mesh ref={ringB} rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[2.35, 0.008, 16, 160]} />
        <meshBasicMaterial color={line} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motionQuery.matches);
    setCompact(window.innerWidth < 768);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 50, position: [0, 0, 6], near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <hemisphereLight args={["#ffffff", "#222222", 1]} />
      <Tunnel key={dark ? "dark" : "light"} count={compact ? 1400 : 3200} dark={dark} />
      <Core dark={dark} reduced={reduced} />
    </Canvas>
  );
}
