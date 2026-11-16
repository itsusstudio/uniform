---
layout: page
title: List
summary: "Rows of one kind of thing, each with one action."
section: Components
permalink: /components/list/
---

A list shows a few things of one kind, one per row. Use it when people act on each row, and a [table](/components/table/) when they compare rows.

## Example

<div class="u-grid">
<div class="u-span-8">
<%= render "examples/list_jobs" %>
</div>
</div>

Each `<li>` is a row, with its children in a line. The first
[`u-meta`](/components/meta/), button, [`u-actions`](/components/actions/)
or [badge](/components/badge/) in a row goes to
the far right.

## Code

```html
<%= raw render("examples/list_jobs").strip %>
```

```erb
<section class="u-card">
  <header>
    <h3><%%= t(".title") %></h3>
  </header>
  <ul class="u-list">
    <%% jobs.each do |job| %>
      <li>
        <span class="u-text-data">#<%%= job.number %></span>
        <span><%%= t(".job", customer: job.customer.name, work: job.work) %></span>
        <%%= link_to t(".text_customer", name: job.customer.first_name), new_job_message_path(job), class: "u-btn u-btn-outline" %>
      </li>
    <%% end %>
  </ul>
</section>
```

## Parts

<%= render "classes", classes_page: "/components/list/" %>

## A second line

<div class="u-grid">
<div class="u-span-6">
<section class="u-card">
<ul class="u-list">
<li><div><p>Ana Reyes</p><p class="u-list-item-detail">ana.reyes@gmail.com</p></div><span class="u-meta">3 jobs</span></li>
<li><div><p>Sam Okafor</p><p class="u-list-item-detail">sam@okafor.ca</p></div><span class="u-meta">1 job</span></li>
</ul>
</section>
</div>
</div>

For one more fact about the row's name, like a customer's email address, put
the name and a `u-list-item-detail` in a `<div>`. Put a date, count or price at
the end of the row in [`u-meta`](/components/meta/). For a person, put the
[avatar](/components/avatar/) first, then their name with a detail line like
"Away since 2pm". A note someone left is a [timeline](/components/timeline/)
entry.

```html
<li>
  <div>
    <p>Ana Reyes</p>
    <p class="u-list-item-detail">ana.reyes@gmail.com</p>
  </div>
  <span class="u-meta">3 jobs</span>
</li>
```

```erb
<li>
  <div>
    <p><%%= customer.name %></p>
    <p class="u-list-item-detail"><%%= customer.email_address %></p>
  </div>
  <span class="u-meta"><%%= t(".jobs_count", count: customer.jobs.size) %></span>
</li>
```

## Adding and removing rows

To fade a row in or out, give its `<li>` `u-enter` or `u-exit` from
[Motion](/foundations/motion/), and put the row's content in a `<div>` with
`u-list-item`. The divider goes with the row.

```html
<ul class="u-list">
  <li class="u-enter">
    <div class="u-list-item">
      <span class="u-text-data">#1051</span>
      <span>Mia Chen, clasp replacement</span>
    </div>
  </li>
</ul>
```

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<section class="u-card">
<ul class="u-list">
<li><span>Ana Reyes</span><span class="u-text-data">Nov 14</span><span class="u-text-data">$85.00</span><span class="u-badge u-badge-info">On the bench</span></li>
<li><span>Sam Okafor</span><span class="u-text-data">Nov 15</span><span class="u-text-data">$40.00</span><span class="u-badge u-badge-warning">Waiting</span></li>
</ul>
</section>
</div>
<figcaption class="example-caption example-caption-dont"><span>Four facts per row with nothing to do. The columns don't line up and there are no headings, so it's a table pretending to be a list.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<section class="u-card">
<ul class="u-list">
<li><span>Ana Reyes, ring resize</span><button type="button" class="u-btn u-btn-outline">Text Ana</button></li>
<li><span>Sam Okafor, chain repair</span><button type="button" class="u-btn u-btn-outline">Text Sam</button></li>
</ul>
</section>
</div>
<figcaption class="example-caption example-caption-do"><span>One name and one action per row. The row says what it is and what you can do with it.</span></figcaption>
</figure>
</div>

## Accessibility

Real list
: Use a `<ul>` or `<ol>` of `<li>`, so screen readers announce how many rows there are.

Actions name the row
: A button that repeats on every row says which row it's for, like "Text Ana", or has an `aria-label` that does.

## Rules

One action per row
: Put two or more actions in a [menu](/components/menu/) behind a "…" button.

Short lists only
: Keep a list to what fits on one screen. Put longer sets that people sort or filter in a [table](/components/table/).
