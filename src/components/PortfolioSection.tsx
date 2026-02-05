import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import VideoPlayer from "@/components/VideoPlayer";
import { Project } from "@/data/projectsData";
import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.png";

const featuredProjects: Project[] = [
  {
    id: "askstellar-featured",
    title: "AskStellarAi",
    subtitle: "Personal Health Insurance Assistant",
    description: "Created promotional and screencast videos showcasing AI-powered health insurance guidance platform.",
    fullDescription: "Created a compelling promotional video for AskStellarAi, an innovative AI-powered health insurance guidance platform. The video highlights key features including personalized recommendations, instant answers, and seamless user experience through dynamic motion graphics and engaging storytelling.",
    tags: ["Promo Video", "Screencast", "AI Platform"],
    type: "video",
    videoUrl: askStellarVideo,
    thumbnail: askStellarThumbnail,
  },
  {
    id: "chefshot-featured",
    title: "ChefShot Ai Pro",
    subtitle: "AI-Enhanced Food Photography",
    description: "Produced engaging promotional video highlighting AI-powered food photography enhancement features.",
    fullDescription: "Produced a visually stunning promotional video for ChefShot Ai Pro, showcasing how the app transforms ordinary food photos into professional-grade images using AI enhancement. The video demonstrates before/after comparisons and key app features through smooth transitions and appetizing visuals.",
    tags: ["Promo Video", "Motion Graphics", "AI"],
    type: "video",
  },
  {
    id: "armsai-featured",
    title: "ArmsAI",
    subtitle: "Risk Assessment Agent",
    description: "Designed professional, futuristic motion graphics for an AI-powered risk assessment platform.",
    fullDescription: "Designed a futuristic, attention-grabbing promotional content for ArmsAI, an AI-powered risk assessment platform. The content features bold motion graphics, impactful messaging, and professional visual design that communicates the platform's advanced capabilities.",
    tags: ["Motion Graphics", "Futuristic", "AI"],
    type: "video",
  },
  {
    id: "astrolabe-featured",
    title: "Astrolabe Platform",
    subtitle: "All-in-one Seafarer Platform",
    description: "Crafted smooth UI animations and seamless transitions for a comprehensive maritime platform.",
    fullDescription: "Crafted a professional promotional video for Astrolabe, a comprehensive maritime platform for seafarers. The video highlights the platform's features including job listings, certification management, and community features through smooth UI animations and professional narration.",
    tags: ["UI Animation", "Web Platform", "Transitions"],
    type: "software",
  },
];

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
            A selection of my recent work showcasing the blend of creative and technical expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden group hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Thumbnail */}
              {project.videoUrl ? (
                <VideoPlayer
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  className="aspect-video"
                  thumbnailMode
                  onContainerClick={() => handleProjectClick(project)}
                />
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <ExternalLink className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">Click to View Details</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary">{project.subtitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.type === "video" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-accent/10 text-accent"
                  }`}>
                    {project.type === "video" ? "Creative" : "Technical"}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PortfolioSection;
