---
layout: page
title: "Mention"
summary: "Tells someone a teammate mentioned them."
section: Mailers
permalink: /mailers/mention/
---

A mention tells someone a teammate wrote to them on a job. Send it right away, once per mention.

## Example

<% email = render("examples/mailer_preview", slug: "mention", title: "Sam Okafor mentioned you on #1042", preheader: "“Can you check the size before I cut the band?”", sender: "Workbench", reason: "You’re getting this because someone mentioned you in Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Mention email", height: 760, phone_height: 880 %>

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "mention" %>

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Quote the words
: Put what they wrote in the email, so the inbox shows it.

Who and where
: The heading names the person and the job.
