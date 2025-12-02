import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Freelance Projects
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Merging{" "}
              <span className="gradient-text glow-text">Motion Design</span>
              <br />
              with <span className="gradient-text glow-text">MERN Stack</span>
              <br />
              Innovation
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Hi, I'm Mashood Ahmed, a passionate Video Editor, Motion Designer, and Web Developer. 
              I specialize in creating high-quality digital content that helps brands, startups, 
              and creators stand out online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <a href="#portfolio">
                  View Portfolio
                  <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#contact">
                  <Play className="mr-2" size={18} />
                  Let's Talk
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 md:gap-12 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">70+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">100+</div>
                <div className="text-sm text-muted-foreground">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110 animate-pulse-glow" />
              
              {/* Image Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-box">
                <img 
                  src={profilePhoto} 
                  alt="Mashood Ahmed - Video Editor, Motion Designer & Web Developer" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass-card animate-float">
                <span className="text-sm font-medium">🎬 Motion Designer</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl glass-card animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="text-sm font-medium">💻 MERN Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
