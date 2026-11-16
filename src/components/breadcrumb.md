---
layout: page
title: Breadcrumb
summary: "Links to each level above a deeply nested page."
section: Components
permalink: /components/breadcrumb/
---

A breadcrumb shows where a page sits when it's three or more levels deep, with a link to each level.

## Example

<div class="example-frame">
<header class="u-page-header">
<%= render "examples/breadcrumb_staff" %>
<hgroup>
<h1>Dana Whitfield</h1>
<p>Owner, can change settings and billing</p>
</hgroup>
<div class="u-actions">
<button type="button" class="u-btn u-btn-outline">Edit details</button>
</div>
</header>
</div>

On a narrow screen it shrinks to a back link to the page above.

## On a phone

<div class="example-frame frame-phone">
<header class="u-page-header">
<%= render "examples/breadcrumb_staff" %>
<hgroup>
<h1>Dana Whitfield</h1>
<p>Owner, can change settings and billing</p>
</hgroup>
</header>
</div>

Below 480px wide, only the parent page shows, with a back arrow, so it works
like the page header's back link. It goes by its own width, not the screen's,
so it also shrinks in a narrow column.

## Code

```html
<header class="u-page-header">
  <nav class="u-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/settings">Settings</a></li>
      <li><a href="/settings/staff">Staff</a></li>
      <li><span aria-current="page">Dana Whitfield</span></li>
    </ol>
  </nav>
  <hgroup>
    <h1>Dana Whitfield</h1>
  </hgroup>
</header>
```

```erb
<header class="u-page-header">
  <nav class="u-breadcrumb" aria-label="<%%= t(".breadcrumb") %>">
    <ol>
      <li><%%= link_to t(".settings"), settings_path %></li>
      <li><%%= link_to t(".staff"), settings_staff_members_path %></li>
      <li><span aria-current="page"><%%= staff_member.name %></span></li>
    </ol>
  </nav>
  <hgroup>
    <h1><%%= staff_member.name %></h1>
  </hgroup>
</header>
```

Put the breadcrumb first inside the page header, in place of the back link.

## Parts

<%= render "classes", classes_page: "/components/breadcrumb/" %>

`aria-current="page"`
: The last item, the page you're on, in a `<span>` instead of a link.

## Breadcrumb or back link

Back link
: For a page one level down, like a job under Jobs.

Breadcrumb
: For three levels or more, like Settings, Staff, Dana Whitfield, where people move between levels.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<nav class="u-breadcrumb" aria-label="Breadcrumb">
<ol>
<li><a href="#do-and-dont">Jobs</a></li>
<li><span aria-current="page">#1042</span></li>
</ol>
</nav>
</div>
<figcaption class="example-caption example-caption-dont"><span>A breadcrumb for a page one level down. The page header's back link does this job with less.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<%= render "examples/breadcrumb_staff" %>
</div>
<figcaption class="example-caption example-caption-do"><span>Three levels, each named the way it appears in the sidebar and in its page title.</span></figcaption>
</figure>
</div>

## Accessibility

A landmark
: The `<nav>` with `aria-label="Breadcrumb"` is a landmark, so screen reader users can jump to it. Use the label once per page.

An ordered list
: Screen readers say how many levels there are and which one you're on. `aria-current="page"` marks the last one.

Separators are silent
: The slashes are drawn for you and aren't read out between links.

## Rules

Three levels or more
: Fewer than that, use the page header's back link.

Names match the pages
: Each item uses the title of the page it links to.

Above the title, once
: First in the page header, and only one per page.
