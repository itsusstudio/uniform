---
layout: page
title: "Win-back"
summary: "Invites someone back after a quiet stretch."
section: Mailers
permalink: /mailers/win-back/
---

A win-back invites someone back after a quiet stretch. It's marketing, so it carries an unsubscribe link.

## Example

<% email = render("examples/mailer_preview", slug: "win-back", title: "Your jobs are still here", preheader: "Everything is where you left it.", sender: "Workbench", reason: "You’re getting this because you have a Workbench account.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1", unsubscribe_url: "https://useworkbench.example/email-settings") %>
<%= render "examples/mailer_frames", email: email, name: "Win-back email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "win-back" %>

This one is marketing, so keep the layout's unsubscribe block.

## Rules

No guilt
: Never “we miss you”. Say what's waiting for them.

Ask why
: Invite a reply. It's the most useful thing they can send.
