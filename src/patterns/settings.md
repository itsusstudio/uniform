---
layout: page
title: Settings page
section: Patterns
permalink: /patterns/settings/
summary: "A page of settings, one row each, in a narrow column."
---

The settings page holds an app's settings as rows in one narrow column. Use it
for the shop's details, notifications, team and anything else people set once
and come back to.

## Example

<div class="example-frame">
<div class="u-container u-container-narrow u-stack u-gap-6">
<header class="u-page-header"><hgroup><h1>Settings</h1><p>Shop, notifications and team</p></hgroup></header>
<%= render "examples/settings_rows" %>
</div>
</div>

## How it's built

Page
: A [page header](/components/page-header/) and [settings](/components/settings/) rows inside `u-container u-container-narrow`, so the eye runs down one column.

Rows
: Each setting saves on its own: a switch or a button when it's clicked, a field when you leave it. There's no Save button for the page.

Danger
: Leaving, handing over and deleting go last, in a [danger zone](/patterns/danger-zone/).
