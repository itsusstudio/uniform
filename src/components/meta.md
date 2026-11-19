---
layout: page
title: "Text: Meta"
summary: "A muted date, time, count or code."
section: Components
permalink: /components/meta/
---

Meta is a small fact beside the thing it describes, like a date or a count. It's muted mono, so figures line up in a column.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<section class="u-card">
<header><h3>Picked up</h3></header>
<ul class="u-list">
<li><span class="u-data">#1012</span><span>Ana Reyes, ring resize</span><span class="u-meta">Nov 4</span></li>
<li><span class="u-data">#1009</span><span>Omar Haddad, watch battery</span><span class="u-meta">Nov 3</span></li>
<li><span class="u-data">#1007</span><span>June Park, chain repair</span><span class="u-meta">Nov 3</span></li>
</ul>
</section>
</div>
</div>

## Code

```html
<li>
  <span class="u-data">#1012</span>
  <span>Ana Reyes, ring resize</span>
  <u-relative-time format="date"><time class="u-meta" datetime="2026-11-04">Nov 4</time></u-relative-time>
</li>
```

Put `u-meta` on the `<time>` itself, inside [`<u-relative-time>`](/components/time/), so
the reader sees their own time zone.

## Parts

<%= render "classes", classes_page: "/components/meta/" %>

## Rules

Meta is a fact, not a sentence
: Use it for dates, times, counts, sizes and codes. A muted sentence under a heading is a [heading group](/components/heading-group/), and a hint under a field is a `<small>` in its `u-field`.

Never build one by hand
: Always use `u-meta`, never `text-muted`, `text-small` and `u-data`. Copies built by hand drift in size or lose the mono, and the columns stop lining up.
