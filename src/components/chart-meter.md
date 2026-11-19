---
layout: page
title: "Chart: Meter"
summary: "One value out of a total."
section: Components
permalink: /components/chart-meter/
---

A meter shows one value out of a total, like jobs finished on time out of all
jobs due. Use it under a stat that says the same in words.

## Example

<div class="u-grid">
<%= render "examples/chart_meter", span: 6 %>
</div>

## Loading

<div class="u-grid">
<%= render "examples/chart_meter", span: 6, loading: true %>
</div>

Set `aria-busy="true"` on the empty `<u-chart>`, or give it a `src`, to show
this shape while the data loads.

## Code

```html
<%= inline_partial("examples/chart_meter") %>
```

Use two rows, the value first and then the total.

## Rules

Say it in words too
: Put the numbers in the stat above, like "31 of 40". The meter only shows the share.

See [Chart](/components/chart/) for the attributes and the empty state.
