import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // when deploying to GitHub Pages for a project site, set base to
  // the repository name so assets load from the correct subpath
  base: "/my-portfolio/",
  plugins: [react(), tailwindcss()],
});
