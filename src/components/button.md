---
layout: page
title: Button
summary: "A pill that runs an action."
section: Components
permalink: /components/button/
---

A button runs an action, like saving or sending. To go to another page, use a [link](/components/link/).

## Variants

<%= render "examples/button_variants" %>

<%= render "classes", classes_page: "/components/button/", classes_variants: true %>

## Large, sites only

<div class="flex flex-wrap items-center gap-2">
<span class="u-btn u-btn-primary u-btn-lg">Start free trial</span>
<span class="u-btn u-btn-outline u-btn-lg">See pricing</span>
</div>

Use `u-btn-lg` for a marketing site's main call to action, next to a hero or
section headline. Never use it in an app.

## Code

```html
<button type="button" class="u-btn u-btn-primary">Save job</button>
<button type="button" class="u-btn u-btn-outline">Cancel</button>
<button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="More actions">
  <svg class="u-icon" aria-hidden="true">…</svg>
</button>
```

```erb
<%%= form.button t(".save_job"), class: "u-btn u-btn-primary" %>
<%%= link_to t(".cancel"), job_path(job), class: "u-btn u-btn-outline" %>
<%%= tag.button type: "button", class: "u-btn u-btn-ghost u-btn-icon", aria: { label: t(".more_actions") } do %>
  <svg class="u-icon" aria-hidden="true">…</svg>
<%% end %>
```

Put buttons in a [`u-actions`](/components/actions/) row.

For a button that closes or removes something, use an empty `u-btn-close` with
an `aria-label`.

```html
<button type="button" class="u-btn-close" aria-label="Close"></button>
```

```erb
<%%= tag.button type: "button", class: "u-btn-close", aria: { label: t("uniform.close") } %>
```

## Copy button

Wrap a button in `<u-copy>` to copy a value, like a job's link or a sign-in
code. Start the button `hidden`, since copying needs a script. Keep the value on
the page too, so people can select it.

The words change to `data-copied` for a moment, or to `data-copy-failed` when
the browser blocks it. Set both from the gem's `uniform.copy.copied` and `uniform.copy.failed` keys. A status message beside the button tells screen readers.

<div class="flex flex-wrap items-center gap-2">
<span class="u-data">kensingtonrepair.ca/jobs/1042</span>
<u-copy><button type="button" class="u-btn u-btn-outline" data-copy="https://kensingtonrepair.ca/jobs/1042" data-copied="Copied" data-copy-failed="Couldn’t copy" hidden><span data-copy-label>Copy link</span></button></u-copy>
</div>

```html
<u-copy>
  <button type="button" class="u-btn u-btn-outline" data-copy="https://kensingtonrepair.ca/jobs/1042" data-copied="Copied" data-copy-failed="Couldn’t copy" hidden>
    <span data-copy-label>Copy link</span>
  </button>
</u-copy>
```

```erb
<u-copy>
  <%%= tag.button type: "button", class: "u-btn u-btn-outline", data: { copy: job_url(job), copied: t("uniform.copy.copied"), copy_failed: t("uniform.copy.failed") }, hidden: true do %>
    <span data-copy-label><%%= t(".copy_link") %></span>
  <%% end %>
</u-copy>
```

To copy a value by clicking the value itself, like an email address, make the
value a `u-link-btn` and give `<u-copy>` the `u-tooltip` class. Put
`data-copy-label` on the tooltip: it shows the value on hover, says
`data-copied` for a moment after a click, and stays open while it does. The
value never changes, so nothing on the page moves.

```erb
<u-copy class="u-tooltip">
  <%%= tag.button customer.email_address, type: "button", class: "u-link-btn truncate",
        data: { copy: customer.email_address, copied: t("uniform.copy.copied"), copy_failed: t("uniform.copy.failed") } %>
  <span aria-hidden="true" data-copy-label><%%= customer.email_address %></span>
</u-copy>
```

For an icon-only copy button, put the copy icon in a `u-btn-icon` button with an
`aria-label`. The icon turns into a check mark for a moment, or a cross when the
browser blocks it.

<div class="flex flex-wrap items-center gap-2">
<span class="u-data">kensingtonrepair.ca/jobs/1042</span>
<u-copy><button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Copy link" data-copy="https://kensingtonrepair.ca/jobs/1042" data-copied="Copied" data-copy-failed="Couldn’t copy" hidden><%= inline_partial("icon", name: "copy", small: true) %></button></u-copy>
</div>

```erb
<u-copy>
  <%%= tag.button type: "button", class: "u-btn u-btn-ghost u-btn-icon", aria: { label: t(".copy_link") }, data: { copy: job_url(job), copied: t("uniform.copy.copied"), copy_failed: t("uniform.copy.failed") }, hidden: true do %>
    <%%= uniform_icon "copy", small: true %>
  <%% end %>
</u-copy>
```

## Parts

<%= render "classes", classes_page: "/components/button/" %>

## Do and don't

<%= render "examples/button_do_dont" %>

## Accessibility

Real elements
: Use `<button>` for actions and `<a class="u-btn u-btn-primary">` only when it goes to another page.

Target size
: Every button is at least 36px tall, above the 32px minimum for anything you press.

Focus
: Keyboard focus shows the cobalt ring. Never remove it.

Icon buttons
: Always give an `aria-label` that names the action and its object, like "Delete job #1042".

Disabled
: A disabled button can't be focused or explained by a screen reader, so put the reason in text beside it. It keeps its own look, dimmed, so people can still see which action it is.

## Rules

One size in apps
: Every button in an app is as tall as a text field, so they line up. Show what matters with the variant, never by making a button bigger.

Large only for a site's main call to action
: On a marketing site, the hero and the closing section can use `u-btn-lg`, so the button holds its own next to big headlines. Use one per section, and never in the site header.

One primary per part of the page
: Each form, card or dialog has at most one primary button. Everything next to it is outline or ghost.

Always add a variant
: Write `u-btn` with `u-btn-primary`, `u-btn-outline`, `u-btn-ghost`, `u-btn-danger` or `u-btn-ghost-danger`. On its own, `u-btn` has no fill and no border.
