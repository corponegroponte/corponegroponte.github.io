import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

/**
 * GitHub Pages no reescribe rutas de un SPA: emite 404.html con el mismo shell
 * para que cualquier ruta profunda cargue la app en vez del 404 de GitHub.
 */
function vitePluginSpaFallback(): Plugin {
  return {
    name: "spa-404-fallback",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (index && index.type === "asset") {
        this.emitFile({ type: "asset", fileName: "404.html", source: index.source as string });
      }
    },
  };
}

// Se retiraron los plugins de Manus (runtime inline de ~367 KB en cada build,
// jsx-loc con data-loc en producción y el colector de logs de desarrollo) porque
// esta página se publica como sitio estático en GitHub Pages.
const plugins = [react(), tailwindcss(), vitePluginSpaFallback()];

// El repositorio se llama corponegroponte.github.io, así que GitHub Pages lo sirve
// como sitio de organización en la raíz: https://corponegroponte.github.io/
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
