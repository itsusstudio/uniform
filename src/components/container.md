---
layout: page
title: Container
summary: "Centres page content and stops it at 1280px."
section: Layout
permalink: /components/container/
---

A container centres a page's content, stops it at 1280px and keeps the page margin on each side.

## Example

<div class="example-frame layout-demo">
<div class="u-container"><div>Page content, up to 1280px wide</div></div>
</div>

## Code

```html
<main>
  <div class="u-container">…</div>
</main>
```

## Details

Width
: Stops at 1280px.

Page margin
: 16px on phones, 24px on tablets, 48px on wide screens.

## Three widths

Data pages
: `u-container u-container-wide`, up to 1600px. Lists, tables and dashboards use the room on a big screen.

Most pages
: `u-container`, up to 1280px. Sites and pages that mix content.

Settings, forms and reading
: `u-container u-container-narrow`, a 768px column. A page you work down one setting at a time stays in one line of sight.

## When to use it

Use it for
: Once per page, around everything in the main area.

Not for
: Limiting text width. Prose stops lines at about 65 characters on its own.
