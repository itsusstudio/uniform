---
layout: page
title: Reference
summary: "Every token, class and custom element Uniform ships."
section: Start
permalink: /start/reference/
---

The reference lists every token, class and custom element Uniform ships, with
icons on [Iconography](/foundations/iconography/) and emails on the [Mailers](/mailers/layout/) pages. Use it to audit a screen or for
the rare custom build.

## Tokens

Every token, with its light value and its dark value where dark mode changes
it. They're Tailwind theme variables read from `uniform/theme.css`, and the
Foundations pages say when to use each one.

<%= render "tokens_reference" %>

## Tailwind theme

Uniform's tokens as Tailwind classes. Reach for a component first, then these,
then any other Tailwind utility. Spacing uses Tailwind's numbers on a 4px unit,
so `gap-6` is 24px, and `dark:` follows the system setting and `data-u-theme`.

<%= render "theme_reference" %>

## Type roles

The type roles are Tailwind utilities, so they take variants like
`md:text-page-title`.

<%= render "utilities_reference" %>

## Classes

Every other class, grouped by kind and by the page that explains it.

<%= render "classes_index" %>

## Custom elements

Each element in `uniform.js` wraps markup that already works. Load the script
and it adds the rest.

<%= render "elements_reference" %>
