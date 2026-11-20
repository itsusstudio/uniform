---
layout: page
title: Radio
summary: "The browser's radio, styled."
section: Components
permalink: /components/radio/
---

A radio picks exactly one option from a few, all in view. The whole label is the target.

## Example

<div class="example-frame flex flex-col gap-6">
<fieldset class="u-fieldset">
<legend>When it's ready, let Ana know by</legend>
<label class="u-radio"><input type="radio" name="radio-notify" checked> Text<span class="u-radio-hint">To (416) 555-0199.</span></label>
<label class="u-radio"><input type="radio" name="radio-notify"> Email<span class="u-radio-hint">To ana@example.com.</span></label>
<label class="u-radio"><input type="radio" name="radio-notify"> Don't send anything<span class="u-radio-hint">You'll call her yourself.</span></label>
</fieldset>
<fieldset class="u-fieldset">
<legend>Paid by</legend>
<label class="u-radio"><input type="radio" name="radio-paid" checked> Card</label>
<label class="u-radio"><input type="radio" name="radio-paid"> Cash</label>
<label class="u-radio"><input type="radio" name="radio-paid"> E-transfer</label>
</fieldset>
</div>

## States

<div class="example-frame flex flex-wrap items-center gap-6">
<label class="u-radio"><input type="radio" name="radio-state-a"> Not chosen</label>
<label class="u-radio"><input type="radio" name="radio-state-b" checked> Chosen</label>
<label class="u-radio"><input type="radio" name="radio-state-c" disabled> Disabled</label>
<label class="u-radio"><input type="radio" name="radio-state-d" checked disabled> Disabled, chosen</label>
</div>

## Code

```html
<fieldset>
  <legend>Paid by</legend>
  <label class="u-radio"><input type="radio" name="paid_by" value="card" checked> Card</label>
  <label class="u-radio"><input type="radio" name="paid_by" value="cash"> Cash</label>
  <label class="u-radio">
    <input type="radio" name="paid_by" value="etransfer">
    E-transfer
    <span class="u-radio-hint">Mark it paid once it lands.</span>
  </label>
</fieldset>
```

```erb
<fieldset>
  <legend><%%= t(".paid_by") %></legend>
  <%% %w[card cash].each do |method| %>
    <label class="u-radio"><%%= form.radio_button :paid_by, method %> <%%= t(".methods.#{method}") %></label>
  <%% end %>
  <label class="u-radio">
    <%%= form.radio_button :paid_by, "etransfer" %>
    <%%= t(".methods.etransfer") %>
    <span class="u-radio-hint"><%%= t(".etransfer_hint") %></span>
  </label>
</fieldset>
```

Put the input first, inside its label. Give every radio in a group the same
`name`.

## Framed groups

A plain `<fieldset>` frames its options in a hairline box with the legend set
into the line, like a group on a printed form. Use `u-fieldset` instead when the
group sits in a form's own column and needs no frame.

<div class="u-grid"><div class="@grid:col-span-6">
<fieldset>
<legend>Paid by</legend>
<label class="u-radio"><input type="radio" name="framed_paid_by" value="card" checked> Card</label>
<label class="u-radio"><input type="radio" name="framed_paid_by" value="cash"> Cash</label>
<label class="u-radio"><input type="radio" name="framed_paid_by" value="etransfer"> E-transfer <span class="u-radio-hint">Mark it paid once it lands.</span></label>
</fieldset>
</div></div>

## In a row

Two to four short choices can sit side by side. Add `u-fieldset-row` to the
`u-fieldset`, and the options wrap to the next line when they run out of room.
The fieldset stays a plain block, so the row works in every browser Uniform
supports.

<div class="u-grid"><div class="@grid:col-span-6">
<fieldset class="u-fieldset u-fieldset-row">
<legend>Preferred language</legend>
<label class="u-radio"><input type="radio" name="row_language" value="en" checked> English</label>
<label class="u-radio"><input type="radio" name="row_language" value="fr_formal"> French, vous</label>
<label class="u-radio"><input type="radio" name="row_language" value="fr_casual"> French, tu</label>
</fieldset>
</div></div>

```erb
<fieldset class="u-fieldset u-fieldset-row">
  <legend><%%= t(".preferred_language") %></legend>
  <%% Customer::LANGUAGE_CHOICES.each_key do |choice| %>
    <label class="u-radio"><%%= form.radio_button :language_choice, choice %> <%%= t(".languages.#{choice}") %></label>
  <%% end %>
</fieldset>
```

## Classes

<%= render "classes", classes_page: "/components/radio/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<fieldset class="u-fieldset">
<legend>Repair type</legend>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Battery replacement</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Chain repair</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Clasp replacement</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Cleaning and polish</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Engraving</label>
<label class="u-radio"><input type="radio" name="radio-dont-type" checked> Ring resize</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Stone setting</label>
<label class="u-radio"><input type="radio" name="radio-dont-type"> Watch service</label>
</fieldset>
</div>
<figcaption class="example-caption example-caption-dont"><span>Eight radios in a row. The form gets long and the one that's chosen is hard to find.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<fieldset class="u-fieldset">
<legend>Paid by</legend>
<label class="u-radio"><input type="radio" name="radio-do-paid" checked> Card</label>
<label class="u-radio"><input type="radio" name="radio-do-paid"> Cash</label>
<label class="u-radio"><input type="radio" name="radio-do-paid"> E-transfer</label>
</fieldset>
</div>
<figcaption class="example-caption example-caption-do"><span>Three choices, all in view, one already picked. For a long list, use a select.</span></figcaption>
</figure>
</div>

## Accessibility

Real input
: It's a native radio, so Tab reaches the group, the arrow keys move the choice, and screen readers say “2 of 3”.

Group with a fieldset
: Put every group in a `<fieldset>` with a `<legend>` that asks the question. Screen readers read it before each option.

Label it
: Put each radio inside its `<label>`, so clicking the words picks it and the target is at least 32px tall.

## Rules

Two to five options
: Radios suit a few choices you want people to see side by side. For six or more, use [Select](/components/select/).

Pick a default when you can
: Start with the most common answer chosen, like Card. Leave them all empty only when guessing would be wrong.

On or off is a checkbox
: A single yes or no is a [Checkbox](/components/checkbox/).

Round radios, square checkboxes
: Radios are round and checkboxes are square, so the two never look alike.
