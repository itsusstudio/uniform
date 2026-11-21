---
layout: page
title: Card
summary: "A bordered box that holds one object."
section: Components
permalink: /components/card/
---

A card groups the details and actions of one object on a page.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<section class="u-card">
<header>
<h3>Customer</h3>
<button type="button" class="u-btn u-btn-ghost">Edit</button>
</header>
<div class="u-card-content">
<dl class="u-dl">
<dt class="text-muted">Name</dt><dd>Ana Reyes</dd>
<dt class="text-muted">Phone number</dt><dd>(416) 555-0199</dd>
<dt class="text-muted">Email address</dt><dd>ana@example.com</dd>
</dl>
</div>
</section>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<section class="u-card">
<header>
<hgroup>
<h3>Open jobs</h3>
<p>Due this week</p>
</hgroup>
<a href="#example" class="text-small">View all</a>
</header>
<ul class="u-list">
<li><span class="u-data">#1042</span><span>Ring resize</span><span class="u-meta">Nov 14</span></li>
<li><span class="u-data">#1039</span><span>Chain repair</span><span class="u-meta">Nov 15</span></li>
<li><span class="u-data">#1036</span><span>Watch battery</span><span class="u-meta">Nov 16</span></li>
</ul>
</section>
<p class="text-small text-muted">With no <code class="u-data">u-card-content</code>, a <a href="/components/list/">list</a> runs edge to edge.</p>
</div>
</div>

<div class="u-grid card-example-pay">
<div class="@grid:col-span-6">
<section class="u-card">
<header>
<h3>Take payment</h3>
<span class="text-small text-muted">Job <span class="u-data">#1042</span></span>
</header>
<div class="u-card-content">
<div class="flex flex-col gap-4">
<div class="u-field">
<label for="pay-amount">Amount</label>
<input id="pay-amount" class="u-input u-data" value="$85.00" placeholder=" ">
</div>
<div class="u-field">
<label for="pay-method">Paid by</label>
<select id="pay-method" class="u-input"><option>Card</option><option>Cash</option><option>E-transfer</option></select>
</div>
<div class="u-field">
<label for="pay-note">Note <span>(optional)</span></label>
<input id="pay-note" class="u-input" value="" placeholder=" ">
</div>
</div>
</div>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Cancel</button>
<button type="button" class="u-btn u-btn-primary">Take $85.00</button>
</div>
</section>
</div>
<div class="@grid:col-span-6 flex flex-col gap-4 anatomy-notes text-small">
<p>A form inside a card is a <code class="u-data">&lt;header&gt;</code>, then the fields in <code class="u-data">u-card-content</code>, then a <code class="u-data">u-actions</code>. Each part brings its own padding.</p>
<p>The primary button comes last and says exactly what happens, amount included. Cancel sits to its left.</p>
<p>Fields sit 16px apart, and each label sits 8px above its input.</p>
</div>
</div>

## Code

```html
<section class="u-card">
  <header>
    <h3>Take payment</h3>
  </header>
  <div class="u-card-content">…</div>
  <div class="u-actions">
    <button type="button" class="u-btn u-btn-outline">Cancel</button>
    <button type="button" class="u-btn u-btn-primary">Take $85.00</button>
  </div>
</section>

<section class="u-card">
  <header>
    <hgroup>
      <h3>Open jobs</h3>
      <p>Due this week</p>
    </hgroup>
    <a class="text-small" href="/jobs">View all</a>
  </header>
  <div class="u-table" tabindex="0" role="region" aria-label="Open jobs">
    <table>…</table>
  </div>
</section>
```

Header
: A `<header>` straight inside the card. Its first child is the title, a real heading. When the title has a line under it, use an [`<hgroup>`](/components/heading-group/). A link or button after the title sits on the right.

Content
: Put text, fields or a description list in `u-card-content`. Put a [table](/components/table/) or [list](/components/list/) straight in the card instead, so it runs edge to edge.

Actions
: A [`u-actions`](/components/actions/) straight inside the card holds its buttons.

## Parts

<%= render "classes", classes_page: "/components/card/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<section class="u-card"><header><h3>Job #1042</h3></header><div class="u-card-content"><section class="u-card"><header><h3>Customer</h3></header><div class="u-card-content"><p class="text-small">Ana Reyes</p></div></section><section class="u-card"><header><h3>Quote</h3></header><div class="u-card-content"><p class="text-small u-data">$85.00</p></div></section></div></section>
</div>
<figcaption class="example-caption example-caption-dont"><span>Cards inside a card. Every box adds a line to read past, and nothing is grouped better for it.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<section class="u-card"><header><h3>Job #1042</h3></header><div class="u-card-content"><dl class="u-dl"><dt class="text-muted">Customer</dt><dd>Ana Reyes</dd><dt class="text-muted">Quote</dt><dd class="u-data">$85.00</dd></dl></div></section>
</div>
<figcaption class="example-caption example-caption-do"><span>One card, with space and a label column doing the grouping inside it.</span></figcaption>
</figure>
</div>

## Accessibility

Headings
: The card title is a real heading, one level below the section it sits in, so screen reader users can jump between cards.

Clickable cards
: Link the title, not the whole card. A card-sized link reads every word inside it out loud as its name.

## Rules

Actions on the right
: A card's buttons go in a `u-actions` at the bottom, flush right, with the primary button last.

One card per object
: Use a card for a real object, like a job or a customer. Never put a card inside a card.

No shadow
: A card rests on the page, so it has no shadow.

Empty states live in the card
: When a card has nothing to show yet, an `<hgroup>` saying what will appear there and a `u-actions` with one action take the place of its content. There is no empty state component, no picture and no centred text. A table with no search results is the exception: it keeps its header and says so in a row, as the [data table](/patterns/data-table/#no-results) shows.
