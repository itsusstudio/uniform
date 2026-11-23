---
layout: page
title: Diff
summary: "Shows what changed between two versions of a text."
section: Components
permalink: /components/diff/
---

A diff shows the words removed from a text and the words added to it, in
place, so the reader sees what changed without comparing two copies.

## Example

<div class="example-frame">
<p class="u-diff">Client picks up <del>Friday</del><ins>Saturday after 2pm</ins>.</p>
</div>

## Code

```html
<p class="u-diff">Client picks up <del>Friday</del><ins>Saturday after 2pm</ins>.</p>
```

## Accessibility

Real elements
: `<del>` and `<ins>` carry their meaning, so the change doesn't depend on colour alone: removed words are also struck through.

## Rules

Words, not letters
: Compare whole words, so a change reads as a phrase someone wrote.
