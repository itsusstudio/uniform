---
layout: page
title: Install
summary: "How to add Uniform to a project."
section: Start
permalink: /start/install/
---

Uniform ships as the `studio-uniform` gem: the studio's tuned Tailwind CSS,
plus one small script, fonts and icons. Apps build it with Tailwind, so every
Tailwind utility works next to Uniform's components.

## Add it to your project

Uniform is a Tailwind layer. Its tokens become Tailwind theme values, so
`bg-surface`, `text-muted` and `p-4` sit on Uniform's colours and 4px scale.
Its components sit in Tailwind's `components` layer, so any utility can
override them.

<u-toggle-panels data-group="stack">
<fieldset class="u-fieldset" hidden>
<legend class="sr-only">Set up with</legend>
<div class="u-toggle-group">
<label><input type="radio" name="stack" value="rails" checked> Rails</label>
<label><input type="radio" name="stack" value="bridgetown"> Bridgetown</label>
</div>
</fieldset>

<section data-value="rails" markdown="1">
<h3>Rails</h3>

```ruby
# Gemfile
gem "studio-uniform", github: "itsusstudio/uniform", branch: "main", glob: "uniform/*.gemspec"
gem "tailwindcss-rails"
```

Copy Uniform's Tailwind source into the app, then import Tailwind and Uniform:

```sh
bin/rails uniform:install
```

```css
/* app/assets/tailwind/application.css */
@import "tailwindcss";
@import "./uniform/tailwind.css";
```

The copy lives in `app/assets/tailwind/uniform/` and is committed with the app,
the same way `tailwindcss-rails` apps keep a downloaded daisyUI file. Run
`bin/rails uniform:install` again after each Uniform update, and add
`bin/rails uniform:verify` to CI so a stale copy fails the build.

Link every stylesheet, rebuild while you work, and load the script:

```erb
<%%# app/views/layouts/application.html.erb %>
<%%= stylesheet_link_tag :app, "data-turbo-track": "reload" %>
```

```text
# Procfile.dev
css: bin/rails tailwindcss:watch
```

```ruby
# config/importmap.rb
pin "uniform", to: "uniform/uniform.js"
```

```js
// app/javascript/application.js
import "uniform"
```

The engine also adds the gem's `assets/` to the asset paths, so Propshaft
serves the fonts and icons Uniform's CSS points at, under `/uniform/`.

</section>

<section data-value="bridgetown" markdown="1">
<h3>Bridgetown</h3>

```sh
# From your Bridgetown site's root folder, with the gem in the Gemfile
cp -r "$(bundle info --path studio-uniform)/assets/uniform" uniform
ln -s ../uniform src/uniform
npm install --save-dev --save-exact @tailwindcss/postcss tailwindcss
```

The link serves Uniform's fonts and icons under `/uniform/`, where its CSS
expects them. Add Tailwind to PostCSS, then import Tailwind and Uniform:

```js
// postcss.config.js
export default { plugins: { "@tailwindcss/postcss": {} } }
```

```css
/* frontend/styles/index.css */
@import "tailwindcss";
@import "../../uniform/tailwind.css";
```

```js
// frontend/javascript/index.js
import "../../uniform/uniform.js"
```

The default layout already links both bundles with `asset_path :css` and
`asset_path :js`.

</section>

</u-toggle-panels>

## Set the audience

Name who the product is for on its `<html>` element. Business sizes are the
default, and `uniform.js` reports a missing audience in the console.

```html
<html data-u-audience="business">
```

Use `business` for desktop-first tools people use at work, and `consumer` for
mobile-first products people use on their phones. See [Audience](/start/audience/).

## Fill the screen

Add `viewport-fit=cover` to the viewport tag, so the page reaches behind a
phone's notch and home bar. [App shell](/components/app-shell/) keeps its bar,
nav and content clear of them.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## Custom elements

The script defines a custom element for each component that needs behaviour.
Wrap the component's markup in it:

`<u-combobox>`
: Around a [combobox](/components/combobox/)'s input and list, inside its `u-field`.

`<u-input-colour>`
: Around a [colour input](/components/input-colour/) and its `<datalist>` of presets.

`<u-character-count>`
: Around a [text field](/components/text-field/#text-area) with `maxlength`. Its last `<small>` holds the count.

`<u-input-phone>`
: Around the `u-field` that holds a [phone number field](/components/input-phone/).

`<u-toggle>`
: Around one [toggle](/components/toggle/) button.

`<u-dropzone>`
: Around the `u-field` that holds a [dropzone](/components/dropzone/).

`<u-sidebar>`
: The [app shell](/components/app-shell/)'s sidebar column itself.

`<u-chart>`
: Around a JSON script of rows. Draws it as a chart.

`<u-data-grid>`
: Around a [data grid](/components/data-grid/)'s table and its bars. Adds selecting rows, editing in place and columns.

Each element sets itself up when it lands on the page, so markup added later,
by Turbo or your own code, works with no extra step. Without the script every
component still works: a combobox's field still takes text, a phone number field still takes the number, a dropzone still takes files, and a chart stays the
server's SVG.

The script also sets up a few things once for the whole page: arrow keys in
[menus](/components/menu/), Escape for [tooltips](/components/tooltip/),
`command` and `commandfor` buttons in browsers that
don't have them yet, and placing menus, popovers and combobox lists under their
button in browsers without CSS anchor positioning.

## Content Security Policy

With Trusted Types on, allow the policy the script creates, named `uniform`:

```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types uniform
```

The policy passes HTML through as it comes. It takes only HTML from your own
server: a [chart](/components/chart/)'s `src` page and a
[data grid](/components/data-grid/) cell's saved value. Those endpoints must
return HTML your app wrote and escaped, never text a user typed.

## Words

The gem ships the words its components use, in English, French, Dutch and
Spanish: close, dismiss, menu, page and copy labels, and the messages for
phone, colour and chart errors. Rails loads them with the gem, so
`t("uniform.close")` works in every app. Add a key with the same name to the
app's own locale file to change the wording.

```erb
<%%= tag.button type: "button", class: "u-btn-close", aria: { label: t("uniform.close") } %>
```

The full list is in `uniform/config/locales/uniform.en.yml`.

## Fonts

Inter, Apfel Grotezk, IBM Plex Mono and Instrument Serif
ship in the gem and load from the CSS. There are no font links to add.

## Point an agent at it

Agents start from [llms.txt](/llms.txt), which routes them to the right pages
for each task. Add this line to the `CLAUDE.md` or `AGENTS.md` of an app that
uses Uniform, with the host where these docs are served:

```text
Before building UI, read https://uniform.example.com/llms.txt and follow it.
```

## FAQ

<div class="u-accordion">
<details name="install-faq">
<summary>Why a gem and not a folder to copy?</summary>
<p>Every app takes a new Uniform with <code>bundle update studio-uniform</code>, and <code>Gemfile.lock</code> records which one it runs. The gem also carries what a folder can't, like the form builder, the view helpers and the translated words.</p>
</details>
</div>
