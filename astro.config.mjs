import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  // Styles go inside each page, so a page cached or prefetched before a deploy never points at a
  // stylesheet the deploy removed.
  build: { inlineStylesheets: 'always' },
  site: 'https://devanshi-code18.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      // $x^2$ inline and $$...$$ blocks are typeset with KaTeX.
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeHeadingIds,
        // A "#" link next to each heading, shown on hover, for linking to a section.
        [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor'], ariaHidden: 'true', tabIndex: -1 }, content: { type: 'text', value: '#' } }],
        rehypeKatex,
      ],
    }),
    shikiConfig: {
      // Colours come from CSS variables in global.css, so code matches the page in light and dark.
      theme: 'css-variables',
      wrap: false,
    },
  },
});
