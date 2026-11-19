---
layout: page
title: "Text: Heading group"
summary: "A heading and the one line under it."
section: Components
permalink: /components/heading-group/
---

A heading group is a heading with one line under it. It's the plain `<hgroup>` element, styled with no classes.

## Example

<div class="u-grid">
<div class="@grid:col-span-6">
<section class="u-card">
<div class="u-card-content">
<hgroup>
<h3>Ring resize, size 6 to 7</h3>
<p>Ana Reyes, dropped off Nov 10</p>
</hgroup>
</div>
</section>
</div>
<div class="@grid:col-span-6">
<section class="u-card">
<div class="u-card-content">
<hgroup>
<h3>No open jobs yet</h3>
<p>When you take in a repair, it shows up here.</p>
</hgroup>
<div class="u-actions">
<a class="u-btn u-btn-primary" href="#code"><%= render "icon", name: "plus", small: true %>New job</a>
</div>
</div>
</section>
</div>
</div>

## Code

```html
<hgroup>
  <h3>Ring resize, size 6 to 7</h3>
  <p>Ana Reyes, dropped off Nov 10</p>
</hgroup>
```

Use the heading level the page needs: `<h2>` for a card on a page whose title
is the `<h1>`, `<h3>` inside a section. The level doesn't change the size. To
make the heading larger, add a type class like `text-heading`.

## Parts

<%= render "classes", classes_page: "/components/heading-group/" %>

## Accessibility

One heading
: An `<hgroup>` holds one heading. Screen readers announce the heading at its level and read the line after it as plain text, so the line stays out of the page outline.

## Rules

Never build one by hand
: A heading with a muted line under it is always an `<hgroup>`, never a stack with `text-small` and `text-muted`. Copies built by hand drift in size, colour or gap, and the screens stop matching.

One line under the heading
: Anything longer than a sentence is content. Put it in the card or section below.
