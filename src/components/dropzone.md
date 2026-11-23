---
layout: page
title: Dropzone
summary: "A file input with a drop area and file rows."
section: Components
permalink: /components/dropzone/
---

A dropzone adds files to a form, picked or dropped. Each file gets a row, to watch it upload or take it out.

## Example

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/dropzone_photos", id: "dz-live" %>
</div>
</div>

Drop photos on the area, or click it to choose them. Each file gets a row with a
thumbnail, its size and an upload bar, then a check. A file over 10 MB, or one
that isn't a JPG, PNG or HEIC, gets a row with the reason and stays out of the
form. Nothing really uploads here.

<script>
document.getElementById("dz-live-field").addEventListener("dropzone:change", (event) => {
  event.detail.added.filter((item) => !item.error).forEach(({ row }) => {
    const bar = row.querySelector("progress")
    const done = row.querySelector("[data-dropzone-done]")
    bar.value = 0
    bar.hidden = false
    const timer = setInterval(() => {
      bar.value = Math.min(bar.max, bar.value + 10)
      if (bar.value < bar.max) return
      clearInterval(timer)
      bar.hidden = true
      done.hidden = false
    }, 120)
  })
})
</script>

## States

<div class="u-grid">
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">Files over the area</p>
<div class="example-frame">
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-over", label: "Photos of the piece", drop: "Drop photos here", choose: "choose files", hint: "JPG, PNG or HEIC, up to 10 MB each.", accept: "image/jpeg,image/png,image/heic,.heic", multiple: true, over: true %>
</div>
</div>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">Uploading, done and too big</p>
<div class="example-frame">
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-rows", label: "Photos of the piece", drop: "Drop photos here", choose: "choose files", hint: "JPG, PNG or HEIC, up to 10 MB each.", accept: "image/jpeg,image/png,image/heic,.heic", multiple: true %>
<ul class="u-list">
<%= render "examples/dropzone_file", name: "IMG_4821.HEIC", size: "2.4 MB", state: "done", kind: "photos", photo: "/images/dropzone/ring-4821.webp" %>
<%= render "examples/dropzone_file", name: "IMG_4822.HEIC", size: "3.1 MB", state: "uploading", kind: "photos", value: 60, photo: "/images/dropzone/ring-4822.webp" %>
<%= render "examples/dropzone_file", name: "IMG_4823.HEIC", size: "14.2 MB", state: "size", kind: "photos" %>
</ul>
</div>
</div>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">One file</p>
<div class="example-frame">
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-receipt", label: "Receipt for the part", drop: "Drop the receipt here", choose: "choose a file", hint: "PDF, JPG or PNG, up to 10 MB.", accept: "application/pdf,image/jpeg,image/png" %>
<ul class="u-list">
<%= render "examples/dropzone_file", name: "receipt-crown-and-stem.pdf", size: "182 KB", state: "done", kind: "receipt" %>
</ul>
</div>
</div>
</div>
<div class="@grid:col-span-6 flex flex-col gap-2">
<p class="text-small font-medium">Error and disabled</p>
<div class="example-frame flex flex-col gap-6">
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-error", label: "Photos of the piece", drop: "Drop photos here", choose: "choose files", hint: "JPG, PNG or HEIC, up to 10 MB each.", accept: "image/jpeg,image/png,image/heic,.heic", multiple: true, invalid: true, describedby: "dz-error-message" %>
<p class="u-error" id="dz-error-message">Add at least one photo of the piece.</p>
</div>
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-disabled", label: "Photos of the piece", drop: "Drop photos here", choose: "choose files", hint: "JPG, PNG or HEIC, up to 10 MB each.", accept: "image/jpeg,image/png,image/heic,.heic", multiple: true, disabled: true, describedby: "dz-disabled-why" %>
<small id="dz-disabled-why">Photos are locked once the job is picked up.</small>
</div>
</div>
</div>
</div>

Files over the area
: The edge turns ink and the area fills with paper.

Uploading
: The row shows the file's name, its size and a [progress](/components/progress/) bar that your upload code fills.

Done
: A check and "Uploaded" replace the bar. Photos show a thumbnail. Files the browser can't preview, like a PDF or a HEIC photo in Chrome, show a file icon.

Too big or the wrong type
: The row stays, with a `u-error` that says what fits: "Too big. Photos can be up to 10 MB." The file stays out of the form.

Error
: For a problem with the whole field, set `aria-invalid="true"` on the input and add a `u-error` under the area, as on a [text field](/components/text-field/). The edge turns vermilion.

