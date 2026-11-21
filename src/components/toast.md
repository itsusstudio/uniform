---
layout: page
title: Toast
summary: "A short message about what just happened."
section: Components
permalink: /components/toast/
---

A toast says what happened after someone acts, whether it worked or failed. It goes away on its own unless it carries a problem.

## Example

<div class="example-frame bg-paper">
<u-toast class="toast-demo-still">
<%= render "examples/toast", message: %(<span class="u-data">#1042</span> marked ready for pickup), action: "Undo", still: true %>
<%= render "examples/toast", message: "Note saved", action: nil, still: true %>
</u-toast>
</div>

<div class="example-frame bg-paper">
<u-toast class="toast-demo-still">
<%= render "examples/toast", message: "Text not sent to Ana Reyes", action: "Retry", tone: "danger", still: true %>
</u-toast>
</div>

<div class="u-actions">
<button type="button" class="u-btn u-btn-outline" data-toast-message="#1042 marked ready for pickup" data-toast-undo>Show toast with Undo</button>
<button type="button" class="u-btn u-btn-outline" data-toast-message="Note saved">Show toast</button>
<button type="button" class="u-btn u-btn-outline" data-toast-message="Text not sent to Ana Reyes" data-toast-tone="danger">Show problem</button>
</div>

<u-toast id="toast-demo-region" role="status" aria-live="polite"></u-toast>

<template id="toast-demo-template"><%= render "examples/toast", message: "", action: "Undo" %></template>

<script>
document.querySelectorAll("[data-toast-message]").forEach((button) => button.addEventListener("click", () => {
  const toast = document.getElementById("toast-demo-template").content.firstElementChild.cloneNode(true)
  toast.querySelector(":scope > p").textContent = button.dataset.toastMessage
  if (!button.hasAttribute("data-toast-undo")) toast.querySelector(":scope > button:not(.u-btn-close)").remove()
  if (button.dataset.toastTone) toast.classList.add(`u-toast-${button.dataset.toastTone}`)
  document.getElementById("toast-demo-region").append(toast)
}))
</script>

Press a button to see the toast at the bottom of the page. A plain toast goes
after 3 seconds, and one with an action, like Undo or a link, after 10. A ring around the close button runs
down until it goes, and stops while you point at it or tab into it. Set
`data-timeout` in milliseconds to change the time. Swipe a toast down to
dismiss it.

Toasts sit at the bottom, centred on the page's content. In an
[app shell](/components/app-shell/) they centre on the main area, beside the
sidebar.

## Problems

Toasts are ink, since nearly all of them confirm something worked. Add
`u-toast-danger` when an action failed, like "Text not sent" with Retry. It
turns red and stays until it's dismissed. A
problem that needs explaining, blocks the page or stays true goes in a
[banner](/components/banner/).

## Code

```html
<u-toast role="status" aria-live="polite">
  <div>
    <p>#1042 marked ready for pickup</p>
    <button type="button">Undo</button>
    <button type="button" class="u-btn-close" aria-label="Dismiss"></button>
  </div>
</u-toast>
```

```erb
<u-toast role="status" aria-live="polite">
  <%% if notice %>
    <div>
      <p><%%= notice %></p>
      <%% if flash[:undoable] %>
        <button type="button"><%%= t(".undo") %></button>
      <%% end %>
      <button type="button" class="u-btn-close" aria-label="<%%= t(".dismiss") %>"></button>
    </div>
  <%% end %>
</u-toast>
```

Put one `<u-toast role="status" aria-live="polite">` from `uniform.js` in the
layout, empty, so screen readers are listening before a toast arrives. Add a
toast inside it from the server, a Turbo Stream or a script.

## Parts

Each `<div>` inside `<u-toast>` is one toast: a `<p>` saying what happened, an
optional action `<button>`, then a `u-btn-close`.

<%= render "classes", classes_page: "/components/toast/" %>

Dismiss
: A `u-btn-close` with `aria-label="Dismiss"`, last in the toast.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame bg-paper">
<u-toast class="toast-demo-still">
<%= render "examples/toast", message: "Couldn’t send the text to Ana Reyes. Her number was rejected by the carrier. Check it and try again.", action: "Edit number", still: true %>
</u-toast>
</div>
<figcaption class="example-caption example-caption-dont"><span>A problem in a toast. It's gone before most people finish reading, and the fix goes with it.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame bg-paper">
<u-toast class="toast-demo-still">
<%= render "examples/toast", message: "Text sent to Ana Reyes", action: nil, still: true %>
</u-toast>
</div>
<figcaption class="example-caption example-caption-do"><span>A few words confirming what just happened. Problems stay on the page until they're fixed.</span></figcaption>
</figure>
</div>

## Accessibility

Live region
: Keep the region in the page from the start, with `role="status"`, so screen readers announce each new toast without moving focus.

Time to read
: The timer stops while the pointer or keyboard focus is on the toast.

Focus on close
: Closing a toast that holds keyboard focus sends focus back to where it was before the toast.

A problem
: Give a toast about a failed action `role="alert"`, so it's read out right away.

Never the only way
: Offer the toast's Undo somewhere else too, like the job's history, so someone who misses it loses nothing.

## Rules

About one action
: A toast follows something someone did: it worked, or it failed and can be retried. Field errors go next to their field, and lasting problems go in a banner.

One at a time
: A new toast replaces the one showing. They never stack.

Never the only place
: A toast that times out repeats what the page already shows, like the job's new status. Anything someone must read or act on stays until they dismiss it.

Same spot, no motion
: Always bottom centre, and it appears and disappears instantly.
