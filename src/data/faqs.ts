/**
 * FAQ data for the FAQ section.
 */

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How does your process work?",
    answer:
      "I follow a 5-step process: Intake & Brief, Storyboard & Script, Finalization Call, Production, and Revision & Delivery. Each step is collaborative to ensure the final output matches your vision — no surprises once production begins.",
  },
  {
    id: 2,
    question: "How long does a video take to produce?",
    answer:
      "Most projects are completed in 7–14 business days depending on complexity. From asset receipt to final file delivery, I keep things moving fast without cutting corners. Rush projects are available at premium rates — just ask.",
  },
  {
    id: 3,
    question: "What do you need from us to get started?",
    answer:
      "I'll send you a structured intake form. Share your brief, brand assets, UI references (Figma links, screenshots), and inspiration videos. If you have a script ready, include it. If not, we write it together from scratch.",
  },
  {
    id: 4,
    question: "How many revisions are included?",
    answer:
      "One comprehensive revision round is included with every project. We do the hard thinking upfront — via storyboard review and a finalization call — so revisions stay minimal. Additional rounds are available at a flat fee.",
  },
  {
    id: 5,
    question: "What does it cost?",
    answer:
      "Pricing starts at $500 and scales with project scope, complexity, and timeline. After the intake form, I'll send you a custom quote based on your specific needs — transparent, no hidden fees.",
  },
  {
    id: 6,
    question: "Do you work with early-stage startups?",
    answer:
      "Absolutely. I love working with early-stage founders who need to look Series A-ready on a seed budget. I understand constraints and deliver premium quality at fair prices. Some of my best projects came from day-one startups.",
  },
];
