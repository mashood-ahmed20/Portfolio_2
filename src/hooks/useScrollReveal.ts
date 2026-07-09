import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRevealOptions {
  /** Intersection threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** Root margin for earlier/later triggering. Default: "0px 0px -50px 0px" */
  rootMargin?: string;
  /** If true, re-animate every time element enters. Default: false (once only) */
  repeat?: boolean;
}

/**
 * Intersection Observer-based scroll reveal.
 * Disconnects after first reveal by default for performance.
 * Respects prefers-reduced-motion.
 */
export const useScrollReveal = (
  thresholdOrOptions: number | ScrollRevealOptions = 0.1
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Normalise argument (backwards-compatible: accepts plain number)
  const options: ScrollRevealOptions =
    typeof thresholdOrOptions === "number"
      ? { threshold: thresholdOrOptions }
      : thresholdOrOptions;

  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    repeat = false,
  } = options;

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect once visible unless repeat mode
          if (!repeat) {
            observer.disconnect();
          }
        } else if (repeat) {
          setIsVisible(false);
        }
      });
    },
    [repeat]
  );

  useEffect(() => {
    // Respect reduced-motion: immediately show without animation
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isVisible };
};
