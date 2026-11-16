---
layout: page
title: "Product update"
summary: "News about what changed in the product."
section: Mailers
permalink: /mailers/product-update/
---

A product update tells people what's new. It's marketing, so it carries an unsubscribe link.

## Example

<% email = render("examples/mailer_preview", slug: "product-update", title: "Texts to customers can now be in French", preheader: "Pick each customer’s language and Workbench writes in it.", sender: "Workbench", reason: "You’re getting this because you get product news from Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1", unsubscribe_url: "https://useworkbench.example/email-settings") %>
<%= render "examples/mailer_frames", email: email, name: "Product update email", height: 760, phone_height: 880 %>

## Code

The body, from `uniform/mailers/product-update.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "product-update.html")).strip %>
```

The plain text, from `uniform/mailers/product-update.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "product-update.txt")).strip %>
```

This one is marketing, so keep the layout's unsubscribe block.

## Rules

One change
: Lead with the change people asked for. A list of ten goes unread.

Show how
: Say where to find it, in one line.
