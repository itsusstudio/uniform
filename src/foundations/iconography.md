---
layout: page
title: Iconography
summary: "When to use an icon and how to place one."
section: Foundations
permalink: /foundations/iconography/
---

Icons are [Lucide](https://lucide.dev/icons/){:target="_blank" rel="noopener"} line icons in the colour of the text. Use one
only where a symbol reads faster than a word, like close, search, menu or back.

## Icons that stand alone

These are the only icons that may appear without a word, because almost everyone
reads them the same way. Each one ships in `uniform/icons/`. Any other Lucide
icon may sit beside a word.

<%= render "examples/icon_set" %>

## Using an icon

Paste the SVG inline and add `u-icon`. It takes the colour of the text around it.

```html
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Edit job">
  <svg class="u-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" …>…</svg>
</button>
```

Two sizes
: `u-icon` is 20px, for icons on their own and beside 16px text and up. Add `u-icon-sm` for 16px beside 12 and 14px text. Inside a button with a word, Uniform makes it 16px for you.

Line width
: Every icon's line is `--u-icon-stroke` wide, whatever its size: 1.5px for business and 1.75px for consumer, about as thick as the letters beside it. `u-icon` sets it, so a 16px and a 20px icon match.

Alone, it needs a label
: An icon with no word goes in a `u-btn-icon` button with an `aria-label` naming what it does, like "Delete job #1042", not "Trash".

Beside a word, it's hidden
: When a word sits next to it, the icon gets `aria-hidden="true"` so screen readers don't say it twice.

Getting more icons
: Browse [lucide.dev](https://lucide.dev/icons/){:target="_blank" rel="noopener"} and copy the SVG from `lucide-static`, keeping Lucide's name for the file. Drop the `class`, `width` and `height` and leave the rest as published: `u-icon` sets the size and the line width, and `stroke="currentColor"` takes the colour of the text. No other icon sets and no edits to the drawing.

## In use

<%= render "examples/icon_in_use" %>

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/iconography/" %>
