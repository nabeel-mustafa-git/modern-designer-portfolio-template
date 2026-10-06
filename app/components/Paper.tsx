"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

export default function Paper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { "--reveal": 0 },
        {
          "--reveal": 1,
          duration: 1.1,
          ease: "power3.inOut",
          onComplete: () => el.removeAttribute("data-intro"),
        },
      );
    });
  });

  return (
    <div
      ref={ref}
      data-intro="pending"
      className="paper relative mx-[clamp(10px,4.72vw,68px)] mb-[46px] mt-[clamp(10px,3.2vw,46px)]"
    >
      {children}
    </div>
  );
}
