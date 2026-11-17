---
layout: page
title: Danger zone
section: Patterns
permalink: /patterns/danger-zone/
summary: "The last group on a settings page, for leaving, handing over or deleting."
---

The danger zone is the last group on a settings page, where people leave,
hand over or delete what they own. Use it for anything that can't be undone or
that changes who's in charge. Lift it into an app as it is and change the words.

## Example

<div class="example-frame">
<div class="u-container u-container-narrow">
<%= render "examples/danger_zone" %>
</div>
</div>

Delete shop opens the confirm. Try it.

## Code

```html
<%= raw render("examples/danger_zone").strip %>
```

## How it's built

Place
: The last group of a [settings page](/patterns/settings/), after a rule. Nothing goes below it, so it's never in the way of everyday settings.

Rows
: [Setting](/components/settings/) rows, safest first: get your data out, hand it over, then delete. Each says in words what happens, like every job and photo. Counting a shop's records on every visit to settings is slow for an old shop, so the rows never show numbers.

Buttons
: Outline for actions that keep the data. Only the one that destroys it is a danger button, and it names the thing: Delete shop, not Delete.

Confirm
: A [dialog](/components/dialog/) asks the question with the name in it, says what goes and that it can't be undone, and puts Cancel first with focus. The dialog shows what's lost in numbers people recognise, like 214 jobs, loaded when it opens, for example from a lazy Turbo Frame, so the settings page never pays for the count. Deleting something big asks for its name: the field's `pattern` holds the exact name, so the browser won't send the form until it matches, with no script. The server checks it again.

After
: Deleting signs people out to a plain page that says it's done. Smaller deletions, like one job, skip the typed name and use a plain [confirm](/components/dialog/).

## When to use it

Use it for
: Deleting an account, a shop or a workspace, leaving one, or handing it to someone else.

Not for
: Deleting one record, like a job or a customer. That's a danger item in the record's [menu](/components/menu/) with a plain confirm.
