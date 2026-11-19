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

<div class="example-frame u-stack u-gap-4">
<p class="u-text-small">Press Save job to see the saving state.</p>
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
<div class="u-span-6 u-stack u-gap-2">
<p class="u-text-small u-text-strong">In a button, 16px</p>
<div class="example-frame">
<div class="u-row">
<button type="button" class="u-btn u-btn-outline" disabled>Cancel</button>
<%= raw render("examples/spinner_button").strip %>
</div>
</div>
</div>
<div class="u-span-6 u-stack u-gap-2">
<p class="u-text-small u-text-strong">In a panel, 24px</p>
<%= raw render("examples/spinner_panel").strip %>
</div>
</div>

In a button
: Set `aria-busy="true"` and `disabled` on the button and change its label, like "Saving…". The spinner takes the place of its icon, or sits before the label.

In a panel
: When one part of a page loads after the rest, put a 24px spinner at the top left of that space, with a muted line beside it.

## Spinner, shimmer, progress bar or nothing

Nothing
: A page load, or a form that takes you to a new page. The browser shows its own loading. That's almost every screen.

Spinner
: A button while it saves. Or a camera or video that takes a moment to start, where the frame is already the right size: put a `u-spinner-xl` in the middle of it.

Shimmer
: Content that loads after the page, like a panel or a list. [Shimmer](/components/shimmer/) shows its shape.

Progress bar
: A wait you can count, like 9 of 24 texts sent. Use [Progress](/components/progress/) whenever you know how much is done.

## Code

```html
<%= raw render("examples/spinner_button").strip %>

<div class="u-row" role="status">
  <span class="u-spinner u-spinner-lg" aria-hidden="true"></span>
  <span class="u-text-small u-text-muted">Loading texts…</span>
</div>
```

A button with `aria-busy="true"` draws its own spinner. Anywhere else, use an
empty `<span class="u-spinner">`.

## Parts

<%= render "classes", classes_page: "/components/spinner/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame spinner-demo-page">
<span class="u-spinner u-spinner-lg" aria-hidden="true"></span>
</div>
<figcaption class="example-caption example-caption-dont"><span>A spinner on its own in the middle of the page while the jobs load. Send the page with the jobs already in it.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-row">
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
: Put `role="status"` on the row holding the spinner and its words, so screen readers hear "Loading texts…" without losing their place. With no room for words, put them in a `u-visually-hidden` span in that row.

Busy buttons
: Disabling a button can drop keyboard focus. When the save is done, confirm it with a [toast](/components/toast/) or move focus to what changed.

Less motion
: With reduced motion, the spinner stops with its arc at the top.

## Rules

Always with words
: A spinner never stands alone. "Saving…" in the button, or "Loading texts…" beside it, says what's happening.

Only where you're waiting
: In the button you pressed or the panel that's loading. Never over the whole page.

Count it if you can
: If you know how much is done, use a progress bar instead.
