---
title: Post template
description: Copy this file to start a new post. It shows every kind of formatting the site supports.
date: 2026-11-24
draft: true
---

This is a draft, so it never appears on the live site. Copy it, give the copy a new file name (that becomes the URL), change the title and date at the top, set `draft: false`, and write. The `description` line shows in italics under the title and under the post on the home page, so make it the one-sentence result of the post.

A shape that works for systems posts: **the problem** (what was slow or wrong, with the headline number), **the mechanism** (why it happens), **the numbers** (measurements, in a table), and **how to apply it**. Put the result first; readers decide in two sentences whether to keep going.

## Text

Use **bold** for the one phrase that matters, *italics* for emphasis, and [links](https://github.com/vllm-project/vllm) wherever they help. Inline code looks like `torch.compile`. A footnote looks like this.[^1] On a wide screen it appears in the margin next to the line; on a phone it sits at the end of the post.

- lists work
- like this

> A quote: the one sentence you want people to remember.

## Code

```python
import torch

def decode_step(q, k, v, window: int):
    # sliding-window attention over the last `window` keys
    k, v = k[:, -window:], v[:, -window:]
    return torch.softmax(q @ k.transpose(-1, -2) / q.shape[-1] ** 0.5, -1) @ v
```

## Math

Inline math like $O(n \cdot w)$, and a display equation:

$$
\text{speedup} = \frac{t_\text{before}}{t_\text{after}}
$$

## Numbers

| Batch | Before (µs) | After (µs) | Speedup |
| ----: | ----------: | ---------: | ------: |
|     1 |        14.2 |       10.8 |   1.31× |
|    32 |        21.0 |       17.9 |   1.17× |

## Figures

Put images in `public/images/`. An image followed by a line in italics becomes a numbered figure with a caption:

![A short description of the image for screen readers](/images/ink/writing.png)
*What the reader should notice in this figure, in one sentence.*

[^1]: Footnotes are for caveats: hardware details, versions, "why not X". They keep the main text moving.
