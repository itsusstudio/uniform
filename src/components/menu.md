---
layout: page
title: Menu
summary: "A floating list of less common actions."
section: Components
permalink: /components/menu/
---

A menu holds the less common actions for one thing until someone asks for them. It's the browser's `popover`, so it opens and closes with no script. [`uniform.js`](/start/install/) adds the arrow keys.

## Example

<div class="example-frame flex flex-wrap items-center items-start gap-12">
<div class="menu-demo-anchor">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Actions for job #1042"><%= render "icon", name: "ellipsis", small: false %></button>
<%= render "examples/menu_job", id: nil, popover: false %>
</div>
<div class="flex flex-col gap-4">
<p class="text-small text-muted">Try it:</p>
<div class="u-actions">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" popovertarget="menu-live-icon" aria-label="Actions for job #1042"><%= render "icon", name: "ellipsis", small: false %></button>
<button type="button" class="u-btn u-btn-outline" popovertarget="menu-live-text">Actions <%= render "icon", name: "chevron-down", small: true %></button>
</div>
</div>
</div>

<%= render "examples/menu_job", id: "menu-live-icon", popover: true %>
<%= render "examples/menu_job", id: "menu-live-text", popover: true %>

Put actions in groups with an `<hr>` between them: changes to the job, ways to
reach the customer, then the one that destroys something.

## Danger item

<div class="example-frame">
<div class="u-menu">
<button type="button">Change due date</button>
<hr>
<button type="button" class="u-menu-item-danger">Delete job</button>
</div>
</div>

The words say what happens, in red. When the
action can't be undone, open a [dialog](/components/dialog/) to confirm.

## Code

```html
<button type="button" class="u-btn u-btn-ghost u-btn-icon"
  popovertarget="job-1042-menu" aria-label="Actions for job #1042">…</button>

<div class="u-menu" id="job-1042-menu" popover>
  <a href="/jobs/1042/edit">Edit job</a>
  <a href="/jobs/1042/due_date">Change due date</a>
  <a href="/jobs/1042/ticket.pdf">Print ticket</a>
  <hr>
  <a href="/jobs/1042/texts/new">Text Ana Reyes</a>
  <button type="button">Copy status link</button>
  <hr>
  <form action="/jobs/1042" method="post">
    <input type="hidden" name="_method" value="delete">
    <button type="submit" class="u-menu-item-danger">Delete job</button>
  </form>
</div>
```

```erb
<button type="button" class="u-btn u-btn-ghost u-btn-icon"
  popovertarget="<%%= dom_id(@job, :menu) %>" aria-label="<%%= t(".actions_for", number: @job.number) %>">…</button>

<div class="u-menu" id="<%%= dom_id(@job, :menu) %>" popover>
  <%%= link_to t(".edit"), edit_job_path(@job) %>
  <%%= link_to t(".change_due_date"), edit_job_due_date_path(@job) %>
  <%%= link_to t(".print_ticket"), job_ticket_path(@job, format: :pdf) %>
  <hr>
  <%%= link_to t(".text_customer", name: @job.customer.name), new_job_text_path(@job) %>
  <button type="button"><%%= t(".copy_status_link") %></button>
  <hr>
  <%%= button_to t(".delete"), job_path(@job), method: :delete, class: "u-menu-item-danger" %>
</div>
```

The menu opens below its button and flips up or left when there's no room. In a
browser without CSS anchor positioning, `uniform.js` places it below its button
and keeps it on screen.

## Parts

<%= render "classes", classes_page: "/components/menu/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-menu menu-demo-long">
<button type="button">Edit</button>
<button type="button">Delete</button>
<button type="button">Print</button>
<button type="button">Text</button>
<button type="button">Duplicate</button>
<button type="button">Copy link</button>
<button type="button">Due date</button>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>One long list with no groups, Delete in the middle, and labels so short you can't tell what they act on.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<%= render "examples/menu_job", id: nil, popover: false %>
</div>
<figcaption class="example-caption example-caption-do"><span>Groups of related actions, each label a verb and a thing, and the destructive one last.</span></figcaption>
</figure>
</div>

## Accessibility

Button
: Give the menu's button a visible label or an `aria-label` that names the thing, like "Actions for job #1042". `popovertarget` tells screen readers it opens something and whether it's open.

Arrow keys
: When every item is a button or a link, `uniform.js` makes the menu a `role="menu"` as it opens. Focus goes to the first item, or, when an item has `aria-current`, to the next one in its group, so moving a job to its next status is Enter. The arrow keys move between items and wrap, Home and End jump to the ends, and Tab leaves and closes it. A heading in the menu becomes its name. Without the script the items are ordinary buttons and links, reached with Tab. Never write `role="menu"` in the markup.

Closing
: Escape and clicking outside close the menu, and focus goes back to its button.

Main action on screen
: Anything in a menu is easy to miss. Keep the main action for a page or row on screen as a button.

## Rules

Seven items at most
: Use two or three groups. If you need more, some of it belongs on the page.

Danger goes last
: Put it in its own group at the bottom.

Actions, not choices
: A menu does something. To pick a value, use a select or radio buttons.

Name items like buttons
: A verb and its object, like "Delete job".
