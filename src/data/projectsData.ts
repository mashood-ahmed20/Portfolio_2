export type VideoNiche = 
  | "app-promos" 
  | "website-promos" 
  | "screencast" 
  | "ugc" 
  | "social-media-ads" 
  | "content-repurposing";

export type VideoOrientation = "vertical" | "horizontal";

export type ProjectType = "video";

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
import mizwajVideo from "@/assets/mizwaj-video.mp4";
import mizwajThumbnail from "@/assets/mizwaj-thumbnail.png";
import twoSixteenVideo from "@/assets/216-video.mp4";
import twoSixteenThumbnail from "@/assets/216-thumbnail.png";
import agrarNextVideo from "@/assets/agrarnext-video.mp4";
import agrarNextThumbnail from "@/assets/agrarnext-thumbnail.png";
import quintraVideo from "@/assets/quintra-video.mp4";
import quintraThumbnail from "@/assets/quintra-thumbnail.png";
import wemetVideo from "@/assets/wemet-video.mp4";
import wemetThumbnail from "@/assets/wemet-thumbnail.png";
import scienceForPeopleVideo from "@/assets/scienceforpeople-video.mp4";
import scienceForPeopleThumbnail from "@/assets/scienceforpeople-thumbnail.png";
import weddingWebsitesVideo from "@/assets/weddingwebsites-video.mp4";
import weddingWebsitesThumbnail from "@/assets/weddingwebsites-thumbnail.png";
import layoverLoopVideo from "@/assets/layoverloop-video.mp4";
import layoverLoopThumbnail from "@/assets/layoverloop-thumbnail.png";

