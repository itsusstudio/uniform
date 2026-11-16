---
layout: page
title: Section
summary: "Even spacing between the bands of a site page."
section: Layout
permalink: /components/section/
---

A section is one band of a marketing page, like the hero or the pricing. Every band gets the same room above and below. Sites only.

## Example

<div class="example-frame layout-demo">
<section class="u-section"><div class="u-container"><div>The hero</div></div></section>
<section class="u-section"><div class="u-container"><div>Every repair, tracked from counter to pickup</div></div></section>
</div>

## Code

```html
<main>
  <section class="u-section">
    <div class="u-container">…</div>
  </section>
  <section class="u-section">
    <div class="u-container">…</div>
  </section>
</main>
```

## Details

Space
: 48px above and below each section, or 24px on phones, so two sections sit 96px or 48px apart.

Inside
: Put a [container](/components/container/) in each section, and the content in that.

## When to use it

Use it for
: Each band of a marketing page or blog post, from the hero down.

Not for
: App screens. An app page is one [container](/components/container/) inside the [app shell](/components/app-shell/), and its parts are spaced with [stacks](/components/stack/).
