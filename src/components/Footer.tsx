import { ArrowUp, Linkedin } from "lucide-react";
const FiverrIcon = () => <svg viewBox="-2.5 -2 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75h-2.5z" />
    <circle cx="14.375" cy="1.875" r="1.875" />
  </svg>;
const UpworkIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>;
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return <footer className="py-8 px-4 md:px-8 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a href="#home" className="font-heading font-bold text-xl">
              <span className="gradient-text">Mashood</span>
              <span className="text-foreground">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">Video Editor • Software Engineer</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.fiverr.com/s/pdYbBdY" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors group" aria-label="Fiverr">
              <FiverrIcon />
            </a>
            <a href="https://www.upwork.com/freelancers/~019b9b27ee7d1ec8c4?mp_source=share" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors group" aria-label="Upwork">
              <UpworkIcon />
            </a>
            <a href="https://www.linkedin.com/in/mashood-ahmed-sheikh-436166250" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors group" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <button onClick={scrollToTop} className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors ml-4" aria-label="Scroll to top">
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
    </footer>;
};
export default Footer;