---
layout: page
title: Grid
summary: "A twelve-column layout."
section: Layout
permalink: /components/grid/
---

A grid lays things out on twelve columns, so everything starts on the same lines. Each child spans whole columns, set with Tailwind's `col-span-*`.

## Example

<div class="example-frame layout-demo">
<div class="u-grid"><div class="@grid:col-span-4">@grid:col-span-4</div><div class="@grid:col-span-8">@grid:col-span-8</div></div>
</div>

## Code

```html
<div class="u-grid">
  <div class="@grid:col-span-4">Filters</div>
  <div class="@grid:col-span-8">Results</div>
</div>
```

## Details

Columns
: Twelve. A child with no span takes all twelve. Give it `@grid:col-span-*` to take fewer once the grid is wide enough.

Gutter
: 24px, or 16px on phones. Change it with a `gap-*` class.

Phones
: The grid is a container, so `@grid:` goes by the grid's own width, not the screen's. Below 640px every child takes all twelve columns, and a grid in a narrow panel stacks too.

First on a phone
: Put the column people need first on a phone, like a record's contact details, first when the grid stacks with `order-first @grid:order-none`. On wider screens it stays where it is in the row.

Hidden when stacked
: Hide a column that only decorates, like an illustration beside a welcome message, with `hidden @grid:block`. Stacked, it would push the content below the fold.

## When to use it

Use it for
: Page layouts, product tiles, image rows, and anything else that lines up with the rest of the page.

Not for
: A handful of buttons, which go in [Actions](/components/actions/), or chips, which sit in a `flex flex-wrap items-center gap-2` row.
