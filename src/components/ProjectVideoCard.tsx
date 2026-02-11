import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectVideoCardProps {
  project: Project;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const ProjectVideoCard = ({ project }: ProjectVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showPoster, setShowPoster] = useState(!!project.thumbnail);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isVertical = project.orientation === "vertical";

  // Lazy load
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

  // Auto-pause when out of view
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

  // Time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (!isSeeking) setCurrentTime(video.currentTime);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onDurationChange = () => setDuration(video.duration);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("durationchange", onDurationChange);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("durationchange", onDurationChange);
    };
  }, [isSeeking, isVisible]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Auto-hide controls
  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => {
      if (!isSeeking) setShowControls(false);
    }, 3000);
  }, [isSeeking]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.videoUrl || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      setShowPoster(false);
      videoRef.current.play();
      setIsPlaying(true);
      resetHideTimer();
    }
  }, [isPlaying, project.videoUrl, resetHideTimer]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) videoRef.current.currentTime = val;
  }, []);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoContainerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!project.thumbnail);
    setShowControls(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  const handleMouseMove = () => {
    if (isPlaying) resetHideTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isPlaying) {
      e.stopPropagation();
      resetHideTimer();
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative rounded-2xl overflow-hidden bg-card/60 border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(174_80%_50%/0.15)]"
      onContextMenu={handleContextMenu}
    >
      <div
        ref={videoContainerRef}
        className={`relative overflow-hidden bg-gradient-to-br from-muted to-secondary ${
          isVertical ? "aspect-[9/16]" : "aspect-video"
        } ${isFullscreen ? "!aspect-auto w-full h-full" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (isPlaying && !isSeeking) setShowControls(false); }}
        onTouchStart={handleTouchStart}
      >
        {isVisible && project.videoUrl && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
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

        {/* Central play/pause overlay */}
        {project.videoUrl && !isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer"
            onClick={togglePlay}
          >
            <div className={`rounded-full bg-primary/90 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${
              isVertical ? "w-14 h-14" : "w-16 h-16"
            }`}>
              <Play className="w-7 h-7 text-primary-foreground ml-0.5" />
            </div>
          </div>
        )}

        {/* Clickable area when playing (for pause) */}
        {project.videoUrl && isPlaying && (
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={togglePlay}
            style={{ pointerEvents: "auto" }}
          />
        )}

        {/* Custom control bar */}
        {project.videoUrl && isPlaying && (
          <div
            className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: showControls ? "auto" : "none" }}
          >
            {/* Seek bar */}
            <div className="relative w-full h-1.5 group/seek mb-2.5 cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-white/20" />
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-primary transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                onMouseDown={() => setIsSeeking(true)}
                onMouseUp={() => setIsSeeking(false)}
                onTouchStart={() => setIsSeeking(true)}
                onTouchEnd={() => setIsSeeking(false)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ pointerEvents: "auto" }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Time */}
              <span className="text-[11px] text-white/80 font-mono tabular-nums select-none min-w-[70px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              {/* Volume */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-0 group-hover/vol:w-16 transition-all duration-200 accent-primary h-1 cursor-pointer opacity-0 group-hover/vol:opacity-100"
                />
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors"
                aria-label="Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
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
