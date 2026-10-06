"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  useGSAP,
  FINE_POINTER,
} from "../../lib/gsap";
import { projects, type Project } from "../../data/site";
import { ArrowUpRight, SparkIcon } from "../ui/icons";

const themes: Record<
  Project["theme"],
  { surface: string; muted: string; frame: string; tape: string }
> = {
  cobalt: {
    surface: "bg-cobalt text-white",
    muted: "text-white/80",
    frame: "border-white",
    tape: "bg-white/55",
  },
  coal: {
    surface: "bg-coal text-white",
    muted: "text-white/75",
    frame: "border-white",
    tape: "bg-[#a9a9a9]/75",
  },
  sun: {
    surface: "bg-sun text-ink",
    muted: "text-ink/80",
    frame: "border-ink",
    tape: "bg-[#fbeec4]/90",
  },
};

// Folder tabs step to the right, one per card (desktop offsets from the design)
const tabs = [
  { x: 0, width: 245, clip: "polygon(0 0, calc(100% - 58px) 0, 100% 100%, 0 100%)", pad: "pl-[33px]" },
  { x: 187, width: 310, clip: "polygon(58px 0, calc(100% - 58px) 0, 100% 100%, 0 100%)", pad: "pl-[91px]" },
  { x: 439, width: 300, clip: "polygon(58px 0, calc(100% - 58px) 0, 100% 100%, 0 100%)", pad: "pl-[91px]" },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".p-card");
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };

          // Content reveal for one card: title letters pop, image unmasks, tape sticks
          const reveals = reduce
            ? []
            : cards.map((card) => {
                const split = SplitText.create(card.querySelector(".p-title"), { type: "chars" });
                return gsap
                  .timeline({ paused: true, defaults: { ease: "power3.out" } })
                  .from(card.querySelector(".p-meta"), { autoAlpha: 0, y: 12, duration: 0.4 })
                  .from(
                    split.chars,
                    { yPercent: 70, autoAlpha: 0, duration: 0.6, ease: "back.out(1.8)", stagger: 0.035 },
                    0.05,
                  )
                  .from(
                    card.querySelectorAll(".p-fade"),
                    { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.08 },
                    0.3,
                  )
                  .fromTo(
                    card.querySelector(".p-frame"),
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" },
                    0.05,
                  )
                  .from(card.querySelector(".p-img"), { scale: 1.3, duration: 1.2 }, 0.05)
                  .from(
                    card.querySelectorAll(".p-tape"),
                    { scale: 0, autoAlpha: 0, duration: 0.35, ease: "back.out(3)", stagger: 0.08 },
                    0.7,
                  );
              });

          if (!desktop) {
            cards.forEach((card, i) =>
              ScrollTrigger.create({
                trigger: card,
                start: "top 78%",
                once: true,
                onEnter: () => reveals[i]?.play(),
              }),
            );
            return;
          }

          // Desktop: the stack pins and each folder slides up over the last one
          const pinTop = () =>
            Math.max(64, (window.innerHeight - stack.current!.offsetHeight) / 2 + 22);
          const offscreen = () => window.innerHeight - pinTop() + 40;
          const rest = cards.slice(1);

          ScrollTrigger.create({
            trigger: stack.current,
            start: "top 78%",
            once: true,
            onEnter: () => reveals[0]?.play(),
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stack.current,
              start: () => `top ${pinTop()}px`,
              end: () => `+=${rest.length * window.innerHeight * 0.85}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          rest.forEach((card, i) => {
            tl.fromTo(
              card,
              { y: offscreen, rotation: 1.6 },
              { y: 0, rotation: 0, ease: "none", duration: 1 },
              i,
            )
              .to(cards[i].querySelector(".p-shade"), { opacity: 0.5, ease: "none", duration: 1 }, i)
              .to(cards[i].querySelector(".p-content"), { y: -28, ease: "none", duration: 1 }, i)
              .set(cards[i].querySelector(".p-body"), { autoAlpha: 0 }, i + 1)
              .call(() => reveals[i + 1]?.play(), undefined, i + 0.4);
          });
          tl.to({}, { duration: 0.2 });
        },
      );

      // "View" sticker follows the pointer over project images
      mm.add(FINE_POINTER, () => {
        const el = cursor.current!;
        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
        const hovers = gsap.utils.toArray<HTMLElement>(".p-hover");

        const move = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const enter = () =>
          gsap.to(el, { scale: 1, rotation: -8, duration: 0.4, ease: "back.out(2.2)", overwrite: "auto" });
        const leave = () =>
          gsap.to(el, { scale: 0, rotation: 20, duration: 0.25, ease: "power2.in", overwrite: "auto" });

        window.addEventListener("mousemove", move);
        hovers.forEach((h) => {
          h.addEventListener("mouseenter", enter);
          h.addEventListener("mouseleave", leave);
        });
        return () => {
          window.removeEventListener("mousemove", move);
          hovers.forEach((h) => {
            h.removeEventListener("mouseenter", enter);
            h.removeEventListener("mouseleave", leave);
          });
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative px-4 pb-[120px]">
      <h2 className="sr-only">Case studies</h2>

      <div ref={stack} className="relative mx-auto max-w-[1174px]">
        {projects.map((project, i) => {
          const theme = themes[project.theme];
          const tab = tabs[i % tabs.length];
          return (
            <article
              key={project.title}
              className={`p-card ${i > 0 ? "mt-[36px] lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div
                className={`relative -mb-px flex h-[59px] max-w-full items-center gap-[12px] font-mono text-[11px] font-bold uppercase tracking-[0.3em] lg:ml-[var(--tab-x)] ${theme.surface} ${i === 0 ? tab.pad : "pl-[33px] lg:pl-[91px]"}`}
                style={
                  {
                    "--tab-x": `${tab.x}px`,
                    width: tab.width,
                    clipPath: tab.clip,
                  } as React.CSSProperties
                }
              >
                <SparkIcon width={8} height={8} />
                Project {String(i + 1).padStart(2, "0")}
              </div>

              <div className={`p-body relative overflow-hidden ${theme.surface}`}>
                <div className="p-content flex flex-col gap-[36px] p-[24px] sm:p-[46px] lg:h-[500px] lg:flex-row lg:justify-between lg:gap-[40px]">
                  <div className="lg:pt-[1px]">
                    <p className="p-meta flex items-center gap-[9px] font-mono text-[10px] leading-[14px] font-bold uppercase tracking-[0.3em]">
                      <span className="size-[7px] rounded-full bg-current" />
                      {project.date}
                    </p>
                    <h3 className="p-title mt-[19px] text-[44px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[58px]">
                      {project.title}
                    </h3>
                    <p className={`p-fade mt-[15px] max-w-[410px] text-[14.5px] leading-[1.65] ${theme.muted}`}>
                      {project.summary}
                    </p>
                    <a
                      href={project.href}
                      className="p-fade group mt-[27px] inline-flex items-center gap-[10px] border-b-[1.5px] border-current pb-[5px] font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
                    >
                      View project
                      <ArrowUpRight
                        width={9}
                        height={9}
                        className="transition-[translate] duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                      />
                    </a>
                  </div>

                  <a
                    href={project.href}
                    aria-label={`View project: ${project.title}`}
                    className="p-hover relative block aspect-[4/3] w-full shrink-0 lg:h-[408px] lg:w-[544px]"
                  >
                    <div className={`p-frame absolute inset-0 overflow-hidden border-2 ${theme.frame}`}>
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 544px, 90vw"
                        className="p-img object-cover"
                      />
                    </div>
                    <span className={`p-tape absolute -left-[20px] -top-[13px] h-[22px] w-[82px] -rotate-[4deg] ${theme.tape}`} />
                    <span className={`p-tape absolute -right-[20px] -top-[13px] h-[22px] w-[82px] rotate-[5deg] ${theme.tape}`} />
                  </a>
                </div>
                <div className="p-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
              </div>
            </article>
          );
        })}
      </div>

      <div
        ref={cursor}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] grid size-[84px] scale-0 place-items-center rounded-full border-2 border-ink bg-sun font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink shadow-[2px_3px_0_var(--color-ink)]"
      >
        View
      </div>
    </section>
  );
}
