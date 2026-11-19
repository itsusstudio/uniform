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
<div class="flex flex-wrap items-center gap-2 items-start gap-12">
<%= render "examples/text_field_code", id: "tf-code" %>
<%= render "examples/text_field_code", id: "tf-code-wrong", value: "482915", error: "That code doesn’t match. Check your latest email." %>
</div>
</div>

`<u-input-code>` draws one box per digit of the input's `maxlength`. It's one
input underneath, so paste and backspace work as usual. Add `submit` to send
the form on the last digit.

```html
<%= inline_partial("examples/text_field_code", id: "code") %>
```

```erb
<div class="u-field">
  <%%= form.label :code, t(".code") %>
  <u-input-code>
    <%%= form.text_field :code, class: "u-input", inputmode: "numeric", autocomplete: "one-time-code",
      pattern: "[0-9]{6}", maxlength: 6, required: true,
      placeholder: " " %>
  </u-input-code>
</div>
```

## Parts

<%= render "classes", classes_page: "/components/input-code/" %>

## Accessibility

One field
: The boxes are `aria-hidden="true"`. Screen readers hear the one input, named by its label, and read the code as you type it.

Errors in words
: Set `aria-invalid="true"` on a wrong code to put the vermilion ring around every box. The `u-error` under the boxes says what to do next.

## Rules

Say how long the code works in the email
: The email gives the time limit next to the code. The screen leaves it out, and a code that ran out gets an error that says to send a new one.

Fill it from a text
: Set `inputmode="numeric"` and `autocomplete="one-time-code"`, so phones show the number pad and offer the code.
