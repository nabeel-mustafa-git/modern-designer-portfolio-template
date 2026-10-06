"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { images, skillRows, type Tone } from "../../data/site";

type Token = string | { emoji: string };

// Line breaks follow the design at desktop width; below xl the copy wraps freely.
const copy: Token[][] = [
  ["I'm", "a", "product", "designer", "who", "gets", "a", "little", "too"],
  ["excited", "about", "making", "complicated", "things", "feel", "simple."],
  [{ emoji: "✨" }, "I", "care", "about", "the", "small", "details,", "the", "edge", "cases"],
  ["everyone", "forgets,", "and", "shipping", "work", "that", "genuinely"],
  ["makes", "someone's", "day", "easier.", { emoji: "🎨" }],
];

const tagTones: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  leaf: "bg-leaf text-white",
  rose: "bg-rose text-white",
  cobalt: "bg-cobalt text-[#101c4d]",
};

// Zigzag "torn" left and right edges
function torn(teeth: number, depth = 5) {
  const points: string[] = [];
  for (let i = 0; i <= teeth; i++)
    points.push(`${i % 2 ? `calc(100% - ${depth}px)` : "100%"} ${(i / teeth) * 100}%`);
  for (let i = teeth; i >= 0; i--)
    points.push(`${i % 2 ? `${depth}px` : "0px"} ${(i / teeth) * 100}%`);
  return `polygon(${points.join(", ")})`;
}

const tornEdge = torn(8);

function Polaroid({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className="a-polaroid-drift">
      <div className="a-polaroid">
        <figure className="relative w-[150px] bg-white p-[5px] pb-0 shadow-[0_2px_12px_rgb(0_0_0/0.14)] transition-[rotate,translate] duration-500 ease-out hover:-translate-y-2 hover:rotate-2 xl:w-[209px] xl:p-[7px] xl:pb-0">
          <span className="a-tape absolute -left-[16px] -top-[4px] z-10 h-[17px] w-[54px] -rotate-[38deg] bg-[#8d9de8]/60" />
          <span className="a-tape absolute -right-[16px] -top-[4px] z-10 h-[17px] w-[54px] rotate-[38deg] bg-[#f0d98e]/75" />
          <div className="relative aspect-[195/245] overflow-hidden bg-[#c9d0d6]">
            <Image src={src} alt={alt} fill sizes="209px" className="object-cover" />
          </div>
          <figcaption className="text-center font-hand text-[16px] leading-[26px]">
            {caption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(".a-label", {
          autoAlpha: 0,
          x: -24,
          rotation: -8,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".a-label", start: "top 88%" },
        });

        // "what's up" lands like a rubber stamp
        gsap.from(".a-stamp", {
          scale: 1.9,
          rotation: -9,
          autoAlpha: 0,
          duration: 0.45,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: ".a-stamp", start: "top 82%" },
        });

        // Copy inks in word by word as you scroll
        gsap.fromTo(
          ".a-word",
          { opacity: 0.13 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: ".a-copy", start: "top 80%", end: "bottom 52%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>(".a-emoji").forEach((emoji) => {
          gsap.from(emoji, {
            scale: 0,
            rotation: -140,
            duration: 0.7,
            ease: "back.out(3)",
            scrollTrigger: { trigger: emoji, start: "top 66%", toggleActions: "play none none reverse" },
          });
        });

        // Polaroids get tossed in from the sides, then the tape goes on
        gsap.utils.toArray<HTMLElement>(".a-polaroid").forEach((polaroid, i) => {
          const side = i === 0 ? -1 : 1;
          gsap
            .timeline({ scrollTrigger: { trigger: polaroid, start: "top 88%" } })
            .from(polaroid, {
              x: side * 220,
              y: 60,
              rotation: side * 26,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
            })
            .from(
              polaroid.querySelectorAll(".a-tape"),
              { scaleX: 0, autoAlpha: 0, duration: 0.3, ease: "back.out(3)", stagger: 0.1 },
              "-=0.35",
            );
        });
        gsap.utils.toArray<HTMLElement>(".a-polaroid-drift").forEach((drift, i) => {
          gsap.fromTo(
            drift,
            { y: i === 0 ? 50 : 90 },
            {
              y: i === 0 ? -50 : -90,
              ease: "none",
              scrollTrigger: { trigger: drift, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        // Skill tags drop and bounce
        gsap.from(".a-tag", {
          y: -90,
          rotation: () => gsap.utils.random(-22, 22),
          autoAlpha: 0,
          duration: 0.9,
          ease: "bounce.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".a-tags", start: "top 86%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative px-4 pb-[110px] pt-[12px] xl:pb-[157px]">
      <div className="relative mx-auto max-w-[1174px]">
        <p className="a-label ml-[6px] w-fit font-hand text-[25px] leading-[24px] xl:ml-[50px]">
          about me!
        </p>

        <div className="mt-[44px] flex justify-center xl:mt-[55px]">
          <h2 className="a-stamp flex h-[46px] items-center border-[1.5px] border-ink bg-[#fbfaf8] px-[18px] text-[28px] leading-none font-medium tracking-[0.01em]">
            what&apos;s up
          </h2>
        </div>

        <p className="a-copy mx-auto mt-[34px] max-w-[720px] text-center font-hand text-[clamp(26px,6.4vw,35px)] leading-[1.24] tracking-[0.02em] [word-spacing:0.1em] xl:leading-[47px]">
          {copy.map((line, i) => (
            <span key={i} className="xl:block">
              {line.map((token, j) => (
                <Fragment key={j}>
                  {typeof token === "string" ? (
                    <span className="a-word inline-block">{token}</span>
                  ) : (
                    <span className="a-word inline-block font-sans text-[0.72em] tracking-normal">
                      <span className="a-emoji inline-block">{token.emoji}</span>
                    </span>
                  )}{" "}
                </Fragment>
              ))}
            </span>
          ))}
        </p>

        <ul className="a-tags mt-[40px] flex flex-col items-center gap-[14px]">
          {skillRows.map((row, i) => (
            <li key={i} className="flex flex-wrap justify-center gap-x-[12px] gap-y-[14px]">
              {row.map((skill) => (
                <Fragment key={skill.label}>
                  <span
                    className={`a-tag flex h-[46px] items-center px-[20px] text-[19px] font-semibold tracking-[-0.01em] transition-[rotate,scale] duration-300 hover:scale-105 hover:-rotate-2 sm:h-[55px] sm:px-[24px] sm:text-[24px] ${tagTones[skill.tone]}`}
                    style={{ clipPath: tornEdge }}
                  >
                    {skill.label}
                  </span>
                  <span
                    aria-hidden
                    className={`a-tag flex h-[46px] w-[48px] items-center justify-center text-[20px] transition-[rotate,scale] duration-300 hover:scale-110 hover:rotate-12 sm:h-[55px] sm:w-[58px] sm:text-[24px] ${tagTones[skill.tone]}`}
                    style={{ clipPath: tornEdge }}
                  >
                    {skill.emoji}
                  </span>
                </Fragment>
              ))}
            </li>
          ))}
        </ul>

        <div className="mt-[64px] flex justify-center gap-[36px] xl:mt-0 xl:block">
          <div className="xl:absolute xl:left-0 xl:top-[181px]">
            <Polaroid src={images.portrait} alt="Robin outdoors, wearing an orange cap" caption="2026" />
          </div>
          <div className="mt-[28px] xl:absolute xl:right-0 xl:top-[68px] xl:mt-0">
            <Polaroid src={images.workspace} alt="Robin's desk setup" caption="my workspace" />
          </div>
        </div>
      </div>
    </section>
  );
}
