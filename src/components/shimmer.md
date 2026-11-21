---
layout: page
title: Shimmer
summary: "Placeholders shaped like content that is still loading."
section: Components
permalink: /components/shimmer/
---

A shimmer stands in for content that is still loading, in the shape it will
arrive in. Use it for content that loads after the page.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<%= render "examples/shimmer_list" %>
</div>
</div>

Put each `u-shimmer` where a piece of text will go, holding a typical value
like `Nov 14`. The text stays hidden and sets the width. An empty one fills the
line, and `u-avatar u-shimmer` stands in for an avatar.

## Code

```html
<%= inline_partial("examples/shimmer_list") %>
```

Swap the whole container for the real content when it arrives. Charts have
their own loading state, on [Chart](/components/chart/).

## Parts

<%= render "classes", classes_page: "/components/shimmer/" %>

## Accessibility

Say what's loading
: Put `aria-busy="true"` and an `aria-label`, like "Loading open jobs", on the container, so screen readers know what's coming. Put `aria-hidden="true"` on the placeholders, so the stand-in values aren't read out.

Stops for reduced motion
: The light band stops when someone has asked their device for less motion. The grey shapes stay.

## Rules

Shaped like the real thing
: Use the real component and put placeholders where its text goes, so the page doesn't jump when the content arrives.

Progress bar for counted waits
: When you know how much is done, like 9 of 24 texts sent, use [Progress](/components/progress/) instead.
