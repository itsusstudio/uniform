---
layout: page
title: Progress
summary: "A bar showing how much of a wait is done."
section: Components
permalink: /components/progress/
---

A progress bar shows how far along a wait is, when its length is known. For a wait of unknown length, use [shimmer](/components/shimmer/).

## Example

<div class="example-frame max-w-prose">
<div class="flex flex-col gap-4">
<div class="u-progress">
<p id="progress-demo-label">Sending pickup texts</p>
<progress id="progress-demo-bar" max="24" value="9" aria-labelledby="progress-demo-label">9 of 24</progress>
<p id="progress-demo-text">9 of 24 sent</p>
</div>
<div class="u-actions"><button type="button" class="u-btn u-btn-outline" id="progress-demo-start">Send again</button></div>
</div>
</div>

<script>
document.getElementById("progress-demo-start").addEventListener("click", () => {
  const bar = document.getElementById("progress-demo-bar")
  const text = document.getElementById("progress-demo-text")
  bar.value = 0
  text.textContent = "0 of 24 sent"
  const timer = setInterval(() => {
    bar.value = Math.min(24, bar.value + 3)
    text.textContent = `${bar.value} of 24 sent`
    if (bar.value >= 24) clearInterval(timer)
  }, 250)
})
</script>

## States

<div class="u-grid">
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">Known wait</p>
<div class="example-frame">
<div class="u-progress">
<p id="progress-state-label">Uploading photos for #1042</p>
<progress max="3" value="2" aria-labelledby="progress-state-label">2 of 3</progress>
<p>2 of 3 uploaded</p>
</div>
</div>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">Unknown wait</p>
<%= render "examples/shimmer_list" %>
</div>
</div>

`value` and `max`
: The bar fills to `value` out of `max`. Use real counts, like 2 of 3, not a made-up percentage.

Unknown wait
: Show [shimmer](/components/shimmer/) placeholders instead of a bar.

## Code

```html
<div class="u-progress">
  <p id="send-label">Sending pickup texts</p>
  <progress max="24" value="9" aria-labelledby="send-label">9 of 24</progress>
  <p>9 of 24 sent</p>
</div>

<p class="text-small text-muted" role="status">Loading jobs…</p>
```

The first `<p>` is the label and the last is the count. Both are optional.

## Classes

<%= render "classes", classes_page: "/components/progress/" %>

## Accessibility

Label it
: Name every bar with `aria-labelledby` pointing at the line above it, or with a `<label for>`. Screen readers read the name and how far along it is.

Fallback text
: Put the count inside the element, like `9 of 24`, for browsers that can't draw the bar.

Say it in words
: Show the count as text under the bar too, so nobody has to judge the length of a line.


## Rules

Only for a known wait
: Use a bar when you can count the work, and always set `value`. A bar with no value has nothing to show.

Shimmer for unknown waits
: Show [shimmer](/components/shimmer/) placeholders shaped like the content that will arrive.
