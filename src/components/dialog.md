---
layout: page
title: Dialog
summary: "The browser's `<dialog>`, for a decision or a few details."
section: Components
permalink: /components/dialog/
---

A dialog stops the page to ask for a decision or a few details. Use it when the next step can't happen without an answer.

## Example

<div class="dialog-demo-stage">
<div class="u-dialog">
<%= render "examples/dialog_delete", prefix: "dialog-static-delete", live: false %>
</div>
</div>

<div class="u-actions">
<button type="button" class="u-btn u-btn-outline" commandfor="dialog-live-delete" command="show-modal">Open dialog</button>
</div>

<dialog class="u-dialog" id="dialog-live-delete" aria-labelledby="dialog-live-delete-title">
<%= render "examples/dialog_delete", prefix: "dialog-live-delete", live: true %>
</dialog>

A destructive confirm. The title asks the question with the job number in it,
the body says what goes and that it's for good, and the button repeats the
action. Cancel gets focus, so a stray Enter keeps the job.

## With a form

<div class="dialog-demo-stage">
<div class="u-dialog">
<%= render "examples/dialog_form", prefix: "dialog-static-form", live: false %>
</div>
</div>

<div class="u-actions">
<button type="button" class="u-btn u-btn-outline" commandfor="dialog-live-form" command="show-modal">Open dialog</button>
</div>

<dialog class="u-dialog" id="dialog-live-form" aria-labelledby="dialog-live-form-title">
<%= render "examples/dialog_form", prefix: "dialog-live-form", live: true %>
</dialog>

Keep the form to three fields at most. It uses `method="dialog"`, so its buttons
close the dialog with no script. Give Cancel and the close button
`formnovalidate` so they close it even when a field is empty.

## Sheet

<div class="dialog-demo-stage dialog-demo-sheet">
<div class="u-dialog u-dialog-sheet">
<%= render "examples/dialog_form", prefix: "dialog-static-sheet", live: false %>
</div>
</div>

<div class="u-actions">
<button type="button" class="u-btn u-btn-outline" commandfor="dialog-live-sheet" command="show-modal">Open sheet</button>
</div>

<dialog class="u-dialog u-dialog-sheet" id="dialog-live-sheet" aria-labelledby="dialog-live-sheet-title">
<%= render "examples/dialog_form", prefix: "dialog-live-sheet", live: true %>
</dialog>

Add `u-dialog-sheet` to dock the dialog to the bottom edge on screens narrower
than 640px, full width, where a thumb reaches its buttons. Two actions split the
width, with the primary on the right. Three actions, or two whose labels don't
fit side by side, stack at full width with the primary at the bottom. Open this
one on a phone to see it.

Add `u-dialog-wide` when the content needs room: a signature pad, a photo grid,
or a preview someone has to read. It widens the dialog to 720px and leaves
phones as they are.

Add `u-dialog-side` for a side sheet: a full-height dialog against the right
edge, for editing a record without leaving the list behind it. It's 448px wide,
the whole width on a phone, and slides in unless someone prefers less motion.

Add `u-dialog-narrow` for a short list of pairs, like the keyboard shortcuts,
so each label stays close to its value. It narrows the dialog to 384px.

## Code

```html
<button type="button" class="u-btn u-btn-danger"
  commandfor="delete-job" command="show-modal">Delete job</button>

<dialog class="u-dialog" id="delete-job" aria-labelledby="delete-job-title">
  <form method="dialog">
    <header>
      <h2 id="delete-job-title">Delete job #1042?</h2>
      <button type="submit" value="cancel" class="u-btn-close" aria-label="Close"></button>
    </header>
    <div class="u-card-content">
      <p>Ana Reyes’s ring resize and its 3 notes will be deleted. You can’t undo this.</p>
    </div>
    <div class="u-actions">
      <button type="submit" value="cancel" class="u-btn u-btn-outline" autofocus>Cancel</button>
      <button type="submit" value="delete" class="u-btn u-btn-danger">Delete job</button>
    </div>
  </form>
</dialog>
```

