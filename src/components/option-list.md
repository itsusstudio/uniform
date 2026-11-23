---
layout: page
title: Option list
summary: "A few ways to do one thing, each a row that does it when picked."
section: Components
permalink: /components/option-list/
---

An option list offers a few ways to get one thing done, like signing on this device or sending a link. Each option is a large row that acts as soon as it's picked, says where it leads, and stays easy to tap on a tablet. Use it for two to four ways to do one thing; use a [menu](/components/menu/) for many unrelated actions and a [radio group](/components/radio/) when the choice waits for a Save.

## Example

<div class="u-card" style="max-width: 480px">
<div class="u-card-content">
<ul class="u-option-list" aria-label="How the client signs">
<li><svg class="u-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/></svg><div><p><a href="#">Sign on this device</a></p><p>Hand this screen to the client</p></div><svg class="u-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></li>
<li aria-disabled="true"><svg class="u-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><div><p>Send a link</p><p>Turn on texts or email updates for the client first.</p></div><a href="#" class="u-btn u-btn-outline u-btn-sm">Turn on</a></li>
</ul>
</div>
</div>

## Code

```html
<ul class="u-option-list" aria-label="How the client signs">
  <li>
    <svg class="u-icon" aria-hidden="true">…</svg>
    <div>
      <p><a href="/jobs/6019/signing">Sign on this device</a></p>
      <p>Hand this screen to the client</p>
    </div>
    <svg class="u-icon" aria-hidden="true">…</svg>
  </li>
  <li aria-disabled="true">
    <svg class="u-icon" aria-hidden="true">…</svg>
    <div>
      <p>Send a link</p>
      <p>Turn on texts or email updates for the client first.</p>
    </div>
    <a href="/clients/42/notifications" class="u-btn u-btn-outline u-btn-sm">Turn on</a>
  </li>
</ul>
```

```erb
<ul class="u-option-list" aria-label="<%%= t(".label") %>">
  <li>
    <%%= uniform_icon "tablet" %>
    <div>
      <p><%%= link_to t(".sign_here"), job_signing_path(job) %></p>
      <p><%%= t(".sign_here_detail") %></p>
    </div>
    <%%= uniform_icon "chevron-right" %>
  </li>
</ul>
```

## Parts

<%= render "classes", classes_page: "/components/option-list/" %>

Each row is an icon, a `<div>` with the option's name and one line saying where it leads, and a trailing chevron. The name is a link, and the whole row becomes its click target. A link that sends something, like Text a link, takes `data-turbo-method="post"`.

An option that can't be used right now stays in the list with `aria-disabled="true"`: no link on its name, its detail line saying why, and a button in place of the chevron that fixes it. A button in a row works on its own, above the row's link.

## Do and don't

- Do say where each option leads in its detail line, like the phone number a link goes to.
- Do keep an option that's off in the list, with the reason and the fix. Hiding it leaves people wondering where it went.
- Don't use it for more than four options, or for choices that wait for a Save.

## Accessibility

The list has an `aria-label` naming the decision. Each option's name is a real link, so Tab reaches it and the focus ring draws around the whole row. Icons are `aria-hidden`.
