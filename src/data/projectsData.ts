export type VideoNiche = 
  | "app-promos" 
  | "website-promos" 
  | "screencast" 
  | "ugc" 
  | "social-media-ads" 
  | "content-repurposing";

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
  videoUrl?: string;
  images?: string[];
  thumbnail?: string;
}

export const videoNicheLabels: Record<VideoNiche, string> = {
  "app-promos": "App Promos",
  "website-promos": "Website Promos",
  "screencast": "Screencast Videos",
  "ugc": "UGC Videos",
  "social-media-ads": "Social Media Ads",
  "content-repurposing": "Content Repurposing",
};

import askStellarVideo from "@/assets/askstellar-video.mp4";

export const videoProjects: Project[] = [
  // App Promos
  {
    id: "askstellar-promo",
    title: "AskStellarAi",
    subtitle: "Personal Health Insurance Assistant",
    description: "Dynamic app promo showcasing AI-powered health insurance guidance.",
    fullDescription: "Created a compelling promotional video for AskStellarAi, an innovative AI-powered health insurance guidance platform. The video highlights key features including personalized recommendations, instant answers, and seamless user experience through dynamic motion graphics and engaging storytelling.",
    tags: ["App Promo", "AI Platform", "Motion Graphics"],
    type: "video",
    niche: "app-promos",
    videoUrl: askStellarVideo,
  },
  {
    id: "chefshot-promo",
    title: "ChefShot Ai Pro",
    subtitle: "AI-Enhanced Food Photography",
    description: "Engaging promo highlighting AI food photography features.",
    fullDescription: "Produced a visually stunning promotional video for ChefShot Ai Pro, showcasing how the app transforms ordinary food photos into professional-grade images using AI enhancement. The video demonstrates before/after comparisons and key app features through smooth transitions and appetizing visuals.",
    tags: ["App Promo", "AI", "Food Tech"],
    type: "video",
    niche: "app-promos",
  },
  {
    id: "fitness-app-promo",
    title: "FitTrack Pro",
    subtitle: "Personal Fitness Companion",
    description: "Energetic promo for a fitness tracking application.",
    fullDescription: "Designed an energetic and motivational promotional video for FitTrack Pro, a comprehensive fitness tracking app. The video showcases workout tracking, progress analytics, and social features through dynamic motion graphics and high-energy pacing.",
    tags: ["App Promo", "Fitness", "Health Tech"],
    type: "video",
    niche: "app-promos",
  },
  
  // Website Promos
  {
    id: "astrolabe-promo",
    title: "Astrolabe Platform",
    subtitle: "All-in-one Seafarer Platform",
    description: "Professional website promo for maritime platform.",
    fullDescription: "Crafted a professional promotional video for Astrolabe, a comprehensive maritime platform for seafarers. The video highlights the platform's features including job listings, certification management, and community features through smooth UI animations and professional narration.",
    tags: ["Website Promo", "Maritime", "B2B"],
    type: "video",
    niche: "website-promos",
  },
  {
    id: "ecommerce-promo",
    title: "ShopFlow",
    subtitle: "Modern E-commerce Platform",
    description: "Sleek website promo showcasing e-commerce features.",
    fullDescription: "Created a sleek promotional video for ShopFlow, a modern e-commerce platform. The video demonstrates the seamless shopping experience, payment integration, and admin dashboard through elegant screen recordings and motion graphics.",
    tags: ["Website Promo", "E-commerce", "SaaS"],
    type: "video",
    niche: "website-promos",
  },
  
  // Screencast Videos
  {
    id: "askstellar-screencast",
    title: "AskStellarAi Tutorial",
    subtitle: "Platform Walkthrough",
    description: "Comprehensive screencast tutorial for AI platform.",
    fullDescription: "Produced a detailed screencast tutorial for AskStellarAi, walking users through the platform's features step by step. The video includes voiceover narration, cursor highlights, and helpful annotations to guide new users through the onboarding process.",
    tags: ["Screencast", "Tutorial", "AI Platform"],
    type: "video",
    niche: "screencast",
  },
  {
    id: "saas-demo",
    title: "ProjectHub Demo",
    subtitle: "Project Management Walkthrough",
    description: "In-depth demo of project management software.",
    fullDescription: "Created an in-depth screencast demonstration of ProjectHub, a project management platform. The video covers all major features including task management, team collaboration, and reporting through clear screen recordings with professional narration.",
    tags: ["Screencast", "Demo", "SaaS"],
    type: "video",
    niche: "screencast",
  },
  
  // UGC Videos
  {
    id: "skincare-ugc",
    title: "GlowUp Skincare",
    subtitle: "Product Review Style",
    description: "Authentic UGC-style video for skincare brand.",
    fullDescription: "Produced an authentic user-generated content style video for GlowUp Skincare. The video features a natural, relatable presentation style that resonates with social media audiences while highlighting product benefits and results.",
    tags: ["UGC", "Skincare", "D2C"],
    type: "video",
    niche: "ugc",
  },
  {
    id: "tech-ugc",
    title: "TechGadget Unboxing",
    subtitle: "Product Showcase",
    description: "Engaging UGC unboxing and review video.",
    fullDescription: "Created an engaging UGC-style unboxing and review video for a tech gadget. The authentic presentation style builds trust with viewers while showcasing product features in a relatable, social-media-friendly format.",
    tags: ["UGC", "Tech", "Unboxing"],
    type: "video",
    niche: "ugc",
  },
  
  // Social Media Ads
  {
    id: "armsai-ad",
    title: "ArmsAI",
    subtitle: "Risk Assessment Agent",
    description: "Futuristic social ad for AI risk platform.",
    fullDescription: "Designed a futuristic, attention-grabbing social media advertisement for ArmsAI, an AI-powered risk assessment platform. The ad features bold motion graphics, impactful messaging, and a strong call-to-action optimized for social media engagement.",
    tags: ["Social Ad", "AI", "B2B"],
    type: "video",
    niche: "social-media-ads",
  },
  {
    id: "fashion-ad",
    title: "Urban Style Co",
    subtitle: "Fashion Brand Campaign",
    description: "Trendy social media ad for fashion brand.",
    fullDescription: "Created a trendy, scroll-stopping social media advertisement for Urban Style Co. The ad combines dynamic product shots, trending music, and engaging transitions optimized for Instagram and TikTok platforms.",
    tags: ["Social Ad", "Fashion", "D2C"],
    type: "video",
    niche: "social-media-ads",
  },
  
  // Content Repurposing
  {
    id: "podcast-clips",
    title: "Tech Talk Podcast",
    subtitle: "Long-form to Short-form",
    description: "Repurposed podcast content for social media.",
    fullDescription: "Transformed long-form podcast content into engaging short-form clips for social media distribution. The project involved identifying key moments, adding captions, creating eye-catching visuals, and optimizing for different platform specifications.",
    tags: ["Content Repurposing", "Podcast", "Social Media"],
    type: "video",
    niche: "content-repurposing",
  },
  {
    id: "webinar-shorts",
    title: "Marketing Masterclass",
    subtitle: "Webinar Highlights",
    description: "Webinar content repurposed into bite-sized clips.",
    fullDescription: "Repurposed a 60-minute marketing webinar into a series of engaging short-form videos. Each clip focuses on a specific insight or tip, with added graphics, captions, and hooks optimized for social media engagement.",
    tags: ["Content Repurposing", "Webinar", "Marketing"],
    type: "video",
    niche: "content-repurposing",
  },
];

