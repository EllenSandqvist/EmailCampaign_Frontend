import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Här proxas alla förfrågningar som inte matchar lokala filer till den externa servern
  //     "/api": {
  //       target: "https://email-campaign-platform.vercel.app",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
