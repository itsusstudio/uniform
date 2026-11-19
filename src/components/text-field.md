---
layout: page
title: Text field
summary: "A labelled box to type in."
section: Components
permalink: /components/text-field/
---

A text field is where someone types a short answer or a note. Money, search,
email addresses and notes use the same box, with one small addition each.

<%= render "example_heading" %>

<div class="example-frame">
<div class="max-w-form u-form">
<div class="u-field">
<label for="tf-name">Customer name</label>
<input class="u-input" id="tf-name" value="Ana Reyes" autocomplete="name" placeholder=" ">
</div>
<div class="u-field">
<label for="tf-phone">Phone number</label>
<input class="u-input" id="tf-phone" type="tel" value="416 555 0199" aria-describedby="tf-phone-hint" autocomplete="tel" placeholder=" ">
<small id="tf-phone-hint">We text this number when the job is ready.</small>
</div>
<div class="u-field">
<label for="tf-quote">Quote</label>
<div class="u-input-prefixed">
<span>$</span>
<input class="u-input u-data" id="tf-quote" inputmode="decimal" value="85.00" placeholder=" ">
</div>
</div>
<div class="u-field">
<label for="tf-notes">Notes for the bench <span>(optional)</span></label>
<textarea class="u-input" id="tf-notes" rows="3">Size 6 to 7. Customer wants the engraving kept.</textarea>
</div>
</div>
</div>

Phone numbers and one-time codes have their own pages:
[Phone number](/components/input-phone/) and [Code input](/components/input-code/).

In a [consumer](/start/audience/) product, the label sits inside the box and
moves to the top when you type or tab in. Give every text input `placeholder=" "`
so the same markup works for both audiences. In Rails that's `placeholder: " "`
on the field helper. With a real placeholder, like `name@example.com`, the label
stays at the top.

A field with no visible label, like a search box, is the height of a button.

Put fields in a [`u-form`](/components/form/).

## States

<div class="example-frame">
<div class="max-w-form u-form">
<div class="u-field">
<label for="tf-empty">Customer email address</label>
<input class="u-input" id="tf-empty" type="email" placeholder="name@example.com">
</div>
<div class="u-field">
<label for="tf-error">Phone number</label>
<input class="u-input" id="tf-error" type="tel" value="416 555 01" aria-invalid="true" aria-describedby="tf-error-message" placeholder=" ">
<p class="u-error" id="tf-error-message">Enter all 10 digits of the phone number.</p>
</div>
<div class="u-field">
<label for="tf-disabled">Job number</label>
<input class="u-input u-data" id="tf-disabled" value="#1042" disabled aria-describedby="tf-disabled-hint" placeholder=" ">
<small id="tf-disabled-hint">Set when the job is created.</small>
</div>
</div>
</div>

Empty
: A placeholder can show the shape of an answer, like `name@example.com`. It never replaces the label.

Error
: Set `aria-invalid="true"` on the input and put a `u-error` under it saying what to fix. The error takes the hint's place, so write it to say what to do, like "Enter your business name." A failure of the whole form, like a save that didn't go through, goes in a danger [banner](/components/banner/) instead.

Disabled
: Greyed out and skipped by the keyboard. Add a hint saying why.

## Money

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_money" %>
</div>
</div>

Wrap the input and a `<span>` holding the `$` in `u-input-prefixed`, and add
`u-data` to the input so the amount is in mono.

```html
<%= raw render("examples/text_field_money").strip %>
```

```erb
<div class="u-field">
  <%%= form.label :quote, t(".quote") %>
  <div class="u-input-prefixed">
    <span><%%= t("number.currency.format.unit") %></span>
    <%%= form.text_field :quote, class: "u-input u-data", inputmode: "decimal", autocomplete: "off",
      value: number_with_precision(form.object.quote, precision: 2),
      aria: { describedby: form.field_id(:quote, :hint) }, placeholder: " " %>
  </div>
  <small id="<%%= form.field_id(:quote, :hint) %>"><%%= t(".quote_hint") %></small>
</div>
```

