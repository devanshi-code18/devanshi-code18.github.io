// Everything the site shows about you. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain, systems engineer at Meta working on ML inference efficiency, and open-source contributor to vLLM and PyTorch torchao.',
  // The line under the name on the home page. Plain HTML is fine.
  oneLiner: 'Systems engineer at Meta, making ML inference faster on fewer GPUs. In open source I work on LLM serving: <a href="https://github.com/vllm-project/vllm">vLLM</a> and <a href="https://github.com/pytorch/ao">PyTorch torchao</a>.',
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
      title: 'Correct answers from AWQ models in vLLM',
      text: 'vLLM fuses q/k/v and gate/up into one layer, so every shard ran with the last shard’s AWQ scale. Each shard now gets its own. Qwen3-8B AWQ on GSM8K: 0.000 → 0.858, and these checkpoints now load at tensor-parallel 2.',
      repo: 'vLLM',
      prs: [['#69002', 'https://github.com/vllm-project/vllm/pull/69002']],
    },
    {
      img: '/images/ink/decode-tiles.png',
      alt: 'A big tile sawed apart and glued back together, next to small tiles each finished by its own worker.',
      title: 'Faster int4 decode on A100',
      text: 'Small decode matmuls now give each thread block one whole output tile instead of splitting and re-merging work (Stream-K). Up to 1.46× faster int4 kernels and 1.08× faster Qwen3-8B decode, same accuracy.',
      repo: 'Humming',
      prs: [['#218', 'https://github.com/vllm-project/humming/pull/218']],
    },
    {
      img: '/images/ink/checkpoints.png',
      alt: 'Suitcases stuck at a door by old tags; once the tags are cut they slide through.',
      title: 'Official torchao checkpoints load again',
      text: '15 of 21 official pytorch/* checkpoints failed to load on torchao 0.17+ in vLLM and Transformers, because their configs still carried removed fields. Now 21 of 21 load.',
      repo: 'torchao',
      prs: [['#5092', 'https://github.com/pytorch/ao/pull/5092']],
    },
    {
      img: '/images/ink/benchmarks.png',
      alt: 'A race where a runner’s shortcut through a box is crossed out and the honest runner is timed.',
      title: 'Benchmarks that measure the model',
      text: 'Warmups no longer prime the prefix cache, which had made the first measured request look 4× faster (67–81 ms instead of ~340 ms). Requests with n > 1 now report only tokens that were really cached.',
      repo: 'vLLM',
      prs: [['#66701', 'https://github.com/vllm-project/vllm/pull/66701'], ['#66720', 'https://github.com/vllm-project/vllm/pull/66720']],
    },
    {
      img: '/images/ink/fork-safe.png',
      alt: 'A process tree cracked by a heavy weight at the top, next to a clean tree with the weight set aside.',
      title: 'Fork-safe torchao imports',
      text: '<code>import torchao</code> initialized CUDA, which crashed vLLM’s forked GPU workers. Device checks now run on first use, so the import is fork-safe.',
      repo: 'torchao',
      prs: [['#5087', 'https://github.com/pytorch/ao/pull/5087'], ['#5088', 'https://github.com/pytorch/ao/pull/5088']],
    },
    {
      img: '/images/ink/tied-weights.png',
      alt: 'Two chained blocks weighed against each other on a balance scale.',
      title: 'Quantized models load in Transformers 5',
      text: 'Added <code>torch.equal</code> for torchao tensors, so checkpoints with tied weights, such as Phi-4-mini AWQ INT4, load in Transformers 5.',
      repo: 'torchao',
      prs: [['#5152', 'https://github.com/pytorch/ao/pull/5152']],
    },
  ],

  // Career, newest first. `earlier: true` entries are shown in a compact list.
  career: [
    {
      org: 'Meta', role: 'Systems Engineer II', dates: 'Aug 2026 – now',
      points: [
        '23.4% higher inference QPS per GPU (AMD MI300X, 80 ms p99) on a video ranking model: host syncs cut 7×, GEMMs fused.',
        '$14.18M/yr in GPU savings across video recommendation inference, including latency-stopper and autoscaling fixes.',
        'Stopped a silent output bug that passed 10+ load tests; built a pre-publish check that compares served and original outputs.',
      ],
    },
    {
      org: 'Meta', role: 'Software Engineer', dates: 'Apr 2025 – Jul 2026',
      points: [
        'Built 15+ LLM post-training tasks whose data shipped in Muse Spark 1.2.',
        'Led the reliability workstream that cut “Can’t Log In” user-reported bugs 55%; built an AI pipeline that auto-patches regressions.',
        'Added 14M+ monthly active users through 30+ login and registration experiments on Facebook and Instagram.',
      ],
    },
    {
      org: 'Amazon', role: 'Software Development Engineer Intern', dates: 'Sep – Dec 2024',
      points: ['Shipped a feature-flag service adopted by 50+ Global Logistics engineers for instant production control without redeploys.'],
    },
    {
      org: 'Meta', role: 'Software Engineer Intern', dates: 'Jun – Sep 2024',
      points: [
        'Migrated 64M+ users from a deprecated database to a secure login system.',
        'Designed an Instagram ML model that picks the authentication challenge most likely to succeed for each user.',
      ],
    },
    { earlier: true, org: 'UC San Diego, Center for Energy Research', role: 'Software Engineering Intern', dates: '2022 – 2024', text: 'Improved energy efficiency 20% across 9+ buildings by optimizing the on/off control scheduler.' },
    { earlier: true, org: 'UC San Diego School of Medicine, Biomedical Informatics', role: 'Web Developer', dates: '2023 – 2024', text: 'Built an Angular word-association app used to test memory retention in 120+ sleep apnea patients.' },
    { earlier: true, org: 'UC San Diego, Computational Modelling & Flow Physics Lab', role: 'Student Researcher', dates: '2023', text: 'Raised the pressure ratio of the first four stages of NASA’s compressor 12.5% with CFD optimization; <a href="https://escholarship.org/uc/item/8rs4v3pq">published in The Catalyst (2024)</a>.' },
    { earlier: true, org: 'UC San Diego, Kastner Research Group', role: 'Embedded Systems Lead', dates: '2021 – 2023', text: 'Built a RoboSub 2023 semifinalist autonomous submarine; made its real-time C++ audio analysis 15% more accurate.' },
  ],
  education: { school: 'University of California, San Diego', degree: 'B.S. Mathematics & Computer Science', dates: '2021 – 2025' },

  // Peer review and judging. Only roles that are confirmed.
  reviewer: [
    { venue: 'CPAL 2027', what: 'Conference on Parsimony and Learning, Proceedings Track (PMLR)', href: 'https://cpal.cc/' },
    { venue: 'AAAI-27', what: 'Deployable AI (DAI) Workshop', href: 'https://dai-workshop.github.io/' },
    { venue: 'WWW 2027', what: 'LLM and Agents for Recommendation Systems (LARS) Workshop', href: 'https://www2027.thewebconf.org/workshops/#workshop-lars' },
    { venue: 'WSDM 2027', what: 'AutoResearch for IR & RecSys Workshop, program committee', href: 'https://www.wsdm-conference.org/2027/accepted-workshops.html' },
  ],
  judge: [
    { venue: 'Cal Hacks 13.0', what: 'UC Berkeley, Oct 2026', href: 'https://www.calhacks.io/' },
    { venue: 'LA Hacks', what: 'AI hackathon, UCLA, Oct 2026', href: 'https://lahacks.com/' },
    { venue: 'Silicon Valley Innovation Challenge', what: 'San José State University, Dec 2026', href: 'https://www.sjsu.edu/svic/' },
  ],
  wins: [
    { name: 'Meta Global Hackathon, Spring 2026', what: 'Global Judges’ Choice Award: top 6 of 198 projects' },
    { name: 'TreeHacks 2025', what: '2nd prize, Liquid AI track: ExecuTorch C++ on-device kernels and a memory-aware scheduler', href: 'https://devpost.com/software/optimized-convolution-kernels-for-edge-ai' },
    { name: 'Base × Ohara Vibe Coding Buildathon', what: 'Prize winner, Coinbase HQ, Apr 2025' },
  ],
};
