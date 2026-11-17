---
layout: page
title: Data table
summary: "The index page for a list of records."
section: Patterns
permalink: /patterns/data-table/
---

The data table is the index page for a list of records. Use it for any list
people search, filter, sort and page through.

## Example

<div class="frame frame-pad">
<%= render "examples/pattern_data_table_screen", state: :list, prefix: "dt-list", code: false %>
</div>

It reads top to bottom in the order you work: what the page is and the one
thing you add here, then ways to narrow the list, then what you narrowed it to,
then the list, then the way to the next page. Everything renders on the server,
so sorting, searching and filtering work with no JavaScript.

### Sorting

Each sortable column heading is a link to the same page with `?sort=` and
`&dir=` set. The sorted column has `aria-sort="ascending"` or
`aria-sort="descending"` and a caret pointing the way it's sorted, and its
heading turns ink. Clicking it again flips the direction. The other sortable
columns show a muted up-and-down arrow, and columns that can't be sorted, like
Work, show nothing.

They're links, not buttons, because a sort is a different view of the list,
not an action. A link gives every sort its own URL, so you can send it to
someone or bookmark it, the back button undoes it, and it works before any
script loads. Each sort link keeps the current search and filters, and drops
the page number so you start again from the top.

### Filtered

<div class="frame frame-pad">
<%= render "examples/pattern_data_table_screen", state: :filtered, prefix: "dt-filtered", code: false %>
</div>

Search and the filters are one GET form. Enter sends a search, and the filters
sit in the Filter panel with their own Apply. The server marks each match with
`<mark>`, so “ana” shows in yellow in every row it found.

Each filter that's set shows as a [chip](/components/chip/) under the
controls. The x on each chip is a link to the same view without that one filter, and
“Clear all” links to the list with nothing set. Both keep the sort. When the
results fit on one page, pagination is left out and a `u-meta` line under the
table says how many match.

### Rows selected

<div class="frame frame-pad">
<%= render "examples/pattern_data_table_screen", state: :selected, prefix: "dt-selected", code: false %>
</div>

Tick a row and the bulk bar takes the place of the filters, in the same row.
The search and chips stay where they are, so the table doesn't move.

Row selection is optional. Add it when people act on several records at once
often enough to matter, like printing tickets for the morning's drop-offs or
marking a batch ready for pickup. Leave it out when every action is about one
record. The bulk bar counts what's selected, offers two or three actions for
all of them, and has a way to clear the selection. The chips come back
when nothing is ticked.

### No results

<div class="frame frame-pad">
<%= render "examples/pattern_data_table_screen", state: :no_results, prefix: "dt-none", code: false %>
</div>

When nothing matches, the chips still show what was set, and the table gives
way to an empty state that names the search and offers an outline “Clear
filters” button. It never offers to make a new job, because that's not what the
person was trying to do.

### Nothing yet

<div class="frame frame-pad">
<%= render "examples/pattern_data_table_screen", state: :empty, prefix: "dt-empty", code: false %>
</div>

The first time someone opens the page, there's nothing to search, filter or
page through, so all three are left out. The empty state carries “New job”, and
the page header drops its own copy so the page still has one primary button.

### Long lists

<div class="data-table-long">
<%= render "examples/pattern_data_table_long" %>
</div>

When a page shows more rows than fit on a screen, add `u-table-sticky` to the
`u-table` wrapper. The table then scrolls inside its card, up to 80% of
the screen's height, and the heading row stays put so you always know which
column is which. The example above is capped lower so you can try it here.
Leave it off for a page of 25 rows or fewer: a short table doesn't need a
second scroll bar.

### On a phone

<div class="frame frame-pad frame-phone">
<%= render "examples/pattern_data_table_screen", state: :list, prefix: "dt-phone", code: false %>
</div>

On a phone the search field takes the full width, the filters and the button
wrap onto the next lines, and the table scrolls sideways inside its card. The
job number stays in the first column, so you can always tell which row you're
on. Most of the time on a phone you search for one job and tap it, and a table
that scrolls handles that fine. For spreadsheet-style editing, see
[Data grid](/patterns/data-grid/).

## Anatomy

[Page header](/components/page-header/)
: The title and the one primary button, “New job”, at the top right.

[Table controls](/components/table-controls/)
: A `<search class="u-table-controls">`. Its form holds a [text field](/components/text-field/) with the search icon, a [select](/components/select/) for each filter with its label above, and an outline [button](/components/button/) that applies them. Two hidden inputs carry the sort. Under the form, a `<ul>` of [chips](/components/chip/) with remove links and a ghost “Clear all” when filters are set.

