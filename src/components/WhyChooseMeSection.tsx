import { memo } from "react";
import { Zap, Sparkles, Layers, Users, LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { whyChooseMe, type Feature } from "@/data/features";

/* ── Icon registry ──────────────────────────────────────────────────────────── */
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Sparkles,
  Layers,
  Users,
};

/* ── Single feature card ────────────────────────────────────────────────────── */
interface CardProps {
  feature: Feature;
  index: number;
  visible: boolean;
}

const FeatureCard = memo(({ feature, index, visible }: CardProps) => {
  const Icon = iconMap[feature.icon] ?? Zap;

  return (
    <div
      className="group p-8 rounded-xl
                 border border-gray-200 dark:border-gray-800
                 bg-white dark:bg-gray-950
                 hover:border-[#007AFF] dark:hover:border-[#007AFF]
                 hover:shadow-[0_0_0_1px_#007AFF20,0_8px_30px_#007AFF15]
                 transition-all duration-300 h-full"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease-out ${index * 0.1}s,
                     transform 0.55s ease-out ${index * 0.1}s,
                     border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-5
                   bg-[#007AFF]
                   group-hover:scale-110
                   transition-transform duration-300"
        aria-hidden="true"
      >
        <Icon size={22} className="text-white" strokeWidth={2} />
      </div>

      {/* Title + stat row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-bold text-black dark:text-white leading-tight">
          {feature.title}
        </h3>
        {feature.stat && (
          <div className="flex-shrink-0 text-right">
            <div className="text-lg font-bold text-[#007AFF] leading-none">
              {feature.stat}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-wide mt-0.5">
              {feature.statLabel}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom accent bar — grows on hover */}
      <div
        className="mt-6 h-0.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full w-0 bg-[#007AFF] rounded-full
                     group-hover:w-full
                     transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
});

FeatureCard.displayName = "FeatureCard";

/* ── Section ────────────────────────────────────────────────────────────────── */
const WhyChooseMeSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.25 });
  const { ref: gridRef,   isVisible: gridVisible   } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      id="why-choose-me"
      className="py-16 lg:py-24 bg-white dark:bg-black"
      aria-labelledby="why-choose-me-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header — col-span-12 centered ── */}
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
            <span className="section-label">Why Work With Me</span>
            <h2
              id="why-choose-me-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white mt-3 mb-4"
            >
              Why <span className="text-[#007AFF]">Choose Me</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              I combine creative excellence with technical expertise to deliver
              results that move metrics — not just pixels.
            </p>
          </div>
        </div>

        {/* ── Feature cards — 2×2 grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6"
          role="list"
          aria-label="Reasons to choose Mashood Ahmed"
        >
          {whyChooseMe.map((feature, index) => (
            <div
              key={feature.id}
              role="listitem"
              className="col-span-1 md:col-span-3 lg:col-span-6"
            >
              <FeatureCard
                feature={feature}
                index={index}
                visible={gridVisible}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default memo(WhyChooseMeSection);
