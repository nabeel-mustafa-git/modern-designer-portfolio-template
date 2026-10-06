"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap";
import { navLinks, socials } from "../data/site";
import Magnetic from "./ui/Magnetic";
import {
  DiamondIcon,
  DribbbleIcon,
  GridIcon,
  HeartIcon,
  InstagramIcon,
  LinkedInIcon,
  Smiley,
  StarIcon,
  UserIcon,
} from "./ui/icons";

const linkIcons = {
  star: StarIcon,
  user: UserIcon,
  grid: GridIcon,
  diamond: DiamondIcon,
};

const socialIcons = {
  linkedin: LinkedInIcon,
  dribbble: DribbbleIcon,
  instagram: InstagramIcon,
};

const chipTones = {
  sun: "bg-sun [--chip:var(--color-sun)]",
  rose: "bg-rose [--chip:var(--color-rose)]",
  leaf: "bg-leaf [--chip:var(--color-leaf)]",
};

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLAnchorElement>("[data-nav]");
      let active = "home";

      const movePill = (animate: boolean) => {
        const link = links.find((l) => l.dataset.nav === active);
        if (!link) return;
        gsap.to(pill.current, {
          x: link.offsetLeft,
          width: link.offsetWidth,
          duration: animate ? 0.55 : 0,
          ease: "power3.inOut",
          overwrite: true,
        });
      };

      const setActive = (id: string) => {
        if (id === active) return;
        active = id;
        links.forEach((l) =>
          l.dataset.nav === id
            ? l.setAttribute("aria-current", "true")
            : l.removeAttribute("aria-current"),
        );
        movePill(true);
      };

      movePill(false);
      document.fonts.ready.then(() => movePill(false));
      const onResize = () => movePill(false);
      window.addEventListener("resize", onResize);

      // Scroll-spy. Low refreshPriority so it measures after the pinned project stack.
      links.forEach((link) => {
        const section = document.getElementById(link.dataset.nav!);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setActive(link.dataset.nav!),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-nav-item]", {
          y: -18,
          autoAlpha: 0,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.05,
          delay: 0.35,
        });
      });

      return () => window.removeEventListener("resize", onResize);
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="sticky top-0 z-50 flex h-[45px] items-stretch justify-between border-b border-ink/10 bg-[#fbfaf8]"
    >
      <div className="flex items-stretch">
        <a
          href="#home"
          aria-label="Robin, back to top"
          data-nav-item
          className="flex w-[52px] items-center justify-center"
        >
          <Smiley />
        </a>

        <nav aria-label="Primary" className="relative flex items-stretch">
          <span
            ref={pill}
            aria-hidden
            className="absolute inset-y-0 left-0 w-[89px] bg-sun"
          />
          {navLinks.map((link) => {
            const Icon = linkIcons[link.icon];
            return (
              <a
                key={link.id}
                href={link.href}
                data-nav={link.id}
                data-nav-item
                aria-current={link.id === "home" ? "true" : undefined}
                className="relative flex items-center gap-[8px] px-[13px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap sm:px-[19px]"
              >
                <Icon width={11} height={11} />
                <span className="hidden md:inline">{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-[10px] pr-[11px]">
        {socials.map((social) => {
          const Icon = socialIcons[social.id];
          return (
            <a
              key={social.id}
              href={social.href}
              aria-label={social.label}
              data-nav-item
              className={`hidden size-[29px] place-items-center rounded-full border-[1.5px] border-ink transition-[rotate,scale] duration-300 hover:scale-110 hover:-rotate-12 sm:grid ${chipTones[social.tone]}`}
            >
              <Icon width={13} height={13} />
            </a>
          );
        })}
        <Magnetic className="ml-[2px]">
          <a
            href="#contact"
            data-nav-item
            className="flex h-[32px] items-center gap-[8px] border-[1.5px] border-ink bg-white px-[14px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-ink hover:text-white"
          >
            <HeartIcon width={11} height={11} />
            Contact
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
