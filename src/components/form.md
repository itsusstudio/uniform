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
<div class="u-max-width-form">
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
the top, saying what happened.

<div class="example-frame">
<div class="u-max-width-form">
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

## Parts

<%= render "classes", classes_page: "/components/form/" %>

## Rules

Fields go in a form
: Put every group of fields in a `u-form`, never a `u-stack` with a gap. Gaps picked by hand drift, and forms stop matching from one screen to the next.
