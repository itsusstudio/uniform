---
layout: page
title: Select
summary: "The browser's select, styled as a field."
section: Components
permalink: /components/select/
---

A select picks one option from a list too long to show at once. It opens the picker people already know.

<%= render "example_heading" %>

<div class="example-frame">
<div class="u-max-width-form u-form">
<div class="u-field">
<label for="sel-type">Repair type</label>
<select class="u-input" id="sel-type">
<option>Battery replacement</option>
<option>Chain repair</option>
<option>Clasp replacement</option>
<option>Cleaning and polish</option>
<option>Engraving</option>
<option selected>Ring resize</option>
<option>Stone setting</option>
<option>Watch service</option>
</select>
</div>
<div class="u-field">
<label for="sel-bench">On the bench with</label>
<select class="u-input" id="sel-bench" aria-describedby="sel-bench-hint">
<option value="">Nobody yet</option>
<option selected>Marco</option>
<option>Priya</option>
<option>Sam</option>
</select>
<small id="sel-bench-hint">They get a note when the job moves to them.</small>
</div>
</div>
</div>

## States

<div class="example-frame">
<div class="u-max-width-form u-form">
<div class="u-field">
<label for="sel-error">Pickup location</label>
<select class="u-input" id="sel-error" aria-invalid="true" aria-describedby="sel-error-message">
<option value="" selected>Choose a location</option>
<option>Queen Street</option>
<option>Yorkville</option>
</select>
<p class="u-error" id="sel-error-message">Choose where Ana will pick up the ring.</p>
</div>
<div class="u-field">
<label for="sel-disabled">Currency</label>
<select class="u-input" id="sel-disabled" disabled aria-describedby="sel-disabled-hint">
<option>Canadian dollars</option>
</select>
<small id="sel-disabled-hint">Set for your whole shop in Settings.</small>
</div>
</div>
</div>

Error
: Set `aria-invalid="true"` on the select and add a `u-error` under it, the same as a [text field](/components/text-field/).

Disabled
: The box and caret go grey. Say why in a hint.

## Code

```html
<div class="u-field">
  <label for="repair-type">Repair type</label>
  <select class="u-input" id="repair-type" name="repair_type">
    <option>Chain repair</option>
    <option>Ring resize</option>
    <option>Watch service</option>
  </select>
</div>
```

```erb
<div class="u-field">
  <%%= form.label :repair_type_id, t(".repair_type") %>
  <%%= form.collection_select :repair_type_id, current_shop.repair_types.order(:name), :id, :name, {}, class: "u-input" %>
</div>
```

## Classes

A `<select>` with `u-input` draws its own arrow. With a mouse in Chrome or Edge, its list opens styled like a [menu](/components/menu/). Phones, Safari and Firefox keep the browser's own list. `u-field`, `u-input` and
`u-error` work as they do in a [text field](/components/text-field/).

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-field">
<label for="sel-dont-paid">Paid by</label>
<select class="u-input" id="sel-dont-paid">
<option>Card</option>
<option>Cash</option>
</select>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A select for two choices. Someone has to open it to see there's only one other option.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<fieldset class="u-fieldset">
<legend>Paid by</legend>
<label class="u-radio"><input type="radio" name="sel-do-paid" checked> Card</label>
<label class="u-radio"><input type="radio" name="sel-do-paid"> Cash</label>
</fieldset>
</div>
<figcaption class="example-caption example-caption-do"><span>Radios for a few choices, all in view. Save the select for six or more.</span></figcaption>
</figure>
</div>

## Accessibility

Native select
: It's the browser's own `<select>`, so arrow keys, type-to-find and the phone's picker all work.

Label it
: Give it a `<label>` with a matching `for`, and point `aria-describedby` at its hint or error.

Empty first option
: When there's no sensible default, start with an empty option that says what to do, like “Choose a location”, and give it `value=""` so a required select catches it.

## Rules

Six or more options
: Use a select when the list is long. For two to five, use [Radio](/components/radio/) so every choice is in view.

Keep it native
: Use the browser's `<select>`, not one rebuilt in JavaScript. For search, use a [combobox](/components/combobox/). To pick several, use [checkboxes](/components/checkbox/).

Sort the list
: Put options in an order people can scan: alphabetical, or the order they happen in the shop.
