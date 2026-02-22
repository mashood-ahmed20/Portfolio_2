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
  "social-media-ads": "Promo Videos",
  "content-repurposing": "Content Repurposing",
};

import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.png";
import gridironVideo from "@/assets/gridiron-coaching-video.mp4";
import gridironThumbnail from "@/assets/gridiron-coaching-thumbnail.png";
import influenceaiVideo from "@/assets/influenceai-video.mp4";
import influenceaiThumbnail from "@/assets/influenceai-thumbnail.png";
import afiamVideo from "@/assets/afiam-video.mp4";
import afiamThumbnail from "@/assets/afiam-thumbnail.png";
import screenrVideo from "@/assets/screenr-video.mp4";
import screenrThumbnail from "@/assets/screenr-thumbnail.png";
import yeloquestVideo from "@/assets/yeloquest-video.mp4";
import yeloquestThumbnail from "@/assets/yeloquest-thumbnail.png";
import prepcartVideo from "@/assets/prepcart-video.mp4";
import prepcartThumbnail from "@/assets/prepcart-thumbnail.png";
import devheroaiVideo from "@/assets/devheroai-video.mp4";
import devheroaiThumbnail from "@/assets/devheroai-thumbnail.png";
import chefshotVideo from "@/assets/chefshot-video.mp4";
import chefshotThumbnail from "@/assets/chefshot-thumbnail.png";
import zeneraVideo from "@/assets/zenera-video.mp4";
import zeneraThumbnail from "@/assets/zenera-thumbnail.png";
import tmeVideo from "@/assets/tme-video.mp4";
import tmeThumbnail from "@/assets/tme-thumbnail.png";
import onevoiceaiVideo from "@/assets/onevoiceai-video.mp4";
import onevoiceaiThumbnail from "@/assets/onevoiceai-thumbnail.png";
import liivaiVideo from "@/assets/liivai-video.mp4";
import liivaiThumbnail from "@/assets/liivai-thumbnail.png";
import dexariVideo from "@/assets/dexari-video.mp4";
import dexariThumbnail from "@/assets/dexari-thumbnail.png";
import thereappVideo from "@/assets/thereapp-video.mp4";
import thereappThumbnail from "@/assets/thereapp-thumbnail.png";
import businessScalingVideo from "@/assets/business-scaling-video.mp4";
import businessScalingThumbnail from "@/assets/business-scaling-thumbnail.png";

