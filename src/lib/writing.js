// Everything written, newest first: posts on this site plus Substack posts.
import { getPosts } from './posts.js';
import { getSubstackPosts } from './substack.js';

export async function getWriting() {
  const local = (await getPosts()).map((p) => ({ external: false, url: `/posts/${p.id}/`, title: p.data.title, description: p.data.description, date: p.data.date, topic: p.data.topic, draft: p.data.draft }));
  const remote = await getSubstackPosts();
  return [...local, ...remote].sort((a, b) => b.date - a.date);
}
