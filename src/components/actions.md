---
layout: page
title: Actions
summary: "A row of buttons."
section: Layout
permalink: /components/actions/
---

Actions is the row a group of buttons sits in. The buttons sit 8px apart and wrap when they run out of room.

## Example

<div class="example-frame u-stack u-gap-6">
<div class="u-actions">
<button type="button" class="u-btn u-btn-primary">Save job</button>
<button type="button" class="u-btn u-btn-outline">Print ticket</button>
</div>
<div class="u-actions u-gap-1" role="group" aria-label="Job">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Edit job"><%= render "icon", name: "pencil", small: false %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Open the customer page"><%= render "icon", name: "external-link", small: false %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Delete job"><%= render "icon", name: "trash-2", small: false %></button>
</div>
</div>

## Code

```html
<div class="u-actions">
  <button type="submit" class="u-btn u-btn-primary">Save job</button>
  <a class="u-btn u-btn-outline" href="/jobs/1042">Cancel</a>
</div>
```

Start
: Under a form or an empty state, the row lines up at the start. Put the primary button first.

End
: Straight inside a [card](/components/card/), [dialog](/components/dialog/) or [popover](/components/popover/), the row lines up at the end. Put the primary button last, nearest the corner.

Icon buttons
: Add `u-gap-1` for a toolbar of icon buttons, which sit 4px apart. Give it `role="group"` and an `aria-label`.

## Parts

<%= render "classes", classes_page: "/components/actions/" %>

## Rules

Buttons always go in actions
: Put buttons in a `u-actions`, never a `u-row` or a stack. Even a single button goes in one, so it keeps its width instead of stretching across a card.

One primary button
: Each row has at most one primary button. The others are outline or ghost.
