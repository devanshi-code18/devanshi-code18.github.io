// Everything about you that the site shows. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  // What the header shows.
  shortName: 'Devanshi',
  url: 'https://dvnxi.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain writes about ML inference systems: serving, GPU kernels, and making models cheaper to run.',
  // Top of the home page: one lead sentence, then a short second line. Plain HTML is fine.
  intro: [
    'I work on inference systems at Meta, making machine learning models serve faster on fewer GPUs.',
    'In open source I work on LLM serving, mostly <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">PyTorch torchao</a>. Here I write about what I learn along the way.',
  ],
  // The About page.
  about: [
    "I’m Devanshi, a software engineer working on inference systems at Meta. Most of my work is about making machine learning models serve faster and on fewer GPUs.",
    'Outside work I contribute to open-source LLM serving, mostly <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">torchao</a>, PyTorch’s quantization library: fixes that make quantized models load and run correctly, and tuning that makes them faster.',
    'This blog is where I write up what I learn: how serving engines and GPU kernels behave, and the measurements behind them. Views here are my own.',
    'I studied mathematics and computer science at UC San Diego.',
  ],
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
