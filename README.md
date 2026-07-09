# Mashood Ahmed — Portfolio

> **Motion Design & Full-Stack Web Developer**  
> Video editing, motion graphics, SaaS explainers, and web development.

Live: [mashoodsportfolio.vercel.app](https://mashoodsportfolio.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn-ui |
| Routing | React Router v6 |
| Form Email | EmailJS (lazy-loaded) |
| Icons | lucide-react |
| Animations | CSS Keyframes + Intersection Observer |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/mashoodsportfolio.git
cd mashoodsportfolio

# Install dependencies
npm install
# or
bun install
```

### Environment Variables

```bash
# Copy the example env file
cp .env.example .env.local

# Fill in your EmailJS credentials
# Get them from: https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

> **Note:** The current ContactSection has the EmailJS keys hardcoded for simplicity. Move them to env vars for production security.

### Development

```bash
npm run dev
# App runs at http://localhost:8080
```

### Production Build

```bash
npm run build
npm run preview
```

### Bundle Analysis

```bash
npm run build:visualize
# Opens dist/stats.html — shows chunk sizes and dependencies
```

---

## Performance Architecture

### Code Splitting
- `TestimonialsSection` — lazy loaded (React.lazy)
- `FAQSection` — lazy loaded (React.lazy)
- `Portfolio` page — lazy loaded (React.lazy)
- `EmailJS` — lazy imported only on form submit

### Manual Chunks (Vite config)
| Chunk | Contents |
|-------|----------|
| `vendor-react` | react, react-dom |
| `ui-radix` | all @radix-ui primitives |
| `emailjs` | @emailjs/browser |
| `charts` | recharts, d3-* |
| `vendor` | remaining node_modules |

### CSS Optimizations
- Tailwind CSS tree-shakes unused utilities automatically
- GPU-only keyframes (transform + opacity)
- `prefers-reduced-motion` wrapper disables all animations
- `font-display: swap` via Google Fonts URL param

### Asset Caching
- `/assets/*` — immutable cache (1 year) via Vercel headers
- `/` HTML — no-cache (revalidates on deploy)

---

## SEO

- **JSON-LD** Person + Service schema in `<head>`
- **Open Graph** & Twitter Card meta tags
- **robots.txt** at `/robots.txt`
- **sitemap.xml** at `/sitemap.xml`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Single `<h1>` per page

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel auto-detects Vite — no extra config needed
4. Add env vars in Vercel dashboard (Settings → Environment Variables)
5. Deploy 🚀

The `vercel.json` file configures:
- Immutable caching for hashed assets
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- SPA rewrites for client-side routing

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| FCP | < 1.5s |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Bundle (gzipped) | < 250KB |

---

## Project Structure

```
src/
├── assets/          # Static assets (profile photo)
├── components/      # All React components
│   ├── ui/          # shadcn-ui primitives
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── WhyChooseMe.tsx      ← NEW
│   ├── PortfolioSection.tsx
│   ├── EditingProcessSection.tsx
│   ├── TestimonialsSection.tsx (lazy)
│   ├── ContactSection.tsx
│   ├── FAQSection.tsx       ← NEW (lazy)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ErrorBoundary.tsx    ← NEW
│   └── SEO.tsx
├── contexts/        # React contexts
├── data/            # Project data (projectsData.ts)
├── hooks/           # Custom hooks
│   ├── useScrollReveal.ts   ← Improved
│   └── useCountUp.ts
├── pages/
│   ├── Index.tsx            ← Updated
│   ├── Portfolio.tsx
│   └── NotFound.tsx
├── index.css               ← Optimized
└── main.tsx                ← + Web Vitals
```

---

© 2026 Mashood Ahmed — All rights reserved.
