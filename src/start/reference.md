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

Every `--u-*` custom property, with its light value and its dark value where
dark mode changes it. They're read from `uniform/tokens.css`, and the
Foundations pages say when to use each one.

<%= render "tokens_reference" %>

## Utilities

Reach for a component first, a layout class second, and a utility only when
neither fits. Type, spacing, background and helper classes work on anything, inside a
component or out.

<%= render "utilities_reference" %>

## Classes

Every other class, grouped by kind and by the page that explains it.

<%= render "classes_index" %>

## Custom elements

Each element in `uniform.js` wraps markup that already works. Load the script
and it adds the rest.

<%= render "elements_reference" %>
