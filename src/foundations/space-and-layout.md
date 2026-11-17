---
layout: page
title: Space and layout
summary: "The spacing scale, the grid and page widths."
section: Foundations
permalink: /foundations/space-and-layout/
---

Space and layout cover the spacing scale, the twelve-column grid and the widths
a page stops at. Use them when you build something no component spaces for you.

## Spacing scale

Space does the grouping that boxes and lines would otherwise do. Every size sits
on a 4px unit, and each step out is at least twice the one inside it, so the eye
sees where a group ends without a border.

Six steps, each for one kind of closeness. Most of the time a block sets the
step for you: a [heading group](/components/heading-group/) or a
[field](/components/text-field/) puts its parts 8px apart, a
[form](/components/form/) puts fields 16px apart, a [card](/components/card/)
pads its content by 24px. Pick a `u-gap` class only for a stack, row or grid
no block covers. The number is how many 4px units it holds, so `u-gap-6` is
6 × 4 = 24px.

<%= render "examples/space_specs", rows: [
  { token: "--u-space-1", px: 4, job: "Inside one element: an icon to its label, the padding of a chip.", uses: ["An icon and its label inside a button", "Icon buttons in `u-actions-icons`", "Padding inside a chip"] },
  { token: "--u-space-2", px: 8, job: "Parts of one item: a label to its input, a title to its meta.", uses: ["A label and its input in `u-field`", "A heading and its line in `<hgroup>`, a figure and its label in `u-stat`", "Buttons side by side in `u-actions`"] },
  { token: "--u-space-4", px: 16, job: "Items in a group or list, and padding inside small components.", uses: ["One field and the next in `u-form`", "Items in a list or menu", "Padding inside a small card or popover"] },
  { token: "--u-space-6", px: 24, job: "Between blocks, card padding and the grid gutter.", uses: ["Padding inside a card or panel", "The heading, fields and buttons of a `u-form`", "The grid gutter, and a site section title to its content"] },
  { token: "--u-space-12", px: 48, job: "Between sections in an app, and from a site intro to its content.", uses: ["A page title and the content below it in an app", "One region of an app page and the next, and stats in `u-stats`", "A site intro and what follows it"] },
  { token: "--u-space-24", px: 96, job: "Between sections on a site. The same on every screen size.", uses: ["One section of a marketing page and the next", "The end of a blog post and the footer", "Nothing in apps"] },
] %>

## Layout

Every page answers two questions the same way: where things start, and where they
stop. Things start on one of twelve column lines. They stop at 1280px for most
pages, 1600px for an app's data pages and 768px for settings, forms and reading
(see [Container](/components/container/)), and at about 65 characters for
running text, so lines never get too long to read.

<%= render "examples/grid_demo" %>

### By screen size

| | Phone | Tablet | Wide |
| --- | --- | --- | --- |
| Screen width | under 640px | 640 to 1023px | 1024px and up |
| Space at the page edge | 16px | 24px | 48px |
| Space between columns | 16px | 24px | 24px |
| `u-span-*` classes | ignored, every child is full width | applied | applied |
| `u-sidebar-layout` | sidebar above the content | sidebar above the content | 264px sidebar beside the content |

The page edge and column spacing follow the screen. Grid, Split, Sidebar layout, App shell, Site header and Description list follow their own width instead, so each one adapts wherever it's placed, like a narrow side panel.

## Tokens

Every space, width and size Uniform uses. Component CSS uses these through
`var()`, never a raw number, and stylelint stops one getting in. The page
margin, gutter and section space shrink on smaller screens by themselves.

<%= render "examples/space_tokens" %>

Sizes follow the [audience](/start/audience/): consumer products are a step
larger, so controls are easier to tap.

## In use

You'll rarely set any of this by hand. Components and layouts carry their spacing
as far as they can, so a card or a form is already spaced right when you put it
on the page. These examples show what they do for you, and what to follow when you
build something new. Every gap is tinted by its step.

<%= render "examples/space_in_use" %>
<%= render "examples/space_in_use_script" %>

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/space-and-layout/" %>
