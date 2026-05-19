import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kevin-cv.netlify.app',
  integrations: [
    sitemap({ filter: (page) => !page.endsWith('/resume/') && !page.endsWith('/resume') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
