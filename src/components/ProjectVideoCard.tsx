import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { Project } from "@/data/projectsData";
import { useVideoPlayer } from "@/contexts/VideoPlayerContext";

interface ProjectVideoCardProps {
  project: Project;
  index?: number;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const ProjectVideoCard = ({ project, index = 0 }: ProjectVideoCardProps) => {
  const { registerPlay, unregister } = useVideoPlayer();
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
  const [isHovered, setIsHovered] = useState(false);

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
      { threshold: 0.1, rootMargin: "200px" }
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

  // Fullscreen change
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
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

  // Cleanup
  useEffect(() => {
    return () => unregister(project.id);
  }, [project.id, unregister]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.videoUrl || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      registerPlay(project.id, () => {
        videoRef.current?.pause();
        setIsPlaying(false);
        setShowControls(false);
      });
      setShowPoster(false);
      videoRef.current.play();
      setIsPlaying(true);
      resetHideTimer();
    }
  }, [isPlaying, project.videoUrl, project.id, resetHideTimer, registerPlay]);

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
    const vid = videoRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((vid as any)?.webkitEnterFullscreen) {
      (vid as any).webkitEnterFullscreen();
    }
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!project.thumbnail);
    setShowControls(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleMouseMove = () => { if (isPlaying) resetHideTimer(); };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isPlaying) { e.stopPropagation(); resetHideTimer(); }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative rounded-xl overflow-hidden bg-card/40 border border-border/30 transition-all duration-500 ease-out"
      style={{
        animationDelay: `${index * 80}ms`,
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 60px -15px hsl(174 80% 50% / 0.2), 0 0 0 1px hsl(174 80% 50% / 0.15)"
          : "0 4px 20px -8px hsl(0 0% 0% / 0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
    >
      <div
        ref={videoContainerRef}
        className={`relative overflow-hidden ${
          isFullscreen
            ? "!aspect-auto w-screen h-screen bg-black flex items-center justify-center"
            : `bg-gradient-to-br from-secondary/80 to-card ${isVertical ? "aspect-[9/16]" : "aspect-video"}`
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (isPlaying && !isSeeking) setShowControls(false); }}
        onTouchStart={handleTouchStart}
      >
        {isVisible && project.videoUrl && (
          <video
            ref={videoRef}
            className={`w-full h-full ${isFullscreen ? "object-contain" : "object-cover"}`}
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

        {/* Poster / Thumbnail */}
        {project.thumbnail && showPoster && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            loading="lazy"
          />
        )}

        {/* No video placeholder */}
        {!project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-card">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-2">
                <Play className="w-5 h-5 text-primary/60 ml-0.5" />
              </div>
              <span className="text-[11px] text-muted-foreground/60">Coming Soon</span>
            </div>
          </div>
        )}

        {/* Central play overlay — clean minimal button */}
        {project.videoUrl && !isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              background: isHovered
                ? "linear-gradient(to top, hsl(0 0% 0% / 0.5), hsl(0 0% 0% / 0.15))"
                : "linear-gradient(to top, hsl(0 0% 0% / 0.4), hsl(0 0% 0% / 0.1))",
            }}
            onClick={togglePlay}
          >
            <div
              className="rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_hsl(174_80%_50%/0.4)] transition-all duration-300"
              style={{
                width: isVertical ? "48px" : "56px",
                height: isVertical ? "48px" : "56px",
                transform: isHovered ? "scale(1.15)" : "scale(1)",
              }}
            >
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            </div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[11px] text-white/60 font-medium tracking-wide uppercase">
                Click to play
              </p>
            </div>
          </div>
        )}

        {/* Click area when playing */}
        {project.videoUrl && isPlaying && (
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} style={{ pointerEvents: "auto" }} />
        )}

        {/* Minimal control bar */}
        {project.videoUrl && isPlaying && (
          <div
            className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: showControls ? "auto" : "none" }}
          >
            {/* Seek bar */}
            <div className="relative w-full h-1 group/seek mb-2 cursor-pointer rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/15" />
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-[width] duration-75"
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
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-1.5">
              <button onClick={togglePlay} className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-primary transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <span className="text-[10px] text-white/60 font-mono tabular-nums select-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-1 group/vol">
                <button onClick={toggleMute} className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-primary transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min={0} max={1} step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-0 group-hover/vol:w-14 transition-all duration-200 accent-primary h-0.5 cursor-pointer opacity-0 group-hover/vol:opacity-100"
                />
              </div>
              <button onClick={toggleFullscreen} className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-primary transition-colors" aria-label="Fullscreen">
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card info — clean & minimal */}
      <div className="p-3.5">
        <h4 className="font-heading font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{project.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium bg-primary/8 text-primary/70 border border-primary/10"
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
