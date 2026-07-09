import { memo } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  "Motion Graphics & Cinematic Video Editing",
  "SaaS Explainer & Promo Video Production",
  "Short-Form Content (Reels, TikTok, Shorts)",
  "SaaS & Startup-Focused Visual Solutions",
];

const stats = [
  { value: "100+", label: "Happy Clients" },
  { value: "70+",  label: "Projects Done" },
  { value: "1.5y", label: "Experience" },
];

const AboutSection = () => {
  const { ref: imgRef,     isVisible: imgVisible     } = useScrollReveal({ threshold: 0.15 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1  });

  return (
    <section
      id="about"
      className="py-10 lg:py-16 bg-white dark:bg-black"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left: Profile image — col-span-5 ───────────────────────── */}
          <div
            ref={imgRef}
            className="col-span-1 md:col-span-3 lg:col-span-5"
            style={{
              opacity:    imgVisible ? 1 : 0,
              transform:  imgVisible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            {/* Image wrapper with decorative accent */}
            <div className="relative max-w-md mx-auto lg:max-w-none">

              {/* Decorative blue box — desktop only */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#007AFF] rounded-lg -z-10 hidden lg:block"
                aria-hidden="true"
              />
              {/* Top-left accent */}
              <div
                className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#007AFF]/30 rounded-lg -z-10 hidden lg:block"
                aria-hidden="true"
              />

              {/* Photo */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                <img
                  src={profilePhoto}
                  alt="Mashood Ahmed — Video Editor &amp; Motion Designer, Pakistan"
                  className="w-full h-auto object-cover max-h-[520px]"
                  loading="lazy"
                  width={500}
                  height={600}
                  decoding="async"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
                              px-5 py-2 rounded-full
                              bg-white dark:bg-gray-950
                              border border-gray-200 dark:border-gray-800
                              shadow-md
                              flex items-center gap-2 text-sm font-medium
                              text-gray-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
                Available for Projects
              </div>
            </div>
          </div>

          {/* ── Right: Content — col-span-7 ─────────────────────────────── */}
          <div
            ref={contentRef}
            className="col-span-1 md:col-span-3 lg:col-span-7 mt-8 lg:mt-0"
            style={{
              opacity:    contentVisible ? 1 : 0,
              transform:  contentVisible ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s",
            }}
          >
            {/* Eyebrow */}
            <span className="section-label">About Me</span>

            {/* Heading */}
            <h2
              id="about-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white mt-3 mb-6 leading-tight"
            >
              Crafting Visual{" "}
              <span className="text-[#007AFF]">Stories That Convert</span>
            </h2>

            {/* Body paragraphs */}
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm Mashood Ahmed — a video editor and motion designer specializing in
              high-impact visual content for brands, startups, and creators. I help
              businesses transform raw footage into polished, conversion-driven
              videos that captivate audiences and build trust.
            </p>
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              With 70+ satisfied clients on Fiverr (Level&nbsp;1&nbsp;Seller) and Upwork,
              I bring a cinematic eye and storytelling precision to every project —
              from SaaS explainers and brand commercials to Reels, TikToks, and
              YouTube content.
            </p>

            {/* Skill checkmarks */}
            <ul className="space-y-3 mb-8" aria-label="Key skills">
              {skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mini stats row */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-black dark:text-white">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2
                           bg-[#007AFF] hover:bg-[#005FCC]
                           text-white font-semibold
                           px-8 py-3 rounded-lg
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2
                           dark:focus:ring-offset-black"
              >
                Let's Collaborate
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2
                           border border-gray-300 dark:border-gray-700
                           text-black dark:text-white
                           font-semibold px-8 py-3 rounded-lg
                           hover:bg-gray-50 dark:hover:bg-gray-900
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2
                           dark:focus:ring-offset-black"
              >
                View My Work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);