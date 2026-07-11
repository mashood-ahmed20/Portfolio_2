import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Performance plugins — installed via: npm install --save-dev vite-plugin-compression2 rollup-plugin-visualizer
// They are optional and will be skipped if not installed
let compression: any = null;
let visualizer: any = null;
try {
  compression = require("vite-plugin-compression2").compression;
} catch { /* not installed yet */ }
try {
  visualizer = require("rollup-plugin-visualizer").visualizer;
} catch { /* not installed yet */ }

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Gzip compression for production bundles
    mode === "production" && compression && compression({ algorithm: "gzip", exclude: [/\.(br)$/, /\.(gz)$/] }),
    // Bundle visualizer — generates dist/stats.html
    mode === "production" && visualizer && visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure only a single copy of React is ever bundled
    dedupe: ["react", "react-dom"],
  },
  build: {
    // Use esbuild (faster) or terser for production minification
    minify: "esbuild",
    target: "es2020",
    // Warn at 600KB, our budget
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting to keep main bundle lean
        manualChunks(id) {
          // React MUST be in the same chunk as libraries that call React.forwardRef
          // Keep react/react-dom in vendor (NOT in a separate chunk) to avoid
          // load-order issues where React is undefined when Radix UI initialises.
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-is/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor";
          }
          // Radix UI primitives → ui-radix chunk
          if (id.includes("@radix-ui")) {
            return "ui-radix";
          }
          // Recharts is heavy — isolate it
          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts";
          }
          // Swiper if used
          if (id.includes("swiper")) {
            return "swiper";
          }
          // EmailJS — isolated
          if (id.includes("@emailjs")) {
            return "emailjs";
          }
          // Remaining node_modules
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        // Use content-hash for long-term caching
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Enable source maps for production debugging (set to false to save space)
    sourcemap: false,
  },
  // Optimize deps — pre-bundle for faster dev cold start
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },
}));