Disabled
: Disable the input to grey out the area and stop it taking files. Say why in a hint.

## Code

```html
<u-dropzone>
  <div class="u-field">
    <label id="intake-label" for="intake-photos">Photos of the piece</label>
    <label class="u-dropzone">
      <input id="intake-photos" type="file" name="photos[]"
        accept="image/jpeg,image/png,image/heic,.heic" multiple data-max-size="10485760"
        aria-labelledby="intake-label" aria-describedby="intake-hint">
      <span>Drop photos here or <span class="u-dropzone-link">choose files</span></span>
      <small id="intake-hint">JPG, PNG or HEIC, up to 10 MB each.</small>
    </label>
    <ul class="u-list" aria-live="polite" hidden></ul>
    <template>
      <li>
        <span></span>
        <div>
          <p></p>
          <p><span class="u-meta"></span><span data-dropzone-done hidden>Uploaded</span></p>
          <progress max="100" value="0" aria-label="Uploading" hidden></progress>
          <p class="u-error" data-dropzone-error="size" hidden>Too big. Photos can be up to 10 MB.</p>
          <p class="u-error" data-dropzone-error="type" hidden>That type won’t open here. Use JPG, PNG or HEIC.</p>
        </div>
        <button type="button" class="u-btn-close" data-dropzone-remove aria-label="Remove"></button>
      </li>
    </template>
  </div>
</u-dropzone>
```

```erb
<u-dropzone>
  <div class="u-field">
    <%%= form.label :photos, t(".photos"), id: form.field_id(:photos, :label) %>
    <label class="u-dropzone">
      <%%= form.file_field :photos, multiple: true,
        accept: "image/jpeg,image/png,image/heic,.heic", data: { max_size: 10.megabytes },
        aria: { labelledby: form.field_id(:photos, :label), describedby: form.field_id(:photos, :hint) } %>
      <span><%%= t(".drop_html", choose: tag.span(t(".choose_files"), class: "u-dropzone-link")) %></span>
      <small id="<%%= form.field_id(:photos, :hint) %>"><%%= t(".photos_hint", size: number_to_human_size(10.megabytes)) %></small>
    </label>
    <ul class="u-list" aria-live="polite" hidden></ul>
    <template>
      <li>
        <span></span>
        <div>
          <p></p>
          <p><span class="u-meta"></span><span data-dropzone-done hidden><%%= t(".uploaded") %></span></p>
          <progress max="100" value="0" aria-label="<%%= t(".uploading") %>" hidden></progress>
          <p class="u-error" data-dropzone-error="size" hidden><%%= t(".too_big", size: number_to_human_size(10.megabytes)) %></p>
          <p class="u-error" data-dropzone-error="type" hidden><%%= t(".wrong_type") %></p>
        </div>
        <button type="button" class="u-btn-close" data-dropzone-remove aria-label="<%%= t(".remove") %>"></button>
      </li>
    </template>
  </div>
</u-dropzone>
```

Attributes
: `accept` sets the file types, `multiple` allows several files, and `data-max-size` sets the limit in bytes. The `<template>` is the row copied for each file, so its words stay in your markup for translation.

The script
: Load [`uniform.js`](/start/install/) and wrap the `u-field` in `<u-dropzone>`. Without it, picking and dropping still work, but no rows show.

Uploading
: The files go up with the form. For progress bars with Active Storage `direct_upload: true`, set each row's `<progress>` on `direct-upload:progress`, then show its `data-dropzone-done` span.

On phones
: A tap opens the phone's picker, with the camera and the photo library. Add `capture="environment"` only when every file is a new photo, because some phones then skip the library.

## Direct uploads

<div class="example-frame">
<div class="max-w-form">
<%= render "examples/dropzone_direct", id: "dz-direct" %>
</div>
</div>

<script>
document.getElementById("dz-direct-form").addEventListener("dropzone:dirty", (event) => {
  const { changes } = event.detail
  document.getElementById("dz-direct-changes").textContent = changes === 0 ? "No changes" : changes === 1 ? "1 change" : `${changes} changes`
})
document.getElementById("dz-direct-form").addEventListener("submit", (event) => event.preventDefault())
</script>

Set `data-upload-url` on the file input and each file goes to storage the moment it's picked, with its own upload bar. The form sends the ids storage hands back, never the files, so saving is instant. Nothing changes on the record until the form is saved: removing a saved photo marks it, with Undo, and Discard puts everything back. Here the uploads are pretend.

```html
<%= inline_partial("examples/dropzone_direct", id: "job-photos") %>
```

