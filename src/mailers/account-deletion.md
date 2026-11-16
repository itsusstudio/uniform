---
layout: page
title: "Account deletion"
summary: "Confirms an account will be deleted, with a way back."
section: Mailers
permalink: /mailers/account-deletion/
---

Account deletion confirms an account is set to be deleted, with the date and a way to stop it. Send it when someone asks to delete their account.

## Example

<% email = render("examples/mailer_preview", slug: "account-deletion", title: "Your account will be deleted on Dec 12", preheader: "You can keep your account any time before then.", sender: "Workbench", reason: "You’re getting this because someone asked to delete this Workbench account.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Account deletion email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "account-deletion" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Date and way back
: Say exactly when, and give one button to stop it.

Say what goes
: Name what's deleted, so nobody is surprised.
