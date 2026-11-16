---
layout: page
title: "Drop-off confirmation"
summary: "Confirms a shop received a customer's item."
section: Mailers
permalink: /mailers/intake/
---

A drop-off confirmation tells a customer the shop has their piece. It's sent by the app on the shop's behalf, in the shop's name.

## Example

<% email = render("examples/mailer_preview", slug: "intake", title: "Thanks, we’ve got your ring", preheader: "Job #1042, ring resize. Ready by Nov 14.", sender: "Kensington Jewellery Repair", reason: "You’re getting this because you dropped off a repair with us.", address: "Kensington Jewellery Repair, 214 Augusta Avenue, Toronto ON") %>
<%= render "examples/mailer_frames", email: email, name: "Drop-off confirmation email", height: 760, phone_height: 880 %>

## Code

The body, from `uniform/mailers/intake.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "intake.html")).strip %>
```

The plain text, from `uniform/mailers/intake.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "intake.txt")).strip %>
```

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

The shop's name
: Sent from and signed by the shop. The product's name stays out.

What was written down
: Repeat the job, the work and the quote, so the customer can spot a mistake.
