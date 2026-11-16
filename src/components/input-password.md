---
layout: page
title: "Input: password"
summary: "A password field with a show button."
section: Components
permalink: /components/input-password/
---

A password field lets people check what they typed before signing in. It's a [text field](/components/text-field/) with one extra button.

<%= render "example_heading" %>

<div class="example-frame">
<div class="u-max-width-form u-form">
<%= render "examples/text_field_password", id: "tf-password", label: "Password", autocomplete: "current-password" %>
<div class="u-field">
<label for="tf-password-shown">Password</label>
<u-input-password>
<input class="u-input" id="tf-password-shown" type="text" value="bench-1042" autocomplete="off" placeholder=" ">
<button type="button" aria-label="Show password" aria-pressed="true" aria-controls="tf-password-shown"></button>
</u-input-password>
</div>
</div>

</div>

Press the eye to show the password. Submitting the form hides it again, so the
browser saves it as a password.

```html
<%= raw render("examples/text_field_password", id: "password", label: "Password", autocomplete: "current-password").strip %>
```

```erb
<div class="u-field">
  <%%= form.label :password, t(".password") %>
  <u-input-password>
    <%%= form.password_field :password, class: "u-input", autocomplete: "current-password", required: true, placeholder: " " %>
    <%%= tag.button type: "button", hidden: true,
      aria: { label: t(".show_password"), pressed: false, controls: form.field_id(:password) } %>
  </u-input-password>
</div>
```

Set `autocomplete="current-password"` on a sign-in form and
`autocomplete="new-password"` where someone picks a new one, so password
managers fill the first and suggest a strong one for the second.

Leave the button empty and `hidden`, and load [`uniform.js`](/start/install/).
The eye is drawn for you.

## Parts

<%= render "classes", classes_page: "/components/input-password/" %>

## Accessibility

Show password
: The toggle is a real `<button>` with `aria-label="Show password"` and `aria-pressed`. The label stays the same, and `aria-pressed` says whether the password is showing.
