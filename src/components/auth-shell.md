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

From 640px wide the shell splits into two equal halves: the name and a short blurb on ink on the left, and the
form centred top to bottom on the right. On a phone the name sits on white
above the form.

## Example

<div class="frame frame-desktop" style="height: 560px">
<%= render "screen", title: "Auth shell on a wide screen", html: render("examples/pattern_auth_sign_in", id: "auth-shell-demo", tag: "div") %>
</div>

<div class="u-row u-row-top u-gap-6 frame-phones">
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
: The app name in [`u-wordmark`](/components/wordmark/), linked to the app's home page, then a `<p class="u-text-article-title">` with the app's blurb. From 640px the header is the ink half, with the name at the top and the blurb at the bottom, and it stays ink in dark mode. On a phone only the name shows.

Main
: The screen itself, with its parts 24px apart and each up to 384px wide. Put one heading, one form and the links under it straight inside. Paragraphs in a row sit 8px apart, as one group of notes.

Footer
: Optional. The terms and privacy links in small grey type, at the bottom of the form's side.

The shell fills the screen's height. The [Auth](/patterns/auth/) pattern shows every
screen that goes in it.

## Rules

Only the name changes
: Every app uses the same shell. Its own name in its own [wordmark](/components/wordmark/) voice is the only difference.

The ink half holds the name and a two-line blurb
: One plain sentence about what the app does, two lines at most. No feature list, screenshot or testimonial. People came to sign in.

One left edge for the form
: The heading, the fields, the button and the footer all start on the same edge.
