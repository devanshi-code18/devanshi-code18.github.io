// Everything the site shows about you. Edit here; the pages read it.
export const SITE = {
  name: 'Devanshi Jain',
  shortName: 'Devanshi',
  url: 'https://devanshi-code18.github.io',
  // Used for search results and link previews.
  description: 'Devanshi Jain, systems engineer at Meta working on inference performance for video recommendation models, and open-source contributor to PyTorch and vLLM.',
  // The line under the name on the home page. Plain HTML is fine.
  oneLiner: 'I’m a systems engineer at Meta, working on inference performance for video recommendation models. I’m an avid open&#8209;source contributor to <a href="https://github.com/search?q=is%3Apr+author%3Adevanshi-code18+org%3Avllm-project&amp;type=pullrequests&amp;s=created&amp;o=desc">vLLM</a> and <a href="https://github.com/search?q=is%3Apr+author%3Adevanshi-code18+org%3Apytorch&amp;type=pullrequests&amp;s=created&amp;o=desc">PyTorch</a>. I studied mathematics and computer science at UC&nbsp;San&nbsp;Diego.',
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
      text: 'When you generate one token at a time, the matrix multiplies are tiny, and splitting each one up and merging the pieces back together costs more than it saves. Computing each output tile in one go made the int4 kernels up to 1.46× faster and Qwen3-8B decoding up to 8% faster, with the same accuracy.',
      repo: 'Humming',
      prs: [['#218', 'https://github.com/vllm-project/humming/pull/218']],
    },
    {
      img: '/images/ink/checkpoints.png',
      alt: 'Suitcases stuck at a door by old tags; once the tags are cut they slide through.',
      title: 'Official checkpoints that wouldn’t load',
      text: '15 of the 21 official PyTorch quantized checkpoints stopped loading on torchao 0.17, because their configs still carried fields from an older version. torchao now drops those fields with a warning, so all 21 configs load again.',
      repo: 'torchao',
      prs: [['#5092', 'https://github.com/pytorch/ao/pull/5092']],
    },
    {
      img: '/images/ink/benchmarks.png',
      alt: 'A race where a runner’s shortcut through a box is crossed out and the honest runner is timed.',
      title: 'Benchmarks that measured the cache',
      text: 'vLLM’s benchmark warmed up with the same prompt it then measured, so the first “real” request hit the cache and looked 4–5× faster than it was. Warmups now get their own cache key, so they can’t warm the cache for the measured run, and requests that sample several outputs no longer count their siblings’ cache hits.',
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
    { venue: 'AAAI 2027', what: 'Deployable AI (DAI) Workshop', href: 'https://dai-workshop.github.io/' },
    { venue: 'WWW 2027', what: 'LLM and Agents for Recommendation Systems (LARS) Workshop', href: 'https://www2027.thewebconf.org/workshops/#workshop-lars' },
    { venue: 'WSDM 2027', what: 'AutoResearch for IR & RecSys Workshop', href: 'https://www.wsdm-conference.org/2027/accepted-workshops.html' },
  ],
  judge: [
    { venue: 'Silicon Valley Innovation Challenge', what: 'San José State University, Nov⁠–⁠Dec 2026', href: 'https://www.sjsu.edu/svic/' },
    { venue: 'Cal Hacks 13.0', what: 'UC Berkeley, Oct 2026', href: 'https://www.calhacks.io/' },
    { venue: 'LA AI Hackathon', what: 'UCLA, Oct 2026', href: 'https://la-ai-hackathon-2026.devpost.com/' },
  ],
  wins: [
    { name: 'Meta Global Hackathon', what: 'Judges’ Choice, 2026' },
    { name: 'Base × Ohara Buildathon', what: 'Prize winner, 2025' },
    { name: 'TreeHacks 2025', what: '2nd prize, Liquid AI track', href: 'https://devpost.com/software/optimized-convolution-kernels-for-edge-ai' },
  ],
};
