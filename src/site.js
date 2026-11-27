// Everything the site shows about you. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain, systems engineer at Meta working on inference performance for video recommendation models, and open-source contributor to PyTorch and vLLM.',
  // The line under the name on the home page. Plain HTML is fine.
  oneLiner: 'I’m a systems engineer at Meta, working on inference performance for video recommendation models. I’m an avid open&#8209;source contributor to <a href="https://github.com/search?q=is%3Apr+author%3Adevanshi-code18+org%3Avllm-project&amp;type=pullrequests&amp;s=created&amp;o=desc">vLLM</a> and <a href="https://github.com/search?q=is%3Apr+author%3Adevanshi-code18+org%3Apytorch&amp;type=pullrequests&amp;s=created&amp;o=desc">PyTorch</a>. I studied mathematics and computer science at UC&nbsp;San&nbsp;Diego.',
  contact: 'You can reach me at devanshijain018 [at] gmail [dot] com.',
  heroAlt: 'A small, smiling GPU card with legs sprints ahead carrying a compact neural network, leaving behind a line of GPU cards hauling a giant network on a cart.',
  links: [
    { label: 'GitHub', href: 'https://github.com/devanshi-code18' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/djain18' },
    { label: 'X', href: 'https://x.com/_devanshijain' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=uH_rvw4AAAAJ' },
  ],
  x: '@_devanshijain',
  github: 'devanshi-code18',
  // Merged and open pull requests in these GitHub orgs are listed on the open-source page (fetched at build time).
  ossOrgs: ['vllm-project', 'pytorch', 'Dao-AILab'],
  // Set to your Substack address (e.g. 'https://devanshi.substack.com') to list its posts under Writing too.
  substack: '',

  // Open-source highlights, most impact first: one plain line each, no pronouns,
  // with a wordless ink figure in src/figures.
  oss: [
    {
      fig: 'awq',
      alt: 'One scale shared by three blocks of weights splits into a scale for each block.',
      title: 'AWQ models like Qwen3-8B now give the right answers in vLLM (0% → 86% on GSM8K).',
      repo: 'vLLM',
      prs: [['#69002', 'https://github.com/vllm-project/vllm/pull/69002']],
    },
    {
      fig: 'decode-tiles',
      alt: 'Two half-finished halves of a tile slide together and the whole tile inks in.',
      title: 'Up to 8% faster int4 decoding for Qwen3-8B on A100.',
      repo: 'Humming',
      prs: [['#218', 'https://github.com/vllm-project/humming/pull/218']],
    },
    {
      fig: 'checkpoints',
      alt: 'Twenty-one squares, fifteen crossed out; the crossed-out ones ink in.',
      title: 'All 21 official PyTorch quantized checkpoints load again.',
      repo: 'torchao',
      prs: [['#5092', 'https://github.com/pytorch/ao/pull/5092']],
    },
    {
      fig: 'benchmarks',
      alt: 'A warmup row and a measured row stop sharing one cache, and the measured row fills in.',
      title: 'vLLM benchmarks now time the model, not the cache.',
      repo: 'vLLM',
      prs: [['#66701', 'https://github.com/vllm-project/vllm/pull/66701'], ['#66720', 'https://github.com/vllm-project/vllm/pull/66720']],
    },
    {
      fig: 'fork-safe',
      alt: 'A process tree: the inked parent goes clean, and its four broken workers ink in.',
      title: 'torchao no longer crashes vLLM’s GPU workers on import.',
      repo: 'torchao',
      prs: [['#5087', 'https://github.com/pytorch/ao/pull/5087'], ['#5088', 'https://github.com/pytorch/ao/pull/5088']],
    },
    {
      fig: 'tied-weights',
      alt: 'Two matching weight grids go from not equal to equal, tied by a line.',
      title: 'Tied-weight models like Phi-4-mini AWQ load in Transformers 5.',
      repo: 'torchao',
      prs: [['#5152', 'https://github.com/pytorch/ao/pull/5152']],
    },
  ],

  // The Work page, newest first: one line per role. `start` (fractional year) places each role on the
  // hand-inked career line at the top of the page.
  career: [
    { org: 'Meta', role: 'Systems Engineer II', dates: 'Aug 2026 – now', start: 2026.58,
      line: '$15M+/yr GPU inference savings on video ranking.' },
    { org: 'Meta', role: 'Software Engineer', dates: 'Apr 2025 – Jul 2026', start: 2025.25,
      line: 'Muse Spark 1.2 post-training data; 55% fewer unstructured account access reports.' },
    { org: 'Amazon', role: 'SDE Intern', dates: 'Fall 2024', start: 2024.67,
      line: 'Feature-flag service for 50+ engineers.' },
    { org: 'Meta', role: 'Software Engineer Intern', dates: 'Summer 2024', start: 2024.42,
      line: 'Login migration for 64M+ users.' },
    { earlier: true, org: 'Center for Energy Research', href: 'https://cer.ucsd.edu/', role: 'Software Engineer Intern', dates: '2022 – 2024', start: 2022.67 },
    { earlier: true, org: 'Flow Physics Lab', href: 'https://flowphysics.ucsd.edu/', role: 'Student Researcher', dates: 'Summer 2023', start: 2023.42, note: '<a href="https://escholarship.org/uc/item/8rs4v3pq">Paper</a>' },
    { earlier: true, org: 'RoboSub', role: 'Embedded Systems Engineer', dates: '2021 – 2023', start: 2021.83 },
    { earlier: true, org: 'COSMOS', href: 'https://jacobsschool.ucsd.edu/cosmos', role: 'Teaching Assistant', dates: 'Summer 2022', start: 2022.42 },
  ],

  // Peer review and judging. Only roles that are confirmed.
  reviewer: [
    { venue: 'CPAL 2027', what: 'Conference on Parsimony and Learning, Proceedings Track (PMLR)', href: 'https://cpal.cc/' },
    { venue: 'AAAI 2027', href: 'https://aaai.org/conference/aaai/aaai-27/', workshops: [
      ['Deployable AI (DAI) Workshop', 'https://dai-workshop.github.io/'],
      ['Trustworthy Evolution of AI Agents (Trust4RSI-Agent) Workshop', 'https://trust4rsi-agent.github.io/AAAI2027/'],
    ] },
    { venue: 'WWW 2027', href: 'https://www2027.thewebconf.org/', workshops: [['LLM and Agents for Recommendation Systems (LARS) Workshop', 'https://www2027.thewebconf.org/workshops/#workshop-lars']] },
    { venue: 'WSDM 2027', href: 'https://www.wsdm-conference.org/2027/', workshops: [['AutoResearch for IR & RecSys Workshop', 'https://www.wsdm-conference.org/2027/accepted-workshops.html']] },
  ],
  // sponsors: the two biggest (SVIC: its Leadership Council tier; Cal Hacks: first two "presented by";
  // LA AI: largest sponsor prize pools). teams: how many teams she judged (fill in when known).
  judge: [
    { venue: 'Silicon Valley Innovation Challenge', what: 'San José State University, Nov⁠–⁠Dec 2026', href: 'https://www.sjsu.edu/svic/', sponsors: ['Cisco', 'AT&T'], teams: null },
    { venue: 'Cal Hacks 13.0', what: 'UC Berkeley, Oct 2026', href: 'https://www.calhacks.io/', sponsors: ['Anthropic', 'Amazon’s Annapurna Labs'], teams: null },
    { venue: 'LA AI Hackathon', what: 'UCLA, Oct 2026', href: 'https://la-ai-hackathon-2026.devpost.com/', sponsors: ['Cognition', 'Creao AI'], teams: null },
  ],
  wins: [
    { name: 'Meta Global Hackathon', what: 'Judges’ Choice, 2026' },
    { name: 'Base × Ohara Buildathon', what: 'Prize winner, 2025', summary: 'An RSVP and voting app on Base, built in under 2 hours with Ohara’s AI agents: stake USDC to commit, get it back on showing up.' },
    { name: 'TreeHacks 2025', what: '2nd prize, Liquid AI Edge AI track · solo', href: 'https://devpost.com/software/optimized-convolution-kernels-for-edge-ai',
      summary: 'ExecuTorch convolution operators for phones that pick a direct or FFT kernel by filter size, for faster on‑device inference.' },
  ],
};
