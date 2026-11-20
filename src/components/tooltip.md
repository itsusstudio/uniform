---
layout: page
title: Tooltip
summary: "A label that names an icon button or cut-off text."
section: Components
permalink: /components/tooltip/
---

A tooltip shows a short name on hover or focus. Use it for icon buttons and truncated text.

## Example

<div class="example-frame tooltip-demo-frame flex flex-col gap-6">
<div class="flex flex-wrap items-center gap-2">
<%= render "examples/tooltip_icon", icon: "pencil", label: "Edit job", open: true %>
<%= render "examples/tooltip_icon", icon: "trash-2", label: "Delete job", open: false %>
<%= render "examples/tooltip_icon", icon: "search", label: "Search jobs", open: false %>
<%= render "examples/tooltip_icon", icon: "ellipsis", label: "More actions", open: false %>
</div>
<div class="tooltip-demo-row">
<span class="u-data">#1042</span>
<span class="u-tooltip tooltip-demo-cell"><a href="#example" class="truncate">Ring resize, size 6 to 7, and re-tip two prongs on the centre stone</a><span aria-hidden="true">Ring resize, size 6 to 7, and re-tip two prongs on the centre stone</span></span>
<span class="u-meta">Nov 14</span>
</div>
</div>

Hover or tab to the buttons and the job description. The first tooltip is shown
open so you can see it without a mouse.

## Code

```html
<span class="u-tooltip">
  <button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Edit job">…</button>
  <span aria-hidden="true">Edit job</span>
</span>
```

Put the wrapper around the control, so a tooltip on truncated text isn't cut off
with it.

Add `data-open` to show a tooltip without a hover, like a "Copied" message that
should stay up for a moment.

## Parts

<%= render "classes", classes_page: "/components/tooltip/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame tooltip-demo-frame">
<span class="u-tooltip" data-open><button type="button" class="u-btn u-btn-outline">Text customer</button><span aria-hidden="true">Sends a pickup text. Each one uses 1 of your 500 texts this month.</span></span>
</div>
<figcaption class="example-caption example-caption-dont"><span>A tooltip on a button that already has a label, hiding the price where people can't count on seeing it.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame tooltip-demo-frame">
<%= render "examples/tooltip_icon", icon: "trash-2", label: "Delete job", open: true %>
</div>
<figcaption class="example-caption example-caption-do"><span>A few words naming an icon button. Anything people need to know goes on the page.</span></figcaption>
</figure>
</div>

## Accessibility

The control has its own name
: An icon button keeps its `aria-label`, and truncated text keeps its full words in the markup. The tooltip repeats them for sighted people, so give it `aria-hidden="true"`.

Keyboard
: The label shows when keyboard focus lands on the control. Put truncated text in something focusable, like a link, so keyboard users can reach it.

Touch
: Phones have no hover, so the words must also be in the markup or on the page.

Hoverable
: The label stays while the pointer moves onto it, and hides when you move away or tab on.

Escape
: Escape hides the label without moving the pointer or focus. It shows again once both have left the control. Inside a dialog, the first Escape hides the label and the next closes the dialog.

## Rules

A short name
: One to four words, the same words as the `aria-label`. No sentences, links or buttons inside.

Only where there's no label
: Icon buttons and text cut short. A button with a word on it needs no tooltip.

Nothing important
: Prices, warnings and instructions go on the page, where everyone sees them.

Never `title`
: Use `u-tooltip`, not the `title` attribute. A tooltip shows at once and on keyboard focus, while `title` waits about a second and never shows on focus.