Bulk bar
: Optional. A second form inside the controls, right after the filter form, which takes the place of the filters while rows are ticked: an `<output>` for the count, outline buttons for the bulk actions, and a reset button that clears the selection. With it, wrap the bars and the card in [`<u-data-grid>`](/components/data-grid/#selecting-rows).

Table
: A [table](/components/table/) straight inside a [card](/components/card/), in a `u-table`. Each row starts with a [checkbox](/components/checkbox/) and the job number, which links to the job, and a click anywhere on the row opens it. The status is a [badge](/components/badge/), dates use `u-text-data`, amounts use `u-table-num`, and sortable headings use `u-table-sort`. Add `u-table-sticky` to the wrapper for long pages.

Row actions
: A ghost icon button at the end of each row that opens a [menu](/components/menu/).

[Pagination](/components/pagination/)
: Previous, next and the range, under the card. The range is the count. Its links keep the sort and filters. When everything fits on one page, a `u-meta` line like “3 jobs” takes its place.

Empty state
: Takes the table's place when there's nothing to show: “No jobs yet” with “New job”, or no results with “Clear filters”.

## Classes

<%= render "classes", classes_page: "/patterns/data-table/" %>

## Code

The whole page, with nothing filtered or selected:

```html
<%= raw render("examples/pattern_data_table_screen", state: :list, prefix: "", code: true).strip %>
```

With two filters set. The chips appear, and pagination gives way to a count
because the results fit on one page:

```html
<%= raw render("examples/pattern_data_table_screen", state: :filtered, prefix: "", code: true).strip %>
```

With filters set and nothing matching:

```html
<%= raw render("examples/pattern_data_table_screen", state: :no_results, prefix: "", code: true).strip %>
```

The first time, with no jobs at all:

```html
<%= raw render("examples/pattern_data_table_screen", state: :empty, prefix: "", code: true).strip %>
```

A long page, with the heading row that stays put:

```html
<div class="u-table u-table-sticky" tabindex="0" role="region" aria-label="Jobs">
  <table>…</table>
</div>
```

The server reads `q`, `status`, `due`, `sort`, `dir` and `page` from the URL
and builds every link from them: each sort link with the filters, each chip
with everything but its own filter, “Clear all” with only the sort, and
pagination with all of it. The row checkboxes join the bulk form with
`form="jobs-bulk"`, so its submit buttons send the ticked job ids, and
“Clear selection”, a reset button, unticks them. CSS swaps the bars, and
[`<u-data-grid>`](/components/data-grid/) adds select all and the count.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-table" tabindex="0" role="region" aria-label="Jobs">
<table>
<thead><tr><th scope="col">Job</th><th scope="col"><span class="u-visually-hidden">Actions</span></th></tr></thead>
<tbody>
<tr><td><a class="u-text-data" href="#do-and-dont">#1042</a></td><td><div class="u-actions"><button type="button" class="u-btn u-btn-outline">Edit</button><button type="button" class="u-btn u-btn-outline">Text</button><button type="button" class="u-btn u-btn-danger">Delete</button></div></td></tr>
<tr><td><a class="u-text-data" href="#do-and-dont">#1039</a></td><td><div class="u-actions"><button type="button" class="u-btn u-btn-outline">Edit</button><button type="button" class="u-btn u-btn-outline">Text</button><button type="button" class="u-btn u-btn-danger">Delete</button></div></td></tr>
</tbody>
</table>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Every action as a button on every row. The table turns into a wall of buttons, and a red Delete sits one slip away from Edit on each line.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-table" tabindex="0" role="region" aria-label="Jobs">
<table>
<thead><tr><th scope="col">Job</th><th scope="col">Status</th><th scope="col"><span class="u-visually-hidden">Actions</span></th></tr></thead>
<tbody>
<tr><td><a class="u-text-data" href="#do-and-dont">#1042</a></td><td><span class="u-badge u-badge-info">On the bench</span></td><td><button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Actions for job #1042"><%= render "icon", name: "ellipsis", small: false %></button></td></tr>
<tr><td><a class="u-text-data" href="#do-and-dont">#1039</a></td><td><span class="u-badge u-badge-warning">Waiting on parts</span></td><td><button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Actions for job #1039"><%= render "icon", name: "ellipsis", small: false %></button></td></tr>
</tbody>
</table>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>The job number opens the job, and everything else waits in one quiet menu at the end of the row.</span></figcaption>
</figure>
</div>

## Rules

Search first
: The search field leads the filter bar and is the widest thing in it. Most people come to the list looking for one job. Search and every filter keep their label above them.

The view lives in the URL
: Sort, search, filters and page are all in the query string, and every heading, chip and page link carries the rest. A view can be bookmarked, shared and reached with the back button, with no script.

Two empty states, two buttons
: No records yet gets the primary “New job”. No results gets an outline “Clear filters” and names what was searched.

Scroll, don't stack
: On a phone the table scrolls sideways in its card. Keep the job number first so every row stays easy to tell apart.

<script>
document.querySelectorAll(".frame form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
</script>
