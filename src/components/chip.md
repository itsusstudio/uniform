---
layout: page
title: Chip
summary: "A pill for an applied filter or a removable tag."
section: Components
permalink: /components/chip/
---

A chip shows a filter or a tag that people press or remove. For a label people only read, use a [badge](/components/badge/).

## Example

<div class="u-row">
<span class="u-text-small"><span class="u-text-data">3</span> of <span class="u-text-data">38</span> jobs</span>
<span class="u-chip">Status: On the bench<a href="#example" aria-label="Remove filter: Status: On the bench"></a></span>
<span class="u-chip">Due this week<a href="#example" aria-label="Remove filter: Due this week"></a></span>
<a class="u-btn u-btn-ghost" href="#example">Clear all</a>
</div>

Filters on the jobs list, above the table. Each × links to the list without that
filter. See it in place on the [Data table](/patterns/data-table/) pattern.

## Kinds

<div class="u-stack u-gap-6">
<div class="u-row">
<span class="u-chip">Rush</span>
<span class="u-chip">Engraving</span>
<span class="u-chip">Customer's own stone</span>
</div>
<div class="u-row">
<span class="u-chip">Rush<button type="button" aria-label="Remove tag: Rush"></button></span>
<span class="u-chip">Engraving<button type="button" aria-label="Remove tag: Engraving"></button></span>
</div>
<div class="u-row">
<a class="u-chip" href="#kinds">Rush</a>
<a class="u-chip" href="#kinds">Engraving</a>
</div>
</div>

Label
: A `<span class="u-chip">`, only beside chips you can press or remove. On its own, use a [badge](/components/badge/).

Removable
: End the chip with an empty `<a>` or `<button>` with an `aria-label`. The × is drawn for you. Use a link when removing loads a new page, like a filter, and a button when it changes a form.

Link
: An `<a class="u-chip">` when the whole chip goes somewhere, like a tag that opens every job with that tag.

## Code

```html
<span class="u-chip">
  Status: On the bench
  <a href="/jobs?due=week" aria-label="Remove filter: Status: On the bench">
    <svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>
  </a>
</span>

<a class="u-chip" href="/jobs?tag=rush">Rush</a>
```

```erb
<%% job_filters.each do |key, value| %>
  <%% filter_label = t(".filters.#{key}", value: t(".values.#{key}.#{value}")) %>
  <span class="u-chip">
    <%%= filter_label %>
    <%%= link_to jobs_path(job_filters.except(key)), aria: { label: t(".remove_filter", filter: filter_label) } do %>
      <svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>
    <%% end %>
  </span>
<%% end %>

<%% job.tags.each do |job_tag| %>
  <%%= link_to job_tag.name, jobs_path(tag: job_tag.slug), class: "u-chip" %>
<%% end %>
```

## Parts

<%= render "classes", classes_page: "/components/chip/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame u-row">
<span class="u-chip">On the bench<a href="#do-and-dont" aria-label="Remove filter: On the bench"></a></span>
<span class="u-chip">This week<a href="#do-and-dont" aria-label="Remove filter: This week"></a></span>
<span class="u-chip">Ana Reyes<a href="#do-and-dont" aria-label="Remove filter: Ana Reyes"></a></span>
</div>
<figcaption class="example-caption example-caption-dont"><span>Values on their own. “This week” could be when the job came in or when it's due, so you have to open the filters to find out.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame u-row">
<span class="u-chip">Status: On the bench<a href="#do-and-dont" aria-label="Remove filter: Status: On the bench"></a></span>
<span class="u-chip">Due: This week<a href="#do-and-dont" aria-label="Remove filter: Due: This week"></a></span>
<span class="u-chip">Customer: Ana Reyes<a href="#do-and-dont" aria-label="Remove filter: Customer: Ana Reyes"></a></span>
</div>
<figcaption class="example-caption example-caption-do"><span>The filter's name, then its value, so each chip reads on its own.</span></figcaption>
</figure>
</div>

## Accessibility

Name the remove
: The `aria-label` on the × says what goes, like “Remove filter: Due this week”.

Target size
: The × looks small but takes clicks across 32px.

Words carry it
: A chip has no colour, so write the filter's name with its value, like “Status: On the bench”.

## Rules

Labels, not actions
: A chip names something that's applied or tagged. Anything that does something is a [button](/components/button/).

One way to clear them all
: When there are two or more removable chips, end the row with a ghost “Clear all” button.

Grey and ink only
: Chips have no colour. For a state, use a [badge](/components/badge/).
