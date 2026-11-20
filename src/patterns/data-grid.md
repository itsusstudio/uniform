---
layout: page
title: Data grid
summary: "A data table with column filters and editing in place."
section: Patterns
permalink: /patterns/data-grid/
---

The data grid is the [data table](/patterns/data-table/) with filters on each
column and values you change in place. Use it only for screens people work in
all day.

## Example

<div class="frame frame-pad">
<%= render "examples/pattern_data_grid_desktop", prefix: "dg", code: false %>
</div>

It keeps the data table's order (header, ways to narrow, the list, the next
page) and adds its tools where your eye already goes. Filters sit on the
column they filter, what's filtered stays on screen as chips, and a value
changes where you read it.

The header row and the job number stay put while the rest scrolls, so you never
lose which job or column you're reading. Sort from a column's name, and filter
Status or Due from the funnel beside it. Each filter shows up as a chip above
the grid, with “Clear all” at the end. The Columns button hides the columns you don't need. Click a status or a due
date to change it: Enter saves, Escape puts it back, and the cell you changed
keeps the yellow wash so you can see what you did. Tick rows and the bulk bar
takes the place of the filters, so the table doesn't move.

### On a phone

<div class="flex flex-wrap items-center gap-2 items-start gap-6 frame-phones">
<div class="data-grid-phone">
<%= render "examples/pattern_data_grid_phone", prefix: "dg-phone", code: false, sheet_open: false %>
</div>
<div class="data-grid-phone data-grid-phone-sheet">
<%= render "examples/pattern_data_grid_phone", prefix: "dg-sheet", code: false, sheet_open: true %>
<div class="data-grid-backdrop"></div>
</div>
</div>

The data table scrolls sideways on a phone, because it has five or six columns
and you mostly look up one job. A grid has ten, and nobody can work a ten-column
spreadsheet through a 390px window. So on a phone each row becomes one item: the
job number and customer on the first line with the quote on the right, the
status and due date under them. The whole item opens the job, which is where
you change things on a phone, since a cell is too small to edit by tapping.

Sorting and filters move into one “Sort and filter” button that opens a sheet
from the bottom with the same controls and “Apply filters”. The chips stay above
the list, so you can still see and remove what's filtered without opening the
sheet. Columns aren't offered: every item shows the same four facts. “Select”
adds a checkbox to each item and swaps the toolbar for the bulk bar until you
press “Done”.

## Anatomy

[Page header](/components/page-header/)
: The title, a muted count line and the one primary button, “New job”.

[Table controls](/components/table-controls/)
: Its form holds a [text field](/components/text-field/) with the search icon and, last, an outline icon [button](/components/button/), Columns, that opens a [menu](/components/menu/) of checkboxes. Under it, a `<ul>` of [chips](/components/chip/), one per filter, each with a remove button, then a ghost “Clear all” button. The chips hide when nothing is filtered.

Bulk bar
: A second `<form>` inside the controls, which takes the place of the filters and Columns while rows are ticked: an `<output>` for the count, two actions and a reset button, “Clear selection”.

Grid
: A [data grid](/components/data-grid/): `<u-data-grid>` around the whole screen, with a [table](/components/table/) in a [card](/components/card/), in `u-table`. The first cell of each row is a `<th scope="row">` holding the [checkbox](/components/checkbox/) and the job link, and it's the column that stays put. Sortable headers use `u-table-sort`. A filterable header has a ghost icon button that opens a [menu](/components/menu/) whose items are `u-checkbox` or `u-radio` labels.

