---
layout: page
title: "Chart: Stacked bar"
summary: "The parts of one whole, in status colours."
section: Components
permalink: /components/chart-stacked/
---

A stacked bar shows how one total splits into parts, like open jobs by status.
Each part keeps its name and count in the legend under the bar.

## Example

<div class="u-grid">
<%= render "examples/chart_stacked", span: 6 %>
</div>

## Loading

<div class="u-grid">
<%= render "examples/chart_stacked", span: 6, loading: true %>
</div>

Set `aria-busy="true"` on the empty `<u-chart>`, or give it a `src`, to show
this shape while the data loads.

## Code

```html
<%= raw render("examples/chart_stacked").strip %>
```

Use one row per part, with a `tone` for its [badge](/components/badge/) colour.

## Rules

In status order
: List parts in the order used everywhere, overdue first and done last.

Five parts at most
: Past five, the small ones turn into slivers. Group the rest as "Other".

See [Chart](/components/chart/) for the attributes and the empty state.
