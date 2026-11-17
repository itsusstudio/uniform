---
layout: page
title: App shell
summary: "The frame around every app page, with its sidebar."
section: Page frame
permalink: /components/app-shell/
---

The app shell holds the sidebar and the page beside it. Use it once, around every page of an app.

## Example

<div class="frame frame-desktop" style="height: 480px">
<%= render "screen", title: "App shell on a wide screen", html: render("examples/app_shell", id: "app-shell-demo", live: true) %>
</div>

Try the button beside the app name: it folds the nav down to its icons. So does a click along the column's right edge. On a phone, the nav moves behind a Menu button.

## Sidebar

The column is a [sidebar](/components/sidebar/): the app name, the places and
the account. It folds to an icon rail on wide screens.

## Ink or paper

The sidebar and the tab bar sit on ink. Add `u-app-shell-paper` to the shell
to put them on paper instead. Paper is quieter; ink sets the frame apart.

## On a phone

Below 1024px, the nav hides and the shell's `<header>` takes its place, with
the app name and a Menu button. Menu opens the same nav over the page, and
Escape or a tap outside closes it. See the
[dashboard shell](/patterns/dashboard-shell/#on-a-phone) for both states.

## Tab bar

<div class="u-row u-row-top u-gap-6 frame-phones">
<div class="frame frame-phone" style="height: 560px">
<%= render "screen", title: "App shell with a tab bar on a phone", html: render("examples/app_shell", id: "app-shell-tabs", live: true, tabs: true) %>
</div>
</div>

A product people use on their phones can put its main places in a tab bar
along the bottom, where a thumb reaches them. Add a `<nav>` after the `<main>`,
with each link an icon above a one-word name. It shows only on phones.
Everything else stays in Menu.

```html
<nav aria-label="Workbench">
  <a href="/">…<span>Home</span></a>
  <a href="/jobs" aria-current="page">…<span>Jobs</span></a>
  <a href="/customers">…<span>Customers</span></a>
  <a href="/payments">…<span>Payments</span></a>
</nav>
```

## Code

```html
<%= raw render("examples/app_shell", id: "app", live: true).strip %>
```

Give the nav an `id` and the `popover` attribute, and point the Menu button at
it with `popovertarget`. The collapse button needs
[`uniform.js`](/start/install/). Without it, the column stays open or collapsed
as the server rendered it.

## Parts

<%= render "classes", classes_page: "/components/app-shell/" %>

Places
: A [navigation](/components/navigation/) `u-nav` inside the column. Give each link a 16px [icon](/foundations/iconography/) and its name in a `<span>`.

## Do and don't

<%= render "examples/app_shell_do_dont" %>

## Accessibility

Landmarks
: The bar is a `<header>`, the places are a `<nav>` with an `aria-label`, and the page is the one `<main>`.

Menu button
: A `<button>` with `popovertarget`. The browser handles focus, Escape and a tap outside.

## Rules

The frame never changes
: The nav, the bar and their order are the same on every page. Only what's inside the `<main>` changes.

Hide the nav, don't shrink it
: On a phone the nav goes behind Menu at full width. Don't squeeze it into a narrow column or swap it for icons.

One nav colour per product
: Choose ink or paper once for the product, and use it on every screen.

Tabs for the main places only
: Three to five tabs, each a place people go every day, named in one word. Everything else stays in Menu, and a screen with one job has no tabs.
