---
layout: page
title: "Chart: Bar"
summary: "A bar for each period, the latest in ink."
section: Components
permalink: /components/chart-bar/
---

A bar chart shows one value for each period, like jobs finished each week. Use
it when the periods are separate counts, not a running total.

## Example

<div class="u-grid">
<%= render "examples/chart_bar", span: 8, prefix: "bar" %>
</div>

The latest bar is ink, since it's the one the stat describes. Point at a bar to
see its value.

## Loading

<div class="u-grid">
<%= render "examples/chart_bar", span: 8, loading: true %>
</div>

Set `aria-busy="true"` on the empty `<u-chart>`, or give it a `src`, to show
this shape while the data loads.

## Code

```html
<%= inline_partial("examples/chart_bar") %>
```

Use one value column, with the oldest period first. Add `current="none"` when
no bar is the one the stat describes.

## Rules

Bars start at zero
: The scale always starts at zero, so bar lengths compare honestly.

Whole numbers
: Add `whole` when the values are counts, like jobs or clients, so the gridlines land on whole numbers: `<u-chart type="bar" whole>`. Leave it off for money and rates, which can fall between.

Twelve to twenty-six bars
: Fewer reads as a list, more as noise. For a longer span, group by month.

See [Chart](/components/chart/) for the attributes and the empty state.
