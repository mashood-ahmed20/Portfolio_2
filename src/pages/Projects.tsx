import { Link } from "react-router-dom";
import { ArrowLeft, Play, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  videoProjects, 
  softwareProjects, 
  videoNicheLabels, 
  VideoNiche, 
  Project 
} from "@/data/projectsData";
import ProjectVideoCard from "@/components/ProjectVideoCard";

const verticalNiches: VideoNiche[] = ["ugc", "social-media-ads", "content-repurposing"];
const horizontalNiches: VideoNiche[] = ["app-promos", "website-promos", "screencast"];

const NicheSection = ({ niche, projects }: { niche: VideoNiche; projects: Project[] }) => {
  const isVertical = projects[0]?.orientation === "vertical";

  return (
    <div id={`niche-${niche}`} className="scroll-mt-24">
      <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
        {videoNicheLabels[niche]}
        <span className="ml-2 text-sm text-muted-foreground font-normal">
          ({projects.length})
        </span>
      </h4>
      {isVertical ? (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:overflow-visible md:pb-0">
          {projects.map((project) => (
            <div key={project.id} className="min-w-[180px] snap-start md:min-w-0">
              <ProjectVideoCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectVideoCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const getProjectsByNiche = (niche: VideoNiche) =>
    videoProjects.filter(p => p.niche === niche);

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
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse vertical Reels/Shorts and horizontal promos — click any card to watch instantly.
          </p>
        </div>

        {/* Reels / Shorts Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Reels / Shorts</h3>
              <p className="text-muted-foreground text-sm">Vertical format content (9:16)</p>
            </div>
          </div>

          <div className="space-y-10">
            {verticalNiches.map((niche) => {
              const projects = getProjectsByNiche(niche);
              if (projects.length === 0) return null;
              return <NicheSection key={niche} niche={niche} projects={projects} />;
            })}
          </div>
        </section>

        {/* Horizontal Videos Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Promos & Screencasts</h3>
              <p className="text-muted-foreground text-sm">Horizontal format content (16:9)</p>
            </div>
          </div>

          <div className="space-y-10">
            {horizontalNiches.map((niche) => {
              const projects = getProjectsByNiche(niche);
              if (projects.length === 0) return null;
              return <NicheSection key={niche} niche={niche} projects={projects} />;
            })}
          </div>
        </section>

        {/* Software Projects */}
        <section id="niche-software" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Software Projects</h3>
              <p className="text-muted-foreground text-sm">Full-stack web applications</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card overflow-hidden group cursor-pointer hover-lift"
              >
                <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ExternalLink className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-accent mb-2">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs bg-secondary text-muted-foreground">
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
    </div>
  );
};

export default Projects;
