---
layout: page
title: Combobox
summary: "A text field that filters a long list."
section: Components
permalink: /components/combobox/
---

A combobox finds one option in a long list as you type. Use it when a [select](/components/select/) would be too long to scroll.

<%= render "example_heading" %>

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/combobox_customer", id: "cb-live" %>
</div>
</div>

Click the field or press the down arrow to see everyone. Type “re” and the list
keeps the five names with “re” in them. “New customer” stays at the end,
whatever you type.

## Details in each option

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/combobox_customer_details", id: "cb-details" %>
</div>
</div>

When names alone could be mixed up, add details under each name, like a phone
number and email address. Put the name in the option's first `<span>` and each
detail in a `<span>` after it. Typing matches the details too, so “0142”,
“514 555” or “tremblay” finds a customer, and a phone number matches with or
without its dashes and spaces. Picking an option fills the field with the name
only.

## States

<div class="example-frame u-grid gap-6">
<div class="@grid:col-span-4 combobox-demo-open">
<div class="u-field">
<label for="cb-matches">Customer</label>
<u-combobox>
<input class="u-input" id="cb-matches" type="text" role="combobox" value="re" aria-expanded="true" aria-controls="cb-matches-list" aria-autocomplete="list" aria-activedescendant="cb-matches-1" autocomplete="off" placeholder=" ">
<ul id="cb-matches-list" role="listbox" aria-label="Customers">
<li class="u-combobox-option-active" id="cb-matches-1" role="option" aria-selected="false">Ana <mark>Re</mark>yes</li>
<li id="cb-matches-2" role="option" aria-selected="false">And<mark>re</mark> Morin</li>
<li id="cb-matches-3" role="option" aria-selected="false">Chloe T<mark>re</mark>mblay</li>
<li id="cb-matches-4" role="option" aria-selected="false">Ka<mark>re</mark>n O’Brien</li>
<li id="cb-matches-5" role="option" aria-selected="false">Tomás Her<mark>re</mark>ra</li>
<li id="cb-matches-6" role="option" data-action>New customer</li>
</ul>
</u-combobox>
</div>
</div>
<div class="@grid:col-span-4 combobox-demo-open">
<div class="u-field">
<label for="cb-picked">Customer</label>
<u-combobox>
<input class="u-input" id="cb-picked" type="text" role="combobox" value="Ana Reyes" aria-expanded="true" aria-controls="cb-picked-list" aria-autocomplete="list" aria-activedescendant="cb-picked-1" autocomplete="off" placeholder=" ">
<ul id="cb-picked-list" role="listbox" aria-label="Customers">
<li class="u-combobox-option-active" id="cb-picked-1" role="option" aria-selected="true">Ana Reyes</li>
<li id="cb-picked-2" role="option" aria-selected="false">Andre Morin</li>
<li id="cb-picked-3" role="option" aria-selected="false">Beatriz Costa</li>
<li id="cb-picked-4" role="option" aria-selected="false">Chloe Tremblay</li>
<li id="cb-picked-5" role="option" aria-selected="false">Daniel Okafor</li>
<li id="cb-picked-6" role="option" data-action>New customer</li>
</ul>
</u-combobox>
</div>
</div>
<div class="@grid:col-span-4 combobox-demo-open">
<div class="u-field">
<label for="cb-none">Customer</label>
<u-combobox>
<input class="u-input" id="cb-none" type="text" role="combobox" value="Quinn" aria-expanded="true" aria-controls="cb-none-list" aria-autocomplete="list" autocomplete="off" placeholder=" ">
<ul id="cb-none-list" role="listbox" aria-label="Customers">
<li id="cb-none-1" role="option" aria-disabled="true">No customers match</li>
<li id="cb-none-2" role="option" data-action>New customer</li>
</ul>
</u-combobox>
</div>
</div>
</div>

<div class="example-frame">
<div class="max-w-form u-form">
<div class="u-field">
<label for="cb-error">Customer</label>
<u-combobox>
<input class="u-input" id="cb-error" type="text" role="combobox" value="Ana Reye" aria-expanded="false" aria-controls="cb-error-list" aria-autocomplete="list" aria-invalid="true" aria-describedby="cb-error-message" autocomplete="off" placeholder=" ">
<ul id="cb-error-list" role="listbox" aria-label="Customers" popover="manual">
<li role="option" aria-selected="false">Ana Reyes</li>
<li role="option" aria-selected="false">Andre Morin</li>
<li role="option" aria-selected="false">Grace Kim</li>
<li role="option" aria-disabled="true" hidden>No customers match</li>
</ul>
</u-combobox>
<p class="u-error" id="cb-error-message">Pick a customer from the list, or add a new one.</p>
</div>
<div class="u-field">
<label for="cb-disabled">Customer</label>
<u-combobox>
<input class="u-input" id="cb-disabled" type="text" role="combobox" value="Marcus Lee" aria-expanded="false" aria-controls="cb-disabled-list" aria-autocomplete="list" aria-describedby="cb-disabled-hint" autocomplete="off" disabled placeholder=" ">
<ul id="cb-disabled-list" role="listbox" aria-label="Customers" popover="manual">
<li role="option" aria-selected="true">Marcus Lee</li>
</ul>
</u-combobox>
<small id="cb-disabled-hint">A job keeps its customer once it’s paid.</small>
</div>
</div>
</div>

Open with matches
: The option the arrow keys are on is filled grey, and the letters you typed are in medium weight.

Picked
: The picked option has a check, and the arrow keys start on it when the list reopens.

No matches
: One muted row says so in words, like “No customers match”. Keep the action row under it, so adding the customer is one step away.

