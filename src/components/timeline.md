---
layout: page
title: Timeline
summary: "A list of events on one thing, newest first."
section: Components
permalink: /components/timeline/
---

A timeline lists what happened to one record, newest first. Use it for a
record's history and notes.

## Example

<div class="example-frame">
<%= render "examples/timeline_basic" %>
</div>

Each event is an `<li>` holding a `<div>` of what happened and a `<u-relative-time>`.
A `<small>` in the div is a muted detail line. A note starts with an avatar, and
its `<strong>` is the author.

Give a note's `<div>` the `u-timeline-card` class to set the person's words on a soft card, apart from the changes around it. A `<li class="u-timeline-day">` holding a heading starts a new day on the same line: it has no dot, so one line runs from the top of the list through every day. Put a note box as the first `<li>`, after the writer's avatar, and the line starts from it.

To keep a long list short, fold back-to-back changes into one `<details class="u-timeline-fold">` inside the event's `<div>`: the summary says what changed, and a `<ul>` lists each change with its time. Hide older rows with `hidden` and `data-u-earlier`, and put a `<li class="u-timeline-more u-timeline-gap">` holding a button with `data-u-show-earlier` where they start: the line loops beside it, marking the updates folded away, and the button shows them and goes away. To fold several stretches apart, give each its own name: rows with `data-u-earlier="2"` open only from the button with `data-u-show-earlier="2"`. Day headings keep a straight line.

## Older events

<div class="example-frame">
<%= render "examples/timeline_older" %>
</div>

Put older events in a `<details>` after the list, holding another `u-timeline`.
Its `<summary>` looks like a link and goes away once open, so the older events
continue the same list.

## Code

```html
<%= inline_partial("examples/timeline_basic") %>
```

Grouped by day, each day is a heading and its own list:

```html
<section class="flex flex-col gap-2">
  <h3 class="text-small font-medium"><u-relative-time format="day"><time datetime="2026-11-12T13:32:00-05:00">Today</time></u-relative-time></h3>
  <ol class="u-timeline">…</ol>
</section>
```

Older events, collapsed:

```html
<%= inline_partial("examples/timeline_older") %>
```

## Parts

<%= render "classes", classes_page: "/components/timeline/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<ol class="u-timeline">
  <li>
    <div><p>Paid <span class="u-data">$85.00</span></p></div>
    <u-relative-time format="time"><time datetime="2026-11-12T16:08:00-05:00">3 hours ago</time></u-relative-time>
  </li>
  <li>
    <div><p>Text sent</p></div>
    <u-relative-time format="time"><time datetime="2026-11-12T13:32:00-05:00">6 hours ago</time></u-relative-time>
  </li>
</ol>
</div>
<figcaption class="example-caption example-caption-dont"><span>Relative times and bare events. “6 hours ago” changes while you read it, and “Text sent” doesn't say which text or to whom.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<ol class="u-timeline">
  <li>
    <div><p>Paid <span class="u-data">$85.00</span>, Visa ending <span class="u-data">4242</span></p></div>
    <u-relative-time format="time"><time datetime="2026-11-12T16:08:00-05:00">4:08pm</time></u-relative-time>
  </li>
  <li>
    <div><p>Text sent: your ring is ready</p></div>
    <u-relative-time format="time"><time datetime="2026-11-12T13:32:00-05:00">1:32pm</time></u-relative-time>
  </li>
</ol>
</div>
<figcaption class="example-caption example-caption-do"><span>The clock time, and each event says what it was. You can read the history without opening anything.</span></figcaption>
</figure>
</div>

## Accessibility

An ordered list
: The timeline is an `<ol>`, so a screen reader says how many events there are.

Real times
: Put each time in a `<time>` with a full `datetime`, inside a [`<u-relative-time>`](/components/time/). The date and hour are there even when only the hour shows, in the reader's own time zone. Day headings use `format="day"`.

Name it once
: Give the avatar beside a note `aria-hidden="true"`, since the author's name follows it.

## Rules

One line per event
: Say what happened in one line, like “Quote sent to Ana Reyes”. Put who it went to or how in a muted detail line, and show a note in full.

No dots or coloured edges
: Avatars are the only round thing on a timeline, and no event gets a coloured edge.

Colour only from a status
: An event gets colour only when it changes a status. Payments, texts and notes stay ink.
