# Design spec (synthesis of 3 agent reports, 11/24)

Principle: minimal, one column, typography does the work. Borrow ideas, not identities.

## Borrowed, by source
- Olah: diagrams + captions carry posts; notes one glance away (hover/margin, not jump); topic grouping on home once posts accumulate; italic date line.
- Horace He: home = 2-sentence intro + link row + "why you might know me" list of concrete work; post ends with something to keep (table/citation).
- Karpathy: index = date, title, one-line summary, nothing else; light headings; raw outputs get their own block.
- Boehm (Tufte): sidenotes in right margin on wide screens, inline on phone; headings by size/italics not bold; paper bg + one accent; results first.
- Weng: one meta line under title; collapsible contents for long posts; auto-numbered figures; cite block (plain + BibTeX).
- Alammar: consistent diagram colour key across posts.
- Yan: one-line description per post on home; llms.txt; fixed section skeleton (Problem -> Mechanism -> Numbers -> How to apply) suggested in template.
- Huyen: zero-chrome dated list; asides set off with rules, not boxes.

## Critic fixes (must)
- Contrast: faint #766e62 (light) / #8f877b (dark); links in rust with 40% rust underline.
- Hierarchy: lead 1.6rem/1.3; post titles 1.3rem; site name 1.35rem weight 400; OSS list compact sans .9rem, max 5, no dates on home.
- 0 posts: no Writing section; "first post soon · RSS" note in intro.
- Nav: text links (serif 1rem muted), current = text colour + 2px rust underline; 44px tap targets. No pills.
- One measure: --measure 36rem (~68ch) for header, content, footer.
- Scales: type .8125/1/1.3/1.6/2.4rem; space .5/1/1.5/2.5/4rem. h1 weight 400; titles lh 1.2-1.3.
- Section labels: italic serif 1.05rem, no tracked caps.
- Post: read time only >=5 min; contents only >=3 h2 and >=800 words, no border, no footnotes entry; code .85rem warm two-tone theme both modes, copy button not covering code; blockquote italic 1em 2px line; sup no line gap; sr-only rule; cite code font; one ending row (cite, older/newer), no post-footer.
- Tables: no uppercase (µs -> MS bug).
- Dark: code bg distinct; SVG example dark-aware.
- About = long version + Elsewhere list + full open-source list. 404 lists recent posts. Footer .875rem, tap padding, aligned to measure.
