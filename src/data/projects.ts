/**
 * Featured projects shown in the "What I Do" homepage section.
 * Real assets from src/assets — thumbnails (.webp) + videos (.mp4).
 */

import askStellarThumbnail    from "@/assets/askstellar-thumbnail.webp";
import gridironThumbnail      from "@/assets/gridiron-coaching-thumbnail.webp";
import dexariThumbnail        from "@/assets/dexari-thumbnail.webp";
import devheroaiThumbnail     from "@/assets/devheroai-thumbnail.webp";

import askStellarVideo        from "@/assets/askstellar-video.mp4";
import gridironVideo          from "@/assets/gridiron-coaching-video.mp4";
import dexariVideo            from "@/assets/dexari-video.mp4";
import devheroaiVideo         from "@/assets/devheroai-video.mp4";

export interface FeaturedProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  /** Badge color — used for the category pill */
  categoryColor: string;
  thumbnail: string;
  /** Local .mp4 — lazy-loaded only when modal opens */
  videoUrl: string;
  /** Scroll target on the /portfolio page */
  niche: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: "Ask Stellar",
    subtitle: "AI-Powered SaaS Platform",
    description:
      "Cinematic product demo video that showcases an AI Q&A assistant, built to convert visitors into sign-ups.",
    category: "SaaS Explainer",
    categoryColor: "#007AFF",
    thumbnail: askStellarThumbnail,
    videoUrl: askStellarVideo,
    niche: "saas-explainer",
  },
  {
    id: 2,
    title: "Gridiron Coaching",
    subtitle: "Sports Training Platform",
    description:
      "High-energy explainer and onboarding sequence that positions a football coaching platform for rapid user adoption.",
    category: "App Promo",
    categoryColor: "#34C759",
    thumbnail: gridironThumbnail,
    videoUrl: gridironVideo,
    niche: "app-promos",
  },
  {
    id: 3,
    title: "Dexari",
    subtitle: "DeFi Trading Platform",
    description:
      "Sleek motion-graphics-driven promo that communicates complex DeFi features to mainstream crypto audiences.",
    category: "Website Promo",
    categoryColor: "#FF9F0A",
    thumbnail: dexariThumbnail,
    videoUrl: dexariVideo,
    niche: "website-promos",
  },
  {
    id: 4,
    title: "DevHero AI",
    subtitle: "AI Developer Tooling",
    description:
      "Fast-paced screencast-style video that turns a developer tool's core workflow into a compelling sales asset.",
    category: "Screencast",
    categoryColor: "#FF375F",
    thumbnail: devheroaiThumbnail,
    videoUrl: devheroaiVideo,
    niche: "screencast",
  },
];
