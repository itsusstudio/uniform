---
layout: page
title: Page tabs
summary: "Links between views of one record."
section: Page frame
permalink: /components/page-tabs/
---

Page tabs switch between views of the same record. Each tab is a link to its own page, so a view can be bookmarked and shared.

## Example

<div class="example-frame flex flex-col gap-6">
<header class="u-page-header">
<hgroup>
<h1>Ana Reyes, ring resize</h1>
<p>Job <span class="u-data">#1042</span>, due <span class="u-data">Nov 14</span></p>
</hgroup>
</header>
<nav class="u-page-tabs" aria-label="Job">
<a href="#example" aria-current="page">Details</a>
<a href="#example">Photos</a>
<a href="#example">Messages</a>
<a href="#example">History</a>
</nav>
</div>

<div class="example-frame">
<nav class="u-page-tabs" aria-label="Jobs">
<a href="#example">On the bench</a>
<a href="#example" aria-current="page">Ready for pickup</a>
<a href="#example">Picked up</a>
</nav>
</div>

## States

<div class="example-frame">
<nav class="u-page-tabs" aria-label="States">
<a href="#states" aria-current="page">Current</a>
<a href="#states">Not current</a>
</nav>
</div>

A tab that isn't current is muted. On a narrow screen, the row wraps onto a
second line.

## Code

```html
<nav class="u-page-tabs" aria-label="Job">
  <a href="/jobs/1042" aria-current="page">Details</a>
  <a href="/jobs/1042/photos">Photos</a>
  <a href="/jobs/1042/messages">Messages</a>
</nav>
```

```erb
<nav class="u-page-tabs" aria-label="<%%= t(".job") %>">
  <%% { details: job_path(job), photos: job_photos_path(job), messages: job_messages_path(job) }.each do |tab, path| %>
    <%%= link_to t(".#{tab}"), path, aria: { current: ("page" if current_page?(path)) } %>
  <%% end %>
</nav>
```

Mark the current tab with `aria-current="page"`.

## Parts

<%= render "classes", classes_page: "/components/page-tabs/" %>

`aria-current="page"`
: Marks the tab you're on with a grey pill and ink text.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<nav class="u-page-tabs" aria-label="Don’t example">
<a href="#do-and-dont" aria-current="page">Details</a>
<a href="#do-and-dont">Text customer</a>
<a href="#do-and-dont">Print ticket</a>
</nav>
</div>
<figcaption class="example-caption example-caption-dont"><span>Actions dressed up as tabs. A tab shows a view, it never does something. Use buttons.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<nav class="u-page-tabs" aria-label="Do example">
<a href="#do-and-dont" aria-current="page">Details</a>
<a href="#do-and-dont">Photos</a>
<a href="#do-and-dont">Messages</a>
</nav>
</div>
<figcaption class="example-caption example-caption-do"><span>Each tab is a different look at the same job, named with a short noun.</span></figcaption>
</figure>
</div>

## Accessibility

Real links
: Tabs are links inside a `<nav>`, so they work with the keyboard, open in a new tab and show up in the history. They need no ARIA tab roles, since they aren't panels on one page.

Say which one is current
: `aria-current="page"` tells screen readers which tab is open. The pill shows it to everyone else.

Name the group
: Give the `<nav>` an `aria-label`, like “Job”, so it isn't confused with the main navigation.

## Rules

Views of one thing
: Every tab shows the same job, customer or list from a different side. Different things belong in the navigation.

Short nouns
: One or two words per tab, in sentence case. No icons, no verbs.

Two to six tabs
: One tab is a heading. More than six and people stop reading them, so split the page.

Under the page header
: Tabs sit straight under the [page header](/components/page-header/) and change everything below them.
