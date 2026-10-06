export const images = {
  portrait: "/images/portrait.jpg",
  workspace: "/images/workspace.jpg",
};

export const navLinks = [
  { id: "home", label: "Home", href: "#home", icon: "star" },
  { id: "about", label: "About", href: "#about", icon: "user" },
  { id: "work", label: "Case Study", href: "#work", icon: "grid" },
  { id: "playground", label: "Playground", href: "#playground", icon: "diamond" },
] as const;

export const socials = [
  { id: "linkedin", label: "LinkedIn", href: "#", tone: "sun" },
  { id: "dribbble", label: "Dribbble", href: "#", tone: "rose" },
  { id: "instagram", label: "Instagram", href: "#", tone: "leaf" },
] as const;

export const contactEmail = "hello@robin.design";

export type Tone = "sun" | "leaf" | "rose" | "cobalt";

export const skillRows: { label: string; emoji: string; tone: Tone }[][] = [
  [
    { label: "Interaction Design", emoji: "⚡", tone: "sun" },
    { label: "Prototyping", emoji: "🎨", tone: "leaf" },
  ],
  [
    { label: "User Research", emoji: "🧩", tone: "rose" },
    { label: "Motion Design", emoji: "👀", tone: "cobalt" },
  ],
];

export type Project = {
  title: string;
  date: string;
  summary: string;
  image: string;
  href: string;
  theme: "cobalt" | "coal" | "sun";
};

export const projects: Project[] = [
  {
    // Placeholder: Project 01 is hidden behind the stack in the design.
    title: "Relay",
    date: "Apr 2, 2026",
    summary: "Design-to-dev handoff that doesn't lose the details.",
    image: "/images/project-01.webp",
    href: "#",
    theme: "cobalt",
  },
  {
    title: "Tandem",
    date: "Mar 2, 2026",
    summary: "From 'who owes who' to money that finally feels shared.",
    image: "/images/project-02.webp",
    href: "#",
    theme: "coal",
  },
  {
    title: "Forge",
    date: "Jan 2, 2026",
    summary:
      "Getting a new engineer from day one to shipping without the panic.",
    image: "/images/project-03.webp",
    href: "#",
    theme: "sun",
  },
];
