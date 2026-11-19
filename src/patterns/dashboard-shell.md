---
layout: page
title: Dashboard shell
summary: "The frame around every app page."
section: Patterns
permalink: /patterns/dashboard-shell/
---

The dashboard shell is the frame every app page sits in, with the sidebar
beside the page. Use it for every screen people see once they've signed in.

## Example

<div class="frame frame-desktop" style="height: 600px">
<%= render "screen", title: "Dashboard shell on a wide screen", html: render("examples/pattern_dashboard_shell_app", id: "shell-desktop", live: true) %>
</div>

The sidebar stays on the left on ink, and the page sits beside it on white,
so the eye knows which part changes. Try the button beside the app name: it
folds the nav down to its icons.

### On a phone

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="flex flex-col gap-2">
<div class="frame frame-phone" style="height: 720px">
<%= render "screen", title: "Dashboard shell on a phone, menu closed", html: render("examples/pattern_dashboard_shell_app", id: "shell-phone", live: false) %>
</div>
<p class="text-small text-muted">Menu closed: the bar and the page.</p>
</div>
<div class="flex flex-col gap-2">
<div class="frame frame-phone frame-phone-open" style="height: 720px">
<%= render "screen", title: "Dashboard shell on a phone, menu open", state: "frame-phone-open", html: render("examples/pattern_dashboard_shell_app", id: "shell-phone-open", live: false) %>
</div>
<p class="text-small text-muted">Menu open: the nav slides in over a backdrop, three quarters wide.</p>
</div>
</div>

Below 1024px the nav hides and a bar takes its place at the top, with the app
name and a Menu button. Menu slides the same nav in from the left, three
quarters wide, and dims the page behind it. Tapping the dimmed page or pressing
Escape closes it. The nav is a browser
`popover`, so none of this needs a script.

## Anatomy

[App shell](/components/app-shell/)
: `u-app-shell` on one element, holding the phone bar in a `<header>`, the sidebar and the `<main>`. It gives the sidebar a 264px column and drops to one column below 1024px.

Sidebar
: The column with the app's places and the account. See the [sidebar](/components/sidebar/) for what goes inside.

Content
: A [container](/components/container/) inside the `<main>`, holding a `flex flex-col gap-12` column.

Page header
: A [page header](/components/page-header/) at the top of the content, holding the title, the count line and “New job”.

Page content
: Everything else, here a [card](/components/card/) with a [table](/components/table/) and [badges](/components/badge/).

## Code

```html
<%= inline_partial("examples/pattern_dashboard_shell_app", id: "app", live: true) %>
```

## Do and don't

<%= render "examples/app_shell_do_dont" %>

## Rules

Actions live in the page header
: The bar holds the app name and Menu, nothing else. A page's buttons go in its page header, on a phone and on a computer alike.

One page header per page
: Every page starts with a page header at the top of the content, so the title is always in the same spot.

The frame's own rules are on the [app shell](/components/app-shell/#rules).
