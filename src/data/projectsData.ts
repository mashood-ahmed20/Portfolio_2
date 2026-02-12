export type VideoNiche = 
  | "app-promos" 
  | "website-promos" 
  | "screencast" 
  | "ugc" 
  | "social-media-ads" 
  | "content-repurposing";

export type VideoOrientation = "vertical" | "horizontal";

export type ProjectType = "video" | "software";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  tags: string[];
  type: ProjectType;
  niche?: VideoNiche;
  orientation?: VideoOrientation;
  videoUrl?: string;
  images?: string[];
  thumbnail?: string;
}

export const videoNicheLabels: Record<VideoNiche, string> = {
  "app-promos": "App Promos",
  "website-promos": "Website Promos",
  "screencast": "Screencast Videos",
  "ugc": "UGC Campaigns",
  "social-media-ads": "Social Media Ads",
  "content-repurposing": "Content Repurposing",
};

import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.png";
import gridironVideo from "@/assets/gridiron-coaching-video.mp4";
import gridironThumbnail from "@/assets/gridiron-coaching-thumbnail.png";
import influenceaiVideo from "@/assets/influenceai-video.mp4";
import influenceaiThumbnail from "@/assets/influenceai-thumbnail.png";

export const videoProjects: Project[] = [
  // App Promos (horizontal)
  {
    id: "askstellar-promo",
    title: "AskStellarAi",
    subtitle: "Personal Health Insurance Assistant",
    description: "Dynamic app promo showcasing AI-powered health insurance guidance.",
    fullDescription: "Created a compelling promotional video for AskStellarAi, an innovative AI-powered health insurance guidance platform.",
    tags: ["App Promo", "AI Platform", "Motion Graphics"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: askStellarVideo,
    thumbnail: askStellarThumbnail,
  },
  {
    id: "influenceai-promo",
    title: "InfluenceAI",
    subtitle: "AI Growth Partner for Instagram",
    description: "Conversion-focused promo video for an AI-powered Instagram growth platform.",
    fullDescription: "InfluenceAI is a sleek, conversion-focused product promo video created to present a modern solution for Instagram growth.",
    tags: ["App Promo", "AI Platform", "Social Media"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: influenceaiVideo,
    thumbnail: influenceaiThumbnail,
  },
  {
    id: "gridiron-coaching",
    title: "GridIron Coaching",
    subtitle: "College Football Simulation",
    description: "High-impact promo video capturing the thrill of managing a college football program.",
    fullDescription: "GridIron Coaching is a high-impact promo video designed to capture the thrill, strategy, and emotional depth of managing a college football program.",
    tags: ["App Promo", "Gaming", "Motion Graphics"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: gridironVideo,
    thumbnail: gridironThumbnail,
  },
  {
    id: "chefshot-promo",
    title: "ChefShot Ai Pro",
    subtitle: "AI-Enhanced Food Photography",
    description: "Engaging promo highlighting AI food photography features.",
    fullDescription: "Produced a visually stunning promotional video for ChefShot Ai Pro.",
    tags: ["App Promo", "AI", "Food Tech"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
  },
  {
    id: "fitness-app-promo",
    title: "FitTrack Pro",
    subtitle: "Personal Fitness Companion",
    description: "Energetic promo for a fitness tracking application.",
    fullDescription: "Designed an energetic and motivational promotional video for FitTrack Pro.",
    tags: ["App Promo", "Fitness", "Health Tech"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
  },
  
  // Website Promos (horizontal)
  {
    id: "astrolabe-promo",
    title: "Astrolabe Platform",
    subtitle: "All-in-one Seafarer Platform",
    description: "Professional website promo for maritime platform.",
    fullDescription: "Crafted a professional promotional video for Astrolabe, a comprehensive maritime platform for seafarers.",
    tags: ["Website Promo", "Maritime", "B2B"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
  },
  {
    id: "ecommerce-promo",
    title: "ShopFlow",
    subtitle: "Modern E-commerce Platform",
    description: "Sleek website promo showcasing e-commerce features.",
    fullDescription: "Created a sleek promotional video for ShopFlow, a modern e-commerce platform.",
    tags: ["Website Promo", "E-commerce", "SaaS"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
  },
  
  // Screencast Videos (horizontal)
  {
    id: "askstellar-screencast",
    title: "AskStellarAi Tutorial",
    subtitle: "Platform Walkthrough",
    description: "Comprehensive screencast tutorial for AI platform.",
    fullDescription: "Produced a detailed screencast tutorial for AskStellarAi.",
    tags: ["Screencast", "Tutorial", "AI Platform"],
    type: "video",
    niche: "screencast",
    orientation: "horizontal",
  },
  {
    id: "saas-demo",
    title: "ProjectHub Demo",
    subtitle: "Project Management Walkthrough",
    description: "In-depth demo of project management software.",
    fullDescription: "Created an in-depth screencast demonstration of ProjectHub.",
    tags: ["Screencast", "Demo", "SaaS"],
    type: "video",
    niche: "screencast",
    orientation: "horizontal",
  },
  
  // UGC Videos (vertical - Reels/Shorts)
  {
    id: "skincare-ugc",
    title: "GlowUp Skincare",
    subtitle: "Product Review Style",
    description: "Authentic UGC-style video for skincare brand.",
    fullDescription: "Produced an authentic user-generated content style video for GlowUp Skincare.",
    tags: ["UGC", "Skincare", "D2C"],
    type: "video",
    niche: "ugc",
    orientation: "vertical",
  },
  {
    id: "tech-ugc",
    title: "TechGadget Unboxing",
    subtitle: "Product Showcase",
    description: "Engaging UGC unboxing and review video.",
    fullDescription: "Created an engaging UGC-style unboxing and review video for a tech gadget.",
    tags: ["UGC", "Tech", "Unboxing"],
    type: "video",
    niche: "ugc",
    orientation: "vertical",
  },
  
  // Social Media Ads (vertical - Reels/Shorts)
  {
    id: "armsai-ad",
    title: "ArmsAI",
    subtitle: "Risk Assessment Agent",
    description: "Futuristic social ad for AI risk platform.",
    fullDescription: "Designed a futuristic, attention-grabbing social media advertisement for ArmsAI.",
    tags: ["Social Ad", "AI", "B2B"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
  },
  {
    id: "fashion-ad",
    title: "Urban Style Co",
    subtitle: "Fashion Brand Campaign",
    description: "Trendy social media ad for fashion brand.",
    fullDescription: "Created a trendy, scroll-stopping social media advertisement for Urban Style Co.",
    tags: ["Social Ad", "Fashion", "D2C"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
  },
  
  // Content Repurposing (vertical - Reels/Shorts)
  {
    id: "podcast-clips",
    title: "Tech Talk Podcast",
    subtitle: "Long-form to Short-form",
    description: "Repurposed podcast content for social media.",
    fullDescription: "Transformed long-form podcast content into engaging short-form clips for social media.",
    tags: ["Content Repurposing", "Podcast", "Social Media"],
    type: "video",
    niche: "content-repurposing",
    orientation: "vertical",
  },
  {
    id: "webinar-shorts",
    title: "Marketing Masterclass",
    subtitle: "Webinar Highlights",
    description: "Webinar content repurposed into bite-sized clips.",
    fullDescription: "Repurposed a 60-minute marketing webinar into a series of engaging short-form videos.",
    tags: ["Content Repurposing", "Webinar", "Marketing"],
    type: "video",
    niche: "content-repurposing",
    orientation: "vertical",
  },
];

export const softwareProjects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack MERN Application",
    description: "Complete e-commerce solution with payment integration.",
    fullDescription: "Built a comprehensive e-commerce platform using the MERN stack.",
    tags: ["MERN Stack", "E-commerce", "Stripe", "MongoDB"],
    type: "software",
    images: [],
  },
  {
    id: "task-management",
    title: "TaskFlow",
    subtitle: "Project Management Tool",
    description: "Collaborative task management application.",
    fullDescription: "Developed a collaborative project management tool with real-time updates.",
    tags: ["MERN Stack", "Real-time", "Socket.io", "Collaboration"],
    type: "software",
    images: [],
  },
  {
    id: "healthcare-portal",
    title: "MediCare Portal",
    subtitle: "Healthcare Management System",
    description: "Patient management system for healthcare providers.",
    fullDescription: "Created a comprehensive healthcare management portal for clinics and hospitals.",
    tags: ["Java", "Spring Boot", "React", "Healthcare"],
    type: "software",
    images: [],
  },
  {
    id: "inventory-system",
    title: "StockSync",
    subtitle: "Inventory Management System",
    description: "Real-time inventory tracking solution.",
    fullDescription: "Built a real-time inventory management system for retail businesses.",
    tags: ["Java", "React", "MySQL", "Analytics"],
    type: "software",
    images: [],
  },
  {
    id: "social-platform",
    title: "ConnectHub",
    subtitle: "Social Networking Platform",
    description: "Feature-rich social networking application.",
    fullDescription: "Developed a full-featured social networking platform.",
    tags: ["MERN Stack", "Social Media", "Real-time", "MongoDB"],
    type: "software",
    images: [],
  },
];

export const allProjects = [...videoProjects, ...softwareProjects];
