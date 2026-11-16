---
layout: page
title: Colour
summary: "Surfaces, ink, greys and the signal colours."
section: Foundations
permalink: /foundations/colour/
---

Colour covers the surfaces, ink, greys and signals every page uses. Components
carry their own colours, so on a page you rarely set one yourself.

## Surfaces and ink

Pages are ink on white or paper, like a printed sheet. The only colour classes
are `u-bg-surface`, `u-bg-paper` and `u-text-muted`. The other colours are
tokens for people building components, so nobody paints things red by hand.

<%= render "examples/colour_specs", rows: [
  { token: "--u-color-bg-surface", class: "u-bg-surface", hex: "#ffffff / #0f0f0e", sample: :fill, job: "White. App pages, and every card, table, panel, menu and dialog, on apps and sites alike.", never: "tinted, or a card inside a card" },
  { token: "--u-color-bg-paper", class: "u-bg-paper", hex: "#f5f4ef / #161513", sample: :fill, job: "Off-white paper. The page behind marketing sites and blogs, set with u-bg-paper, and behind halftones everywhere." },
  { token: "--u-color-text-default", hex: "#1a1a18 / #ecebe6", sample: :fill, job: "Ink. Text, headings, primary buttons and the rule under a table header." },
  { token: "--u-color-bg-ink", hex: "#1a1a18", sample: :fill, job: "A solid ink panel that stays ink in dark mode. The app sidebar and the brand half of the sign-in screen." },
] %>

## Greys

Four greys, one job each. They're named by their job, never by how light they
are, so nobody picks one because it looks right.

<%= render "examples/colour_specs", rows: [
  { token: "--u-color-divider", hex: "#e7e7e3 / #383733", sample: :line, job: "1px lines between rows or items inside a container.", never: "the outer edge of a container, text or fills" },
  { token: "--u-color-border", hex: "#d3d3ce / #4a4844", sample: :border, job: "The 1px outer edge of a card, table, panel or screenshot.", never: "row dividers, inputs or text" },
  { token: "--u-color-border-input", hex: "#8c8981 / #75726b", sample: :control, job: "The edge of inputs, selects and checkboxes, disabled controls, and scrollbar thumbs.", never: "text people need to read, or containers" },
  { token: "--u-color-text-muted", class: "u-text-muted", hex: "#6b6964 / #9c9890", sample: :text, text: "2 hours ago", job: "Secondary text: captions, meta, table headers, hints and placeholders.", never: "headings, primary content, lines or fills" },
] %>

## Signals

Colour is kept for signals, so red, blue, yellow or green always means
something, and people learn what in a day. Four colours, one meaning each. They mark things with a fill, a chip or a small
square. Text on them is set in the colour named beside them.

<%= render "examples/colour_specs", rows: [
  { token: "--u-color-danger", hex: "#c03a26 / #ef6450", sample: :on, on: "--u-color-text-on-danger", on_text: "Delete job", job: "Vermilion. Overdue, failed and destructive: fills, borders, squares and error text." },
  { token: "--u-color-info", hex: "#2f5bd3 / #5b7fe6", sample: :on, on: "--u-color-text-on-info", on_text: "In progress", job: "Cobalt. In progress and information. Text on it is white in light mode, ink in dark." },
  { token: "--u-color-warning", hex: "#f3c22c", sample: :on, on: "--u-color-text-on-warning", on_text: "Waiting", job: "Warm yellow. Waiting and needs attention. Text on it is ink." },
  { token: "--u-color-success", hex: "#277a4d / #3f9b68", sample: :on, on: "--u-color-text-on-success", on_text: "Ready", job: "Pine. Done, paid and ready. Text on it is white in light mode, ink in dark. Also the text of a short confirmation like “Uploaded”, where it passes contrast." },
  { token: "--u-color-link", hex: "#2449b0 / #8aa5f0", sample: :text, text: "View all", job: "Links. A darker cobalt so it passes contrast." },
  { token: "--u-color-highlight", hex: "#fbeeb0 / #735a00", sample: :wash, text: "Mia Chen", job: "The yellow wash behind a search match or the row someone just changed.", never: "a status, a selection or decoration" },
] %>

## Text on colour

Text that sits on a signal colour uses the token named after that colour. It
flips on its own in dark mode, where all four become ink.

<%= render "examples/colour_specs", rows: [
  { token: "--u-color-text-on-danger", hex: "#ffffff / #131311", sample: :text_on, bg: "--u-color-danger", text: "Delete job", job: "White on vermilion in light mode, near-black in dark: danger buttons, banners and badges." },
  { token: "--u-color-text-on-info", hex: "#ffffff / #131311", sample: :text_on, bg: "--u-color-info", text: "In progress", job: "White on cobalt in light mode, ink in dark." },
  { token: "--u-color-text-on-warning", hex: "#1a1a18 / #131311", sample: :text_on, bg: "--u-color-warning", text: "Waiting", job: "Ink on warm yellow." },
  { token: "--u-color-text-on-success", hex: "#ffffff / #131311", sample: :text_on, bg: "--u-color-success", text: "Ready", job: "White on pine in light mode, ink in dark." },
  { token: "--u-color-text-on-ink", hex: "#f5f4ef", sample: :text_on, bg: "--u-color-bg-ink", text: "Workbench", job: "Paper on the ink panel, the same in both modes." },
  { token: "--u-color-text-muted-on-ink", hex: "#a8a59d", sample: :text_on, bg: "--u-color-bg-ink", text: "Customers", job: "Secondary text on ink: sidebar links that aren't the current page." },
  { token: "--u-color-info-on-ink", hex: "#5b7fe6", sample: :text_on, bg: "--u-color-bg-ink", text: "Workbench", job: "Cobalt light enough to read on ink. The app's name at the top of the sidebar." },
  { token: "--u-color-divider-on-ink", hex: "#3a3935", sample: :fill, job: "The pill behind the current sidebar link, and hover, on ink." },
] %>

## In use

<%= render "examples/colour_in_use" %>

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/colour/" %>

## Charts

Charts use ink and grey, and the signals only for job statuses. These tokens
name the job each colour does in a chart, so canvas scripts can read them. See
[Charts](/foundations/charts/).

<%= render "examples/colour_specs", rows: [
  { token: "--u-color-chart-current", hex: "#1a1a18 / #ecebe6", sample: :fill, job: "Ink. The main series: this month, this week, the bar the figure talks about. Same as --u-color-text-default." },
  { token: "--u-color-chart-previous", hex: "#949189 / #66635d", sample: :fill, job: "Grey for the series you compare against, like last month or past weeks. 3:1 against white and against the dark surface.", never: "text or the main series" },
  { token: "--u-color-chart-fill", hex: "#1a1a18 / #ecebe6", sample: :fill, job: "The colour of the fade under the main line and sparklines: ink, at --u-chart-fill-opacity (0.14, or 0.12 in dark mode) under the line, down to nothing at the baseline. Same as --u-color-chart-current.", never: "a flat fill, or anywhere outside a chart" },
  { token: "--u-color-chart-grid", hex: "#e7e7e3 / #383733", sample: :line, job: "Horizontal gridlines, and the top and bottom edges of an empty chart. Same as --u-color-divider." },
  { token: "--u-color-chart-track", hex: "#e7e7e3 / #383733", sample: :fill, job: "The empty part of a meter. Same as --u-color-divider." },
] %>
