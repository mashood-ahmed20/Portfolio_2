import { ArrowUp, Linkedin } from "lucide-react";

const FiverrIcon = () => (
  <svg viewBox="-2.5 -2 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75h-2.5z" />
    <circle cx="14.375" cy="1.875" r="1.875" />
  </svg>
);

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    /* Dark footer — like Dnyxstudios */
    <footer className="bg-[#191919] dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer row — 12-col grid */}
        <div className="grid grid-cols-12 gap-6 py-12 border-b border-white/10">

          {/* Brand col-span-12 md:col-span-5 */}
          <div className="col-span-12 md:col-span-5">
            <a href="/" className="font-bold text-xl text-white tracking-tight">
              Mashood<span className="text-[#007AFF]">.</span>
            </a>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-xs">
              Premium video editing &amp; motion design for brands, startups, and creators who want to stand out.
            </p>
          </div>

          {/* Links col-span-6 md:col-span-3 */}
          <div className="col-span-6 md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Pages</h4>
            <ul className="space-y-3">
              {[
                { label: "Home",      href: "/" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Services",  href: "/#services" },
                { label: "Contact",   href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150
                               focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + scroll-up col-span-6 md:col-span-4 */}
          <div className="col-span-6 md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Follow Me</h4>
            <div className="flex gap-3">
              <a
                href="https://www.fiverr.com/s/pdYbBdY"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#007AFF]/20 hover:text-[#007AFF] transition-colors"
                aria-label="Fiverr"
              >
                <FiverrIcon />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~019b9b27ee7d1ec8c4?mp_source=share"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#007AFF]/20 hover:text-[#007AFF] transition-colors"
                aria-label="Upwork"
              >
                <UpworkIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/mashood-ahmed-sheikh-436166250"
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#007AFF]/20 hover:text-[#007AFF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors
                         focus:outline-none focus:ring-2 focus:ring-[#007AFF] rounded"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Mashood Ahmed. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
