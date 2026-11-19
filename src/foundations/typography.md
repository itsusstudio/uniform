---
layout: page
title: Typography
summary: "The faces, the type scale and the hierarchy."
section: Foundations
permalink: /foundations/typography/
---

Typography covers the three faces, the eight sizes and how they rank what
matters. Use it to pick a type class when no component sets one.

## Faces

Sites get a display face for their voice, and apps stay in one plain face.

Apfel Grotezk Mittel
: Headlines on marketing sites and blogs, at 32px and larger. Never inside an app.

Inter
: All other text, in apps and on sites. Regular weight for reading, medium for headings and labels, and never bold.

IBM Plex Mono
: Prices, dates, order numbers and codes.

## Hierarchy

Eight sizes, set far apart, so each level is obvious at a glance. Size and
space rank what matters, instead of colour, boxes or bold. [Eight sizes](#eight-sizes) says where each one goes.

<%= render "examples/type_scale" %>

Components name the three sizes they use most by their role:
`--text-body`, `--text-small` and `--text-caption`, each
with a matching line height. Business apps set interface text in one size, 14,
so body and small match and 12 is kept for badges and captions. They match
`text-body`, `text-small` and `text-caption`. Titles of cards, banners,
popovers and [heading groups](/components/heading-group/) use `--text-title`. Other headings use the
sizes directly.

Long reading text inside `u-prose` sits at 16 with a 1.6 line height, so
articles and docs breathe more than app screens. Interface text carries a slight
negative tracking, -0.015em, which Inter needs at 14; mono text keeps its own
spacing.

The product's name, standing alone and linked home, is a
[wordmark](/components/wordmark/), in the studio's serif or sans. See
[No logos](#no-logos).

## Tokens

Every font, size and line height. Component CSS uses these through `var()`,
never a raw number, and stylelint stops one getting in. Each size has a line
height with the same number, so `--text-200` goes with
`--text-200--line-height`.

<%= render "examples/type_tokens" %>

The role tokens follow the [audience](/start/audience/). Consumer products set
small text and captions one step larger, and titles at 20px, so they read at
arm's length on a phone.

## On a site

A marketing page set with Uniform's site sizes: the 96px hero once at the top, a
24px intro line, a 48px button, a 56px section headline, 24px feature headings
and 20px reading text. The bigger reading sizes let a visitor take the page in at
a glance.

<%= render "examples/type_site_page" %>

```html
<%= inline_partial("examples/type_site_page") %>
```

## In use

<%= render "examples/type_in_use" %>

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/typography/" %>

See the [navigation do and don't](/components/sidebar/#do-and-dont)
for the heading rule and the spacing rules together.
