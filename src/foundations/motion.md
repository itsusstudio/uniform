---
layout: page
title: Motion
summary: "When an interface moves, and when it stays still."
section: Foundations
permalink: /foundations/motion/
---

Motion covers the two moments where an interface moves: progress filling up,
and a list gaining or losing an item. Everything else appears instantly.

## What moves

Everything else
: Menus, dialogs, panels, messages, sections opening, hover, tabs and page changes are instant.

Progress
: A bar fills as the work gets done. Use the native `<progress>` inside `u-progress`.

A list gaining or losing an item
: The item fades and the space around it opens or closes. Wrap the item in `u-enter` when it arrives and `u-exit` when it leaves, then remove it when the animation ends.

<%= render "examples/shape_specs", rows: [
  { copy: "var(--u-duration-enter)", detail: "200ms", sample: '<span class="shape-box"></span>', job: "How long an item takes to arrive." },
  { copy: "var(--u-duration-exit)", detail: "130ms", sample: '<span class="shape-box"></span>', job: "How long an item takes to leave. Shorter, because you already know it's going." },
  { copy: "var(--u-duration-hover)", detail: "100ms", sample: '<span class="shape-box"></span>', job: "How long a hover change takes, like the other bars dimming on a chart. Short enough to feel instant, long enough not to flicker." },
  { copy: "var(--ease-standard)", detail: "ease-out", sample: '<span class="shape-box"></span>', job: "The one curve for everything that moves. Fast at the start, settling gently, no bounce." },
] %>

## In use

<%= render "examples/motion_in_use" %>
<%= render "examples/motion_in_use_script" %>

## Without motion

Because almost nothing moves, a few things do the job movement would have done.

Confirm with a message
: After an action, a short message appears in the same spot every time, so people know where to look.

Reserve the space
: Content that loads in gets its space up front, so nothing jumps when it arrives.

Move focus on
: When an item is removed, focus moves to the next one, so keyboard and screen reader users don't lose their place.

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/motion/" %>
