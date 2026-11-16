---
layout: page
title: Sidebar
summary: "An app's column of places, with its name and account."
section: Page frame
permalink: /components/sidebar/
---

The sidebar is the column down the side of an app: its name at the top, the
places in the middle and the account at the bottom. Use it inside the
[app shell](/components/app-shell/).

## Example

<div class="u-grid">
<div class="u-span-6">
<div class="frame-column">
<%= render "examples/app_shell_nav", id: "sidebar-demo", popover: false %>
</div>
</div>
</div>

Jobs is the current page, so it gets the pill and medium weight. The account at the bottom opens a
menu upward. The button beside the app name folds the column to its icons, and
so does a click anywhere along its right edge, where the cursor turns into an
arrow. Try them.

## Code

```html
<%= raw render("examples/app_shell_nav", id: "nav", popover: false).strip %>
```

A `<u-sidebar>` holds three parts, in order:

Head
: The first `<div>`: the app name in `u-wordmark`, and a collapse `<button>` with `aria-label` and `aria-expanded`. The button draws its own icon.

Places
: A [navigation](/components/navigation/) `u-nav`. Give each link a 16px [icon](/foundations/iconography/) and its name in a `<span>`.

Footer
: The last `<div>`. It stays at the bottom with a line above it while the places scroll. Put the account here, or help, settings and switches. Help is a `<button>` in a list item, with its icon and name like a link, opening a [menu](/components/menu/) of the app's help entries, like Speak with us and What's new. The account is a `<button>` with the initials in one `<span>` and the name in the next, opening a [menu](/components/menu/).

Inside the app shell, give the sidebar an `id` and `popover`, so the Menu button
can open it on a phone.

## Icon rail

<div class="u-row u-row-top u-gap-6">
<div class="frame-column">
<%= render "examples/app_shell_nav", id: "sidebar-rail", popover: false, collapsed: true %>
</div>
</div>

With `aria-expanded="false"` on the collapse button, the column folds to its
icons. Each link shows its name when you point at it or tab to it, and the same
button or the edge opens the column again. The rail shows on screens 1024px and
wider. Narrower, the sidebar slides in from the left behind the app shell's Menu
button, three quarters wide, over a backdrop. Tapping the backdrop, pressing
Escape or the button beside the app name closes it.

## Ink or paper

The sidebar sits on ink. Add `u-app-shell-paper` to the [app shell](/components/app-shell/)
to put it on paper. Use ink for a short list of places and paper for a long one,
like these docs.

## Parts

<%= render "classes", classes_page: "/components/sidebar/" %>

## Do and don't

<%= render "examples/nav_proximity" %>

## Accessibility

Collapse button
: `aria-label="Sidebar"` names it, and `<u-sidebar>` flips its `aria-expanded` when it folds the column.

Edge
: `uniform.js` adds the edge as a `<button>` after the head, with the collapse button's label as its title. It's for the pointer only: it stays out of the tab order and away from screen readers, since the collapse button does the same job.

Names stay in the links
: In the rail, each link's name is still inside it, so screen readers say it.

## Rules

Places in the middle, account at the bottom
: The account, settings and sign out go in the footer, away from the places people use every day.

Every group has a label
: Start each group of places with a short label, Home included. A link floating above the first label throws off the column.

One current page
: Mark exactly one link with `aria-current="page"`.

Every place gets an icon
: In the rail the icon is all that's left, so each link needs one that reads on its own.

Remember the choice on the server
: Save collapsed or open in the person's settings or a cookie, and render the button with that `aria-expanded`. Setting it from JavaScript after the page loads makes the column flash open.
