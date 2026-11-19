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

The sidebar sits on ink. Add `u-app-shell-paper` to the shell
to put it on paper instead. Paper is quieter; ink sets the frame apart.

## On a phone

Below 1024px, the nav hides and the shell's `<header>` takes its place, with
the app name and a Menu button. Menu opens the same nav over the page, and
Escape or a tap outside closes it. See the
[dashboard shell](/patterns/dashboard-shell/#on-a-phone) for both states.

## Code

```html
<%= inline_partial("examples/app_shell", id: "app", live: true) %>
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
: A `<button>` with `popovertarget` and `aria-label="Menu"`. It shows only the menu icon, so the label is what screen readers announce. The browser handles focus, Escape and a tap outside.

## Rules

The frame never changes
: The nav, the bar and their order are the same on every page. Only what's inside the `<main>` changes.

Hide the nav, don't shrink it
: On a phone the nav goes behind Menu at full width. Don't squeeze it into a narrow column or swap it for icons.

One nav colour per product
: Choose ink or paper once for the product, and use it on every screen.

Tabs for the main places only
: Three to five tabs, each a place people go every day, named in one word. Everything else stays in Menu, and a screen with one job has no tabs.
