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
  const [isVisible, setIsVisible] = useState(false);
  const [showPoster, setShowPoster] = useState(!!poster);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Lazy visibility detection
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
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (thumbnailMode && onContainerClick) {
      onContainerClick();
      return;
    }

    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Load video element on first click
    if (!videoLoaded) {
      setVideoLoaded(true);
      setShowPoster(false);
      // Wait for video element to mount then play
      requestAnimationFrame(() => {
        setTimeout(() => {
          videoRef.current?.play();
          setIsPlaying(true);
        }, 50);
      });
    } else if (videoRef.current) {
      setShowPoster(false);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!poster);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-card ${className}`}
      onClick={thumbnailMode ? onContainerClick : handlePlay}
      onContextMenu={handleContextMenu}
    >
      {/* Only render video element after user clicks play */}
      {isVisible && videoLoaded && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="none"
          controls={!thumbnailMode && isPlaying}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onEnded={handleVideoEnd}
          onContextMenu={handleContextMenu}
          style={{ pointerEvents: thumbnailMode ? "none" : "auto" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Poster / thumbnail shown until play */}
      {poster && showPoster && (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Placeholder when no poster */}
      {!videoLoaded && isVisible && !poster && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <Play className="w-10 h-10 text-muted-foreground/40" />
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

      {thumbnailMode && (
        <div className="absolute inset-0" style={{ pointerEvents: "auto" }} />
      )}
    </div>
  );
};

export default VideoPlayer;
