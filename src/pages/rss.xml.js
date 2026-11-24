import rss from '@astrojs/rss';
import { SITE } from '../site.js';
import { getPosts } from '../lib/posts.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name}: writing`,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
