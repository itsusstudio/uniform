---
layout: page
title: Row
summary: "Things side by side, wrapping when out of room."
section: Layout
permalink: /components/row/
---

A row puts things side by side on one line, and wraps them when they run out of room.

## Example

<div class="example-frame layout-demo">
<div class="u-row"><div>Save job</div><div>Print ticket</div><div>Cancel</div></div>
</div>

## Code

```html
<div class="u-row">
  <span class="u-badge u-badge-info">On the bench</span>
  <span class="u-meta">Due Nov 14</span>
</div>
```

For a row of buttons, use [Actions](/components/actions/).

## Details

Default gap
: 8px (`space-2`), for things that belong together. Change it with `u-gap-*`.

Wrapping
: Items move to the next line when the row is full, so nothing overflows on a phone.

Top edge
: Add `u-items-start` to line up items of different heights along the top, like two open menus side by side.

Spread
: Add `u-justify-between` to push the first and last items to opposite ends, like Back and Skip under a form. Add `u-justify-end` to gather them at the end, like Cancel and Save under a panel inside a form.

## When to use it

Use it for
: Buttons, chips, a status and its word, a toolbar, tags.

Not for
: Columns that need to line up across rows. Use [Grid](/components/grid/).
