---
layout: page
title: Site header
summary: "The top row of a marketing site."
section: Page frame
permalink: /components/site-header/
---

The site header holds the product's name, a few links and one button to start a trial. It sits at the top of every marketing page.

## Example

<div class="frame frame-paper frame-desktop">
<%= render "examples/site_header", id: "site-header-demo", live: false, banner: true %>
</div>

Pricing is the current page, so it's in ink and underlined. A one-line
announcement can sit above the row on a cobalt banner. Take it down when it's
old news.

## On a phone

When the header is narrower than 1024px, the links move behind a Menu button
and the trial button stays in the bar. Menu opens the links over the page, right
under the bar, and Escape or a tap outside closes them. The
[marketing page](/patterns/marketing-page/#on-a-phone) shows both states.

## Code

```html
<%= inline_partial("examples/site_header", id: "site", live: true, banner: true) %>
```

## Parts

<%= render "classes", classes_page: "/components/site-header/" %>

Trial
: One primary [button](/components/button/), after the `<nav>`.

## Do and don't

<%= render "examples/site_header_do_dont" %>

## Accessibility

Landmarks
: The row is a `<header>` and the links are a `<nav>` with `aria-label="Main"`.

Current page
: Put `aria-current="page"` on the link to the page you're on. Screen readers say "current page", and the link gets its underline.

Menu
: A real `<button>` with `popovertarget`. The browser handles focus, Escape and closing on a tap outside.

Language link
: Name the other language in that language, and add `lang` and `hreflang` so screen readers say it right.

## Rules

Only one button
: The trial is the only button. Sign in, the language and every page are plain links.

Three to five links
: Only the pages a visitor wants before signing up, like Pricing and Help. Everything else goes in the footer, with no dropdown or mega menu.

The name in type, not a logo
: Set the product's name in `u-wordmark`, as it's written, never as a logo image.

Not sticky
: No sticky bar, blur, shadow or "New" badge. News goes in the announcement line, which comes down instead of closing.
