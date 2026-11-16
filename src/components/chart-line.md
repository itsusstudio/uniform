---
layout: page
title: "Chart: Line"
summary: "A running total over time, with an optional comparison."
section: Components
permalink: /components/chart-line/
---

A line chart shows a running total over time, like revenue so far this month.
Add a second column to compare it with the period before.

## Example

<div class="u-grid">
<%= render "examples/chart_line", span: 8, prefix: "line" %>
</div>

Leave a cell empty and the line stops there, so this month ends at today.

## Compared to the previous period

<div class="u-grid">
<%= render "examples/chart_line", span: 8, compare: true, prefix: "line-compare" %>
</div>

A second value column draws a grey line under the ink one, with a legend named
from the two header cells. Add a `data-label` to each comparison cell so its
tooltip names its own date.

## Loading

<div class="u-grid">
<%= render "examples/chart_line", span: 8, loading: true %>
</div>

Set `aria-busy="true"` on the empty `<u-chart>`, or give it a `src`, to show
this shape while the data loads.

## Code

```html
<%= raw render("examples/chart_line", compare: true).strip %>
```

Set `prefix="$"` for money, so the axis reads `$5k`.

## Rules

Two lines at most
: This period in ink, the one before in grey. More lines means more cards.

Same span, same scale
: Compare like with like: this month against last month, by day of the month.

See [Chart](/components/chart/) for the attributes and the empty state.
