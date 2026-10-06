import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  width: 12,
  height: 12,
  "aria-hidden": true,
} as const;

export const StarIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.4 5.8 21.1l1.6-7L2 9.3l7.1-.7z" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <circle cx="12" cy="7.5" r="4.5" />
    <path d="M3.5 22c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8z" />
  </svg>
);

export const GridIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
);

export const DiamondIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 1.5L22.5 12 12 22.5 1.5 12z" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 21.5S3 15.8 3 9.3C3 6.2 5.4 4 8.2 4c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2C18.6 4 21 6.2 21 9.3c0 6.5-9 12.2-9 12.2z" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 1c.7 6 3 8.3 11 11-8 2.7-10.3 5-11 11-.7-6-3-8.3-11-11 8-2.7 10.3-5 11-11z" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg
    {...base}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="square"
    {...p}
  >
    <path d="M6.5 17.5L17 7M8.5 6.5h9v9" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="3.5" fill="currentColor" />
    <g fill="var(--chip, #fff)">
      <rect x="6" y="9.8" width="2.6" height="8" />
      <circle cx="7.3" cy="6.8" r="1.55" />
      <path d="M10.6 9.8h2.5v1.1c.5-.8 1.5-1.35 2.7-1.35 2.1 0 3 1.3 3 3.5v4.75h-2.6v-4.3c0-1-.4-1.7-1.3-1.7-1 0-1.7.7-1.7 1.9v4.1h-2.6z" />
    </g>
  </svg>
);

export const DribbbleIcon = (p: IconProps) => (
  <svg
    {...base}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    {...p}
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M6 5c3.5 3.2 7.5 9.5 9 16.5M2.7 10.8c5.3.3 11.8-.7 15.8-5.5M7.5 20.3c2-4.7 7.3-8.6 14-7.8" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Smiley = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...p}>
    <circle
      cx="12"
      cy="12"
      r="10.5"
      fill="var(--color-rose)"
      stroke="var(--color-ink)"
      strokeWidth="1.2"
    />
    <circle cx="8.6" cy="9.8" r="1.3" fill="var(--color-ink)" />
    <circle cx="15.4" cy="9.8" r="1.3" fill="var(--color-ink)" />
    <path
      d="M7.5 13.8c1 2.2 2.7 3.3 4.5 3.3s3.5-1.1 4.5-3.3"
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TargetIcon = (p: IconProps) => (
  <svg viewBox="0 0 40 40" width={40} height={40} aria-hidden {...p}>
    <circle
      cx="20"
      cy="20"
      r="17.5"
      fill="var(--color-leaf)"
      stroke="var(--color-ink)"
      strokeWidth="3"
    />
    <circle
      cx="20"
      cy="20"
      r="10"
      fill="#fff"
      stroke="var(--color-ink)"
      strokeWidth="2.5"
    />
    <circle
      cx="20"
      cy="20"
      r="4.5"
      fill="var(--color-leaf)"
      stroke="var(--color-ink)"
      strokeWidth="2"
    />
  </svg>
);

export const FlowerIcon = (p: IconProps) => (
  <svg viewBox="0 0 40 40" width={40} height={40} aria-hidden {...p}>
    {Array.from({ length: 8 }, (_, i) => (
      <ellipse
        key={i}
        cx="20"
        cy="8.5"
        rx="4.6"
        ry="8"
        fill="var(--color-rose)"
        transform={`rotate(${i * 45} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="5" fill="#d92b78" />
  </svg>
);
