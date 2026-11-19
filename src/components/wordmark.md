---
layout: page
title: Wordmark
summary: "The product's name, set in type, in place of a logo."
section: Components
permalink: /components/wordmark/
---

A wordmark is the product's name set in type and linked home. Every studio product uses one, in one of two voices.

## Example

<div class="example-frame flex flex-col gap-6">
<div class="flex flex-wrap items-center gap-12">
<a class="u-wordmark u-wordmark-lg u-wordmark-serif" href="#example">Workbench</a>
<a class="u-wordmark u-wordmark-lg u-wordmark-sans" href="#example">workbench</a>
</div>
</div>

## Variants

<div class="example-frame flex flex-col gap-2">
<% ["Workbench", "Belly", "Canvas", "Déjà Yum"].each do |name| -%>
<div class="flex flex-wrap items-center gap-12"><span class="u-wordmark u-wordmark-lg u-wordmark-serif"><%= name %></span><span class="u-wordmark u-wordmark-lg u-wordmark-sans"><%= name %></span><span class="u-wordmark u-wordmark-lg u-wordmark-sans"><%= name.downcase %></span></div>
<% end -%>
</div>

<%= render "classes", classes_page: "/components/wordmark/", classes_variants: true %>

Each product picks one voice and keeps it everywhere. The serif is warm and
hand-finished. The sans is friendly and holds up best at small sizes.

## Sizes

<div class="example-frame flex flex-col gap-4">
<div class="flex flex-wrap items-center gap-12"><span class="u-wordmark u-wordmark-serif">Workbench</span><span class="u-wordmark u-wordmark-sans">workbench</span></div>
<div class="flex flex-wrap items-center gap-12"><span class="u-wordmark u-wordmark-lg u-wordmark-serif">Workbench</span><span class="u-wordmark u-wordmark-lg u-wordmark-sans">workbench</span></div>
</div>

20px in an app's sidebar, phone bar and sign-in screens. `u-wordmark-lg`, 24px, in a
[site header](/components/site-header/). The serif is set a little larger, so
both read at the same weight.

## Monogram

<div class="example-frame flex flex-col gap-4">
<div class="flex flex-wrap items-center gap-4">
<% [["Workbench", "W"], ["Belly", "B"], ["Canvas", "C"], ["Déjà Yum", "D"]].each do |name, letter| -%>
<span class="wordmark-demo-tile u-wordmark-serif" title="<%= name %>"><%= letter %></span>
<% end -%>
<% [["Workbench", "W"], ["Belly", "B"], ["Canvas", "C"], ["Déjà Yum", "D"]].each do |name, letter| -%>
<span class="wordmark-demo-tile u-wordmark-sans" title="<%= name %>"><%= letter.downcase %></span>
<% end -%>
</div>
</div>

When there's no room for the name, like a collapsed
[sidebar](/components/sidebar/), the product shows its monogram: its first
letter, in its own voice, on an ink tile. Set it once with `data-monogram`.
The same tile is the favicon and the app icon.

## Code

```html
<a class="u-wordmark u-wordmark-serif" href="/" data-monogram="W">Workbench</a>
```

```erb
<%%= link_to Rails.configuration.x.app_name, root_path, class: "u-wordmark u-wordmark-serif", data: { monogram: Rails.configuration.x.app_name.first } %>
```

The wordmark shows the name exactly as you write it, so each product chooses
its own casing: “Workbench” or “workbench”. Pick one and use it everywhere the
name appears as a mark.

## Parts

<%= render "classes", classes_page: "/components/wordmark/" %>

## Accessibility

Its own name
: The link's name is the product's name, so “Workbench, link” takes people home.

Text, not an image
: It's live text, so it scales with the reader's settings and never blurs.

## Rules

One voice per product
: A product uses the serif or the sans, never both.

Never an image
: No logo file, symbol or icon stands in for the name. See [No logos](/foundations/typography/#no-logos).

The monogram is the only icon
: One letter, the first of the name, in the product's voice. Never two letters, never redrawn as a symbol.

Colour of the text around it
: The wordmark takes the colour of its header. Never colour it on its own.
