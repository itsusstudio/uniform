---
layout: page
title: "Input: colour"
summary: "A colour picker with a hex field and presets."
section: Components
permalink: /components/input-colour/
---

A colour input picks a colour for something people own, like a label. Uniform
never gives that colour a meaning.

<%= render "example_heading" %>

<div class="example-frame">
<div class="u-max-width-form u-stack u-gap-6">
<div class="u-stack u-gap-4">
<div class="u-field">
<label for="cf-live-name">Label name</label>
<input class="u-input" id="cf-live-name" type="text" value="Rush" autocomplete="off" placeholder=" ">
</div>
<%= render "examples/input_colour", id: "cf-live", value: "#e0a526" %>
</div>
<div class="u-stack u-gap-2">
<p class="u-text-small u-text-strong">Preview</p>
<div class="u-row u-gap-2 u-text-small"><span class="u-text-data">#1042</span> Ana Reyes, ring resize <span class="colour-field-demo-tag" id="cf-live-tag">Rush</span></div>
</div>
</div>
</div>

<script>
<%= raw render("examples/input_colour_preview_script").strip %>
</script>

Press the caret or the down arrow to see the presets. Type a code like
`#3E5FC4` and the square follows. “Custom…” and the square open the browser's
own picker.

## States

<div class="example-frame u-grid u-gap-6">
<div class="u-span-6 colour-field-demo-open">
<%= render "examples/input_colour", id: "cf-open", value: "#3e5fc4", open_picker: true %>
</div>
<div class="u-span-6 u-stack u-gap-4">
<%= render "examples/input_colour", id: "cf-invalid", value: "#e0a526" %>
<%= render "examples/input_colour", id: "cf-disabled", value: "#9c4a8f", disabled: true, hint_text: "Labels from your old system keep their colour." %>
</div>
</div>

<script>
customElements.whenDefined("u-input-colour").then(() => {
  const field = document.getElementById("cf-invalid")
  if (!field) return
  field.value = "#E0A52"
  field.dispatchEvent(new Event("change"))
})
</script>

Open
: The presets float under the field, styled like a [menu](/components/menu/). The picked colour has an outline and a check.

Invalid
: A code that isn't a colour shows the `u-error` when you leave the field, and screen readers hear it a moment later. The form won't send until it's fixed. The square keeps the last good colour.

Disabled
: The field and caret go grey. The square still shows the colour. Say why in a hint.

## Code

```html
<%= raw render("examples/input_colour", id: "label-colour", value: "#e0a526").strip %>
```

```erb
<div class="u-field">
  <%%= form.label :colour, t(".colour") %>
  <u-input-colour data-presets-label="<%%= t(".presets") %>" data-custom-label="<%%= t(".custom") %>">
    <%%= form.color_field :colour, list: "label-colour-presets",
      aria: { describedby: "label-colour-hint", errormessage: "label-colour-error" } %>
    <datalist id="label-colour-presets">
      <%% Label::PRESETS.each do |key, hex| %>
        <option value="<%%= hex %>" label="<%%= t(".colours.#{key}") %>"></option>
      <%% end %>
    </datalist>
  </u-input-colour>
  <small id="label-colour-hint"><%%= t(".colour_hint") %></small>
  <p class="u-error" id="label-colour-error" hidden><%%= t(".colour_error") %></p>
</div>
```

Write a colour input and a `<datalist>` of presets, each an `<option>` with the
colour in `value` and its name in `label`. Give the colour input the `name`, so
the form always gets a valid code.

The element adds two words of its own, so give it both: `data-presets-label`
names the preset button, and `data-custom-label` is the text on the custom
colour button. Both come from the app's locale file.

## Parts

<%= render "classes", classes_page: "/components/input-colour/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-row u-gap-2 u-text-small"><span class="u-text-data">#1042</span> Ana Reyes, ring resize <span class="colour-field-demo-tag" style="background-color: #e0a526; color: var(--u-color-text-on-ink)">Rush</span></div>
</div>
<figcaption class="example-caption example-caption-dont"><span>The same light words on every label. Paper on amber is 2 to 1, too faint to read.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-row u-gap-2 u-text-small"><span class="u-text-data">#1042</span> Ana Reyes, ring resize <span class="colour-field-demo-tag" style="background-color: #e0a526; color: var(--u-color-bg-ink)">Rush</span></div>
</div>
<figcaption class="example-caption example-caption-do"><span>Ink or paper, whichever has more contrast with the colour.</span></figcaption>
</figure>
</div>

## Accessibility

One field to tab to
: The label names the hex field. Tab goes to the code, then the caret, and skips the square.

Presets have names
: Each preset is a button named from its `label`, like “Amber”, with `aria-pressed` on the picked one. Screen readers never hear a hex code.

Keyboard
: The down arrow opens the presets. Arrow keys move across the grid, Enter or Space picks, and Escape closes.

## Rules

Not for status
: A colour someone picks is theirs. Never use it for a status or a warning.

Always show the name
: Show the name on every coloured label. Two labels that differ only by colour fail anyone who can't tell them apart.

Ink or paper text, by contrast
: Put ink or paper text on a picked colour, whichever has more contrast. Work it out where you show the label.

Twelve presets at most
: Twelve fit in two rows. With more, nobody compares them.
