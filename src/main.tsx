import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// ── Core Web Vitals tracking (production only) ──────────────────────────────
// Loaded lazily so it doesn't affect main bundle or FCP
if (import.meta.env.PROD) {
  import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    // In production, replace console.log with your analytics endpoint
    // e.g. sendToAnalytics({ name, value, id })
    onCLS(console.log);
    onFID(console.log);
    onFCP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  });
}
