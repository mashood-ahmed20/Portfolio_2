/**
 * WhatIDoSection — 2×2 project card grid with video lightbox modal.
 * Click a card → modal opens → video auto-plays with native controls.
 * Click outside modal or X button → modal closes.
 */
import { useState, useCallback, useEffect, memo, useRef } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { featuredProjects, type FeaturedProject } from "@/data/projects";

/* ── Video Modal / Lightbox ─────────────────────────────────────────────── */
interface ModalProps {
  project: FeaturedProject;
  onClose: () => void;
}

const VideoModal = memo(({ project, onClose }: ModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    /* Prevent body scroll while open */
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    /* Backdrop — click outside to close */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10
                 bg-black/85 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} video`}
      onClick={onClose}
    >
      {/* Modal panel — stop click bubbling */}
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 16:9 container */}
        <div className="aspect-video">
          <video
            ref={videoRef}
            src={project.videoUrl}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            className="w-full h-full"
            style={{ backgroundColor: "#000" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title bar below video */}
        <div className="px-5 py-4 flex items-center justify-between bg-gray-950 border-t border-gray-800">
          <div className="min-w-0 mr-4">
            <h3 className="text-white font-bold text-base truncate">{project.title}</h3>
            <p className="text-gray-400 text-xs mt-0.5 truncate">{project.subtitle}</p>
          </div>
          <span
            className="text-white text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.categoryColor }}
          >
            {project.category}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10
                     w-9 h-9 rounded-full
                     bg-black/60 hover:bg-black
                     flex items-center justify-center
                     transition-colors duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={18} className="text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});
VideoModal.displayName = "VideoModal";

/* ── Single project card ─────────────────────────────────────────────────── */
interface CardProps {
  project: FeaturedProject;
  index: number;
  onPlay: (project: FeaturedProject) => void;
}

const ProjectCard = memo(({ project, index, onPlay }: CardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    /* Open video modal */
    onPlay(project);
  };

  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/portfolio?scroll=${project.niche}`);
  };

  return (
    <div
      className="group rounded-xl overflow-hidden
                 focus-within:ring-2 focus-within:ring-[#007AFF]"
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        animation: `fadeSlideUp 0.55s ease-out ${index * 0.1}s forwards`,
      }}
    >
      {/* ── Thumbnail + hover overlay ── */}
      <button
        onClick={handleCardClick}
        className="relative block w-full h-72 sm:h-80 overflow-hidden bg-gray-100 dark:bg-gray-800
                   cursor-pointer focus:outline-none"
        aria-label={`Play ${project.title} video`}
      >
        <img
          src={project.thumbnail}
          alt={`${project.title} — ${project.subtitle}`}
          className="w-full h-full object-cover
                     transition-transform duration-500 ease-out
                     group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="inline-block text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            style={{ backgroundColor: project.categoryColor }}
          >
            {project.category}
          </span>
        </div>

        {/* Play button — centre, shown on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     bg-black/40 opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          <div
            className="w-16 h-16 rounded-full bg-[#007AFF] hover:bg-[#005FCC]
                       flex items-center justify-center shadow-xl
                       transition-colors duration-300
                       scale-90 group-hover:scale-100 transition-transform"
          >
            <Play size={26} className="text-white fill-white ml-1" aria-hidden="true" />
          </div>
        </div>

        {/* Gradient + info overlay on hover */}
        <div
          className="absolute inset-0
                     bg-gradient-to-t from-black/80 via-black/30 to-transparent
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300
                     flex flex-col justify-end p-5 pointer-events-none"
        >
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </button>

      {/* ── Card footer ── */}
      <div
        className="bg-white dark:bg-gray-900
                   border-t border-gray-100 dark:border-gray-800
                   px-5 py-4
                   transition-colors duration-200
                   group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-black dark:text-white text-base truncate">
              {project.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 truncate">
              {project.subtitle}
            </p>
          </div>

          {/* "View project" button — navigates to /portfolio */}
          <button
            onClick={handleViewProject}
            aria-label={`View ${project.title} project details`}
            className="flex items-center gap-1 text-xs font-semibold text-[#007AFF]
                       hover:text-[#005FCC] transition-colors duration-200
                       flex-shrink-0 mt-0.5 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#007AFF] rounded"
          >
            View
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

/* ── Section ─────────────────────────────────────────────────────────────── */
const WhatIDoSection = () => {
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);

  const openModal  = useCallback((p: FeaturedProject) => setActiveProject(p), []);
  const closeModal = useCallback(() => setActiveProject(null), []);

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: gridRef,   isVisible: gridVisible   } = useScrollReveal({ threshold: 0.05 });

  return (
    <>
      {/* Keyframe for staggered card entrance */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        video::-webkit-media-controls {
          background-color: rgba(0, 0, 0, 0.9);
        }
        video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.9);
        }
        video::-webkit-media-controls-time-remaining-display {
          color: white;
        }
        video::-webkit-media-controls-current-time-display {
          color: white;
        }
        video::-webkit-media-controls-volume-slider {
          background-color: rgba(255, 255, 255, 0.3);
        }
        video::-moz-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.9);
        }
      `}</style>

      <section
        id="what-i-do"
        className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-950"
        aria-labelledby="what-i-do-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header — full-width col-span-12 ── */}
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div
              ref={headerRef}
              className="col-span-12 text-center"
              style={{
                opacity:    headerVisible ? 1 : 0,
                transform:  headerVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              <span className="section-label">Featured Work</span>
              <h2
                id="what-i-do-heading"
                className="text-4xl lg:text-5xl font-bold text-black dark:text-white mt-3 mb-4"
              >
                What <span className="text-[#007AFF]">I Do</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
                Premium video editing &amp; motion design for SaaS founders, brands,
                and creators who demand results. Click any card to watch.
              </p>
            </div>
          </div>

          {/* ── Project cards — 2×2 grid ── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-12"
          >
            {gridVisible &&
              featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="col-span-1 md:col-span-3 lg:col-span-6"
                >
                  <ProjectCard project={project} index={index} onPlay={openModal} />
                </div>
              ))}
          </div>

          {/* ── CTA — full-width col-span-12 ── */}
          <div className="grid grid-cols-12 gap-6">
            <div
              className="col-span-12 text-center"
              style={{
                opacity:    headerVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.4s",
              }}
            >
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2
                           bg-[#007AFF] hover:bg-[#005FCC]
                           text-white font-semibold
                           px-8 py-3 rounded-lg
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2
                           dark:focus:ring-offset-gray-950"
              >
                View All Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
                70+ projects across all niches
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Video lightbox modal — rendered via portal-like fixed positioning ── */}
      {activeProject && (
        <VideoModal project={activeProject} onClose={closeModal} />
      )}
    </>
  );
};

export default memo(WhatIDoSection);
