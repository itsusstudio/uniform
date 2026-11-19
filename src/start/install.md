---
layout: page
title: Install
summary: "How to add Uniform to a project."
section: Start
permalink: /start/install/
---

Uniform ships as the `studio-uniform` gem: plain CSS, one small script, fonts
and icons, with nothing to build. Rails apps get it through the asset pipeline.

## Add it to your project

Uniform sits in cascade layers, so any CSS you write outside them wins.

<u-toggle-panels data-group="stack">
<fieldset class="u-fieldset" hidden>
<legend class="u-visually-hidden">Set up with</legend>
<div class="u-toggle-group">
<label><input type="radio" name="stack" value="rails" checked> Rails</label>
<label><input type="radio" name="stack" value="bridgetown"> Bridgetown</label>
<label><input type="radio" name="stack" value="html"> HTML</label>
</div>
</fieldset>

<section data-value="rails" markdown="1">
<h3>Rails</h3>

```ruby
# Gemfile
gem "studio-uniform", github: "itsusstudio/uniform", branch: "main", glob: "uniform/*.gemspec"
```

The gem's engine adds its files to the asset paths, so Propshaft serves them
under `uniform/` and fingerprints the fonts and icons.

Link Uniform before your own CSS, and load the script:

```erb
<%%# app/views/layouts/application.html.erb %>
<%%= uniform_stylesheet_tags "data-turbo-track": "reload" %>
<%%= stylesheet_link_tag :app, "data-turbo-track": "reload" %>
```

```ruby
# config/importmap.rb
pin "uniform", to: "uniform/uniform.js"
```

```js
// app/javascript/application.js
import "uniform"
```

</section>

<section data-value="bridgetown" markdown="1">
<h3>Bridgetown</h3>

```sh
# From your Bridgetown site's root folder, with the gem in the Gemfile
cp -r "$(bundle info --path studio-uniform)/assets/uniform" uniform
```

esbuild bundles it with your own CSS and JavaScript and fingerprints the fonts
and icons.

```css
/* frontend/styles/index.css */
@import "../../uniform/uniform.css";
```

```js
// frontend/javascript/index.js
import "../../uniform/uniform.js"
```

The default layout already links both bundles with `asset_path :css` and
`asset_path :js`.

</section>

<section data-value="html" markdown="1">
<h3>HTML</h3>

```sh
# From a checkout of github.com/itsusstudio/uniform
cp -r uniform/assets/uniform <your-project>/public/uniform
```

Keep the files together. The CSS finds `fonts/` and `icons/` by relative paths.

```html
<link rel="stylesheet" href="/uniform/uniform.css">
<script type="module" src="/uniform/uniform.js"></script>
```

</section>

</u-toggle-panels>

## Set the audience

Name who the product is for on its `<html>` element. Uniform has no default,
so text and controls have no size until this is set.

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

`<u-input-password>`
: Around a [password field](/components/input-password/)'s input and show button.

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
component still works: a combobox's field still takes text, a password field
still hides the password, a phone number field still takes the number, a dropzone still takes files, and a chart stays the
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
<summary>In Rails, why a link for each file and not one for uniform.css?</summary>
<p><code>uniform.css</code> is a list of <code>@import</code>s. The browser can't ask for those files until <code>uniform.css</code> has arrived, so styles wait one extra round trip. With a link for each file, the browser sees them all in the HTML and fetches them at once. Linking <code>uniform/uniform</code> on its own still works, just a little slower on first load.</p>
</details>
<details name="install-faq">
<summary>Why a gem and not a folder to copy?</summary>
<p>Every app takes a new Uniform with <code>bundle update studio-uniform</code>, and <code>Gemfile.lock</code> records which one it runs. The gem also carries what a folder can't, like the stylesheet helper, and later the view helpers and translated words.</p>
</details>
</div>
