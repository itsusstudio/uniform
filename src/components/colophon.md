---
layout: page
title: Colophon
summary: "The foot of a client-facing page, set on the page grid."
section: Page frame
permalink: /components/colophon/
---

The colophon closes every page that opens with a [masthead](/components/masthead/). It says whose page this is and how to reach them: the business name, its address and its phone number and email address, in columns that line up with the masthead above.

## Example

<div class="example-frame">
<footer class="u-colophon">
<div class="u-container">
<div><p>Rowe Parisian</p><p><a href="#example">Powered by Workbench</a></p></div>
<address><a href="#example">4120 Saint-Denis St<br>Montréal QC H2W 2M5<br>Canada</a></address>
<ul aria-label="Contact Rowe Parisian"><li><a href="#example">(514) 555-0142</a></li><li><a href="#example">atelier@roweparisian.com</a></li></ul>
</div>
</footer>
</div>

## Code

```html
<footer class="u-colophon">
  <div class="u-container max-w-page">
    <div>
      <p>Rowe Parisian</p>
      <p><a href="https://useworkbench.co">Powered by Workbench</a></p>
    </div>
    <address>
      <a href="https://www.google.com/maps/search/?api=1&query=…">4120 Saint-Denis St<br>Montréal QC H2W 2M5<br>Canada</a>
    </address>
    <ul aria-label="Contact Rowe Parisian">
      <li><a href="tel:+15145550142">(514) 555-0142</a></li>
      <li><a href="mailto:atelier@roweparisian.com">atelier@roweparisian.com</a></li>
    </ul>
  </div>
</footer>
```

Columns
: The first `<div>` spans six of twelve columns and every other child spans three, matching the masthead's name and link columns.

Space
: There is no rule above it. 64px of space sets it apart from the page.

## On a phone

Below 640px every column takes the full width and they stack in order.

## Parts

<%= render "classes", classes_page: "/components/colophon/" %>

## Rules

Only what's filled in
: Leave out an address, phone number or email address the business hasn't given. Never show an empty line or "None".

Links in the text colour
: Contact links use the text colour and underline on hover, like the masthead's, so the foot stays quiet.
