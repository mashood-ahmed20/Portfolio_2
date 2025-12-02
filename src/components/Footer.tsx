import { ArrowUp } from "lucide-react";

const FiverrIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.48.858 1.015.858.41 0 .703-.176.82-.557h1.537c-.23 1.004-1.1 1.694-2.357 1.694-1.478 0-2.553-1.004-2.553-2.46 0-1.46 1.075-2.461 2.553-2.461 1.495 0 2.501 1.031 2.501 2.461 0 .176-.02.348-.059.465h-.098zm-1.457-.996c-.059-.468-.432-.782-.964-.782-.527 0-.9.314-.964.782h1.928zm-4.894-1.54h.907v4.873h-1.61v-.703c-.264.534-.769.791-1.413.791-1.163 0-1.894-.785-1.894-2.041v-2.92h1.61v2.603c0 .574.303.94.82.94.556 0 .923-.398.923-.998v-2.545h.657zm-5.635.454v3.175c0 .293.195.436.508.436h.41v1.31H2.79c-1.074 0-1.727-.587-1.727-1.569v-3.352H.39v-1.31h.673c.498 0 .82-.265.82-.717v-.616h1.61v1.333h1.17v1.31h-1.17z"/>
  </svg>
);

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a href="#home" className="font-heading font-bold text-xl">
              <span className="gradient-text">Mashood</span>
              <span className="text-foreground">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Video Editor • Motion Designer • Web Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.fiverr.com/s/pdYbBdY"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="Fiverr"
            >
              <FiverrIcon />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~019b9b27ee7d1ec8c4?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="Upwork"
            >
              <UpworkIcon />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors ml-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mashood Ahmed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
