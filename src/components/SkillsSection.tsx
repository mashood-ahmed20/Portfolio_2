import { useEffect, useState, useRef } from "react";
const creativeSkills = [{
  name: "Adobe Premiere Pro",
  level: 95
}, {
  name: "After Effects",
  level: 90
}, {
  name: "Adobe Illustrator",
  level: 85
}, {
  name: "CapCut",
  level: 92
}];
const technicalSkills = [{
  name: "React.js",
  level: 90
}, {
  name: "Node.js",
  level: 85
}, {
  name: "Python",
  level: 80
}, {
  name: "TypeScript",
  level: 82
}];
const additionalSkills = ["HTML5", "CSS3", "JavaScript", "Express.js", "UI/UX Design", "Responsive Design", "Git", "REST APIs"];
const SkillBar = ({
  name,
  level,
  delay
}: {
  name: string;
  level: number;
  delay: number;
}) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
        }
      });
    }, {
      threshold: 0.5
    });
    if (barRef.current) {
      observer.observe(barRef.current);
    }
    return () => observer.disconnect();
  }, [level, delay]);
  return <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-primary font-heading font-bold">{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-bar-fill transition-all duration-1000 ease-out" style={{
        width: `${width}%`
      }} />
      </div>
    </div>;
};
const SkillsSection = () => {
  return <section id="skills" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">My Expertise</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive toolkit spanning creative software and modern web technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Creative Skills */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              Video Editing & Motion Design
            </h3>
            <div className="space-y-6">
              {creativeSkills.map((skill, index) => <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 150} />)}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              Web Development
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 150} />)}
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className="mt-12">
          <h3 className="text-xl font-heading font-bold mb-6 text-center">Also Proficient In</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => <span key={skill} className="px-4 py-2 rounded-full bg-secondary border border-border/50 text-foreground text-sm font-medium hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default" style={{
            animationDelay: `${index * 0.05}s`
          }}>
                {skill}
              </span>)}
          </div>
        </div>
      </div>
    </section>;
};
export default SkillsSection;