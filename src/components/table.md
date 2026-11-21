---
layout: page
title: Table
summary: "The browser's table, for comparing many things."
section: Components
permalink: /components/table/
---

A table lists many things of one kind to compare and sort. When people act on each row, use a [list](/components/list/).

<%= render "example_heading" %>

<%= render "examples/table_jobs" %>

The jobs are filtered to this month and sorted by due date. Click anywhere on a
row to open the job. The search, filters and sort links are
[Table: Controls](/components/table-controls/), and the full screen is the
[data table pattern](/patterns/data-table/).

## Selecting rows

<div>
<%= render "examples/data_grid", id: "table-select", selected: ["1039", "1042"] %>
</div>

Tick rows and the bulk bar takes the place of the filters, so the table stays put. Selection, editing in
place and columns are on [Table: Data grid](/components/data-grid/).

<%= render "examples/data_grid_demo_script" %>

## Row shortcuts

A row can have a key that acts on whichever row is under the pointer, like `E`
to edit. Give the link that does it `data-u-hotkey` and `data-u-hotkey-row`, so
the key works only on the hovered or focused row and never on one picked at
random. The link can be visually hidden, since the hint shows the key.

`uniform_row_hint` writes a `<u-row-hint>` that floats just above the pointer
while it's over the row, saying what a click or key does there. Its `first:`
label replaces the `row:` one over the first cell, which opens the row's page,
and turns link blue. Over a cell with its own control, like a status picker,
the hint gets out of the way. It's a closed popover until `uniform.js` opens it,
so a page without the script never shows a key that does nothing, and touch
screens never show it.

In a `u-data-grid`, mark a link `data-u-row-link` to open it, instead of the
row's page, when someone clicks or taps the row. The first cell still opens the
page, and so does a Cmd or Ctrl click.

```erb
<td class="u-table-actions">
  <%%= link_to t(".quick_edit", number: job.number), edit_job_path(job),
        class: "sr-only", data: {turbo_frame: "global_modal", u_hotkey: "e", u_hotkey_row: true, u_row_link: true} %>
  <%%= uniform_row_hint row: {label: t(".quick_edit"), number: "##{job.number}", keys: "e"},
        first: {label: t(".open_job"), number: "##{job.number}", keys: "o"} %>
</td>
```

## Code

```html
<search class="u-table-controls">
  <form action="/jobs" method="get">
    <div class="u-input-prefixed">
      <input class="u-input" type="search" autocorrect="off" autocapitalize="off" spellcheck="false" name="q" aria-label="Search jobs">
    </div>
  </form>
  <ul aria-label="Filters">
    <li class="u-chip">Due this month<a href="/jobs?sort=due&amp;dir=asc" aria-label="Remove filter: Due this month"></a></li>
    <li><a class="u-btn u-btn-ghost" href="/jobs?sort=due&amp;dir=asc">Clear all</a></li>
  </ul>
</search>
<section class="u-card" aria-label="Jobs">
  <div class="u-table" tabindex="0" role="region" aria-label="Jobs">
    <table>
      <thead>
        <tr>
          <th scope="col">Job</th>
          <th scope="col">Status</th>
          <th scope="col" aria-sort="ascending">
            <a class="u-table-sort" href="/jobs?due=month&amp;sort=due&amp;dir=desc">Due</a>
          </th>
          <th scope="col" class="u-table-num">
            <a class="u-table-sort" href="/jobs?due=month&amp;sort=quote&amp;dir=asc">Quote</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a class="u-data" href="/jobs/1042">#1042</a></td>
          <td><span class="u-badge u-badge-info">On the bench</span></td>
          <td>Nov 14</td>
          <td class="u-table-num">$85.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
<nav class="u-pagination" aria-label="Pages">…</nav>
```

