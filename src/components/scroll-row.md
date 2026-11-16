---
layout: page
title: Scroll row
summary: "A row of cards that scrolls sideways."
section: Layout
permalink: /components/scroll-row/
---

A scroll row lets people swipe through cards without moving the page. Use it for browsing on a phone.

## Example

<div class="frame frame-phone frame-pad">
<div class="u-scroll-row">
<% [["Ring resizing", "From $45.00"], ["Watch batteries", "$25.00"], ["Chain repair", "From $40.00"], ["Prong retipping", "From $55.00"]].each do |service, price| -%>
<article class="u-card"><header><h3><%= service %></h3></header><div class="u-card-content"><p class="u-text-data"><%= price %></p></div></article>
<% end -%>
</div>
</div>

Each swipe stops on a card, and the next one peeks in at the edge.

## Code

```html
<div class="u-scroll-row">
  <article class="u-card">…</article>
  <article class="u-card">…</article>
  <article class="u-card">…</article>
</div>
```

## Details

Card width
: Up to 280px (`--u-width-scroll-item`), or 80% of the row when that's less, so the next card always peeks in.

Edges
: The row reaches past the page margin to the edge of the screen, and each swipe stops with a card lined up on the margin.

## When to use it

Use it for
: A short set of things to browse on a phone, like services, recent photos or saved items.

Not for
: Anything people need to compare or scan, like jobs or invoices. Use a [list](/components/list/) or a [grid](/components/grid/).
