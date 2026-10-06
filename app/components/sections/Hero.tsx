"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  gsap,
  Draggable,
  ScrollTrigger,
  useGSAP,
  FINE_POINTER,
  MOTION_OK,
} from "../../lib/gsap";
import { images } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import { ArrowUpRight, FlowerIcon, TargetIcon } from "../ui/icons";

const pill =
  "h-sticker flex h-[27px] cursor-grab items-center rounded-full border-2 border-white/85 px-[13px] font-mono text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap shadow-[0_1px_4px_rgb(0_0_0/0.22)] active:cursor-grabbing";

const note =
  "h-sticker flex cursor-grab items-center justify-center font-hand text-[21px] leading-none whitespace-nowrap shadow-[1px_2px_4px_rgb(0_0_0/0.18)] active:cursor-grabbing";

function Avatar() {
  return (
    <div className="h-avatar relative size-[66px] overflow-hidden rounded-full border-[3px] border-tangerine bg-[#aebbc4] shadow-[0_0_0_1px_rgb(29_27_26/0.3)]">
      <Image
        src={images.portrait}
        alt=""
        fill
        sizes="66px"
        className="object-cover object-[50%_42%]"
      />
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // --- Load sequence ---
        const tl = gsap.timeline({ delay: 0.55, defaults: { ease: "power3.out" } });
        tl.from(".h-myname", { autoAlpha: 0, y: 10, duration: 0.4 })
          .from(".h-squiggle path", { drawSVG: "0%", duration: 0.3, stagger: 0.1 }, "-=0.15")
          .from(".h-box path", { drawSVG: "0%", duration: 0.85, ease: "power2.inOut" }, "-=0.25")
          .from(
            ".h-letter",
            { yPercent: -70, autoAlpha: 0, duration: 0.36, ease: "steps(4)", stagger: 0.08 },
            "-=0.4",
          )
          .from(
            ".h-sticker",
            {
              scale: 0,
              rotation: () => gsap.utils.random(-35, 35),
              autoAlpha: 0,
              duration: 0.55,
              ease: "back.out(2.4)",
              stagger: 0.09,
            },
            "-=0.1",
          )
          .from(".h-arrow path", { drawSVG: "0%", duration: 0.25, stagger: 0.07 }, "-=0.3")
          .from(".h-status", { autoAlpha: 0, y: 8, duration: 0.4 }, "-=0.45")
          .from(
            ".h-line > span",
            { yPercent: 118, duration: 0.9, ease: "power4.out", stagger: 0.12 },
            "-=0.35",
          )
          .from(
            ".h-icon",
            { scale: 0, rotation: -180, duration: 0.7, ease: "back.out(2)", stagger: 0.12 },
            "-=0.55",
          )
          .from(
            ".h-avatar",
            { scale: 0, duration: 0.6, ease: "back.out(2.2)", stagger: 0.12 },
            "-=0.75",
          )
          .from(".h-cta", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.5");

        // --- Hand-drawn "boil" on the orange box ---
        const turbulence = root.current!.querySelector("feTurbulence")!;
        let seed = 1;
        const boil = gsap.to({}, {
          duration: 0.16,
          repeat: -1,
          onRepeat: () => {
            seed = (seed % 5) + 1;
            turbulence.setAttribute("seed", String(seed));
          },
        });

        // --- Flower spins forever, faster while scrolling ---
        const spin = gsap.to(".h-flower svg", {
          rotation: 360,
          duration: 9,
          ease: "none",
          repeat: -1,
        });

        // --- Parallax: stickers drift with the mouse and scatter on scroll ---
        const floats = gsap.utils.toArray<HTMLElement>(".h-float").map((el) => ({
          depth: Number(el.dataset.depth),
          drift: Number(el.dataset.dx),
          x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
        }));
        const pointer = { x: 0, y: 0 };
        let progress = 0;
        const place = () =>
          floats.forEach((f) => {
            f.x(pointer.x * f.depth * 16 + progress * f.drift);
            f.y(pointer.y * f.depth * 16 - progress * f.depth * 170);
          });

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          onToggle: (self) => {
            boil.paused(!self.isActive);
            spin.paused(!self.isActive);
          },
          onUpdate: (self) => {
            progress = self.progress;
            place();
            gsap.to(spin, {
              timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 250, 9),
              duration: 0.2,
              overwrite: true,
              onComplete: () => gsap.to(spin, { timeScale: 1, duration: 1.2 }),
            });
          },
        });

        const onMove = (e: MouseEvent) => {
          pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
          pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
          if (st.isActive || st.progress === 0) place();
        };
        const fine = window.matchMedia(FINE_POINTER).matches;
        if (fine) window.addEventListener("mousemove", onMove);

        // --- Arc divider draws in as you leave the hero ---
        gsap.fromTo(
          ".h-arc path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: ".h-arc", start: "top 96%", end: "top 55%", scrub: true },
          },
        );

        return () => window.removeEventListener("mousemove", onMove);
      });

      // --- Stickers can be picked up; they spring back when dropped ---
      const drags = Draggable.create(".h-sticker", {
        type: "x,y",
        zIndexBoost: false,
        onPress() {
          gsap.to(this.target, {
            scale: 1.1,
            rotation: gsap.utils.random(-8, 8),
            duration: 0.2,
            overwrite: "auto",
          });
        },
        onRelease() {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.45)",
          });
        },
      });

      return () => drags.forEach((d) => d.kill());
    },
    { scope: root },
  );

  return (
    <section id="home" ref={root} className="relative pt-[136px] md:pt-[157px]">
      <div
        className="h-float absolute left-[max(16px,calc(50%-496px))] top-[377px] hidden lg:block"
        data-depth="1.3"
        data-dx="-60"
      >
        <Avatar />
      </div>
      <div
        className="h-float absolute right-[max(16px,calc(50%-496px))] top-[411px] hidden lg:block"
        data-depth="0.8"
        data-dx="60"
      >
        <Avatar />
      </div>

      {/* Name stage: everything here is positioned relative to the orange box */}
      <div className="relative mx-auto aspect-[348/167] w-[min(348px,76vw)] [container-type:inline-size]">
        <p className="h-myname absolute left-1/2 top-[-86px] -translate-x-1/2 font-hand text-[25px] leading-[24px] whitespace-nowrap md:top-[-55px]">
          my name is
          <svg
            className="h-squiggle absolute left-[18px] top-[21px] overflow-visible"
            width="44"
            height="12"
            viewBox="0 0 44 12"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M2 4C8 1 12 7 18 4s10-3 16 0" />
            <path d="M10 9.5c6-2 12 2 20-1" />
          </svg>
        </p>

        <svg
          className="h-box absolute inset-0 size-full overflow-visible"
          viewBox="0 0 348 167"
          fill="none"
          aria-hidden
        >
          <defs>
            <filter id="boil" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="1" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path
            filter="url(#boil)"
            d="M14 8C90 4 258 3 334 6c7 .5 10.5 4 10.6 11 1.4 45 .9 91-.6 133-.2 7-4 10.5-11 11-83 3-235 3-318 .5-7-.3-10.5-3.5-10.8-10.5C2.6 106 3 60 4.6 18 4.9 11 8 8.2 16 7.6"
            stroke="var(--color-tangerine)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <h1
          aria-label="Robin"
          className="flex size-full items-center justify-center font-pixel text-[42.2cqw] leading-none font-extrabold"
        >
          {"ROBIN".split("").map((letter, i) => (
            <span key={i} aria-hidden className="h-letter inline-block">
              {letter}
            </span>
          ))}
        </h1>

        <div
          className="h-float absolute left-[-10px] top-[-44px] md:left-[-135px] md:top-[-35px]"
          data-depth="1"
          data-dx="-110"
        >
          <span className={`${pill} bg-mint`}>Made things</span>
        </div>
        <div
          className="h-float absolute right-[-10px] top-[-44px] md:right-auto md:left-[346px] md:top-[-35px]"
          data-depth="1.4"
          data-dx="110"
        >
          <span className={`${pill} bg-butter`}>Sweat the details</span>
        </div>

        <div
          className="h-float absolute left-[-6px] top-[calc(100%+10px)] md:left-[-144px] md:top-[166px]"
          data-depth="0.6"
          data-dx="-150"
        >
          <span className={`${note} h-[39px] w-[127px] -rotate-1 bg-sun`}>Product Designer</span>
        </div>
        <div
          className="h-float absolute right-[-6px] top-[calc(100%+10px)] md:right-auto md:left-[384px] md:top-[167px]"
          data-depth="0.9"
          data-dx="150"
        >
          <span className={`${note} h-[36px] w-[89px] rotate-1 bg-mint`}>Chicago, IL</span>
        </div>

        <svg
          className="h-arrow absolute left-[-16px] top-[152px] hidden overflow-visible md:block"
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2 20C8 18 15 12 21 3" />
          <path d="M13 3.5l8.5-1L20 11" />
        </svg>
        <svg
          className="h-arrow absolute left-[364px] top-[148px] hidden overflow-visible md:block"
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M24 20C18 17 10 11 4 3" />
          <path d="M3.5 11L3 2.5l8.5 1.5" />
        </svg>
      </div>

      <p className="h-status mt-[70px] flex items-center justify-center gap-[9px] px-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.3em] md:mt-[20px]">
        <span className="relative flex size-[7px] shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-cobalt opacity-70 motion-reduce:hidden" />
          <span className="relative size-[7px] rounded-full bg-cobalt" />
        </span>
        Open to new work and good problems
      </p>

      <h2 className="mt-[42px] px-4 text-center text-[clamp(28px,7.4vw,49px)] leading-[1.18] font-semibold tracking-[-0.022em]">
        <span className="h-line -my-[0.08em] block overflow-hidden py-[0.08em]">
          <span className="inline-block">
            I design software that
            <span className="h-icon ml-[0.2em] inline-block size-[0.82em] align-[-0.1em]">
              <TargetIcon className="size-full" />
            </span>
          </span>
        </span>
        <span className="h-line -my-[0.08em] block overflow-hidden py-[0.08em]">
          <span className="inline-block">
            gets out of your way.
            <span className="h-icon h-flower ml-[0.2em] inline-block size-[0.82em] align-[-0.1em]">
              <FlowerIcon className="size-full" />
            </span>
          </span>
        </span>
      </h2>

      <div className="mt-[26px] flex justify-center">
        <Magnetic>
          <a
            href="#contact"
            className="h-cta group flex h-[50px] items-center gap-[11px] bg-ink pl-[9px] pr-[20px] font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white"
          >
            <span className="relative grid size-[29px] place-items-center overflow-hidden bg-cobalt">
              <ArrowUpRight className="transition-[translate] duration-300 ease-out group-hover:translate-x-[26px] group-hover:-translate-y-[26px]" />
              <ArrowUpRight className="absolute -translate-x-[26px] translate-y-[26px] transition-[translate] duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
            </span>
            Contact me
          </a>
        </Magnetic>
      </div>

      <svg
        className="h-arc mt-[72px] block h-[51px] w-full"
        viewBox="0 0 1304 51"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 50Q620-22 1280 28"
          pathLength={1}
          strokeDasharray={1}
          stroke="#bdbbb4"
          strokeWidth="1"
        />
      </svg>
    </section>
  );
}
