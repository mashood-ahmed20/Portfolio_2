import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  showPlayButton?: boolean;
  thumbnailMode?: boolean;
  onContainerClick?: () => void;
}

const VideoPlayer = ({
  src,
  poster,
  className = "",
  showPlayButton = true,
  thumbnailMode = false,
  onContainerClick,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPoster, setShowPoster] = useState(!!poster);

  // Lazy loading - only load video when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (thumbnailMode && onContainerClick) {
      onContainerClick();
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setShowPoster(false);
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!poster);
  };

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
  };

  // Disable right-click context menu on video
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-muted to-secondary ${className}`}
      onClick={thumbnailMode ? onContainerClick : handlePlay}
      onContextMenu={handleContextMenu}
    >
      {isVisible && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          controls={!thumbnailMode && isPlaying}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onEnded={handleVideoEnd}
          onLoadedMetadata={handleLoadedMetadata}
          onContextMenu={handleContextMenu}
          style={{ pointerEvents: thumbnailMode ? "none" : "auto" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Poster image */}
      {poster && showPoster && (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Loading placeholder - only show if no poster */}
      {!isLoaded && isVisible && !poster && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play button overlay */}
      {showPlayButton && (!isPlaying || thumbnailMode) && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-colors cursor-pointer ${
            thumbnailMode ? "bg-black/20 hover:bg-black/10" : "bg-black/30 hover:bg-black/20"
          }`}
          onClick={handlePlay}
        >
          <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </div>
        </div>
      )}

      {/* Invisible overlay to prevent download in thumbnail mode */}
      {thumbnailMode && (
        <div className="absolute inset-0" style={{ pointerEvents: "auto" }} />
      )}
    </div>
  );
};

export default VideoPlayer;
