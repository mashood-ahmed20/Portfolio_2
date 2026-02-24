import { useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  videoProjects,
  softwareProjects,
  videoNicheLabels,
  VideoNiche,
  Project,
} from "@/data/projectsData";
import ProjectVideoCard from "@/components/ProjectVideoCard";

const verticalNiches: VideoNiche[] = ["ugc", "social-media-ads", "content-repurposing"];
const horizontalNiches: VideoNiche[] = ["app-promos", "website-promos", "screencast"];

/* ─── Scroll Reveal wrapper ─── */
const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollReveal(0.08);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Mobile horizontal slider ─── */
const MobileScrollWrapper = ({ children, isVertical }: { children: React.ReactNode; isVertical: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = isVertical ? 180 : scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  }, [isVertical]);

  if (!isVertical) return <>{children}</>;

  return (
    <div className="relative group/slider">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/90 border border-border/40 flex items-center justify-center md:hidden shadow-lg backdrop-blur-md hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/90 border border-border/40 flex items-center justify-center md:hidden shadow-lg backdrop-blur-md hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 md:overflow-visible md:pb-0 px-1 md:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

/* ─── Niche Section ─── */
const NicheSection = ({ niche, projects }: { niche: VideoNiche; projects: Project[] }) => {
  const isVertical = projects[0]?.orientation === "vertical";

  return (
    <RevealSection>
      <div id={`niche-${niche}`} className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full bg-primary" />
          <h4 className="text-base font-heading font-semibold text-foreground tracking-tight">
            {videoNicheLabels[niche]}
          </h4>
          <span className="text-xs text-muted-foreground/50 font-mono">
            ({projects.length})
          </span>
        </div>
        {isVertical ? (
          <MobileScrollWrapper isVertical>
            {projects.map((project, i) => (
              <div key={project.id} className="w-[170px] flex-shrink-0 snap-start md:w-auto md:flex-shrink">
                <ProjectVideoCard project={project} index={i} />
              </div>
            ))}
          </MobileScrollWrapper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectVideoCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </RevealSection>
  );
};

/* ─── Portfolio Page ─── */
const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const getProjectsByNiche = (niche: VideoNiche) =>
    videoProjects.filter((p) => p.niche === niche);

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget) {
      setTimeout(() => {
        document.getElementById(`niche-${scrollTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Hero Banner (Zaverse-inspired) ─── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10 opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground/50 text-xs uppercase tracking-[0.2em] mb-6">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>·</span>
            <span className="text-foreground/70">Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
            <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-muted-foreground/60 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Browse vertical Reels/Shorts and horizontal promos — click any card to watch instantly.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 pb-16">
        {/* ─── Reels / Shorts ─── */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight">Reels / Shorts</h2>
              <p className="text-muted-foreground/50 text-xs mt-0.5">Vertical format content (9:16)</p>
            </div>
          </div>
          <div className="space-y-12">
            {verticalNiches.map((niche) => {
              const projects = getProjectsByNiche(niche);
              if (projects.length === 0) return null;
              return <NicheSection key={niche} niche={niche} projects={projects} />;
            })}
          </div>
        </RevealSection>

        {/* ─── Horizontal Videos ─── */}
        <RevealSection className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight">Promos & Screencasts</h2>
              <p className="text-muted-foreground/50 text-xs mt-0.5">Horizontal format content (16:9)</p>
            </div>
          </div>
          <div className="space-y-12">
            {horizontalNiches.map((niche) => {
              const projects = getProjectsByNiche(niche);
              if (projects.length === 0) return null;
              return <NicheSection key={niche} niche={niche} projects={projects} />;
            })}
          </div>
        </RevealSection>

        {/* ─── Software Projects ─── */}
        <RevealSection>
          <section id="niche-software" className="scroll-mt-24 mb-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight">Software Projects</h2>
                <p className="text-muted-foreground/50 text-xs mt-0.5">Full-stack web applications</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {softwareProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden bg-card/40 border border-border/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(174_80%_50%/0.15)]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-secondary/80 to-card overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <ExternalLink className="w-5 h-5 text-accent/70" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-heading font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-accent/60 mt-0.5">{project.subtitle}</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-1.5 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium bg-secondary text-muted-foreground/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ─── CTA ─── */}
        <RevealSection className="text-center mt-20">
          <p className="text-muted-foreground/50 text-sm mb-5">Interested in working together?</p>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="/#contact">Get In Touch</a>
          </Button>
        </RevealSection>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Portfolio;
