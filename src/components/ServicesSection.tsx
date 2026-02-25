import { Video, Sparkles, Monitor, Film, Megaphone, Clapperboard, Youtube, Tv } from "lucide-react";

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

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">What I Offer</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Premium video editing and motion design services to elevate your brand's visual presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card p-6 hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
