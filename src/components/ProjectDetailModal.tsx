import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, Code, X } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-foreground pr-8">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-primary font-medium">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        {/* Media Area */}
        <div className="relative aspect-video bg-gradient-to-br from-muted to-secondary rounded-lg overflow-hidden my-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                {project.type === "video" ? (
                  <Play className="w-10 h-10 text-primary" />
                ) : (
                  <Code className="w-10 h-10 text-primary" />
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {project.type === "video" ? "Video Preview" : "Project Preview"}
              </span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
            <p className="text-foreground leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies & Skills</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Type Badge */}
          <div className="pt-4 border-t border-border">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              project.type === "video" 
                ? "bg-primary/10 text-primary" 
                : "bg-accent/10 text-accent"
            }`}>
              {project.type === "video" ? (
                <>
                  <Play className="w-4 h-4" />
                  Creative / Video Project
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  Technical / Software Project
                </>
              )}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
