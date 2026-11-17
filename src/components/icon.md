---
layout: page
title: Icon
summary: "An inline Lucide SVG in two sizes."
section: Components
permalink: /components/icon/
---

An icon is an inline Lucide SVG with `u-icon`. When to use one is on [Iconography](/foundations/iconography/).

## Example

<div class="example-frame">
<div class="u-row u-gap-6">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Delete job #1042"><%= render "icon", name: "trash-2", small: false %></button>
<button type="button" class="u-btn u-btn-primary"><%= render "icon", name: "plus", small: false %>New job</button>
<a class="u-text-small" href="#example">Ana Reyes’ status page <%= render "icon", name: "external-link", small: true %></a>
</div>
</div>

## Sizes

<div class="example-frame">
<div class="u-row u-gap-12">
<span class="u-row u-gap-2"><%= render "icon", name: "search", small: false %><span class="u-text-small u-text-muted">20px, <code class="u-text-data">u-icon</code></span></span>
<span class="u-row u-gap-2"><%= render "icon", name: "search", small: true %><span class="u-text-small u-text-muted">16px, <code class="u-text-data">u-icon u-icon-sm</code></span></span>
</div>
</div>

## In a toolbar

<div class="example-frame">
<div class="u-stack u-gap-4">
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline"><%= render "icon", name: "search", small: true %>Search</button>
<button type="button" class="u-btn u-btn-outline"><%= render "icon", name: "filter", small: true %>Filter</button>
<button type="button" class="u-btn u-btn-outline"><%= render "icon", name: "arrow-down-up", small: true %>Sort</button>
<button type="button" class="u-btn u-btn-outline"><%= render "icon", name: "upload", small: true %>Import</button>
</div>
<div class="u-actions u-actions-icons">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Edit job"><%= render "icon", name: "pencil", small: true %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Preview ticket"><%= render "icon", name: "eye", small: true %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Upload photos"><%= render "icon", name: "upload", small: true %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Delete job"><%= render "icon", name: "trash-2", small: true %></button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="More actions"><%= render "icon", name: "ellipsis", small: true %></button>
</div>
</div>
</div>

A word beside an icon says what the button does; an icon on its own needs an
`aria-label` and a job everyone knows, like edit, delete or more.

## Code

```html
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Delete job #1042">
  <svg class="u-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" …>…</svg>
</button>

<a href="/status/1042">Status page
  <svg class="u-icon u-icon-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" …>…</svg>
</a>
```

## Getting an icon

Copy the published file from `lucide-static`, keeping its Lucide name. Never redraw one or write its path data by hand.

```sh
curl -s "https://unpkg.com/lucide-static@latest/icons/<icon-name>.svg"
```

Drop its `class`, `width` and `height`, then add `class="u-icon"`, `aria-hidden="true"` and `focusable="false"`. Components that need an icon, like close buttons and select chevrons, draw their own, so follow their markup as written. An icon Uniform itself needs goes in `uniform/icons/` unchanged.

## Classes

<%= render "classes", classes_page: "/components/icon/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Mark ready"><%= render "icon", name: "ellipsis", small: false %></button>
</div>
<figcaption class="example-caption example-caption-dont"><span>An icon on its own for an action nobody can guess from the symbol.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<button type="button" class="u-btn u-btn-outline">Mark ready</button>
</div>
<figcaption class="example-caption example-caption-do"><span>Say it in a word. Icons stand alone only for close, search, menu and the rest of the set on the Iconography page.</span></figcaption>
</figure>
</div>

## Accessibility

Hidden from screen readers
: Give every icon `aria-hidden="true"` and `focusable="false"`. The word beside it, or the button's `aria-label`, is what screen readers say.

Name the action
: An icon-only button's label says what it does to what, like "Delete job #1042", not what the picture is.

## Rules

Lucide, unedited
: Copy icons as published, without their `width` and `height`, and size them with these classes. `u-icon` sets the line width from `--u-icon-stroke`, so never set one on the SVG.

Same colour as the text
: Keep `stroke="currentColor"`, so the icon takes the colour of the text around it. An icon never has a colour of its own.
