---
layout: page
title: Navigation
summary: "The list of places in an app."
section: Page frame
permalink: /components/navigation/
---

Navigation lists the places in an app and marks the one you're on. In an app it sits in a [sidebar](/components/sidebar/).

## Example

<div class="u-grid">
<div class="u-span-6">
<div class="example-frame example-sidebar">
<nav class="u-nav" aria-label="Shop">
<a class="u-nav-link-section" href="#example">Today</a>
<div>
<p>Work</p>
<ul>
<li><a href="#example" aria-current="page">Jobs</a></li>
<li><a href="#example">Quotes</a></li>
<li><a href="#example">Pickups</a></li>
</ul>
</div>
<div>
<p>People</p>
<ul>
<li><a href="#example">Customers</a></li>
<li><a href="#example">Staff</a></li>
</ul>
</div>
<a class="u-nav-link-section" href="#example">Settings</a>
</nav>
</div>
</div>
<div class="u-span-6 u-stack u-gap-4 u-text-small">
<p>Jobs is the current page, so it has <code class="u-text-data">aria-current="page"</code> and a soft grey background.</p>
<p>Today and Settings have nothing under them, so they're section links, not groups of one.</p>
</div>
</div>

## Foldable groups

<div class="u-grid">
<div class="u-span-6">
<div class="example-frame example-sidebar">
<nav class="u-nav" aria-label="Shop with folding groups">
<a class="u-nav-link-section" href="#foldable-groups">Today</a>
<details open>
<summary>Work</summary>
<ul>
<li><a href="#foldable-groups" aria-current="page">Jobs</a></li>
<li><a href="#foldable-groups">Quotes</a></li>
<li><a href="#foldable-groups">Pickups</a></li>
</ul>
</details>
<details>
<summary>People</summary>
<ul>
<li><a href="#foldable-groups">Customers</a></li>
<li><a href="#foldable-groups">Staff</a></li>
</ul>
</details>
</nav>
</div>
</div>
</div>

A group in a `<details>` folds, with its heading in the `<summary>`. A group in a
`<div>` stays open. Render the group holding the current page with `open`, so its
link is never hidden.

```html
<details open>
  <summary>Work</summary>
  <ul>
    <li><a href="/jobs" aria-current="page">Jobs</a></li>
  </ul>
</details>
```

## Code

```html
<nav class="u-nav" aria-label="Shop">
  <a class="u-nav-link-section" href="/today">Today</a>
  <div>
    <p>Work</p>
    <ul>
      <li><a href="/jobs" aria-current="page">Jobs</a></li>
      <li><a href="/quotes">Quotes</a></li>
    </ul>
  </div>
</nav>
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

Group headings
: Headings are plain text above a list. To have one announced as part of its list, point the `<ul>` at it with `aria-labelledby`.

## Rules

One current page
: Mark exactly one link, the page on screen, never a parent and a child at once.

Groups need two or more
: Make a single link a section link with `u-nav-link-section`.

Short, plain names
: Name each place in a word or two, the same as the page's title.