Use `inputmode="decimal"` on a plain text input for a keypad with a decimal
point. A `type="number"` field changes the amount when you scroll past it and
drops trailing zeros. Accept what people type, like `85` or `85.5`, and let the
server turn it into `85.00` or say what to fix.

## Search

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_search" %>
</div>
</div>

Wrap a search input in `u-input-prefixed` for the magnifying glass. Enter runs
the search. Put the form in a `<search>` element so screen readers list it as
the page’s search, and add `role="search"` to the form for browsers that don’t
know `<search>`.

```html
<%= raw render("examples/text_field_search", code: true).strip %>
```

```erb
<search>
  <%%= form_with url: jobs_path, method: :get do |form| %>
    <div class="u-field">
      <%%= form.label :q, t(".search") %>
      <div class="u-input-prefixed">
        <%%= form.search_field :q, value: params[:q], class: "u-input",
          placeholder: t(".search_placeholder"), enterkeyhint: "search" %>
      </div>
    </div>
  <%% end %>
</search>
```

The browser’s own clear button is hidden, and Escape still clears the field in
Chrome and Safari. If a screen needs a clear button, add one beside the field,
like the filter chips on a [data table](/patterns/data-table/).

## Email address

<div class="example-frame">
<div class="max-w-form u-form">
<%= render "examples/text_field_email" %>
<div class="u-field">
<label for="tf-email-error">Email address</label>
<input class="u-input" id="tf-email-error" type="email" value="ana.reyes.gmail.com" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" aria-invalid="true" aria-describedby="tf-email-error-message" placeholder=" ">
<p class="u-error" id="tf-email-error-message">That email address is missing an @. Check it and try again.</p>
</div>
</div>
</div>

Label it “Email address”, since “email” is the message. `type="email"` brings
up a keyboard with an @ on phones, and `autocomplete="email"` lets the browser
fill it in.

```html
<%= raw render("examples/text_field_email").strip %>
```

```erb
<%% invalid = customer.errors.include?(:email_address) %>
<div class="u-field">
  <%%= form.label :email_address, t(".email_address") %>
  <%%= form.email_field :email_address, class: "u-input", inputmode: "email", autocomplete: "email",
    autocapitalize: "off", spellcheck: false, required: true, placeholder: " ",
    aria: { invalid: invalid, describedby: (form.field_id(:email_address, :error) if invalid) } %>
  <%% if invalid %>
    <p class="u-error" id="<%%= form.field_id(:email_address, :error) %>"><%%= customer.errors.full_messages_for(:email_address).first %></p>
  <%% end %>
</div>
```

With `required` and `type="email"`, the browser checks the address on submit and
shows its own message. Check it on the server too, since the browser accepts
addresses like `ana@gmail`. When the server finds a problem, send the page back
with `aria-invalid="true"` on the input and a `u-error` saying what to change.

## Text area

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/text_field_textarea" %>
</div>
</div>

For notes longer than a line. It grows as you type, and you can drag it taller
or shorter.

It starts one line tall, and `rows` has no effect because the field sizes to
its content. Set `--u-input-rows` to start a textarea taller, for example 4 for
notes: `style="--u-input-rows: 4"`.

```html
<%= raw render("examples/text_field_textarea").strip %>
```

```erb
<u-character-count>
  <div class="u-field">
    <%%= form.label :notes do %>
      <%%= t(".notes") %> <span><%%= t(".optional") %></span>
    <%% end %>
    <%%= form.text_area :notes, class: "u-input", rows: 2, maxlength: 500,
      aria: { describedby: form.field_id(:notes, :count) } %>
    <small id="<%%= form.field_id(:notes, :count) %>"><%%= t(".notes_limit", count: 500) %></small>
  </div>
</u-character-count>
```

When there’s a limit, set `maxlength` and end the field with a `<small>` hint that
names it, like “Up to 500 characters”. Wrap the field in `<u-character-count>`
from [`uniform.js`](/start/install/) and the hint counts as you type: “47 of 500”.
Set `data-count` on the element to word it in the page’s language, with `{count}`
and `{max}` where the numbers go.

