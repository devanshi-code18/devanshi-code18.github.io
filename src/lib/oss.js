// Merged pull requests for the "Open source" list, fetched from GitHub when the site builds
// (the deploy workflow also rebuilds every night, so new merges show up by themselves).
import { SITE } from '../site.js';

const NAMES = { 'vllm-project/vllm': 'vLLM', 'pytorch/ao': 'torchao', 'vllm-project/humming': 'Humming', 'vllm-project/flash-attention': 'FlashAttention (vLLM)', 'Dao-AILab/flash-attention': 'FlashAttention' };

// Used if GitHub can't be reached during the build.
const FALLBACK = [
  ['vllm-project/humming', 218, 'Data-parallel decode tiles for dense W4A16 on SM80', '2026-11-24'],
  ['pytorch/ao', 5152, 'Implement torch.equal for TorchAOBaseTensor', '2026-11-24'],
  ['vllm-project/vllm', 66701, 'Keep bench serve warmups and ready check out of the prefix cache', '2026-11-23'],
  ['vllm-project/vllm', 69002, "torchao: apply each fused shard's AWQ act_pre_scale", '2026-11-23'],
  ['vllm-project/vllm', 69066, 'Deprecate the TorchAO backend', '2026-11-23'],
  ['pytorch/ao', 5092, 'Load configs that still carry removed layout fields', '2026-11-18'],
  ['pytorch/ao', 5087, 'Make mx_formats import not initialize CUDA', '2026-11-17'],
  ['pytorch/ao', 5089, 'Fix test_vllm on vLLM 0.29-0.33: set max_model_len', '2026-11-16'],
  ['pytorch/ao', 5088, 'Make import torchao fork-safe on CUDA builds', '2026-11-12'],
].map(([repo, number, title, merged]) => ({ repo, number, title, merged: new Date(merged), url: `https://github.com/${repo}/pull/${number}` }));

// "[Bugfix][Quantization] torchao: fix x" -> "torchao: fix x"; "perf(tune): add y" -> "Add y"
export function cleanTitle(t) {
  const s = t.replace(/^(\s*\[[^\]]*\]\s*)+/, '').replace(/^[a-z]+\([^)]*\):\s*/, '').trim();
  // Keep a leading lowercase name like "torchao:" as it is.
  if (/^[a-z0-9_.-]+:/.test(s)) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const repoName = (repo) => NAMES[repo] || repo.split('/')[1];

let cache;
export async function getMergedPRs() {
  if (cache) return cache;
  const orgs = SITE.ossOrgs.map((o) => `org:${o}`).join(' ');
  const q = encodeURIComponent(`author:${SITE.github} is:pr is:merged ${orgs}`);
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${SITE.github}-site` };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=100`, { headers, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
    const { items } = await res.json();
    const prs = items
      .filter((i) => i.pull_request?.merged_at)
      .map((i) => {
        const repo = i.repository_url.split('/repos/')[1];
        return { repo, number: i.number, title: cleanTitle(i.title), merged: new Date(i.pull_request.merged_at), url: i.html_url };
      })
      .sort((a, b) => b.merged - a.merged);
    cache = prs.length ? prs : FALLBACK;
  } catch (err) {
    console.warn(`[oss] using the saved list: ${err.message}`);
    cache = FALLBACK;
  }
  return cache;
}

export const allMergedUrl = () => {
  const orgs = SITE.ossOrgs.map((o) => `org:${o}`).join('+');
  return `https://github.com/search?q=author%3A${SITE.github}+is%3Apr+is%3Amerged+${orgs.replace(/:/g, '%3A')}&type=pullrequests`;
};
