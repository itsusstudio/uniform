---
layout: page
title: "Report ready"
summary: "Says a long-running report has finished."
section: Mailers
permalink: /mailers/report-ready/
---

Report ready says a report or other long job has finished. Send it when the work is done.

## Example

<% email = render("examples/mailer_preview", slug: "report-ready", title: "Your November report is ready", preheader: "64 jobs, $5,820 taken in, 94% finished on time.", sender: "Workbench", reason: "You’re getting this because you asked for a report in Workbench.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Report ready email", height: 760, phone_height: 880 %>

## Code

The body, from `uniform/mailers/report-ready.html`. It goes where the
[layout](/mailers/layout/) has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "report-ready.html")).strip %>
```

The plain text, from `uniform/mailers/report-ready.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "report-ready.txt")).strip %>
```

This one is transactional, so leave the layout's unsubscribe block out.

## Rules

Headline numbers
: Put the few numbers people want in the email.

Link to the rest
: The full report stays in the app.
