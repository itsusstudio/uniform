---
layout: page
title: Photo strip
summary: "A short row of photos for one record."
section: Components
permalink: /components/photo-strip/
---

A photo strip shows the photos of one record, like an item on a job, as a row of small squares. It never takes more than one row: from the seventh photo on, the sixth square counts what's left.

## Example

<div class="example-frame">
<ul class="u-photo-strip" aria-label="Photos">
<li><button type="button" aria-label="ring-front.jpg"></button></li>
<li><button type="button" aria-label="ring-side.jpg"></button></li>
<li><button type="button" aria-label="ring-band.jpg"></button></li>
<li><button type="button" aria-label="ring-stone.jpg"></button></li>
<li><button type="button" aria-label="ring-box.jpg"></button></li>
<li><button type="button" aria-label="ring-hand.jpg" data-more="+4"></button></li>
<li><button type="button" aria-label="ring-7.jpg"></button></li>
</ul>
</div>

## Code

```html
<ul class="u-photo-strip" aria-label="Photos">
  <li><button type="button" aria-label="ring-front.jpg"><img src="…" alt=""></button></li>
  …
  <li><button type="button" aria-label="ring-hand.jpg" data-more="+4"><img src="…" alt=""></button></li>
  <li><button type="button" aria-label="ring-7.jpg"><img src="…" alt=""></button></li>
</ul>
```

Count
: Put `data-more` on the sixth button only when there are more than six photos. Its value is the number of photos from the sixth on, with a plus sign: ten photos give `data-more="+5"`. The strip dims that photo and writes the count over it.

Hidden photos
: Render every photo. The seventh and later stay in the page but hidden, so a photo viewer opened from the strip can step through all of them.

## Parts

<%= render "classes", classes_page: "/components/photo-strip/" %>

## Rules

One row
: Use a photo strip where photos support a record and the record's details come first. A gallery where photos are the content needs larger tiles.
