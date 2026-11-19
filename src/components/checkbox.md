---
layout: page
title: Checkbox
summary: "The browser's checkbox, styled."
section: Components
permalink: /components/checkbox/
---

A checkbox turns one thing on or off, or picks several from a list. The whole label is the target.

## Example

<div class="example-frame flex flex-col gap-6">
<label class="u-checkbox"><input type="checkbox" checked> Text the customer when the job is ready</label>
<label class="u-checkbox"><input type="checkbox"> Keep me signed in<span class="u-checkbox-hint">On this device for 30 days.</span></label>
<fieldset class="u-fieldset">
<legend>Show jobs that are</legend>
<label class="u-checkbox"><input type="checkbox" checked> On the bench</label>
<label class="u-checkbox"><input type="checkbox" checked> Waiting on the customer</label>
<label class="u-checkbox"><input type="checkbox"> Ready for pickup</label>
</fieldset>
</div>

## States

<div class="example-frame flex flex-wrap items-center gap-6">
<label class="u-checkbox"><input type="checkbox"> Off</label>
<label class="u-checkbox"><input type="checkbox" checked> On</label>
<label class="u-checkbox"><input type="checkbox" id="checkbox-mixed"> Some</label>
<label class="u-checkbox"><input type="checkbox" disabled> Disabled</label>
<label class="u-checkbox"><input type="checkbox" checked disabled> Disabled, on</label>
</div>

Use “Some”, the indeterminate state, for a box that controls a group with only
part of it ticked. Set it in JavaScript: `checkbox.indeterminate = true`.

## Code

```html
<label class="u-checkbox">
  <input type="checkbox" name="remember">
  Keep me signed in
  <span class="u-checkbox-hint">On this device for 30 days.</span>
</label>

<fieldset>
  <legend>Show jobs that are</legend>
  <label class="u-checkbox"><input type="checkbox"> On the bench</label>
  <label class="u-checkbox"><input type="checkbox"> Ready for pickup</label>
</fieldset>
```

```erb
<label class="u-checkbox">
  <%%= form.check_box :remember_me %>
  <%%= t(".remember_me") %>
  <span class="u-checkbox-hint"><%%= t(".remember_me_hint", count: 30) %></span>
</label>

<fieldset>
  <legend><%%= t(".show_jobs_that_are") %></legend>
  <%% Job::FILTER_STATUSES.each do |status| %>
    <label class="u-checkbox"><%%= check_box_tag "status[]", status, Array(params[:status]).include?(status), id: nil %> <%%= t(".statuses.#{status}") %></label>
  <%% end %>
</fieldset>
```

Put the input first, inside the label. A hint goes in `u-checkbox-hint`.

## Parts

<%= render "classes", classes_page: "/components/checkbox/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<fieldset class="u-fieldset"><legend>Paid by</legend>
<label class="u-checkbox"><input type="checkbox" checked> Card</label>
<label class="u-checkbox"><input type="checkbox"> Cash</label>
</fieldset>
</div>
<figcaption class="example-caption example-caption-dont"><span>Checkboxes for a choice where only one answer can be true. That's a radio.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<label class="u-checkbox"><input type="checkbox" checked> Text the customer when the job is ready</label>
</div>
<figcaption class="example-caption example-caption-do"><span>A checkbox for something that's simply on or off, with a label that says what “on” means.</span></figcaption>
</figure>
</div>

## Accessibility

Real input
: It's a native checkbox, so Space toggles it and screen readers announce its state.

Label it
: Put every checkbox inside its `<label>`, so clicking the words ticks the box.

Group with a fieldset
: Related checkboxes go in a `<fieldset>` with a `<legend>` that asks the question.

## Rules

Radios for a single answer
: If only one option can be true, use a [radio](/components/radio/).

Square, like a field
: The box is square because it's a field you fill in. Radios are round, so the two never look alike.

Say what ticking does
: The label says what happens when it's ticked, like “Text me when it's ready”.

One answer that rules out the rest
: For an answer like “Nothing yet” in a group of “tick all that apply”, add `data-u-exclusive` to its checkbox inside the `u-fieldset`. Ticking it clears the other boxes, and ticking any other box clears it. Check the same rule on the server.

<script>document.getElementById("checkbox-mixed").indeterminate = true</script>
