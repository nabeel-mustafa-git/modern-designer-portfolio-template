# Robin — Portfolio Template

A one-page portfolio for a designer or developer, styled like a notebook page: ruled paper, stickers, polaroids and folder-tab project cards, all animated with GSAP.

You are free to use it, edit it and make it your own. Swap in your name, photos and projects and ship it as your portfolio.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

## Make it yours

Most of the content lives in one file, `app/data/site.ts`:

- **Projects**: title, date, summary, cover image and link for each card
- **Skills**: the coloured tags in the about section
- **Nav links, social links and contact email**
- **Image paths** for the portrait and workspace photos

The rest is edited in the section components:

| To change | Edit |
| :-- | :-- |
| Name, headline, stickers | `app/components/sections/Hero.tsx` |
| About text | `app/components/sections/About.tsx` |
| Footer | `app/components/sections/Footer.tsx` |
| Colours and fonts | `app/globals.css` and `app/layout.tsx` |

### Images

Put your images in `public/images` and keep the same file names, or update the paths in `app/data/site.ts`.

| File | Used for | Shape |
| :-- | :-- | :-- |
| `portrait.jpg` | Left polaroid and hero avatars | Portrait, about 4:5 |
| `workspace.jpg` | Right polaroid | Portrait, about 4:5 |
| `project-01.webp`, `project-02.webp`, `project-03.webp` | Project cards | Landscape, 4:3 |

## What's inside

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **GSAP** with ScrollTrigger, SplitText, DrawSVG and Draggable
- **Lenis** smooth scrolling, driven by GSAP's ticker

## Animations

- Paper sheet unrolls on load, the name box draws itself and the letters stamp in
- Stickers can be dragged and spring back
- About text inks in word by word as you scroll
- Project cards pin and stack like folders
- Everything respects `prefers-reduced-motion`

## Project structure

```
app/
├── components/
│   ├── sections/     # Hero, About, Projects, Footer
│   ├── ui/           # Icons, magnetic button wrapper
│   ├── Navbar.tsx
│   ├── Paper.tsx     # The ruled sheet and its intro reveal
│   └── SmoothScroll.tsx
├── data/site.ts      # Your content
├── lib/gsap.ts       # GSAP plugin registration
├── globals.css
├── layout.tsx
└── page.tsx
public/images/        # Your photos and project covers
```
