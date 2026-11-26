---
layout: page
title: Masthead
summary: "The top of a client-facing page, set on the page grid."
section: Page frame
permalink: /components/masthead/
---

The masthead opens every page of an app that a business's clients use, such as a client portal. It has no bar and no border: the business name and two short columns of links sit on the page grid, and the page's first heading starts on the same left edge.

## Example

<div class="example-frame">
<header class="u-masthead">
<div class="u-container">
<a class="u-wordmark u-wordmark-serif" href="#example">Rowe Parisian</a>
<nav aria-label="Main"><ul><li>Ana Reyes</li><li><a href="#example" aria-current="page">Your jobs</a></li></ul></nav>
<ul aria-label="Your account"><li><a href="#example">Settings</a></li><li><form><button type="button">Sign out</button></form></li></ul>
</div>
</header>
</div>

## Code

```html
<header class="u-masthead">
  <div class="u-container max-w-page">
    <a class="u-wordmark u-wordmark-serif" href="/rowe-parisian">Rowe Parisian</a>
    <nav aria-label="Main">
      <ul>
        <li>Ana Reyes</li>
        <li><a href="/rowe-parisian" aria-current="page">Your jobs</a></li>
      </ul>
    </nav>
    <ul aria-label="Your account">
      <li><a href="/rowe-parisian/settings">Settings</a></li>
      <li><form action="/rowe-parisian/session" method="post"><button>Sign out</button></form></li>
    </ul>
  </div>
</header>
```

Columns
: The business name spans six of twelve columns, and the `<nav>` and the `<ul>` span three each, so the links line up with any 12-column layout below.

Width
: Give the `u-container` the widest width any page of the app uses, and keep it on every page. Narrow pages centre their own content under it.

## On a phone

Below 640px the name takes the left column and both lists stack on the right. A `<li>` with plain text, like the client's name, hides there to save room.

## Parts

<%= render "classes", classes_page: "/components/masthead/" %>

## Accessibility

Landmarks
: The masthead is a `<header>`, and the page links are a `<nav>` with an `aria-label`. Account links go in a labelled `<ul>`, outside the nav.

Current page
: Put `aria-current="page"` on the link to the page you're on. Screen readers say "current page", and the link turns medium weight.

Sign out
: A real `<button>` in a form, styled as a muted link.

## Rules

For clients, not teams
: Use the masthead where a sidebar would be too much: a few pages, read more than worked in. Apps for a team use the [app shell](/components/app-shell/).

Two short lists
: At most two items in each list. More pages need the app shell.
