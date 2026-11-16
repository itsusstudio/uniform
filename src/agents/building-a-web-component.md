---
layout: page
title: Building a web component
section: For agents
permalink: /agents/building-a-web-component/
summary: "How a Uniform custom element is written, from markup first to cleanup."
---

Most components are HTML and CSS. A component gets a script only when the
browser can't do the job alone, and then the script is a custom element in
`uniform/uniform.js`.

## HTML first

Reach for the platform before a script: `<dialog>`, `popover`, `<details>`,
`<select>`, native validation, `:has()` and anchor positioning. A toggle group is
radios. A menu is a popover. A bulk bar shows with `:has(:checked)`.

## The rules

Wrap markup that already works
: The page works with the script blocked. The element only adds to it, like filtering a list or remembering a choice.

Light DOM
: Never shadow DOM. Uniform's CSS styles everything inside, and the builder's markup stays the markup.

Find parts by structure
: Look inside the element only, with `:scope > input`, ARIA roles or tags. Use a `data-` hook only when nothing else tells two parts apart, and a `u-` class only when the part needs styling too.

Build only from what's on the page
: An element may draw presentation from markup it was given: a chart from its `<table>`, digit boxes from `maxlength`, a column menu from the `<th>`s, an editor from a `<template>`. It never invents content.

Words come from the markup
: Any text the script shows, like "Saved" or "Undo", comes from a `data-` attribute on the element, with English as the fallback. The app translates it.

Talk through events
: Dispatch a bubbling `CustomEvent` named for the element, like `data-grid:change`. Make it cancelable when an app might handle the work itself.

## Shape

```js
define("u-example", class extends UniformElement {
  setup(signal) {
    const input = this.querySelector(":scope > input")
    if (!input) return
    input.addEventListener("input", () => this.update(input), { signal })
  }
})
```

`UniformElement` runs `setup` once when the element connects and aborts every
listener when it leaves the page. Pass `signal` to every listener, and return
early when a part is missing. `define` skips a name that's already taken.

## Adding one

1. Write the element in `uniform/uniform.js`.
2. Add it to the `display` rule at the end of `base.css`, or it renders inline.
3. Add one entry to `src/_data/elements.yml`: what it wraps, what it adds, and what happens without JavaScript.
4. Document it on its component page, with HTML and Rails code.

## Checklist

- Works with the script blocked.
- No shadow DOM. Anything it draws comes from markup on the page.
- Every listener has the `signal`.
- No text in the script without a `data-` attribute to replace it.
- In the `display` rule and in `elements.yml`.
