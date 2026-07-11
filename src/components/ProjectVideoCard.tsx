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
  const playingRef = useRef(false);

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

  // Keep ref in sync to avoid stale closures
  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);

  // Lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-pause when out of view (skip if fullscreen)
  useEffect(() => {
    if (!isPlaying) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && !document.fullscreenElement) {
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
    const onTimeUpdate = () => { if (!isSeeking) setCurrentTime(video.currentTime); };
    const onLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("durationchange", onLoadedMetadata);
    return () => { video.removeEventListener("timeupdate", onTimeUpdate); video.removeEventListener("loadedmetadata", onLoadedMetadata); video.removeEventListener("durationchange", onLoadedMetadata); };
  }, [isSeeking, isVisible]);

  // Fullscreen change — handle both standard and webkit, restore scroll
  useEffect(() => {
    const handleFsChange = () => {
      const inFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(inFs);
      if (!inFs) {
        // Restore body scroll on exit
        document.body.style.overflow = "";
        // Preserve play/pause state — don't auto-resume
        setShowControls(true);
      } else {
        document.body.style.overflow = "hidden";
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  // Sync isPlaying with actual video state (prevents desync on mobile)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => { video.removeEventListener("play", onPlay); video.removeEventListener("pause", onPause); };
  }, [isVisible]);

  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => { if (!isSeeking) setShowControls(false); }, 3000);
  }, [isSeeking]);

  useEffect(() => { return () => unregister(project.id); }, [project.id, unregister]);

  const togglePlay = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!project.videoUrl || !videoRef.current) return;
    const video = videoRef.current;
    if (playingRef.current) {
      video.pause();
      setShowControls(true);
    } else {
      registerPlay(project.id, () => { videoRef.current?.pause(); });
      setShowPoster(false);
      video.play().catch(() => {});
      resetHideTimer();
    }
  }, [project.videoUrl, project.id, resetHideTimer, registerPlay]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) { setVolume(0.5); videoRef.current.volume = 0.5; }
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) { videoRef.current.volume = val; videoRef.current.muted = val === 0; setIsMuted(val === 0); }
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
    const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (fsEl) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((vid as any)?.webkitEnterFullscreen) {
      (vid as any).webkitEnterFullscreen();
    }
  }, []);

  const handleVideoEnd = () => { setIsPlaying(false); setShowPoster(!!project.thumbnail); setShowControls(false); };
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleMouseMove = () => { if (isPlaying) resetHideTimer(); };
  const handleTouchStart = (e: React.TouchEvent) => { if (isPlaying) { e.stopPropagation(); resetHideTimer(); } };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative rounded-xl overflow-hidden border border-border transition-all duration-500 ease-out bg-card/40"
      style={{
        animationDelay: `${index * 80}ms`,
        borderColor: isHovered ? "hsl(355 100% 65% / 0.3)" : undefined,
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 60px -15px hsl(355 100% 65% / 0.15)"
          : "0 4px 20px -8px hsl(0 0% 0% / 0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
    >
      <div
        ref={videoContainerRef}
        className={`relative overflow-hidden ${
          isFullscreen ? "!aspect-auto w-screen h-screen bg-black flex items-center justify-center"
            : `${isVertical ? "aspect-[9/16]" : "aspect-video"}`
        }`}
        style={{ background: "hsl(0 0% 9%)" }}
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
            {...({ "webkit-playsinline": "" } as any)}
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
            src={project.thumbnail} alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
          />
        )}

        {!project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-2">
                <Play className="w-5 h-5 text-primary/60 ml-0.5" />
              </div>
              <span className="text-[11px] text-muted-foreground/60">Coming Soon</span>
            </div>
          </div>
        )}

        {project.videoUrl && !isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              /* Subtle gradient visible on both light and dark video content */
              background: isHovered
                ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)"
                : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
            }}
            onClick={togglePlay}
          >
            <div
              className="rounded-full flex items-center justify-center transition-all duration-300 bg-primary"
              style={{
                width: isVertical ? "48px" : "56px",
                height: isVertical ? "48px" : "56px",
                transform: isHovered ? "scale(1.15)" : "scale(1)",
              }}
            >
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[11px] text-foreground/60 font-medium tracking-wide uppercase">Click to play</p>
            </div>
          </div>
        )}

        {project.videoUrl && isPlaying && (
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} onTouchEnd={togglePlay} style={{ pointerEvents: "auto" }} />
        )}

        {project.videoUrl && isPlaying && (
          <div
            className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ background: "linear-gradient(to top, hsl(0 0% 6% / 0.8), transparent)", pointerEvents: showControls ? "auto" : "none" }}
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-1.5 mb-2 cursor-pointer rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/20" />
              <div className="absolute top-0 left-0 h-full rounded-full bg-[#007AFF] transition-[width] duration-75" style={{ width: `${progress}%` }} />
              <input type="range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={handleSeek}
                onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)}
                onTouchStart={() => setIsSeeking(true)} onTouchEnd={() => setIsSeeking(false)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors touch-manipulation">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <span className="text-[10px] text-white/70 font-mono tabular-nums select-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-1 group/vol">
                <button onClick={toggleMute} className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors touch-manipulation">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume} onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-0 group-hover/vol:w-14 transition-all duration-200 accent-[#007AFF] h-0.5 cursor-pointer opacity-0 group-hover/vol:opacity-100" />
              </div>
              <button onClick={toggleFullscreen} className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors touch-manipulation">
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-3.5">
        <h4 className="font-heading font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{project.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-medium bg-primary/10 text-primary/70 border border-primary/15">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectVideoCard;
