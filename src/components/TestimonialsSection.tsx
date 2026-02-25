import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "James K.",
    role: "Startup Founder",
    text: "Mashood delivered an incredible promo video for our SaaS product. The motion graphics were clean, professional, and exactly what we needed to convert visitors.",
    rating: 5,
    image: null,
  },
  {
    name: "Sarah M.",
    role: "Marketing Manager",
    text: "Working with Mashood was a game-changer. Our social media engagement went up 300% after using his video ads. His attention to detail is unmatched.",
    rating: 5,
    image: null,
  },
  {
    name: "Ahmed R.",
    role: "YouTube Creator",
    text: "Best video editor I've ever worked with on Fiverr. Fast turnaround, creative edits, and always open to feedback. Highly recommend!",
    rating: 5,
    image: null,
  },
  {
    name: "Emily T.",
    role: "Brand Strategist",
    text: "The brand commercial Mashood created exceeded all expectations. Cinematic quality, perfect pacing, and it truly captured our brand identity.",
    rating: 5,
    image: null,
  },
  {
    name: "David L.",
    role: "App Developer",
    text: "Mashood created an amazing app promo video that boosted our downloads by 40%. His understanding of product storytelling is impressive.",
    rating: 5,
    image: null,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % testimonials.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + testimonials.length) % testimonials.length), [current, goTo]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by startups, brands, and creators worldwide.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card */}
          <div
            className={`glass-card p-8 md:p-12 text-center transition-all duration-300 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Avatar */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/20">
              <span className="text-xl font-heading font-bold gradient-text">
                {testimonials[current].name.charAt(0)}
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
              "{testimonials[current].text}"
            </p>

            {/* Client info */}
            <div>
              <p className="font-heading font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
