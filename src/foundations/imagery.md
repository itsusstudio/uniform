---
layout: page
title: Imagery
summary: "The kinds of image and how to make a halftone."
section: Foundations
permalink: /foundations/imagery/
---

Imagery covers the photos, product pieces and halftones on a page. Use a
picture only when words can't do the job.

## Three kinds of image

Pick the kind by what the image is for, never by what looks good. Colour photos
are for things people buy, and one-ink halftones are for people and tools.
Nothing is staged and nothing is stock.

<%= render "examples/image_types" %>

Halftones are printed matter: they always sit on off-white paper, even inside an
app. Photos and product pieces sit on white. Together, the halftones, Fig.
captions and paper are the studio's look, used most in blogs and articles.

## Halftone colours

A halftone prints in one ink: ink, vermilion, cobalt or pine. Never yellow, which
is too light to hold the dots on paper.

<%= render "examples/halftone_colours" %>

## Making a halftone

Every halftone comes from one script, so they all share the same dot screen.
Start from a photo of one subject on a plain, light background.

```sh
bin/halftone tape.jpg src/images/tape.webp --ratio 1:1 --background "#f5f4ef"
bin/halftone tape.jpg tape-cobalt.webp --ratio 1:1 --ink "#2f5bd3" --background "#f5f4ef" --cell 7 --white 0.95 --black 0.3 --gamma 0.6
```

It prints round dots on a 45 degree screen, bigger where the photo is darker, and
the same photo and options always give the same file. Run `bin/halftone --help`
for every option.

## Rules

The rules that hold for every screen are on [Rules](/start/rules/).

<%= render "rules", rules_home: "/foundations/imagery/" %>
