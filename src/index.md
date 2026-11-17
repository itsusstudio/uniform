---
layout: page
title: Philosophy
summary: "What Uniform is for, and the ideas behind every component and rule."
section: Start
---

Uniform is the design system behind every it's us studio product. It keeps our
apps and sites plain and easy to use: clear type, plenty of space, and nothing
added just for looks. It borrows from Swiss posters, old technical manuals, and
Norma's idea that good design does nothing special.

<%= render "figure",
  src: "/images/philosophy/stool-halftone.webp", width: 960, height: 1200, field: :info, span: 5,
  alt: "A wooden workshop stool with three legs and a round seat, printed as paper-coloured halftone dots on cobalt blue",
  caption: nil %>

## Do nothing special

The design studio [Norma](https://normadesign.it/en/){:target="_blank" rel="noopener"}
describes good design as something that "does absolutely nothing special".
Products that work hard to stand out tend to end up
looking alike, and pages built to impress become slow and confusing, often
needing a recent-model computer or phone to run well. We work with what the browser
already does well and keep the focus on getting information across clearly.
Plain pages also stay light, so they load quickly on older devices and slow
connections.

## Opinionated components

Every component makes its own decisions. A card already knows its padding, a
form field already knows where its label and hint go, and a table already knows
how far apart its rows sit. Builders choose the component that fits and put it
in place, without setting spacing, sizes or layout themselves. Screens come together
from parts that already fit, like building blocks, so two builders
making the same screen end up with the same result.

The same goes for the smallest pieces. A heading with a line under it is an
`<hgroup>`, a date beside a row is `u-meta`, a row of buttons is `u-actions`,
and fields go in a `u-form`. Each one carries its own type, colour and gaps, so
nobody has to remember that a meta line is 14px, muted and mono, or that
fields sit 16px apart.

The utility classes, like `u-text-small` or `u-gap-4`, stay for the rare screen
no block covers. When the same mix of utilities turns up twice, it's a block
Uniform is missing.

When a component doesn't fit, Uniform is missing something. The fix goes into
Uniform for every product, not into a one-off tweak on the page.

## Inspiration

- [Norma](https://normadesign.it/en/){:target="_blank" rel="noopener"}
- Swiss posters of the 1950s and 60s
- Braun product design of the 1960s and 70s
- Old technical papers
- [Dalton Mills](https://daltonmills.com/){:target="_blank" rel="noopener"}
- [Brunch](https://www.brunch.work/information){:target="_blank" rel="noopener"}
- [UserJot](https://userjot.com/){:target="_blank" rel="noopener"}
- [Dodo Payments](https://dodopayments.com/){:target="_blank" rel="noopener"}
- [The Light Phone](https://www.thelightphone.com/blog){:target="_blank" rel="noopener"}
- [Fernand](https://getfernand.com/){:target="_blank" rel="noopener"}
- [Cloudship](https://cloudship.co.uk/){:target="_blank" rel="noopener"}
