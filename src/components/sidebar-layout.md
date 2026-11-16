---
layout: page
title: Sidebar layout
summary: "A 264px sidebar beside the main content."
section: Layout
permalink: /components/sidebar-layout/
---

A sidebar layout puts a 264px sidebar beside the main content. Use it for the frame of an app or a docs site.

## Example

<div class="example-frame layout-demo">
<div class="u-sidebar-layout layout-demo-sidebar"><div>Sidebar</div><div>Content</div></div>
</div>

## Code

```html
<div class="u-sidebar-layout">
  <nav>…</nav>
  <main>…</main>
</div>
```

## Details

Smaller screens
: When the layout is narrower than 1024px, the sidebar moves above the content. Hide a long one behind a menu button.

## When to use it

Use it for
: The outer frame of an app or a docs site.

Not for
: Two columns inside a page. Use [Grid](/components/grid/).
