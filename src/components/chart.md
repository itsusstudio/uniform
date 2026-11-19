---
layout: page
title: Chart
summary: "A chart drawn from the JSON inside it."
section: Components
permalink: /components/chart/
---

`<u-chart>` draws a chart from the JSON inside it. Pick the type with one
attribute, and the element handles the drawing, hover, loading and empty states.

## Example

<div class="u-grid">
<%= render "examples/chart_bar", span: 8, prefix: "chart" %>
</div>

## Code

```html
<u-chart type="bar" height="160" data-label="Jobs finished each week">
  <script type="application/json">
    {"rows": [{"label": "Oct 26", "values": [19]}, {"label": "Nov 2", "values": [23]}]}
  </script>
</u-chart>
```

```erb
<%%= uniform_chart :bar,
      label: t(".caption"),
      height: 160,
      rows: jobs_per_week.map { |week, count| {label: l(week, format: :short), value: count} } %>
```

Each row has a `label`, like a week or a day, and its `values`. In Rails,
`uniform_chart` writes the JSON and a shimmer that shows until the chart is
drawn. Put the chart in a [card](/components/card/) with its title and a
[stat](/components/stat/), and load [`uniform.js`](/start/install/).

## Types

[Bar](/components/chart-bar/)
: A value for each period, like jobs finished each week.

[Line](/components/chart-line/)
: A running total over time, on its own or against the period before.

[Stacked bar](/components/chart-stacked/)
: The parts of one whole, like open jobs by status.

[Meter](/components/chart-meter/)
: One value out of a total, like jobs finished on time.

[Sparkline](/components/chart-spark/)
: A small trend line under a figure.

## Data

`rows`
: One object per bar, point or part, in order. Each has a `label` and `values`, one per series. A missing value is `null`.

A value
: A number, or an object when the server formats it: `{"value": 4280, "text": "$4,280.00", "label": "Oct 12"}`. The chart shows `text` in its tooltip, and `label` names a comparison value's own date.

`tone` on a row
: The status colour of a stacked bar segment: `danger`, `info`, `warning`, `success` or `neutral`.

`series`
: The names of a line chart's lines, for its legend, like `["November", "October"]`.

Without the script, the chart stays as its shimmer.

## Attributes

`type`
: `bar`, `line`, `stacked`, `meter` or `spark`. Defaults to `bar`.

`height`
: The plot's height in pixels. Defaults to 200.

`prefix`
: A unit before the axis numbers, like `$`.

`max`
: The top of the scale. Defaults to a round number above the highest value.

`current`
: Set to `none` to draw every bar grey. Otherwise the last bar is ink.

`data-label`
: What the chart shows, like “Jobs finished each week”. It names the chart for screen readers.

## Loading and empty

<%= render "examples/chart_states" %>

Empty
: Rows with no values show the line in `data-empty`, in the plot's height.

Loading
: With `aria-busy="true"` and no JSON, the chart shows shimmer bars until its data arrives, for example by Turbo Stream.

From a URL
: With `src`, the chart fetches its JSON from that URL, with shimmer bars while it loads. If the fetch fails, it shows the line in `data-error`.

```html
<u-chart type="bar" src="/reports/jobs/weekly" data-error="This chart didn't load. Reload the page to try again."></u-chart>
```

```erb
<u-chart type="bar" src="<%%= weekly_jobs_report_path %>" data-error="<%%= t("uniform.chart.error") %>"></u-chart>
```

## Parts

<%= render "classes", classes_page: "/components/chart/" %>

## Do and don't

<%= render "examples/chart_do_dont" %>

## Accessibility

Name every chart
: `data-label` says what it shows. A stacked bar, meter and sparkline read their values after it, like “Open jobs by status: Overdue 2, On the bench 9”. Put the figure that matters in a [stat](/components/stat/), where everyone reads it.

Keyboard
: A bar or line chart is one Tab stop, named by `data-label`. The left and right arrow keys step through the columns with the same tooltip as hover, Home and End jump to the ends, and Escape hides it.

Never colour alone
: Two series get a legend in words, stacked segments keep their status names, and the stat says up or down.

## Rules

One idea per card
: A card holds one chart about one thing. Two measures with different scales get two cards.

Write the data, never the drawing
: Never draw chart SVG by hand. Pass the rows and let `<u-chart>` draw them.

More chart rules are on the [Charts foundation](/foundations/charts/#rules).
