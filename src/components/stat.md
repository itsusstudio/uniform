---
layout: page
title: "Text: Stat"
summary: "One big figure and what it counts."
section: Components
permalink: /components/stat/
---

A stat shows one figure that matters on its own. Several sit in a `u-stats` row of equal columns.

## Example

<div class="example-frame">
<section class="u-card">
<div class="u-card-content">
<div class="u-stats">
<div class="u-stat"><p>6</p><a href="#example">Due this week</a></div>
<div class="u-stat"><p>3</p><a href="#example">Waiting on parts</a></div>
<div class="u-stat"><p>$310.00</p><a href="#example">Unpaid quotes</a></div>
</div>
</div>
</section>
</div>

<div class="example-frame">
<%= render "examples/chart_change" %>
</div>

## Code

```html
<div class="u-stats">
  <div class="u-stat">
    <p>6</p>
    <a href="/jobs?due=this-week">Due this week</a>
  </div>
  <div class="u-stat">
    <p>$4,280.00</p>
    <p data-trend="up">So far this month, up 12% on Oct 12</p>
  </div>
</div>
```

Label
: The line after the figure says what it counts. Make it an `<a>` to link to the list behind the number, or a `<p>` for muted text.

Views
: When every label in a row is a link to a filtered list, the row works as tabs over that list. Each stat gets a rule on top and the whole stat is the link's target. Put `aria-current="page"` on the link to the view on show, and its rule turns ink.

Change
: Give the line `data-trend="up"` or `data-trend="down"` to say how the figure moved. It gets an up or down arrow. Use it only when the figure changed.

## Parts

<%= render "classes", classes_page: "/components/stat/" %>

## Rules

One size for figures
: Use `u-stat` for every figure, on a home page or a chart card. Never build one from `text-heading` and `u-data`.

Arrows, not colours
: A change stays muted, never green or red, because up isn't always good.

Phones
: Figures shrink with the row, down to 20px, and stay on one line. On a phone the row holds two stats and the next ones go underneath.

Few stats
: Four at most in a row. Show a stat only when it changes what someone does today.
