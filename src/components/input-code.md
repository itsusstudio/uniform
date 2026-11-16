---
layout: page
title: "Input: code"
summary: "One box per digit for a one-time code."
section: Components
permalink: /components/input-code/
---

A code input takes a one-time code, like the six digits that sign someone in. It's one [text field](/components/text-field/) wrapped in `<u-input-code>`.

<%= render "example_heading" %>

<div class="example-frame">
<div class="u-row u-row-top u-gap-12">
<%= render "examples/text_field_code", id: "tf-code" %>
<%= render "examples/text_field_code", id: "tf-code-wrong", value: "482915", error: "That code doesn’t match. Check your latest email." %>
</div>
</div>

`<u-input-code>` draws one box per digit of the input's `maxlength`. It's one
input underneath, so paste and backspace work as usual. Add `submit` to send
the form on the last digit.

```html
<%= raw render("examples/text_field_code", id: "code").strip %>
```

```erb
<div class="u-field">
  <%%= form.label :code, t(".code") %>
  <u-input-code>
    <%%= form.text_field :code, class: "u-input", inputmode: "numeric", autocomplete: "one-time-code",
      pattern: "[0-9]{6}", maxlength: 6, required: true,
      aria: { describedby: form.field_id(:code, :hint) }, placeholder: " " %>
  </u-input-code>
  <small id="<%%= form.field_id(:code, :hint) %>"><%%= t(".code_hint", count: 10) %></small>
</div>
```

## Parts

<%= render "classes", classes_page: "/components/input-code/" %>

## Accessibility

One field
: The boxes are `aria-hidden="true"`. Screen readers hear the one input, named by its label, and read the code as you type it.

Errors in words
: Set `aria-invalid="true"` on a wrong code to turn every box red. The `u-error` under the boxes says what to do next.

## Rules

Say how long the code works
: Put it in the hint, like "The code works for 10 minutes."

Fill it from a text
: Set `inputmode="numeric"` and `autocomplete="one-time-code"`, so phones show the number pad and offer the code.
