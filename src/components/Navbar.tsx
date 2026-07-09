import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import PortfolioDropdown from "@/components/PortfolioDropdown";

const navLinks = [
  { name: "About",    href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact",  href: "/#contact" },
];

const Navbar = () => {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark,           setIsDark]           = useState(false);

  /* ── Scroll detection ── */
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 10));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  /* ── Dark mode persistence ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
            : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md  border-b border-gray-100  dark:border-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="/"
              className="font-bold text-lg text-gray-900 dark:text-white tracking-tight"
              aria-label="Home"
            >
              Mashood<span className="text-[#007AFF]">.</span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors duration-150 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
                >
                  {link.name}
                </a>
              ))}
              <PortfolioDropdown />
            </div>

            {/* Right: dark toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleDark}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Button variant="hero" size="sm" asChild>
                <a href="/#contact" className="focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2">
                  Hire Me
                </a>
              </Button>
            </div>

            {/* Mobile: dark toggle + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleDark}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="p-2 text-gray-900 dark:text-white relative z-[60]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ──────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[55] bg-white dark:bg-gray-950 transition-all duration-300 ease-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-16" />
        <div className="flex-1 flex flex-col justify-center items-center px-6 pb-16 gap-1">
          <nav className="w-full max-w-xs text-center">
            {[
              { label: "About",     href: "/#about",    delay: "80ms"  },
              { label: "Portfolio", href: "/portfolio", delay: "130ms" },
              { label: "Services",  href: "/#services", delay: "180ms" },
              { label: "Contact",   href: "/#contact",  delay: "230ms" },
            ].map(({ label, href, delay }) => (
              <a
                key={label}
                href={href}
                className={`block text-3xl font-bold text-gray-900 dark:text-white hover:text-[#007AFF] py-3 transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? delay : "0ms" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            className={`mt-6 w-full max-w-xs transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
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
