---
layout: page
title: "Table: Controls"
summary: "Search and filters above a table."
section: Components
permalink: /components/table-controls/
---

Table controls sit above a [table](/components/table/) or
[data grid](/components/data-grid/): search, filters and the filters that are
on. They're a plain GET form and links, so the address holds
every choice and nothing needs a script.

<%= render "example_heading" %>

<div class="example-frame">
<%= render "examples/table_controls" %>
</div>

## Parts

The form
: Search first, then the preset menu and a Filter button. The search grows to fill the row. A View button, last, sits at the right end.

The filter panel
: A [popover](/components/popover/) inside the form, opened by Filter. It holds one field per filter, a ghost Clear link and an Apply button, so the fields send with the search.

The chips
: A `<ul>` of [chips](/components/chip/), one per filter that's on, each with a remove link, then a ghost “Clear all”. Leave it out when nothing is filtered.

<%= render "classes", classes_page: "/components/table-controls/" %>

## The address

Every choice lives in the query string, with the same names in every app:

| Parameter | Holds | Example |
|---|---|---|
| `q` | The search | `q=ana` |
| a filter's name | Its value | `status=overdue` |
| `sort` | The column | `sort=due` |
| `dir` | `asc` or `desc` | `dir=asc` |
| `page` | The page number | `page=2` |

Uniform owns the controls and these names. The app reads them and runs the
query. Every link keeps the others: a sort link keeps the search and filters, a
chip drops only its own filter, and “Clear all” keeps the sort. Changing a
search, filter or sort drops `page`, so it starts again at page 1.

## Presets

A preset is a name for an address. The preset button opens a [menu](/components/menu/)
of links, each link's address is the preset's settings, and the current one
has `aria-current="page"` and a check. The button shows the current preset's
name, or “Custom view” when the filters match none. The app decides which
presets exist.

```html
<button type="button" class="u-btn u-btn-outline" popovertarget="jobs-presets">Due this month</button>
<div class="u-menu" id="jobs-presets" popover>
  <a href="/jobs?sort=due&amp;dir=asc">All jobs</a>
  <a href="/jobs?status=overdue&amp;sort=due&amp;dir=asc">Overdue</a>
  <a href="/jobs?due=month&amp;sort=due&amp;dir=asc" aria-current="page">Due this month</a>
  <a href="/jobs?status=ready&amp;sort=due&amp;dir=asc">Ready for pickup</a>
</div>
```

```erb
<%% presets = { all: { sort: "due", dir: "asc" }, overdue: { status: "overdue", sort: "due", dir: "asc" }, due_this_month: { due: "month", sort: "due", dir: "asc" }, ready: { status: "ready", sort: "due", dir: "asc" } } %>
<%% current = presets.key(request.query_parameters.symbolize_keys.except(:q, :page)) %>
<button type="button" class="u-btn u-btn-outline" popovertarget="jobs-presets"><%%= t(".presets.#{current || :custom}") %></button>
<div class="u-menu" id="jobs-presets" popover>
  <%% presets.each do |name, query| %>
    <%%= link_to t(".presets.#{name}"), jobs_path(query), aria: { current: ("page" if name == current) } %>
  <%% end %>
</div>
```

## Search matches

The server wraps each match in `<mark>`, like Rails' `highlight(name, params[:q])`.
The yellow wash only ever marks a search match or a change you just made.

## Sorting

<div class="example-frame">
<div class="u-table" tabindex="0" role="region" aria-label="Jobs">
<table>
<thead>
<tr>
<th scope="col">Job</th>
<th scope="col" aria-sort="ascending"><a class="u-table-sort" href="?sort=due&amp;dir=desc#sorting">Due</a></th>
<th scope="col" class="u-table-num"><a class="u-table-sort" href="?sort=quote&amp;dir=asc#sorting">Quote</a></th>
</tr>
</thead>
<tbody>
<tr><td><span class="u-text-data">#1036</span> Priya Shah</td><td class="u-text-data">Nov 11</td><td class="u-table-num">$25.00</td></tr>
<tr><td><span class="u-text-data">#1042</span> Ana Reyes</td><td class="u-text-data">Nov 14</td><td class="u-table-num">$85.00</td></tr>
</tbody>
</table>
</div>
</div>

A sortable heading holds a `u-table-sort` link to the same page with `sort` and
`dir` set. The sorted column gets `aria-sort="ascending"` or `"descending"`,
which draws its arrow, and its link flips the direction.

## Under the table

Put [pagination](/components/pagination/) under the table. Its range, like
“1–25 of 38”, is the count, so there's none above the table. Its links keep
`q`, the filters, `sort` and `dir`, and change only `page`.

When everything fits on one page, leave pagination out and say the count in a
`<p class="u-meta">`, like “12 jobs”.

## In a data grid

