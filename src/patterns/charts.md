---
layout: page
title: Charts
summary: "A Reports page of figures and chart cards."
section: Patterns
permalink: /patterns/charts/
---

The charts pattern is a Reports page: a row of figures, then one chart per
card. Use it for a page that shows how the work is going over time.

## Example

<div class="frame frame-pad-block frame-desktop">
<%= render "examples/pattern_charts_page", phone: false %>
</div>

A Reports page: a few figures with their trend, then revenue so far this month,
the share of jobs finished on time, open jobs by status and jobs finished each
week. Hover over the revenue chart to read the running total on any day, and
over a bar to pick out its week.

### On a phone

<div class="frame frame-pad-block frame-phone">
<%= render "examples/pattern_charts_page", phone: true %>
</div>

On a phone every card takes the full width, one under the other. The charts
keep their height and their two dates along the bottom, one at each edge. The
figures wrap two to a line.

## Anatomy

[Page header](/components/page-header/)
: The title, Reports, and the period the numbers cover as its description.

Figure tile
: A [card](/components/card/) holding a row of [stats](/components/stat/), each with a [sparkline](/components/chart/#sparkline) under its label.

Chart cards
: One [chart](/components/chart/) per card: the line chart for revenue, the meter for jobs on time, the stacked bar for open jobs and the bar chart for jobs finished each week. Each card holds its title, figure, change, plot and footer.

Layout
: A `flex flex-col gap-6` column of the figure tile and a [grid](/components/grid/) with a 24px gap: revenue across eight columns beside a stack of the meter and the stacked bar, then the weekly bars across all twelve. On a phone the grid gives way to one card under another.

## Code

The whole page, inside the app shell's `<main>`. Each card is a [chart](/components/chart/) drawn by `<u-chart>` from a table.

```html
<%= inline_partial("examples/pattern_charts_page", phone: false) %>
```


## Do and don't

<%= render "examples/chart_do_dont" %>

## Rules

One idea per card
: A card holds one chart about one thing. If two measures need different scales, they get two cards.

Every chart here follows the [chart rules](/foundations/charts/#rules) and the [accessibility notes](/foundations/charts/#accessibility) on the Charts foundation.
