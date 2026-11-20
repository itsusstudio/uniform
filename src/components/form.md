---
layout: page
title: Form
summary: "Spacing for the parts of a form."
section: Layout
permalink: /components/form/
---

`u-form` spaces everything in a form, so nobody picks a gap. Fields sit 16px apart, and the heading, fields and buttons 24px apart.

## Example

<div class="example-frame">
<div class="max-w-form">
<form class="u-form" action="#example">
<hgroup>
<h3>New customer</h3>
<p>We text them when their job is ready.</p>
</hgroup>
<div class="u-field">
<label for="form-name">Customer name</label>
<input class="u-input" id="form-name" autocomplete="off" placeholder=" ">
</div>
<div class="u-field">
<label for="form-phone">Phone number</label>
<input class="u-input" id="form-phone" type="tel" autocomplete="off" placeholder=" ">
</div>
<div class="u-actions">
<button type="button" class="u-btn u-btn-primary">Save customer</button>
<button type="button" class="u-btn u-btn-ghost">Cancel</button>
</div>
</form>
</div>
</div>

## With errors

A problem with one field shows under that field. A problem with the whole
form, like a failed save, shows in a danger [banner](/components/banner/) at
the top, saying what happened. A message about why someone landed on the
page, like a code that ran out, isn't a failure: it goes under the page's
heading as a `u-error` line.

<div class="example-frame">
<div class="max-w-form">
<form class="u-form" action="#example">
<hgroup>
<h3>New customer</h3>
<p>We text them when their job is ready.</p>
</hgroup>
<div class="u-banner u-banner-danger" role="alert">
<p>We couldn’t save this customer.</p>
</div>
<div class="u-field">
<label for="form-error-name">Customer name</label>
<input class="u-input" id="form-error-name" autocomplete="off" placeholder=" " aria-invalid="true" aria-describedby="form-error-name-error">
<p class="u-error" id="form-error-name-error">Enter the customer’s name.</p>
</div>
<div class="u-field">
<label for="form-error-phone">Phone number</label>
<input class="u-input" id="form-error-phone" type="tel" value="416 555 01" autocomplete="off" placeholder=" " aria-invalid="true" aria-describedby="form-error-phone-error">
<p class="u-error" id="form-error-phone-error">Enter all 10 digits of the phone number.</p>
</div>
<div class="u-actions">
<button type="button" class="u-btn u-btn-primary">Save customer</button>
<button type="button" class="u-btn u-btn-ghost">Cancel</button>
</div>
</form>
</div>
</div>

## Code

```html
<form class="u-form" action="/customers" method="post">
  <hgroup>
    <h2>New customer</h2>
    <p>We text them when their job is ready.</p>
  </hgroup>
  <div class="u-field">…</div>
  <div class="u-field">…</div>
  <div class="u-actions">
    <button type="submit" class="u-btn u-btn-primary">Save customer</button>
  </div>
</form>
```

In Rails, `uniform_form_with` is `form_with` with Uniform's form builder.
Give a field `label:` and it writes the whole `u-field`: the label, the
input, an optional `hint:`, and the error with `aria-invalid` set. The error
is the model's own message; `messages:` words it per error type for one form.

```erb
<%%= uniform_form_with model: customer do |form| %>
  <hgroup>
    <h2><%%= t(".title") %></h2>
    <p><%%= t(".subtitle") %></p>
  </hgroup>
  <%% if flash.now[:alert] %>
    <div class="u-banner u-banner-danger" role="alert"><p><%%= flash.now[:alert] %></p></div>
  <%% end %>
  <%%= form.text_field :name, label: t(".name"), autocomplete: "name" %>
  <%%= form.telephone_field :phone_number, label: t(".phone_number"), autocomplete: "tel",
        messages: {invalid: t(".phone_number_invalid")} %>
  <div class="u-actions">
    <%%= form.button t(".save"), class: "u-btn u-btn-primary" %>
  </div>
<%% end %>
```

A field inside a custom element, like `<u-input-phone>`, counts as a field. So
does a `u-fieldset` of checkboxes or radios.

A form without a model, like a sign-in form posting flat params, has no model
errors to read. Pass the message yourself with `error:`, and the field gets the
same `u-error` and `aria-invalid` as a model error would give it.

```erb
<%%= uniform_form_with url: login_path do |form| %>
  <%%= form.email_field :email_address, label: t(".email_address"),
        value: @email_address, error: @field_error, autocomplete: "email" %>
<%% end %>
```

`form.code_field` writes a [code input](/components/input-code/): six boxes in
a `<u-input-code>`, with the right `inputmode`, `autocomplete` and `pattern`.
Add `submit: true` to send the form once the last digit is in, and `length:`
for a code that isn't six digits.

```erb
<%%= form.code_field :code, label: t(".code"), error: @field_error, submit: true, autofocus: true %>
```

## Fields side by side

Put two or three short fields in a `u-field-row` when each would otherwise
fill a whole line with a few characters, like a status and a reference
number. They sit side by side while each has at least 224px, and stack on a
narrower screen. Keep a field that needs room, like a toggle group or a
description, on its own line.

<div class="example-frame">
<div class="max-w-form">
<form class="u-form" action="#example">
<div class="u-field-row">
<div class="u-field">
<label for="form-row-status">Status</label>
<select class="u-input" id="form-row-status"><option>Draft</option><option>In progress</option></select>
</div>
<div class="u-field">
<label for="form-row-reference">Client reference</label>
<input class="u-input" id="form-row-reference" autocomplete="off" placeholder=" ">
<small>Their bag tag or order number.</small>
</div>
</div>
<div class="u-field">
<label for="form-row-description">Description</label>
<textarea class="u-input" id="form-row-description" rows="3"></textarea>
</div>
</form>
</div>
</div>

```html
<div class="u-field-row">
  <div class="u-field">…</div>
  <div class="u-field">…</div>
</div>
```

## Time zone

Wrap a hidden input in `<u-time-zone>` to send the browser's time zone with
the form, like America/Toronto, so the server can set up an account in the
right zone without asking. It fills the input only when it's empty, so a value
the server set wins. Without a script the input stays empty: treat a blank or
unknown zone as "use the default".

```html
<u-time-zone><input type="hidden" name="time_zone"></u-time-zone>
```

```erb
<u-time-zone><%%= form.hidden_field :time_zone %></u-time-zone>
```

## Parts

<%= render "classes", classes_page: "/components/form/" %>

## Rules

Fields go in a form
: Put every group of fields in a `u-form`, never a `flex flex-col` with a gap picked by hand. Gaps picked by hand drift, and forms stop matching from one screen to the next.
