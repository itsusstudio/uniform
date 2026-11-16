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

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "product-update" %>

This one is marketing, so keep the layout's unsubscribe block.

## Rules

One change
: Lead with the change people asked for. A list of ten goes unread.

Show how
: Say where to find it, in one line.
