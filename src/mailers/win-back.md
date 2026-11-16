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

The body, from `uniform/mailers/win-back.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "win-back.html")).strip %>
```

The plain text, from `uniform/mailers/win-back.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "win-back.txt")).strip %>
```

This one is marketing, so keep the layout's unsubscribe block.

## Rules

No guilt
: Never “we miss you”. Say what's waiting for them.

Ask why
: Invite a reply. It's the most useful thing they can send.
