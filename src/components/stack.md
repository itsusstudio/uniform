---
layout: page
title: Stack
summary: "Things one under another with an even gap."
section: Layout
permalink: /components/stack/
---

A stack puts things one under another with an even gap. Pick the gap by how related its children are.

## Example

<div class="example-frame layout-demo">
<div class="u-stack"><div>Page title</div><div>Customer details</div><div>Actions</div></div>
</div>

## Code

```html
<div class="u-stack">
  <div>Page title</div>
  <div>Customer details</div>
  <div>Actions</div>
</div>
```

## Details

Gap
: 24px by default. Change it with `u-gap-*`.

Children
: Only the gap spaces them. Their own top and bottom margins are removed.

## When to use it

Use it for
: Anything read top to bottom, like a page, a card's contents or a form.

Not for
: Side-by-side items. Use [Row](/components/row/).
