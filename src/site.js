// Everything the site shows about you. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain, systems engineer at Meta working on inference performance for video recommendation models, and open-source contributor to PyTorch and vLLM.',
  // The line under the name on the home page. Plain HTML is fine.
  oneLiner: 'Systems engineer at Meta working on inference performance for video recommendation models. I contribute to open source, mostly <a href="https://github.com/pytorch/ao">PyTorch</a> and <a href="https://github.com/vllm-project/vllm">vLLM</a>. B.S. in Mathematics and Computer Science from UC San Diego.',
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
      text: 'vLLM’s benchmark warmed up with the same prompt it then measured, so the first “real” request hit the cache and looked about 4× faster than it was. Warmups can’t hit the cache anymore, and requests that sample several outputs stop counting their siblings’ cache hits.',
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

  // Career, newest first. `earlier: true` entries are shown in a compact list.
  career: [
    {
      org: 'Meta', role: 'Systems Engineer II', dates: 'Aug 2026 – now',
      points: [
        '23.4% higher inference QPS per GPU (AMD MI300X, 80&nbsp;ms p99) on a video ranking model: host syncs cut 7×, GEMMs fused.',
        '$14.18M/yr in GPU savings across video recommendation inference, including latency&#8209;stopper and autoscaling fixes.',
      ],
    },
    {
      org: 'Meta', role: 'Software Engineer', dates: 'Apr 2025 – Jul 2026',
      points: [
        'Built 15+ LLM post-training tasks whose data shipped in Muse Spark 1.2.',
        'Led the reliability work that cut “Can’t Log In” user-reported bugs 55%, with an AI pipeline that auto-patches regressions.',
      ],
    },
    {
      org: 'Amazon', role: 'Software Development Engineer Intern', dates: 'Sep – Dec 2024',
      points: ['Shipped a feature-flag service adopted by 50+ Global Logistics engineers for instant production control without redeploys.'],
    },
    {
      org: 'Meta', role: 'Software Engineer Intern', dates: 'Jun – Sep 2024',
      points: ['Migrated 64M+ users from a deprecated database to a secure login system.'],
    },
    { earlier: true, org: 'UC San Diego School of Medicine', role: 'Web Developer', dates: '2023 – 2024' },
    { earlier: true, org: 'UC San Diego Center for Energy Research', role: 'Software Engineering Intern', dates: '2022 – 2024' },
    { earlier: true, org: 'UC San Diego Flow Physics Lab', role: 'Student Researcher', dates: '2023', note: '<a href="https://escholarship.org/uc/item/8rs4v3pq">Paper</a>' },
    { earlier: true, org: 'UC San Diego Kastner Research Group', role: 'Embedded Systems Lead, RoboSub', dates: '2021 – 2023' },
  ],
  education: { school: 'University of California, San Diego', degree: 'B.S. Mathematics & Computer Science', dates: '2021 – 2025' },

  // Peer review and judging. Only roles that are confirmed.
  reviewer: [
    { venue: 'CPAL 2027', what: 'Conference on Parsimony and Learning, Proceedings Track (PMLR)', href: 'https://cpal.cc/' },
    { venue: 'AAAI 2027', what: 'Deployable AI (DAI) Workshop', href: 'https://dai-workshop.github.io/' },
    { venue: 'WWW 2027', what: 'LLM and Agents for Recommendation Systems (LARS) Workshop', href: 'https://www2027.thewebconf.org/workshops/#workshop-lars' },
    { venue: 'WSDM 2027', what: 'AutoResearch for IR & RecSys Workshop, program committee', href: 'https://www.wsdm-conference.org/2027/accepted-workshops.html' },
  ],
  judge: [
    { venue: 'Silicon Valley Innovation Challenge', what: 'San José State University, Nov – Dec 2026', href: 'https://www.sjsu.edu/svic/' },
    { venue: 'Cal Hacks 13.0', what: 'UC Berkeley, Oct 2026', href: 'https://www.calhacks.io/' },
    { venue: 'LA AI Hackathon', what: 'UCLA, Oct 2026', href: 'https://la-ai-hackathon-2026.devpost.com/' },
  ],
  wins: [
    { name: 'Meta Global Hackathon', what: 'Global Judges’ Choice Award, top 6 of 198 projects, spring 2026' },
    { name: 'TreeHacks 2025', what: '2nd prize, Liquid AI track: ExecuTorch C++ on-device kernels and a memory-aware scheduler, Feb 2025', href: 'https://devpost.com/software/optimized-convolution-kernels-for-edge-ai' },
    { name: 'Base × Ohara Vibe Coding Buildathon', what: 'Prize winner, Coinbase HQ, Apr 2025' },
  ],
};
