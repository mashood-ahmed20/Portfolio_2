import { useState, useCallback, memo } from "react";
import { Mail, Linkedin, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── EmailJS credentials (already configured) ────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_ouomm7a";
const EMAILJS_TEMPLATE_ID = "template_lv8qk3j";
const EMAILJS_PUBLIC_KEY  = "a7Uc3EsGxyJzdeT6m";

/* ── Form select options ─────────────────────────────────────────────────── */
const BUDGETS = [
  "Under $100",
  "$100 – $300",
  "$300 – $500",
  "$500 – $1,000",
  "$1,000+",
];

const PROJECT_TYPES = [
  "Video Editing",
  "Motion Graphics",
  "SaaS Explainer",
  "Product Promo",
  "Social Media Ads",
  "Short-Form Content",
  "Brand Commercial",
  "Web Development",
  "Other",
];

/* ── Shared input class ──────────────────────────────────────────────────── */
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 " +
  "bg-white dark:bg-gray-950 text-black dark:text-white " +
  "placeholder-gray-400 dark:placeholder-gray-500 " +
  "focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent " +
  "transition-all duration-200 text-sm";

/* ── Contact item card (Email / LinkedIn / Location) ─────────────────────── */
interface ContactItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}
const ContactItem = memo(({ href, icon, label, value, external }: ContactItemProps) => {
  const inner = (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 group hover:border-[#007AFF] dark:hover:border-[#007AFF]">
      <div
        className="w-10 h-10 rounded-lg bg-[#007AFF]/10 dark:bg-[#007AFF]/10
                   flex items-center justify-center flex-shrink-0
                   group-hover:bg-[#007AFF] transition-colors duration-300"
        aria-hidden="true"
      >
        <span className="text-[#007AFF] group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-black dark:text-white truncate group-hover:text-[#007AFF] transition-colors duration-300">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`${label}: ${value}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] rounded-xl"
      >
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
});
ContactItem.displayName = "ContactItem";

/* ── Section ─────────────────────────────────────────────────────────────── */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: leftRef,  isVisible: leftVisible  } = useScrollReveal({ threshold: 0.1 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({ threshold: 0.1 });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          budget:       formData.budget,
          project_type: formData.projectType,
          message:      formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours!",
      });
      setFormData({ name: "", email: "", budget: "", projectType: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me at ig.mashood@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-950"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header — left-aligned ── */}
        <div className="grid grid-cols-12 gap-6 mb-10 lg:mb-12">
          <div className="col-span-12">
            <span className="section-label">Get In Touch</span>
            <h2
              id="contact-heading"
              className="text-4xl lg:text-5xl font-bold text-black dark:text-white mt-3 mb-4"
            >
              Ready to Work{" "}
              <span className="text-[#007AFF]">Together?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg max-w-xl">
              Let's discuss your project and bring your vision to life.
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ── Left: Contact Information — col-span-5 ── */}
          <div
            ref={leftRef}
            className="col-span-1 md:col-span-3 lg:col-span-5 space-y-6"
            style={{
              opacity:    leftVisible ? 1 : 0,
              transform:  leftVisible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Feel free to reach out through any of these channels. I'm always excited to
                discuss new projects and creative collaborations.
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-3">
              <ContactItem
                href="mailto:ig.mashood@gmail.com"
                icon={<Mail size={18} />}
                label="Email"
                value="ig.mashood@gmail.com"
              />
              <ContactItem
                href="https://www.linkedin.com/in/mashood-ahmed-sheikh-436166250/"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                value="Connect on LinkedIn"
                external
              />
              <ContactItem
                icon={<MapPin size={18} />}
                label="Location"
                value="Karachi, Pakistan — Available Worldwide"
              />
            </div>

            {/* Platform badges */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                Also available on
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.fiverr.com/mashoodahmed786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                             text-gray-700 dark:text-gray-300 text-sm font-medium
                             hover:border-[#007AFF] dark:hover:border-[#007AFF]
                             hover:text-[#007AFF] dark:hover:text-[#007AFF]
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"
                >
                  Fiverr
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~01ec653de9f0fb0e8a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                             text-gray-700 dark:text-gray-300 text-sm font-medium
                             hover:border-[#007AFF] dark:hover:border-[#007AFF]
                             hover:text-[#007AFF] dark:hover:text-[#007AFF]
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"
                >
                  Upwork
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form — col-span-7 ── */}
          <div
            ref={rightRef}
            className="col-span-1 md:col-span-3 lg:col-span-7"
            style={{
              opacity:    rightVisible ? 1 : 0,
              transform:  rightVisible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
            }}
          >
            <div className="bg-white dark:bg-black p-7 lg:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Your Name <span className="text-[#007AFF]" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    aria-required="true"
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Your Email <span className="text-[#007AFF]" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    aria-required="true"
                    className={INPUT_CLASS}
                  />
                </div>

                {/* Budget + Project Type — 2-col */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={INPUT_CLASS + " cursor-pointer"}
                    >
                      <option value="">Select budget</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={INPUT_CLASS + " cursor-pointer"}
                    >
                      <option value="">Select type</option>
                      {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black dark:text-white mb-2">
                    Your Message <span className="text-[#007AFF]" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and goals..."
                    rows={5}
                    required
                    aria-required="true"
                    className={INPUT_CLASS + " resize-none"}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2
                             bg-[#007AFF] hover:bg-[#005FCC]
                             disabled:opacity-60 disabled:cursor-not-allowed
                             text-white font-semibold py-3 px-6 rounded-lg
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]
                             focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(ContactSection);
