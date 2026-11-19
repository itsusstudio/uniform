---
layout: page
title: Auth shell
summary: "The frame around every sign-in and sign-up screen."
section: Page frame
permalink: /components/auth-shell/
---

The auth shell holds the screens people see before they're signed in: the app's
name, one column for the form, and the terms and privacy links. Every studio app
uses the same one, so only the name changes.

From 1024px wide the form takes the left third, hung near the top, and an ink
poster fills the right two thirds with the name at the top and a short blurb
at 56px at the bottom. On a tablet the name and the form sit on white in the
left two thirds and a plain ink band fills the right third, with no blurb. On a
phone there's no ink. Either way the form hangs below the name near the top, so
the keyboard never pushes it out of view.

## Example

<div class="frame frame-desktop" style="height: 560px">
<%= render "screen", title: "Auth shell on a wide screen", html: render("examples/pattern_auth_sign_in", id: "auth-shell-demo", tag: "div") %>
</div>

<div class="u-row u-items-start u-gap-6 frame-phones">
<div class="frame frame-phone" style="height: 640px">
<%= render "screen", title: "Auth shell on a phone", html: render("examples/pattern_auth_sign_in", id: "auth-shell-phone", tag: "div") %>
</div>
</div>

## Code

```html
<%= raw render("examples/pattern_auth_sign_in", id: "sign-in", tag: "main").strip %>
```

A `u-auth-shell` holds three parts, in order:

Header
: The app name in [`u-wordmark`](/components/wordmark/), linked to the app's home page, then a `<p class="u-text-section-title">` with the app's blurb. From 1024px the header is the ink poster on the right two thirds, with the name at the top and the blurb at 56px at the bottom. In dark mode it lifts to the paper grey, so it still reads as a panel beside the dark page. The form column never narrows below 480px, so the form keeps its full 384px at 1024px. On a tablet the name stays on white above the form and the right third is plain ink; on a phone only the name shows.

Main
: The screen itself, with its parts 24px apart and each up to 384px wide. Put one heading, one form and the links under it straight inside. Paragraphs in a row sit 8px apart, as one group of notes.

Language
: Optional, before the header: a `<form class="u-auth-shell-language">` holding a [language select](/components/language-select/). It sits at the far right on the ink, at the top of the poster from 1024px and of the ink third on a tablet, in white on the ink; on a phone, with no ink, it's the far end of the header.

Footer
: Optional. The terms and privacy links in small grey type, at the bottom of the form's side.

The shell fills the screen's height. The [Auth](/patterns/auth/) pattern shows every
screen that goes in it.

## Rules

Only the name changes
: Every app uses the same shell. Its own name in its own [wordmark](/components/wordmark/) voice is the only difference.

The poster holds the name and a two-line blurb
: One plain sentence about what the app does, two lines at most. No feature list, screenshot or testimonial. People came to sign in.

One left edge for the form
: The heading, the fields, the button and the footer all start on the same edge.
