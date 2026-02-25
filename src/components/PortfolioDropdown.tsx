import { useState, useRef, useEffect } from "react";
import { ChevronDown, Play, Monitor, Video, Users, Megaphone, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const categories = [
  { label: "App Promo Videos", niche: "app-promos", icon: Play },
  { label: "Website Promo Videos", niche: "website-promos", icon: Monitor },
  { label: "Screencast Videos", niche: "screencast", icon: Video },
  { label: "UGC Videos", niche: "ugc", icon: Users },
  { label: "Promo Videos", niche: "social-media-ads", icon: Megaphone },
  { label: "Content Repurposing", niche: "content-repurposing", icon: RefreshCw },
];

interface PortfolioDropdownProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const PortfolioDropdown = ({ mobile = false, onNavigate }: PortfolioDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => { if (!mobile) { clearTimeout(timeoutRef.current); setIsOpen(true); } };
  const handleMouseLeave = () => { if (!mobile) { timeoutRef.current = setTimeout(() => setIsOpen(false), 200); } };

  const handleCategoryClick = (niche: string) => {
    setIsOpen(false);
    onNavigate?.();
    if (location.pathname === "/portfolio") {
      document.getElementById(`niche-${niche}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/portfolio?scroll=${niche}`);
    }
  };

  if (mobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 w-full text-3xl font-heading font-bold text-foreground/90 hover:text-primary transition-colors duration-200 py-4"
        >
          <span>Portfolio</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-2 space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.niche}
                  onClick={() => handleCategoryClick(cat.niche)}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-primary/70" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
      >
        Portfolio
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-60 bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 space-y-0.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.niche}
                  onClick={() => handleCategoryClick(cat.niche)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDropdown;
