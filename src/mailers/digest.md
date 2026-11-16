---
layout: page
title: "Digest"
summary: "A summary of activity instead of one email per event."
section: Mailers
permalink: /mailers/digest/
---

A digest sums up activity in one email instead of many. Send it daily or weekly, as each person chooses.

## Example

<% email = render("examples/mailer_preview", slug: "digest", title: "Your week at the shop", preheader: "12 jobs in, 5 ready for pickup, 1 overdue.", sender: "Workbench", reason: "You’re getting this weekly summary because it’s on in your notification settings.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Digest email", height: 760, phone_height: 880 %>

## Code

The body, from `uniform/mailers/digest.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "digest.html")).strip %>
```

The plain text, from `uniform/mailers/digest.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "digest.txt")).strip %>
```

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Counts, not lists
: Numbers and statuses. The list lives in the app.

The settings link
: Say where to change how often it comes.
