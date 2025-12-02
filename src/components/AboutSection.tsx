import { GraduationCap, Briefcase, Award, Star } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in-left">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
              
              {/* Main Image Container with Mask */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card">
                <img 
                  src={profilePhoto} 
                  alt="Mashood Ahmed - Video Editor, Motion Designer & Web Developer" 
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full glass-card border border-primary/30">
                <span className="text-sm font-medium gradient-text">Creative Developer</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 animate-fade-in-right">
            <div className="space-y-2">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Crafting Digital
                <span className="gradient-text block">Experiences</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              As a Software Engineering undergraduate student at UIT University, Pakistan, 
              I bring a unique blend of creative and technical expertise to every project. 
              With a passion for continuous learning and innovation, I've built a successful 
              freelance career serving over 70 satisfied clients on platforms like Fiverr 
              (Level 1 Seller) and Upwork.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              My expertise spans across the Adobe Creative Suite for stunning visual content 
              and the MERN Stack for robust web applications. I believe in delivering quality 
              digital solutions that help brands, startups, and creators establish a powerful 
              online presence.
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Education</h4>
                    <p className="text-sm text-muted-foreground">BS Software Engineering</p>
                    <p className="text-xs text-muted-foreground">UIT University, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 hover-lift">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Experience</h4>
                    <p className="text-sm text-muted-foreground">Self-Employed Freelancer</p>
                    <p className="text-xs text-muted-foreground">Fiverr & Upwork</p>
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
                    <h4 className="font-medium text-foreground">Specialization</h4>
                    <p className="text-sm text-muted-foreground">Creative + Technical</p>
                    <p className="text-xs text-muted-foreground">Full-Stack Solutions</p>
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
