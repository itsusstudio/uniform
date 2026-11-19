---
layout: page
title: Toggle
summary: "A button that stays pressed."
section: Components
permalink: /components/toggle/
---

A toggle is a button that stays pressed, for an option that changes what the screen shows. For one choice out of a few, use a [toggle group](/components/toggle-group/).

## Example

<div class="example-frame">
<%= render "examples/toggle_mine" %>
</div>

Press “Show only mine” and the list keeps Dana's two jobs. Press it again to see
everyone's.

<div class="example-frame">
<div class="toggle-demo-editor">
<%= render "examples/toggle_editor" %>
</div>
</div>

Formatting toggles hold only an icon, so give each one an `aria-label`. Put them
in a group labelled “Formatting”.

## Toggle, switch or checkbox

| Control | Use it for | Takes effect | Example |
|---|---|---|---|
| Toggle | A view or formatting option you press on and off | Right away, on this screen | Show only mine, Bold |
| [Toggle group](/components/toggle-group/) | One view out of a few | Right away, on this screen | Today, This week, All |
| [Switch](/components/switch/) | A setting that's on or off | Right away, and it stays | Text customers when a job is ready |
| [Checkbox](/components/checkbox/) | An answer that's part of a form | When you submit the form | Keep me signed in |

A toggle changes how you're looking at something. A switch changes how the shop
works. If people would look for it in Settings, it's a switch.

## States

<div class="example-frame flex flex-wrap items-center gap-6">
<u-toggle><button type="button" class="u-toggle" aria-pressed="false">Not pressed</button></u-toggle>
<u-toggle><button type="button" class="u-toggle" aria-pressed="true">Pressed</button></u-toggle>
<u-toggle><button type="button" class="u-toggle" aria-pressed="false" disabled>Disabled</button></u-toggle>
<u-toggle><button type="button" class="u-toggle" aria-pressed="true" disabled>Disabled, pressed</button></u-toggle>
</div>

Not pressed
: An ink outline.

Pressed
: Ink fill, light text.

Disabled
: Grey, and a pressed one keeps a grey fill.

## Code

```html
<u-toggle>
  <button type="button" class="u-toggle" aria-pressed="false">Show only mine</button>
</u-toggle>

<u-toggle>
  <button type="button" class="u-toggle u-toggle-icon" aria-pressed="false" aria-label="Bold">
    <svg class="u-icon" aria-hidden="true">…</svg>
  </button>
</u-toggle>
```

```erb
<u-toggle>
  <%%= tag.button t(".show_only_mine"), type: "button", class: "u-toggle", aria: { pressed: params[:mine].present? } %>
</u-toggle>

<u-toggle>
  <%%= tag.button type: "button", class: "u-toggle u-toggle-icon", aria: { pressed: false, label: t(".bold") } do %>
    <svg class="u-icon" aria-hidden="true">…</svg>
  <%% end %>
</u-toggle>
```

Wrap each toggle button in its own `<u-toggle>` from
[`uniform.js`](/start/install/), which flips `aria-pressed` when it's pressed.
Listen for `toggle:change` to show only Dana's jobs or make the text bold.

## Without JavaScript

<div class="example-frame">
<form class="flex flex-wrap items-center gap-4" action="#without-javascript">
<label class="u-toggle"><input type="checkbox" name="mine" value="1"> Show only mine</label>
<button type="submit" class="u-btn u-btn-outline">Apply</button>
</form>
</div>

```html
<label class="u-toggle">
  <input type="checkbox" name="mine" value="1">
  Show only mine
</label>
```

```erb
<label class="u-toggle">
  <%%= check_box_tag :mine, "1", params[:mine].present?, id: nil %>
  <%%= t(".show_only_mine") %>
</label>
```

Put `u-toggle` on a `<label>` around a checkbox and it looks and presses the
same, with no script. Screen readers call it a checkbox. Use it in a filter form
sent with a button. When your app changes the screen as you press, use the
button version.

## Parts

<%= render "classes", classes_page: "/components/toggle/" %>

## Accessibility

Pressed state
: A toggle button carries `aria-pressed`, so screen readers say “pressed” or “not pressed”.

Keyboard
: Space or Enter presses a toggle button. The focus ring shows on the pill you're on.

More than colour
: Pressed is a solid fill and not pressed is an outline, which reads in greyscale and in high contrast mode.

## Rules

On this screen only
: Toggles change what you see. A setting that changes how the shop works is a [switch](/components/switch/).

One choice, use a group
: When only one option can be on, use a [toggle group](/components/toggle-group/), never separate toggles.

Same label both ways
: The label says what pressing it does, and stays the same when it's pressed. “Show only mine” never turns into “Show everyone”.