export const videoProjects: Project[] = [
  // App Promos (horizontal)
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
    videoUrl: chefshotVideo,
    thumbnail: chefshotThumbnail,
  },
  {
    id: "dexari-promo",
    title: "Dexari",
    subtitle: "Smart Crypto Exchange and Marketplace",
    description: "Dynamic app promo showcasing a smart crypto exchange and marketplace platform.",
    fullDescription: "Created a compelling promotional video for Dexari, an innovative smart crypto exchange and marketplace platform offering freedom, power, and control over digital assets.",
    tags: ["App Promo", "Crypto", "FinTech"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: dexariVideo,
    thumbnail: dexariThumbnail,
  },
  {
    id: "thereapp-promo",
    title: "There.App",
    subtitle: "Event Operations on a Unified Mobile-First Platform",
    description: "Dynamic app promo showcasing a unified mobile-first platform for event operations.",
    fullDescription: "Created a compelling promotional video for There.App, an innovative platform that consolidates event operations needs into a unified mobile-first experience for seamless event management.",
    tags: ["App Promo", "Events", "Mobile Platform"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: thereappVideo,
    thumbnail: thereappThumbnail,
  },
  
  // Website Promos (horizontal)
  {
    id: "screenr-promo",
    title: "Screenr",
    subtitle: "Hire Smarter, Faster, and Better with AI",
    description: "Professional website promo for an AI-powered hiring platform.",
    fullDescription: "Produced a sleek, professional promotional video for Screenr, an innovative AI-powered recruitment platform that helps companies hire smarter, faster, and better.",
    tags: ["Website Promo", "AI", "Recruitment"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: screenrVideo,
    thumbnail: screenrThumbnail,
  },
  {
    id: "tme-promo",
    title: "The Muslim Expert (TME)",
    subtitle: "Platform for Guidance, Connections, and Contributions for Muslims",
    description: "Professional website promo for a platform connecting Muslim scholars, professionals, and creators.",
    fullDescription: "Crafted a professional promotional video for The Muslim Expert (TME), an innovative platform that connects users with verified Muslim scholars, professionals, and creators for guidance, consultations, and community contributions.",
    tags: ["Website Promo", "Community", "Platform"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: tmeVideo,
    thumbnail: tmeThumbnail,
  },
  {
    id: "liivai-promo",
    title: "Liiv Ai",
    subtitle: "Automate Document Workflows in Just Minutes",
    description: "Professional website promo for an AI-powered document automation platform.",
    fullDescription: "Crafted a professional promotional video for Liiv Ai, an innovative platform that automates document workflows in just minutes, saving teams days and weeks per case.",
    tags: ["Website Promo", "AI", "Automation"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: liivaiVideo,
    thumbnail: liivaiThumbnail,
  },
  {
    id: "askstellar-promo",
    title: "AskStellarAi",
    subtitle: "Personal Health Insurance Assistant",
    description: "Professional website promo showcasing AI-powered health insurance guidance.",
    fullDescription: "Created a compelling promotional video for AskStellarAi, an innovative AI-powered health insurance guidance platform.",
    tags: ["Website Promo", "AI Platform", "Motion Graphics"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: askStellarVideo,
    thumbnail: askStellarThumbnail,
  },
  
  // Screencast Videos (horizontal)
  {
    id: "devheroai-screencast",
    title: "DevHero AI",
    subtitle: "Create a Perfect Working Website Using Chatbots",
    description: "Comprehensive screencast showcasing AI-powered website creation with chatbots.",
    fullDescription: "Produced a detailed screencast for DevHero AI, an innovative platform that enables users to create perfect, fully functional websites using intelligent chatbots.",
    tags: ["Screencast", "AI", "Web Development"],
    type: "video",
    niche: "screencast",
    orientation: "horizontal",
    videoUrl: devheroaiVideo,
    thumbnail: devheroaiThumbnail,
  },
  {
    id: "onevoiceai-screencast",
    title: "One Voice AI",
    subtitle: "Create Real-Like Voiceovers Using Popular Voice Models",
    description: "Comprehensive screencast showcasing AI-powered voiceover creation with popular voice models.",
    fullDescription: "Produced a detailed screencast for One Voice AI, an innovative platform that enables users to create realistic voiceovers using popular voice models with just a few clicks.",
    tags: ["Screencast", "AI", "Voice Tech"],
    type: "video",
    niche: "screencast",
    orientation: "horizontal",
    videoUrl: onevoiceaiVideo,
    thumbnail: onevoiceaiThumbnail,
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
    id: "yeloquest-promo",
    title: "Yelo Quest",
    subtitle: "Scale Social Media with Smart Ads",
    description: "Engaging promo video for an AI-powered social media advertising platform.",
    fullDescription: "Produced a dynamic, conversion-focused promo video for Yelo Quest, an innovative platform that helps brands scale their social media presence with smart, targeted ads.",
    tags: ["Promo Video", "Social Media", "Advertising"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
    videoUrl: yeloquestVideo,
    thumbnail: yeloquestThumbnail,
  },
  {
    id: "prepcart-promo",
    title: "Prep Cart",
    subtitle: "Instant Cook Books Using Trending TikTok Recipes",
    description: "Engaging promo video for an app that turns viral TikTok recipes into instant cook books.",
    fullDescription: "Produced a vibrant, conversion-focused promo video for Prep Cart, an innovative app that transforms trending TikTok recipes into easy-to-follow cook books with just one click.",
    tags: ["Promo Video", "Food Tech", "Mobile App"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
    videoUrl: prepcartVideo,
    thumbnail: prepcartThumbnail,
  },
  {
    id: "afiam-promo",
    title: "Afiam",
    subtitle: "Smart Way to Run a Business",
    description: "Engaging promo video for an all-in-one business management app.",
    fullDescription: "Produced a sleek, conversion-focused promo video for Afiam, an innovative business management platform that puts your business in your hands.",
    tags: ["Promo Video", "Business", "Mobile App"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
    videoUrl: afiamVideo,
    thumbnail: afiamThumbnail,
  },
  {
    id: "zenera-promo",
    title: "Zenera",
    subtitle: "Track Activities, Maintain Streaks, and Get Rewards",
    description: "Engaging promo video for a habit tracking and rewards app.",
    fullDescription: "Produced a vibrant, conversion-focused promo video for Zenera, an innovative app that helps users track daily activities, maintain streaks, and earn rewards for consistency.",
    tags: ["Promo Video", "Productivity", "Mobile App"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
    videoUrl: zeneraVideo,
    thumbnail: zeneraThumbnail,
  },
  
  // Content Repurposing (vertical - Reels/Shorts)
  {
    id: "business-scaling-tips",
    title: "Business Scaling Tips",
    subtitle: "How to Scale an Airbnb Business",
    description: "Repurposed long-form content into a punchy vertical short on scaling an Airbnb business.",
    fullDescription: "Transformed long-form business content into an engaging short-form vertical video packed with actionable tips on how to start and scale an Airbnb business.",
    tags: ["Content Repurposing", "Business", "Short-form"],
    type: "video",
    niche: "content-repurposing",
    orientation: "vertical",
    videoUrl: businessScalingVideo,
    thumbnail: businessScalingThumbnail,
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
