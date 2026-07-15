// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Update `site` to the production domain before deploying.
export default defineConfig({
  site: 'https://alizain.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    icon(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
