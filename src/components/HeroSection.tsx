import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";

const HeroStat = ({
  target,
  suffix = "+",
  label,
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) => {
  const { count, ref } = useCountUp(target * Math.pow(10, decimals), 1500);
  const display = decimals
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count;
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#007AFF]">
        {display}{suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden
                 py-16 lg:py-20 pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8
                 bg-gray-50 dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* 12-col grid — Pattern A: full-width centred */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col items-center text-center">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-white dark:bg-gray-900
                            border border-gray-200 dark:border-gray-800
                            text-sm text-gray-600 dark:text-gray-400
                            animate-fade-in mb-6">
              <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
              Available for Freelance Projects
            </div>

            {/* H1 */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white
                         animate-fade-in max-w-4xl"
              style={{ animationDelay: "0.1s" }}
            >
              Elevating{" "}
              <span className="text-[#007AFF]">Brands</span> Through{" "}
              <span className="text-[#007AFF]">Cinematic Video</span>{" "}
              &amp; <span className="text-[#007AFF]">Motion Design</span>
            </h1>

            {/* Sub-copy */}
            <p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400
                         max-w-2xl mt-5 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Helping brands, startups, and creators transform raw footage into
              visually stunning videos — promo videos, SaaS explainers, motion
              graphics, and short-form content that captivates and converts.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/portfolio" className="focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2">
                  View Portfolio
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#contact" className="focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2">
                  <Play className="mr-2" size={16} />
                  Let's Talk
                </a>
              </Button>
            </div>

            {/* Stats — 3-column grid */}
            <div
              className="grid grid-cols-3 gap-6 md:gap-10 mt-10 pt-8
                         border-t border-gray-200 dark:border-gray-800
                         w-full max-w-sm mx-auto animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <HeroStat target={100} label="Happy Clients" />
              <HeroStat target={1.5} decimals={1} label="Years Experience" />
              <HeroStat target={70}  label="Projects Done" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
