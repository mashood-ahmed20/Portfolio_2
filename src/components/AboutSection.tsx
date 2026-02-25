import { Film, Award, Star, Clapperboard } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in-left">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/5 rounded-2xl" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card">
                <img src={profilePhoto} alt="Mashood Ahmed - Video Editor & Motion Designer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full glass-card border border-primary/20">
                <span className="text-sm font-medium gradient-text">Video Editor & Motion Designer</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 animate-fade-in-right">
            <div className="space-y-2">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Crafting Visual
                <span className="gradient-text block">Stories That Convert</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Hi, I'm Mashood Ahmed — a creative video editor and motion designer specializing in high-impact visual content. I work with startups, agencies, and brands to create promo videos, SaaS explainers, motion graphics, and short-form content that drives attention, engagement, and conversions.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              With 70+ satisfied clients on Fiverr (Level 1 Seller) and Upwork, I bring a cinematic eye and storytelling precision to every project — from product demos and brand commercials to Reels, TikToks, and YouTube content.
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Film className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Specialization</h4>
                    <p className="text-sm text-muted-foreground">Video Editing & Motion Design</p>
                    <p className="text-xs text-muted-foreground">Premiere Pro • After Effects</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clapperboard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Focus Areas</h4>
                    <p className="text-sm text-muted-foreground">Promo Videos • SaaS Explainers</p>
                    <p className="text-xs text-muted-foreground">Short-Form • Commercials</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Achievement</h4>
                    <p className="text-sm text-muted-foreground">Level 1 Fiverr Seller</p>
                    <p className="text-xs text-muted-foreground">70+ Happy Clients</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Platforms</h4>
                    <p className="text-sm text-muted-foreground">Fiverr & Upwork</p>
                    <p className="text-xs text-muted-foreground">Self-Employed Freelancer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
