---
layout: page
title: Timeline
section: Patterns
permalink: /patterns/timeline/
summary: "The history of one record, newest first."
---

The timeline is the history of one record on its own page, with notes and
events in one list. Use it when people need to see everything that happened to
a record.

## Example

<div class="frame frame-desktop">
<%= render "screen", title: "Job page with its timeline on a wide screen", fit: true, html: render("examples/pattern_timeline_app", id: "tl-desktop", live: true) %>
</div>

Job details come first in their own card, then the history, straight on the page under its own heading. A status
change shows its [badge](/components/badge/), so the only colour in the list
is where the job stands. Texts, quotes and payments say what happened and to
whom, and a note shows in full with its author.

## States

### A brand-new job

<div class="max-w-prose">
<%= render "examples/pattern_timeline_card", state: :empty, prefix: "tl-empty" %>
</div>

Before anything happens, the note box stays and an empty state
says what will show up. It has no button, because the note box is already the
one thing to do.

### A long history

<div class="max-w-prose">
<%= render "examples/pattern_timeline_card", state: :long, prefix: "tl-long" %>
</div>

Show today and yesterday, then put the rest in a native `<details>` that says
how many events it holds. It opens with no script, and the older days follow
in the same list.

## On a phone

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="frame frame-phone">
<%= render "screen", title: "Job page with its timeline on a phone", fit: true, html: render("examples/pattern_timeline_app", id: "tl-phone", live: false) %>
</div>
</div>

Nothing moves on a phone. The details card and the history stack, the time stays at the end of each
event, and long lines wrap under their own text.

## Anatomy

[Page header](/components/page-header/)
: The job number in `u-data` as the title, the customer and the work as the description, and an outline “Edit job” [button](/components/button/).

Details
: A [card](/components/card/) with a [description list](/components/description-list/). Dates, amounts and the phone number use `u-data`.

Note box
: A form at the top of the history: a [text area](/components/text-field/) labelled “Add a note” with a hint that only the shop sees notes, and a primary “Post note” button.

Days
: A `flex flex-col gap-12` column of days, 48px apart. Each day is a `text-small font-medium` heading over its own [timeline](/components/timeline/). Dates use `u-data`, and “Today” and “Yesterday” don't.

Events
: Each event is an `<li>` with one line of what happened, an optional `<small>` detail line, and the time. A status change holds a [badge](/components/badge/).

Notes
: An event that starts with an initials [avatar](/components/avatar/), the author's name in `<strong>`, and the whole note.

Older events
: A `<details>` holding the older days. Its `<summary>` is drawn as a link.

Empty state
: Takes the list's place on a new job, under the note box.

## Code

The job page, inside the app shell's `<main>`. See [Dashboard shell](/patterns/dashboard-shell/) for the frame around it.

```html
<%= inline_partial("examples/pattern_timeline_page", prefix: "") %>
```

A brand-new job:

```html
<%= inline_partial("examples/pattern_timeline_card", state: :empty, prefix: "") %>
```

A long history, with older events collapsed:

```html
<%= inline_partial("examples/pattern_timeline_card", state: :long, prefix: "") %>
```

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame flex flex-col gap-2">
<div class="u-card"><div class="u-card-content"><p>Quote sent to Ana Reyes</p></div></div>
<div class="u-card"><div class="u-card-content"><p>Ana approved the quote, <span class="u-data">$85.00</span></p></div></div>
<div class="u-card"><div class="u-card-content"><p>Status changed to <span class="u-badge u-badge-info">On the bench</span></p></div></div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Every event in its own card. The borders outweigh the words, and a week of history fills three screens.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<ol class="u-timeline">
  <li>
    <div><p>Status changed to <span class="u-badge u-badge-info">On the bench</span></p></div>
    <u-relative-time format="time"><time datetime="2026-11-11T14:15:00-05:00">2:15pm</time></u-relative-time>
  </li>
  <li>
    <div><p>Ana approved the quote, <span class="u-data">$85.00</span></p></div>
    <u-relative-time format="time"><time datetime="2026-11-11T14:12:00-05:00">2:12pm</time></u-relative-time>
  </li>
  <li>
    <div><p>Quote sent to Ana Reyes</p></div>
    <u-relative-time format="time"><time datetime="2026-11-11T10:05:00-05:00">10:05am</time></u-relative-time>
  </li>
</ol>
</div>
<figcaption class="example-caption example-caption-do"><span>One list on one line, in the job's history.</span></figcaption>
</figure>
</div>

## Rules

Newest first, by day
: The latest event sits at the top, under the note box. Days are headed “Today”, “Yesterday”, then the date, as the studio writing style says.

Notes and events in one list
: Don't split notes into their own tab. The note that explains a status change sits right beside it.

Notes stay in the shop
: The hint under the note box says customers never see notes. Anything for the customer goes out as a text, and the text shows up as its own event.

Collapse, don't page
: A long history shows today and yesterday, then one `<details>` with the count of older events. The history stays one list, as in [Card soup](/start/rules/#card-soup).
