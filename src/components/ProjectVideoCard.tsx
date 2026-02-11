import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectVideoCardProps {
  project: Project;
}

const ProjectVideoCard = ({ project }: ProjectVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showPoster, setShowPoster] = useState(!!project.thumbnail);

  const isVertical = project.orientation === "vertical";

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

  const togglePlay = useCallback((e: React.MouseEvent) => {
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
  }, [isPlaying, project.videoUrl]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const enterFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as any).webkitEnterFullscreen) {
      (videoRef.current as any).webkitEnterFullscreen();
    }
  }, []);

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
      onContextMenu={handleContextMenu}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-muted to-secondary ${
        isVertical ? "aspect-[9/16]" : "aspect-video"
      }`}>
        {isVisible && project.videoUrl && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            preload="metadata"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            onEnded={handleVideoEnd}
            onContextMenu={handleContextMenu}
            style={{ pointerEvents: "none" }}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        )}

        {project.thumbnail && showPoster && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

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

        {/* Play/Pause overlay */}
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

        {/* Bottom controls: mute + fullscreen */}
        {project.videoUrl && isPlaying && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10" style={{ pointerEvents: "auto" }}>
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              onClick={enterFullscreen}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4">
        <h4 className="font-heading font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">{project.subtitle}</p>
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
