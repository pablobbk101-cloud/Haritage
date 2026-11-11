import { defineConfig } from 'astro/config';

// Replace `site` with the real domain once the site is live (used for canonical URLs, OG and sitemap).
export default defineConfig({
  site: 'https://haritage.pages.dev',
  devToolbar: { enabled: false },
  build: { format: 'directory' },
});