Editable cells
: A `<template>` in the cell holding a one-field `<form>`, a [select](/components/select/) or a date input. See [editing in place](/components/data-grid/#editing-in-place).

[Pagination](/components/pagination/)
: Previous, next and the range, under the card.

Phone list
: The same [data grid](/components/data-grid/#on-a-phone). Customer, Status, Due and Quote carry `data-keep-narrow`, so on a phone each row becomes one item: the job number and quote on top, then the rest. In select mode a [checkbox](/components/checkbox/) shows before each job.

Sort and filter sheet
: A [dialog](/components/dialog/) with `u-dialog-sheet`, which docks it to the bottom of the screen. Inside, the card parts: the title and close button, a sort [select](/components/select/), Status as [checkboxes](/components/checkbox/) and Due as [radios](/components/radio/), each in a `u-fieldset`, then “Clear all” and “Apply filters”.

## Code

The desktop grid, with three status filters set:

```html
<%= inline_partial("examples/pattern_data_grid_desktop", prefix: "", code: true) %>
```

The phone layout, with the sheet closed:

```html
<%= inline_partial("examples/pattern_data_grid_phone", prefix: "", code: true, sheet_open: false) %>
```

### What needs JavaScript

Selecting rows, editing in place and columns come from
[`<u-data-grid>`](/components/data-grid/). Sorting, filters and pages are links
and a GET form, as in the [data table](/patterns/data-table/). The filter
checkboxes join the search form with `form="jobs-filters"`, so every filtered
view has its own URL. Applying them without a page load, and the phone's select
mode, are up to your app.

## Do and don't

<%= render "examples/data_grid_do_dont" %>

## Rules

The data table comes first
: Use the grid only for screens people work in all day. Everywhere else, the plain [data table](/patterns/data-table/) is easier to read and to build. Move a screen to the grid only when people spend their day in it and ask for these tools.

Every filter is on screen
: Each filter shows as a chip with a way to remove it, and “Clear all” ends the row, on desktop and on a phone.

The grid's own rules are on [Data grid](/components/data-grid/#rules).

<script>
(() => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const shortDate = (iso) => { const [, m, d] = iso.split("-"); return `${months[m - 1]} ${Number(d)}` }
  const variants = { "Not started": "neutral", "On the bench": "info", "Waiting on parts": "warning", "Quote to approve": "warning", "Overdue": "danger", "Ready for pickup": "success" }
  const dueLabels = { overdue: "Past due", week: "Due this week", next: "Due next week", later: "Due later" }
  const bucket = (iso) => iso < "2026-11-12" ? "overdue" : iso <= "2026-11-14" ? "week" : iso <= "2026-11-21" ? "next" : "later"
  const compare = (a, b) => a.localeCompare(b, "en", { numeric: true })

  const setupFilters = (screen, items, live) => {
    const statusInputs = [...screen.querySelectorAll("input[name='status[]']")]
    const dueInputs = [...screen.querySelectorAll("input[name=due]")]
    const chips = screen.querySelector("[data-grid-part=chips]")
    const clearAll = chips.querySelector("[data-clear-filters]")
    const state = { status: [], due: "" }
    const read = () => {
      state.status = statusInputs.filter((input) => input.checked).map((input) => input.value)
      state.due = dueInputs.find((input) => input.checked).value
    }
    const write = () => {
      statusInputs.forEach((input) => { input.checked = state.status.includes(input.value) })
      dueInputs.forEach((input) => { input.checked = input.value === state.due })
    }
    const apply = () => {
      let shown = 0
      items().forEach((item) => {
        item.hidden = !((state.status.length === 0 || state.status.includes(item.dataset.status)) && (!state.due || bucket(item.dataset.due) === state.due))
        if (!item.hidden) shown += 1
      })
      chips.querySelectorAll(".u-chip").forEach((chip) => chip.remove())
      const applied = state.status.map((status) => ["status", status, `Status: ${status}`])
      if (state.due) applied.push(["due", state.due, dueLabels[state.due]])
      applied.forEach(([kind, value, label]) => {
        const chip = document.createElement(chips.matches("ul") ? "li" : "span")
        const remove = document.createElement("button")
        chip.className = "u-chip"
        remove.type = "button"
        remove.dataset.remove = kind
        remove.value = value
        remove.setAttribute("aria-label", `Remove filter: ${label}`)
        chip.append(label, remove)
        ;(clearAll.closest("li") || clearAll).before(chip)
      })
      chips.hidden = applied.length === 0
      screen.querySelector("[data-grid-range]").textContent = applied.length ? `1–${shown} of ${shown}` : "1–15 of 38"
      screen.querySelector("[data-grid-next]").setAttribute("aria-disabled", applied.length > 0)
    }
    read()
    apply()
    if (live) [...statusInputs, ...dueInputs].forEach((input) => input.addEventListener("change", () => { read(); apply() }))
    screen.addEventListener("click", (event) => {
      const remove = event.target.closest(".u-chip > button")
      const clear = event.target.closest("[data-clear-filters]")
      if (!remove && !clear) return
      if (clear && clear.closest("dialog")) {
        statusInputs.forEach((input) => { input.checked = false })
        dueInputs[0].checked = true
        return
      }
      if (remove && remove.dataset.remove === "status") state.status = state.status.filter((status) => status !== remove.value)
      else if (remove) state.due = ""
      else { state.status = []; state.due = "" }
      write()
      apply()
      ;(chips.querySelector(".u-chip > button") || screen.querySelector("input[type=search]")).focus()
    })
    return { read, write, apply }
  }

  document.querySelectorAll(".frame-pad, .data-grid-phone").forEach((screen) => {
    screen.querySelectorAll("form:not([method=dialog])").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
  })

  document.querySelectorAll(".frame-pad").forEach((screen) => {
    const table = screen.querySelector("u-data-grid table")
    const tbody = table.tBodies[0]
    const headers = [...table.tHead.rows[0].cells]
    setupFilters(screen, () => [...tbody.rows], true)

    screen.querySelectorAll(".u-table-sort").forEach((button) => button.addEventListener("click", () => {
      const th = button.closest("th")
      const index = headers.indexOf(th)
      const direction = th.getAttribute("aria-sort") === "ascending" ? -1 : 1
      headers.forEach((header) => header.removeAttribute("aria-sort"))
      th.setAttribute("aria-sort", direction === 1 ? "ascending" : "descending")
      const key = (row) => row.cells[index].dataset.value ?? row.cells[index].textContent.trim()
      tbody.append(...[...tbody.rows].sort((a, b) => compare(key(a), key(b)) * direction))
    }))

    screen.addEventListener("data-grid:change", (event) => {
      const { cell, field, value } = event.detail
      const row = cell.parentElement
      if (field.type === "date") {
        cell.dataset.value = value
        row.dataset.due = value
      } else {
        row.dataset.status = value
      }
    })
  })

  document.querySelectorAll(".data-grid-phone").forEach((screen) => {
    const list = screen.querySelector("u-data-grid tbody")
    const items = () => [...list.rows]
    const filters = setupFilters(screen, items, false)
    const dialog = screen.querySelector("dialog")
    const sort = dialog.querySelector("select[name=sort]")
    let sorted = sort.value
    if (screen.matches(".data-grid-phone-sheet")) {
      dialog.querySelector("form").addEventListener("submit", (event) => event.preventDefault())
      return
    }
    if (!("commandForElement" in HTMLButtonElement.prototype)) {
      screen.querySelectorAll("[commandfor]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.getAttribute("commandfor")).showModal()))
    }
    dialog.addEventListener("close", () => {
      if (dialog.returnValue === "apply") {
        filters.read()
        filters.apply()
        sorted = sort.value
        const [direction, key] = sorted.startsWith("-") ? [-1, sorted.slice(1)] : [1, sorted]
        list.append(...items().sort((a, b) => compare(a.dataset[key], b.dataset[key]) * direction))
      } else {
        filters.write()
        sort.value = sorted
      }
      dialog.returnValue = ""
    })

    const toolbar = screen.querySelector("[data-grid-part=toolbar]")
    const bulk = screen.querySelector("[data-grid-part=bulk]")
    const boxes = [...list.querySelectorAll("input[type=checkbox]")]
    const start = screen.querySelector("[data-select-start]")
    const done = screen.querySelector("[data-select-done]")
    let selecting = false
    const count = () => { bulk.querySelector("[data-grid-count]").textContent = boxes.filter((box) => box.checked).length }
    const setSelecting = (on) => {
      selecting = on
      list.closest("u-data-grid").toggleAttribute("data-selecting", on)
      list.querySelectorAll(".u-checkbox").forEach((label) => { label.hidden = !on })
      if (!on) boxes.forEach((box) => { box.checked = false })
      toolbar.hidden = on
      bulk.hidden = !on
      count()
      ;(on ? done : start).focus()
    }
    start.addEventListener("click", () => setSelecting(true))
    done.addEventListener("click", () => setSelecting(false))
    boxes.forEach((box) => box.addEventListener("change", count))
    list.addEventListener("click", (event) => {
      const item = event.target.closest("tr")
      if (!selecting || !item || event.target.matches("input")) return
      event.preventDefault()
      const box = item.querySelector("input[type=checkbox]")
      box.checked = !box.checked
      count()
    })
  })
})()
</script>

<%= render "examples/data_grid_demo_script" %>
