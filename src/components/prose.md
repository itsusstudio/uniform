---
layout: page
title: Prose
summary: "Type and spacing for long-form writing."
section: Components
permalink: /components/prose/
---

Wrap long-form writing in `u-prose`, like articles and help pages. Everything inside gets its size and spacing, so you write plain HTML or Markdown.

## Example

<div class="example-frame">
<%= render "examples/prose_sample" %>
</div>

## Code

```html
<%= raw render("examples/prose_sample").strip %>
```

## What it styles

Paragraphs, lists and quotes
: Body text, with lines stopping at about 65 characters. Bulleted and numbered lists get the same spacing, and a quote gets a line down its left side.

Headings
: `h2` for sections and `h3` under them, both medium weight, with room above.

Definition lists
: A label column beside its content, with a line between rows. A second `dd` becomes a muted note under the first.

Tables
: Full width, with a line under every row.

Inline code and strong
: Code in Plex Mono, strong in medium weight.

Components
: A banner, card or figure gets room above and below, and keeps its own styles.

## Rules

Components inside keep their styles
: A card or a button placed inside never picks up prose spacing.

One wrapper per article
: Put `u-prose` on the element that holds the writing, never on the whole page or an app screen.
