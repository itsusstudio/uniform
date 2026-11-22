---
layout: page
title: Badge
section: Components
permalink: /components/badge/
summary: "A coloured square and a word saying where something stands."
---

A badge says where something stands, or flags a fact, with a word beside a square in its signal colour. The word carries the meaning.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<%= render "examples/badge_cards" %>
</div>
</div>

States in a list get the square and word. A danger badge's word is red too, like an error message, so a problem reads as one at a glance. The few facts that have to stand out, like a declined card, are `u-badge-strong`.

## Variants

<div class="example-frame flex flex-col gap-4">
<div class="flex flex-wrap items-center gap-6">
<span class="u-badge u-badge-info">On the bench</span>
<span class="u-badge u-badge-warning">Waiting on parts</span>
<span class="u-badge u-badge-danger">Overdue</span>
<span class="u-badge u-badge-success">Paid</span>
<span class="u-badge u-badge-neutral">Draft</span>
</div>
<div class="flex flex-wrap items-center gap-2">
<span class="u-badge u-badge-info u-badge-strong">Beta</span>
<span class="u-badge u-badge-warning u-badge-strong">Expires soon</span>
<span class="u-badge u-badge-danger u-badge-strong">Card declined</span>
<span class="u-badge u-badge-success u-badge-strong">Verified</span>
<span class="u-badge u-badge-neutral u-badge-strong">Archived</span>
</div>
<div class="flex flex-wrap items-center gap-2">
<span class="u-badge u-badge-info u-badge-strong"><%= render "icon", name: "eye", small: true %>Clients see this</span>
<span class="u-badge u-badge-neutral u-badge-strong"><%= render "icon", name: "lock", small: true %>Only your team</span>
</div>
<div class="flex flex-wrap items-center gap-2">
<span class="u-badge u-badge-info u-badge-strong u-badge-lg">At the bench</span>
<span class="u-btn u-btn-outline">Edit</span>
</div>
</div>

<%= render "classes", classes_page: "/components/badge/", classes_variants: true %>

Give every badge `u-badge` and one colour class.

A strong badge can start with a small icon, like a lock on a card only your
team sees. The badge sizes the icon to its text.

Add `u-badge-lg` to a strong badge that heads a page, like the status button at
the top of a job. It takes the height of the buttons beside it.

## Code

```html
<%= inline_partial("examples/badge_cards") %>
```

## Parts

<%= render "classes", classes_page: "/components/badge/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame flex flex-col gap-2">
<p class="text-small badge-demo-dont-text">Overdue</p>
<p class="text-small"><span class="badge-demo-dont-pill">Paid</span></p>
</div>
<figcaption class="example-caption example-caption-dont"><span>Coloured words and tinted pills. Red text is hard to read, and a filled pill in every row shouts louder than the record it belongs to.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame flex flex-col gap-2">
<span class="u-badge u-badge-danger">Overdue</span>
<span class="u-badge u-badge-success">Paid</span>
</div>
<figcaption class="example-caption example-caption-do"><span>An ink word with a square beside it. The word says it, the square helps you find it.</span></figcaption>
</figure>
</div>

## Accessibility

Words carry it
: The word is the meaning. Screen readers read it, and it still makes sense with the colour gone.

Square is decoration
: Assistive tech skips the square. Add no hidden label for the colour.

Changing live
: If a badge changes while someone is on the page, announce it with a [toast](/components/toast/) or a polite live region, not the badge itself.

Contrast
: Text on every strong badge passes 4.5:1 in light and dark.

## Rules

One word or two
: Write what's true right now, like “Overdue” or “Ready for pickup”. Keep a short, fixed list of states per record so people learn them.

One state, one colour
: Each state keeps its colour everywhere, in tables, emails and charts, so people can rely on it.

| State | Colour | Class |
|---|---|---|
| Late, failed, declined | Vermilion | `u-badge-danger` |
| In progress | Cobalt | `u-badge-info` |
| Waiting, close to a deadline | Yellow | `u-badge-warning` |
| Done, paid, approved | Pine | `u-badge-success` |
| Draft, cancelled | Grey | `u-badge-neutral` |

Strong only when it changes a decision
: Use `u-badge-strong` for one fact that needs action or attention, like a declined card. A list of records always uses the quiet badge.

Not clickable
: A badge is never a link or a button. For something people press or remove, use a [chip](/components/chip/).
