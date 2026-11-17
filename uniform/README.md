# Uniform

The it's us studio design system as plain CSS, plus one small JavaScript module for the few components that need behaviour. No build step, no framework, no dependencies.

## Install

```ruby
gem "studio-uniform", github: "itsusstudio/uniform", branch: "main", glob: "uniform/*.gemspec"
```

The engine adds `assets/` to the asset paths, so Propshaft serves every file under `uniform/`. In the layout, set the audience and link the stylesheets:

```erb
<html data-u-audience="business">
  <head>
    <%= uniform_stylesheet_tags "data-turbo-track": "reload" %>
```

`business` is for desktop-first tools people use at work, `consumer` for mobile-first products people use on their phones. There is no default. `uniform_stylesheet_tags` links each file in the order `assets/uniform/manifest.json` lists, so the browser fetches them all at once.

Pin the script in `config/importmap.rb` and import it once from the application entry point:

```ruby
pin "uniform", to: "uniform/uniform.js"
```

The gem also ships the words its components use, as `uniform.*` keys in `config/locales/` for English, French, Dutch and Spanish. Rails loads them with the engine, so `t("uniform.close")` works straight away, and an app's own locale file can override any key.

Outside Rails, link `assets/uniform/uniform.css` and load `assets/uniform/uniform.js` as a module.

Everything works without the script. Each component starts as plain markup that does its job on its own, and the script only adds to it.

Your own styles always win. Uniform sits in cascade layers (`uniform.tokens`, `uniform.base`, `uniform.layout`, `uniform.components`, `uniform.utilities`), and any CSS you write outside those layers, or in a layer declared after them, takes priority.

## What's inside

| File | Contains |
| --- | --- |
| `uniform.css` | Entry file. Declares the layer order and imports the rest. |
| `fonts.css` | The `@font-face` rules for the files in `fonts/`. Swap it to load fonts another way |
| `tokens.css` | Every `--u-*` variable, light and dark |
| `base.css` | Page defaults, wrapped in `:where()` so they're easy to override |
| `layout.css` | `u-stack`, `u-row`, `u-grid`, `u-sidebar-layout`, `u-container` |
| `components/` | One file per component, all classes prefixed `u-`. The larger ones: `app-shell.css` (the app frame and sidebar), `auth-shell.css` (the sign-in and sign-up frame), `site-header.css` (a marketing site's top row), `data-grid.css` and `chart.css` |
| `uniform.js` | Custom elements that add behaviour to markup that already works (see below) |
| `utilities.css` | Type intent classes (`u-text-*`, `u-wordmark`), backgrounds (`u-bg-*`), `u-gap-*` |
| `fonts/` | Inter, Apfel Grotezk, IBM Plex Mono, Instrument Serif and Bricolage Grotesque |
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
| `<u-input-password>` | a password `u-input` and its show button | The show password button |
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
<body class="u-bg-paper">
```

Site-only type has its own classes: `u-text-hero`, `u-text-section-title`, `u-text-article-title` and `u-text-lead`. Never use them in an app.

## Screen sizes

Two breakpoints: phones below 640px and wide screens from 1024px. The page margin is 16px on phones, 24px up to 1023px and 48px from 1024px. The grid gutter is 16px on phones and 24px above. On phones every `u-span-*` child goes full width, and `u-sidebar-layout` stacks below 1024px.

## Fonts

Inter, Apfel Grotezk and IBM Plex Mono ship in `fonts/` and load from the CSS, all under the SIL Open Font License.

## Rules

Read the full guidelines at the Uniform site before building a screen. In short: use components and layouts for spacing instead of writing your own, use only `--u-*` tokens for colour, type and space, and build patterns from what's here. A pattern that needs new CSS means a component or layout is missing.
