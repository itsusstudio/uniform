---
layout: page
title: "Text: Caption"
summary: "Words under a picture, with an optional title."
section: Components
permalink: /components/caption/
---

A caption says what a picture shows. It's the plain `<figcaption>`, styled with no classes.

## Example

<%= render "examples/image_types" %>

Start the caption with a `<strong>` to give it a title on its own line.

## Code

```html
<figure>
  <img src="ring.webp" width="960" height="960" alt="A gold band, size 7, on a white bench mat">
  <figcaption><strong>Colour photo</strong>Anything someone buys or needs to see exactly as it is.</figcaption>
</figure>
```

## Parts

<%= render "classes", classes_page: "/components/caption/" %>

## Rules

Always a figcaption
: Write a caption as a `<figcaption>`, never a stack of `u-text-strong` and `u-text-small u-text-muted`.

The alt text describes, the caption explains
: The image's `alt` says what's in it for people who can't see it. The caption adds what everyone needs to know, so the two never repeat each other.
