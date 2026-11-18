---
layout: page
title: Setup shell
summary: "The frame for the few questions right after sign-up."
section: Page frame
permalink: /components/setup-shell/
---

The setup shell holds the short run of questions a new account answers right
after signing up, before it reaches the app. It's a plain white page with the
form centred, so moving from sign-up into setup reads as a new stage, and one
segment per step shows how far along someone is.

<%= render "example_heading" %>

<div class="frame frame-desktop" style="height: 520px">
<%= render "screen", title: "Setup shell, step 2 of 5", html: <<~HTML
<div class="u-setup-shell">
  <header>
    <span class="u-wordmark u-wordmark-serif">Workbench</span>
    <ol aria-hidden="true"><li></li><li aria-current="step"></li><li></li><li></li><li></li></ol>
    <p>Step 2 of 5</p>
  </header>
  <main>
    <hgroup>
      <h1 class="u-text-page-title" id="demo-goals">What do you want help with?</h1>
      <p class="u-text-small">Your answers help us serve you best.</p>
    </hgroup>
    <form class="u-form">
      <fieldset class="u-fieldset" aria-labelledby="demo-goals">
        <label class="u-checkbox"><input type="checkbox"> Keeping track of repairs</label>
        <label class="u-checkbox"><input type="checkbox"> Keeping clients updated</label>
        <label class="u-checkbox"><input type="checkbox" data-u-exclusive> Just looking around</label>
      </fieldset>
      <button type="button" class="u-btn u-btn-primary">Continue</button>
    </form>
    <div class="u-row u-gap-6 u-text-small"><a href="#">Back</a><a href="#">Skip</a></div>
  </main>
  <footer>
    <select class="u-input u-language-select" aria-label="Language"><option>English</option><option>Français</option></select>
  </footer>
</div>
HTML
%>
</div>

## Code

```html
<div class="u-setup-shell">
  <header>
    <span class="u-wordmark u-wordmark-serif">Workbench</span>
    <ol aria-hidden="true">
      <li></li>
      <li aria-current="step"></li>
      <li></li>
    </ol>
    <p>Step 2 of 3</p>
  </header>
  <main>…</main>
  <footer>
    <form>…language select…</form>
  </footer>
</div>
```

Header
: The app's name in [`u-wordmark`](/components/wordmark/), not a link, so
  nobody leaves halfway. Then an `<ol>` with one empty `<li>` per step: the one
  with `aria-current="step"` and every one before it fill in. It's hidden from
  screen readers, since the `<p>` after it says the same in words.

Main
: One step, centred, up to 384px wide: a heading and its line in an `<hgroup>`,
  the form, then Back and Skip in a small row.

Footer
: Optional. A [language select](/components/language-select/), centred at the
  foot of the page.

## Rules

Only right after sign-up
: Use it for the first questions a new account answers, never for a task later
  on. A later task with steps uses the [task shell](/components/task-shell/).

Centred on purpose
: Every other Uniform page sits on one left edge. The setup shell centres its
  column so the step between signing up and the app reads as its own stage.

Ask only what the first visit needs
: Required fields only where the app can't work without the answer, like the
  business name. Every other step has Skip.

One question per page
: After the first page, put one question on each page, with the question as
  the heading, so each answer takes a tap.
