# devanshi-code18.github.io

My personal site and blog: https://devanshi-code18.github.io

Built with [Astro](https://astro.build). Every push to `main` publishes the site with GitHub Actions in about a minute. It also rebuilds every night, so the open-source list on the home page picks up newly merged pull requests by itself.

## Writing a post

Each post is one Markdown file in [`src/content/posts/`](src/content/posts). The file name becomes the URL: `my-post.md` is published at `/writing/my-post/`. [`post-template.md`](src/content/posts/post-template.md) shows all the formatting the site supports: code, math, tables, images and footnotes. It is a draft, so it never shows up on the site.

```markdown
---
title: The title of the post
description: One sentence, shown in the list of posts and in link previews.
date: 2026-11-24
draft: false
---

The post starts here.
```

Pick whichever way of posting suits you:

- **In a web editor ([Pages CMS](https://app.pagescms.org)):** sign in with GitHub and allow it access to this repository. Then open **Writing**, add an entry, write the post, untick **Draft** and save. Images you drop in go to `public/images/`. The settings are in [`.pages.yml`](.pages.yml).
- **On GitHub:** open `src/content/posts`, choose **Add file → Create new file**, name it `my-post.md`, paste the header above, write the post and commit. This works from a phone too.
- **Locally:** `npm install` once, then `npm run dev` for a live preview at http://localhost:4321 (drafts show up there). Commit and push to publish.

A post with `draft: true` stays off the live site.

## Changing the rest

- Name, intro, links: [`src/site.js`](src/site.js)
- Look: [`src/styles/global.css`](src/styles/global.css)
- Link preview image and icons: `public/og.png`, `public/favicon.*`, `public/apple-touch-icon.png`

Writing is mine; code is MIT licensed.
