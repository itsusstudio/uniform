---
layout: page
title: Charts
summary: "How a chart looks and behaves."
section: Foundations
permalink: /foundations/charts/
---

These are the rules for how a chart looks and behaves, from its card to its
tooltip. Every chart built from them is on [Chart](/components/chart/), and a
whole Reports page is in the [Charts pattern](/patterns/charts/).

## Is it a chart?

Most numbers don't need one. Pick the plainest form that answers the question.

One number
: Show the number as a [stat](/components/stat/). “6 due this week” needs no picture.

A few values
: Up to about six values, or values people will look up one by one, go in a [table](/components/table/).

Change over time
: A line for a running total or anything measured every day. Bars for counts in whole weeks or months.

Parts of one whole
: One stacked bar, with each part named and counted in the legend.

Progress to a target
: A meter: “31 of 40 jobs on time”.

## The card

Every chart sits in a [card](/components/card/): the title and the period
picker in the header, then the figure and its change, then the legend if there
is one, then the plot, then a muted footer saying when the numbers were last
worked out.

<div class="example-frame">
<%= render "examples/chart_change" %>
</div>

The figure is a [stat](/components/stat/), 32px Plex Mono. Under it, a line
with `data-trend="up"` or `data-trend="down"` says what the figure covers and
how it moved, after an up or down arrow: “So far this month, up 12% on Oct 12”.
The change is in words and muted grey, never green or red, because up isn't
always good. Leave out `data-trend` when nothing changed, and say “Same as
October”.

## Colour

A chart holds one or two series, with faint lines across and plenty of white.
The data is the only thing in ink.

<div class="example-frame">
<%= render "examples/chart_bar" %>
</div>

Main series
: Ink, `--u-color-chart-current`. This month, this week, the thing the figure talks about.

Comparison
: Grey, `--u-color-chart-previous`. Last month, the same week last year, past weeks next to the current one.

Fill
: `--u-color-chart-fill` at `--u-chart-fill-opacity`: ink at 14% just under the main line, fading to nothing at the baseline (light ink at 12% in dark mode). Only under the main series and sparklines. A comparison line is drawn over it, never under.

Grid and track
: `--u-color-chart-grid` for the lines across the plot, and `--u-color-chart-track` for the empty part of a meter. Both are the divider grey.

Signals
: Vermilion, cobalt, yellow and pine only when they mean a job status: overdue, on the bench, waiting, ready. Never as series 3 or 4.

The tokens are on the [Colour](/foundations/colour/#charts) page. Colour tokens
hold `light-dark()`, so a script that draws on a canvas sets the token on an
element, like its `color`, and reads the resolved colour with
`getComputedStyle`. Dark mode then works the same way it does everywhere else.

## Marks

Bars
: Square, top and bottom, grown from zero. About 60% of their slot, so the gaps are air.

Lines
: 1.5px monotone curves with round joins. The curve passes through every value and never overshoots it, so a running total never seems to dip. No dots on the line.

Fill
: A fade under the main line, from 14% ink just under its highest point to nothing at zero. It shows the shape of the total at a glance and makes the main series read first. This is the one place Uniform uses a gradient.

Stacked bar
: 24px tall, square ends, a 2px white gap between parts. Parts keep one order everywhere: overdue first, ready for pickup last.

Meter
: An 8px ink bar on the track, on a native `<meter>`.

No shadows, 3D or animation, and no gradient but the fill. Charts draw
instantly, like the rest of the page.

## Axes and gridlines

Three lines run across: zero, the middle and the top, in the divider grey, at
round values. No axis lines, no tick marks and no vertical gridlines. Bar
charts always start at zero. Labels are 12px Plex Mono in muted grey: values on
the left, and only two dates along the bottom, the first flush with the left
edge of the plot and the last flush with the right. The tooltip gives every
date in between, so the labels never crowd, even on a phone.

## Hover

<div class="example-frame">
<div class="u-row u-row-top u-gap-12">
<%= render "examples/chart_tooltip" %>
</div>
</div>

A tooltip floats like a [menu](/components/menu/): white, a 1px border, the
float shadow, square corners. One row per series, the newest first: a short
line in the series colour, the value in medium Plex Mono, then the date in
muted grey.

On a line chart, a 1px crosshair follows the pointer and
snaps to the nearest day, so you never have to land on a 1.5px line. Each
series gets a round dot on that day: 4px radius, white inside, a 2px ring in
the series colour. On a bar chart, each bar's whole slot is its target, so
the pointer never falls into a gap between bars. Pointing at one dims the
others to 35% and draws a dashed guide through it.

The tooltip has its own strip above the plot and never covers the bars or the
line. It slides along that strip with the pointer, centred on the day or the
bar, and stops at the plot's edges instead of flipping sides. The crosshair on
a line chart is a dashed line in the input-border grey, the same as the guide
on a bar chart.

Hover follows the pointer straight away. The one fade is the bars dimming,
over 100ms (`--u-motion-hover`), so moving across a bar chart reads as one
steady sweep instead of a flicker. Tooltips only add detail. Everything they
show is also in the chart's hidden table.

## Legend

<div class="example-frame">
<%= render "examples/chart_legend" %>
</div>

Only when there are two series or more, in a row above the plot, in sentence
case. The chart draws it from the table's header cells, with a short line key
for each line. A status chart uses
[badge](/components/badge/) for its legend, with the count beside each word,
so the legend doubles as the numbers.

## Numbers

Axes
: Rounded and short: $0, $4k, $8k, $12k, or 0, 10, 20.

Tooltips and tables
: Exact, with cents: $3,210.40.

Figures
: The way the rest of the app writes them: $4,280.00, 23, 31 of 40.

Dates
: Short month and day, Nov 9, in mono.

Changes
: In words, with the period named: “up 12% on Oct 12”, “down 2 on last Thursday”. Whole percentages.

## Empty and loading

<%= render "examples/chart_states" %>

Keep the card, its title and the plot's height, so nothing jumps when data
arrives. With no data yet, say in one muted line what will show up there. While
it loads, grey bars fill the same space with a slow shimmer passing over them,
and the card has `aria-busy="true"` and a hidden “Loading” line for screen
readers. The shimmer stops when someone has asked for reduced motion.
Leave out the figure until there's a real one: a row of zeros only says twice
that nothing has happened.

## Accessibility

Name the picture
: A static SVG chart has `role="img"` and an `aria-label` that says what it shows and the values that matter: the lowest, the highest and the latest.

Keep every value in text
: Put the full data in a table with `u-visually-hidden` after the chart, so a screen reader can go row by row.

Never colour alone
: Series have a legend in words, statuses have their names, and changes say up or down.

Contrast
: The ink and grey series and every signal colour except yellow reach 3:1 against white. Yellow parts always sit next to their word and count.

## Drawing them

Every chart is a `<table>` of data inside [`<u-chart>`](/components/chart/),
which draws it as SVG and HTML. The fill under a line is a `linearGradient`
with two stops, `u-chart-fade-top` and `u-chart-fade-bottom`, which read the
fill tokens. Without the script, the table shows on its own.

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/charts/" %>
