/**
 * Header — Dnyxstudios-style with dark mode toggle.
 * Logo (left) | Home · Portfolio · Contact (center) | Dark toggle + Let's Talk (right)
 */
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Dark mode — read localStorage then system preference ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  /* ── Scroll shadow ── */
  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-white dark:bg-black
        border-b border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 py-4 items-center">

          {/* Column 1-2: Logo */}
          <div className="col-span-6 md:col-span-2">
            <a
              href="/#home"
              className="text-2xl lg:text-3xl font-bold
                         text-black dark:text-white
                         hover:text-blue-600 transition-colors duration-200"
            >
              Mashood
            </a>
          </div>

          {/* Column 3-7: Navigation (hidden on mobile) */}
          <nav className="hidden md:flex md:col-span-3 lg:col-span-5 justify-center gap-8">
            <a
              href="/#home"
              className="text-gray-700 dark:text-gray-300
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="/portfolio"
              className="text-gray-700 dark:text-gray-300
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-200 font-medium"
            >
              Portfolio
            </a>
            <a
              href="/#contact"
              className="text-gray-700 dark:text-gray-300
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Column 8-12: Dark Mode Toggle & CTA */}
          <div className="col-span-6 md:col-span-7 lg:col-span-5 flex items-center justify-end gap-4">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg
                         border border-gray-300 dark:border-gray-700
                         hover:bg-gray-100 dark:hover:bg-gray-900
                         transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>

            {/* CTA Button (hidden on mobile) */}
            <a
              href="/#contact"
              className="hidden md:inline-block
                         bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-600 dark:hover:bg-blue-700
                         text-white font-semibold
                         px-6 py-2.5 rounded-lg
                         transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:ring-offset-2 dark:focus:ring-offset-black"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg
                         text-black dark:text-white
                         hover:bg-gray-100 dark:hover:bg-gray-900
                         transition-colors duration-200
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-out
            ${mobileMenuOpen
              ? "max-h-72 opacity-100 border-t border-gray-200 dark:border-gray-800"
              : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="py-4 flex flex-col gap-3">
            <a
              href="/#home"
              className="px-3 py-2.5 rounded-lg text-base font-medium
                         text-gray-700 dark:text-gray-300
                         hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-900
                         transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/portfolio"
              className="px-3 py-2.5 rounded-lg text-base font-medium
                         text-gray-700 dark:text-gray-300
                         hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-900
                         transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="/#contact"
              className="px-3 py-2.5 rounded-lg text-base font-medium
                         text-gray-700 dark:text-gray-300
                         hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-900
                         transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="/#contact"
              className="mt-1 bg-blue-600 hover:bg-blue-700
                         text-white font-semibold
                         px-6 py-2.5 rounded-lg
                         w-full text-center
                         transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