```erb
<u-dropzone data-remove-name="photo_changes[remove][]">
  <div class="u-field">
    <%%= label_tag :job_photos, t(".photos"), id: "job-photos-label" %>
    <label class="u-dropzone">
      <%%= file_field_tag "photo_changes[add][]", id: "job_photos", multiple: true,
        accept: "image/jpeg,image/png,image/heic,.heic",
        data: { upload_url: direct_uploads_path, max_size: 10.megabytes, max_files: 4 },
        aria: { labelledby: "job-photos-label", describedby: "job-photos-hint" } %>
      <span><%%= t(".drop_html", choose: tag.span(t(".choose_files"), class: "u-dropzone-link")) %></span>
      <small id="job-photos-hint"><%%= t(".photos_hint", count: 4) %></small>
    </label>
    <p class="u-error" data-dropzone-error="limit" hidden><%%= t(".photo_limit", count: 4) %></p>
    <ul class="u-list" aria-live="polite">
      <%% job.photos.each do |photo| %>
        <li data-dropzone-saved="<%%= photo.id %>">
          <%%= image_tag photo.variant(:thumb), width: 48, height: 48, alt: "" %>
          <div>
            <p><%%= photo.filename %></p>
            <p><span class="u-badge u-badge-danger" data-dropzone-marked hidden><%%= t(".will_be_removed") %></span><span class="u-meta"><%%= number_to_human_size(photo.byte_size) %></span></p>
          </div>
          <button type="button" class="u-btn-close" data-dropzone-remove aria-label="<%%= t(".remove", name: photo.filename) %>"></button>
          <button type="button" class="u-link-btn" data-dropzone-undo hidden><%%= t(".undo") %></button>
        </li>
      <%% end %>
    </ul>
    <template><%%# the row, as above %></template>
  </div>
</u-dropzone>
```

The form sends `photo_changes[add][]` for each finished upload and `photo_changes[remove][]` for each saved photo marked for removal. Apply both when the record saves, and check each id again on the server.

`data-max-files`
: The most files the field holds, counting saved photos that aren't marked. Past it, the `limit` error shows and no row is added.

`data-dropzone-saved`
: On a row for a file already on the record. Its value is the id sent for removal, under the name in `data-remove-name`.

Row parts
: `data-dropzone-done` shows once a file is uploaded and waiting for Save, so say "New" in a form like this one. `data-dropzone-error="upload"` and `data-dropzone-retry` show when an upload fails. `data-dropzone-marked` and `data-dropzone-undo` show on a saved row marked for removal.

Saving
: Saving while a file is still uploading waits for it, then saves. The browser asks before the page closes with changes that aren't saved. `dropzone:dirty` fires with `{ changes, busy }` whenever they move, and the element's `changes` and `busy` give the same numbers. Use them for a "2 changes" line or a guard before an in-app page change.

### Connect your storage

```js
import { uploads } from "uniform"
import { activeStorageUpload } from "uniform/active_storage"

uploads.upload = activeStorageUpload
uploads.prepare = shrinkPhoto
```

Uniform never talks to a server. `uploads.upload` gets each file with `{ url, progress, signal }`, where `url` is the input's `data-upload-url`, and returns a promise for the id to send. `uploads.prepare` is optional and runs first, for work like turning HEIC into JPEG. Rails apps use `uniform/active_storage`, which uploads with Active Storage's direct upload and returns the blob's signed id. Pin it next to `uniform` in the import map.

### Without a dropzone

```html
<form action="/parties/12/cover" method="post">
  <label class="u-btn u-btn-outline">
    <input type="file" name="party[cover]" accept="image/*" data-upload-url="/direct_uploads" hidden>
    Upload a cover
  </label>
  <progress class="cover-progress" max="1"></progress>
</form>
```

Any file input with `data-upload-url` uploads the same way, so a button, an avatar or a cover photo needs no dropzone. A single-file input keeps only the newest file. While files upload, the form has `data-upload-state` (`uploading`, `uploaded`, `failed` or `idle`) and `--u-upload-progress` from 0 to 1 for your own bar. The input fires `upload:start`, `upload:progress`, `upload:finish` and `upload:remove`, each with `{ upload }`: its `file`, the `prepared` file, `state`, `progress`, `id`, `error` and `timings` in milliseconds. To save as soon as a file is up, call `form.requestSubmit()` on `upload:finish`.

## Media grid

Add `u-dropzone-media` to `<u-dropzone>` to show photos as square tiles in a grid, with the drop area as the last tile. Each row's first child is its photo, edged with a thin outline so light photos hold their shape, and its close button shows on hover. Use it where the photos themselves matter, like a job's photos, and the plain list where names and sizes do.

