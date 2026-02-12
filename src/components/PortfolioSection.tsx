import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectVideoCard from "@/components/ProjectVideoCard";
import { Project } from "@/data/projectsData";
import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.png";
import gridironVideo from "@/assets/gridiron-coaching-video.mp4";
import gridironThumbnail from "@/assets/gridiron-coaching-thumbnail.png";

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
    id: "gridiron-feat",
    title: "GridIron Coaching",
    subtitle: "College Football Simulation",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "Gaming"],
    type: "video",
    orientation: "horizontal",
    videoUrl: gridironVideo,
    thumbnail: gridironThumbnail,
  },
  {
    id: "influenceai-feat",
    title: "InfluenceAI",
    subtitle: "AI Growth Partner for Instagram",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "Social Media"],
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
            A selection of high-quality horizontal showcase work.
          </p>
        </div>

        <div id="all-projects" className="scroll-mt-24" />

        {/* 2×2 Horizontal Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredHorizontal.map((project) => (
              <ProjectVideoCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/portfolio">
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
