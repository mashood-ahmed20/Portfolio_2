import { Upload, MessageSquare, Film, RefreshCw, Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Upload,
    title: "Send Your Footage",
    description: "Share your raw footage, assets, and brand materials through a secure upload link.",
    step: "01",
  },
  {
    icon: MessageSquare,
    title: "Project Briefing & Concept",
    description: "We discuss your vision, target audience, style preferences, and project goals in detail.",
    step: "02",
  },
  {
    icon: Film,
    title: "Rough Cut Preview",
    description: "I deliver an initial rough cut for your review — structure, pacing, and creative direction.",
    step: "03",
  },
  {
    icon: RefreshCw,
    title: "Revisions",
    description: "Your feedback is applied with precision. Every detail is refined until you're 100% satisfied.",
    step: "04",
  },
  {
    icon: Download,
    title: "Final Export & Delivery",
    description: "Polished final video delivered in your preferred format, optimized for your target platform.",
    step: "05",
  },
];

const ProcessCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 100}ms`,
      }}
    >
      {/* Connector line (not on last item) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
      )}

      <div className="glass-card p-6 hover-lift relative overflow-hidden h-full">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-mono font-bold text-primary/50 tracking-wider">STEP {step.step}</span>
          </div>
          <h4 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {step.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

const EditingProcessSection = () => {
  return (
    <section id="process" className="section-padding section-grey relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="section-label">My Workflow</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            How The <span className="text-[#007AFF]">Editing Process</span> Works
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            A streamlined 5-step process designed for efficiency, clarity, and exceptional results.
          </p>
        </div>

        {/* Steps — 12-col: each step is col-span-12 sm:col-span-6 lg:col-span-2 (5 steps * 2 = 10 cols, last gets 4) */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`col-span-1 md:col-span-3 ${
                index < 4 ? "lg:col-span-2" : "lg:col-span-4"
              }`}
            >
              <ProcessCard step={step} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditingProcessSection;
