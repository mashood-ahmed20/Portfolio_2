import React, { memo } from "react";
import { Zap, Sparkles, Layers, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Feature {
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    badge: "7–14 day delivery",
    description:
      "From brief to finished product in record time — without sacrificing an ounce of quality. Rush delivery available.",
    color: "from-amber-500/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    badge: "Series A-level output",
    description:
      "Cinematic production value on every project. The kind of polish that makes investors, customers, and founders stop scrolling.",
    color: "from-violet-500/20 to-transparent",
  },
  {
    icon: Layers,
    title: "Full Service",
    badge: "Video + Web + Motion",
    description:
      "One creative partner for video editing, motion design, and web development. No handoffs, no miscommunication.",
    color: "from-primary/20 to-transparent",
  },
  {
    icon: Users,
    title: "Client Focused",
    badge: "Iterative & responsive",
    description:
      "Your feedback shapes everything. I stay responsive, communicate clearly, and deliver revisions without drama.",
    color: "from-emerald-500/20 to-transparent",
  },
];

/* ─── Individual card ────────────────────────────────────────────────────── */
interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = memo(({ feature, index }: FeatureCardProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className="glass-card p-7 group hover-lift relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.55s ease-out ${index * 100}ms, transform 0.55s ease-out ${index * 100}ms`,
      }}
    >
      {/* Subtle gradient accent — GPU layer, no layout cost */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center mb-5">
          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>

        {/* Badge */}
        <span className="inline-block text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full mb-3">
          {feature.badge}
        </span>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
});
FeatureCard.displayName = "FeatureCard";

/* ─── Section ─────────────────────────────────────────────────────────────── */
const WhyChooseMe = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="why-choose-me" className="section-padding section-white relative overflow-hidden" aria-labelledby="why-heading">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#007AFF]/4 rounded-full blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-8"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="section-label">Why Choose Me</span>
          <h2
            id="why-heading"
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-3"
          >
            What Makes Me{" "}
            <span className="text-[#007AFF]">Different</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Four reasons why 100+ brands and creators choose Mashood Ahmed over
            the rest.
          </p>
        </div>

        {/* Feature grid — Pattern D: 12-col, 3-wide on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="col-span-1 md:col-span-3 lg:col-span-3">
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(WhyChooseMe);
