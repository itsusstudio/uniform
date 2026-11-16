---
layout: page
title: "Confirm email address"
summary: "Proves an email address belongs to the person who typed it."
section: Mailers
permalink: /mailers/confirm-email/
---

Confirm email address asks someone to prove a new email address is theirs. Send it after sign-up or a change of address.

## Example

<% email = render("examples/mailer_preview", slug: "confirm-email", title: "Confirm your email address", preheader: "This link works for 24 hours.", sender: "Workbench", reason: "You’re getting this because this email address was used to sign up for Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Confirm email address email", height: 760, phone_height: 880 %>

## Code

The body, from `uniform/mailers/confirm-email.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "confirm-email.html")).strip %>
```

The plain text, from `uniform/mailers/confirm-email.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "confirm-email.txt")).strip %>
```

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

One button
: The button confirms. Nothing else in the email needs a click.

Say how long it works
: Put the time limit in the preheader and the last line.
