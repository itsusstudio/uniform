---
layout: page
title: Navigation
summary: "The list of places in an app."
section: Page frame
permalink: /components/navigation/
---

Navigation lists the places in an app and marks the one you're on. In an app it sits in a [sidebar](/components/sidebar/).

## Four kinds of entry

Navigation is built from links and groups, with or without icons. Apps use icons
on every top-level entry; docs and other reading sites use none. Never mix the
two in one nav. Space separates groups, so a group only gets a name when it can
fold.

Link with an icon
: `<li><a>` holding a `u-icon u-icon-sm` and a `<span>` label. The top level of an app.

Link without an icon
: `<li><a>` holding its label. The top level of a docs site, and every link inside a group.

Foldable group with an icon
: `<details>` whose `<summary>` holds a `u-icon u-icon-sm` and a `<span>` label. A place in an app with pages under it, like Settings.

Foldable group without an icon
: `<details>` whose `<summary>` holds its label. A section of a docs site.

A group's links hang off a thin guide line and line up with the group's label.
The current page fills its whole row and gets a short bar on the line.

## In an app

<div class="u-grid">
<div class="u-span-6">
<div class="example-frame example-sidebar">
<nav class="u-nav" aria-label="Kensington Jewellery Repair">
<div>
<ul>
<li><a href="#in-an-app"><%= render "icon", name: "house", small: true %><span>Home</span></a></li>
<li><a href="#in-an-app"><%= render "icon", name: "wrench", small: true %><span>Jobs</span></a></li>
<li><a href="#in-an-app"><%= render "icon", name: "users", small: true %><span>Customers</span></a></li>
</ul>
</div>
<details open>
<summary><%= render "icon", name: "settings", small: true %><span>Settings</span></summary>
<ul>
<li><a href="#in-an-app">General</a></li>
<li><a href="#in-an-app" aria-current="page">Notifications</a></li>
<li><a href="#in-an-app">Team</a></li>
</ul>
</details>
<details>
<summary><%= render "icon", name: "chart-column", small: true %><span>Reports</span></summary>
<ul>
<li><a href="#in-an-app">Turnaround</a></li>
<li><a href="#in-an-app">Revenue</a></li>
</ul>
</details>
</nav>
</div>
</div>
<div class="u-span-6 u-stack u-gap-4 u-text-small">
<p>Home, Jobs and Customers are links with icons. Settings and Reports are groups with icons, and the links inside them have none.</p>
<p>Notifications is the current page, so Settings renders <code class="u-text-data">open</code>.</p>
</div>
</div>

```html
<nav class="u-nav" aria-label="Kensington Jewellery Repair">
  <div>
    <ul>
      <li><a href="/"><svg class="u-icon u-icon-sm">…</svg><span>Home</span></a></li>
      <li><a href="/jobs"><svg class="u-icon u-icon-sm">…</svg><span>Jobs</span></a></li>
    </ul>
  </div>
  <details open>
    <summary><svg class="u-icon u-icon-sm">…</svg><span>Settings</span></summary>
    <ul>
      <li><a href="/settings">General</a></li>
      <li><a href="/settings/notifications" aria-current="page">Notifications</a></li>
    </ul>
  </details>
</nav>
```

## On a docs site

<div class="u-grid">
<div class="u-span-6">
<div class="example-frame example-sidebar">
<nav class="u-nav" aria-label="Uniform">
<div>
<ul>
<li><a href="#on-a-docs-site">Introduction</a></li>
<li><a href="#on-a-docs-site">Rules</a></li>
</ul>
</div>
<details open>
<summary>Foundations</summary>
<ul>
<li><a href="#on-a-docs-site">Typography</a></li>
<li><a href="#on-a-docs-site" aria-current="page">Shape and depth</a></li>
<li><a href="#on-a-docs-site">Iconography</a></li>
</ul>
</details>
<details>
<summary>Components</summary>
<ul>
<li><a href="#on-a-docs-site">Button</a></li>
<li><a href="#on-a-docs-site">Card</a></li>
</ul>
</details>
</nav>
</div>
</div>
</div>

```html
<nav class="u-nav" aria-label="Uniform">
  <div>
    <ul>
      <li><a href="/">Introduction</a></li>
    </ul>
  </div>
  <details open>
    <summary>Foundations</summary>
    <ul>
      <li><a href="/foundations/shape-and-depth/" aria-current="page">Shape and depth</a></li>
    </ul>
  </details>
</nav>
```

A group folds with the same plus and minus as the [accordion](/components/accordion/).
Render the group holding the current page with `open`, so its link is never
hidden.

## A highlighted link

Add `u-nav-link-highlight` to one link that should stand out for a while, like a setup guide a new account hasn't finished. It sits on ink at the top of the nav, with a `u-meta` count at the end. Remove it once the task is done; only one link in a nav is ever highlighted.

```html
<li><a class="u-nav-link-highlight" href="/get-started"><svg class="u-icon u-icon-sm">…</svg><span>Get started</span><span class="u-meta">2/5</span></a></li>
```

## Parts

<%= render "classes", classes_page: "/components/navigation/" %>

`aria-current="page"`
: Put it on the link for the page you're on to give it a soft grey background and medium weight.

## Do and don't

<%= render "examples/nav_proximity" %>

## Accessibility

Landmark
: Use a `<nav>` element with an `aria-label` like "Shop", so screen reader users can jump to it and tell it apart from other navigation.

Current page
: Screen readers say "current page" for the link with `aria-current="page"`.

Real links
: Make every item an `<a href>`, so it works with the keyboard, opens in a new tab and shows its address on hover.

Groups
: A `<details>` group is announced as expandable, with its `<summary>` as the name. Screen readers say whether it's open.

## Rules

One current page
: Mark exactly one link, the page on screen, never a parent and a child at once.

Groups need two or more
: Make a single link a section link with `u-nav-link-section`.

Short, plain names
: Name each place in a word or two, the same as the page's title.
