import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  showPlayButton?: boolean;
  thumbnailMode?: boolean;
  onContainerClick?: () => void;
}

const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({
  src,
  poster,
  className = "",
  showPlayButton = true,
  thumbnailMode = false,
  onContainerClick,
}: VideoPlayerProps) => {
  const videoRef       = useRef<HTMLVideoElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
  const hideTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef     = useRef(false);

  const [isPlaying,   setIsPlaying]   = useState(false);
  const [isMuted,     setIsMuted]     = useState(false);
  const [isVisible,   setIsVisible]   = useState(false);
  const [showPoster,  setShowPoster]  = useState(!!poster);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isSeeking,   setIsSeeking]   = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);

  // Lazy visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Time / metadata listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => { if (!isSeeking) setCurrentTime(video.currentTime); };
    const onMeta = () => setDuration(video.duration);
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("timeupdate",     onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("durationchange", onMeta);
    video.addEventListener("play",           onPlay);
    video.addEventListener("pause",          onPause);
    return () => {
      video.removeEventListener("timeupdate",     onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("durationchange", onMeta);
      video.removeEventListener("play",           onPlay);
      video.removeEventListener("pause",          onPause);
    };
  }, [isSeeking, videoLoaded]);

  // Fullscreen change
  useEffect(() => {
    const handleFs = () => {
      const inFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(inFs);
      if (!inFs) {
        document.body.style.overflow = "";
        setShowControls(true);
      } else {
        document.body.style.overflow = "hidden";
      }
    };
    document.addEventListener("fullscreenchange",        handleFs);
    document.addEventListener("webkitfullscreenchange",  handleFs);
    return () => {
      document.removeEventListener("fullscreenchange",       handleFs);
      document.removeEventListener("webkitfullscreenchange", handleFs);
    };
  }, []);

  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => {
      if (playingRef.current && !isSeeking) setShowControls(false);
    }, 3000);
  }, [isSeeking]);

  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    if (thumbnailMode && onContainerClick) { onContainerClick(); return; }

    const video = videoRef.current;
    if (!video) return;

    if (playingRef.current) {
      video.pause();
      setShowControls(true);
      return;
    }

    if (!videoLoaded) {
      setVideoLoaded(true);
      setShowPoster(false);
      requestAnimationFrame(() => {
        setTimeout(() => {
          videoRef.current?.play().catch(() => {});
          resetHideTimer();
        }, 50);
      });
    } else {
      setShowPoster(false);
      video.play().catch(() => {});
      resetHideTimer();
    }
  }, [thumbnailMode, onContainerClick, videoLoaded, resetHideTimer]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) videoRef.current.currentTime = val;
  }, []);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = containerRef.current;
    if (!el) return;
    const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (fsEl) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    }
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPoster(!!poster);
    setShowControls(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleMouseMove = () => { if (playingRef.current) resetHideTimer(); };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={thumbnailMode ? onContainerClick : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (playingRef.current && !isSeeking) setShowControls(false); }}
      onContextMenu={handleContextMenu}
    >
      {/* Video element — no native controls */}
      {isVisible && videoLoaded && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          preload="none"
          disablePictureInPicture
          onEnded={handleVideoEnd}
          onContextMenu={handleContextMenu}
          style={{ pointerEvents: "none", display: "block" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Poster / thumbnail */}
      {poster && showPoster && (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
        />
      )}

      {/* Placeholder when no poster and not yet loaded */}
      {!videoLoaded && isVisible && !poster && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Play className="w-10 h-10 text-gray-400 dark:text-gray-600" />
        </div>
      )}

      {/* Play button overlay — visible when paused / thumbnail mode */}
      {showPlayButton && (!isPlaying || thumbnailMode) && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300"
          style={{
            /* Subtle gradient — no hard opaque fill in either theme */
            background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
          }}
          onClick={handlePlay}
        >
          <div className="w-14 h-14 rounded-full bg-[#007AFF] hover:bg-[#005FCC] flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Invisible click-to-pause layer while playing */}
      {isPlaying && !thumbnailMode && (
        <div
          className="absolute inset-0"
          style={{ pointerEvents: "auto" }}
          onClick={handlePlay}
        />
      )}

      {/* Custom controls bar — shown while playing */}
      {!thumbnailMode && isPlaying && (
        <div
          className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
            pointerEvents: showControls ? "auto" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div className="relative w-full h-1.5 mb-2.5 cursor-pointer rounded-full overflow-hidden bg-white/20">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-[#007AFF] transition-[width] duration-75"
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
              aria-label="Seek"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={handlePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Time */}
            <span className="text-[11px] text-white/75 font-mono tabular-nums select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-[#007AFF] transition-colors"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
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
