"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

// Lenis runs on GSAP's ticker so smooth scroll and ScrollTrigger share one clock.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Read the instance every tick: ReactLenis creates it after this effect runs.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, anchors: { offset: -45 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
