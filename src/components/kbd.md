---
layout: page
title: Keyboard shortcuts
summary: "Keys that run an action, and the hints that teach them."
section: Components
permalink: /components/kbd/
---

A shortcut is a key on a button, link or field that's already on the page.
The key runs that element, and a hint next to it teaches the key while people
work, so nobody has to learn a list first.

## Example

<div class="example-frame tooltip-demo-frame flex flex-col gap-6">
<div class="flex flex-wrap items-center gap-2">
<button type="button" class="u-btn u-btn-outline" data-u-hotkey="e">Edit <kbd class="u-kbd-group" data-u-keys="e" aria-hidden="true"><kbd class="u-kbd">E</kbd></kbd></button>
<button type="button" class="u-btn u-btn-primary" data-u-hotkey="Mod+Enter">Save job <kbd class="u-kbd-group" data-u-keys="Mod+Enter" aria-hidden="true"><kbd class="u-kbd">Ctrl</kbd><kbd class="u-kbd">Enter</kbd></kbd></button>
<span class="u-tooltip" data-open><button type="button" class="u-btn u-btn-ghost u-btn-icon" aria-label="Print"><%= render "icon", name: "printer", small: false %></button><span aria-hidden="true">Print <kbd class="u-kbd-group" data-u-keys="p"><kbd class="u-kbd">P</kbd></kbd></span></span>
</div>
<div class="u-input-prefixed" style="max-width: 20rem">
<input type="search" class="u-input" placeholder="Search jobs" aria-label="Search jobs" data-u-hotkey="/">
<kbd class="u-kbd-group" data-u-keys="/" aria-hidden="true"><kbd class="u-kbd">/</kbd></kbd>
</div>
<div class="u-menu" style="position: static; max-width: 16rem">
<button type="button">Edit job <kbd class="u-kbd-group" data-u-keys="e" aria-hidden="true"><kbd class="u-kbd">E</kbd></kbd></button>
<button type="button">Print technician copy <kbd class="u-kbd-group" data-u-keys="p" aria-hidden="true"><kbd class="u-kbd">P</kbd></kbd></button>
</div>
</div>

## Code

```html
<button type="button" class="u-btn u-btn-outline" data-u-hotkey="e">
  Edit
  <kbd class="u-kbd-group" data-u-keys="e" aria-hidden="true"><kbd class="u-kbd">E</kbd></kbd>
</button>
```

```erb
<%%= link_to edit_job_path(job), class: "u-btn u-btn-outline", data: {u_hotkey: "e"} do %>
  <%%= t(".edit") %>
  <%%= uniform_kbd "e" %>
<%% end %>
```

A field's hint sits inside the field, at the end, and hides once someone is
typing in it. Put the field and `uniform_kbd` in a `u-input-prefixed`.

```erb
<div class="u-input-prefixed">
  <%%= form.search_field :search, class: "u-input", placeholder: t(".search"), data: {u_hotkey: "/"} %>
  <%%= uniform_kbd "/" %>
</div>
```

`data-u-hotkey` makes the key run the element: a button or link is clicked, a
field gets focus, a `<dialog>` opens and a popover toggles. Uniform sets
`aria-keyshortcuts` on it, so screen readers announce the key, and the hint
stays hidden from them.

Write the keys joined with `+`, like `Mod+Enter`. `Mod` is ⌘ on a Mac and
Ctrl everywhere else, and `uniform_kbd` shows whichever one the person has.
Separate two keys for the same action with a comma, like `/,s`.

- Letters and characters, like `e` or `?`, don't fire while someone is typing
  in a field. Keys with Ctrl, ⌘ or Alt do, so `Mod+Enter` saves from inside a
  field. Escape does too, but only for a shortcut in the same form, so a
  form's Cancel with `data-u-hotkey="Escape"` works from its own field.
- When two elements share a key, the one in the focused form wins, then the
  one on screen.
- A shortcut with `data-u-hotkey-row` runs only on the row under the pointer or
  holding focus, so every row can share one key, like `E` to quick edit.
- While a modal dialog is open, only its own shortcuts run.
- Escape belongs to an open menu, popover or dialog first.
- A key on its own, like in a field or the shortcut list, looks like a
  keycap. Inside a button or menu item it's a flat tint of the button's text
  colour, so it reads as a label and not a second button.
- Before a shortcut runs, its element fires `hotkey:run`, which bubbles, with
  the element's keys in `event.detail.keys`. Listen on `document` to count
  which shortcuts people use.

Hints hide on a touch screen (`pointer: coarse`), where nobody presses keys.
The shortcut list keeps them, so the keys still show if someone opens it.

## Where shortcuts live

Put a shortcut on the element that does the action, in the page that shows
it. Keys for the whole app, like `/` for search and `?` for the list, go in
the layout. Keys for one page, like `E` to edit a job, go on that page's
button, so they're gone when someone leaves the page.

## Shortcut list

Put `<u-hotkey-list>` in a dialog with `data-u-hotkey="?"`. Each time the
dialog opens, the list shows every shortcut the page has right now, named by
its element's label, with its keys lined up on the right. `?` opens the list
and closes it again.

Split the list into sections when the page has more than a few shortcuts.
Give each section a `<dl>` and a heading, and a `data-group` name. A shortcut
with a matching `data-u-hotkey-group` goes in that section, and every other
shortcut goes in the section without a `data-group`. An empty section hides. Name an icon button's shortcut with `aria-label`, or set
`data-u-hotkey-label` when the label doesn't say what the key does. A `<p>`
after the list shows instead when the page has none.

```erb
<dialog class="u-dialog u-dialog-narrow" id="shortcuts" aria-labelledby="shortcuts-title" data-u-hotkey="?" data-u-hotkey-group="general">
  <form method="dialog">
    <header>
      <h2 id="shortcuts-title"><%%= t(".shortcuts") %></h2>
      <button type="submit" class="u-btn-close" aria-label="<%%= t(".close") %>"></button>
    </header>
    <div class="u-card-content">
      <u-hotkey-list>
        <section data-group="general">
          <h3><%%= t(".general") %></h3>
          <dl></dl>
        </section>
        <section>
          <h3><%%= t(".on_this_page") %></h3>
          <dl></dl>
        </section>
        <p hidden><%%= t(".no_shortcuts") %></p>
      </u-hotkey-list>
    </div>
  </form>
</dialog>
```

## Turning letter keys off

A letter or character shortcut fires on one key press, which gets in the way
of people who use speech input or press keys by mistake. WCAG 2.1.4 asks that
people can turn them off. Give them a setting, and when it's off, set
`data-u-character-keys="off"` on `<body>`, which Turbo swaps on every visit.
Keys with Ctrl, ⌘ or Alt keep working. The hints and the shortcut list leave
the others out.

## Parts

<%= render "classes", classes_page: "/components/kbd/" %>

## Rules

Bind the key to the element
: Put `data-u-hotkey` on the button, link or field that already does the action, never on a listener of its own. The key then can't drift from what the button does.

Show the key where the action is
: Put the hint inside the action's button, menu item or tooltip, every time. A key that only appears in the list is a key nobody finds.

Same key on Windows and Mac
: Use `Mod` for the command key. Never a letter that needs Alt, which types a character on a Mac.
