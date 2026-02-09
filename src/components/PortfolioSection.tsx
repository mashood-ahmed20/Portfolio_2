import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectVideoCard from "@/components/ProjectVideoCard";
import { Project } from "@/data/projectsData";
import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.png";

const featuredVertical: Project[] = [
  {
    id: "skincare-ugc-feat",
    title: "GlowUp Skincare",
    subtitle: "UGC Product Review",
    description: "",
    fullDescription: "",
    tags: ["UGC", "Skincare"],
    type: "video",
    orientation: "vertical",
  },
  {
    id: "armsai-feat",
    title: "ArmsAI",
    subtitle: "Social Media Ad",
    description: "",
    fullDescription: "",
    tags: ["Social Ad", "AI"],
    type: "video",
    orientation: "vertical",
  },
  {
    id: "podcast-feat",
    title: "Tech Talk Podcast",
    subtitle: "Content Repurposing",
    description: "",
    fullDescription: "",
    tags: ["Repurposing", "Podcast"],
    type: "video",
    orientation: "vertical",
  },
];

const featuredHorizontal: Project[] = [
  {
    id: "askstellar-feat",
    title: "AskStellarAi",
    subtitle: "Health Insurance Assistant",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "AI"],
    type: "video",
    orientation: "horizontal",
    videoUrl: askStellarVideo,
    thumbnail: askStellarThumbnail,
  },
  {
    id: "chefshot-feat",
    title: "ChefShot Ai Pro",
    subtitle: "AI Food Photography",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "AI"],
    type: "video",
    orientation: "horizontal",
  },
  {
    id: "astrolabe-feat",
    title: "Astrolabe Platform",
    subtitle: "Seafarer Platform",
    description: "",
    fullDescription: "",
    tags: ["Website Promo", "B2B"],
    type: "video",
    orientation: "horizontal",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">My Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of recent work across vertical and horizontal formats.
          </p>
        </div>

        <div id="all-projects" className="scroll-mt-24" />

        {/* Reels / Shorts Section */}
        <div className="mb-14">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">▶</span>
            Reels / Shorts
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {featuredVertical.map((project) => (
              <div key={project.id} className="min-w-[200px] snap-start md:min-w-0">
                <ProjectVideoCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Videos Section */}
        <div className="mb-12">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">▶</span>
            Promos & Screencasts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredHorizontal.map((project) => (
              <ProjectVideoCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/projects">
              See All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
