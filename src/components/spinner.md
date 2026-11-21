---
layout: page
title: Spinner
summary: "A turning ring for a short wait you can't count."
section: Components
permalink: /components/spinner/
---

A spinner shows that something is happening and will be done in a moment. Use it
in a button while it saves, or in a panel that loads after the page.

## Example

<div class="example-frame flex flex-col gap-4">
<p class="text-small">Press Save job to see the saving state.</p>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Cancel</button>
<button type="button" class="u-btn u-btn-primary" id="spinner-demo-save">Save job</button>
</div>
</div>

<script>
document.getElementById("spinner-demo-save").addEventListener("click", (event) => {
  const button = event.currentTarget
  button.disabled = true
  button.setAttribute("aria-busy", "true")
  button.textContent = "Saving…"
  setTimeout(() => {
    button.disabled = false
    button.removeAttribute("aria-busy")
    button.textContent = "Save job"
  }, 1500)
})
</script>

## States

<div class="u-grid">
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">In a button, 16px</p>
<div class="example-frame">
<div class="flex items-center gap-2">
<button type="button" class="u-btn u-btn-outline" disabled>Cancel</button>
<%= raw render("examples/spinner_button").strip %>
</div>
</div>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">In a panel, 24px</p>
<%= raw render("examples/spinner_panel").strip %>
</div>
</div>

In a button
: The spinner takes the place of the button's icon, or sits before its label. Keep the label, or change it to say what's happening, like "Deleting…", when the wait is long or hard to undo.

In a panel
: When one part of a page loads after the rest, put a 24px spinner at the top left of that space, with a muted line beside it.

## Spinner, shimmer, progress bar or nothing

Nothing
: A page load, or a link to another page. The browser shows its own loading.

Spinner
: A button while it saves. Or a camera or video that takes a moment to start, where the frame is already the right size: put a `u-spinner-xl` in the middle of it.

Shimmer
: Content that loads after the page, like a panel or a list. [Shimmer](/components/shimmer/) shows its shape.

Progress bar
: A wait you can count, like 9 of 24 texts sent. Use [Progress](/components/progress/) whenever you know how much is done.

## Code

```html
<%= raw render("examples/spinner_button").strip %>

<div class="flex items-center gap-2" role="status">
  <span class="u-spinner u-spinner-lg" aria-hidden="true"></span>
  <span class="text-small text-muted">Loading texts…</span>
</div>
```

A button with `aria-busy="true"` draws its own spinner. Anywhere else, use an
empty `<span class="u-spinner">`.

## Forms sent with Turbo

Every submit button gets the spinner for free. While Turbo sends a form, it sets
`aria-busy="true"` on the form and disables the button that was pressed, and
that button shows the spinner until the response arrives. Add
`data-turbo-submits-with` to change its label too.

```erb
<%%= form.button t(".save_job"), class: "u-btn u-btn-primary", data: { turbo_submits_with: t(".saving") } %>
```

Use `form.button`, not `form.submit`. A spinner can't draw inside an `<input>`.

## Parts

<%= render "classes", classes_page: "/components/spinner/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame spinner-demo-page">
<span class="u-spinner u-spinner-lg" aria-hidden="true"></span>
</div>
<figcaption class="example-caption example-caption-dont"><span>A spinner on its own in the middle of the page while the jobs load. Send the page with the jobs already in it.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="flex items-center gap-2">
<%= raw render("examples/spinner_button").strip %>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>A spinner in the button you pressed, with a label that says what it's doing.</span></figcaption>
</figure>
</div>

## Accessibility

Hide the drawing
: Give the spinner `aria-hidden="true"`. People read and hear the words beside it.

Announce a panel
: Put `role="status"` on the row holding the spinner and its words, so screen readers hear "Loading texts…" without losing their place. With no room for words, put them in an `sr-only` span in that row.

Busy buttons
: Disabling a button can drop keyboard focus. When the save is done, confirm it with a [toast](/components/toast/) or move focus to what changed.

Less motion
: With reduced motion, the spinner stops with its arc at the top.

## Rules

Always with words
: A spinner never stands alone. The button's label, or "Loading texts…" beside it, says what's happening.

Only where you're waiting
: In the button you pressed or the panel that's loading. Never over the whole page.

Count it if you can
: If you know how much is done, use a progress bar instead.
