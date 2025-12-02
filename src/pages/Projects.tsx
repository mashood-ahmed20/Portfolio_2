import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Code, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  videoProjects, 
  softwareProjects, 
  videoNicheLabels, 
  VideoNiche, 
  Project 
} from "@/data/projectsData";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedNiches, setExpandedNiches] = useState<Record<VideoNiche, boolean>>({
    "app-promos": true,
    "website-promos": true,
    "screencast": true,
    "ugc": true,
    "social-media-ads": true,
    "content-repurposing": true,
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const toggleNiche = (niche: VideoNiche) => {
    setExpandedNiches(prev => ({
      ...prev,
      [niche]: !prev[niche],
    }));
  };

  const getProjectsByNiche = (niche: VideoNiche) => {
    return videoProjects.filter(p => p.niche === niche);
  };

  const niches: VideoNiche[] = [
    "app-promos",
    "website-promos",
    "screencast",
    "ugc",
    "social-media-ads",
    "content-repurposing",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="font-heading font-bold text-xl">All Projects</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            Complete <span className="gradient-text">Project Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore my complete portfolio of video production and software development projects.
          </p>
        </div>

        {/* Video Projects Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Video Related Projects</h3>
              <p className="text-muted-foreground text-sm">Creative video production work across various niches</p>
            </div>
          </div>

          {/* Video Niches */}
          <div className="space-y-8">
            {niches.map((niche) => {
              const projects = getProjectsByNiche(niche);
              if (projects.length === 0) return null;

              return (
                <div key={niche} className="glass-card p-6">
                  {/* Niche Header */}
                  <button
                    onClick={() => toggleNiche(niche)}
                    className="w-full flex items-center justify-between mb-4 group"
                  >
                    <h4 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {videoNicheLabels[niche]}
                      <span className="ml-2 text-sm text-muted-foreground font-normal">
                        ({projects.length} projects)
                      </span>
                    </h4>
                    {expandedNiches[niche] ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </button>

                  {/* Carousel */}
                  {expandedNiches[niche] && (
                    <ProjectCarousel 
                      projects={projects} 
                      onProjectClick={handleProjectClick} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Software Projects Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Software/Development Projects</h3>
              <p className="text-muted-foreground text-sm">Full-stack web applications and custom solutions</p>
            </div>
          </div>

          {/* Software Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="glass-card overflow-hidden group cursor-pointer hover-lift"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ExternalLink className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-accent mb-2">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
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
        </section>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Interested in working together?</p>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/#contact">
              Get In Touch
              <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Projects;
