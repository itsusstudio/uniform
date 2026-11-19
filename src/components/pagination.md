---
layout: page
title: Pagination
summary: "Previous and next around the range shown."
section: Components
permalink: /components/pagination/
---

Pagination moves through a long list one page at a time. Use it under any list
too long for one page.

## Example

<div class="flex flex-col gap-4">
<section class="u-card">
<header>
<h3>Picked up</h3>
</header>
<ul class="u-list">
<li><span class="u-data">#1012</span><span>Ana Reyes, ring resize</span><span class="u-meta">Nov 4</span></li>
<li><span class="u-data">#1009</span><span>Omar Haddad, watch battery</span><span class="u-meta">Nov 3</span></li>
<li><span class="u-data">#1007</span><span>June Park, chain repair</span><span class="u-meta">Nov 3</span></li>
</ul>
</section>
<nav class="u-pagination" aria-label="Pages">
<a href="#example" rel="prev" aria-label="Previous page"></a>
<span>26–50 of 112</span>
<a href="#example" rel="next" aria-label="Next page"></a>
</nav>
</div>

## States

<div class="example-frame flex flex-col gap-4">
<nav class="u-pagination" aria-label="First page">
<a aria-disabled="true" aria-label="Previous page"></a>
<span>1–25 of 112</span>
<a href="#states" rel="next" aria-label="Next page"></a>
</nav>
<nav class="u-pagination" aria-label="Last page">
<a href="#states" rel="prev" aria-label="Previous page"></a>
<span>101–112 of 112</span>
<a aria-disabled="true" aria-label="Next page"></a>
</nav>
</div>

On the first page, previous is greyed out, and on the last page, next is. Keep
both buttons in place so neither one moves. Show pagination only when the list
runs past one page.

## Code

```html
<nav class="u-pagination" aria-label="Pages">
  <a href="?page=1" rel="prev" aria-label="Previous page"></a>
  <span>26–50 of 112</span>
  <a href="?page=3" rel="next" aria-label="Next page"></a>
</nav>
```

```erb
<nav class="u-pagination" aria-label="<%%= t(".pages") %>">
  <%%= tag.a href: @pagy.page_url(:previous), rel: "prev", aria: { label: t(".previous_page"), disabled: (true unless @pagy.previous) } %>
  <span><%%= t(".range", from: @pagy.from, to: @pagy.to, total: @pagy.count) %></span>
  <%%= tag.a href: @pagy.page_url(:next), rel: "next", aria: { label: t(".next_page"), disabled: (true unless @pagy.next) } %>
</nav>
```

For a dead end, use an `<a>` with no `href` and add `aria-disabled="true"`, so it
can't be focused or followed. If your pages load with a form, use a `<button>`
with `disabled`.

## Parts

<%= render "classes", classes_page: "/components/pagination/" %>

Previous and next
: The first and last `<a>` in the nav, drawn as round buttons with arrows.

`aria-disabled="true"`
: Greys out the button at a dead end.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<nav class="u-pagination" aria-label="Don’t example">
<a href="#do-and-dont" aria-label="Previous page"></a>
<a class="u-btn u-btn-ghost u-btn-icon u-data" href="#do-and-dont">1</a>
<a class="u-btn u-btn-outline u-btn-icon u-data" href="#do-and-dont">2</a>
<a class="u-btn u-btn-ghost u-btn-icon u-data" href="#do-and-dont">3</a>
<span class="text-muted">…</span>
<a class="u-btn u-btn-ghost u-btn-icon u-data" href="#do-and-dont">5</a>
<a href="#do-and-dont" aria-label="Next page"></a>
</nav>
</div>
<figcaption class="example-caption example-caption-dont"><span>A strip of page numbers. Nobody knows their job is on page 3, and the strip doesn't say how many jobs there are.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<nav class="u-pagination" aria-label="Do example">
<a href="#do-and-dont" aria-label="Previous page"></a>
<span>26–50 of 112</span>
<a href="#do-and-dont" aria-label="Next page"></a>
</nav>
</div>
<figcaption class="example-caption example-caption-do"><span>Previous, next, and the range in plain numbers. Search does the finding.</span></figcaption>
</figure>
</div>

## Accessibility

Name the buttons
: Give the two buttons an `aria-label`, “Previous page” and “Next page”.

Say the range
: The range is plain text between the buttons, so screen readers read it in order.

Links, not scripts
: Give each page its own URL and a real link, so the back button and bookmarks work.

## Rules

Under the list, at the end
: Pagination sits right under the list, at its right edge, like the actions in a card.

Always show the total
: End the range with the total, so people know how far they have to go.

Long lists need search
: Give a long list a search box first. Pagination is for browsing, not finding.
