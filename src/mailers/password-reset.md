---
layout: page
title: "Password reset"
summary: "A link to choose a new password."
section: Mailers
permalink: /mailers/password-reset/
---

Password reset sends a link to choose a new password. Send it only when someone asks.

## Example

<% email = render("examples/mailer_preview", slug: "password-reset", title: "Reset your Workbench password", preheader: "This link works for 1 hour.", sender: "Workbench", reason: "You’re getting this because someone asked to reset the password for this email address.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Password reset email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "password-reset" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Never send the password
: Only a link. The email never holds a password or a hint.

Safe to ignore
: Say what happens if they did nothing: the password stays the same.
