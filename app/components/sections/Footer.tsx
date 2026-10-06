"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { contactEmail, socials } from "../../data/site";
import { ArrowUpRight } from "../ui/icons";

// Not in the design screenshot: a minimal contact strip so the nav's Contact link has a target.
export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".f-item", {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer id="contact" ref={root} className="px-4 pb-[40px]">
      <div className="mx-auto flex max-w-[1174px] flex-col gap-[32px] border-t-[1.5px] border-ink pt-[36px] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="f-item font-hand text-[25px] leading-[24px]">say hi!</p>
          <a
            href={`mailto:${contactEmail}`}
            className="f-item group mt-[14px] inline-flex items-center gap-[12px] text-[clamp(26px,5.4vw,49px)] leading-[1.18] font-semibold tracking-[-0.022em]"
          >
            {contactEmail}
            <span className="grid size-[0.72em] place-items-center bg-cobalt text-white transition-[rotate] duration-300 group-hover:rotate-45">
              <ArrowUpRight width="52%" height="52%" />
            </span>
          </a>
        </div>

        <div className="f-item flex flex-wrap items-center gap-x-[22px] gap-y-[10px] font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          {socials.map((social) => (
            <a key={social.id} href={social.href} className="underline-offset-4 hover:underline">
              {social.label}
            </a>
          ))}
          <span className="text-ink/55">© 2026 Robin</span>
        </div>
      </div>
    </footer>
  );
}
