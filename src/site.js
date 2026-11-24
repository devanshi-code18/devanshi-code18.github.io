// Everything about you that the site shows. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  // What the header shows.
  shortName: 'Devanshi',
  url: 'https://dvnxi.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain writes about ML inference systems: serving, GPU kernels, and making models cheaper to run.',
  // Your photo on the home page (public/images/me.jpg). Currently your GitHub picture.
  photo: '/images/me.jpg',
  role: 'Software engineer, inference systems at Meta',
  // Home page bio. Plain HTML is fine.
  bio: [
    'I make machine learning models serve faster and on fewer GPUs. At Meta I work on GPU inference efficiency; in open source I work on LLM serving, mostly <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">torchao</a>, PyTorch’s quantization library.',
    'I studied mathematics and computer science at UC San Diego. I write about what I learn: how serving engines and GPU kernels behave, and the measurements behind them.',
  ],
  // "Selected work" on the home page: a few things worth knowing you for, newest first.
  selected: [
    { text: 'Faster int4 decode on A100s: data-parallel decode tiles for dense W4A16 matmuls', where: 'Humming', href: 'https://github.com/vllm-project/humming/pull/218' },
    { text: 'Fixed torchao AWQ models in vLLM by applying each fused shard’s activation scale', where: 'vLLM', href: 'https://github.com/vllm-project/vllm/pull/69002' },
    { text: 'Kept serving-benchmark warmups out of the prefix cache, so results measure the model, not the cache', where: 'vLLM', href: 'https://github.com/vllm-project/vllm/pull/66701' },
    { text: 'Made torchao load older quantized checkpoints whose configs still carry removed fields', where: 'torchao', href: 'https://github.com/pytorch/ao/pull/5092' },
    { text: 'Made <code>import torchao</code> fork-safe on CUDA builds', where: 'torchao', href: 'https://github.com/pytorch/ao/pull/5088' },
  ],
  // Set to your Substack address (e.g. 'https://devanshi.substack.com') to list its posts here too.
  substack: '',
  links: [
    { label: 'GitHub', href: 'https://github.com/devanshi-code18' },
    { label: 'X', href: 'https://x.com/_devanshijain' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/djain18' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=uH_rvw4AAAAJ' },
  ],
  x: '@_devanshijain',
  github: 'devanshi-code18',
  // Merged pull requests in these GitHub orgs are listed under "Open source" (fetched at build time).
  ossOrgs: ['vllm-project', 'pytorch', 'Dao-AILab'],
};
