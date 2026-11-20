---
layout: page
title: Multi-select
summary: "Pick several people or things from one compact field."
section: Components
permalink: /components/multi-select/
---

`<u-multi-select>` folds a fieldset of checkboxes into one field that says
what's picked, like "Sarah O, Dexter L +1", or "Unassigned". Clicking it opens
the same checkboxes in a popover, with picked ones at the top. The popover
stays open while someone picks several, and closes when they click outside or
press Escape.

## Example

<div class="example-frame">
<div class="max-w-form">
<u-multi-select data-placeholder="Unassigned" data-me="2" data-me-label="Assign to me" data-search-label="Search people" data-no-match="No one matches">
<fieldset class="u-fieldset">
<legend>Assigned to</legend>
<label class="u-checkbox"><input type="checkbox" name="user_ids[]" value="1"> Dexter Little</label>
<label class="u-checkbox"><input type="checkbox" name="user_ids[]" value="2"> John Manager</label>
<label class="u-checkbox"><input type="checkbox" name="user_ids[]" value="3" checked> Megan Staff</label>
<label class="u-checkbox"><input type="checkbox" name="user_ids[]" value="4"> Sarah Owner</label>
<label class="u-checkbox"><input type="checkbox" name="user_ids[]" value="5"> Virgen Paucek</label>
</fieldset>
</u-multi-select>
</div>
</div>

## Code

Write the fieldset you'd write without it, and wrap it. The checkboxes stay
real form fields, so the form posts the same thing either way.

```erb
<u-multi-select data-placeholder="<%%= t(".unassigned") %>"
  data-me="<%%= current_user.id %>" data-me-label="<%%= t(".assign_to_me") %>"
  data-search-label="<%%= t(".search_people") %>" data-no-match="<%%= t(".no_one_matches") %>">
  <fieldset class="u-fieldset">
    <legend><%%= t(".assigned_to") %></legend>
    <%%= hidden_field_tag "job[user_ids][]", "", id: nil %>
    <%% users.each do |user| %>
      <label class="u-checkbox">
        <%%= check_box_tag "job[user_ids][]", user.id, job.user_ids.include?(user.id), id: nil %>
        <%%= user.full_name %>
      </label>
    <%% end %>
  </fieldset>
</u-multi-select>
```

- `data-placeholder` shows when nothing is picked.
- `data-me` is the value of the person using the page. "Assign to me"
  (`data-me-label`) sits at the top of the list and greys out once they're
  picked, so the list never moves.
- With 8 or more options a search field opens first (`data-search-label`), so
  a long list stays quick. Typing filters, and Enter picks the first match.
  Change the cut-off with `data-search-from`. `data-no-match` shows when a
  search finds nothing.

## Without JavaScript

The fieldset stays as it is: a plain list of checkboxes that still posts.

## Rules

Several picks, one field
: Use it when someone picks more than one from a list, like the people on a job. For one pick, use a [select](/components/select/) or [combobox](/components/combobox/).

Names, not ids
: Each label is the person's or thing's name. The field builds its summary and initials from it.
