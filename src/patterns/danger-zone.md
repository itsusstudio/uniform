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
<div class="u-container max-w-page-narrow">
<%= render "examples/danger_zone" %>
</div>
</div>

Delete shop opens the confirm. Try it.

## Code

```html
<%= inline_partial("examples/danger_zone") %>
```

## How it's built

Place
: The last group of a [settings page](/patterns/settings/), after its `<hr>`. Nothing goes below it, so it's never in the way of everyday settings.

Grid
: A [grid](/components/grid/) of four and eight columns: a [heading group](/components/heading-group/) on the left names the group in one plain sentence, and the rows sit on the right. On a phone the two stack.

Rows
: [Setting](/components/settings/) rows, safest first: get your data out, hand it over, then delete. Each says in words what happens, like every job and photo. Counting a shop's records on every visit to settings is slow for an old shop, so the rows never show numbers.

Buttons
: Outline for actions that keep the data. Only the one that destroys it is a danger button, and it names the thing: Delete shop, not Delete.

Confirm
: A [dialog](/components/dialog/) asks the question with the name in it, says what goes and that it can't be undone, and puts Cancel first with focus. The dialog shows what's lost in numbers people recognise, like 214 jobs, loaded when it opens, for example from a lazy Turbo Frame, so the settings page never pays for the count. Deleting something big asks for its name: the field's `pattern` holds the exact name, so the browser won't send the form until it matches, with no script. The server checks it again.

After
: Deleting signs people out to a plain page that says it's done.

## The confirm grows with what goes

Nothing else goes with it
: A record with nothing hanging off it, like a note, gets a plain [confirm](/components/dialog/).

Other records go with it
: The dialog names them, like "Ana Reyes and all 12 of her jobs will be deleted", and asks you to type a word before it deletes.

It would destroy live work
: The delete is blocked and says what to do first, like closing a customer's open jobs.

The whole shop or account
: This danger zone: the last group on the settings page, and a confirm that asks for the shop's name.

## When to use it

Use it for
: Deleting an account, a shop or a workspace, leaving one, or handing it to someone else.

Not for
: Deleting one record, like a job or a customer. That's a danger item in the record's [menu](/components/menu/), with the confirm the table above calls for.
