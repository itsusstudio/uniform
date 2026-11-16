---
layout: page
title: Link
summary: "Underlined words that go somewhere, with no class."
section: Components
permalink: /components/link/
---

A link takes people to another page or place. Every `<a>` gets the link look from Uniform, with no class to add.

## Example

<div class="example-frame u-stack u-gap-4">
<p class="u-text-body">Ana's ring is ready. We sent her a text at 2:40pm. You can <a href="#example">see the message</a> or <a href="#example">change her phone number</a>.</p>
<p class="u-text-small">Texts to the US need a registered number. <a href="#example" target="_blank" rel="noopener">How carriers register numbers (opens in a new tab) <%= render "icon", name: "external-link", small: true %></a></p>
</div>

## Leaving the app

When a link goes to another site, put the arrow-square-out icon at the end,
inside the link. Open links in the same tab. When one has to open a new tab, say
so in the words, like “(opens in a new tab)”, because the icon is hidden from
screen readers.

## Link button

<form class="u-text-small" action="#link-button">Didn’t get it? <button type="button" class="u-link-btn">Send a new code</button></form>

An action inside a sentence, like sending a new code, is a `<button>` with
`u-link-btn`. Put it in a form when it posts.

```html
<form class="u-text-small" action="/sign-in/resend" method="post">
  Didn’t get it? <button type="submit" class="u-link-btn">Send a new code</button>
</form>
```

```erb
<%%= form_with url: sign_in_resend_path, class: "u-text-small" do |form| %>
  <%%= t(".didnt_get_it") %> <%%= form.button t(".send_new_code"), class: "u-link-btn" %>
<%% end %>
```

## Code

```html
<a href="/jobs/1042/messages">see the message</a>

<a href="https://example.com/carrier-registration" target="_blank" rel="noopener">
  How carriers register numbers (opens in a new tab)
  <svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>
</a>
```

```erb
<%%= link_to t(".see_the_message"), job_messages_path(job) %>

<%%= link_to "https://example.com/carrier-registration", target: "_blank", rel: "noopener" do %>
  <%%= t(".carrier_registration") %>
  <svg class="u-icon u-icon-sm" aria-hidden="true">…</svg>
<%% end %>
```

## Classes

None
: Every `<a>` gets the link colour, the underline and the focus ring, and takes its size and weight from the text around it.

`u-icon u-icon-sm`
: The 16px arrow-square-out icon, for a link that leaves the app.

<%= render "classes", classes_page: "/components/link/" %>

Links inside components, like [navigation](/components/navigation/), [page tabs](/components/page-tabs/)
and the back link in a [page header](/components/page-header/), have their own
classes. A link that looks like a button uses `u-btn`.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<p class="u-text-small">Ana's ring is ready. To see the text we sent her, <a href="#do-and-dont">click here</a>.</p>
</div>
<figcaption class="example-caption example-caption-dont"><span>“Click here” says nothing about where it goes. Read out in a list of links, it's meaningless.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<p class="u-text-small">Ana's ring is ready. You can <a href="#do-and-dont">see the text we sent her</a>.</p>
</div>
<figcaption class="example-caption example-caption-do"><span>The words that are linked say what you'll find there.</span></figcaption>
</figure>
</div>

## Accessibility

Words say where it goes
: Write link text that makes sense on its own. Screen reader users often jump from link to link.

Keep the underline
: The underline tells a link apart from text for people who can't see the colour.

Links for places, buttons for actions
: If it takes you somewhere, it's an `<a>`. If it changes something, like saving or sending, it's a `<button>`, whatever it looks like.

## Rules

Keep links plain
: Write a plain `<a>`, and keep its colour and underline outside a component.

Mark links to other sites
: A link to another site ends with the arrow-square-out icon.

Blue text only for links
: Never colour other text blue.
