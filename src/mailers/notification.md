---
layout: page
title: Notification
summary: "An email that tells a customer what changed."
section: Mailers
permalink: /mailers/notification/
---

A notification tells a customer about a change to something they're waiting
on, with one button to its page. Use it for each update a customer should hear
about.

## Example

<% email = render("examples/mailer_preview", slug: "notification", title: "Your ring is ready for pickup", preheader: "Job #1042, ring resize. $85.00 to pay at pickup, Tuesday to Saturday, 10am to 7pm.", sender: "Kensington Jewellery Repair", reason: "You’re getting this because you have a repair in with us.", address: "Kensington Jewellery Repair, 214 Augusta Avenue, Toronto ON") %>
<%= render "examples/mailer_frames", email: email, name: "Notification email", height: 840, phone_height: 960 %>

It comes from the shop's name and puts the news in the heading, then the few
details that matter at the counter, then one button to the job's page.

### A quote to approve

The same template, asking Ana to approve a quote before the work starts. Only
the heading, the rows, the status and the button change.

<% quote = render("examples/mailer_preview", slug: "notification-quote", title: "Your quote is ready", preheader: "Job #1051, new crown and full service. $140.00, waiting on your approval.", sender: "Kensington Jewellery Repair", reason: "You’re getting this because you have a repair in with us.", address: "Kensington Jewellery Repair, 214 Augusta Avenue, Toronto ON") %>
<%= render "examples/mailer_frames", email: quote, name: "Quote notification email", height: 800, phone_height: 880 %>

## Anatomy

Heading
: The one fact the email exists for, in plain words: "Your ring is ready for pickup". It's also the subject line, so the inbox says it before the email is opened.

Greeting
: One or two sentences to the customer by first name, saying what happened and what to do next.

Details
: Rows of label and value, split by divider lines. Labels are 16px muted, values 16px ink. Job numbers, amounts and codes are in Menlo. Keep to what someone needs at the counter: the job, the work, the status, what's owing (or "Paid"), hours and where.

Status
: An 8px coloured square with an ink word beside it, like the status on screen. The word carries the meaning, so the row still reads right in clients that drop the square.

Button
: One primary ink pill that opens the job's status page. Its label says where it goes: "View your repair", "Review your quote".

Sign-off
: A last line with anything useful (who can pick it up, how to ask a question) and the owner's first name. Replies go to the shop.

Each job update uses the same shape. Swap the heading, status and rows:

| Update | Heading | Status word | Button |
|---|---|---|---|
| Ready for pickup | Your ring is ready for pickup | Ready for pickup | View your repair |
| Quote to approve | Your quote is ready | Waiting on you | Review your quote |
| Waiting on parts | Your watch is waiting on a part | Waiting on parts | View your repair |
| Overdue for pickup | Your ring is still here for you | Ready since Nov 14 | View your repair |

The square takes the colour of the job's status, from the table on
[Badge](/components/badge/#rules).

## Code

The body, from `uniform/mailers/notification.html`. It goes where the layout
has `{{ content }}`:

```html
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "notification.html")).strip %>
```

The plain text, from `uniform/mailers/notification.txt`. Labels are padded so
the values line up in a monospace reader:

```text
<%= raw File.read(File.join(Studio::Uniform.mailers_path, "notification.txt")).strip %>
```

The quote is in `uniform/mailers/notification-quote.html` and
`notification-quote.txt`. The status square uses the hex values from the
[Layout](/mailers/layout/) colour table: `#277a4d` pine, `#f3c22c` yellow,
`#2f5bd3` cobalt, `#c03a26` vermilion.

These are transactional, so leave the layout's unsubscribe block out.

## Do and don't

<%= render "examples/mailer_notification_do_dont" %>

## Rules

Lead with the news
: The heading and subject say what changed. Never "An update on your job" with the answer behind a link. Someone should get everything they need from the inbox preview and a glance, without signing in to anything.

From the shop, in the shop's voice
: The sender is the shop's name and the sign-off is a person there. Write it the way the owner would say it at the counter.

Status is a square and a word
: Use the same words the shop sees on screen. See [Words carry the meaning](/foundations/colour/#words-carry-the-meaning).

One button, to the job
: The button opens that job's status page. Everything else in the email is there to read, not to click.
