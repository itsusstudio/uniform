---
layout: page
title: Task shell
summary: "The frame around one task someone does while signed in, away from the app's pages."
section: Page frame
permalink: /components/task-shell/
---

The task shell holds a task someone does while signed in that takes a few
steps of its own, like changing their email address. It drops the app's
sidebar so the task has the whole screen, and keeps the app's name and a way
back, so nobody thinks they were signed out.

It splits the screen the same way as the [auth shell](/components/auth-shell/),
with paper where the auth shell has ink: from 1024px the task takes the left
third and paper fills the right two thirds, on a tablet the paper is the right
third, and a phone stays white. On a desktop the paper carries one cobalt
halftone of a cog in its bottom left corner, 48px in from the left and the
bottom, at 40% of the paper's width. On a tablet the paper stays plain.

## Example

<div class="frame frame-desktop" style="height: 560px">
<%= render "screen", title: "Task shell on a wide screen", html: render("examples/task_shell_confirm", id: "task-shell-demo", tag: "div") %>
</div>

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="frame frame-phone" style="height: 640px">
<%= render "screen", title: "Task shell on a phone", html: render("examples/task_shell_confirm", id: "task-shell-phone", tag: "div") %>
</div>
</div>

## Code

```html
<%= raw render("examples/task_shell_confirm", id: "confirm", tag: "main").strip %>
```

A `u-task-shell` holds two parts, in order:

Header
: The app name in [`u-wordmark`](/components/wordmark/), linked to the app's home page, then one link back to where the task started, like “Back to settings”, at the right edge of the white column.

Main
: The task, in one column up to 384px wide, 96px below the header, with its parts 24px apart on one left edge. At every width the column starts on the page margin, on the same left edge as the app name, like the form in the [auth shell](/components/auth-shell/).

## Rules

Signed in, not signing in
: Use it only for someone who is signed in. Signing in and signing up use the [auth shell](/components/auth-shell/), whose ink poster and legal links belong to the way in.

One way back
: The header's link is the only way out of the task. The task's own screens add no Cancel.

One task
: Each screen asks one thing, like the [Auth](/patterns/auth/) pattern. Longer work belongs in the app's own pages.
