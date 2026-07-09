import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectVideoCard from "@/components/ProjectVideoCard";
import { Project } from "@/data/projectsData";
import askStellarVideo from "@/assets/askstellar-video.mp4";
import askStellarThumbnail from "@/assets/askstellar-thumbnail.webp";
import gridironVideo from "@/assets/gridiron-coaching-video.mp4";
import gridironThumbnail from "@/assets/gridiron-coaching-thumbnail.webp";
import influenceaiVideo from "@/assets/influenceai-video.mp4";
import influenceaiThumbnail from "@/assets/influenceai-thumbnail.webp";
import tmeVideo from "@/assets/tme-video.mp4";
import tmeThumbnail from "@/assets/tme-thumbnail.webp";
import onevoiceaiVideo from "@/assets/onevoiceai-video.mp4";
import onevoiceaiThumbnail from "@/assets/onevoiceai-thumbnail.webp";

const featuredHorizontal: Project[] = [
  {
    id: "askstellar-feat",
    title: "AskStellarAi",
    subtitle: "Health Insurance Assistant",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "AI"],
    type: "video",
    orientation: "horizontal",
    videoUrl: askStellarVideo,
    thumbnail: askStellarThumbnail,
  },
  {
    id: "tme-feat",
    title: "The Muslim Expert (TME)",
    subtitle: "Guidance, Connections & Contributions",
    description: "",
    fullDescription: "",
    tags: ["Website Promo", "Community"],
    type: "video",
    orientation: "horizontal",
    videoUrl: tmeVideo,
    thumbnail: tmeThumbnail,
  },
  {
    id: "gridiron-feat",
    title: "GridIron Coaching",
    subtitle: "College Football Simulation",
    description: "",
    fullDescription: "",
    tags: ["App Promo", "Gaming"],
    type: "video",
    orientation: "horizontal",
    videoUrl: gridironVideo,
    thumbnail: gridironThumbnail,
  },
  {
    id: "onevoiceai-feat",
    title: "One Voice AI",
    subtitle: "AI-Powered Voiceovers",
    description: "",
    fullDescription: "",
    tags: ["Screencast", "AI"],
    type: "video",
    orientation: "horizontal",
    videoUrl: onevoiceaiVideo,
    thumbnail: onevoiceaiThumbnail,
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding section-grey">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="section-label">My Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            Featured <span className="text-[#007AFF]">Projects</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            A selection of high-quality horizontal showcase work.
          </p>
        </div>

        <div id="all-projects" className="scroll-mt-24" />

        {/* Pattern B: 2-column video card grid */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {featuredHorizontal.map((project) => (
              <div key={project.id} className="col-span-1 md:col-span-3 lg:col-span-6">
                <ProjectVideoCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/portfolio">
              See All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
