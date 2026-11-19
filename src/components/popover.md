---
layout: page
title: Popover
summary: "A small floating panel for details or a quick change."
section: Components
permalink: /components/popover/
---

A popover shows a few details or one quick change without leaving the page. It's the browser's `popover`, so it needs no script.

## Example

<div class="example-frame u-row u-items-start u-gap-12">
<%= render "examples/popover_customer", id: "popover-static-customer", popover: false %>
<div class="u-stack u-gap-4">
<p class="u-text-small u-text-muted">Try it:</p>
<div class="u-row u-gap-4 u-text-small">
<span class="u-text-data">#1042</span>
<button type="button" class="u-link-btn" popovertarget="popover-live-customer">Ana Reyes</button>
<span>Ring resize, size 6 to 7</span>
</div>
</div>
</div>

<%= render "examples/popover_customer", id: "popover-live-customer", popover: true %>

Clicking a customer's name shows their phone number and open jobs beside it,
without leaving the list.

## With a form

<div class="example-frame u-row u-items-start u-gap-12">
<%= render "examples/popover_due_date", id: "popover-static-due", popover: false %>
<div class="u-stack u-gap-4">
<p class="u-text-small u-text-muted">Try it:</p>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline" popovertarget="popover-live-due">Change due date</button>
</div>
</div>
</div>

<%= render "examples/popover_due_date", id: "popover-live-due", popover: true %>

The date field has `autofocus`, so you can type the date as soon as it opens.

## Code

```html
<button type="button" class="u-link-btn" popovertarget="customer-ana">Ana Reyes</button>

<dialog class="u-popover" id="customer-ana" popover aria-labelledby="customer-ana-title">
  <header>
    <h2 id="customer-ana-title">Ana Reyes</h2>
    <button type="button" class="u-btn-close"
      popovertarget="customer-ana" popovertargetaction="hide" aria-label="Close"></button>
  </header>
  <dl class="u-dl">
    <dt>Phone number</dt>
    <dd>416-555-0148</dd>
  </dl>
</dialog>

<button type="button" class="u-btn u-btn-outline" popovertarget="due-1042">Change due date</button>

<dialog class="u-popover" id="due-1042" popover aria-label="Change due date">
  <form action="/jobs/1042/due_date" method="post">
    <div class="u-field">
      <label for="due-1042-date">Due date</label>
      <input class="u-input" type="date" id="due-1042-date" name="due_on" autofocus>
    </div>
    <div class="u-actions">
      <button type="button" class="u-btn u-btn-ghost"
        popovertarget="due-1042" popovertargetaction="hide">Cancel</button>
      <button type="submit" class="u-btn u-btn-primary">Save due date</button>
    </div>
  </form>
</dialog>
```

Put the popover right after its button. It opens below the button and flips
when there's no room.

## Parts

<%= render "classes", classes_page: "/components/popover/" %>

## Which one to use

Menu
: A list of actions for one thing, like Edit job or Print ticket. Choosing one closes it.

Tooltip
: A short name for a control that doesn't show one, with nothing to click inside.

Popover
: A few details or one quick change, anchored to what you clicked. Clicking away closes it without losing anything.

Dialog
: A longer form, or a confirmation before deleting something. It covers the page until you finish or cancel.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<dialog class="u-popover" open aria-label="Ana Reyes">
<header><p>Ana Reyes</p></header>
<div class="u-stack u-gap-2">
<button type="button" class="u-btn u-btn-ghost">Text Ana</button>
<button type="button" class="u-btn u-btn-ghost">Call Ana</button>
<button type="button" class="u-btn u-btn-ghost">Delete customer</button>
</div>
</dialog>
</div>
<figcaption class="example-caption example-caption-dont"><span>A popover full of buttons. A list of actions is a menu, which already groups them and marks the destructive one.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<%= render "examples/popover_customer", id: "popover-do-customer", popover: false %>
</div>
<figcaption class="example-caption example-caption-do"><span>Details you'd otherwise open another page to check, with the name at the top and a way to close it.</span></figcaption>
</figure>
</div>

## Accessibility

Opens on click
: A popover opens when you click or press its button, never on hover, which phones don't have.

Closing
: Escape, a click outside or opening another popover closes it, and focus goes back to the button. A form keeps what you typed until the page reloads.

Focus
: Opening it moves focus to the field with `autofocus`, or else to the first thing you can click inside, like the close button. Put `autofocus` on a form's first field.

Named
: It's a `<dialog popover>`, so screen readers announce a dialog. Add `aria-labelledby` pointing at the title, or `aria-label` when there's no title, so screen readers say what opened. Give the close button `aria-label="Close"`.

## Rules

One small job
: A few details, or one or two fields and a save button. Anything longer goes in a [dialog](/components/dialog/) or on its own page.

Safe to close by mistake
: Clicking away closes a popover. If that would throw away work, use a dialog.
