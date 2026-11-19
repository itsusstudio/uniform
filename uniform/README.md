# Uniform

The it's us studio design system: a tuned layer on Tailwind CSS v4, plus one small JavaScript module for the few components that need behaviour. Uniform sets the tokens and the components, and Tailwind's utilities handle layout and one-offs around them.

## Install

```ruby
gem "studio-uniform", github: "itsusstudio/uniform", branch: "main", glob: "uniform/*.gemspec"
gem "tailwindcss-rails"
```

`tailwindcss-rails` finds the gem's entry at `app/assets/tailwind/studio_uniform_engine/engine.css` and writes an import for it on every build. Import Tailwind, then Uniform, and link the build:

```css
/* app/assets/tailwind/application.css */
@import "tailwindcss";
@import "../builds/tailwind/studio_uniform_engine";
```

```erb
<html data-u-audience="business">
  <head>
    <%= stylesheet_link_tag "tailwind", "data-turbo-track": "reload" %>
```

`business` is for desktop-first tools people use at work, `consumer` for mobile-first products people use on their phones. Business sizes are the default, so set `consumer` when the product needs it. The engine also adds `assets/` to the asset paths, so Propshaft serves the fonts and icons the CSS points at, under `/uniform/`.

Pin the script in `config/importmap.rb` and import it once from the application entry point:

```ruby
pin "uniform", to: "uniform/uniform.js"
```

The gem also ships the words its components use, as `uniform.*` keys in `config/locales/` for English, French, Dutch and Spanish. Rails loads them with the engine, so `t("uniform.close")` works straight away, and an app's own locale file can override any key.

Everything works without the script. Each component starts as plain markup that does its job on its own, and the script only adds to it.

Uniform uses Tailwind's own layers. Tokens are Tailwind theme variables, page defaults sit in `base`, components in `components`, and every Tailwind utility overrides a component. In component CSS, use the theme variables (`var(--text-color-muted)`) and `--spacing(n)` for space.

## What's inside

| File | Contains |
| --- | --- |
| `tailwind.css` | Entry file for Tailwind. Imports the theme, the dark variant and `uniform.css`, and tells Tailwind to scan the gem's script and Ruby |
| `theme.css` | Every token, as Tailwind theme variables: `--background-color-surface`, `--text-color-muted`, `--text-small`, `--spacing`, `--radius-surface` and the rest, light and dark, plus the consumer sizes and the page margin on small screens |
| `variants.css` | The `dark:` variant, following the system setting and `data-u-theme` |
| `uniform.css` | Imports the files below in order |
| `fonts.css` | The `@font-face` rules for the files in `fonts/` |
| `base.css` | Page defaults on top of Tailwind's preflight, wrapped in `:where()` so they're easy to override |
| `layout.css` | `u-container` and `u-grid` |
| `components/` | One file per component, all classes prefixed `u-`. The larger ones: `app-shell.css` (the app frame and sidebar), `auth-shell.css` (the sign-in and sign-up frame), `site-header.css` (a marketing site's top row), `data-grid.css` and `chart.css` |
| `uniform.js` | Custom elements that add behaviour to markup that already works (see below) |
| `fonts/` | Inter, Apfel Grotezk, IBM Plex Mono and Instrument Serif |
| `icons/` | The SVG icons, drawn with `mask` so they take the text colour |

The files above live in `assets/uniform/`.

## Email

Emails can't use the CSS, so the gem builds them in Ruby. A mailer uses the `uniform/mailer` layout and sets `@uniform_mail` (sender, address, preheader, and the terms, unsubscribe or "sent with" links it needs). Its view builds the body from blocks, and the same view makes both the HTML and the plain-text part:

```erb
<% u = uniform_mail -%>
<%= u.heading t(".title") %>
<%= u.paragraph t(".body") %>
<%= u.code @code %>
<%= u.notes t(".ignore") %>
```

The blocks are `heading`, `paragraph`, `rows`, `facts`, `table`, `button`, `code`, `notes` and `fallback`. They live in `lib/studio/uniform/mail.rb`.

## Behaviour

`uniform.js` defines one custom element per behaviour. Wrap the component's markup in it:

| Element | Wraps | Adds |
| --- | --- | --- |
| `<u-combobox>` | the `role="combobox"` `u-input` and its listbox, inside a `u-field` | Filtering, keyboard and the floating list. Fires `combobox:action`. |
| `<u-input-colour>` | the colour input, hex code `u-input`, caret and presets, inside a `u-field` | The hex code field, presets and their keyboard |
| `<u-character-count>` | a `u-field` with `maxlength` | The live “47 of 500” count in its last `<small>` |
| `<u-input-phone>` | the `u-field` holding a `type="tel"` `u-input`, with an optional `u-error` and hidden input | Groups the phone number as you type, like (416) 555-0142, and checks its length on blur and submit. `region` sets the home country (default `CA`). |
| `<u-toggle>` | one `button.u-toggle[aria-pressed]` | Flips `aria-pressed`. Fires `toggle:change`. |
| `<u-dropzone>` | the `u-field` holding a `u-dropzone`, the `u-list` for the files and the row `<template>` | Drag highlight and a row per file. Fires `dropzone:change`. |
| `<u-sidebar>` | is the column itself, inside `u-app-shell` | The collapse button |
| `<u-chart>` | a `<table>` of data, with `type` set to `bar`, `line`, `stacked`, `meter` or `spark` | Draws the chart from the table, with hover, a shimmer while it loads, and the empty state. Without the script, the table shows. |
| `<u-data-grid>` | a `u-table`, its bulk `<form>` with an `<output>`, cells holding a `<template>` form, an empty column `u-menu`, `data-keep-narrow` headers | Select all and the count, editing in place that saves at once with Undo, the column menu, and the kept columns on a narrow screen. Fires `data-grid:select` and `data-grid:change`. |

They live in the light DOM with no shadow DOM, draw only from markup already on the page, and set themselves up whenever they're added to the page, so Turbo pages, frames and streams need nothing extra.

## Sites and apps

Nothing switches on its own. Apps sit on white, which is the default. A site (a marketing page, a blog) puts paper on the page itself:

```html
<body class="bg-paper">
```

Site-only type has its own classes: `text-hero font-headline`, `text-section-title font-headline`, `text-article-title font-headline` and `text-lead`. Never use them in an app.

## Screen sizes

Two breakpoints: phones below 640px and wide screens from 1024px. The page margin is 16px on phones, 24px up to 1023px and 48px from 1024px. The grid gutter is 16px on phones and 24px above. A `u-grid` child takes all twelve columns until it sets `@grid:col-span-*`, which applies once the grid itself is 640px wide.

## Fonts

Inter, Apfel Grotezk and IBM Plex Mono ship in `fonts/` and load from the CSS, all under the SIL Open Font License.

## Rules

Read the full guidelines at the Uniform site before building a screen. In short: reach for a component first, then a Uniform theme value (`bg-surface`, `text-muted`, `gap-6`), then any Tailwind utility. When the same mix of utilities turns up three times, it belongs in Uniform as a component.