```erb
<button type="button" class="u-btn u-btn-danger"
  commandfor="<%%= dom_id(job, :delete) %>" command="show-modal"><%%= t(".delete_job") %></button>

<dialog class="u-dialog" id="<%%= dom_id(job, :delete) %>" aria-labelledby="<%%= dom_id(job, :delete_title) %>">
  <%%= form_with model: job, method: :delete do |form| %>
    <header>
      <h2 id="<%%= dom_id(job, :delete_title) %>"><%%= t(".title", number: job.number) %></h2>
      <button type="submit" formmethod="dialog" value="cancel" class="u-btn-close" aria-label="<%%= t("uniform.close") %>"></button>
    </header>
    <div class="u-card-content">
      <p><%%= t(".body", customer: job.customer.name, work: job.work, count: job.notes.size) %></p>
    </div>
    <div class="u-actions">
      <button type="submit" formmethod="dialog" value="cancel" class="u-btn u-btn-outline" autofocus><%%= t(".cancel") %></button>
      <%%= form.button t(".delete_job"), class: "u-btn u-btn-danger" %>
    </div>
  <%% end %>
</dialog>
```

Open it with `commandfor` and `command="show-modal"` on the button, or call
`dialog.showModal()` from your own code. Always open it as a modal, so the
browser gives you the backdrop, the focus trap and the Escape key.

## Parts

<%= render "classes", classes_page: "/components/dialog/" %>

Header
: A `<header>` with the title first and a close button on the right. Make the title an `<h2>` that asks the question or names the task, and point the dialog's `aria-labelledby` at it.

`u-card-content`
: The message or the fields.

`u-actions`
: The buttons, flush right, with Cancel first and the action last.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="dialog-demo-stage dialog-demo-stage-small">
<div class="u-dialog"><header><p>Are you sure?</p></header><div class="u-card-content"><p>This action can’t be undone.</p></div><div class="u-actions"><button type="button" class="u-btn u-btn-outline">No</button><button type="button" class="u-btn u-btn-primary">Yes</button></div></div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A vague question with Yes and No. People click Yes without reading, and nothing says what goes.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="dialog-demo-stage dialog-demo-stage-small">
<div class="u-dialog"><header><p>Delete job <span class="u-data">#1042</span>?</p></header><div class="u-card-content"><p>Ana Reyes’s ring resize will be deleted. You can’t undo this.</p></div><div class="u-actions"><button type="button" class="u-btn u-btn-outline">Cancel</button><button type="button" class="u-btn u-btn-danger">Delete job</button></div></div>
</div>
<figcaption class="example-caption example-caption-do"><span>Name the thing, say what happens, and label the button with the action.</span></figcaption>
</figure>
</div>

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="dialog-demo-stage dialog-demo-stage-small">
<div class="dialog-demo-stack"><div class="u-dialog"><header><p>Edit job</p></header><div class="u-card-content"><p class="text-muted">Customer, items, quote, due date, notes, photos…</p></div></div><div class="u-dialog"><div class="u-card-content"><p>Save changes to the quote first?</p></div></div></div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A whole page squeezed into a dialog, then a second dialog on top of it.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="dialog-demo-stage dialog-demo-stage-small">
<div class="u-dialog"><header><p>Change due date</p></header><div class="u-card-content"><p>One field, one decision.</p></div><div class="u-actions"><button type="button" class="u-btn u-btn-outline">Cancel</button><button type="button" class="u-btn u-btn-primary">Save date</button></div></div>
</div>
<figcaption class="example-caption example-caption-do"><span>Keep it to one quick task. Anything bigger gets its own page.</span></figcaption>
</figure>
</div>

## Accessibility

Modal
: `showModal()` makes the rest of the page inert, keeps Tab inside the dialog and closes it on Escape.

Name
: Point `aria-labelledby` at the title so the dialog is announced by its question.

Focus
: Focus lands on the first control, or on the one with `autofocus`. For a destructive confirm, put it on Cancel. When the dialog closes, focus goes back to the button that opened it.

Close button
: An icon button with `aria-label="Close"`. Escape and Cancel do the same thing.

## Rules

One question
: A dialog asks one thing. A form with more than three fields, or anything people need to scroll, gets its own page.

Never stack dialogs
: Only one dialog is open at a time. If an answer needs another question, rethink the flow.

Confirm only what can't be undone
: Everything else happens straight away, with a [toast](/components/toast/) and Undo. The confirm button names the action, like “Delete job”, never “OK”.

Type to confirm only for the biggest losses
: Ask people to type a word only before something as large as deleting the whole shop or account. For anything smaller, the question and the button are enough.
