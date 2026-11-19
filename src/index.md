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

Uniform is built on Tailwind, so every Tailwind utility is there for the
layout and the one-off details around these blocks: `flex flex-col gap-6` for a
column, `md:grid-cols-3` for a row of tiles. When the same mix of utilities
turns up three times, it's a block Uniform is missing, and it moves into
Uniform.

When a component doesn't quite fit, override it with utilities on that screen.
A fix that more than one screen needs goes into Uniform for every product.

## The Swiss style

Much of Uniform comes from the International Typographic Style, the Swiss
graphic design of the 1950s and 60s. We take its method. Proportion and space
do the work, every line starts on one left edge with a ragged right, size and
order set the hierarchy, whitespace holds each group together, and nothing is
added for decoration.

We leave its costume behind. Bold display type, heavy black rules, square
corners on everything, black blocks and visible grid lines are what most
imitations copy, and on a screen they look generated. Uniform also softens the
style on purpose: buttons are pills so people can see what to press, type
stops at medium weight, and marketing pages sit on warm paper. When a screen
starts to look like a Swiss poster, it has gone too far. See
[Don't look generated](/start/rules/#dont-look-generated).

## Inspiration

- [Norma](https://normadesign.it/en/){:target="_blank" rel="noopener"}
- The International Typographic Style, the Swiss posters of the 1950s and 60s
- Josef Müller-Brockmann
- Emil Ruder
- Braun product design of the 1960s and 70s
- Old technical papers
- [Dalton Mills](https://daltonmills.com/){:target="_blank" rel="noopener"}
- [Brunch](https://www.brunch.work/information){:target="_blank" rel="noopener"}
- [UserJot](https://userjot.com/){:target="_blank" rel="noopener"}
- [Dodo Payments](https://dodopayments.com/){:target="_blank" rel="noopener"}
- [The Light Phone](https://www.thelightphone.com/blog){:target="_blank" rel="noopener"}
- [Fernand](https://getfernand.com/){:target="_blank" rel="noopener"}
- [Cloudship](https://cloudship.co.uk/){:target="_blank" rel="noopener"}
