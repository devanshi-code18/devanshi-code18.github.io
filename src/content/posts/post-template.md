---
title: Post template
description: Copy this file to start a new post. It shows every kind of formatting the site supports.
date: 2026-11-24
draft: true
---

This is a draft, so it never appears on the live site. Copy it, give the copy a new file name (that becomes the URL), change the title and date at the top, set `draft: false`, and write.

A normal paragraph reads like this. Use **bold** for the one phrase that matters, *italics* for emphasis, and [links](https://github.com/vllm-project/vllm) wherever they help. Inline code looks like `torch.compile`.

## A section heading

Short paragraphs read best on a phone. Lists work too:

- one point
- another point, with a footnote[^1]

1. numbered steps
2. work the same way

> A quote, or a pull-quote of the one sentence you want people to remember.

### Code

```python
import torch

def decode_step(q, k, v, window: int):
    # sliding-window attention over the last `window` keys
    k, v = k[:, -window:], v[:, -window:]
    return torch.softmax(q @ k.transpose(-1, -2) / q.shape[-1] ** 0.5, -1) @ v
```

### Math

Inline math like $O(n \cdot w)$ and display math:

$$
\text{speedup} = \frac{t_\text{before}}{t_\text{after}}
$$

### A table

| Batch | Before (µs) | After (µs) |
| ----: | ----------: | ---------: |
|     1 |        14.2 |       10.8 |
|    32 |        21.0 |       17.9 |

### An image

Put images in `public/images/` and link them like this (the part after the image, in italics, is its caption):

![A short description of the image for screen readers](/images/example.svg)
*Caption: what the reader should notice in this image.*

---

[^1]: Footnotes collect at the bottom of the post.
