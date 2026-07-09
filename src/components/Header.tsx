/**
 * Header — pixel-matched to Dnyxstudios.
 * Logo (left) | Home · Our Work · Contact (center) | Get Started (right)
 * No border, transparent bg that blends with page, no dark-mode toggle.
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",     href: "/#home" },
  { name: "Our Work", href: "/portfolio" },
  { name: "Contact",  href: "/#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-background dark:bg-black
        transition-all duration-300
        ${scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* ── Logo ── */}
          <a
            href="/#home"
            aria-label="Mashood — Home"
            className="text-[1.25rem] font-bold tracking-tight
                       text-black dark:text-white
                       transition-colors duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] rounded"
          >
            Mashood
          </a>

          {/* ── Desktop nav — centered ── */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  text-[0.9rem] font-medium transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] rounded
                  ${link.name === "Home"
                    ? "text-[#007AFF] underline underline-offset-4 decoration-[#007AFF]"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center">
            <a
              href="/#contact"
              className="bg-[#007AFF] hover:bg-[#0066DD]
                         text-white text-sm font-semibold
                         px-6 py-2.5 rounded-full
                         transition-all duration-300
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2
                         dark:focus-visible:ring-offset-black"
            >
              Get Started
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="md:hidden p-1.5 rounded-lg
                       text-black dark:text-white
                       hover:bg-gray-100 dark:hover:bg-gray-900
                       transition-colors duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ── Mobile panel ── */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={`
          md:hidden
          bg-background dark:bg-black
          overflow-hidden transition-all duration-300 ease-out
          ${mobileOpen ? "max-h-72 opacity-100 border-t border-gray-200 dark:border-gray-800" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={close}
              className={`
                px-3 py-3 rounded-lg text-base font-medium
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-inset
                ${link.name === "Home"
                  ? "text-[#007AFF]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-[#007AFF] dark:hover:text-[#007AFF]"
                }
              `}
            >
              {link.name}
            </a>
          ))}

          <a
            href="/#contact"
            onClick={close}
            className="mt-2 bg-[#007AFF] hover:bg-[#0066DD]
                       text-white font-semibold text-sm
                       px-6 py-3 rounded-full text-center
                       transition-all duration-300
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2
                       dark:focus-visible:ring-offset-black"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
