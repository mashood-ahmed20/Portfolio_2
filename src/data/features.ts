/**
 * Feature data for the "Why Choose Me" section.
 */

export interface Feature {
  id: number;
  /** Lucide icon name */
  icon: string;
  title: string;
  description: string;
  /** Stat shown inside card (optional accent) */
  stat?: string;
  statLabel?: string;
}

export const whyChooseMe: Feature[] = [
  {
    id: 1,
    icon: "Zap",
    title: "Fast Turnaround",
    description:
      "Projects completed in 7–14 business days without compromising quality. I prioritize efficiency and respect your timeline — rush delivery available.",
    stat: "7–14",
    statLabel: "Day avg. delivery",
  },
  {
    id: 2,
    icon: "Sparkles",
    title: "Premium Quality",
    description:
      "Series A-level output at a fraction of agency costs. Every project receives meticulous attention to detail — from the first frame to the final export.",
    stat: "96%",
    statLabel: "Client satisfaction",
  },
  {
    id: 3,
    icon: "Layers",
    title: "Full Service",
    description:
      "From cinematic video production to motion graphics and web development — I handle your entire digital presence under one roof.",
    stat: "70+",
    statLabel: "Projects delivered",
  },
  {
    id: 4,
    icon: "Users",
    title: "Client Focused",
    description:
      "Iterative process with clear communication at every stage. Your feedback shapes the final result — I don't stop until you're delighted.",
    stat: "100+",
    statLabel: "Happy clients",
  },
];
