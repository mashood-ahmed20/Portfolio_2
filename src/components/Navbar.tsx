import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import PortfolioDropdown from "@/components/PortfolioDropdown";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="font-heading font-bold text-xl md:text-2xl">
              <span className="gradient-text">Mashood</span>
              <span className="text-foreground">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <PortfolioDropdown />
              <Button variant="hero" size="sm" asChild>
                <a href="/#contact">Hire Me</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground p-2 relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-background/98 backdrop-blur-2xl transition-all duration-400 ease-out md:hidden flex flex-col ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-16" /> {/* Spacer for navbar height */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-20">
          <div className="space-y-2">
            {/* About */}
            <a
              href="/#about"
              className={`block text-2xl font-heading font-semibold text-foreground/80 hover:text-foreground py-3 transition-all duration-300 ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "100ms" : "0ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>

            {/* Portfolio Dropdown */}
            <div
              className={`transition-all duration-300 ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "150ms" : "0ms" }}
            >
              <PortfolioDropdown mobile onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* Services */}
            <a
              href="/#services"
              className={`block text-2xl font-heading font-semibold text-foreground/80 hover:text-foreground py-3 transition-all duration-300 ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "200ms" : "0ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>

            {/* Contact */}
            <a
              href="/#contact"
              className={`block text-2xl font-heading font-semibold text-foreground/80 hover:text-foreground py-3 transition-all duration-300 ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "250ms" : "0ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>

          <div
            className={`mt-10 transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "350ms" : "0ms" }}
          >
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Hire Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
