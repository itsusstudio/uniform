---
layout: page
title: Toggle group
summary: "Picks one of a few ways to see the same thing."
section: Components
permalink: /components/toggle-group/
---

A toggle group picks one of two to four short choices, like Today, This week or All. It's a set of radios drawn as joined pills, so it needs no script.

## Example

<div class="example-frame">
<%= render "examples/toggle_group_due" %>
</div>

The browser keeps one picked, and the value goes with the form. For more than
four choices, or longer words, use a [select](/components/select/) or
[radios](/components/radio/).

## With panels

<div class="example-frame">
<u-toggle-panels data-group="docs-example">
<fieldset class="u-fieldset" hidden>
<legend class="sr-only">Pay with</legend>
<div class="u-toggle-group">
<label><input type="radio" name="docs-example" value="card" checked> Card</label>
<label><input type="radio" name="docs-example" value="cash"> Cash</label>
</div>
</fieldset>
<section data-value="card">
<h3>Card</h3>
<p>Tap or insert the card on the reader, then press Take payment.</p>
</section>
<section data-value="cash">
<h3>Cash</h3>
<p>Count the cash into the drawer, then type the amount you were given.</p>
</section>
</u-toggle-panels>
</div>

Wrap the group and one `<section>` per choice in `<u-toggle-panels>` to show
only the picked one. Each section has a `data-value` and starts with a title.
`data-group` remembers the choice, and every set in the same group switches
together, like the HTML and Rails code on these pages.

## States

<div class="example-frame flex flex-wrap items-center gap-6">
<div class="u-toggle-group">
<label><input type="radio" name="toggle-states" checked> Today</label>
<label><input type="radio" name="toggle-states"> This week</label>
<label><input type="radio" name="toggle-states" disabled> All</label>
</div>
<fieldset class="u-fieldset" disabled>
<legend class="sr-only">Due</legend>
<div class="u-toggle-group">
<label><input type="radio" name="toggle-states-off" checked> Today</label>
<label><input type="radio" name="toggle-states-off"> This week</label>
<label><input type="radio" name="toggle-states-off"> All</label>
</div>
</fieldset>
</div>

Disable one choice, or the whole group with a disabled `<fieldset>`.

## Code

```html
<fieldset class="u-fieldset">
  <legend class="sr-only">Due</legend>
  <div class="u-toggle-group">
    <label><input type="radio" name="due" value="today"> Today</label>
    <label><input type="radio" name="due" value="week" checked> This week</label>
    <label><input type="radio" name="due" value="all"> All</label>
  </div>
</fieldset>
```

```erb
<fieldset class="u-fieldset">
  <legend class="sr-only"><%%= t(".due") %></legend>
  <div class="u-toggle-group">
    <%% %w[today week all].each do |due| %>
      <label><%%= radio_button_tag :due, due, params.fetch(:due, "week") == due, id: nil %> <%%= t(".due_options.#{due}") %></label>
    <%% end %>
  </div>
</fieldset>
```

```html
<u-toggle-panels data-group="payment">
  <fieldset class="u-fieldset" hidden>
    <legend class="sr-only">Pay with</legend>
    <div class="u-toggle-group">
      <label><input type="radio" name="payment" value="card" checked> Card</label>
      <label><input type="radio" name="payment" value="cash"> Cash</label>
    </div>
  </fieldset>
  <section data-value="card">
    <h3>Card</h3>
    …
  </section>
  <section data-value="cash">
    <h3>Cash</h3>
    …
  </section>
</u-toggle-panels>
```

```erb
<u-toggle-panels data-group="payment">
  <fieldset class="u-fieldset" hidden>
    <legend class="sr-only"><%%= t(".pay_with") %></legend>
    <div class="u-toggle-group">
      <%% %w[card cash].each do |method| %>
        <label><%%= radio_button_tag :payment, method, method == "card", id: nil %> <%%= t(".methods.#{method}") %></label>
      <%% end %>
    </div>
  </fieldset>
  <%% %w[card cash].each do |method| %>
    <section data-value="<%%= method %>">
      <h3><%%= t(".methods.#{method}") %></h3>
      <%%= render "payments/#{method}_steps", job: job %>
    </section>
  <%% end %>
</u-toggle-panels>
```

Put the question in the `<legend>`, hidden with `sr-only` when the
title above already says it. To apply a choice the moment it's picked, listen
for `change` or submit the form. Without JavaScript, every panel shows under
its title.

## Parts

<%= render "classes", classes_page: "/components/toggle-group/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame flex flex-wrap items-center gap-2">
<u-toggle><button type="button" class="u-toggle" aria-pressed="true">Today</button></u-toggle>
<u-toggle><button type="button" class="u-toggle" aria-pressed="true">This week</button></u-toggle>
<u-toggle><button type="button" class="u-toggle" aria-pressed="false">All</button></u-toggle>
</div>
<figcaption class="example-caption example-caption-dont"><span>Separate toggles for a choice where only one can be true. Two are pressed, and nobody knows which list they're seeing.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-toggle-group">
<label><input type="radio" name="toggle-do" checked> Today</label>
<label><input type="radio" name="toggle-do"> This week</label>
<label><input type="radio" name="toggle-do"> All</label>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>A toggle group. The browser keeps one choice picked, so the list always matches it.</span></figcaption>
</figure>
</div>

## Accessibility

Real radios
: It's a native radio group in a `<fieldset>`, so Tab goes to the picked choice, arrow keys move between them and the legend names the group.

Hidden panels are skipped
: Panels that aren't picked have `hidden`, so screen readers skip them too.

## Rules

Two to four short choices
: A few words that fit on a phone. For more, use a [select](/components/select/).

Same thing, different views
: Every choice shows the same content another way. Different sections of a record are [page tabs](/components/page-tabs/).
