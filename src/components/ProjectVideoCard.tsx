import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectVideoCardProps {
  project: Project;
}

const ProjectVideoCard = ({ project }: ProjectVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPoster, setShowPoster] = useState(!!project.thumbnail);

  const isVertical = project.orientation === "vertical";

  // Lazy loading via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-pause when scrolled out of view
  useEffect(() => {
    if (!isPlaying) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.videoUrl || !videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setShowPoster(false);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!project.thumbnail);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="group relative rounded-2xl overflow-hidden bg-card/60 border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(174_80%_50%/0.15)] cursor-pointer"
      onClick={togglePlay}
      onContextMenu={handleContextMenu}
    >
      {/* Video / Thumbnail Area */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-muted to-secondary ${
        isVertical ? "aspect-[9/16]" : "aspect-video"
      }`}>
        {/* Video Element */}
        {isVisible && project.videoUrl && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            controls={isPlaying}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onEnded={handleVideoEnd}
            onContextMenu={handleContextMenu}
            style={{ pointerEvents: isPlaying ? "auto" : "none" }}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Poster / Thumbnail */}
        {project.thumbnail && showPoster && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Placeholder for projects without video */}
        {!project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Play className="w-7 h-7 text-primary ml-0.5" />
              </div>
              <span className="text-xs text-muted-foreground">Coming Soon</span>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        {project.videoUrl && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? "opacity-0 hover:opacity-100 bg-black/0 hover:bg-black/20"
                : "opacity-100 bg-black/30 hover:bg-black/20"
            }`}
            onClick={togglePlay}
            style={{ pointerEvents: "auto" }}
          >
            <div className={`rounded-full bg-primary/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
              isVertical ? "w-14 h-14" : "w-16 h-16"
            } ${isPlaying ? "scale-75 opacity-80" : "scale-100"}`}>
              {isPlaying ? (
                <Pause className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-primary-foreground ml-0.5" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Info - Minimal */}
      <div className="p-4">
        <h4 className="font-heading font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">{project.subtitle}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] bg-secondary text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectVideoCard;
