import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Project } from "@/data/projectsData";
import { useRef, useState } from "react";

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectCarousel = ({ projects, onProjectClick }: ProjectCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center transition-all duration-300 ${
          canScrollLeft 
            ? "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground" 
            : "opacity-0 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center transition-all duration-300 ${
          canScrollRight 
            ? "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground" 
            : "opacity-0 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectClick(project)}
            className="flex-shrink-0 w-72 glass-card overflow-hidden group cursor-pointer hover-lift"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary overflow-hidden">
              {project.videoUrl ? (
                <>
                  <video
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {project.title}
              </h4>
              <p className="text-sm text-primary truncate">{project.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
