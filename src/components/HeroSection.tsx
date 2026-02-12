import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Social Icons - Left Side */}
      <div className="hidden md:flex flex-col gap-4 absolute left-6 bottom-1/4 z-20">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
          <Instagram size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
          <Linkedin size={18} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
          <Facebook size={18} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
          <Youtube size={18} />
        </a>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex-col text-center max-w-4xl mx-auto flex items-center justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground animate-fade-in mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for Freelance Projects
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold leading-relaxed md:leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="block whitespace-nowrap">Elevating <span className="gradient-text glow-text">Digital Experiences</span></span>
            <span className="block whitespace-nowrap">Through <span className="gradient-text glow-text">Content Repurposing</span></span>
            <span className="block whitespace-nowrap"><span className="gradient-text glow-text">Promo Videos</span> & Web Solutions</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Helping brands, startups, and creators transform ideas into visually powerful digital experiences through cinematic video editing, motion design, and modern web development
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/portfolio">
                View Portfolio
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact">
                <Play className="mr-2" size={18} />
                Let's Talk
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 pt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">100+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">1.5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">70+</div>
              <div className="text-sm text-muted-foreground">Projects Done</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
