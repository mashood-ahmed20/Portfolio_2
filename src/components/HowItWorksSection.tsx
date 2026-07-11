/**
 * HowItWorksSection — Left sidebar with 4 clickable step tabs.
 * Right side: active step illustration with fade transition.
 *
 * Layout (desktop):
 *   Left  → col-span-5: step buttons (number + title + expandable description)
 *   Right → col-span-7: active step image
 */
import { useState, memo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { processSteps } from "@/data/steps";

/* ── Section ─────────────────────────────────────────────────────────────── */
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0); // first step open by default
  const active = processSteps[activeStep];

  const handleStep = useCallback((idx: number) => {
    setActiveStep(idx);
  }, []);

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.25 });
  const { ref: bodyRef,   isVisible: bodyVisible   } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-white dark:bg-black"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="grid grid-cols-12 gap-6 mb-10 lg:mb-14"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="col-span-12 text-center">
            <span className="section-label">How It Works</span>
            <h2
              id="how-it-works-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight mt-3"
            >
              Four steps from brief to{" "}
              <span className="text-[#007AFF]">final file</span>
            </h2>
          </div>
        </div>

        {/* ── Body: left tabs + right image ── */}
        <div
          ref={bodyRef}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12"
          style={{
            opacity:    bodyVisible ? 1 : 0,
            transform:  bodyVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s",
          }}
        >

          {/* ── LEFT: Step tabs — col-span-5 ── */}
          <div
            className="col-span-1 md:col-span-3 lg:col-span-5 flex flex-col gap-3"
            role="tablist"
            aria-label="Process steps"
          >
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  id={`step-tab-${step.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`step-panel-${step.id}`}
                  onClick={() => handleStep(idx)}
                  className={`
                    w-full text-left rounded-xl border-2 p-5
                    transition-all duration-300 ease-out
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-black
                    ${isActive
                      ? "border-[#007AFF] bg-blue-50 dark:bg-blue-950/30"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }
                  `}
                >
                  {/* Number + Title row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`
                          text-sm font-bold flex-shrink-0 tabular-nums
                          transition-colors duration-300
                          ${isActive ? "text-[#007AFF]" : "text-gray-400 dark:text-gray-600"}
                        `}
                      >
                        {step.number}
                      </span>
                      <h3
                        className={`
                          font-semibold text-base leading-snug transition-colors duration-300
                          ${isActive
                            ? "text-[#007AFF]"
                            : "text-black dark:text-white"
                          }
                        `}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`
                        flex-shrink-0 transition-all duration-300 ease-out
                        ${isActive
                          ? "rotate-180 text-[#007AFF]"
                          : "rotate-0 text-gray-400 dark:text-gray-600"
                        }
                      `}
                    />
                  </div>

                  {/* Expandable description */}
                  <div
                    id={`step-panel-${step.id}`}
                    role="tabpanel"
                    aria-labelledby={`step-tab-${step.id}`}
                    className={`
                      overflow-hidden transition-all duration-300 ease-out
                      ${isActive ? "max-h-32 opacity-100 mt-3" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Active step image — col-span-7 ── */}
          <div
            className="col-span-1 md:col-span-3 lg:col-span-7
                       flex items-center justify-center"
          >
            {/* Fixed-height card — same size for all 4 steps */}
            <div
              className="relative w-full h-72 lg:h-80
                         rounded-2xl overflow-hidden
                         bg-white dark:bg-white
                         border border-gray-100 dark:border-gray-200
                         shadow-lg shadow-gray-200/60 dark:shadow-black/30
                         flex items-center justify-center
                         p-3 lg:p-4"
            >
              {processSteps.map((step, idx) => (
                <img
                  key={step.id}
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className={`
                    absolute inset-0 w-full h-full
                    object-contain
                    transition-all duration-500 ease-out
                    ${idx === 3 ? "p-0 lg:p-1" : "p-3 lg:p-4"}
                    ${activeStep === idx
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-3 scale-95 pointer-events-none"
                    }
                  `}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(HowItWorksSection);
