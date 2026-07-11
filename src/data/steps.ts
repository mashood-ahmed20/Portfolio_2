/**
 * Process steps data for the "How It Works" section.
 * Images imported from src/assets/ via Vite for proper bundling & hashing.
 */
import intakeFormImg from '@/assets/01.png';
import storyboardImg from '@/assets/02.jpg';
import productionImg from '@/assets/03.jpg';
import revisionImg from '@/assets/04.jpg';

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Intake Form",
    description:
      "We send a structured intake form. You share your brief, brand assets, UI references (Figma links, screenshots), and inspiration videos.",
    image: intakeFormImg,
    imageAlt: "Clipboard with checklist — Intake Form step",
  },
  {
    id: 2,
    number: "02",
    title: "Storyboard & Script",
    description:
      "I build a full storyboard in Figma and refine the script with you until the concept is locked.",
    image: storyboardImg,
    imageAlt: "Designer working on storyboard — Storyboard & Script step",
  },
  {
    id: 3,
    number: "03",
    title: "Production",
    description:
      "Our team edits the full video: motion graphics, UI animation, sound design, and voiceover sync.",
    image: productionImg,
    imageAlt: "Video editor at workstation — Production step",
  },
  {
    id: 4,
    number: "04",
    title: "Revision & Delivery",
    description:
      "You review the draft and leave timestamped comments. We apply one comprehensive revision round, then deliver the final file.",
    image: revisionImg,
    imageAlt: "Audio engineer with headphones — Revision & Delivery step",
  },
];