export const videoProjects: Project[] = [
  // App Promos (horizontal)
  {
    id: "216-promo",
    title: "216",
    subtitle: "Support for Children",
    description: "Heartfelt app promo for a platform supporting children's growth and independence journey.",
    fullDescription: "Created a meaningful promotional video for 216, an app dedicated to supporting children through their development journey toward independence.",
    tags: ["App Promo", "Family", "Mobile App"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: twoSixteenVideo,
    thumbnail: twoSixteenThumbnail,
  },
  {
    id: "agrarnext-promo",
    title: "Agrar Next",
    subtitle: "Smart Livestock Management for Farmers",
    description: "Modern app promo showcasing a livestock management platform built for farmers.",
    fullDescription: "Produced a clean, conversion-focused promotional video for Agrar Next, a smart farming app that helps farmers manage their livestock with ease.",
    tags: ["App Promo", "AgriTech", "Mobile App"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: agrarNextVideo,
    thumbnail: agrarNextThumbnail,
  },
  {
    id: "quintra-promo",
    title: "Quintra",
    subtitle: "AI-Powered Trading and Portfolio Analysis",
    description: "Sleek app promo for an AI trading assistant and portfolio analysis platform.",
    fullDescription: "Crafted a premium promotional video for Quintra, an AI-powered trading app that analyzes portfolios and guides smarter investment decisions.",
    tags: ["App Promo", "FinTech", "AI"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: quintraVideo,
    thumbnail: quintraThumbnail,
  },
  {
    id: "wemet-promo",
    title: "WEMET",
    subtitle: "Lead Capture App for Professionals",
    description: "Dynamic app promo for a professional lead capture and networking platform.",
    fullDescription: "Produced a polished promotional video for WEMET, an app that turns real-world meetings into business opportunities by capturing and managing professional leads.",
    tags: ["App Promo", "Networking", "Productivity"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: wemetVideo,
    thumbnail: wemetThumbnail,
  },
  {
    id: "layoverloop-promo",
    title: "LayoverLoop",
    subtitle: "Layover and Travel Tips for Smart Travelers",
    description: "Engaging app promo for a travel companion app focused on layovers and travel tips.",
    fullDescription: "Produced a polished promotional video for LayoverLoop, an app that helps travelers make the most of their layovers with smart tips and curated travel guidance.",
    tags: ["App Promo", "Travel", "Mobile App"],
    type: "video",
    niche: "app-promos",
    orientation: "horizontal",
    videoUrl: layoverLoopVideo,
    thumbnail: layoverLoopThumbnail,
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
    videoUrl: chefshotVideo,
    thumbnail: chefshotThumbnail,
  },
  {
    id: "dexari-promo",
    title: "Dexari",
    subtitle: "Smart Crypto Exchange and Marketplace",
    description: "Dynamic app promo showcasing a smart crypto exchange and marketplace platform.",
    fullDescription: "Created a compelling promotional video for Dexari.",
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
    fullDescription: "Created a compelling promotional video for There.App.",
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
    fullDescription: "Produced a sleek, professional promotional video for Screenr.",
    tags: ["Website Promo", "AI", "Recruitment"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: screenrVideo,
    thumbnail: screenrThumbnail,
  },
  {
    id: "scienceforpeople-promo",
    title: "Science For People",
    subtitle: "All-in-One Tools for HR, Hiring, and Leadership",
    description: "Professional website promo showcasing an all-in-one platform for HR, hiring, and leadership tools.",
    fullDescription: "Crafted a sleek, professional promotional video for Science For People, a unified platform that brings HR, hiring, and leadership tools together in one place.",
    tags: ["Website Promo", "HR Tech", "SaaS"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: scienceForPeopleVideo,
    thumbnail: scienceForPeopleThumbnail,
  },
  {
    id: "weddingwebsites-promo",
    title: "WeddingWebsites.ie",
    subtitle: "Wedding Planner Websites with Guests and RSVPs",
    description: "Elegant website promo for a wedding planning platform with guest management and online RSVPs.",
    fullDescription: "Created a refined promotional video for WeddingWebsites.ie, a platform that helps couples build beautiful wedding websites with guest lists and online RSVPs.",
    tags: ["Website Promo", "Wedding", "SaaS"],
    type: "video",
    niche: "website-promos",
    orientation: "horizontal",
    videoUrl: weddingWebsitesVideo,
    thumbnail: weddingWebsitesThumbnail,
  },
  {
    id: "tme-promo",
    title: "The Muslim Expert (TME)",
    subtitle: "Platform for Guidance, Connections, and Contributions for Muslims",
    description: "Professional website promo for a platform connecting Muslim scholars, professionals, and creators.",
    fullDescription: "Crafted a professional promotional video for The Muslim Expert (TME).",
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
    fullDescription: "Crafted a professional promotional video for Liiv Ai.",
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
    fullDescription: "Created a compelling promotional video for AskStellarAi.",
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
    fullDescription: "Produced a detailed screencast for DevHero AI.",
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
    description: "Comprehensive screencast showcasing AI-powered voiceover creation.",
    fullDescription: "Produced a detailed screencast for One Voice AI.",
    tags: ["Screencast", "AI", "Voice Tech"],
    type: "video",
    niche: "screencast",
    orientation: "horizontal",
    videoUrl: onevoiceaiVideo,
    thumbnail: onevoiceaiThumbnail,
  },
  
  // UGC Videos (vertical)
  {
    id: "mizwaj-ugc",
    title: "Mizwaj App Campaign",
    subtitle: "App Review and Promotion",
    description: "Engaging UGC-style app review and promotion video for the Mizwaj dating app.",
    fullDescription: "Produced an authentic user-generated content style review and promotion video for Mizwaj.",
    tags: ["UGC", "App Review", "Dating App"],
    type: "video",
    niche: "ugc",
    orientation: "vertical",
    videoUrl: mizwajVideo,
    thumbnail: mizwajThumbnail,
  },
  {
    id: "tech-ugc",
    title: "TechGadget Unboxing",
    subtitle: "Product Showcase",
    description: "Engaging UGC unboxing and review video.",
    fullDescription: "Created an engaging UGC-style unboxing and review video.",
    tags: ["UGC", "Tech", "Unboxing"],
    type: "video",
    niche: "ugc",
    orientation: "vertical",
  },
  
  // Promo Videos (vertical)
  {
    id: "yeloquest-promo",
    title: "Yelo Quest",
    subtitle: "Scale Social Media with Smart Ads",
    description: "Engaging promo video for an AI-powered social media advertising platform.",
    fullDescription: "Produced a dynamic, conversion-focused promo video for Yelo Quest.",
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
    fullDescription: "Produced a vibrant, conversion-focused promo video for Prep Cart.",
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
    fullDescription: "Produced a sleek, conversion-focused promo video for Afiam.",
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
    fullDescription: "Produced a vibrant, conversion-focused promo video for Zenera.",
    tags: ["Promo Video", "Productivity", "Mobile App"],
    type: "video",
    niche: "social-media-ads",
    orientation: "vertical",
    videoUrl: zeneraVideo,
    thumbnail: zeneraThumbnail,
  },
  
  // Content Repurposing (vertical)
  {
    id: "business-scaling-tips",
    title: "Business Scaling Tips",
    subtitle: "How to Scale an Airbnb Business",
    description: "Repurposed long-form content into a punchy vertical short on scaling an Airbnb business.",
    fullDescription: "Transformed long-form business content into an engaging short-form vertical video.",
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
    fullDescription: "Repurposed a 60-minute marketing webinar into engaging short-form videos.",
    tags: ["Content Repurposing", "Webinar", "Marketing"],
    type: "video",
    niche: "content-repurposing",
    orientation: "vertical",
  },
];

export const allProjects = [...videoProjects];
