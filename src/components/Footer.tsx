import { Linkedin, Mail, ArrowUp } from "lucide-react";

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
              href="mailto:ig.mashood@gmail.com"
              className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/mashood-ahmed-sheikh-436166250/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
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
