---
layout: page
title: Time
section: Components
permalink: /components/time/
summary: "A date or time in the reader's own time zone."
---

A time shows a moment in the reader's time zone and language. The server writes it, and `<u-relative-time>` rewrites it for the reader.

## Example

<div class="u-stack u-gap-2 u-text-small">
<p>Quote sent <u-relative-time format="time"><time class="u-text-data" datetime="2026-11-12T14:14:00-05:00">2:14pm</time></u-relative-time></p>
<p>Due <u-relative-time format="date"><time class="u-text-data" datetime="2026-11-14T17:00:00-05:00">Nov 14</time></u-relative-time></p>
<p><u-relative-time format="day"><time datetime="2026-11-11T09:00:00-05:00">Nov 11</time></u-relative-time></p>
<p>Updated <u-relative-time format="relative"><time class="u-text-data" datetime="2026-11-12T14:10:00-05:00">2:10pm</time></u-relative-time></p>
</div>

## Formats

`time`
: The hour, like 2:14pm. For events within a day, such as a timeline.

`date`
: The day, like Nov 14, with the year only when it isn't this year.

`datetime`
: Both, like Nov 14, 2:14pm. The default.

`day`
: Today, Yesterday, then the date. For headings that group events by day.

`relative`
: Like 5 minutes ago, kept current while the page is open. Only for something that keeps changing, like when a report last updated.

A `datetime` with only a date, like `2026-11-14`, is that day everywhere, never
a moment that shifts a day in another zone. `day` counts Today and Yesterday in
the reader's zone, or the one in `data-time-zone`.

## Time zone

<div class="u-stack u-gap-2 u-text-small" data-time-zone="America/Vancouver">
<p>Ready for pickup <u-relative-time zone="America/Toronto"><time class="u-text-data" datetime="2026-11-14T14:00:00-05:00">Nov 14, 2pm</time></u-relative-time></p>
</div>

Hover any time to see the full date with its zone. Set `zone` to the shop's
time zone, and a reader somewhere else sees their own time with its zone, so
they know it was converted. A reader in the shop's zone sees no
zone at all. This example shows a reader in Vancouver.

## Code

```html
<u-relative-time format="time">
  <time class="u-text-data" datetime="2026-11-12T14:14:00-05:00">2:14pm</time>
</u-relative-time>
```

```erb
<u-relative-time format="time">
  <%%= time_tag message.sent_at, l(message.sent_at, format: :time), class: "u-text-data" %>
</u-relative-time>
```

To fix "now" or the reader's zone for previews, tests or screenshots, set
`data-time-now` or `data-time-zone` on any ancestor, like
`<body data-time-now="2026-11-12T16:00:00-05:00">`.

## Accessibility

Real time element
: The `<time datetime>` keeps the exact moment for assistive technology and machines, whatever the words say.

Works without the script
: The server's words stay. Write them in the shop's time zone, so they're right for most readers.

## Rules

One moment, one `datetime`
: Always give `datetime` its offset. It's the source of truth, and the words only show it.

Language comes from the page
: `<u-relative-time>` uses the nearest `lang` attribute, so a French page shows French dates.
