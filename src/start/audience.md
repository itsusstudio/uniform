---
layout: page
title: Audience
summary: "The business or consumer setting that sizes text and controls."
section: Start
permalink: /start/audience/
---

The audience is the one setting, business or consumer, that sizes text,
controls and fields for a whole product. Set it once, on the product's `<html>`
element.

```html
<html data-u-audience="business">
```

Business sizes are the default, because Tailwind's theme needs a value for every
token. Set the attribute anyway, so the choice is on purpose: `uniform.js`
reports a missing audience in the console.

## The two audiences

`business`
: Desktop-first tools people use at work, for hours at a desk or counter, like
  Workbench. Text is compact so tables and lists show more at once.

`consumer`
: Mobile-first products people use on their phones, one screen at a time. Text
  and controls are a step larger, and fields hold their label inside the box.

| | Business | Consumer |
|---|---|---|
| Body text | 16px | 16px |
| Small text: labels, buttons, nav, tables | 14px | 16px |
| Captions: hints, table headers, timestamps | 12px | 14px |
| Buttons and controls | 36px | 44px |
| Rows you tap: nav, menus, tabs | 32px | 40px |
| Titles of cards, banners, popovers and empty states | 16px | 20px |
| Text fields | 36px, label above | 64px, label inside, in the middle until filled |
| Fields with no visible label, like search | 36px | 44px |
| Table and data grid rows | 36px | 48px |

Page titles and larger headings, colours, spacing and every component's markup
are the same for both. A screen written for one audience works in the other without
changes.

<%= render "example_heading", heading_text: "Try it", heading_id: "try-it" %>

<%= render "examples/audience_form" %>

```html
<%= raw render("examples/audience_form").strip %>
```

## Rules

<%= render "rules", rules_home: "/start/audience/" %>
