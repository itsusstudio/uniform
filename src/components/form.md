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

```erb
<%%= form_with model: customer, class: "u-form" do |form| %>
  <hgroup>
    <h2><%%= t(".title") %></h2>
    <p><%%= t(".subtitle") %></p>
  </hgroup>
  <div class="u-field">
    <%%= form.label :name, t(".name") %>
    <%%= form.text_field :name, class: "u-input", autocomplete: "name", placeholder: " " %>
  </div>
  <div class="u-field">
    <%%= form.label :phone_number, t(".phone_number") %>
    <%%= form.telephone_field :phone_number, class: "u-input", autocomplete: "tel", placeholder: " " %>
  </div>
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
