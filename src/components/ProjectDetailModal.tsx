import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, Code, Sparkles } from "lucide-react";
import { Project } from "@/data/projectsData";
import VideoPlayer from "@/components/VideoPlayer";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const isVideo = project.type === "video";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-card/95 backdrop-blur-xl border-border/60 flex flex-col p-0 gap-0 overflow-hidden shadow-2xl">
        
        {/* Fixed Header */}
        <div className="px-7 pt-7 pb-4 shrink-0 border-b border-border/40 bg-gradient-to-b from-card to-card/80">
          <DialogHeader className="gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                isVideo
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-accent/10 text-accent border border-accent/20"
              }`}>
                {isVideo ? <Play className="w-3 h-3" /> : <Code className="w-3 h-3" />}
                {isVideo ? "Video" : "Software"}
              </span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-heading font-bold text-foreground pr-8 leading-tight">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-primary/80 font-medium text-sm mt-0.5">
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 scrollbar-premium">
          <div className="px-7 py-6 space-y-6">
            {/* Media Area */}
            <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-border/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
              {project.videoUrl ? (
                <VideoPlayer
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  className="w-full h-full relative z-10"
                  showPlayButton={true}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-3 ring-1 ring-primary/20">
                      <Code className="w-8 h-8 text-primary/70" />
                    </div>
                    <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">
                      {isVideo ? "Video Preview" : "Project Preview"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                About This Project
              </h4>
              <p className="text-foreground/85 leading-relaxed text-[15px]">
                {project.fullDescription}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            {/* Tags */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
                Technologies & Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/80 text-muted-foreground border border-border/40 hover:border-primary/30 hover:text-primary transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;