---
layout: page
title: Grid
summary: "A twelve-column layout."
section: Layout
permalink: /components/grid/
---

A grid lays things out on twelve columns, so everything starts on the same lines. Each child spans whole columns.

## Example

<div class="example-frame layout-demo">
<div class="u-grid"><div class="u-span-4">u-span-4</div><div class="u-span-8">u-span-8</div></div>
</div>

## Code

```html
<div class="u-grid">
  <div class="u-span-4">Filters</div>
  <div class="u-span-8">Results</div>
</div>
```

## Details

Columns
: Twelve. A child with no `u-span-*` class takes all twelve.

Gutter
: 24px, or 16px on phones. Change it with `u-gap-*`.

Phones
: When the grid is narrower than 640px, every child takes all twelve columns. This goes by the grid's own width, so a grid in a narrow panel stacks too.

First on a phone
: Put the column people need first on a phone, like a record's contact details, first when the grid stacks with `u-first-when-stacked`. On wider screens it stays where it is in the row.

## When to use it

Use it for
: Page layouts, product tiles, image rows, and anything else that lines up with the rest of the page.

Not for
: A handful of buttons, which go in [Actions](/components/actions/), or chips, which go in a [Row](/components/row/).
