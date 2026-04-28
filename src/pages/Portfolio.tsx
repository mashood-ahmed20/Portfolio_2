import { useEffect, useRef, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  videoProjects,
  videoNicheLabels,
  VideoNiche,
  Project,
} from "@/data/projectsData";
import ProjectVideoCard from "@/components/ProjectVideoCard";

const verticalNiches: VideoNiche[] = ["ugc", "social-media-ads", "content-repurposing"];
const horizontalNiches: VideoNiche[] = ["app-promos", "saas-explainer", "website-promos", "screencast"];

const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal(0.08);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)" }}>
      {children}
    </div>
  );
};

const MobileScrollWrapper = ({
  children,
  isVertical,
  desktopGridClass,
}: {
  children: React.ReactNode;
  isVertical: boolean;
  desktopGridClass?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = isVertical ? 180 : scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  }, [isVertical]);

  const desktopClasses =
    desktopGridClass ?? "md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5";

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full glass-card flex items-center justify-center md:hidden"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full glass-card flex items-center justify-center md:hidden"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div
        ref={scrollRef}
        className={`flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:overflow-visible md:pb-0 px-1 md:px-0 ${desktopClasses}`}
      >
        {children}
      </div>
    </div>
  );
};

const NicheSection = ({ niche, projects }: { niche: VideoNiche; projects: Project[] }) => {
  const isVertical = projects[0]?.orientation === "vertical";
  const PAGE_SIZE = 3;
  const INITIAL_COUNT = 6;
  const isPaginated = niche === "app-promos";
  const [visibleCount, setVisibleCount] = useState(isPaginated ? INITIAL_COUNT : projects.length);
  const visibleProjects = isPaginated ? projects.slice(0, visibleCount) : projects;
  const hasMore = isPaginated && visibleCount < projects.length;
  return (
    <RevealSection>
      <div id={`niche-${niche}`} className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full bg-primary" />
          <h4 className="text-base font-heading font-semibold text-foreground tracking-tight">{videoNicheLabels[niche]}</h4>
          <span className="text-xs text-muted-foreground/50 font-mono">({projects.length})</span>
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
          <>
            <MobileScrollWrapper
              isVertical={false}
              desktopGridClass="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5"
            >
              {visibleProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="w-[85vw] max-w-[360px] flex-shrink-0 snap-start md:w-auto md:max-w-none md:flex-shrink"
                >
                  <ProjectVideoCard project={project} index={i} />
                </div>
              ))}
            </MobileScrollWrapper>
            {hasMore && (
              <div className="hidden md:flex justify-center mt-8">
                <Button
                  variant="heroOutline"
                  size="lg"
                  onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, projects.length))}
                >
                  Show More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </RevealSection>
  );
};

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const getProjectsByNiche = (niche: VideoNiche) => videoProjects.filter((p) => p.niche === niche);

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget) {
      setTimeout(() => { document.getElementById(`niche-${scrollTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
    } else { window.scrollTo(0, 0); }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
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
        {/* Reels / Shorts */}
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

        {/* Horizontal Videos */}
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

        {/* CTA */}
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
