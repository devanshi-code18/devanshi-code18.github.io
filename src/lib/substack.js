// Posts from a Substack, read from its RSS feed when the site builds.
import { SITE } from '../site.js';

const decode = (s = '') => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const tag = (xml, name) => decode((xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)) || [])[1]);

let cache;
export async function getSubstackPosts() {
  if (cache) return cache;
  cache = [];
  if (!SITE.substack) return cache;
  try {
    const res = await fetch(`${SITE.substack.replace(/\/$/, '')}/feed`, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'dvnxi.github.io' } });
    if (!res.ok) throw new Error(`Substack answered ${res.status}`);
    const xml = await res.text();
    cache = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => ({
      external: true,
      url: tag(it, 'link'),
      title: tag(it, 'title'),
      description: tag(it, 'description').replace(/<[^>]+>/g, ''),
      date: new Date(tag(it, 'pubDate')),
    }));
  } catch (err) {
    console.warn(`[substack] skipped: ${err.message}`);
  }
  return cache;
}
