import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";

import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import ErrorBoundary from "@/components/ErrorBoundary";

// ── Lazy-loaded sections (below the fold, not needed for FCP) ──────────────
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));

// ── Lightweight skeleton for lazy section loading ──────────────────────────
const SectionSkeleton = () => (
  <div className="section-padding" aria-hidden="true">
    <div className="container mx-auto space-y-6 animate-pulse">
      <div className="h-6 w-32 bg-muted/40 rounded-full mx-auto" />
      <div className="h-10 w-64 bg-muted/30 rounded-lg mx-auto" />
      <div className="h-4 w-80 bg-muted/20 rounded mx-auto" />
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO canonical="/" />
      <Header />

      <main id="main-content">
        {/* ── Critical above-fold sections (eager) ── */}
        <HeroSection />
        <AboutSection />
        <WhatIDoSection />
        <ServicesSection />
        <WhyChooseMeSection />

        <HowItWorksSection />

        {/* ── Below-fold sections (lazy loaded) ── */}
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <TestimonialsSection />
          </Suspense>
        </ErrorBoundary>

        <ContactSection />

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <FAQSection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
