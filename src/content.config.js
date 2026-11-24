import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per post in src/content/posts. The file name is the URL:
// src/content/posts/my-first-post.md -> /posts/my-first-post/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullish().transform((v) => v ?? ''),
    date: z.coerce.date(),
    updated: z.coerce.date().nullish(),
    // Drafts show up in `npm run dev` but not on the live site.
    draft: z.boolean().nullish().transform((v) => v ?? false),
    // Picture on the post's card on the home page, e.g. /images/my-post.png (optional).
    cover: z.string().nullish(),
    // Posts with the same topic are grouped under that heading on the home page (optional).
    topic: z.string().nullish(),
  }),
});

export const collections = { posts };
