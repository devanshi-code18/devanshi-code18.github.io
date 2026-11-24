import { getCollection } from 'astro:content';

const showDrafts = !import.meta.env.PROD;

export async function getPosts() {
  const all = await getCollection('posts', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => b.data.date - a.data.date);
}

export function readingMinutes(body = '') {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export const fmtDate = (d, opts = { year: 'numeric', month: 'long', day: 'numeric' }) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });
