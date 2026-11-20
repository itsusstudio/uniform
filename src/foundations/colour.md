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

Pages are ink on white or paper, like a printed sheet. Every colour has a
Tailwind class named after its token: `--background-color-surface` is `bg-surface`,
and `--text-color-muted` is `text-muted`. Components carry their own colours,
so you'll mostly reach for a class on a one-off.

<%= render "examples/colour_specs", rows: [
  { token: "--background-color-page", hex: "#ffffff / #191918", sample: :fill, job: "The page behind an app's cards. White in light mode, a step below the cards in dark mode.", never: "cards, menus or dialogs" },
  { token: "--background-color-surface", hex: "#ffffff / #20201f", sample: :fill, job: "White. Every card, table, panel, menu and dialog, on apps and sites alike.", never: "tinted, or a card inside a card" },
  { token: "--background-color-paper", hex: "#f5f4ef / #262625", sample: :fill, job: "Off-white paper. The page behind marketing sites and blogs, set with bg-paper, and behind halftones everywhere." },
  { token: "--text-color-default", hex: "#1a1a18 / #e2e1dd", sample: :fill, job: "Ink. Text, headings, primary buttons and the rule under a table header." },
  { token: "--background-color-ink", hex: "#1a1a18 / #20201f", sample: :fill, job: "A solid ink panel: the app sidebar and the brand half of the sign-in screen. Matches the cards in dark mode." },
  { token: "--background-color-primary", hex: "#1a1a18 / #b8b5ad", sample: :fill, job: "The fill of a primary button. Ink in light mode, a soft warm grey in dark mode so the main action stands out without glare.", never: "panels, cards or anything that isn't the main action" },
] %>

## Greys

Four greys, one job each. They're named by their job, never by how light they
are, so nobody picks one because it looks right.

<%= render "examples/colour_specs", rows: [
  { token: "--border-color-divider", hex: "#ebeae6 / #2a2a28", sample: :line, job: "1px lines between rows or items inside a container.", never: "the outer edge of a container, text or fills" },
  { token: "--border-color-default", hex: "#d4d2cb / #3a3a37", sample: :border, job: "The 1px outer edge of a card, table, panel or screenshot.", never: "row dividers, inputs or text" },
  { token: "--border-color-input", hex: "#8c8981 / #6e6c67", sample: :control, job: "The edge of inputs, selects and checkboxes, disabled controls, and scrollbar thumbs.", never: "text people need to read, or containers" },
  { token: "--text-color-muted", hex: "#6b6964 / #9d9c97", sample: :text, text: "2 hours ago", job: "Labels only: column headers, field hints, meta, captions and placeholders. Anything people read, subtitles and a row's second line included, stays in the default text colour.", never: "headings, primary content, lines or fills" },
] %>

## Signals

Colour is kept for signals, so red, blue, yellow or green always means
something, and people learn what in a day. Four colours, one meaning each. They mark things with a fill, a chip or a small
square. Text on them is set in the colour named beside them.

<%= render "examples/colour_specs", rows: [
  { token: "--color-danger", hex: "#c03a26 / #ef6450", sample: :on, on: "--text-color-on-danger", on_text: "Delete job", job: "Vermilion. Overdue, failed and destructive: fills, borders, squares and error text." },
  { token: "--color-info", hex: "#2f5bd3 / #5b7fe6", sample: :on, on: "--text-color-on-info", on_text: "In progress", job: "Cobalt. In progress and information. Text on it is white in light mode, ink in dark." },
  { token: "--color-warning", hex: "#f3c22c", sample: :on, on: "--text-color-on-warning", on_text: "Waiting", job: "Warm yellow. Waiting and needs attention. Text on it is ink." },
  { token: "--color-success", hex: "#277a4d / #3f9b68", sample: :on, on: "--text-color-on-success", on_text: "Ready", job: "Pine. Done, paid and ready. Text on it is white in light mode, ink in dark. Also the text of a short confirmation like “Uploaded”, where it passes contrast." },
  { token: "--text-color-link", hex: "#2449b0 / #8ab4f8", sample: :text, text: "View all", job: "Links. A darker cobalt so it passes contrast." },
  { token: "--background-color-highlight", hex: "#fbeeb0 / #735a00", sample: :wash, text: "Mia Chen", job: "The yellow wash behind a search match or the row someone just changed.", never: "a status, a selection or decoration" },
] %>

## Text on colour

Text that sits on a signal colour uses the token named after that colour. It
flips on its own in dark mode, where all four become ink.

<%= render "examples/colour_specs", rows: [
  { token: "--text-color-on-danger", hex: "#ffffff / #131311", sample: :text_on, bg: "--color-danger", text: "Delete job", job: "White on vermilion in light mode, near-black in dark: danger buttons, banners and badges." },
  { token: "--text-color-on-info", hex: "#ffffff / #131311", sample: :text_on, bg: "--color-info", text: "In progress", job: "White on cobalt in light mode, ink in dark." },
  { token: "--text-color-on-warning", hex: "#1a1a18 / #131311", sample: :text_on, bg: "--color-warning", text: "Waiting", job: "Ink on warm yellow." },
  { token: "--text-color-on-success", hex: "#ffffff / #131311", sample: :text_on, bg: "--color-success", text: "Ready", job: "White on pine in light mode, ink in dark." },
  { token: "--text-color-on-ink", hex: "#f5f4ef / #e2e1dd", sample: :text_on, bg: "--background-color-ink", text: "Workbench", job: "Paper on the ink panel." },
  { token: "--text-color-muted-on-ink", hex: "#a8a59d / #9d9c97", sample: :text_on, bg: "--background-color-ink", text: "Customers", job: "Secondary text on ink: sidebar links that aren't the current page." },
  { token: "--color-info-on-ink", hex: "#5b7fe6", sample: :text_on, bg: "--background-color-ink", text: "Workbench", job: "Cobalt light enough to read on ink. The app's name at the top of the sidebar." },
  { token: "--border-color-divider-on-ink", hex: "#3a3935", sample: :fill, job: "The pill behind the current sidebar link, and hover, on ink." },
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
  { token: "--u-chart-color-current", hex: "#1a1a18 / #e2e1dd", sample: :fill, job: "Ink. The main series: this month, this week, the bar the figure talks about. Same as --text-color-default." },
  { token: "--u-chart-color-previous", hex: "#949189 / #6f6d67", sample: :fill, job: "Grey for the series you compare against, like last month or past weeks. 3:1 against white and against the dark surface.", never: "text or the main series" },
  { token: "--u-chart-color-fill", hex: "#1a1a18 / #e2e1dd", sample: :fill, job: "The colour of the fade under the main line and sparklines: ink, at --u-chart-opacity-fill (0.14, or 0.12 in dark mode) under the line, down to nothing at the baseline. Same as --u-chart-color-current.", never: "a flat fill, or anywhere outside a chart" },
  { token: "--u-chart-color-grid", hex: "#ebeae6 / #2a2a28", sample: :line, job: "Horizontal gridlines. Same as --border-color-divider." },
  { token: "--u-chart-color-track", hex: "#ebeae6 / #2a2a28", sample: :fill, job: "The empty part of a meter. Same as --border-color-divider." },
] %>
