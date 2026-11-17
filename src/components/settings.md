---
layout: page
title: Settings
summary: "Settings as rows, without cards."
section: Components
permalink: /components/settings/
---

Settings lays out a settings page as rows, each a heading, one line saying what
it does and its control. Use it for settings and preferences, inside
`u-container u-container-narrow`.

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
  <section class="u-setting u-setting-stacked">
    <div>
      <h3>Shop name</h3>
      <p>Customers see it on texts, emails and their pickup page.</p>
    </div>
    <input class="u-input" aria-label="Shop name" value="Kensington Jewellery Repair">
  </section>
  <hr>
  …
</div>
```

## Parts

<%= render "classes", classes_page: "/components/settings/" %>

Control on the right
: A switch or a single button sits beside the text and applies straight away.

Field underneath
: A field you type into goes under the text with `u-setting-stacked`, at form width, and saves when you leave it.

Groups
: An `<h2>` names each group and an `<hr>` separates groups. Space alone separates the rows inside one.

## When to use it

Use it for
: A settings or preferences page, where each setting is a statement that's on, off or set to a value.

Not for
: A form you fill in and send once, like a new job. Use a [form](/components/form/) in a [card](/components/card/).

## Accessibility

Labels
: A switch or field beside a heading has no visible label of its own, so give it an `aria-label` that matches the heading.

Saving
: Each row saves on its own. Say so when it lands, with a [toast](/components/toast/), so a change isn't silent.
