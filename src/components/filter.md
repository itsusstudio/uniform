---
layout: page
title: Filter
summary: "A pill that opens a menu of choices to narrow a list."
section: Components
permalink: /components/filter/
---
A filter is a pill button in a list's controls. It opens a menu of checkboxes, and the list reloads once when the menu closes. Once something is picked, the pill names it ("Status Open", "Assigned to Megan S +1") and a joined × clears that filter.

## Code

```html
<u-filter id="filter-status">
  <button type="button" class="u-btn u-btn-outline" popovertarget="filter-status-menu">Status</button>

  <div class="u-popover u-multi-select-list" id="filter-status-menu" popover role="group" aria-label="Status">
    <fieldset>
      <legend>Status</legend>

      <div data-u-filter-group>
        <label><input type="checkbox" data-u-filter-all> Open</label>

        <label data-u-filter-option>
          <input type="checkbox" name="filter[status][]" value="draft">
          <span><span class="u-badge u-badge-neutral">Draft</span></span>
          <span class="u-meta">970</span>
          <button type="button" data-u-filter-only>Only</button>
        </label>
      </div>
    </fieldset>
  </div>
</u-filter>
```

Put the filters inside the list's search form, wrapped in a `<div class="u-table-filters">`. On a narrow screen that row scrolls sideways instead of wrapping.

## Behaviour

- Picks submit the form once, when the menu closes, so ticking several choices costs one page load.
- `data-u-filter-all` on a group's first box picks or clears the whole group, and shows a partial state when only some are picked.
- Hovering an option shows Only (`data-u-filter-only`), which unticks the rest and leaves just that option picked. The menu stays open, and closing it applies the pick like any other. A `data-u-filter-only="<value>"` button at the top, like "Only my jobs", does the same for a fixed value.
- With 8 or more options, add a search field (`type="search"`) as the menu's first child. `uniform.js` gives it a search icon. Typing narrows the options, and `data-u-filter-none` shows when nothing matches.
- An `<hr>` between options groups them without a heading, like statuses by stage. It hides while a search narrows the list.
- A link as the menu's last child, like "Customize statuses", reads as a row and stays pinned to the bottom of a long list, the way the search stays at the top.
- On touch screens the rows grow to 40px with full-size text.

## Rules

Pills keep their own width
: A filter is optional, so it reads as a pill sized to its words, not a field stretched to fill the row.

Name what's picked
: The pill says what the filter is set to. A whole group reads as its name ("Open"), more than one pick as the first plus a count ("Draft +2").
