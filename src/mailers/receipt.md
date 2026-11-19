---
layout: page
title: Receipt
summary: "The record a customer gets after paying."
section: Mailers
permalink: /mailers/receipt/
---

A receipt is the record a customer gets after they pay. Use it for every
payment, with every charge written out as plain text.

## Example

<% email = render("examples/mailer_preview", slug: "receipt", title: "Your receipt for job #1042", preheader: "You paid $96.05 on Nov 14 for your ring resize and rhodium plating.", sender: "Kensington Jewellery Repair", reason: "You’re getting this because you paid for a job at the shop.", address: "Kensington Jewellery Repair, 214 Augusta Avenue, Toronto ON") %>
<%= render "examples/mailer_frames", email: email, name: "Receipt email", height: 1040, phone_height: 1160 %>

## Anatomy

Heading
: "Receipt for job" and the job number, so a search for "receipt" or "#1042" finds it years later.

Opening line
: The total paid and the date paid in the first sentence. That's what most people open a receipt to check.

Line items
: A real table with a header row. Each charge on its own row, then the subtotal, the tax with its rate, and the total paid in medium weight. Amounts sit right-aligned in mono so the decimals line up. Rows are split by `#ebeae6` dividers, with an ink rule under the header, like Uniform's table.

Payment details
: A second table, 48px below: how they paid (card brand and last four digits only), the date, the receipt number, the job number and the shop's HST number. Labels in muted text, values in mono.

Closing line
: How to reach the shop if something looks wrong, signed by a person.

Footer
: The layout's footer with the shop's name and address. A receipt is transactional, so there's no unsubscribe link.

## Code

The view. One file makes both the HTML and the plain-text part: in Rails,
`uniform_mail` gives the blocks for the format being rendered, and the
[layout](/mailers/layout/) goes around them.

<%= render "mailer_code", slug: "receipt" %>

The line items use `<th scope="col">` and the payment details use
`<th scope="row">`, so a screen reader reads each amount with its label. Both
tables carry `page-break-inside: avoid` and the body has no background fills,
so it prints as ink on white without a table splitting across two pages.

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="mailer-mock">
<p>Kensington Jewellery Repair</p>
<p class="text-heading">Thanks for your order</p>
<p class="text-small">Hi Ana, your receipt is attached.</p>
<p class="mailer-receipt-file text-small"><span class="u-data">receipt-1042.pdf</span><span class="text-muted">48 KB</span></p>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>The amounts live only in a PDF. The inbox can't search it, the preview shows nothing, and on a phone it's one more thing to open.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="mailer-mock">
<p>Kensington Jewellery Repair</p>
<p class="text-heading">Receipt for job <span class="u-data">#1042</span></p>
<p class="text-small">Hi Ana, you paid <span class="u-data">$96.05</span> on <span class="u-data">Nov 14, 2026</span>.</p>
<div class="u-table" tabindex="0" role="region" aria-label="Receipt">
<table class="mailer-receipt-table">
<thead><tr><th scope="col">Item</th><th scope="col" class="u-table-num">Amount</th></tr></thead>
<tbody>
<tr><td>Ring resize</td><td class="u-table-num">$70.00</td></tr>
<tr><td>Rhodium plating</td><td class="u-table-num">$15.00</td></tr>
<tr><td>HST (13%)</td><td class="u-table-num">$11.05</td></tr>
<tr class="mailer-receipt-total"><td>Total paid</td><td class="u-table-num">$96.05</td></tr>
</tbody>
</table>
</div>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>The total and date first, then every charge as text in the email itself. It turns up in a search and prints the way it looks.</span></figcaption>
</figure>
</div>

## Rules

Total and date first
: The first sentence says how much was paid and on what day. Everything after it is the detail behind that number.

Every charge as text
: People keep a receipt, search for it at tax time and sometimes print it. List each item, the subtotal, the tax with its rate and the total in the email. A PDF can come along too, but the email has to stand on its own.

Never the full card number
: Show the card brand and the last four digits, nothing more. No expiry date, no billing address.

No button
: A receipt asks nothing of the reader, so it has no primary button and nothing to sell. If your app has a page for the job, a plain link in the closing line is enough.