export const softwareProjects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack MERN Application",
    description: "Complete e-commerce solution with payment integration.",
    fullDescription: "Built a comprehensive e-commerce platform using the MERN stack. Features include user authentication, product catalog, shopping cart, Stripe payment integration, order management, and admin dashboard. The application is fully responsive and optimized for performance.",
    tags: ["MERN Stack", "E-commerce", "Stripe", "MongoDB"],
    type: "software",
    images: [],
  },
  {
    id: "task-management",
    title: "TaskFlow",
    subtitle: "Project Management Tool",
    description: "Collaborative task management application.",
    fullDescription: "Developed a collaborative project management tool with real-time updates using Socket.io. Features include kanban boards, task assignments, due dates, file attachments, and team chat. Built with React, Node.js, and MongoDB.",
    tags: ["MERN Stack", "Real-time", "Socket.io", "Collaboration"],
    type: "software",
    images: [],
  },
  {
    id: "healthcare-portal",
    title: "MediCare Portal",
    subtitle: "Healthcare Management System",
    description: "Patient management system for healthcare providers.",
    fullDescription: "Created a comprehensive healthcare management portal for clinics and hospitals. Features include patient records, appointment scheduling, prescription management, and billing. Built with Java Spring Boot backend and React frontend.",
    tags: ["Java", "Spring Boot", "React", "Healthcare"],
    type: "software",
    images: [],
  },
  {
    id: "inventory-system",
    title: "StockSync",
    subtitle: "Inventory Management System",
    description: "Real-time inventory tracking solution.",
    fullDescription: "Built a real-time inventory management system for retail businesses. Features include stock tracking, automatic reorder alerts, supplier management, and detailed analytics. Developed using Java backend with React frontend.",
    tags: ["Java", "React", "MySQL", "Analytics"],
    type: "software",
    images: [],
  },
  {
    id: "social-platform",
    title: "ConnectHub",
    subtitle: "Social Networking Platform",
    description: "Feature-rich social networking application.",
    fullDescription: "Developed a full-featured social networking platform with user profiles, posts, comments, likes, friend connections, and real-time messaging. Built with the MERN stack and optimized for scalability.",
    tags: ["MERN Stack", "Social Media", "Real-time", "MongoDB"],
    type: "software",
    images: [],
  },
];

export const allProjects = [...videoProjects, ...softwareProjects];
