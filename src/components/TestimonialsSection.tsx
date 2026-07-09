/**
 * TestimonialsSection — Swiper carousel, lazy-loaded by Index.tsx.
 * Uses swiper/react wrapper (modern API, no imperative init needed).
 */
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

// Swiper core styles — imported here so they're only bundled with this lazy chunk
import "swiper/css";
import "swiper/css/pagination";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { testimonials, type Testimonial } from "@/data/testimonials";

/* ── Platform badge colours ─────────────────────────────────────────────────── */
const platformStyle: Record<string, string> = {
  Fiverr: "bg-[#1DBF73]/10 text-[#1DBF73] border-[#1DBF73]/20",
  Upwork: "bg-[#14A800]/10 text-[#14A800] border-[#14A800]/20",
  Direct: "bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20",
};

/* ── Avatar (initials fallback — no placeholder images) ─────────────────────── */
const avatarColors = [
  "bg-[#007AFF]",
  "bg-[#34C759]",
  "bg-[#FF9F0A]",
  "bg-[#FF375F]",
  "bg-[#BF5AF2]",
  "bg-[#5AC8FA]",
];

const Avatar = memo(({ initials, index }: { initials: string; index: number }) => (
  <div
    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${avatarColors[index % avatarColors.length]} text-white font-bold text-sm`}
    aria-hidden="true"
  >
    {initials}
  </div>
));
Avatar.displayName = "Avatar";

/* ── Single testimonial card ────────────────────────────────────────────────── */
const TestimonialCard = memo(
  ({ t, index }: { t: Testimonial; index: number }) => (
    <article
      className="p-7 rounded-xl border border-gray-200 dark:border-gray-800
                 bg-gray-50 dark:bg-gray-950 h-full flex flex-col
                 hover:border-gray-300 dark:hover:border-gray-700
                 transition-colors duration-200"
    >
      {/* Stars + platform row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
          ))}
        </div>
        {t.platform && (
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border
                        ${platformStyle[t.platform] ?? ""}`}
          >
            {t.platform}
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="flex-grow">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm lg:text-base italic">
          "{t.quote}"
        </p>
      </blockquote>

      {/* Author */}
      <footer className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <Avatar initials={t.initials} index={index} />
        <div className="min-w-0">
          <p className="font-semibold text-black dark:text-white text-sm truncate">
            {t.author}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            {t.role} · {t.company}
          </p>
        </div>
      </footer>
    </article>
  )
);
TestimonialCard.displayName = "TestimonialCard";

/* ── Section ────────────────────────────────────────────────────────────────── */
const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.25 });
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 bg-white dark:bg-black"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header — col-span-12 centered ── */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div
            ref={headerRef}
            className="col-span-12 text-center"
            style={{
              opacity:    headerVisible ? 1 : 0,
              transform:  headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <span className="section-label">Client Reviews</span>
            <h2
              id="testimonials-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white mt-3 mb-4"
            >
              What Clients{" "}
              <span className="text-[#007AFF]">Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-xl mx-auto">
              Trusted by founders and teams across Fiverr, Upwork, and direct engagements.
            </p>
          </div>
        </div>

        {/* ── Swiper carousel — col-span-12 ── */}
        <div
          ref={carouselRef}
          className="grid grid-cols-12 gap-6"
          style={{
            opacity:    carouselVisible ? 1 : 0,
            transform:  carouselVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s",
          }}
        >
          <div className="col-span-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"            /* space for pagination dots */
              aria-label="Client testimonials carousel"
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={t.id}>
                  <TestimonialCard t={t} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>

      {/* ── Custom Swiper pagination dot styles (dark mode aware) ── */}
      <style>{`
        .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: background 0.2s, transform 0.2s;
        }
        .swiper-pagination-bullet-active {
          background: #007AFF;
          transform: scale(1.3);
        }
        .dark .swiper-pagination-bullet { background: #4b5563; }
        .dark .swiper-pagination-bullet-active { background: #007AFF; }
      `}</style>
    </section>
  );
};

export default memo(TestimonialsSection);
