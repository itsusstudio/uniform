---
layout: page
title: Layout
summary: "The frame every email sits in."
section: Mailers
permalink: /mailers/layout/
---

The layout is the plain frame every email sits in: the sender's name, one white
column of writing and a footer. Use it for every email, and fill in only the
middle.

## Why emails are different

Email clients are old browsers with odd rules. Outlook on Windows draws HTML with
Word, so it ignores flex, grid and most padding on anything but table cells.
Gmail drops custom properties and cascade layers, and some clients strip the
`<style>` in the head altogether. Web fonts load almost nowhere.

So Uniform's CSS can't come along. Mailers are copyable HTML templates instead
of classes: tables with `role="presentation"` for the layout, a single centred
column up to 600px wide, every style written inline on its element, and system
fonts. The look carries over by hand, using the same hex values as the tokens.
The small `<style>` in the head only tightens the margins on phones and resets
link colours, and the email still reads fine when a client throws it away.

## Example

<% email = render("examples/mailer_preview", slug: "layout", title: "We’ve changed our hours", preheader: "From Nov 17 we’re open 10am to 7pm, Tuesday to Saturday.", sender: "Kensington Jewellery Repair", reason: "You’re getting this because you’re a customer of the shop.", address: "Kensington Jewellery Repair, 214 Augusta Ave, Toronto, ON M5T 2L4", unsubscribe_url: "https://kensingtonrepair.example/unsubscribe", body: render("examples/mailer_layout_sample")) %>
<%= render "examples/mailer_frames", email: email, name: "Hours change email", height: 640, phone_height: 760 %>

This one is a note to every customer, so it isn't transactional and the footer
ends with an unsubscribe link. A sign-in code or a receipt leaves that line out.

## Anatomy

Preheader
: The line most inboxes show after the subject. It's hidden in the email itself, and padded with blank characters so the inbox doesn't fill the rest of the line with body text.

Background
: White all the way to the edges, the same as the column, so the email reads like a letter and nothing frames it.

Column
: One table, 600px at most and fluid below that, with no border. It holds the sender's name and the content, 48px in from each side, 24px on a phone.

Sender's name
: Set in type at 16px medium, 24px from the top. No logo, so it reads the same with images off. For Workbench's own emails it's "Workbench". For an email sent for a shop, it's the shop's name.

Content
: Whatever the email says, 48px below the name and 48px above the footer. One `h1` at 24px, paragraphs at 16px with 24px between them, detail rows with 16px above and below, and at most one primary button, 44px tall with 48px of space around it. Every size and space comes from the Uniform scale.

Footer
: Below a hairline. The sender's name in ink, then the street and the city on their own lines in grey, one fact per line. Then Terms · Privacy as underlined links, and an Unsubscribe link on emails that aren't transactional. When a product sends for one of its users, like a shop's pickup email, Terms and Privacy are left out and a last line says “Powered by Workbench”.

## Who sends what

Workbench
: Sends to the shop's staff: sign-in codes and account email. The sender's name is "Workbench", and the footer address is it's us studio, 216-4035 rue Saint-Ambroise, Montréal QC H4C 2E1.

The shop
: Sends to its customers in its own name: job updates, quotes and receipts. The sender's name is the shop's, and so is the footer address.

## Colours

The hex values come from the light mode in `uniform/tokens.css`. If a token
changes there, change it here and in every mailer.

| Token | Hex | In email |
|---|---|---|
| `--u-color-text-default` | `#1a1a18` | Body text, headings, the button's fill |
| `--u-color-text-muted` | `#6b6964` | Footer and small print |
| `--u-color-bg-surface` | `#ffffff` | The whole email |
| `--u-color-bg-paper` | `#f5f4ef` | Text on the button, and the box around a sign-in code |
| `--u-color-divider` | `#e7e7e3` | Lines between rows, like on a receipt |
| `--u-color-link` | `#2449b0` | Links |
| `--u-color-danger` | `#c03a26` | Signal square for something wrong |
| `--u-color-warning` | `#f3c22c` | Signal square for something that needs attention |
| `--u-color-success` | `#277a4d` | Signal square for something done |
| `--u-color-info` | `#2f5bd3` | Signal square for information |

Emails are light only. The head sets `color-scheme` and
`supported-color-schemes` to light, and every background is set on its own
element, so a client that inverts the colours anyway gets dark text on light or
light text on dark, never dark on dark.

## Code

The layout, from `uniform/mailers/layout.html`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "layout.html")).strip %>
```

And its plain-text twin, `uniform/mailers/layout.txt`:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "layout.txt")).strip %>
```

Placeholders sit in double braces:

`{{ title }}`
: The subject line, used for the page title.

`{{ preheader }}`
: The hidden line inboxes show after the subject.

`{{ sender }}`
: The name at the top.

`{{ content }}`
: The email's body. Each mailer is a fragment that goes here.

`{{ address_name }}`, `{{ address_street }}`, `{{ address_city }}`
: The sender's name, street and city, each on its own line.

`{{ if terms_url }}` to `{{ end }}`
: The product's terms and privacy pages, in `{{ terms_url }}` and `{{ privacy_url }}`. Only on the product's own emails.

`{{ if sent_with }}` to `{{ end }}`
: Only when a product sends on a user's behalf. `{{ sent_with }}` is the product's name and `{{ sent_with_url }}` its site. Leave the block out of the product's own emails.

`{{ if unsubscribe_url }}` to `{{ end }}`
: Only for emails that aren't transactional. Leave the whole block out for the rest.

In Rails, `layout.html` becomes `app/views/layouts/mailer.html.erb` and
`layout.txt` becomes `app/views/layouts/mailer.text.erb`. Swap `{{ content }}`
for `<%%= yield %>`, each other placeholder for an instance variable or
`content_for`, and the unsubscribe block for `<%% if @unsubscribe_url %>` and
`<%% end %>`.

The body from the example shows the building blocks: a heading, paragraphs and
the primary button. The button is a table cell with an ink fill and a link
inside it, so it works with images off. Outlook ignores the rounded corners and
draws it square, which is fine.

```html
<%= raw render("examples/mailer_layout_sample").strip %>
```

## Do and don't

<div class="examples u-grid u-gap-6">
<figure class="example u-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="mailer-mock mailer-mock-centred">
<div class="mailer-layout-blocked">Kensington logo</div>
<p class="u-text-heading">WE’VE CHANGED OUR HOURS</p>
<p class="u-text-small u-text-muted">Images are hidden. Show images</p>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>A logo image and a centred headline up top. Plenty of inboxes block images, so the first thing the reader sees is an empty box.</span></figcaption>
</figure>
<figure class="example u-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="mailer-mock">
<p>Kensington Jewellery Repair</p>
<p class="u-text-heading">We’ve changed our hours</p>
<p class="u-text-small">Hi Ana, from Monday, Nov 17 we open at 10am and close at 7pm.</p>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>The sender's name in type and the heading flush left. It reads the same with images on or off.</span></figcaption>
</figure>
</div>

## Rules

One layout for every email
: Write the body and fill in the placeholders. Don't change the frame for one email, so every message looks like it came from the same place. It should read like a note from someone you know.

Unsubscribe only where it belongs
: A transactional email is part of something the reader asked for: a sign-in code, a pickup notice for a job they left with the shop, a receipt. Those have no unsubscribe link. Anything else, like news, reminders or a change of hours, gets one, and it has to work in one click.

Text first, no images
: No logos, hero images, social icons or tracking pixels. Everything that matters is text, so it reads the same in every client with images on or off.

Always send the plain text
: Every email goes out with its `.txt` version too, written as carefully as the HTML. Some people read only that.
