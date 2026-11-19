---
layout: page
title: Settings
summary: "Settings as rows, without cards."
section: Components
permalink: /components/settings/
---

Settings lays out a settings page as rows, each a heading, one line saying what
it does and its control. Use it for settings and preferences, inside
`u-container max-w-page-narrow`.

## Example

<div class="example-frame">
<%= render "examples/settings_rows" %>
</div>

## Code

```html
<div class="u-settings">
  <h2>Notifications</h2>
  <section class="u-setting">
    <div>
      <h3>Text customers when a job is ready</h3>
      <p>Sent from the shop's number when you mark a job Ready for pickup.</p>
    </div>
    <label class="u-switch"><input type="checkbox" switch role="switch" aria-label="Text customers when a job is ready" checked></label>
  </section>
  <section class="u-setting">
    <div>
      <h3>Shop name</h3>
      <p>Customers see it on texts, emails and their pickup page.</p>
    </div>
    <div class="u-setting-edit">
      <p>Kensington Jewellery Repair</p>
      <button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Edit shop name">…</button>
    </div>
  </section>
  <hr>
  …
</div>
```

## Parts

<%= render "classes", classes_page: "/components/settings/" %>

Control on the right
: A switch, a select or a single button sits beside the text and applies straight away. A choice is one click with one clear result, so it saves as soon as it changes.

Text with an Edit button
: Text people type, like a name, an email address or an address, shows as plain text in `u-setting-edit` with a pencil button. The button opens a [dialog](/components/dialog/) with the field and a Save button. Typed text never saves on its own: a half-typed value could reach customers, and nothing tells people when it saved. A setting made of several fields, like an address, is one row and one dialog. When there's no value yet, say "Not set" in `text-muted`.

Wide control underneath
: A control too wide for the right, like a long select, goes under the text with `u-setting-stacked`, at form width.

Groups
: An `<h2>` names each group and an `<hr>` separates groups. Space alone separates the rows inside one.

## When to use it

Use it for
: A settings or preferences page, where each setting is a statement that's on, off or set to a value.

Not for
: A form you fill in and send once, like a new job. Use a [form](/components/form/) in a [card](/components/card/).

## Accessibility

Labels
: A switch or select beside a heading has no visible label of its own, so give it an `aria-label` that matches the heading. Name the pencil button for what it edits, like "Edit shop name".

Saving
: Each row saves on its own. Say so when it lands, with a [toast](/components/toast/), so a change isn't silent.
