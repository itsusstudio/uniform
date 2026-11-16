---
layout: page
title: Shape and depth
summary: "The corners, lines and shadow components use."
section: Foundations
permalink: /foundations/shape-and-depth/
---

Shape and depth cover the corners, lines and the one shadow, which tell you what
a thing is. Components set them, so read this when you build a new one.

## Corners

Three shapes. Components set them, so you never pick a radius.

<%= render "examples/shape_specs", rows: [
  { name: "Square", detail: "no token, the default", sample: '<span class="shape-box"></span>', job: "Anything that holds content inside a card or on the page: tables, menus, images, screenshots and badges.", never: "rounded corners, even slightly" },
  { copy: "var(--u-radius-default)", detail: "8px", sample: '<span class="shape-box" style="border-radius: var(--u-radius-default)"></span>', job: "Cards and dialogs, the frames that group things, and the fields you type into: text fields, selects, comboboxes, colour fields and dropzones.", never: "tables, menus or images" },
  { copy: "var(--u-radius-pill)", detail: "999px", sample: '<span class="shape-pill"></span>', job: "Anything you press or that labels something: buttons, chips, the current nav item and segmented controls.", never: "cards, inputs or anything that holds content" },
] %>

## Lines

<%= render "examples/shape_specs", rows: [
  { copy: "var(--u-color-divider)", detail: "1px", sample: '<span class="shape-line" style="border-top: 1px solid var(--u-color-divider)"></span>', job: "Between rows or items inside a container." },
  { copy: "var(--u-color-border)", detail: "1px", sample: '<span class="shape-box"></span>', job: "The outer edge of a card, table, menu, dialog or screenshot." },
  { copy: "var(--u-color-border-input)", detail: "1px", sample: '<span class="shape-box" style="border-color: var(--u-color-border-input)"></span>', job: "The edge of inputs, selects and checkboxes." },
  { copy: "var(--u-color-text-default)", detail: "1px", sample: '<span class="shape-line" style="border-top: 1px solid var(--u-color-text-default)"></span>', job: "Under a table header, and above the first row of a list of terms." },
  { name: "Focus ring", detail: "2px, set by Uniform", sample: '<span class="shape-focus"></span>', job: "Around whatever has keyboard focus, 2px out from its edge, in cobalt." },
] %>

## Depth

The page is flat. Only things that float above it for a moment get depth.

<%= render "examples/shape_specs", rows: [
  { name: "Resting", detail: "no shadow", sample: '<span class="shape-box"></span>', job: "Everything on the page: cards, tables, panels and screenshots. A border, no shadow." },
  { copy: "var(--u-shadow-float)", detail: "one soft shadow", sample: '<span class="shape-box shape-float"></span>', job: "Menus, popovers, dialogs and messages. A border plus this shadow.", never: "a card or anything resting on the page" },
  { copy: "var(--u-color-backdrop)", detail: "ink at 28%", sample: '<span class="shape-backdrop-sample"></span>', job: "Behind a dialog, dimming the page so the dialog is the only thing to look at." },
] %>

## In use

<%= render "examples/shape_in_use" %>

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/shape-and-depth/" %>
