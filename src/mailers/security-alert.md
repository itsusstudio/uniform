---
layout: page
title: "Security alert"
summary: "Tells someone about a sign-in or change they may not have made."
section: Mailers
permalink: /mailers/security-alert/
---

A security alert tells someone about a new sign-in or a change to their account. Send it for every new device, email change and two-step change.

## Example

<% email = render("examples/mailer_preview", slug: "security-alert", title: "New sign-in to Workbench", preheader: "Firefox on Windows, near Toronto, Nov 12 at 2:14pm.", sender: "Workbench", reason: "You’re getting this because there was a new sign-in to your Workbench account.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Security alert email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "security-alert" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Facts, not alarm
: Say what happened, where and when. No red, no capitals.

Two outcomes
: Say what to do if it was them, and if it wasn’t.
