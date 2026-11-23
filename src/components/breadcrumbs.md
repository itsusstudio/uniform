---
layout: page
title: Breadcrumbs
summary: "The trail from a section down to the current page."
section: Page frame
permalink: /components/breadcrumbs/
---

Breadcrumbs show where a page sits when it's more than one level deep, and let you jump back to any level above it. Use them in place of the page header's back link when the parent alone doesn't say enough, like a page inside Settings.

## Example

<div class="example-frame">
<header class="u-page-header">
<nav class="u-breadcrumbs" aria-label="Breadcrumbs">
<ol>
<li><a href="#example">Settings</a></li>
<li><a href="#example">Agreements</a></li>
<li><span aria-current="page">Service agreement</span></li>
</ol>
</nav>
<hgroup>
<h1>Service agreement</h1>
<p>English</p>
</hgroup>
</header>
</div>

## Anatomy

Each step is a link, and the last step is the current page, in default text and never a link. A chevron sits between steps. On a narrow screen the trail wraps, and a long current page ends in an ellipsis.

## Code

```html
<nav class="u-breadcrumbs" aria-label="Breadcrumbs">
  <ol>
    <li><a href="/settings">Settings</a></li>
    <li><a href="/settings/agreements">Agreements</a></li>
    <li><span aria-current="page">Service agreement</span></li>
  </ol>
</nav>
```

```erb
<nav class="u-breadcrumbs" aria-label="<%%= t(".breadcrumbs") %>">
  <ol>
    <%% trail.each do |step| %>
      <li><%%= link_to step.label, step.path %></li>
    <%% end %>
    <li><span aria-current="page"><%%= current %></span></li>
  </ol>
</nav>
```
