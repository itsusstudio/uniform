---
layout: page
title: Sign-in code
summary: "The email that carries a sign-in code."
section: Mailers
permalink: /mailers/sign-in-code/
---

The sign-in code email carries the six-digit code people type into the sign-in
screen. Send it each time someone asks to sign in.

## Example

<% email = render("examples/mailer_preview", slug: "sign-in-code", title: "482915 is your Workbench code", preheader: "This code works for 10 minutes.", sender: "Workbench", reason: "You’re getting this because someone asked to sign in to Workbench with this email address.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1") %>
<%= render "examples/mailer_frames", email: email, name: "Sign-in code email", height: 660, phone_height: 720 %>

The code goes in the subject, the inbox preview and big at the top of the
email, so most people never need to open it. It's transactional, so there's no
unsubscribe link. It comes from Workbench, not
from a shop, because it's about the reader's own account.

## Anatomy

Subject
: The code first, then what it's for: “482915 is your Workbench code”. Phones show it in the notification, so people can read it off the lock screen.

Preheader
: How long it lasts, in one line: "This code works for 10 minutes."

Heading
: “Your sign-in code”, one `h1` at 24px.

What to do
: One line that says what the code is for. No greeting: the reader is mid sign-in and wants the digits.

Code
: The six digits in Menlo at 32px with 8px letter spacing, in a square paper box 24px from the text around it. The digits are one unbroken string with no spaces or dashes, so they copy cleanly, and `user-select: all` lets one tap pick up the whole code.

How long it lasts
: 10 minutes, the same as the hint on the code screen.

If it wasn't you
: One line saying they can ignore it.

## Code

The body, from `uniform/mailers/sign-in-code.html`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "sign-in-code.html")).strip %>
```

And the plain text, `uniform/mailers/sign-in-code.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "sign-in-code.txt")).strip %>
```

The filled plain-text email, with the layout around it:

```text
<%= raw render("examples/mailer_preview", slug: "sign-in-code", title: "482915 is your Workbench code", preheader: "This code works for 10 minutes.", sender: "Workbench", reason: "You’re getting this because someone asked to sign in to Workbench with this email address.", address: "it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1", plain_text: true).strip %>
```

In Rails, swap `482915` for `<%%= @code %>` in both files, and put the code
in the subject with
`mail(subject: "#{@code} is your Workbench code")`.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="mailer-sign-in-code-inbox">
<p>Workbench</p>
<p>Your verification code</p>
<p class="u-text-muted">Hello, please find your one-time code below. For your security…</p>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>The code is hidden in the body. Someone halfway through signing in has to open the email, find the code and switch back.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="mailer-sign-in-code-inbox">
<p>Workbench</p>
<p><span class="u-text-data">482915</span> is your Workbench code</p>
<p class="u-text-muted">This code works for 10 minutes.</p>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>The code leads the subject and the preview. They can read it from the inbox or the notification without opening anything.</span></figcaption>
</figure>
</div>

## Rules

The code is the email
: Put it in the subject and the body. Show it as one string of six digits with letter spacing for reading, never spaces or dashes that end up in what they paste.

No button, no link
: The code gets typed into the screen they already have open, as in the [Auth](/patterns/auth/) pattern. A sign-in link would open a new tab, or the wrong browser on a phone, and it's the thing phishing emails copy. With nothing to click, there's no primary button.

Say when it runs out
: Give the same 10 minutes the code screen shows. The screen itself offers a new code, so the email doesn't need to.

Tell them what to do if it wasn't them
: Nothing, in this case. Say that in one line, so a code they didn't ask for doesn't worry them.
