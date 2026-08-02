// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shavkatov.io',
  trailingSlash: 'always',
  // Standart 'auto' rejimi ~4 KB dan katta CSS'ni tashqi faylga chiqaradi, u esa
  // render'ni to'sadi va birinchi paint'dan oldin yana bir so'rov qo'shadi.
  // Bu yerda sahifa CSS'i kichik, shuning uchun har doim HTML ichida qoladi.
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
