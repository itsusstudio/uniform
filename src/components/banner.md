---
layout: page
title: Banner
summary: "A signal-coloured block with a message for everyone."
section: Components
permalink: /components/banner/
---

A banner holds a message for everyone on the page, like an announcement or an account problem. It stays until the situation changes.

## Variants

<div class="u-stack u-gap-4">
<%= render "examples/banner", variant: nil, title: "Texts now include your opening hours", body: "Customers see them on every pickup text. You can change them in Settings.", action: nil %>
<%= render "examples/banner", variant: "warning", title: "Your card expires on Nov 30", body: "Update it before then so texts keep sending.", action: "Update card" %>
<%= render "examples/banner", variant: "danger", title: "Texts aren’t sending", body: "Your phone number was rejected by the carrier. Nothing has been sent since 9:14am.", action: "Fix your number" %>
<%= render "examples/banner", variant: "success", title: "Your shop is live", body: "Customers can now check on their repairs with the link in each text.", action: nil %>
</div>

<%= render "classes", classes_page: "/components/banner/", classes_variants: true %>

## Code

```html
<div class="u-banner u-banner-warning" role="status">
  <p class="u-banner-title">Your card expires on Nov 30</p>
  <p>Update it before then so texts keep sending.</p>
  <div class="u-actions"><a class="u-btn u-btn-primary" href="/billing">Update card</a></div>
</div>
```

```erb
<%% if current_shop.card_expiring_soon? %>
  <div class="u-banner u-banner-warning" role="status">
    <p class="u-banner-title"><%%= t(".card_expires", date: l(current_shop.card_expires_on, format: :short)) %></p>
    <p><%%= t(".card_expires_detail") %></p>
    <div class="u-actions"><%%= link_to t(".update_card"), billing_path, class: "u-btn u-btn-primary" %></div>
  </div>
<%% end %>
```

## Parts

<%= render "classes", classes_page: "/components/banner/" %>

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame u-stack u-gap-2">
<%= render "examples/banner", variant: "success", title: "Job saved", body: "Ring resize for Ana Reyes.", action: nil %>
<%= render "examples/banner", variant: "warning", title: "Card expires soon", body: "Update it before Nov 30.", action: nil %>
</div>
<figcaption class="example-caption example-caption-dont"><span>Stacking banners, and using one to confirm a quick action. The second one gets lost.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<%= render "examples/banner", variant: "warning", title: "Your card expires on Nov 30", body: "Update it before then so texts keep sending.", action: "Update card" %>
</div>
<figcaption class="example-caption example-caption-do"><span>One banner, about something that stays true until it's fixed. Quick confirmations go in a toast.</span></figcaption>
</figure>
</div>

## Accessibility

Role
: Use `role="status"` so screen readers announce it politely. Use `role="alert"` only for a danger banner that appears while someone is working.

Say it in the title
: The title says what's wrong or what changed. The colour only backs it up.

Contrast
: Text passes 4.5:1 on every colour, in light and dark.

## Rules

One at a time
: At most one banner on a page, at the top of the content under the page header. Show the most serious one.

For news and lasting problems
: Use a banner for news people should see, or a problem that stays until it's fixed. Confirm something someone just did with a [toast](/components/toast/).
