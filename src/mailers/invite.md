---
layout: page
title: "Team invite"
summary: "Invites someone to join a shop's account."
section: Mailers
permalink: /mailers/invite/
---

A team invite asks someone to join a shop's account. Send it when an owner adds a person by email address.

## Example

<% email = render("examples/mailer_preview", slug: "invite", title: "Join Kensington Jewellery Repair on Workbench", preheader: "Dana Whitfield invited you to join the shop as a jeweller.", sender: "Workbench", reason: "You’re getting this because Dana Whitfield invited this email address to Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Team invite email", height: 760, phone_height: 880, to: "Sam Okafor <sam.okafor@example.com>" %>

## Code

The body, from `uniform/mailers/invite.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "invite.html")).strip %>
```

The plain text, from `uniform/mailers/invite.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "invite.txt")).strip %>
```

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Say it once
: Who invited them, to what and as what role, in one sentence.

A link to paste
: Write the link out after the button, for clients that block buttons.

Say how long it works
: End with how long the invite works.
