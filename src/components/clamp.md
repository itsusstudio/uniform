---
layout: page
title: Clamp
summary: "Long text cut to a few lines, with Show more."
section: Components
permalink: /components/clamp/
---

A clamp keeps long text, like a note in a timeline, to a few lines so the page stays easy to scan. Show more opens the rest in place.

## Example

<div class="example-frame">
<div class="max-w-form">
<u-clamp>
<div><p>Client asked if we can clean her wedding band too when she comes in. Told her it's complimentary. She also wants the claws checked on the engagement ring, since one caught on a sweater last week. Asked her to bring the box it came in so we can match the polish. She'll be in on Saturday morning, before 11.</p></div>
<button type="button" class="u-link-btn" data-less="Show less" hidden>Show more</button>
</u-clamp>
</div>
</div>

## Code

```html
<u-clamp>
  <div><%%= simple_format(note.content) %></div>
  <button type="button" class="u-link-btn" data-less="<%%= t(".show_less") %>" hidden><%%= t(".show_more") %></button>
</u-clamp>
```

The first child is the text and the button comes after it, `hidden`. `<u-clamp>` shows the button only when the text runs past four lines, and swaps its words with `data-less` when open. Set `--u-clamp-lines` for a different number of lines. Without `uniform.js` the text shows whole.

## Parts

<%= render "classes", classes_page: "/components/clamp/" %>

## Accessibility

The button sets `aria-expanded`, so a screen reader hears whether the text is open. The whole text is always in the page, so a screen reader reads it all either way.
