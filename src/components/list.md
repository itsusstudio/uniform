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
<div class="@grid:col-span-8">
<%= render "examples/list_jobs" %>
</div>
</div>

Each `<li>` is a row, with its children in a line. The first
[`u-meta`](/components/meta/), button, [`u-actions`](/components/actions/)
or [badge](/components/badge/) in a row goes to
the far right.

## Code

```html
<%= inline_partial("examples/list_jobs") %>
```

```erb
<section class="u-card">
  <header>
    <h3><%%= t(".title") %></h3>
  </header>
  <ul class="u-list">
    <%% jobs.each do |job| %>
      <li>
        <span class="u-data">#<%%= job.number %></span>
        <span><%%= t(".job", customer: job.customer.name, work: job.work) %></span>
        <%%= link_to t(".text_customer", name: job.customer.first_name), new_job_message_path(job), class: "u-btn u-btn-outline" %>
      </li>
    <%% end %>
  </ul>
</section>
```


## Checklist

Add `u-checklist` for a short list of steps to finish, like setting up a product. Give each `li` a `data-state` of `done`, `next` or `todo`: Uniform draws a dashed circle for steps still to do and a green check for done ones, and mutes the title of a done step. Only the `next` step gets a primary button. Put the count and a [progress bar](/components/progress/) above the list.

```html
<section class="u-card">
  <header><hgroup><h2>Set up Workbench</h2><p>2 of 5 done</p></hgroup></header>
  <div class="u-card-content"><div class="u-progress"><progress max="5" value="2" aria-label="Setup progress">2 of 5</progress></div></div>
  <ul class="u-list u-checklist">
    <li data-state="done"><div><p>Add your shop details</p><p class="u-list-item-detail">Shown on every text and receipt.</p></div></li>
    <li data-state="next"><div><p>Take in your first job</p><p class="u-list-item-detail">About a minute.</p></div><a class="u-btn u-btn-primary" href="/jobs/new">Take in a job</a></li>
    <li data-state="todo"><div><p>Turn on pickup texts</p><p class="u-list-item-detail">Customers hear when their piece is ready.</p></div><a class="u-btn u-btn-outline" href="/settings/texts">Set up texts</a></li>
  </ul>
</section>
```

## Feature list

Use `u-feature-list` for a short list of what a plan includes. Each line gets a green check from CSS, and the lines sit close together because they're one block of reading, not rows to act on.

```html
<h3>Every plan includes</h3>
<ul class="u-feature-list">
  <li>Unlimited jobs, team members and photos</li>
  <li>Client emails and texts</li>
</ul>
```

## Groups you can edit

For a short list people arrange themselves, like job statuses, split a card into `u-list-group` sections. Each one has an `h3` (an icon, the name, a `u-meta` count and an action at the end) and a `u-list`. Rows can carry a `u-list-handle` to drag, a `u-swatch` for a colour, and a `u-input-inline` to rename in place.

```html
<section class="u-card">
  <div class="u-list-group">
    <h3><svg class="u-icon u-icon-sm">…</svg>Waiting <span class="u-meta">5 jobs</span><button class="u-btn u-btn-ghost u-btn-icon" aria-label="Add a Waiting status">…</button></h3>
    <ul class="u-list">
      <li>
        <div class="flex flex-wrap items-center gap-2">
          <span class="u-list-handle" aria-hidden="true">…</span>
          <span class="u-swatch" style="--u-swatch: #e9c46a"></span>
          <input class="u-input-inline" value="Quote needed" aria-label="Status name">
        </div>
        <span class="u-meta">2 jobs</span>
      </li>
    </ul>
  </div>
</section>
```

## Selected and divided rows

Add `u-list-divided` for a line between rows, for lists people scan quickly like jobs or clients. Mark the row that's open in a pane with `aria-current="true"`, and it's shaded. A checkbox at the start of a row keeps its size. On a phone, rows in a card use a 16px gutter instead of 24px.

A ghost button in a row, like a status or assignee picker, is outlined when
hovered or focused. The row's own hover shade would otherwise hide the
button's fill, and the outline shows what a click will open.

## Parts

<%= render "classes", classes_page: "/components/list/" %>

## A second line

<div class="u-grid">
<div class="@grid:col-span-6">
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

## Columns

For a long list of people or accounts, add `u-list-columns`. From tablet width
up, the name and its detail line sit side by side in aligned columns, so each
row is one line and the eye can skip the column it doesn't need. Phones keep
them stacked.

```html
<ul class="u-list u-list-divided u-list-columns">
  <li>
    <div>
      <p>Ana Reyes</p>
      <p class="u-list-item-detail">ana.reyes@gmail.com</p>
    </div>
  </li>
</ul>
```

## The first line

A row's first line is its name, in medium weight, and the lines after it are its
details in regular weight. Put the thing people scan for first.

## Rows that open something

When a row opens a page, make its title a link: `<p><a href="…">Ana Reyes</a></p>` as the first line. The link keeps the text colour, the whole row becomes the click target and lightens on hover, and other buttons in the row still work on their own, as in a [table](/components/table/).

## Adding and removing rows

To fade a row in or out, give its `<li>` `u-enter` or `u-exit` from
[Motion](/foundations/motion/), and put the row's content in a `<div>` with
`u-list-item`.

```html
<ul class="u-list">
  <li class="u-enter">
    <div class="u-list-item">
      <span class="u-data">#1051</span>
      <span>Mia Chen, clasp replacement</span>
    </div>
  </li>
</ul>
```

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<section class="u-card">
<ul class="u-list">
<li><span>Ana Reyes</span><span>Nov 14</span><span class="u-data">$85.00</span><span class="u-badge u-badge-info">On the bench</span></li>
<li><span>Sam Okafor</span><span>Nov 15</span><span class="u-data">$40.00</span><span class="u-badge u-badge-warning">Waiting</span></li>
</ul>
</section>
</div>
<figcaption class="example-caption example-caption-dont"><span>Four facts per row with nothing to do. The columns don't line up and there are no headings, so it's a table pretending to be a list.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
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
