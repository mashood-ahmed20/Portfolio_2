import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  rating: number;
  timeframe: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 4.3,
    timeframe: "2 months ago",
    text: "Nice person to work with, went above and beyond with my expectations, loved the work now onto the next video. happy to meet someone so talented"
  },
  {
    rating: 4,
    timeframe: "2 weeks ago",
    text: "I was very slow in responding as I was extremely busy at times. But he took the initiative and got the job done to a very satisfactory level. very happy with the result."
  },
  {
    rating: 5,
    timeframe: "2 weeks ago",
    text: "Perfect work, fast delivery. We'll work again soon."
  },
  {
    rating: 4.7,
    timeframe: "4 weeks ago",
    text: "Mashood did a great job making the videos. Keep up the good work!"
  },
  {
    rating: 5,
    timeframe: "2 months ago",
    text: "Enjoyed working with Mashood, easy to cooperate. We got a great video!"
  },
  {
    rating: 5,
    timeframe: "2 months ago",
    text: "Excellent work, on time and easy to work with."
  },
  {
    rating: 5,
    timeframe: "4 months ago",
    text: "Great communication. Fast delivery. Quality work. Thank you!"
  },
  {
    rating: 5,
    timeframe: "4 months ago",
    text: "Excellent services and Video Design was amazing fantastic job."
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 !== 0;
  const partialPercentage = (rating % 1) * 100;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={16} className="fill-primary text-primary" />;
        } else if (i === fullStars && hasPartial) {
          return (
            <div key={i} className="relative">
              <Star size={16} className="text-muted-foreground/30" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${partialPercentage}%` }}>
                <Star size={16} className="fill-primary text-primary" />
              </div>
            </div>
          );
        }
        return <Star key={i} size={16} className="text-muted-foreground/30" />;
      })}
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            What <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            <span className="text-primary font-semibold">4.8/5</span> Average Rating from{" "}
            <span className="text-primary font-semibold">70+</span> Satisfied Clients on Freelance Platforms
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="flex-1 max-w-2xl">
            <div className="glass-card p-8 md:p-10 text-center min-h-[280px] flex flex-col justify-center">
              {/* Rating */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <RatingStars rating={testimonials[currentIndex].rating} />
                <span className="text-foreground font-semibold">
                  {testimonials[currentIndex].rating} / 5
                </span>
              </div>

              {/* Timeframe */}
              <span className="text-sm text-muted-foreground mb-6 block">
                {testimonials[currentIndex].timeframe}
              </span>

              {/* Review Text */}
              <blockquote className="text-lg md:text-xl text-foreground/90 italic leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