Error
: Set `aria-invalid="true"` on the input and add a `u-error` under the combobox, as on a [text field](/components/text-field/).

Disabled
: The box and caret go grey. Say why in a hint.

## Without JavaScript

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/combobox_datalist" %>
</div>
</div>

```html
<%= inline_partial("examples/combobox_datalist") %>
```

```erb
<div class="u-field">
  <%%= form.label :watch_brand, t(".watch_brand") %>
  <%%= form.text_field :watch_brand, class: "u-input", list: form.field_id(:watch_brand, :list),
    autocomplete: "off", placeholder: " " %>
  <datalist id="<%%= form.field_id(:watch_brand, :list) %>">
    <%% WatchBrand.order(:name).each do |brand| %>
      <option value="<%%= brand.name %>"></option>
    <%% end %>
  </datalist>
</div>
```

An input with a `list` and a `<datalist>` filters as you type, with no script.
The list is the browser's own and can't be styled, and the field takes any text.
Use it when any answer is fine, like a watch brand. When the answer has to be
one of yours, like a customer with an id, use the combobox.

## Code

```html
<div class="u-field">
  <label for="job-customer">Customer</label>
  <u-combobox>
    <input class="u-input" id="job-customer" type="text"
      role="combobox" aria-expanded="false" aria-controls="job-customer-list"
      aria-autocomplete="list" autocomplete="off" placeholder=" ">
    <input type="hidden" name="customer_id">
    <ul id="job-customer-list" role="listbox" aria-label="Customers" popover="manual">
      <li role="option" aria-selected="false" data-value="18">Ana Reyes</li>
      <li role="option" aria-selected="false" data-value="12">Grace Kim</li>
      <li role="option" aria-selected="false" data-value="7">Marcus Lee</li>
      <li role="option" aria-disabled="true" hidden>No customers match</li>
      <li role="option" data-action>New customer</li>
    </ul>
  </u-combobox>
</div>
```

```erb
<div class="u-field">
  <%%= form.label :customer, t(".customer") %>
  <u-combobox>
    <%%= tag.input class: "u-input", id: form.field_id(:customer), type: "text",
      role: "combobox", aria: { expanded: false, controls: form.field_id(:customer, :list), autocomplete: "list" },
      autocomplete: "off", placeholder: " " %>
    <%%= form.hidden_field :customer_id %>
    <ul id="<%%= form.field_id(:customer, :list) %>" role="listbox" aria-label="<%%= t(".customers") %>" popover="manual">
      <%% customers.each do |customer| %>
        <li role="option" aria-selected="false" data-value="<%%= customer.id %>"><%%= customer.name %></li>
      <%% end %>
      <li role="option" aria-disabled="true" hidden><%%= t(".no_customers_match") %></li>
      <li role="option" data-action><%%= t(".new_customer") %></li>
    </ul>
  </u-combobox>
</div>
```

The list is a `popover="manual"`, so it sits above everything, even inside a
dialog, and the field keeps focus while you type.

Picking an option fills the field with its name, puts its `data-value` in the
hidden input, and fires `change` on the field. Picking the action row fires a
`combobox:action` event with what was typed, so you can open your new-customer
form with the name filled in.

Mark the no-matches row with `aria-disabled="true"` so the arrow keys skip it,
and the action row with `data-action`.

Load [`uniform.js`](/start/install/) and wrap the input and its list in
`<u-combobox>`. Fields added to the page later work too. Without the script, the
input is a plain text field, so give the form another way to pick a customer, or
use the [datalist](#without-javascript) version.

## Parts

<%= render "classes", classes_page: "/components/combobox/" %>

`u-field`, `u-input` and `u-error` work as on a
[text field](/components/text-field/).

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame combobox-demo-open">
<div class="u-field">
<label for="cb-dont">On the bench with</label>
<u-combobox>
<input class="u-input" id="cb-dont" type="text" role="combobox" aria-expanded="true" aria-controls="cb-dont-list" aria-autocomplete="list" autocomplete="off" placeholder=" ">
<ul id="cb-dont-list" role="listbox" aria-label="People">
<li role="option" aria-selected="false">Marco</li>
<li role="option" aria-selected="false">Priya</li>
<li role="option" aria-selected="false">Sam</li>
</ul>
</u-combobox>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A combobox for three people. There’s nothing to search, and typing is slower than picking.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-field">
<label for="cb-do">On the bench with</label>
<select class="u-input" id="cb-do">
<option>Marco</option>
<option>Priya</option>
<option>Sam</option>
</select>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>A select for a short list. Save the combobox for lists you’d rather search than scroll.</span></figcaption>
</figure>
</div>

## Accessibility

Combobox pattern
: It follows the WAI-ARIA combobox pattern. Focus stays in the input, and `aria-activedescendant` tells screen readers which option the arrow keys are on.

Keyboard
: Down and Up move through the list, opening it if it’s closed. Enter picks. Escape closes the list, and a second Escape clears the field. Home and End jump to the first and last option once you’re in the list. Tab leaves the field without picking.

Label it
: Give the input a `<label>` with a matching `for`, and the list an `aria-label` that names what's in it. Hints and errors go in `aria-describedby`.

Words for no matches
: The no-matches row says so in words, so it reads the same to everyone.

## Rules

Long lists only
: Use a combobox when you’d rather search the list than scroll it, like customers or brands. For a short list, use a [select](/components/select/).

One choice only
: A combobox picks one thing. Picking several needs a different component.

Try a datalist first
: If any typed answer is fine, an `<input list>` with a `<datalist>` does the job with no script.

Sort the list
: Sort options alphabetically, so the full list is easy to scan before anyone types.
