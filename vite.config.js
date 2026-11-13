import { resolve } from "node:path";
import { defineConfig } from "vite";

const pages = [
  "index.html",
  "zuhause.html",
  "auf-einen-blick.html",
  "paedagogik.html",
  "aufnahme.html",
  "ueber-uns.html",
  "philosophie.html",
  "team.html",
  "kontakt.html",
  "impressum.html",
  "datenschutz.html",
  "admin.html",
];

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/alte-schule-bojum/" : "/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page.replace(".html", ""), resolve(import.meta.dirname, page)])),
    },
  },
});
