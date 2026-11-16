---
layout: page
title: "Chart: Sparkline"
summary: "A small trend line under a figure."
section: Components
permalink: /components/chart-spark/
---

A sparkline shows the trend behind a [stat](/components/stat/) in 96 by 24px.
It has no axes, labels or hover: the figure says the number.

## Example

<%= render "examples/pattern_charts_figures" %>

## Loading

<%= render "examples/pattern_charts_figures", loading: true %>

Set `aria-busy="true"` on the empty `<u-chart>`, or give it a `src`, to show
this shape while the data loads.

## Code

```html
<%= raw render("examples/pattern_charts_figures").strip %>
```

Use one value column. Make the table `u-visually-hidden`, since the stat
already shows the number.

## Rules

Under a figure only
: A sparkline never stands alone. Without its figure, it's a chart with no answer.

See [Chart](/components/chart/) for the attributes and the empty state.
