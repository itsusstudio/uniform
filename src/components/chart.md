---
layout: page
title: Chart
summary: "A chart drawn from a plain table of data."
section: Components
permalink: /components/chart/
---

`<u-chart>` draws a chart from the `<table>` inside it. Pick the type with one
attribute, and the element handles the drawing, hover, loading and empty states.

## Example

<div class="u-grid">
<%= render "examples/chart_bar", span: 8, prefix: "chart" %>
</div>

## Code

```html
<u-chart type="bar" height="160">
  <table>
    <caption>Jobs finished each week</caption>
    <thead><tr><th scope="col">Week of</th><th scope="col">Jobs</th></tr></thead>
    <tbody>
      <tr><th scope="row">Oct 26</th><td>19</td></tr>
      <tr><th scope="row">Nov 2</th><td>23</td></tr>
    </tbody>
  </table>
</u-chart>
```

```erb
<u-chart type="bar" height="160">
  <table>
    <caption><%%= t(".caption") %></caption>
    <thead><tr><th scope="col"><%%= t(".week_of") %></th><th scope="col"><%%= t(".jobs") %></th></tr></thead>
    <tbody>
      <%% jobs_per_week.each do |week, count| %>
        <tr><th scope="row"><%%= l(week, format: :short) %></th><td><%%= count %></td></tr>
      <%% end %>
    </tbody>
  </table>
</u-chart>
```

The first column labels each row, like a week or a day, and the next holds the
values. Put the chart in a [card](/components/card/) with its title and a
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

## Why a table, not JSON

Works with no script
: If JavaScript fails or hasn't loaded, people see a readable table of the same numbers instead of a blank card.

One copy of the data
: Screen readers read the table. Once the chart is drawn, the table stays in the page for them, hidden from sight.

Formatted by the server
: Rails writes dates and money in the reader's language, and the chart shows those words in its tooltip. JSON would need its own formatting and escaping.

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

`data-value` on a cell
: The number to draw, when the cell's text can't be read as one, like `4 280,00 $`.

`data-label` on a cell
: The tooltip label for that value, like `Oct 12` in a comparison row for Nov 12.

`data-tone` on a row
: The status colour of a stacked bar segment: `danger`, `info`, `warning`, `success` or `neutral`.

## Loading and empty

<%= render "examples/chart_states" %>

Empty
: A table with no rows shows the line in `data-empty`, in the plot's height.

Loading
: With `aria-busy="true"` and no table, the chart shows shimmer bars until a table arrives, for example by Turbo Stream.

From a URL
: With `src`, the chart fetches that page and draws its first table, with shimmer bars while it loads. If the fetch fails, it shows the line in `data-error`.

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

The table is the data
: Give the table a `<caption>`, header cells and `scope`. Screen readers read the table and skip the drawing.

Keyboard
: A bar or line chart is one Tab stop, named by the table's caption. The left and right arrow keys step through the columns with the same tooltip as hover, Home and End jump to the ends, and Escape hides it.

Never colour alone
: Two series get a legend in words, stacked segments keep their status names, and the stat says up or down.

## Rules

One idea per card
: A card holds one chart about one thing. Two measures with different scales get two cards.

Write the table, never the drawing
: Never draw chart SVG by hand or pass the data as JSON.

More chart rules are on the [Charts foundation](/foundations/charts/#rules).
