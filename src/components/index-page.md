---
layout: page
title: Index page
summary: "A list page that fills the window, with an optional pane for the selected record."
section: Page frame
permalink: /components/index-page/
---
An index page shows a list of records: a page header, controls, a list or table that grows to fill the window, and pagination. With a pane, picking a record opens it beside the list, so people can update record after record without leaving it.

## Layout

From tablet width (`48rem`) the page fills the window. Only the list's body scrolls, so the header, controls and pagination stay in place. On a phone the page scrolls as usual, because iOS Safari's address bar and tap-to-top depend on it.

```html
<turbo-frame class="u-index" id="jobs">
  <header class="u-page-header">…</header>

  <div class="u-index-split">
    <u-data-grid>
      <search class="u-table-controls">…</search>

      <section class="u-card u-index-grow" aria-label="Jobs">
        <header>…</header>
        <ul class="u-list u-list-divided u-index-scroll">…</ul>
      </section>

      <nav class="u-pagination">…</nav>
    </u-data-grid>

    <turbo-frame class="u-index-pane" id="job_pane">
      <form class="u-card u-index-grow">
        <header>…</header>
        <div class="u-card-content u-index-scroll">…</div>
        <footer class="u-actions">…</footer>
      </form>
    </turbo-frame>

    <a class="u-index-backdrop" href="/jobs" data-u-index-close tabindex="-1" aria-hidden="true"></a>
  </div>
</turbo-frame>
```

Leave out `u-index-split`, the pane and the backdrop for a page with no pane.
With `u-index-split` but no record open, leave the pane out too, and the list
takes the full width.

## The pane

From desktop width (`64rem`) the pane sits beside the list, and slides in when it opens. Moving to another record replaces it in place, without sliding again. Below that it slides in from the right as a sheet over the list, with a dimmed backdrop behind it. As a sheet it behaves like a modal dialog: `uniform.js` gives it `role="dialog"` and `aria-modal`, names it from its first heading, and makes the rest of the page inert. The sheet scrolls on its own, and scrolling over it or the backdrop never moves the page.

Render the pane with the list, in the same response, so it never arrives empty. Mark its close links, and the backdrop, with `data-u-index-close`. In the sheet they slide it out before the link is followed. Give the pane's close link `autofocus`, so focus lands in the pane after the list is replaced. Escape clears it too. People who ask for reduced motion get no slide.

## Parts

<%= render "classes", classes_page: "/components/index-page/" %>

## Rules

Render the pane, don't fetch it
: A pane that loads after the list shows an empty card first. Render it in the same response as the list.

The address is the state
: The selected record, search, filters and page all live in the query string, so back, refresh and sharing a link all keep the view.
