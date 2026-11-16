---
layout: page
title: "Welcome"
summary: "The first email after sign-up, with the next steps."
section: Mailers
permalink: /mailers/welcome/
---

Welcome is the first email after sign-up. It lists the few steps to get going.

## Example

<% email = render("examples/mailer_preview", slug: "welcome", title: "Welcome to Workbench", preheader: "Three steps and your shop is ready.", sender: "Workbench", reason: "You’re getting this because you signed up for Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Welcome email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "welcome" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

A few steps
: Three or fewer, each one a verb.

A person signs it
: Sign it with a name, and let replies reach that person.