## Code

```html
<div class="u-field">
  <label for="phone">Phone number</label>
  <input class="u-input" id="phone" type="tel" aria-describedby="phone-hint" placeholder=" ">
  <small id="phone-hint">We text this number when the job is ready.</small>
</div>

<div class="u-field">
  <label for="quote">Quote</label>
  <div class="u-input-prefixed">
    <span>$</span>
    <input class="u-input u-data" id="quote" inputmode="decimal" placeholder=" ">
  </div>
</div>

<div class="u-field">
  <label for="notes">Notes <span>(optional)</span></label>
  <textarea class="u-input" id="notes" rows="3"></textarea>
</div>
```

```erb
<div class="u-field">
  <%%= form.label :phone_number, t(".phone_number") %>
  <%%= form.telephone_field :phone_number, class: "u-input",
    aria: { describedby: form.field_id(:phone_number, :hint) }, placeholder: " " %>
  <small id="<%%= form.field_id(:phone_number, :hint) %>"><%%= t(".phone_number_hint") %></small>
</div>

<div class="u-field">
  <%%= form.label :quote, t(".quote") %>
  <div class="u-input-prefixed">
    <span><%%= t("number.currency.format.unit") %></span>
    <%%= form.text_field :quote, class: "u-input u-data", inputmode: "decimal", placeholder: " " %>
  </div>
</div>

<div class="u-field">
  <%%= form.label :notes do %>
    <%%= t(".notes") %> <span><%%= t(".optional") %></span>
  <%% end %>
  <%%= form.text_area :notes, class: "u-input", rows: 3 %>
</div>
```

## Classes

<%= render "classes", classes_page: "/components/text-field/" %>

Add `u-data` to an input that holds figures, codes or dates.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-field">
<input class="u-input" placeholder="Customer name" aria-label="Customer name">
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A placeholder in place of a label. It disappears the moment someone types, and so does the question.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-field">
<label for="tf-do-name">Customer name</label>
<input class="u-input" id="tf-do-name" placeholder=" ">
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>A label above the box that stays put while you type.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-field">
<label for="tf-dont-due">Due date</label>
<input class="u-input u-data" id="tf-dont-due" value="Nov 31" aria-invalid="true" aria-describedby="tf-dont-due-error" placeholder=" ">
<p class="u-error" id="tf-dont-due-error">Invalid input.</p>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>An error that only says something is wrong. The customer is waiting and you still don’t know what to type.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-field">
<label for="tf-do-due">Due date</label>
<input class="u-input u-data" id="tf-do-due" value="Nov 31" aria-invalid="true" aria-describedby="tf-do-due-error" placeholder=" ">
<p class="u-error" id="tf-do-due-error">November has 30 days. Pick a date up to Nov 30.</p>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>An error that says what to change, in plain words.</span></figcaption>
</figure>
</div>

## Accessibility

Label every field
: Each input has a `<label>` with a matching `for`, so clicking the label puts the cursor in the box and screen readers read its name.

Connect the help
: Give the hint and error ids and list them in the input's `aria-describedby`. Screen readers read them after the label.

Errors in words
: Always say what's wrong in a sentence. The vermilion ring only catches the eye.

Focus the first error
: When a form comes back with errors, uniform.js puts the cursor in the first field with `aria-invalid="true"`, over any `autofocus`, so people land on what to fix and screen readers read its error. Keep `autofocus` on the first field for a fresh form.

Right keyboard
: Use the right `type` or `inputmode` (`tel`, `email`, `decimal`) so phones show the right keys, and `autocomplete` where it fits.

Counting quietly
: Put the count’s hint in the textarea’s `aria-describedby`, so it’s read when the field gets focus. It isn’t a live region, so it isn’t read out on every key.

## Rules

Accept what people type
: Let people type freely, with no masks that block keys or force a pattern. The server formats what they typed, or says what to change. A [phone number field](/components/input-phone/) only regroups the digits it’s given.
