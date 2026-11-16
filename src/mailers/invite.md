---
layout: page
title: "Team invite"
summary: "Invites someone to join a shop's account."
section: Mailers
permalink: /mailers/invite/
---

A team invite asks someone to join a shop's account. Send it when an owner adds a person by email address.

## Example

<% email = render("examples/mailer_preview", slug: "invite", title: "Dana Whitfield invited you to Kensington Jewellery Repair on Workbench", preheader: "Dana Whitfield invited you to Kensington Jewellery Repair", sender: "Workbench", reason: "You’re getting this because Dana Whitfield invited this email address to Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Team invite email", height: 760, phone_height: 880, to: "Sam Okafor <sam.okafor@example.com>" %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "invite" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Say it once
: Who invited them (name and email address), to what, and with what role, in one sentence. The subject says the same: who, and where.

The button names the place
: "Join Kensington Jewellery Repair", not "Accept invite".

No pasted link
: The button is enough, and the plain-text part already carries the URL.

Say how long it works
: End with how long the invite works.
