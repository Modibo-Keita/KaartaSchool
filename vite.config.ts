import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig(async () => {
  // Plugins dev uniquement pour REPL
  const devPlugins =
    process.env.NODE_ENV !== "production" && process.env.REPL_ID
      ? [
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
          (await import("@replit/vite-plugin-dev-banner")).devBanner(),
        ]
      : [];

  return {
    root: "client", // dossier racine du frontend
    plugins: [
      react(),
      runtimeErrorOverlay(),
      metaImagesPlugin(),
      ...devPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "client/dist"), // dossier à publier sur Netlify
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      fs: { strict: true },
    },
  };
});
