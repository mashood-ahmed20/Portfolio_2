import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AskStellarAi",
    subtitle: "Personal Health Insurance Assistant",
    description: "Created promotional and screencast videos showcasing AI-powered health insurance guidance platform.",
    tags: ["Promo Video", "Screencast", "AI Platform"],
    type: "creative",
  },
  {
    title: "ChefShot Ai Pro",
    subtitle: "AI-Enhanced Food Photography",
    description: "Produced engaging promotional video highlighting AI-powered food photography enhancement features.",
    tags: ["Promo Video", "Motion Graphics", "AI"],
    type: "creative",
  },
  {
    title: "ArmsAI",
    subtitle: "Risk Assessment Agent",
    description: "Designed professional, futuristic motion graphics for an AI-powered risk assessment platform.",
    tags: ["Motion Graphics", "Futuristic", "AI"],
    type: "creative",
  },
  {
    title: "Astrolabe Platform",
    subtitle: "All-in-one Seafarer Platform",
    description: "Crafted smooth UI animations and seamless transitions for a comprehensive maritime platform.",
    tags: ["UI Animation", "Web Platform", "Transitions"],
    type: "technical",
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
            A selection of my recent work showcasing the blend of creative and technical expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card overflow-hidden group hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      {project.type === "creative" ? (
                        <Play className="w-8 h-8 text-primary" />
                      ) : (
                        <ExternalLink className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Project Preview</span>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

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
                    project.type === "creative" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-accent/10 text-accent"
                  }`}>
                    {project.type === "creative" ? "Creative" : "Technical"}
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
            <a href="#contact">
              Want to see more? Let's talk
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
