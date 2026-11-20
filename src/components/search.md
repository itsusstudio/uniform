---
layout: page
title: Search
summary: "Find a record, a page or an action from anywhere in an app."
section: Components
permalink: /components/search/
---

`<u-search>` puts a search field in the sidebar that opens a panel over the
page. As someone types, the panel asks the app's server for results and shows
the HTML it sends back: groups of records, pages and actions, with filter chips
that narrow them to one kind. A record can carry its own actions, like changing
a job's status, which open on → without leaving the panel.

The component knows nothing about the app's records. The server decides what
matches and renders each result as a real link or button, so picking one does
exactly what clicking it would.

## Code

```erb
<u-search id="global-search" data-src="<%%= global_search_path %>" data-recent-key="<%%= current_user.id %>">
  <button type="button" class="u-search-trigger" aria-label="<%%= t(".search") %>" data-u-hotkey="Mod+k">
    <span><%%= t(".search") %></span>
    <%%= uniform_kbd "Mod+k" %>
  </button>

  <dialog class="u-search-panel" aria-label="<%%= t(".search") %>" closedby="any">
    <div class="u-search-field">
      <span class="u-search-crumb" hidden></span>
      <input type="text" role="combobox" aria-label="<%%= t(".search") %>" aria-expanded="true"
        aria-controls="global-search-results" aria-autocomplete="list" autocomplete="off" placeholder="<%%= t(".search") %>">
    </div>
    <div class="u-search-chips" role="group" aria-label="<%%= t(".show") %>" hidden></div>
    <div class="u-search-results" id="global-search-results" role="listbox" aria-label="<%%= t(".results") %>"></div>
    <footer class="u-search-keys">
      <span><%%= uniform_kbd "ArrowUp" %><%%= uniform_kbd "ArrowDown" %> <%%= t(".move") %></span>
      <span><%%= uniform_kbd "Enter" %> <%%= t(".open") %></span>
      <span><%%= uniform_kbd "ArrowRight" %> <%%= t(".actions") %></span>
      <span><%%= uniform_kbd "ArrowLeft" %> <%%= t(".back") %></span>
      <span><%%= uniform_kbd "Escape" %> <%%= t(".close") %></span>
    </footer>
  </dialog>
</u-search>
```

- `data-src` is where results come from. The component asks for it with `q`,
  the typed text, `kind` when a filter chip is on, and `recent[]` for the
  person's recent picks.
- `data-recent-key` keeps one person's recent picks apart from another's on a
  shared computer. Picks are kept in the browser.
- Another button can open the panel by naming its id:
  `data-u-search-opener="global-search"`. A phone header's search icon works
  this way.

## What the server sends

One element that carries the chip counts and labels, holding the groups:

```html
<div data-u-search-counts='{"all":"45","jobs":"44","clients":"1"}'
     data-u-search-kinds='{"all":"All","jobs":"Jobs","clients":"Clients"}'>
  <div role="group" aria-label="Clients">
    <div class="u-search-group-label" aria-hidden="true">Clients</div>
    <a class="u-search-option" role="option" href="/clients/20" data-u-search-recent="customer:20"
       data-u-search-actions="/search/actions?record_key=customer:20" data-u-search-crumb="#20">
      <span class="u-search-text">
        <span class="u-search-title"><span class="u-data">#20</span>Carmen Lindgren</span>
        <span class="u-search-meta">(414) 758-1186</span>
      </span>
      <span class="u-search-end"><span class="u-search-hint">Open client <kbd>…</kbd></span></span>
    </a>
  </div>
</div>
```

- `data-u-search-actions` is a URL for the result's actions, fetched when the
  result is highlighted and shown on →. The same markup comes back, grouped by
  section. `data-u-search-crumb` labels the chip shown while they're open.
- `data-u-search-level` names a `<template>` in the response, for a choice
  that opens another list, like the statuses a job can move to.
  `data-u-search-current` marks the current one, and the list opens on the
  one after it.
- `data-u-search-recent` is remembered when the result is picked.
- Wrap the matched part of a title or detail in `<mark>`.

## Keyboard

↑ and ↓ move, Enter opens, → shows a result's actions, ← or Backspace goes
back, Esc goes back or closes, and ⇧Tab moves to the next filter chip.

## Without JavaScript

The field does nothing. Keep a search on the list pages, so people can still
find a record.

## Rules

One line per result
: A result is its number, its name and a short muted note. Detail and keys show only on the highlighted row, so a long list stays easy to scan.

Show why it matched
: Highlight the matched part. When the match is in something a row doesn't usually show, like a phone number, show it on the line.

Actions are what the app already does
: Every action is a link or a button to an existing page or form, so search adds a way in, not a second way to change a record.
