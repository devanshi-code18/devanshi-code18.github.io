// A plain-text index of the site for language models and other tools (llmstxt.org).
import { SITE } from '../site.js';
import { getPosts } from '../lib/posts.js';

export async function GET() {
  const posts = await getPosts();
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '## Posts',
    '',
    ...(posts.length
      ? posts.map((p) => `- [${p.data.title}](${new URL(`/posts/${p.id}/`, SITE.url).href})${p.data.description ? `: ${p.data.description}` : ''}`)
      : ['- No posts yet.']),
    '',
    '## About',
    '',
    `- [Home](${SITE.url}/)`,
    `- [Work](${new URL('/work/', SITE.url).href})`,
    `- [Open source](${new URL('/open-source/', SITE.url).href})`,
    `- [Hackathons](${new URL('/hackathons/', SITE.url).href})`,
    `- [All writing](${new URL('/writing/', SITE.url).href})`,
    ...SITE.links.filter((l) => l.label !== 'Google Scholar').map((l) => `- [${l.label}](${l.href})`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
