---
layout: page
title: "Input: phone number"
summary: "A phone field that groups digits as you type."
section: Components
permalink: /components/input-phone/
---

A phone number field groups the digits as you type or paste. It's a [text field](/components/text-field/) wrapped in `<u-input-phone>`.

<%= render "example_heading" %>

<div class="example-frame">
<div class="max-w-form flex flex-col gap-4">
<%= render "examples/text_field_phone", id: "tf-phone-new" %>
</div>
</div>

Wrap the field in `<u-input-phone>` and the number groups itself as you type or
paste, like (416) 555-0142. Spaces, dashes and dots are fine: the field keeps
only the digits and groups them again. The digits keep
an even width, so numbers line up.

```html
<%= raw render("examples/text_field_phone", id: "phone").strip %>
```

```erb
<%% invalid = customer.errors.include?(:phone_number) %>
<u-input-phone>
  <div class="u-field">
    <%%= form.label :phone_number, t(".phone_number") %>
    <%%= form.telephone_field :phone_number, class: "u-input", inputmode: "tel", autocomplete: "tel",
      aria: { invalid: invalid, describedby: [form.field_id(:phone_number, :hint), (form.field_id(:phone_number, :error) if invalid)] },
      placeholder: " " %>
    <small id="<%%= form.field_id(:phone_number, :hint) %>"><%%= t(".phone_number_hint") %></small>
    <%%= tag.p t(".phone_number_error"), class: "u-error", id: form.field_id(:phone_number, :error), hidden: !invalid %>
  </div>
</u-input-phone>
```

Set `type="tel"` for the number keypad and `autocomplete="tel"` so the browser
can fill in a saved number.

## A saved number

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_phone", id: "tf-phone-saved", phone_value: "4165550142" %>
</div>
</div>

Send the number as it’s stored, and the field groups it when the page loads.

## Outside North America

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_phone", id: "tf-phone-world", phone_value: "+442079460958" %>
</div>
</div>

A number that starts with `+` keeps its country code, then the rest goes in
blocks of three with four at the end. London’s 020 7946 0958 shows as
+44 207 946 0958, not in the British style. A leading 1 shows as
+1 (416) 555-0142. For a shop outside North America, set `region` on
`<u-input-phone>` (`CA` is the default), and its numbers without a `+` go in the
same blocks.

## Too short or too long

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_phone", id: "tf-phone-error", phone_value: "416 555 01", invalid: true %>
</div>
</div>

The field checks the length when you leave it or submit the form: ten digits
for Canada and the US, 8 to 15 with a country code. A wrong length sets
`aria-invalid="true"` and shows the field's `hidden` `u-error`. It also gives the
field the error's words as its validation message, so the browser stops the form,
moves focus to the field and says why. Fixing the number clears it.

## What the server gets

The form sends what’s in the box, like `(416) 555-0142`. On the server, strip
everything but the digits and a leading `+`, then check and store the number in
E.164, like `+14165550142`. In Rails, [Phonelib](https://github.com/daddyz/phonelib)
does both.

To get the digits on their own, add an `<input type="hidden" name="phone_digits">`
inside `<u-input-phone>`. The script fills it with the digits, and the `+` when
the number has one.

## Parts

<%= render "classes", classes_page: "/components/input-phone/" %>

## Accessibility

Grouping quietly
: Nothing announces the regrouping, and the cursor stays after the digit you just typed. Backspace after a bracket, space or dash deletes the digit before it. The length error waits for blur or submit, so a half-typed number is never read out as wrong. An error that appears on blur is read out a moment later, after the next field.

## Rules

Accept what people type
: Never block a key or force a pattern on a phone number. The field only regroups the digits it's given.