```erb
<search class="u-table-controls">
  <%%= form_with url: jobs_path, method: :get do |form| %>
    <div class="u-input-prefixed">
      <%%= form.search_field :q, value: params[:q], class: "u-input", aria: { label: t(".search") } %>
    </div>
  <%% end %>
  <%% if params[:due].present? %>
    <ul aria-label="<%%= t(".filters") %>">
      <li class="u-chip"><%%= t(".due.#{params[:due]}") %><%%= link_to "", request.query_parameters.except("due", "page"), aria: { label: t(".remove_filter", filter: t(".due.#{params[:due]}")) } %></li>
      <li><%%= link_to t(".clear_all"), request.query_parameters.slice("sort", "dir"), class: "u-btn u-btn-ghost" %></li>
    </ul>
  <%% end %>
</search>
<section class="u-card" aria-label="<%%= t(".jobs") %>">
  <div class="u-table" tabindex="0" role="region" aria-label="<%%= t(".jobs") %>">
    <table>
      <thead>
        <tr>
          <th scope="col"><%%= t(".job") %></th>
          <th scope="col"><%%= t(".status") %></th>
          <%%= tag.th scope: "col", aria: { sort: (params[:sort] == "due" ? (params[:dir] == "desc" ? "descending" : "ascending") : nil) } do %>
            <%%= link_to t(".due_column"), request.query_parameters.merge(sort: "due", dir: (params[:sort] == "due" && params[:dir] != "desc" ? "desc" : "asc")).except("page"), class: "u-table-sort" %>
          <%% end %>
          <th scope="col" class="u-table-num">
            <%%= link_to t(".quote"), request.query_parameters.merge(sort: "quote", dir: "asc").except("page"), class: "u-table-sort" %>
          </th>
        </tr>
      </thead>
      <tbody>
        <%% @jobs.each do |job| %>
          <tr>
            <td><%%= link_to "##{job.number}", job, class: "u-data" %></td>
            <td><span class="u-badge u-badge-<%%= job.status_tone %>"><%%= t(".statuses.#{job.status}") %></span></td>
            <td class="u-data"><%%= l(job.due_on, format: :short) %></td>
            <td class="u-table-num"><%%= number_to_currency(job.quote) %></td>
          </tr>
        <%% end %>
      </tbody>
    </table>
  </div>
</section>
<%%= render "shared/pagination", pagy: @pagy %>
```

## Parts

<%= render "classes", classes_page: "/components/table/" %>

Status cells
: Use a [badge](/components/badge/) in a cell, never a coloured cell or row.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-table" tabindex="0" role="region" aria-label="Jobs">
<table class="table-demo-dont">
<thead><tr><th scope="col">Job</th><th scope="col">Quote</th></tr></thead>
<tbody>
<tr class="table-demo-dont-row"><td>#1036 Priya Shah</td><td>$25</td></tr>
<tr><td>#1042 Ana Reyes</td><td>$85.00</td></tr>
<tr class="table-demo-dont-row"><td>#1039 Marcus Lee</td><td>$140.5</td></tr>
</tbody>
</table>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Striped rows and amounts on the left in mixed formats. The stripes add noise, and the dollars don't line up.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-table" tabindex="0" role="region" aria-label="Jobs">
<table>
<thead><tr><th scope="col">Job</th><th scope="col" class="u-table-num">Quote</th></tr></thead>
<tbody>
<tr><td><span class="u-data">#1036</span> Priya Shah</td><td class="u-table-num">$25.00</td></tr>
<tr><td><span class="u-data">#1042</span> Ana Reyes</td><td class="u-table-num">$85.00</td></tr>
<tr><td><span class="u-data">#1039</span> Marcus Lee</td><td class="u-table-num">$140.50</td></tr>
</tbody>
</table>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>Thin dividers, and amounts on the right with two decimals, so you can read them down the column.</span></figcaption>
</figure>
</div>

## Accessibility

Real table
: Use `<table>`, `<thead>`, `<tbody>` and `<th scope="col">`, so screen readers announce the column heading with each cell.

Sorting
: Put `aria-sort="ascending"` or `"descending"` on the sorted header cell. The sort control is a real link or button, so it works with a keyboard.

Open a row with its link
: Put the row's link in its first cell. It stretches over the whole row, so a click anywhere opens it, and it stays a real link for the keyboard, screen readers and opening in a new tab. Other links and buttons in the row keep working.

Scrolling with a keyboard
: The `u-table` wrapper takes `tabindex="0"`, `role="region"` and a name, so a keyboard can reach it and scroll it sideways. Name it with `aria-labelledby` pointing at the caption or card title, or with an `aria-label`.

## Rules

Numbers on the right
: Amounts and counts go in `u-table-num`, with the same number of decimals all the way down.

No fills
: No striped or coloured rows. Dividers and alignment do the grouping, and only a row that opens on click gets a hover tint.

In a card, edge to edge
: Put a table straight inside its card, under the header, with no `u-card-content`. Its lines then run edge to edge.

Short first column
: Keep the first column short, so rows stay easy to tell apart when the table scrolls sideways.
