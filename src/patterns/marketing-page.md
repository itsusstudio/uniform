---
layout: page
title: Marketing page
summary: "The header, headline and lead that open a marketing page."
section: Patterns
permalink: /patterns/marketing-page/
---

A marketing page opens with the [site header](/components/site-header/), one
headline and a lead line. Use it for the top of every page on a product's site.

## Example

<div class="frame frame-paper frame-desktop" style="height: 470px">
<%= render "examples/pattern_marketing_page", id: "marketing-desktop", live: false, banner: true %>
</div>

The pricing page, with an announcement above the header. The headline is the
one hero line on the page, and the lead stops at half the grid so it reads in
two or three lines.

The headline answers the question that brought the visitor here. The lead says
the rest in a sentence, with the numbers that matter.

### On a phone

<div class="u-row u-row-top u-gap-6 frame-phones">
<div class="u-stack u-gap-2">
<div class="frame frame-paper frame-phone" style="height: 600px">
<%= render "examples/pattern_marketing_page", id: "marketing-phone", live: true, banner: false %>
</div>
<p class="u-text-small u-text-muted">Menu closed: the name, the trial and Menu. Try Menu.</p>
</div>
<div class="u-stack u-gap-2">
<div class="frame frame-paper frame-phone frame-phone-open" style="height: 600px">
<%= render "examples/pattern_marketing_page", id: "marketing-phone-open", live: false, banner: false %>
</div>
<p class="u-text-small u-text-muted">Menu open: the links, then Sign in and Français under a divider.</p>
</div>
</div>

On a phone the links step behind Menu and the trial stays in the bar. The
headline and the lead take the full width.

## Anatomy

Announcement
: Optional. A [banner](/components/banner/) right before the header, which gives it a thin one-line strip.

[Site header](/components/site-header/)
: The name, three to five links, Sign in and the language, and the trial button.

Hero
: A [container](/components/container/) holding a [stack](/components/stack/) with a 24px gap: the headline in `u-text-hero`, then a [grid](/components/grid/) whose `u-span-6` holds the lead in `u-text-lead`. See [Typography](/foundations/typography/).

## Code

```html
<%= raw render("examples/pattern_marketing_page", id: "site", live: true, banner: true).strip %>
```

## Do and don't

<%= render "examples/site_header_do_dont" %>

## Rules

One hero line per page
: `u-text-hero` appears once, at the top. Every heading after it is smaller.

The trial lives in the header
: Don't repeat the trial button under the headline. One way in, in the same spot on every page.
