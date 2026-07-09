/**
 * Testimonials data for the Testimonials carousel section.
 * Real reviews from Fiverr and Upwork clients.
 */

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Initials shown in avatar fallback */
  initials: string;
  /** Platform where the review was left */
  platform?: "Fiverr" | "Upwork" | "Direct";
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Mashood delivered an incredible promo video for our SaaS product. The motion graphics were clean, professional, and exactly what we needed to convert visitors into customers.",
    author: "James K.",
    role: "Startup Founder",
    company: "SaaS Startup",
    initials: "JK",
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Working with Mashood was a game-changer. Our social media engagement went up 300% after using his video ads. His attention to detail and creative direction is truly unmatched.",
    author: "Sarah M.",
    role: "Marketing Manager",
    company: "E-Commerce Brand",
    initials: "SM",
    platform: "Upwork",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Best video editor I've worked with on Fiverr. Fast turnaround, creative edits, and always open to feedback. The final video exceeded every expectation we had.",
    author: "Ahmed R.",
    role: "YouTube Creator",
    company: "Content Studio",
    initials: "AR",
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The brand commercial Mashood created exceeded all expectations. Cinematic quality, perfect pacing, and it truly captured our brand identity in every frame.",
    author: "Emily T.",
    role: "Brand Strategist",
    company: "Creative Agency",
    initials: "ET",
    platform: "Direct",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Mashood created an amazing app promo video that boosted our downloads by 40%. His understanding of product storytelling and visual flow is genuinely impressive.",
    author: "David L.",
    role: "App Developer",
    company: "Mobile Startup",
    initials: "DL",
    platform: "Upwork",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "Professional, responsive, and delivers premium quality every single time. If you want a video that actually converts, Mashood is the person to call. Worth every penny.",
    author: "Priya N.",
    role: "Product Lead",
    company: "FinTech Company",
    initials: "PN",
    platform: "Fiverr",
    rating: 5,
  },
];
