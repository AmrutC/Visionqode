import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.visionqode.com',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [sitemap({ changefreq: 'monthly', priority: 0.7, filter: (page) => !/\/(work|insights|terms|404)$/.test(page) })],
  compressHTML: true,
});
