// Everything about you that the site shows. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  // The name in the top bar.
  blogName: "devanshi's blog",
  // Shown on the Contact page if set, e.g. 'me@example.com'.
  email: '',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain writes about ML inference systems: serving, GPU kernels, and making models cheaper to run.',
  // The two sentences at the top of the home page. Plain HTML is fine.
  intro: [
    'I work on inference systems at Meta, making machine learning models serve faster on fewer GPUs.',
    'In open source I work on LLM serving, mostly <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">PyTorch torchao</a>. I studied math and computer science at UC San Diego.',
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
