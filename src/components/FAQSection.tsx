/**
 * FAQSection — lazy-loaded by Index.tsx.
 * Left: sticky title + "Get in touch" CTA
 * Right: custom accordion (useState, no third-party accordion lib)
 */
import { useState, memo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faqs, type FAQ } from "@/data/faqs";

/* ── Single accordion item ───────────────────────────────────────────────── */
interface ItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FAQItem = memo(({ faq, isOpen, onToggle }: ItemProps) => (
  <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
    <button
      id={`faq-btn-${faq.id}`}
      aria-expanded={isOpen}
      aria-controls={`faq-ans-${faq.id}`}
      onClick={() => onToggle(faq.id)}
      className="
        w-full flex items-center justify-between py-4 text-left
        group focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-black rounded
      "
    >
      <h3
        className={`
          text-base lg:text-lg font-medium pr-4 leading-snug transition-colors duration-300
          ${isOpen
            ? "text-[#007AFF]"
            : "text-black dark:text-white group-hover:text-[#007AFF] dark:group-hover:text-blue-400"
          }
        `}
      >
        {faq.question}
      </h3>

      <ChevronDown
        size={20}
        aria-hidden="true"
        className={`
          flex-shrink-0 transition-all duration-300 ease-out
          ${isOpen
            ? "rotate-180 text-[#007AFF]"
            : "rotate-0 text-gray-400 dark:text-gray-600"
          }
        `}
      />
    </button>

    {/* Expandable answer — max-height transition */}
    <div
      id={`faq-ans-${faq.id}`}
      role="region"
      aria-labelledby={`faq-btn-${faq.id}`}
      className={`
        overflow-hidden transition-all duration-300 ease-out
        ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-4">
        {faq.answer}
      </p>
    </div>
  </div>
));
FAQItem.displayName = "FAQItem";

/* ── Section ─────────────────────────────────────────────────────────────── */
const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(1); // first question open by default

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const { ref: leftRef,  isVisible: leftVisible  } = useScrollReveal({ threshold: 0.2 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-white dark:bg-black"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ── Left: Title & CTA — col-span-5, sticky on desktop ── */}
          <div
            ref={leftRef}
            className="col-span-1 md:col-span-3 lg:col-span-5 lg:sticky lg:top-28 self-start"
            style={{
              opacity:    leftVisible ? 1 : 0,
              transform:  leftVisible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <p className="text-[#007AFF] font-bold text-xs uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight mb-5"
            >
              Questions we get{" "}
              <span className="text-[#007AFF]">asked a lot</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Still have questions?{" "}
              <a
                href="#contact"
                className="
                  text-[#007AFF] font-semibold
                  hover:text-[#005FCC] dark:hover:text-blue-300
                  transition-colors duration-300
                  focus:outline-none focus-visible:underline
                "
              >
                Get in touch.
              </a>
            </p>

            {/* Quick stat strip */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "6+", label: "FAQs answered" },
                { value: "24h", label: "Response time" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
                >
                  <div className="text-2xl font-bold text-[#007AFF]">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Accordion — col-span-7 ── */}
          <div
            ref={rightRef}
            className="col-span-1 md:col-span-3 lg:col-span-7"
            style={{
              opacity:    rightVisible ? 1 : 0,
              transform:  rightVisible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s",
            }}
          >
            <div role="list" aria-label="Frequently asked questions">
              {faqs.map((faq) => (
                <div key={faq.id} role="listitem">
                  <FAQItem
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={toggle}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(FAQSection);
