---
layout: page
title: Avatar
summary: "A circle with a person's photo or initials."
section: Components
permalink: /components/avatar/
---

An avatar shows a face, or initials, beside a person's name. Use it wherever a name needs a face.

## Example

<section class="u-card">
<header>
<h3>Notes on <span class="u-data">#1042</span></h3>
</header>
<div class="u-card-content">
<ol class="u-timeline">
<li>
<span class="u-avatar u-avatar-sm" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<div>
<strong>Luis Ortega</strong>
<p>Sized up to a 7. Polishing tomorrow morning.</p>
</div>
<time datetime="2026-11-12">Nov 12</time>
</li>
<li>
<span class="u-avatar u-avatar-sm" aria-hidden="true">DW</span>
<div>
<strong>Dana Whitfield</strong>
<p>Ana asked for a text when it's ready. She can pick up Saturday.</p>
</div>
<time datetime="2026-11-11">Nov 11</time>
</li>
</ol>
</div>
</section>

## Sizes

<div class="example-frame flex flex-wrap items-center gap-6">
<div class="flex flex-col gap-2">
<span class="u-avatar u-avatar-sm"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<p class="text-caption text-muted"><code>u-avatar-sm</code></p>
</div>
<div class="flex flex-col gap-2">
<span class="u-avatar"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<p class="text-caption text-muted">Default</p>
</div>
</div>

Both sizes follow the [audience](/start/audience/).

`u-avatar-sm`
: Beside a name in a table cell, a dense list or a timeline note, like who a job is assigned to.

The default
: Beside a message, a row of staff in a list, or a person's name at the top of their page. It's as tall as a control, so it sits level with buttons.

## Initials

<div class="example-frame flex flex-wrap items-center gap-4">
<span class="u-avatar u-avatar-sm" role="img" aria-label="Dana Whitfield">DW</span>
<span class="u-avatar" role="img" aria-label="Dana Whitfield">DW</span>
<span class="u-avatar" role="img" aria-label="Kensington Jewellery Repair">KJ</span>
</div>

With no photo, put up to two initials in the avatar. For a shop, use the first
letters of its name, like KJ for Kensington Jewellery Repair.

## Online

<div class="u-grid">
<div class="@grid:col-span-6">
<section class="u-card">
<header>
<h3>In the shop today</h3>
</header>
<ul class="u-list">
<li>
<span class="u-avatar u-avatar-online" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<div><p>Luis Ortega</p><p class="u-list-item-detail">Online</p></div>
</li>
<li>
<span class="u-avatar" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "b") %></span>
<div><p>Mei Tanaka</p><p class="u-list-item-detail">Away since 2pm</p></div>
</li>
</ul>
</section>
</div>
</div>

Add `u-avatar-online` when the person has the app open now. Where it matters,
say it in words too, like "Online" beside the name.

## Group

<div class="example-frame flex flex-wrap items-center gap-12">
<div class="u-avatar-group" role="img" aria-label="Dana Whitfield, Luis Ortega, Mei Tanaka and 3 more">
<span>DW</span>
<span><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<span><%= inline_partial("examples/avatar_portrait", tone: "b") %></span>
<span>+3</span>
</div>
<div class="u-avatar-group u-avatar-group-sm" role="img" aria-label="Luis Ortega, Mei Tanaka and Dana Whitfield">
<span><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<span><%= inline_partial("examples/avatar_portrait", tone: "b") %></span>
<span>DW</span>
</div>
</div>

Use a group for several people on one thing, like everyone who has worked on a
job. Show three at most, then a `<span>` with the count of the rest, like +3.
Add `u-avatar-group-sm` to make them all small.

## People

`uniform_people` shows who's on something, like a job's assignees: up to
three avatars, then two short names and a count, like "John M, Sarah O +1".
Screen readers hear every full name. With no one, it shows the `empty:` label
muted. A [multi-select](/components/multi-select/) draws the same thing for
the people picked.

Each person gets one of eight colours, picked from their name with
`uniform_person`, so they look the same on every page and in every list.
Give an initials avatar `data-person` to use it.

```erb
<span class="u-avatar u-avatar-sm" data-person="<%%= uniform_person(user.full_name) %>"
  role="img" aria-label="<%%= user.full_name %>"><%%= user.initials %></span>
```

```erb
<%%= uniform_people job.assignees.map(&:full_name), empty: t(".unassigned") %>
```

## Code

```html
<span class="u-avatar">
  <img src="/photos/luis-ortega.jpg" alt="Luis Ortega">
</span>

<span class="u-avatar u-avatar-sm" role="img" aria-label="Dana Whitfield">DW</span>

<span class="u-avatar u-avatar-online">
  <img src="/photos/luis-ortega.jpg" alt="Luis Ortega, online">
</span>

<div class="u-avatar-group" role="img" aria-label="Dana Whitfield, Luis Ortega, Mei Tanaka and 3 more">
  <span>DW</span>
  <span><img src="/photos/luis-ortega.jpg" alt=""></span>
  <span><img src="/photos/mei-tanaka.jpg" alt=""></span>
  <span>+3</span>
</div>
```

```erb
<span class="u-avatar">
  <%%= image_tag staff_member.photo, alt: staff_member.name %>
</span>

<span class="u-avatar u-avatar-sm" role="img" aria-label="<%%= staff_member.name %>"><%%= staff_member.initials %></span>

<span class="u-avatar u-avatar-online">
  <%%= image_tag staff_member.photo, alt: t(".online", name: staff_member.name) %>
</span>

<%% shown = staff_members.first(3) %>
<%% more = staff_members.size - shown.size %>
<div class="u-avatar-group" role="img" aria-label="<%%= t(".group", names: shown.map(&:name).join(", "), count: more) %>">
  <%% shown.each do |member| %>
    <span><%%= member.photo.attached? ? image_tag(member.photo, alt: "") : member.initials %></span>
  <%% end %>
  <%% if more.positive? %>
    <span><%%= t(".more", count: more) %></span>
  <%% end %>
</div>
```

## Parts

<%= render "classes", classes_page: "/components/avatar/" %>

The sidebar's account button draws its own square initials, so it takes no
avatar.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="flex flex-wrap items-center gap-2">
<span class="u-avatar u-avatar-online" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<span class="u-avatar" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "b") %></span>
<span class="u-avatar" aria-hidden="true">DW</span>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Faces with no names. Nobody can tell who's who, and the dot is the only sign of who's in.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="flex flex-wrap items-center gap-2">
<span class="u-avatar u-avatar-sm" aria-hidden="true"><%= inline_partial("examples/avatar_portrait", tone: "a") %></span>
<span class="text-small">Luis Ortega</span>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>An avatar beside the person's name, so the face helps you scan and the name says who it is.</span></figcaption>
</figure>
</div>

## Accessibility

Name it once
: When the name sits beside the avatar, give the image `alt=""` or the avatar `aria-hidden="true"`, so the name isn't read twice. On its own, the image's `alt` is the person's name.

Initials
: An initials avatar on its own gets `role="img"` and an `aria-label` with the full name. "DW" alone means nothing read out loud.

Online
: The dot has no words, so add ", online" to the avatar's name, and show "Online" beside the name where it matters.

Groups
: Give the group `role="img"` and one `aria-label` that names everyone shown and how many more, like "Dana Whitfield, Luis Ortega, Mei Tanaka and 3 more".

## Rules

Always beside a name
: An avatar helps you find a person. The name says who they are.

Two sizes
: Small and the default. Pick by what sits beside it, not by how important the person is.

Photo or initials
: A real photo the person chose, or their initials. No cartoon faces, stock images or random colours.
