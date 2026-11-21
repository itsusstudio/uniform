---
layout: page
title: Accordion
summary: "Rows of content that fold away under a heading."
section: Components
permalink: /components/accordion/
---

An accordion folds away content only some people need. Use it for secondary details, never for what everyone has to see.

## Example

<div class="example-frame">
<div class="max-w-prose">
<%= render "examples/accordion_job" %>
</div>
</div>

Rows are separated by a divider, and each opens on its own, so you can read the
notes and the changes side by side.

## One open at a time

<div class="example-frame">
<div class="max-w-prose">
<%= render "examples/accordion_faq" %>
</div>
</div>

Give every `<details>` in the group the same `name` and opening one closes the
others, like the questions on a shop's page. Browsers that don't know `name` let
several stay open, which is fine.

## Code

```html
<%= inline_partial("examples/accordion_faq") %>
```

Each row is a `<details>`, with its heading in a `<summary>` and its content
after. The plus and minus are drawn for you. Give every row the same `name` to
keep one open at a time.

## Parts

<%= render "classes", classes_page: "/components/accordion/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-accordion">
<details>
<summary>Status and due date</summary>
<p><span class="u-badge u-badge-info">On the bench</span>, due <span>Nov 14</span></p>
</details>
<details>
<summary>Quote</summary>
<p class="u-data">$85.00</p>
</details>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>The status, due date and price folded away. Everyone who opens the job needs them, so they'd click every time.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame flex flex-col gap-6">
<dl class="u-dl">
<dt>Status</dt>
<dd><span class="u-badge u-badge-info">On the bench</span></dd>
<dt>Due</dt>
<dd>Nov 14</dd>
<dt>Quote</dt>
<dd class="u-data">$85.00</dd>
</dl>
<div class="u-accordion">
<details>
<summary>Intake notes</summary>
<p>Yellow gold band, size 6.</p>
</details>
<details>
<summary>Changes</summary>
<p>Moved to On the bench on <span>Nov 12</span>.</p>
</details>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>What everyone checks stays on the page. Only the notes and history fold away.</span></figcaption>
</figure>
</div>


## Accessibility

A real button
: Each `<summary>` is a button to the browser. Tab reaches it, Enter or Space opens it, and screen readers say whether it's open.

Plain text in the summary
: No links, buttons or headings inside a summary. They fight with its own button, and screen readers lose the state.

Found by search
: Find in page opens a closed row when the words match, in Chrome and Edge.

## Rules

Don't hide what everyone needs
: Status, due dates, prices and the main action stay on the page. Fold away only what some people look for some of the time.

Two rows or more
: A group of one isn't a group. Show the content, or give it its own page.

Name what's inside
: "Intake notes", "Changes", a question a customer would ask. Never "Details" or "More".

