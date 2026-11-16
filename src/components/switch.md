---
layout: page
title: Switch
summary: "A setting that takes effect when flipped."
section: Components
permalink: /components/switch/
---

A switch turns a setting on or off the moment it's flipped. Inside a form with a Save button, use a [checkbox](/components/checkbox/).

## Example

<div class="example-frame">
<div class="u-max-width-form">
<%= render "examples/switch_settings" %>
</div>
</div>

Flip “Text customers when a job is ready” and the shop starts texting from the
next job you mark ready. Nothing to save.

## Switch, checkbox or toggle

| Control | Use it for | Takes effect | Example |
|---|---|---|---|
| [Checkbox](/components/checkbox/) | An answer that's part of a form | When you submit the form | Keep me signed in |
| Switch | A setting that's on or off | Right away, and it stays | Text customers when a job is ready |
| [Toggle](/components/toggle/) | A view or formatting option you press on and off | Right away, on this screen | Show only mine, Bold |
| [Toggle group](/components/toggle-group/) | One view out of a few | Right away, on this screen | Today, This week, All |

The test is the Save button. If a Save or Create button sits under it, it's a
checkbox. If the change is saved the moment you flip it, it's a switch.

## States

<div class="example-frame u-row u-gap-6">
<label class="u-switch"><input type="checkbox" switch role="switch"> Off</label>
<label class="u-switch"><input type="checkbox" switch role="switch" checked> On</label>
<label class="u-switch"><input type="checkbox" switch role="switch" disabled> Disabled</label>
<label class="u-switch"><input type="checkbox" switch role="switch" checked disabled> Disabled, on</label>
</div>

Off
: Grey track, knob on the left.

On
: Ink track, knob on the right.

Disabled
: Light grey track, with the knob still on the side that shows its state. Say why in a hint, like “Add the shop’s phone number to send texts.”

## Code

```html
<label class="u-switch">
  <input type="checkbox" switch role="switch" name="text_when_ready" checked>
  Text customers when a job is ready
  <span class="u-switch-hint">Sent from the shop’s number when you mark a job Ready for pickup.</span>
</label>
```

```erb
<label class="u-switch">
  <%%= form.check_box :text_when_ready, switch: true, role: "switch" %>
  <%%= t(".text_when_ready") %>
  <span class="u-switch-hint"><%%= t(".text_when_ready_hint") %></span>
</label>
```

Put the input first inside the label, then the words, then an optional
`u-switch-hint`.

Your app does the saving: listen for `change` on the input and save the setting,
or submit its form. Without JavaScript, the switch works as a checkbox, so give
its form a Save button.

## Parts

<%= render "classes", classes_page: "/components/switch/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame u-form">
<div class="u-field">
<label for="switch-dont-customer">Customer</label>
<input class="u-input" id="switch-dont-customer" type="text" value="Ana Reyes" placeholder=" ">
</div>
<label class="u-switch"><input type="checkbox" switch role="switch" checked> Text Ana when it’s ready</label>
<div class="u-actions"><button type="button" class="u-btn u-btn-primary">Create job</button></div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A switch in a form with a Create button. Nothing happens until the form is sent, so the switch promises something it doesn't do.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame u-form">
<div class="u-field">
<label for="switch-do-customer">Customer</label>
<input class="u-input" id="switch-do-customer" type="text" value="Ana Reyes" placeholder=" ">
</div>
<label class="u-checkbox"><input type="checkbox" checked> Text Ana when it’s ready</label>
<div class="u-actions"><button type="button" class="u-btn u-btn-primary">Create job</button></div>
</div>
<figcaption class="example-caption example-caption-do"><span>A checkbox in the form. Save switches for settings that take effect when you flip them.</span></figcaption>
</figure>
</div>

## Accessibility

Real input
: It's a native checkbox with `switch` and `role="switch"`, so screen readers say “on” or “off” instead of “checked”. Space flips it.

Label it
: Put every switch inside its `<label>`, so clicking the words flips it.

More than colour
: The knob's side shows the state as well as the track's colour. In Windows high contrast mode it falls back to the browser's own checkbox.

Say when it fails
: If the setting doesn't save, flip the switch back and show an error in words, so what you see matches what's saved.

## Rules

Takes effect right away
: A switch is for a setting that saves the moment you flip it. Inside a form with a Save button, use a [checkbox](/components/checkbox/).

Say what “on” means
: The label says what happens when it's on. Never start it with “Enable”.

No On and Off words
: The knob shows the state. Keep the label the same when it flips, with no “On” or “Off” beside it.
