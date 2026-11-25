// Everything about you that the site shows. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  // What the header shows.
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain writes about ML inference systems: serving, GPU kernels, and making models cheaper to run.',
  // The home page: one headline, one line, and the work.
  headline: 'Faster models on fewer GPUs',
  oneLiner: 'I work on ML inference efficiency at Meta, and on LLM serving in open source: <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">torchao</a>.',
  // Each item: a drawing in public/images/ink, a title, one sentence, and the pull requests behind it.
  work: [
    {
      img: '/images/ink/quantization.png',
      title: 'Quantized models that work',
      text: 'Fixes that make 4-bit and 8-bit models load and run correctly: AWQ scales applied per fused shard in vLLM, older torchao checkpoints loading again, a fork-safe torchao import.',
      prs: [
        ['vLLM #69002', 'https://github.com/vllm-project/vllm/pull/69002'],
        ['torchao #5092', 'https://github.com/pytorch/ao/pull/5092'],
        ['torchao #5088', 'https://github.com/pytorch/ao/pull/5088'],
        ['torchao #5152', 'https://github.com/pytorch/ao/pull/5152'],
      ],
    },
    {
      img: '/images/ink/tiles.png',
      title: 'Faster decode kernels',
      text: 'Data-parallel decode tiles for int4 (W4A16) matrix multiplies on A100 GPUs.',
      prs: [['Humming #218', 'https://github.com/vllm-project/humming/pull/218']],
    },
    {
      img: '/images/ink/cache.png',
      title: 'Benchmarks that measure the model',
      text: 'Kept warmup requests out of the prefix cache, and stopped counting sibling cache hits, so serving numbers measure the model rather than the cache.',
      prs: [
        ['vLLM #66701', 'https://github.com/vllm-project/vllm/pull/66701'],
        ['vLLM #66720', 'https://github.com/vllm-project/vllm/pull/66720'],
      ],
    },
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
