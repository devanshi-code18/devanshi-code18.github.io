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

// Curly quotes and apostrophes for text that skips the Markdown pipeline (titles, summaries).
export function smart(s = '') {
  return s
    .replace(/(^|[\s([{\u2014-])"/g, '$1\u201c').replace(/"/g, '\u201d')
    .replace(/(^|[\s([{\u2014-])'/g, '$1\u2018').replace(/'/g, '\u2019');
}

export const fmtDate = (d, opts = { year: 'numeric', month: 'long', day: 'numeric' }) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });
