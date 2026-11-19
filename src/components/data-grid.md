---
layout: page
title: "Table: Data grid"
summary: "A table for working in: select, edit in place, pick columns."
section: Components
permalink: /components/data-grid/
---

A data grid is a [table](/components/table/) for people who work in it all day. Wrap it in `<u-data-grid>` from [`uniform.js`](/start/install/) to select rows, edit cells and pick columns.

<%= render "example_heading" %>

<div>
<%= render "examples/data_grid", search: "ana" %>
</div>

Click a status or a due date to change it. The controls above it are [Table: Controls](/components/table-controls/), and the full screen is the [data grid pattern](/patterns/data-grid/).

## Selecting rows

Put a checkbox in the first header and each row's first cell, with `form`
pointing at a bulk `<form>` in the controls. The form holds an `<output>` for
the count and a `<button type="reset">` to clear.

## Opening a row

Put the row's link in its first cell, beside the checkbox. A click anywhere
else in the row opens it, and Ctrl or ⌘ opens it in a new tab. Clicks on the
checkbox, an editable cell, a button or another link do their own job.

## Editing in place

Put a `<template>` in a cell holding a `<form>` with one field, like a
[select](/components/select/) or a date input. Click the cell or press Enter to
open it. Enter saves at once, with Undo in a toast, and Escape puts the old
value back.

## Columns

Put an empty [menu](/components/menu/) in the grid and a View button that opens
it. The grid fills it with every column but the first, and remembers the choice
when the grid has an `id`.

## Scrolling

When the columns don't fit, the grid scrolls sideways inside its card and the
first column stays put. It never scrolls up and down on its own: the page does,
so there's only ever one vertical scrollbar. Don't give the grid a height.

## Row actions

End each row with a ghost icon button that opens a [menu](/components/menu/).
Give its heading only an `aria-label`, so it stays out of View.

## On a phone

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="frame frame-phone frame-pad">
<%= render "examples/data_grid", id: "phone-grid" %>
</div>
</div>

Add `data-keep-narrow` to the headers worth seeing on a phone. When the grid is
narrower than 600px, each row becomes one item with those columns, and tapping
it opens the record.

## Code

```html
<u-data-grid id="jobs-grid">
  <div class="flex flex-col gap-4">
    <search class="u-table-controls">
      <form action="/jobs" method="get">
        <div class="u-input-prefixed">
          <input class="u-input" type="search" autocorrect="off" autocapitalize="off" spellcheck="false" name="q" aria-label="Search jobs">
        </div>
        <button type="button" class="u-btn u-btn-outline" popovertarget="jobs-columns"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>View</button>
      </form>
      <form id="jobs-bulk" action="/jobs/bulk" method="post" aria-label="Selected jobs">
        <span><output>0</output> selected</span>
        <button type="submit" class="u-btn u-btn-primary" name="bulk_action" value="ready">Mark ready</button>
        <button type="reset" class="u-btn u-btn-ghost">Clear selection</button>
      </form>
    </search>
    <section class="u-card" aria-label="Jobs">
      <div class="u-table" tabindex="0" role="region" aria-label="Jobs">
        <table>
          <thead>
            <tr>
              <th scope="col"><div class="flex flex-wrap items-center gap-4"><label class="u-checkbox"><input type="checkbox"><span class="sr-only">Select all jobs</span></label><span>Job</span></div></th>
              <th scope="col" data-keep-narrow>Customer</th>
              <th scope="col" data-keep-narrow>Status</th>
              <th scope="col" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><div class="flex flex-wrap items-center gap-4"><label class="u-checkbox"><input type="checkbox" name="job_ids[]" value="1042" form="jobs-bulk"><span class="sr-only">Select job #1042</span></label><a class="u-data" href="/jobs/1042">#1042</a></div></th>
              <td><mark>Ana</mark> Reyes</td>
              <td>
                <span class="u-badge u-badge-info">On the bench</span>
                <template>
                  <form action="/jobs/1042" method="post">
                    <input type="hidden" name="_method" value="patch">
                    <select class="u-input" name="job[status]">
                      <option>On the bench</option>
                      <option>Ready for pickup</option>
                    </select>
                  </form>
                </template>
              </td>
              <td>
                <button type="button" class="u-btn u-btn-ghost u-btn-icon" popovertarget="job-1042-menu" aria-label="Actions for job #1042"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg></button>
                <div class="u-menu" id="job-1042-menu" popover>
                  <hgroup><h2>Job #1042</h2></hgroup>
                  <a href="/jobs/1042/edit">Edit job</a>
                  <a href="/jobs/1042/ticket.pdf">Print ticket</a>
                  <hr>
                  <a href="/jobs/1042/texts/new">Text Ana Reyes</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="u-menu" id="jobs-columns" popover>
        <hgroup><h2>Columns</h2></hgroup>
      </div>
    </section>
  </div>
</u-data-grid>
```

