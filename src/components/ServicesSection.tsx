import { memo } from "react";
import { Video, Sparkles, Monitor, Film, Megaphone, Clapperboard, Youtube, Tv } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video editing with cinematic transitions, color grading, and sound design for impactful content.",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description: "Eye-catching animated visuals, kinetic typography, and dynamic effects that bring your brand to life.",
  },
  {
    icon: Monitor,
    title: "SaaS Promo Videos",
    description: "Conversion-focused promotional videos for SaaS products with clean UI animations and compelling narratives.",
  },
  {
    icon: Film,
    title: "Product Explainer Videos",
    description: "Clear, engaging explainer videos that simplify complex products and drive user understanding.",
  },
  {
    icon: Megaphone,
    title: "Social Media Video Ads",
    description: "Scroll-stopping video ads optimized for Instagram, TikTok, Facebook, and YouTube campaigns.",
  },
  {
    icon: Clapperboard,
    title: "Short-Form Content",
    description: "Viral-ready Reels, TikToks, and YouTube Shorts crafted for maximum engagement and reach.",
  },
  {
    icon: Youtube,
    title: "YouTube Editing",
    description: "Full YouTube video editing including intros, outros, overlays, and retention-optimized pacing.",
  },
  {
    icon: Tv,
    title: "Brand Commercials",
    description: "High-end commercial videos that elevate brand perception with cinematic production quality.",
  },
];

/* ─── Memoized individual card ───────────────────────────────────────────── */
interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = memo(({ service, index }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="glass-card p-6 hover-lift group cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease-out ${index * 60}ms, transform 0.5s ease-out ${index * 60}ms`,
      }}
    >
      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 w-fit mb-4">
        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";

/* ─── Section ─────────────────────────────────────────────────────────────── */
const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="services" className="section-padding section-grey relative overflow-hidden" aria-labelledby="services-heading">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#007AFF]/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-8"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="section-label">What I Offer</span>
          <h2
            id="services-heading"
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-3"
          >
            My <span className="text-[#007AFF]">Services</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Premium video editing and motion design services to elevate your brand's visual presence.
          </p>
        </div>

        {/* Services Grid — Pattern C: quarter-width cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <div key={service.title} className="col-span-1 md:col-span-3 lg:col-span-3">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServicesSection);