In a [data grid](/components/data-grid/#selecting-rows), put the bulk form right
after the filter form. While rows are ticked, it takes the place of the filters
in the same row. The search and chips stay put, so the table doesn't move.

## On a phone

<div class="u-row u-row-top u-gap-6 frame-phones">
<div class="frame frame-phone frame-pad">
<%= render "examples/table_controls", presets_id: "controls-presets-phone", filter_id: "controls-filter-phone" %>
</div>
</div>

On a phone the search takes the full width, and the preset, Filter and View
wrap under it.

## Code

```html
<search class="u-table-controls">
  <form action="/jobs" method="get">
    <div class="u-input-prefixed">
      <input class="u-input" type="search" autocorrect="off" autocapitalize="off" spellcheck="false" name="q" aria-label="Search jobs">
    </div>
    <button type="button" class="u-btn u-btn-outline" popovertarget="jobs-filter"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>Filter</button>
    <dialog class="u-popover" id="jobs-filter" popover aria-labelledby="jobs-filter-title">
      <header>
        <h2 id="jobs-filter-title">Filter</h2>
        <button type="button" class="u-btn-close" popovertarget="jobs-filter" popovertargetaction="hide" aria-label="Close"></button>
      </header>
      <div class="u-field">
        <label for="jobs-filter-status">Status</label>
        <select class="u-input" id="jobs-filter-status" name="status">
          <option value="">Any status</option>
          <option value="on_bench" selected>On the bench</option>
        </select>
      </div>
      <div class="u-actions">
        <a class="u-btn u-btn-ghost" href="/jobs?sort=due&amp;dir=asc">Clear</a>
        <button type="submit" class="u-btn u-btn-primary">Apply</button>
      </div>
    </dialog>
    <input type="hidden" name="sort" value="due">
    <input type="hidden" name="dir" value="asc">
  </form>
  <ul aria-label="Filters">
    <li class="u-chip">Status: On the bench<a href="/jobs?sort=due&amp;dir=asc" aria-label="Remove filter: Status: On the bench"></a></li>
    <li><a class="u-btn u-btn-ghost" href="/jobs?sort=due&amp;dir=asc">Clear all</a></li>
  </ul>
</search>
```

```erb
<search class="u-table-controls">
  <%%= form_with url: jobs_path, method: :get do |form| %>
    <div class="u-input-prefixed">
      <%%= form.search_field :q, value: params[:q], class: "u-input", aria: { label: t(".search") } %>
    </div>
    <button type="button" class="u-btn u-btn-outline" popovertarget="jobs-filter"><svg class="u-icon u-icon-sm" aria-hidden="true">…</svg><%%= t(".filter") %></button>
    <dialog class="u-popover" id="jobs-filter" popover aria-labelledby="jobs-filter-title">
      <header>
        <h2 id="jobs-filter-title"><%%= t(".filter") %></h2>
        <button type="button" class="u-btn-close" popovertarget="jobs-filter" popovertargetaction="hide" aria-label="<%%= t("uniform.close") %>"></button>
      </header>
      <div class="u-field">
        <%%= form.label :status, t(".status") %>
        <%%= form.select :status, Job.statuses.keys.map { |status| [t("jobs.statuses.#{status}"), status] }, { include_blank: t(".any_status"), selected: params[:status] }, class: "u-input" %>
      </div>
      <div class="u-actions">
        <%%= link_to t(".clear"), jobs_path(request.query_parameters.slice("q", "sort", "dir")), class: "u-btn u-btn-ghost" %>
        <%%= form.button t(".apply"), class: "u-btn u-btn-primary", name: nil %>
      </div>
    </dialog>
    <%%= form.hidden_field :sort, value: params[:sort] %>
    <%%= form.hidden_field :dir, value: params[:dir] %>
  <%% end %>
  <%% if params[:status].present? %>
    <ul aria-label="<%%= t(".filters") %>">
      <li class="u-chip">
        <%%= t(".status_chip", status: t("jobs.statuses.#{params[:status]}")) %>
        <%%= link_to "", request.query_parameters.except("status", "page"), aria: { label: t(".remove_filter", filter: t("jobs.statuses.#{params[:status]}")) } %>
      </li>
      <li><%%= link_to t(".clear_all"), request.query_parameters.slice("sort", "dir"), class: "u-btn u-btn-ghost" %></li>
    </ul>
  <%% end %>
</search>
```

A sortable heading in Rails:

```erb
<%%= tag.th scope: "col", aria: { sort: (params[:sort] == "due" ? (params[:dir] == "desc" ? "descending" : "ascending") : nil) } do %>
  <%%= link_to t(".due"), request.query_parameters.merge(sort: "due", dir: (params[:sort] == "due" && params[:dir] != "desc" ? "desc" : "asc")).except("page"), class: "u-table-sort" %>
<%% end %>
```

## Accessibility

A search landmark
: `<search>` tells screen readers where the controls are, so people can jump straight to them.

Name every control
: The search and each filter need a label, visible or as `aria-label`.

Name the remove links
: Each chip's remove link says what it removes, like “Remove filter: Status: On the bench”.

Say the count
: The count lives under the table, in the pagination range. When results change without a page load, put it in a polite live region.

## Rules

Search comes first
: Most people come looking for one record. The search leads and is the widest control.

Filters live in the panel
: Enter sends a search, so the row has no Apply. Filters go in the Filter panel, with its own Apply, so the row stays the same at any number of filters.

Everything in the address
: A filtered, sorted view can be bookmarked, shared and opened again from history.

Show what's on
: Every filter that's on shows as a chip, so nobody wonders why the list is short.