```erb
<u-data-grid id="jobs-grid" data-saved="<%%= t(".saved") %>" data-undo="<%%= t(".undo") %>" data-failed="<%%= t(".failed") %>" data-edit-hint="<%%= t(".edit_hint") %>">
  <div class="flex flex-col gap-4">
    <search class="u-table-controls">
      <%%= form_with url: jobs_path, method: :get do |form| %>
        <div class="u-input-prefixed">
          <%%= form.search_field :q, value: params[:q], class: "u-input", aria: { label: t(".search") } %>
        </div>
        <button type="button" class="u-btn u-btn-outline" popovertarget="jobs-columns"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg><%%= t(".view") %></button>
      <%% end %>
      <%%= form_with url: bulk_jobs_path, id: "jobs-bulk", aria: { label: t(".selected_jobs") } do |form| %>
        <span><%%= t(".selected_html", count: tag.output(0)) %></span>
        <%%= form.button t(".mark_ready"), class: "u-btn u-btn-primary", name: "bulk_action", value: "ready" %>
        <button type="reset" class="u-btn u-btn-ghost"><%%= t(".clear_selection") %></button>
      <%% end %>
    </search>
    <section class="u-card" aria-label="<%%= t(".jobs") %>">
      <div class="u-table" tabindex="0" role="region" aria-label="<%%= t(".jobs") %>">
        <table>
          <thead>
            <tr>
              <th scope="col"><label class="u-checkbox"><input type="checkbox"><span class="sr-only"><%%= t(".select_all") %></span></label> <%%= t(".columns.job") %></th>
              <th scope="col" data-keep-narrow><%%= t(".columns.customer") %></th>
              <th scope="col" data-keep-narrow><%%= t(".columns.status") %></th>
              <th scope="col" aria-label="<%%= t(".columns.actions") %>"></th>
            </tr>
          </thead>
          <tbody>
            <%% jobs.each do |job| %>
              <tr>
                <th scope="row"><label class="u-checkbox"><%%= check_box_tag "job_ids[]", job.id, false, id: nil, form: "jobs-bulk" %><span class="sr-only"><%%= t(".select_job", number: job.number) %></span></label> <%%= link_to "##{job.number}", job, class: "u-data" %></th>
                <td><%%= highlight(job.customer.name, params[:q]) %></td>
                <td>
                  <%%= render "jobs/status", job: job %>
                  <template>
                    <%%= form_with model: job do |form| %>
                      <%%= form.select :status, Job.statuses.keys.map { |status| [t("jobs.statuses.#{status}"), status] }, {}, class: "u-input" %>
                    <%% end %>
                  </template>
                </td>
                <td>
                  <button type="button" class="u-btn u-btn-ghost u-btn-icon" popovertarget="<%%= dom_id(job, :menu) %>" aria-label="<%%= t(".actions_for", number: job.number) %>"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg></button>
                  <div class="u-menu" id="<%%= dom_id(job, :menu) %>" popover>
                    <hgroup><h2><%%= t(".job", number: job.number) %></h2></hgroup>
                    <%%= link_to t(".edit"), edit_job_path(job) %>
                    <%%= link_to t(".print_ticket"), job_ticket_path(job, format: :pdf) %>
                    <hr>
                    <%%= link_to t(".text_customer", name: job.customer.name), new_job_text_path(job) %>
                  </div>
                </td>
              </tr>
            <%% end %>
          </tbody>
        </table>
      </div>
      <div class="u-menu" id="jobs-columns" popover>
        <hgroup><h2><%%= t(".columns") %></h2></hgroup>
      </div>
    </section>
  </div>
</u-data-grid>
```

A cell's form is sent with `fetch`, and the controller answers with the cell's
new content, like `render partial: "jobs/status", locals: { job: @job }`.

| On `<u-data-grid>` | Does |
|---|---|
| `data-saved`, `data-undo`, `data-failed`, `data-edit-hint` | The words it shows, English by default |
| `data-grid:select` | Fires with the selected count |
| `data-grid:change` | Fires before each save. `preventDefault()` to save it yourself, and set `event.detail.html` |

## Parts

<%= render "classes", classes_page: "/components/data-grid/" %>

## Do and don't

<%= render "examples/data_grid_do_dont" %>

## Accessibility

First column
: Make each row's first cell a `<th scope="row">`, so screen readers name the row as you move across it.

Editable cells
: The grid puts each cell's value in a button, so Tab reaches it and Enter, Space or F2 opens the field, and adds “Press Enter to change”. Focus goes back to the button after a save. The HTML the server sends back goes inside that button, so it can't hold links or other buttons.

Narrow grid
: The header row is hidden on a phone, so each kept cell starts with its column's name for screen readers, like “Due: Nov 14”.

Field names
: A field with no label takes its column's heading as its name.

## Rules

The first column never moves
: It stays frozen, holding the row's checkbox and link.

Keep a few columns on a phone
: Mark three or four with `data-keep-narrow`, the facts people check on the go.

<%= render "examples/data_grid_demo_script" %>
