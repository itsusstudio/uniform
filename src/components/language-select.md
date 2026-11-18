---
layout: page
title: Language select
summary: "A small pill that switches the language a person sees."
section: Components
permalink: /components/language-select/
---

The language select lets someone switch the language of the screens they see,
from a header where there's no settings page yet, like setup or sign-in. It's
the browser's own select, set as a small pill with a globe and a chevron. Add
`u-language-select-full` to show the language's name between them.

<%= render "example_heading" %>

<div class="example-frame">
<div class="u-row u-gap-6">
<select class="u-input u-language-select" aria-label="Language">
<option selected>English</option>
<option>Français</option>
</select>
<select class="u-input u-language-select u-language-select-full" aria-label="Language">
<option selected>English</option>
<option>Français</option>
</select>
</div>
</div>

## Code

```html
<select class="u-input u-language-select" aria-label="Language">
  <option value="en" selected>English</option>
  <option value="fr">Français</option>
</select>

<select class="u-input u-language-select u-language-select-full" aria-label="Language">
  <option value="en" selected>English</option>
  <option value="fr">Français</option>
</select>
```

```erb
<%%= form_with url: locale_path, method: :patch do |form| %>
  <%%= form.select :locale, I18n.available_locales.map { |code| [language_name_for(code), code] },
        {selected: I18n.locale}, class: "u-input u-language-select", aria: {label: t(".language")} %>
<%% end %>
```

It takes everything from the [select](/components/select/): on a computer the
list opens as a menu, with a check by the current language, and on a phone it
opens the phone's own picker. The picker lines up with the pill's right edge,
since the pill sits at the end of a header.

Saving the choice is the app's job. Submit the form on change and store the
language on the person, so every screen and email follows it.

## Rules

Each language in its own words
: Write every option in its own language, “English”, “Français”, never
  translated, so someone who can't read the current language still finds theirs.

Small by default
: Use the small pill, just the globe and the chevron, unless there's room and a
  reason to show the language, like a wide poster with nothing else at its top.

Label it for screen readers
: The pill has no visible label, so give the select an `aria-label` like
  “Language”, in the current language.

Only before there's a settings page
: Use it on pages without the app's sidebar, like setup and sign-in. Inside the
  app, the language lives in the profile settings.
