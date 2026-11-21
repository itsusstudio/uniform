---
layout: page
title: Description list
summary: "Labels beside values for one record's details."
section: Components
permalink: /components/description-list/
---

A description list shows the details of one record, with muted labels beside their values.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<section class="u-card">
<header>
<h3>Job <span class="u-data">#1042</span></h3>
<button type="button" class="u-btn u-btn-ghost">Edit</button>
</header>
<div class="u-card-content">
<dl class="u-dl">
<dt>Customer</dt><dd>Ana Reyes</dd>
<dt>Phone number</dt><dd>(416) 555-0199</dd>
<dt>Item</dt><dd>14k yellow gold band, size 6 to 7½</dd>
<dt>Status</dt><dd><span class="u-badge u-badge-info">On the bench</span></dd>
<dt>Due</dt><dd>Nov 14</dd>
<dt>Quote</dt><dd class="u-data">$85.00</dd>
</dl>
</div>
</section>
</div>
</div>

Below 280px wide, each label sits on top of its value. A narrow card keeps them side by side.

## Code

```html
<dl class="u-dl">
  <dt>Customer</dt>
  <dd>Ana Reyes</dd>
  <dt>Due</dt>
  <dd>Nov 14</dd>
</dl>
```

```erb
<dl class="u-dl">
  <dt><%%= t(".customer") %></dt>
  <dd><%%= job.customer.name %></dd>
  <dt><%%= t(".due") %></dt>
  <dd class="u-data"><%%= l(job.due_on, format: :short) %></dd>
</dl>
```

## Parts

<%= render "classes", classes_page: "/components/description-list/" %>

`<dt>`
: The label. Short, in sentence case, with no colon.

`<dd>`
: The value. Add `u-data` for prices, dates, phone numbers and IDs.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="flex flex-col gap-4 text-small">
<p><span class="font-medium">Customer:</span> Ana Reyes</p>
<p><span class="font-medium">Due:</span> Nov 14</p>
<p><span class="font-medium">Quote:</span> $85.00</p>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Labels run into their values, with heavy labels and colons. The values don't line up, so you have to read every line.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<dl class="u-dl">
<dt>Customer</dt><dd>Ana Reyes</dd>
<dt>Due</dt><dd>Nov 14</dd>
<dt>Quote</dt><dd class="u-data">$85.00</dd>
</dl>
</div>
<figcaption class="example-caption example-caption-do"><span>Quiet labels in their own column, values lined up beside them.</span></figcaption>
</figure>
</div>

## Accessibility

Real list
: It's a `<dl>` with `<dt>` and `<dd>`, so screen readers read each label with its value.

Empty values
: If a value is missing, say so in words, like “No phone number”. A blank or a dash reads as nothing.

## Rules

One record per list
: A description list holds the details of one thing. Several things of the same kind go in a [table](/components/table/).

Labels are muted, values are ink
: The value is what people came for, so it's the one that stands out.

Edit in a form
: To change details, open a form with fields.
