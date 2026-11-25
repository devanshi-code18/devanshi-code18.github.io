// Everything the site shows about you. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain, systems engineer at Meta working on inference performance for video recommendation models, and open-source contributor to PyTorch and vLLM.',
  // The line under the name on the home page. Plain HTML is fine.
  oneLiner: 'Systems engineer at Meta working on inference performance for video recommendation models. I contribute to open source, mostly <a href="https://github.com/pytorch/ao">PyTorch</a> and <a href="https://github.com/vllm-project/vllm">vLLM</a>. B.S. in Mathematics and Computer Science from UC&nbsp;San&nbsp;Diego.',
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

  // Open-source highlights, most impact first. The home page shows the first four.
  // Each has a wordless sketch in public/images/ink.
  oss: [
    {
      img: '/images/ink/awq.png',
      alt: 'One shared dial for three layer sections, then each section with its own dial.',
      title: 'Wrong answers from AWQ models',
      text: 'vLLM merges some of a model’s layers, like q, k and v, into one big layer. torchao’s AWQ checkpoints give each of those layers its own scale, but the merged layer kept only one, so these models quietly gave wrong answers. Now each part keeps its own scale: Qwen3-8B AWQ went from 0% to 86% on GSM8K.',
      repo: 'vLLM',
      prs: [['#69002', 'https://github.com/vllm-project/vllm/pull/69002']],
    },
    {
      img: '/images/ink/decode-tiles.png',
      alt: 'A big tile sawed apart and glued back together, next to small tiles each finished by its own worker.',
      title: 'Faster int4 decoding on A100',
      text: 'When you generate one token at a time, the matrix multiplies are tiny, and splitting each one up and merging the pieces back together costs more than it saves. Computing each output tile in one go made the int4 kernels up to 1.46× faster and Qwen3-8B decoding 8% faster, with the same accuracy.',
      repo: 'Humming',
      prs: [['#218', 'https://github.com/vllm-project/humming/pull/218']],
    },
    {
      img: '/images/ink/checkpoints.png',
      alt: 'Suitcases stuck at a door by old tags; once the tags are cut they slide through.',
      title: 'Official checkpoints that wouldn’t load',
      text: '15 of the 21 official PyTorch quantized checkpoints stopped loading on torchao 0.17, because their configs still carried fields from an older version. torchao now drops those fields with a warning, and all 21 load in vLLM and Transformers.',
      repo: 'torchao',
      prs: [['#5092', 'https://github.com/pytorch/ao/pull/5092']],
    },
    {
      img: '/images/ink/benchmarks.png',
      alt: 'A race where a runner’s shortcut through a box is crossed out and the honest runner is timed.',
      title: 'Benchmarks that measured the cache',
      text: 'vLLM’s benchmark warmed up with the same prompt it then measured, so the first “real” request hit the cache and looked about 4× faster than it was. Warmups now use different prompts, and requests that sample several outputs no longer count their siblings’ cache hits.',
      repo: 'vLLM',
      prs: [['#66701', 'https://github.com/vllm-project/vllm/pull/66701'], ['#66720', 'https://github.com/vllm-project/vllm/pull/66720']],
    },
    {
      img: '/images/ink/fork-safe.png',
      alt: 'A process tree cracked by a heavy weight at the top, next to a clean tree with the weight set aside.',
      title: 'Importing torchao crashed vLLM’s workers',
      text: 'vLLM imports torchao and then forks its GPU workers. Just importing torchao touched the GPU, and a forked process can’t use a GPU its parent already set up, so the workers crashed. torchao now waits until a kernel actually needs the GPU.',
      repo: 'torchao',
      prs: [['#5087', 'https://github.com/pytorch/ao/pull/5087'], ['#5088', 'https://github.com/pytorch/ao/pull/5088']],
    },
    {
      img: '/images/ink/tied-weights.png',
      alt: 'Two chained blocks weighed against each other on a balance scale.',
      title: 'Tied weights broke loading in Transformers 5',
      text: 'Transformers 5 checks whether two weights are the same with <code>torch.equal</code>, which torchao tensors didn’t support. Models that share weights between their input and output layers, like Phi-4-mini AWQ, failed to load. Now they load.',
      repo: 'torchao',
      prs: [['#5152', 'https://github.com/pytorch/ao/pull/5152']],
    },
  ],

  // The Work page, newest first. Each main role has a wordless sketch in public/images/work.
  career: [
    {
      org: 'Meta', role: 'Systems Engineer II', dates: 'Aug 2026 – now', img: '/images/work/meta-perf.png',
      alt: 'Videos ride a conveyor through a GPU faster once the waiting is removed.',
      summary: 'Making video ranking models serve more requests per GPU.',
      points: [
        '23.4% more inference queries per second per GPU on a video ranking model (AMD MI300X, 80&nbsp;ms p99), by cutting host syncs 7× and fusing GEMMs.',
        '$14.18M a year in GPU savings.',
        'Caught a silent output bug that had passed 10+ load tests, and built a check that compares served outputs with the original model before publishing.',
      ],
    },
    {
      org: 'Meta', role: 'Software Engineer', dates: 'Apr 2025 – Jul 2026', img: '/images/work/meta-login.png',
      alt: 'A robot repairs a locked door by itself while people walk through.',
      summary: 'LLM post-training data, then login reliability for Facebook and Instagram.',
      points: [
        'Built 15+ post-training tasks whose data shipped in Muse Spark 1.2.',
        'Cut “Can’t Log In” bug reports 55%, with an AI pipeline that patches regressions automatically.',
      ],
    },
    {
      org: 'Amazon', role: 'Software Development Engineer Intern', dates: 'Sep – Dec 2024', img: '/images/work/amazon-flags.png',
      alt: 'A switch on a control panel turns something on in a warehouse that keeps running.',
      summary: 'A feature-flag service for Global Logistics.',
      points: ['Adopted by 50+ engineers to change production behavior instantly, without a redeploy.'],
    },
    {
      org: 'Meta', role: 'Software Engineer Intern', dates: 'Jun – Sep 2024', img: '/images/work/meta-migration.png',
      alt: 'A line of people crosses a bridge from an old building to a new locked one.',
      summary: 'Login security.',
      points: ['Moved 64M+ users off a deprecated database onto the new login system.'],
    },
    { earlier: true, org: 'Center for Energy Research', role: 'Software Engineering Intern', dates: '2022 – 2024', note: '20% more energy‑efficient scheduling across 9+ buildings' },
    { earlier: true, org: 'Flow Physics Lab', role: 'Student Researcher', dates: '2023', note: '<a href="https://escholarship.org/uc/item/8rs4v3pq">Published in The Catalyst</a>' },
    { earlier: true, org: 'RoboSub', role: 'Embedded Systems Lead', dates: '2021 – 2023', note: 'Real-time C++ for a semifinalist autonomous submarine' },
  ],

  // Peer review and judging. Only roles that are confirmed.
  reviewer: [
    { venue: 'CPAL 2027', what: 'Conference on Parsimony and Learning, Proceedings Track (PMLR)', href: 'https://cpal.cc/' },
    { venue: 'AAAI 2027', what: 'Deployable AI (DAI) Workshop', href: 'https://dai-workshop.github.io/' },
    { venue: 'WWW 2027', what: 'LLM and Agents for Recommendation Systems (LARS) Workshop', href: 'https://www2027.thewebconf.org/workshops/#workshop-lars' },
    { venue: 'WSDM 2027', what: 'AutoResearch for IR & RecSys Workshop', href: 'https://www.wsdm-conference.org/2027/accepted-workshops.html' },
  ],
  judge: [
    { venue: 'Silicon Valley Innovation Challenge', what: 'San José State University, Nov–Dec 2026', href: 'https://www.sjsu.edu/svic/' },
    { venue: 'Cal Hacks 13.0', what: 'UC Berkeley, Oct 2026', href: 'https://www.calhacks.io/' },
    { venue: 'LA AI Hackathon', what: 'UCLA, Oct 2026', href: 'https://la-ai-hackathon-2026.devpost.com/' },
  ],
  wins: [
    { name: 'Meta Global Hackathon', what: 'Global Judges’ Choice Award, top 6 of 198 projects, spring 2026' },
    { name: 'Base × Ohara Vibe Coding Buildathon', what: 'Prize winner, Coinbase HQ, Apr 2025' },
    { name: 'TreeHacks 2025', what: '2nd prize, Liquid AI track: ExecuTorch C++ on-device kernels and a memory-aware scheduler, Feb 2025', href: 'https://devpost.com/software/optimized-convolution-kernels-for-edge-ai' },
  ],
};
