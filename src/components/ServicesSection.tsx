import { Video, Sparkles, Monitor, Code, Layout, Smartphone } from "lucide-react";

const creativeServices = [
  {
    icon: Video,
    title: "Promo Videos",
    description: "Eye-catching promotional videos that tell your brand story and captivate your audience.",
  },
  {
    icon: Monitor,
    title: "Screencast Videos",
    description: "Professional explainer and tutorial videos with clear narration and visual guides.",
  },
  {
    icon: Sparkles,
    title: "YouTube Content",
    description: "Custom intros, outros, and overlays that elevate your YouTube channel's brand identity.",
  },
];

const technicalServices = [
  {
    icon: Code,
    title: "Full-Stack Web Apps",
    description: "Complete web applications built with the MERN stack for scalability and performance.",
  },
  {
    icon: Layout,
    title: "Web Solutions",
    description: "Custom web solutions tailored to your specific business needs and goals.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Beautiful, mobile-first designs that work flawlessly across all devices.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">What I Offer</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A unique combination of creative and technical services to bring your digital vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Creative Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 glow-box">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold">Creative Services</h3>
            </div>

            <div className="space-y-4">
              {creativeServices.map((service, index) => (
                <div
                  key={service.title}
                  className="glass-card p-6 hover-lift group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 glow-box">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold">Technical Services</h3>
            </div>

            <div className="space-y-4">
              {technicalServices.map((service, index) => (
                <div
                  key={service.title}
                  className="glass-card p-6 hover-lift group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