```html
<u-dropzone class="u-dropzone-media">
  <div class="u-field">…</div>
</u-dropzone>
```

Add `u-dropzone-hero` to show the first photo large, across two columns and two rows, fitted whole instead of cropped. A row's first child can be a button around the photo, to open it larger.

Add `u-dropzone-compact` to fit the grid into a narrow column, like a side pane: five equal tiles per row, however wide the column is. Leave out `u-dropzone-hero` there, since a large first photo crowds a narrow column.

## Saving as you go

Add `data-autosave` to `<u-dropzone>` where photos save on their own instead of with a form, like a record's page. Nothing waits for a submit:

- Once every upload has settled, it fires `dropzone:uploaded` with `{ ids }`, the signed ids of the new files. Save them, then replace the dropzone with the saved rows.
- Removing a saved row fires `dropzone:remove` with `{ id, row }` instead of marking it. Confirm, delete it on the server, then replace the dropzone. In the media grid its button shows a trash icon, since the photo goes for good.
- The element carries `data-upload-state` (`uploading`, `uploaded`, `failed` or `idle`) from its own uploads, so it works inside another form or none.
- When saving fails, set `data-unsaved` on `<u-dropzone>`: rows that uploaded but aren't saved show their `[data-dropzone-unsaved]` part ("Not saved") instead of `[data-dropzone-done]`, and the photo dims. Take it off when the retry succeeds.

Once the dropzone holds `data-max-files` files it gets `data-full` and its input turns off, so the drop area can't invite a pick that would fail. Put the full state's words in the drop area as `[data-dropzone-when-full]` ("10 of 10") and mark the usual words `[data-dropzone-when-open]`; a `[data-dropzone-when-full]` note under the grid says what to do instead.

```html
<u-dropzone class="u-dropzone-media u-dropzone-hero" data-autosave>
  <div class="u-field">…</div>
</u-dropzone>
```

## Parts

<%= render "classes", classes_page: "/components/dropzone/" %>

## Do and don't

<div class="examples u-grid gap-6">
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-dont">Don’t</p>
<div class="example-frame">
<div class="u-field">
<label for="dz-dont">Photos of the piece</label>
<label class="u-dropzone">
<input id="dz-dont" type="file" accept="image/jpeg,image/png,image/heic,.heic" multiple>
<span>Drop photos here or <span class="u-dropzone-link">choose files</span></span>
</label>
<ul class="u-list">
<%= render "examples/dropzone_file", name: "IMG_4823.HEIC", size: "14.2 MB", state: "size", kind: "photos" %>
</ul>
</div>
</div>
<figcaption class="example-caption example-caption-dont"><span>Keeping the limits quiet until someone breaks one. They find out after choosing the file.</span></figcaption>
</figure>
<figure class="example @grid:col-span-6">
<p class="example-verdict example-verdict-do">Do</p>
<div class="example-frame">
<div class="u-field">
<%= render "examples/dropzone_area", id: "dz-do", label: "Photos of the piece", drop: "Drop photos here", choose: "choose files", hint: "JPG, PNG or HEIC, up to 10 MB each.", accept: "image/jpeg,image/png,image/heic,.heic", multiple: true %>
</div>
</div>
<figcaption class="example-caption example-caption-do"><span>Say the types and the size limit in the hint, so the right file gets picked the first time.</span></figcaption>
</figure>
</div>

## Accessibility

A real file input
: Screen readers announce a file button with its label. It works with a keyboard, a switch or voice control.

Keyboard
: Tab reaches the area and rings all of it in focus. Enter or Space opens the picker. Each remove button comes right after its row in the tab order.

Name and hint
: Point `aria-labelledby` at the field's `<label>`, and `aria-describedby` at the hint, plus the error when there is one. This keeps "Drop photos here or choose files" out of the name, so it reads "Photos of the piece, JPG, PNG or HEIC, up to 10 MB each".

Changes are announced
: The file list is `aria-live="polite"`, so a new row or a "Too big" reason is read out. Removing a file puts focus back on the area.

Dragging is optional
: Choosing files always works. Never make dropping the only way in.

## Rules

Say what fits
: Put the accepted types and the size limit in the hint, before anyone picks a file.

A row for every file
: Each file shows its name, its size and a remove button. Files that don't fit stay in the list with the reason.

Check again on the server
: The script only turns away files it can tell won't fit. Your server checks size and type again and does the upload.
