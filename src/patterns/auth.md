---
layout: page
title: Auth
summary: "Sign-in and sign-up screens that use an emailed code."
section: Patterns
permalink: /patterns/auth/
---

Auth is the set of screens that sign people in and up with a code sent to
their email address, never a password. Use it for every app's way in.

<%= render "example_heading" %>

Every screen sits in the [auth shell](/components/auth-shell/): from 1024px up,
the form on the left third with the terms and privacy links under it, and an ink
poster with the app's name and a two-line blurb on the right two thirds. Each screen asks one thing, so people see where they are and then the
one box to fill in.

### Sign in

<div class="frame" style="height: 560px">
<%= render "screen", title: "Sign in", html: render("examples/pattern_auth_sign_in", id: "auth-in", tag: "div") %>
</div>

### Enter the code

<div class="frame" style="height: 560px">
<%= render "screen", title: "Enter the code", html: render("examples/pattern_auth_code", id: "auth-code", tag: "div", error: false) %>
</div>

### Wrong code

<div class="frame" style="height: 560px">
<%= render "screen", title: "Wrong code", html: render("examples/pattern_auth_code", id: "auth-code-error", tag: "div", error: true) %>
</div>

The field keeps what they typed, a vermilion ring sits around it and the message says
what to do next. The way out, sending a new code, sits right below.

### Sign up

<div class="frame" style="height: 560px">
<%= render "screen", title: "Sign up", html: render("examples/pattern_auth_sign_up", id: "auth-up", tag: "div") %>
</div>

### On a phone

<div class="u-row u-items-start u-gap-6 frame-phones">
<div class="frame frame-phone" style="height: 720px">
<%= render "screen", title: "Sign in on a phone", html: render("examples/pattern_auth_sign_in", id: "auth-phone-in", tag: "div") %>
</div>
<div class="frame frame-phone" style="height: 720px">
<%= render "screen", title: "Wrong code on a phone", html: render("examples/pattern_auth_code", id: "auth-phone-code", tag: "div", error: true) %>
</div>
</div>

On a tablet the poster narrows to a plain ink third on the right, and on a phone it goes. On both the app's name sits on white above the form.
The column fills the width inside a 16px margin, and the button stays full
width, right under your thumb.

## Anatomy

Frame
: The [auth shell](/components/auth-shell/): the app name in its `<header>`, the screen in its `<main>`, and the terms and privacy links in its `<footer>`. Every studio app uses the same one.

Heading
: `u-text-page-title`, the screen's one `h1`. A line under it, like where the code went or why someone is back on this screen, goes with it in an `<hgroup>`. See [Typography](/foundations/typography/).

Form
: A [`u-form`](/components/form/) holding the [text fields](/components/text-field/), then the [primary button](/components/button/). The form stretches the button to the column's width.

Code field
: A [code input](/components/input-code/): one box per digit over a single input, so pasting and filling the code from a text message work. A wrong code gets `aria-invalid="true"` and a `u-error` under it.

Links
: Going to another screen, like “Sign up”, is a plain [link](/components/link/). Sending a new code does something, so it's a `<button>` in its own form with [`u-link-btn`](/components/link/#link-button), which makes it look like a link.

## Code

```html
<%= raw render("examples/pattern_auth_sign_in", id: "sign-in", tag: "main").strip %>

<%= raw render("examples/pattern_auth_code", id: "code", tag: "main", error: true).strip %>

<%= raw render("examples/pattern_auth_sign_up", id: "sign-up", tag: "main").strip %>
```

The page's `<body>` stays white. On the code screen, leave out `aria-invalid`
and the error until a code doesn't match.

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<section class="u-card auth-demo-centred">
<div class="u-card-content">
<p class="u-text-heading">Welcome back to Workbench</p>
<p class="u-text-small u-text-muted">Enter your email address and we’ll send you a code</p>
<input class="u-input" aria-label="Email address" placeholder="Email address">
<button type="button" class="u-btn u-btn-primary">Send code</button>
</div>
</section>
</div>
<figcaption class="example-caption example-caption-dont"><span>Centred text in a box. Every line starts somewhere new, the placeholder stands in for a label, and the card draws a border around a form that’s already alone on the page.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-grid">
<div class="u-span-8 u-stack">
<p class="u-text-heading">Sign in</p>
<form class="u-form" action="#do-and-dont">
<div class="u-field">
<label for="auth-do-email">Email address</label>
<input class="u-input" id="auth-do-email" type="email" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder=" ">
</div>
<button type="button" class="u-btn u-btn-primary">Send code</button>
</form>
</div>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>One left edge for the heading, label, box and button, straight on the page.</span></figcaption>
</figure>
</div>

## Rules

Ink for the name, the surface for the work
: The ink poster carries the app's name and a two-line blurb, and nothing else: no feature list, screenshot or testimonial. The form sits on the app's own surface, so a link from the site lands you in the place you'll work.

Keep the form flush left
: The app name, heading, labels, boxes and button share one left edge on the page margin.

One question per screen
: Ask for the email address, then the code, then nothing else. Sign up adds only the person's name. Anything the app needs to set up comes after, on its own screen.

Show where the code went
: Set the address in medium weight in the line under the heading, so a typo stands out before anyone waits for a code. Sending a new code sits on the same screen.

Say why they're back under the heading
: When a code ran out, took too many wrong tries or an invite link no longer works, sign-in says so under its heading as a `u-error` line. News like being signed out everywhere is a small grey line in the same place. Never a banner: nothing failed, and the next step is right below.

<script>
document.addEventListener("submit", (event) => { if (event.target.closest(".frame, .example")) event.preventDefault() })
document.addEventListener("click", (event) => { if (event.target.closest(".frame a")) event.preventDefault() })
</script>
