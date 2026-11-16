---
layout: page
title: "Export ready"
summary: "A link to download data someone asked for."
section: Mailers
permalink: /mailers/export-ready/
---

Export ready sends the link to a data export once it's built. Send it when someone asks for their data.

## Example

<% email = render("examples/mailer_preview", slug: "export-ready", title: "Your export is ready", preheader: "Jobs, customers and payments, ready to download.", sender: "Workbench", reason: "You’re getting this because you asked to export your shop’s data.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Export ready email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "export-ready" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Say what's inside
: List what the file holds, so nobody downloads the wrong thing.

Expire the link
: Data exports carry personal data. Say when the link stops working.
