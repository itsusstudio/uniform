---
layout: page
title: Page header
summary: "The title and main actions of an app page."
section: Page frame
permalink: /components/page-header/
---

The page header opens every app page with its title and main actions.

## Example

<div class="example-frame flex flex-col gap-12">
<header class="u-page-header">
<a href="#example" aria-label="Back to Jobs">Jobs</a>
<hgroup>
<h1>Ana Reyes, ring resize</h1>
<p>Job <span class="u-data">#1042</span>, due <span>Nov 14</span></p>
</hgroup>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Text Ana</button>
<button type="button" class="u-btn u-btn-primary">Mark ready</button>
</div>
</header>
<header class="u-page-header">
<hgroup>
<h1>Jobs</h1>
<p><span class="u-data">38</span> open, <span class="u-data">6</span> due this week</p>
</hgroup>
<div class="u-actions">
<a href="#example" class="u-btn u-btn-primary"><%= render "icon", name: "plus", small: true %>New job</a>
</div>
</header>
</div>

## On a phone

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="frame frame-phone frame-pad">
<header class="u-page-header">
<a href="#on-a-phone" aria-label="Back to Jobs">Jobs</a>
<hgroup>
<h1>Ana Reyes, ring resize</h1>
<p>Job <span class="u-data">#1042</span>, due <span>Nov 14</span></p>
</hgroup>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Text Ana</button>
<button type="button" class="u-btn u-btn-primary">Mark ready</button>
</div>
</header>
</div>
</div>

On a phone the back link stays above the title, and the actions wrap under it
on the left. When the only action is one button with an icon, like New job, the
button shrinks to its icon and stays beside the title. Its text stays for screen
readers.

## Sticky

Add `u-page-header-sticky` to keep the header in view while a long page
scrolls, so its title and actions stay in reach. From tablet width up it sticks
to the top of the window on the page colour, and a hairline appears under it
once it's stuck. On a phone it scrolls away, because the app's top bar already
sticks there.

## Code

```html
<header class="u-page-header">
  <a href="/jobs" aria-label="Back to Jobs">Jobs</a>
  <hgroup>
    <h1>Ana Reyes, ring resize</h1>
    <p>Job <span class="u-data">#1042</span>, due <span>Nov 14</span></p>
  </hgroup>
  <div class="u-actions">
    <button type="button" class="u-btn u-btn-outline">Text Ana</button>
    <button type="button" class="u-btn u-btn-primary">Mark ready</button>
  </div>
</header>
```

```erb
<header class="u-page-header">
  <%%= link_to t(".jobs"), jobs_path, aria: { label: t(".back_to_jobs") } %>
  <hgroup>
    <h1><%%= t(".title", customer: job.customer.name, work: job.work) %></h1>
    <p><%%= t(".subtitle_html", number: tag.span("##{job.number}", class: "u-data"), due: tag.span(l(job.due_on, format: :short), class: "u-data")) %></p>
  </hgroup>
  <div class="u-actions">
    <%%= link_to t(".text_customer", name: job.customer.first_name), new_job_message_path(job), class: "u-btn u-btn-outline" %>
    <%%= button_to t(".mark_ready"), job_ready_path(job), class: "u-btn u-btn-primary" %>
  </div>
</header>
```

Put the title and its optional line in an [`<hgroup>`](/components/heading-group/),
and the buttons in [`u-actions`](/components/actions/). The back link is an `<a>`
first in the header, named for the page it goes to, with an `aria-label` like
"Back to Jobs" so screen readers say where it leads. Its arrow is drawn for you. Put the header first in the page's column, with any
[page tabs](/components/page-tabs/) straight under it.

## Parts

<%= render "classes", classes_page: "/components/page-header/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<header class="u-page-header">
<hgroup>
<h1>Jobs</h1>
</hgroup>
<div class="u-actions">
<button type="button" class="u-btn u-btn-ghost">Export</button>
<button type="button" class="u-btn u-btn-outline">Print tickets</button>
<button type="button" class="u-btn u-btn-outline">Import</button>
<button type="button" class="u-btn u-btn-primary">New job</button>
<button type="button" class="u-btn u-btn-primary">New quote</button>
</div>
</header>
</div>
<figcaption class="example-caption example-caption-dont"><span>Every action on the page piled into the header, with two primaries fighting for attention.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<header class="u-page-header">
<hgroup>
<h1>Jobs</h1>
</hgroup>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Print tickets</button>
<button type="button" class="u-btn u-btn-primary">New job</button>
</div>
</header>
</div>
<figcaption class="example-caption example-caption-do"><span>One primary for the thing people come here to do, and one or two others at most. The rest go in a menu or near what they act on.</span></figcaption>
</figure>
</div>

## Accessibility

One h1
: The title is the page's only `<h1>` and matches the page's `<title>`, so screen readers say where you've landed.

Back is a link
: The back link is a real `<a>` to the page above, labelled "Back to" the page's name. It works when someone opens the page fresh from a text message.

Actions in reading order
: Put the actions after the title in the markup, so keyboard users reach the title first.

## Rules

Name what's on the page
: Use “Jobs”, or the customer and the job. Never “Dashboard” or “Details”.

One primary action
: At most one primary button, last on the right.

Right-aligned actions only in the header
: Elsewhere, actions sit next to what they act on. The one exception is card actions, at the bottom right of their card.

Delete sits with what it deletes
: Delete a record from its page header, or a part of it from the card it acts on. Never gather delete buttons in a separate danger zone.
