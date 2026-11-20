let anchors = 0

class UniformElement extends HTMLElement {
  connectedCallback() {
    if (this.controller) return
    this.controller = new AbortController()
    this.setup(this.controller.signal)
    this.built = this.innerHTML
  }

  disconnectedCallback() {
    this.controller?.abort()
    this.controller = null
  }

  // Keeps state through moveBefore() instead of a disconnect and a fresh setup.
  connectedMoveCallback() {}

  refresh() {
    if (this.controller && this.isConnected && this.innerHTML === this.built) return
    this.disconnectedCallback()
    this.connectedCallback()
  }

  anchorName(prefix) {
    this.anchor ??= `--${prefix}-${++anchors}`
    return this.anchor
  }
}

// Turbo's morph rewrites an element's children to match the server's HTML and drops what setup() added, without a disconnect.
addEventListener("turbo:morph-element", ({ target }) => {
  if (target instanceof UniformElement) target.refresh()
})

const focusFirstError = () => {
  const field = document.querySelector('form [aria-invalid="true"]')
  if (field && document.activeElement !== field) field.focus()
}
addEventListener("DOMContentLoaded", focusFirstError)
addEventListener("turbo:load", focusFirstError)
addEventListener("turbo:render", focusFirstError)

addEventListener("change", ({ target }) => {
  if (target.matches?.("select.u-language-select") && target.form) target.form.requestSubmit()
})

addEventListener("change", ({ target }) => {
  if (!target.matches?.('.u-fieldset input[type="checkbox"]') || !target.checked) return

  const boxes = target.closest(".u-fieldset").querySelectorAll('input[type="checkbox"]')
  boxes.forEach((box) => {
    if (box !== target && (target.hasAttribute("data-u-exclusive") || box.hasAttribute("data-u-exclusive"))) box.checked = false
  })
})

const define = (name, element) => {
  if (!customElements.get(name)) customElements.define(name, element)
}

const fold = (text) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()

const langOf = (element) => element.closest("[lang]")?.lang || navigator.language

// The HTML these sinks take comes from the app's own server, so the policy passes it through.
let policy = null
try { policy = window.trustedTypes?.createPolicy("uniform", { createHTML: (html) => html }) ?? null } catch {}
const trustedHTML = (html) => policy ? policy.createHTML(html) : html

// The form resets its fields after the reset event, so redraw a moment later.
const afterReset = (form, signal, redraw) => form?.addEventListener("reset", () => setTimeout(redraw), { signal })

const spokenText = (node) => {
  const copy = node.cloneNode(true)
  copy.querySelectorAll('[aria-hidden="true"]').forEach((each) => each.remove())
  return copy.textContent.replace(/\s+/g, " ").trim()
}

// One polite region for the page. An error that is only shown, not changed, isn't announced reliably.
let announcer = null
let announceTimer = null
let announcedField = null
const announce = (field, message) => {
  if (!announcer) {
    announcer = document.createElement("div")
    announcer.className = "sr-only"
    announcer.setAttribute("aria-live", "polite")
    document.body.append(announcer)
  }
  const label = field.labels?.[0] ? `${spokenText(field.labels[0])}: ` : ""
  clearTimeout(announceTimer)
  announcer.textContent = ""
  announcedField = field
  // Wait until the screen reader has read the field that takes focus next.
  announceTimer = setTimeout(() => { announcer.textContent = label + message }, 500)
}
const unannounce = (field) => {
  if (announcedField !== field) return
  clearTimeout(announceTimer)
  announcer.textContent = ""
  announcedField = null
}

define("u-combobox", class extends UniformElement {
  setup(signal) {
    const input = this.querySelector(':scope > input[role="combobox"]')
    const list = this.querySelector(':scope > [role="listbox"]')
    if (!input || !list?.popover) return
    const on = (target, type, listener) => target.addEventListener(type, listener, { signal })
    const value = this.querySelector(':scope > input[type="hidden"]')
    const empty = list.querySelector('[role="option"][aria-disabled="true"]')
    const options = [...list.querySelectorAll('[role="option"]:not([aria-disabled="true"], [data-action])')]
    const anchor = this.anchorName("u-combobox")
    input.style.setProperty("anchor-name", anchor)
    list.style.setProperty("position-anchor", anchor)
    list.querySelectorAll('[role="option"]').forEach((option, i) => { option.id ||= `${list.id}-${i}` })
    const parts = (option) => {
      const found = [...option.querySelectorAll(":scope > span")]
      return found.length ? found : [option]
    }
    const digits = (text) => text.replace(/\D/g, "")
    options.forEach((option) => {
      option.dataset.label ??= (option.querySelector(":scope > span") ?? option).textContent.trim()
      parts(option).forEach((part) => { part.dataset.text ??= part.textContent.trim() })
    })
    let active = null
    const isOpen = () => list.matches(":popover-open")
    const choices = () => [...list.querySelectorAll('[role="option"]:not([hidden], [aria-disabled="true"])')]
    const picked = () => options.find((option) => option.getAttribute("aria-selected") === "true")
    const setActive = (option, scroll = true) => {
      active?.classList.remove("u-combobox-option-active")
      active = option
      if (!option) return input.removeAttribute("aria-activedescendant")
      option.classList.add("u-combobox-option-active")
      input.setAttribute("aria-activedescendant", option.id)
      if (scroll) option.scrollIntoView({ block: "nearest" })
    }
    const filter = (text) => {
      const query = fold(text.trim())
      const number = /^[\d\s().+-]+$/.test(text.trim()) ? digits(text) : ""
      let matches = 0
      options.forEach((option) => {
        let hit = query === ""
        parts(option).forEach((part) => {
          const source = part.dataset.text
          const at = query ? fold(source).indexOf(query) : -1
          if (at === -1) return part.replaceChildren(source)
          hit = true
          const match = document.createElement("mark")
          match.textContent = source.slice(at, at + query.length)
          part.replaceChildren(source.slice(0, at), match, source.slice(at + query.length))
        })
        if (!hit && number.length >= 3) hit = parts(option).some((part) => digits(part.dataset.text).includes(number))
        option.hidden = !hit
        if (hit) matches++
      })
      if (empty) empty.hidden = matches > 0
    }
    const open = () => {
      if (isOpen()) return
      list.showPopover()
      input.setAttribute("aria-expanded", "true")
    }
    const close = () => {
      if (isOpen()) list.hidePopover()
      input.setAttribute("aria-expanded", "false")
      setActive(null)
    }
    const showAll = () => {
      filter("")
      open()
    }
    const choose = (option, text) => {
      options.forEach((each) => each.setAttribute("aria-selected", String(each === option)))
      if (value) value.value = option ? option.dataset.value ?? option.dataset.label : ""
      if (text !== undefined) input.value = text
    }
    const pick = (option) => {
      if (option.hasAttribute("data-action")) {
        this.dispatchEvent(new CustomEvent("combobox:action", { bubbles: true, detail: { query: input.value.trim() } }))
      } else {
        choose(option, option.dataset.label)
        input.dispatchEvent(new Event("change", { bubbles: true }))
      }
      close()
    }
    on(input, "input", () => {
      const current = picked()
      if (current && current.dataset.label !== input.value) choose(null)
      filter(input.value)
      open()
      setActive(input.value.trim() ? choices()[0] : null)
    })
    on(input, "click", () => { if (!isOpen()) showAll() })
    on(input, "blur", close)
    on(input, "keydown", (event) => {
      if (event.isComposing || event.keyCode === 229) return
      const arrow = event.key === "ArrowDown" || event.key === "ArrowUp"
      if (arrow) event.preventDefault()
      if (arrow && !isOpen()) {
        showAll()
        if (event.altKey) return
        return setActive(event.key === "ArrowUp" ? choices().at(-1) : picked() ?? choices()[0])
      }
      const items = choices()
      const at = items.indexOf(active)
      const move = (option) => {
        event.preventDefault()
        setActive(option ?? null)
      }
      if (event.key === "ArrowDown") return move(items[Math.min(at + 1, items.length - 1)])
      if (event.key === "ArrowUp") return move(at === -1 ? items.at(-1) : items[Math.max(at - 1, 0)])
      if ((event.key === "Home" || event.key === "End") && isOpen() && active) return move(event.key === "Home" ? items[0] : items.at(-1))
      if (event.key === "Enter" && isOpen() && active) {
        event.preventDefault()
        return pick(active)
      }
      if (event.key === "Escape" && (isOpen() || input.value)) {
        event.preventDefault()
        if (isOpen()) return close()
        choose(null, "")
        filter("")
      }
    })
    on(list, "mousedown", (event) => event.preventDefault())
    on(list, "click", (event) => {
      const option = event.target.closest('[role="option"]')
      if (option && choices().includes(option)) pick(option)
    })
    on(list, "pointermove", (event) => {
      const option = event.target.closest('[role="option"]')
      if (option && option !== active && choices().includes(option)) setActive(option, false)
    })
  }
})

define("u-character-count", class extends UniformElement {
  setup(signal) {
    const input = this.querySelector("textarea[maxlength], input[maxlength]")
    const count = [...this.querySelectorAll(".u-field > small")].at(-1)
    if (!input || !count) return
    const words = this.dataset.count || "{count} of {max}"
    const update = () => { count.textContent = words.replace("{count}", input.value.length).replace("{max}", input.maxLength) }
    input.addEventListener("input", update, { signal })
    afterReset(input.form, signal, update)
    update()
  }
})

define("u-input-code", class extends UniformElement {
  setup(signal) {
    const input = this.querySelector(":scope > .u-input")
    const size = input?.maxLength ?? 0
    if (size < 1) return
    const slots = [...this.querySelectorAll(":scope > span")]
    while (slots.length < size) {
      const slot = document.createElement("span")
      slot.setAttribute("aria-hidden", "true")
      slots.push(this.appendChild(slot))
    }
    const on = (type, listener) => input.addEventListener(type, listener, { signal })
    const toEnd = () => input.setSelectionRange(input.value.length, input.value.length)
    const render = () => {
      const digits = input.value.replace(/\P{Nd}/gu, "").slice(0, size)
      if (digits !== input.value) input.value = digits
      const focused = document.activeElement === input
      slots.forEach((slot, i) => {
        slot.textContent = digits[i] ?? ""
        slot.classList.toggle("u-input-code-slot-active", focused && i === Math.min(digits.length, size - 1))
      })
    }
    on("input", () => {
      render()
      if (input.value.length === size && this.hasAttribute("submit")) input.form?.requestSubmit()
    })
    on("paste", (event) => {
      const pasted = event.clipboardData?.getData("text").replace(/\P{Nd}/gu, "")
      if (!pasted) return
      event.preventDefault()
      input.value = pasted.slice(0, size)
      input.dispatchEvent(new Event("input", { bubbles: true }))
    })
    on("focus", () => { render(); toEnd() })
    on("click", toEnd)
    on("blur", render)
    afterReset(input.form, signal, render)
    render()
  }
})

const nanpRegions = new Set(["CA", "US", "AG", "AI", "AS", "BB", "BM", "BS", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"])
const twoDigitCodes = new Set("20 27 30 31 32 33 34 36 39 40 41 43 44 45 46 47 48 49 51 52 53 54 55 56 57 58 60 61 62 63 64 65 66 81 82 84 86 90 91 92 93 94 95 98".split(" "))

const phoneBlocks = (digits) => {
  const blocks = []
  let rest = digits
  while (rest.length > 4) {
    blocks.push(rest.slice(0, 3))
    rest = rest.slice(3)
  }
  if (rest) blocks.push(rest)
  return blocks.join(" ")
}

const nanpNumber = (digits) => {
  if (digits.length <= 3 || digits.length > 10) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const readPhone = (text, region) => {
  const plus = text.trimStart().startsWith("+")
  const digits = text.replace(/\D/g, "")
  const nanp = nanpRegions.has(region)
  if (!plus && nanp && digits.startsWith("1")) return readPhone(`+${digits}`, region)
  if (!plus) {
    const valid = nanp ? digits.length === 10 : digits.length >= 6 && digits.length <= 15
    return { digits, valid, value: digits, text: nanp ? nanpNumber(digits) : phoneBlocks(digits) }
  }
  const size = /^[17]/.test(digits) ? 1 : twoDigitCodes.has(digits.slice(0, 2)) ? 2 : 3
  const code = digits.slice(0, size)
  const rest = digits.slice(size)
  const local = code === "1" ? nanpNumber(rest) : phoneBlocks(rest)
  const valid = code === "1" ? rest.length === 10 : digits.length >= 8 && digits.length <= 15
  return { digits, valid, value: `+${digits}`, text: `+${code}${local ? ` ${local}` : ""}` }
}

define("u-input-phone", class extends UniformElement {
  setup(signal) {
    const input = this.querySelector('input[type="tel"]')
    if (!input) return
    const on = (target, type, listener) => target.addEventListener(type, listener, { signal })
    const region = (this.getAttribute("region") || "CA").toUpperCase()
    const hidden = this.querySelector('input[type="hidden"]')
    const error = this.querySelector(".u-error")
    const message = error?.textContent.trim() ?? ""
    const flag = (invalid) => {
      input.setAttribute("aria-invalid", String(invalid))
      if (!invalid) unannounce(input)
      if (!error) return
      error.hidden = !invalid
      const ids = (input.getAttribute("aria-describedby") ?? "").split(" ").filter((id) => id && id !== error.id)
      if (invalid) ids.push(error.id)
      if (ids.length) input.setAttribute("aria-describedby", ids.join(" "))
      else input.removeAttribute("aria-describedby")
    }
    // The browser's own validation then blocks the submit and focuses the field.
    const validate = () => {
      const phone = readPhone(input.value, region)
      const invalid = phone.digits !== "" && !phone.valid
      input.setCustomValidity(invalid ? message : "")
      return invalid
    }
    const render = (text, caret) => {
      const phone = readPhone(text, region)
      const before = text.slice(0, caret)
      const marks = before.replace(/\D/g, "").length
      let at = marks === 0 && before.includes("+") ? 1 : 0
      for (let seen = 0; at < phone.text.length && seen < marks; at++) {
        if (/\d/.test(phone.text[at])) seen++
      }
      input.value = phone.text
      if (hidden) hidden.value = phone.digits ? phone.value : ""
      if (document.activeElement === input) input.setSelectionRange(at, at)
      return validate()
    }
    on(input, "beforeinput", (event) => {
      const { selectionStart: start, selectionEnd: end, value } = input
      const back = event.inputType === "deleteContentBackward"
      const forward = event.inputType === "deleteContentForward"
      if (start !== end || (!back && !forward)) return
      const skipped = back ? value[start - 1] : value[start]
      if (skipped === undefined || /[\d+]/.test(skipped)) return
      const at = back ? value.slice(0, start).search(/\d\D*$/) : value.slice(start).search(/\d/)
      if (at < 0) return
      const digit = back ? at : start + at
      event.preventDefault()
      render(value.slice(0, digit) + value.slice(digit + 1), back ? digit : start)
      input.dispatchEvent(new Event("input", { bubbles: true }))
    })
    on(input, "input", () => {
      const invalid = render(input.value, input.selectionStart ?? input.value.length)
      if (!invalid && input.getAttribute("aria-invalid") === "true") flag(false)
    })
    on(input, "blur", () => {
      const invalid = validate()
      if (invalid && input.getAttribute("aria-invalid") !== "true") announce(input, message)
      flag(invalid)
    })
    on(input, "invalid", () => flag(true))
    afterReset(input.form, signal, () => {
      render(input.value, input.value.length)
      flag(false)
    })
    if (!input.hasAttribute("aria-invalid")) input.setAttribute("aria-invalid", "false")
    if (input.value) render(input.value, input.value.length)
  }
})

define("u-toggle", class extends UniformElement {
  setup(signal) {
    const toggle = this.querySelector("button.u-toggle[aria-pressed]")
    if (!toggle) return
    toggle.addEventListener("click", () => {
      const pressed = toggle.getAttribute("aria-pressed") !== "true"
      toggle.setAttribute("aria-pressed", String(pressed))
      toggle.dispatchEvent(new CustomEvent("toggle:change", { bubbles: true, detail: { pressed } }))
    }, { signal })
  }
})

const sizeText = (bytes, lang) => {
  const mega = bytes >= 1048576
  const value = mega ? bytes / 1048576 : Math.max(1, Math.round(bytes / 1024))
  return new Intl.NumberFormat(lang, { style: "unit", unit: mega ? "megabyte" : "kilobyte", maximumFractionDigits: mega ? 1 : 0 }).format(value)
}

// Direct uploads: a file input with data-upload-url sends each file to storage
// the moment it's picked, through the upload function the app registers, and
// the form sends the returned ids in hidden fields under the input's name.
//   uploads.upload = (file, { url, progress, signal }) => Promise<id>
//   uploads.prepare = (file) => Promise<File>   (optional, runs first)
export const uploads = { upload: null, prepare: null }

const uploadsByInput = new WeakMap()
const uploadsOf = (input) => {
  if (!uploadsByInput.has(input)) uploadsByInput.set(input, new Map())
  return uploadsByInput.get(input)
}
const directInputs = (form) => [...form.querySelectorAll('input[type="file"][data-upload-url]')]
const formUploads = (form) => directInputs(form).flatMap((input) => [...uploadsOf(input).values()])
const uploadBusy = (upload) => upload.state === "preparing" || upload.state === "uploading"
let nextUpload = 0

const fileProblem = (input, file) => {
  const accepts = input.accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean)
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  const fits = accepts.length === 0 || accepts.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
  if (!fits) return "type"
  if (file.size > (Number(input.dataset.maxSize) || Infinity)) return "size"
  return null
}

const syncForm = (form) => {
  if (!form) return
  const all = formUploads(form)
  const active = all.filter((upload) => upload.state !== "removed")
  const state = active.some(uploadBusy) ? "uploading"
    : active.some((upload) => upload.state === "failed") ? "failed"
    : active.some((upload) => upload.state === "uploaded") ? "uploaded" : "idle"
  form.dataset.uploadState = state
  const total = active.reduce((sum, upload) => sum + (upload.prepared ?? upload.file).size, 0)
  const sent = active.reduce((sum, upload) => sum + upload.progress * (upload.prepared ?? upload.file).size, 0)
  form.style.setProperty("--u-upload-progress", total ? (sent / total).toFixed(3) : "0")
  if (state === "uploading" || !form.uploadSubmitter) return
  const submitter = form.uploadSubmitter
  form.uploadSubmitter = null
  if (state !== "failed") form.requestSubmit(submitter === form ? undefined : submitter)
}

const emit = (input, type, upload) => input.dispatchEvent(new CustomEvent(`upload:${type}`, { bubbles: true, detail: { upload } }))

const runUpload = async (input, upload) => {
  const started = performance.now()
  let step = "prepare"
  upload.attempts += 1
  upload.controller = new AbortController()
  const { signal } = upload.controller
  const change = (attributes, type = "progress") => {
    Object.assign(upload, attributes)
    emit(input, type, upload)
    syncForm(input.form)
  }
  change({ state: "preparing", progress: 0, error: null })
  try {
    if (!uploads.upload) throw new Error("No upload function. Set uploads.upload from uniform.js.")
    const prepareStart = performance.now()
    upload.prepared ??= uploads.prepare ? await uploads.prepare(upload.file) : upload.file
    upload.timings.prepare_ms = Math.round(performance.now() - prepareStart)
    if (signal.aborted) return
    step = "upload"
    change({ state: "uploading" })
    const uploadStart = performance.now()
    const id = await uploads.upload(upload.prepared, {
      url: input.dataset.uploadUrl,
      signal,
      progress: (fraction) => { if (!signal.aborted) change({ progress: Math.min(1, Math.max(0, fraction)) }) }
    })
    if (signal.aborted) return
    upload.timings.upload_ms = Math.round(performance.now() - uploadStart)
    upload.timings.total_ms = Math.round(performance.now() - started)
    const field = document.createElement("input")
    field.type = "hidden"
    field.name = input.name
    field.value = id
    field.dataset.uploadField = ""
    input.after(field)
    change({ state: "uploaded", progress: 1, id, field }, "finish")
  } catch (error) {
    if (signal.aborted) return
    upload.timings.total_ms = Math.round(performance.now() - started)
    change({ state: "failed", error, step }, "finish")
  }
}

// Starts uploading files on a direct input. A single-file input keeps only the
// newest. Returns the uploads, so a client like <u-dropzone> can draw them.
export const startUploads = (input, files) => {
  const current = uploadsOf(input)
  if (!input.multiple) [...current.values()].forEach((upload) => removeUpload(input, upload))
  const picked = input.multiple ? [...files] : [...files].slice(0, 1)
  return picked.map((file) => {
    const upload = { key: ++nextUpload, file, state: "queued", progress: 0, attempts: 0, timings: {} }
    current.set(upload.key, upload)
    emit(input, "start", upload)
    runUpload(input, upload)
    return upload
  })
}

export const retryUpload = (input, upload) => {
  if (upload.state === "failed") runUpload(input, upload)
}

export const removeUpload = (input, upload) => {
  upload.controller?.abort()
  upload.field?.remove()
  upload.state = "removed"
  uploadsOf(input).delete(upload.key)
  emit(input, "remove", upload)
  syncForm(input.form)
}

export const inputUploads = (input) => [...uploadsOf(input).values()]

addEventListener("change", (event) => {
  const input = event.target
  if (!input.matches?.('input[type="file"][data-upload-url]') || input.closest("u-dropzone")) return
  const files = [...input.files]
  input.value = ""
  const refused = files.filter((file) => fileProblem(input, file))
  refused.forEach((file) => input.dispatchEvent(new CustomEvent("upload:refuse", { bubbles: true, detail: { file, reason: fileProblem(input, file) } })))
  startUploads(input, files.filter((file) => !fileProblem(input, file)))
})

// A direct input's own files never travel with the form, only the ids.
addEventListener("formdata", ({ target: form, formData }) => {
  directInputs(form).forEach((input) => {
    if (!input.name) return
    const ids = formData.getAll(input.name).filter((value) => typeof value === "string" && value !== "")
    formData.delete(input.name)
    ids.forEach((id) => formData.append(input.name, id))
  })
})

// Saving while a file is still uploading waits for it, then saves.
addEventListener("submit", (event) => {
  const form = event.target
  if (!formUploads(form).some(uploadBusy)) return
  event.preventDefault()
  event.stopImmediatePropagation()
  form.uploadSubmitter = event.submitter ?? form
}, true)

addEventListener("reset", ({ target: form }) => {
  if (!(form instanceof HTMLFormElement)) return
  directInputs(form).forEach((input) => inputUploads(input).forEach((upload) => removeUpload(input, upload)))
  form.uploadSubmitter = null
}, true)

addEventListener("beforeunload", (event) => {
  const busy = [...document.forms].some((form) => formUploads(form).some(uploadBusy))
  if (busy) event.preventDefault()
})

define("u-dropzone", class extends UniformElement {
  // Direct mode only: changes waiting for the form to save, and whether a
  // file is still on its way to storage.
  get changes() { return this.client?.changes() ?? 0 }
  get busy() { return this.client?.busy() ?? false }

  setup(signal) {
    const root = this.querySelector(".u-dropzone")
    const input = root?.querySelector(':scope > input[type="file"]')
    const list = this.querySelector(".u-dropzone ~ ul")
    const template = this.querySelector("template")
    if (!root || !input || !list || !template) return
    const on = (target, type, listener) => target.addEventListener(type, listener, { signal })
    const key = (file) => `${file.name}:${file.size}:${file.lastModified}`
    const render = (file, problem) => {
      const row = template.content.firstElementChild.cloneNode(true)
      row.querySelector(":scope > div > p:first-child").textContent = file.name
      row.querySelector(".u-meta").textContent = sizeText(file.size, langOf(this))
      row.querySelectorAll("[data-dropzone-error]").forEach((error) => { error.hidden = error.dataset.dropzoneError !== problem })
      row.querySelectorAll("[aria-label]").forEach((each) => each.setAttribute("aria-label", `${each.getAttribute("aria-label")} ${file.name}`))
      const thumb = row.firstElementChild
      if (thumb && file.type.startsWith("image/") && !problem) {
        const image = document.createElement("img")
        image.alt = ""
        image.addEventListener("error", () => image.replaceWith(thumb), { once: true, signal })
        image.src = URL.createObjectURL(file)
        thumb.replaceWith(image)
      }
      return row
    }
    const dropRow = (row) => {
      row.querySelectorAll("img").forEach((image) => { if (image.src.startsWith("blob:")) URL.revokeObjectURL(image.src) })
      row.remove()
    }
    // The list is the live region: it has to be in the page before the first row goes in, or that row isn't announced.
    const show = (rows, added) => {
      list.hidden = false
      if (!rows.length) return
      requestAnimationFrame(() => {
        if (signal.aborted) return
        list.append(...rows)
        this.dispatchEvent(new CustomEvent("dropzone:change", { bubbles: true, detail: { added } }))
      })
    }
    const take = (add) => {
      on(input, "change", () => {
        const files = [...input.files]
        add(files)
      })
      on(root, "dragover", (event) => {
        if (!hasFiles(event)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = input.disabled ? "none" : "copy"
        root.classList.toggle("u-dropzone-over", !input.disabled)
      })
      on(root, "dragleave", (event) => {
        if (!root.contains(event.relatedTarget)) root.classList.remove("u-dropzone-over")
      })
      on(root, "drop", (event) => {
        if (!hasFiles(event)) return
        event.preventDefault()
        root.classList.remove("u-dropzone-over")
        if (!input.disabled) add(event.dataTransfer.files)
      })
    }
    const hasFiles = (event) => [...event.dataTransfer.types].includes("Files")

    if (input.hasAttribute("data-upload-url")) return this.setupDirect({ signal, on, input, list, render, dropRow, show, take })

    const chosen = this.chosen ??= new Map()
    const sync = () => {
      const transfer = new DataTransfer()
      chosen.forEach((row, file) => { if (!fileProblem(input, file)) transfer.items.add(file) })
      input.files = transfer.files
      list.hidden = chosen.size === 0
    }
    const remove = (file) => {
      dropRow(chosen.get(file))
      chosen.delete(file)
    }
    const add = (files) => {
      const known = new Set([...chosen.keys()].map(key))
      let fresh = [...files].filter((file) => !known.has(key(file)))
      if (!input.multiple) {
        fresh = fresh.slice(0, 1)
        if (fresh.length) [...chosen.keys()].forEach(remove)
      }
      const added = fresh.map((file) => {
        const row = render(file, fileProblem(input, file))
        chosen.set(file, row)
        return { file, row, error: fileProblem(input, file) }
      })
      sync()
      show(added.map(({ row }) => row), added)
    }
    take(add)
    afterReset(input.form, signal, () => {
      [...chosen.keys()].forEach(remove)
      list.hidden = true
    })
    on(list, "click", (event) => {
      const button = event.target.closest("[data-dropzone-remove]")
      const file = button && [...chosen].find(([, row]) => row.contains(button))?.[0]
      if (!file) return
      remove(file)
      sync()
      input.focus()
    })
  }

  // Files upload as they're picked. Saved files are rows marked
  // data-dropzone-saved; removing one marks it, and data-remove-name on the
  // element names the hidden field that carries its id.
  setupDirect({ signal, on, input, list, render, dropRow, show, take }) {
    const rows = this.uploadRows ??= new Map()
    const marked = this.marked ??= new Map()
    const maxFiles = Number(input.dataset.maxFiles) || Infinity
    const limit = this.querySelector('[data-dropzone-error="limit"]')
    const saved = () => [...list.querySelectorAll(":scope > [data-dropzone-saved]")]
    const live = () => [...rows.values()].filter(({ upload }) => upload && upload.state !== "failed")
    const count = () => saved().length - marked.size + live().length
    this.client = {
      changes: () => marked.size + live().length,
      busy: () => live().some(({ upload }) => upload.state === "preparing" || upload.state === "uploading")
    }
    const dirty = () => this.dispatchEvent(new CustomEvent("dropzone:dirty", { bubbles: true, detail: { changes: this.changes, busy: this.busy } }))
    const paint = (row, upload) => {
      const bar = row.querySelector("progress")
      const working = upload.state === "preparing" || upload.state === "uploading"
      if (bar) {
        bar.hidden = !working
        if (upload.state === "preparing") bar.removeAttribute("value")
        else bar.value = Math.round(upload.progress * bar.max)
      }
      if (upload.prepared) row.querySelector(".u-meta").textContent = sizeText(upload.prepared.size, langOf(this))
      row.querySelectorAll("[data-dropzone-done]").forEach((done) => { done.hidden = upload.state !== "uploaded" })
      row.querySelectorAll('[data-dropzone-error="upload"]').forEach((error) => { error.hidden = upload.state !== "failed" })
      row.querySelectorAll("[data-dropzone-retry]").forEach((retry) => { retry.hidden = upload.state !== "failed" })
    }
    const rowOf = (upload) => [...rows].find(([, entry]) => entry.upload === upload)?.[0]
    const add = (files) => {
      input.value = ""
      if (limit) limit.hidden = true
      const known = new Set([...rows.values()].map(({ file }) => key(file)))
      const fresh = [...files].filter((file) => !known.has(key(file)))
      const added = []
      for (const file of input.multiple ? fresh : fresh.slice(0, 1)) {
        const problem = fileProblem(input, file)
        if (!problem && input.multiple && count() >= maxFiles) {
          if (limit) limit.hidden = false
          break
        }
        const row = render(file, problem)
        const entry = { file }
        rows.set(row, entry)
        added.push({ file, row, error: problem })
        if (!problem) [entry.upload] = startUploads(input, [file])
        if (entry.upload) paint(row, entry.upload)
      }
      show(added.map(({ row }) => row), added)
      dirty()
    }
    const key = (file) => `${file.name}:${file.size}:${file.lastModified}`
    const mark = (row, on) => {
      const id = row.dataset.dropzoneSaved
      if (on && !marked.has(id) && this.dataset.removeName) {
        const field = document.createElement("input")
        field.type = "hidden"
        field.name = this.dataset.removeName
        field.value = id
        input.after(field)
        marked.set(id, field)
      } else if (!on) {
        marked.get(id)?.remove()
        marked.delete(id)
      }
      row.toggleAttribute("data-dropzone-marked-row", marked.has(id))
      row.querySelectorAll("[data-dropzone-marked], [data-dropzone-undo]").forEach((part) => { part.hidden = !marked.has(id) })
      row.querySelectorAll("[data-dropzone-remove]").forEach((part) => { part.hidden = marked.has(id) })
      row.querySelector(marked.has(id) ? "[data-dropzone-undo]" : "[data-dropzone-remove]")?.focus()
      if (limit && count() < maxFiles) limit.hidden = true
      dirty()
    }
    take(add)
    saved().forEach((row) => { if (marked.has(row.dataset.dropzoneSaved)) mark(row, true) })
    for (const type of ["start", "progress", "finish"]) {
      on(input, `upload:${type}`, ({ detail: { upload } }) => {
        const row = rowOf(upload)
        if (row) paint(row, upload)
        if (type !== "progress") dirty()
      })
    }
    on(input, "upload:remove", ({ detail: { upload } }) => {
      const row = rowOf(upload)
      if (!row) return
      rows.delete(row)
      dropRow(row)
      list.hidden = list.children.length === 0
      dirty()
    })
    on(list, "click", (event) => {
      const button = event.target.closest("[data-dropzone-remove], [data-dropzone-undo], [data-dropzone-retry]")
      const row = button?.closest("li")
      if (!row) return
      if (row.hasAttribute("data-dropzone-saved")) return mark(row, !button.hasAttribute("data-dropzone-undo"))
      const entry = rows.get(row)
      if (!entry) return
      if (button.hasAttribute("data-dropzone-retry")) return retryUpload(input, entry.upload)
      if (entry.upload) return removeUpload(input, entry.upload)
      rows.delete(row)
      dropRow(row)
      list.hidden = list.children.length === 0
      input.focus()
      dirty()
    })
    afterReset(input.form, signal, () => {
      saved().forEach((row) => mark(row, false))
      rows.forEach((entry, row) => { if (!entry.upload) dropRow(row) })
      rows.clear()
      list.hidden = list.children.length === 0
      dirty()
    })
    on(window, "beforeunload", (event) => {
      if (this.changes && !input.form?.dataset.submitting) event.preventDefault()
    })
    on(input.form ?? this, "submit", () => { if (input.form) input.form.dataset.submitting = "" })
    list.hidden = list.children.length === 0
    dirty()
  }
})

const luminance = (hex) => hex.slice(1).match(/../g)
  .map((pair) => parseInt(pair, 16) / 255)
  .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0)

const readHex = (text) => {
  const digits = text.trim().replace(/^#/, "")
  if (!/^([0-9a-f]{3}){1,2}$/i.test(digits)) return null
  return `#${digits.length === 3 ? digits.replace(/./g, "$&$&") : digits}`.toLowerCase()
}

define("u-input-colour", class extends UniformElement {
  setup(signal) {
    const swatch = this.querySelector(':scope > input[type="color"]')
    if (!swatch) return
    const on = (target, type, listener) => target.addEventListener(type, listener, { signal })
    const part = (name, className) => {
      const node = document.createElement(name)
      if (className) node.className = className
      node.dataset.colourPart = ""
      return node
    }
    // A Turbo snapshot clones the live DOM: the swatch has lost its id to the generated input, so take it back.
    const stale = this.querySelectorAll(":scope > [data-colour-part]")
    this.fieldId ??= swatch.id || this.querySelector(":scope > input.u-input[data-colour-part]")?.id
    stale.forEach((node) => node.remove())
    const shared = ["aria-describedby", "aria-errormessage", "aria-invalid"]
    const input = part("input", "u-input")
    Object.assign(input, { type: "text", maxLength: 7, autocomplete: "off", autocapitalize: "none", spellcheck: false, placeholder: " ", pattern: "#?([0-9A-Fa-f]{3}){1,2}", disabled: swatch.disabled, defaultValue: (swatch.defaultValue || swatch.value).toUpperCase(), value: swatch.value.toUpperCase() })
    input.setAttribute("autocorrect", "off")
    if (this.fieldId) {
      swatch.removeAttribute("id")
      input.id = this.fieldId
    }
    shared.forEach((name) => { if (swatch.hasAttribute(name)) input.setAttribute(name, swatch.getAttribute(name)) })
    swatch.tabIndex = -1
    swatch.setAttribute("aria-hidden", "true")
    swatch.after(input)
    signal.addEventListener("abort", () => {
      this.querySelectorAll(":scope > [data-colour-part]").forEach((node) => node.remove())
      if (this.fieldId) swatch.id = this.fieldId
      swatch.removeAttribute("tabindex")
      swatch.removeAttribute("aria-hidden")
    })

    const errorId = input.getAttribute("aria-errormessage")
    const error = errorId && document.getElementById(errorId)
    const tokens = getComputedStyle(this)
    const contrast = (hex, token) => {
      const [a, b] = [luminance(hex), luminance(tokens.getPropertyValue(token).trim())]
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
    }
    const ink = (hex) => ["--background-color-ink", "--text-color-on-ink"].sort((a, b) => contrast(hex, b) - contrast(hex, a))[0]
    const message = error?.textContent.trim() ?? ""
    const validate = (hex) => input.setCustomValidity(hex ? "" : message)
    const flag = (invalid) => {
      input.setAttribute("aria-invalid", String(invalid))
      if (invalid) input.setCustomValidity(message)
      else {
        input.setCustomValidity("")
        unannounce(input)
      }
      if (!error) return
      error.hidden = !invalid
      const ids = (input.getAttribute("aria-describedby") ?? "").split(" ").filter((id) => id && id !== error.id)
      if (invalid) ids.push(error.id)
      input.setAttribute("aria-describedby", ids.join(" "))
    }
    const fire = (type) => swatch.dispatchEvent(new Event(type, { bubbles: true }))

    const options = [...(swatch.list?.options || [])].filter((option) => readHex(option.value))
    const choices = options.map((option) => {
      const hex = readHex(option.value)
      const choice = document.createElement("button")
      Object.assign(choice, { type: "button", value: hex })
      choice.style.backgroundColor = hex
      choice.style.color = `var(${ink(hex)})`
      choice.setAttribute("aria-label", option.label || hex)
      return choice
    })
    const mark = (hex) => {
      choices.forEach((choice) => choice.setAttribute("aria-pressed", String(choice.value === hex)))
      const current = choices.find((choice) => choice.getAttribute("aria-pressed") === "true") ?? choices[0]
      choices.forEach((choice) => { choice.tabIndex = choice === current ? 0 : -1 })
    }
    const set = (hex) => {
      swatch.value = hex
      input.value = hex.toUpperCase()
      flag(false)
      mark(hex)
      fire("input")
      fire("change")
    }
    mark(swatch.value)
    if (!input.hasAttribute("aria-invalid")) input.setAttribute("aria-invalid", "false")
    on(input, "input", () => {
      const hex = readHex(input.value)
      validate(hex)
      if (!hex) return
      swatch.value = hex
      flag(false)
      mark(hex)
      fire("input")
    })
    on(input, "change", (event) => {
      const hex = readHex(input.value)
      if (!hex) {
        if (event.isTrusted && input.getAttribute("aria-invalid") !== "true") announce(input, message)
        return flag(true)
      }
      input.value = hex.toUpperCase()
      fire("change")
    })
    on(input, "invalid", () => flag(true))
    afterReset(swatch.form, signal, () => {
      input.value = swatch.value.toUpperCase()
      flag(false)
      mark(swatch.value)
    })
    on(swatch, "input", (event) => {
      if (!event.isTrusted) return
      input.value = swatch.value.toUpperCase()
      flag(false)
      mark(swatch.value)
    })
    if (!choices.length) return

    const label = this.dataset.presetsLabel
    const toggle = part("button")
    Object.assign(toggle, { type: "button", disabled: swatch.disabled })
    toggle.setAttribute("aria-label", label)
    const picker = part("div", "u-menu")
    const grid = document.createElement("div")
    grid.setAttribute("role", "group")
    grid.setAttribute("aria-label", label)
    grid.append(...choices)
    const custom = document.createElement("button")
    Object.assign(custom, { type: "button", textContent: this.dataset.customLabel })
    picker.append(grid, document.createElement("hr"), custom)
    input.after(toggle, picker)

    const choose = (event) => {
      const choice = choices.find((each) => each.contains(event.target))
      if (!choice && !custom.contains(event.target)) return false
      if (choice) set(choice.value)
      else { try { swatch.showPicker() } catch { swatch.click() } }
      return true
    }
    on(picker, "keydown", (event) => {
      const at = choices.indexOf(event.target)
      if (at === -1) return
      const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns }[event.key]
      const next = { Home: choices[0], End: choices.at(-1) }[event.key] ?? (step && choices[at + step])
      if (step || next) event.preventDefault()
      if (!next) return
      choices.forEach((choice) => { choice.tabIndex = choice === next ? 0 : -1 })
      next.focus()
    })
    if (this.hasAttribute("data-open")) {
      toggle.setAttribute("aria-expanded", "true")
      on(picker, "click", choose)
      return
    }
    picker.id = `${this.fieldId || this.anchorName("u-input-colour").slice(2)}-picker`
    picker.popover = "auto"
    toggle.setAttribute("popovertarget", picker.id)
    const anchor = this.anchorName("u-input-colour")
    this.style.setProperty("anchor-name", anchor)
    picker.style.setProperty("position-anchor", anchor)
    on(picker, "toggle", (event) => {
      if (event.newState !== "open") return
      mark(swatch.value)
      choices.find((choice) => choice.tabIndex === 0)?.focus()
    })
    on(picker, "click", (event) => { if (choose(event)) picker.hidePopover() })
    on(input, "keydown", (event) => {
      if (event.key !== "ArrowDown" || toggle.disabled || picker.matches(":popover-open")) return
      event.preventDefault()
      picker.showPopover()
    })
  }
})

define("u-sidebar", class extends UniformElement {
  setup(signal) {
    const button = this.querySelector(":scope > div:first-child > button[aria-expanded]")
    if (!button) return
    button.addEventListener("click", () => {
      if (this.matches(":popover-open")) return this.hidePopover()
      const expanded = button.getAttribute("aria-expanded") === "false"
      button.setAttribute("aria-expanded", String(expanded))
      // The server renders aria-expanded from this cookie, so the column doesn't flash open on the next page.
      if (this.dataset.remember) document.cookie = `${this.dataset.remember}=${expanded ? "open" : "collapsed"}; path=/; max-age=31536000; samesite=lax`
    }, { signal })
    let edge = this.querySelector(":scope > div:first-child + button")
    if (!edge) {
      edge = document.createElement("button")
      edge.type = "button"
      edge.tabIndex = -1
      edge.setAttribute("aria-hidden", "true")
      button.parentElement.after(edge)
    }
    edge.title = button.getAttribute("aria-label") ?? ""
    edge.addEventListener("click", () => button.click(), { signal })
  }
})

const chartTip = (tooltip, x, min, max) => {
  const left = Math.max(min, Math.min(x - tooltip.offsetWidth / 2, max - tooltip.offsetWidth))
  tooltip.style.left = `${left}px`
}

const chartNumber = (point) => (Number.isFinite(point?.value) ? point.value : null)

const chartPoint = (raw) => {
  if (raw == null) return null
  const point = typeof raw === "object" ? raw : { value: raw }
  const value = typeof point.value === "string" ? parseFloat(point.value) : point.value
  return { value: Number.isFinite(value) ? value : null, text: point.text, label: point.label }
}

const chartRows = (data) => (Array.isArray(data?.rows) ? data.rows : []).map((row) => ({
  label: String(row.label ?? ""),
  cells: (Array.isArray(row.values) ? row.values : [row.value]).map(chartPoint),
  tone: row.tone || "neutral"
}))

const chartNice = (max) => {
  if (max <= 0) return 1
  const power = 10 ** Math.floor(Math.log10(max))
  return [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((step) => step * power >= max) * power
}

const chartWholeTop = (top) => {
  const whole = Math.max(2, Math.ceil(top))
  return whole % 2 ? whole + 1 : whole
}

const chartCurve = (points) => {
  if (points.length < 2) return ""
  const count = points.length
  const slope = points.slice(0, -1).map(([x, y], i) => (points[i + 1][1] - y) / (points[i + 1][0] - x))
  const tangent = points.map((_, i) => {
    if (i === 0) return slope[0]
    if (i === count - 1) return slope[count - 2]
    return slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2
  })
  slope.forEach((m, i) => {
    if (m === 0) { tangent[i] = tangent[i + 1] = 0; return }
    const a = tangent[i] / m
    const b = tangent[i + 1] / m
    const length = a * a + b * b
    if (length <= 9) return
    const k = 3 / Math.sqrt(length)
    tangent[i] = k * a * m
    tangent[i + 1] = k * b * m
  })
  const round = (n) => Math.round(n * 100) / 100
  return points.reduce((path, [x, y], i) => {
    if (i === 0) return `M${round(x)} ${round(y)}`
    const [px, py] = points[i - 1]
    const third = (x - px) / 3
    return `${path} C${round(px + third)} ${round(py + tangent[i - 1] * third)} ${round(x - third)} ${round(y - tangent[i] * third)} ${round(x)} ${round(y)}`
  }, "")
}

const chartSvg = (name, attributes = {}) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name)
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
  return element
}

const chartHtml = (name, className, text) => {
  const element = document.createElement(name)
  if (className) element.className = className
  if (text != null) element.textContent = text
  return element
}

let chartFades = 0

define("u-chart", class extends UniformElement {
  setup(signal) {
    signal.addEventListener("abort", () => this.clear())
    const src = this.getAttribute("src")
    this.data = this.inlineData()
    if (src && !this.data) this.load(src, signal)
    else if (!this.data && this.getAttribute("aria-busy") === "true") this.shimmer()
    else this.render(signal)
  }

  inlineData() {
    const script = this.querySelector(':scope > script[type="application/json"]')
    if (!script) return null
    try {
      return JSON.parse(script.textContent)
    } catch (error) {
      console.error("u-chart: the JSON inside the chart doesn't parse.", error)
      return null
    }
  }

  text(point, top) {
    return point?.text ?? this.format(point?.value ?? 0, top)
  }

  name() {
    return this.dataset.label || ""
  }

  describe(words) {
    const name = this.name()
    this.setAttribute("role", "img")
    this.setAttribute("aria-label", [name, words].filter(Boolean).join(": "))
  }

  shimmer() {
    const type = this.getAttribute("type") || "bar"
    const bar = (width) => {
      const line = chartHtml("span", "u-shimmer")
      line.style.width = width
      return line
    }
    let shimmer
    if (type === "stacked") {
      shimmer = chartHtml("div", "u-chart-stacked")
      const stack = chartHtml("div", "u-chart-stack")
      stack.append(bar("100%"))
      const legend = chartHtml("ul", "u-chart-legend")
      ;["96px", "120px", "80px", "136px"].forEach((width) => {
        const item = chartHtml("li")
        item.append(bar(width))
        legend.append(item)
      })
      shimmer.append(stack, legend)
    } else if (type === "meter") {
      shimmer = chartHtml("div", "u-chart-meter-loading")
      shimmer.append(bar("100%"))
    } else if (type === "spark") {
      shimmer = chartHtml("div", "u-chart-spark")
      shimmer.append(bar("100%"))
    } else {
      shimmer = chartHtml("div", `u-chart-loading${type === "line" ? " u-chart-loading-line" : ""}`)
      if (this.hasAttribute("height")) shimmer.style.setProperty("--u-chart-height", `${this.getAttribute("height")}px`)
      if (type === "line") {
        const svg = chartSvg("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none" })
        svg.append(chartSvg("path", { d: "M0 92 C15 86 25 80 40 66 C55 52 65 50 80 34 C88 26 94 22 100 18 L100 100 L0 100 Z" }))
        shimmer.append(svg)
      } else {
        ;[45, 60, 40, 70, 55, 80, 65, 50, 75, 60, 85, 70].forEach((at) => {
          const column = document.createElement("span")
          column.style.setProperty("--u-chart-at", `${at}%`)
          shimmer.append(column)
        })
      }
    }
    shimmer.setAttribute("aria-hidden", "true")
    this.mark(shimmer)
    this.describe("")
  }

  clear() {
    this.querySelectorAll(":scope > [data-chart]").forEach((node) => node.remove())
    delete this.dataset.drawn
    this.removeAttribute("role")
    this.removeAttribute("aria-label")
  }

  mark(node) {
    node.dataset.chart = ""
    this.append(node)
    return node
  }

  async load(src, signal) {
    this.setAttribute("aria-busy", "true")
    this.shimmer()
    try {
      const response = await fetch(src, { headers: { Accept: "application/json" }, signal })
      if (!response.ok) throw new Error(response.statusText)
      this.data = await response.json()
      this.clear()
      this.removeAttribute("aria-busy")
      this.render(signal)
    } catch (error) {
      if (signal.aborted) return
      this.clear()
      this.removeAttribute("aria-busy")
      if (this.dataset.error) this.mark(chartHtml("p", "u-chart-empty", this.dataset.error))
    }
  }

  render(signal) {
    this.clear()
    if (!this.data) return
    const rows = chartRows(this.data)
    const names = Array.isArray(this.data.series) ? this.data.series.map(String) : []
    const type = this.getAttribute("type") || "bar"
    const hasData = rows.some((row) => row.cells.some((cell) => chartNumber(cell)))
    if (!hasData) {
      const empty = this.mark(chartHtml("p", "u-chart-empty", this.dataset.empty || ""))
      if (this.hasAttribute("height")) empty.style.setProperty("--u-chart-height", `${this.getAttribute("height")}px`)
      if (type === "bar" || type === "line") empty.classList.add("u-chart-empty-plot")
      this.dataset.drawn = ""
      return
    }
    if (type === "stacked") this.stacked(rows)
    else if (type === "meter") this.meter(rows)
    else if (type === "spark") this.spark(rows)
    else this.plot(type, rows, names, signal)
    this.dataset.drawn = ""
  }

  format(value, top) {
    const lang = this.closest("[lang]")?.lang || navigator.language
    const compact = top >= 10000
    const number = new Intl.NumberFormat(lang, { notation: compact ? "compact" : "standard", maximumFractionDigits: compact ? 1 : 2 }).format(value)
    return `${this.getAttribute("prefix") || ""}${number}`
  }

  plot(type, rows, names, signal) {
    const line = type === "line"
    const seriesCount = line ? Math.min(2, names.length || 1) : 1
    const series = Array.from({ length: seriesCount }, (_, s) => rows.map((row) => chartNumber(row.cells[s])))
    const values = series.flat().filter((value) => value != null)
    const nice = chartNice(Math.max(...values))
    const top = Number(this.getAttribute("max")) || (this.hasAttribute("whole") ? chartWholeTop(nice) : nice)
    const ticks = [0, top / 2, top]
    const slot = 10
    const width = rows.length * slot
    const y = (value) => 100 - (100 * value) / top

    const plot = chartHtml("div", "u-chart-plot")
    if (this.hasAttribute("height")) plot.style.setProperty("--u-chart-height", `${this.getAttribute("height")}px`)

    const axisY = chartHtml("div", "u-chart-axis u-chart-axis-y")
    axisY.setAttribute("aria-hidden", "true")
    ticks.forEach((tick) => {
      const label = chartHtml("span", "u-chart-tick", this.format(tick, top))
      label.style.setProperty("--u-chart-at", `${(100 * tick) / top}%`)
      axisY.append(label)
    })

    const svg = chartSvg("svg", { class: "u-chart-svg", viewBox: `0 0 ${width} 100`, preserveAspectRatio: "none", "aria-hidden": "true" })
    const grid = chartSvg("g", { class: "u-chart-grid" })
    ticks.forEach((tick) => grid.append(chartSvg("line", { x1: 0, x2: width, y1: y(tick), y2: y(tick) })))
    svg.append(grid)

    if (line) {
      const id = `u-chart-fade-${++chartFades}`
      const defs = chartSvg("defs")
      const fade = chartSvg("linearGradient", { id, x1: 0, x2: 0, y1: 0, y2: 1 })
      fade.append(chartSvg("stop", { class: "u-chart-fade-top", offset: "0" }), chartSvg("stop", { class: "u-chart-fade-bottom", offset: "1" }))
      defs.append(fade)
      svg.append(defs)
      const points = series.map((values) => values.flatMap((value, i) => value == null ? [] : [[i * slot + slot / 2, y(value)]]))
      if (points[1]?.length) svg.append(chartSvg("path", { class: "u-chart-line u-chart-previous", d: chartCurve(points[1]) }))
      const main = points[0]
      if (main.length > 1) {
        const curve = chartCurve(main)
        svg.append(chartSvg("path", { class: "u-chart-area", fill: `url(#${id})`, d: `${curve} L${main.at(-1)[0]} 100 L${main[0][0]} 100 Z` }))
        svg.append(chartSvg("path", { class: "u-chart-line u-chart-current", d: curve }))
      }
    }

    const current = this.getAttribute("current") === "none" ? -1 : rows.length - 1
    rows.forEach((row, i) => {
      const column = chartSvg("g", { class: "u-chart-col" })
      column.dataset.index = i
      column.append(chartSvg("rect", { class: "u-chart-hit", x: i * slot, y: 0, width: slot, height: 100 }))
      column.append(chartSvg("line", { class: "u-chart-guide", x1: i * slot + slot / 2, x2: i * slot + slot / 2, y1: 0, y2: 100 }))
      const value = series[0][i]
      if (!line && value != null) {
        column.append(chartSvg("rect", {
          class: `u-chart-bar ${i === current ? "u-chart-current" : "u-chart-previous"}`,
          x: i * slot + 2, y: y(value), width: slot - 4, height: 100 - y(value)
        }))
      }
      svg.append(column)
    })

    const axisX = chartHtml("div", "u-chart-axis u-chart-axis-x")
    axisX.setAttribute("aria-hidden", "true")
    axisX.append(chartHtml("span", "u-chart-tick", rows[0].label), chartHtml("span", "u-chart-tick", rows.at(-1).label))

    const tooltip = chartHtml("div", "u-chart-tooltip")
    tooltip.hidden = true
    tooltip.setAttribute("aria-hidden", "true")
    const lines = series.map((_, s) => {
      const row = chartHtml("p", seriesCount > 1 ? `u-chart-key u-chart-key-line ${s === 0 ? "u-chart-current" : "u-chart-previous"}` : "flex flex-wrap items-center gap-2")
      row.append(chartHtml("span", "u-chart-tooltip-value"), chartHtml("span", "u-chart-tooltip-label"))
      tooltip.append(row)
      return row
    })

    if (seriesCount > 1) {
      const legend = chartHtml("ul", "u-chart-legend")
      legend.setAttribute("aria-hidden", "true")
      names.slice(0, seriesCount).forEach((name, s) => legend.append(chartHtml("li", `u-chart-key u-chart-key-line ${s === 0 ? "u-chart-current" : "u-chart-previous"}`, name)))
      this.mark(legend)
    }

    plot.append(axisY, svg, axisX, tooltip)
    this.mark(plot)

    const columns = [...svg.querySelectorAll(".u-chart-col")]
    let active = null
    let rects = null
    const hide = () => {
      tooltip.hidden = true
      columns[active]?.classList.remove("u-chart-col-active")
      active = null
    }
    const show = (index) => {
      columns[active]?.classList.remove("u-chart-col-active")
      active = index
      const column = columns[index]
      column.classList.add("u-chart-col-active")
      const row = rows[index]
      let shown = false
      lines.forEach((tip, s) => {
        const cell = row.cells[s]
        const empty = chartNumber(cell) == null
        tip.hidden = empty
        if (empty) return
        shown = true
        tip.children[0].textContent = this.text(cell, top)
        tip.children[1].textContent = cell.label || row.label
      })
      tooltip.hidden = !shown
      if (!shown) return
      rects ??= { box: plot.getBoundingClientRect(), area: svg.getBoundingClientRect() }
      const { box, area } = rects
      const hit = column.querySelector(".u-chart-hit").getBoundingClientRect()
      chartTip(tooltip, hit.left + hit.width / 2 - box.left, area.left - box.left, area.right - box.left)
    }
    const measured = new ResizeObserver(() => { rects = null })
    measured.observe(plot)
    signal.addEventListener("abort", () => measured.disconnect())
    addEventListener("scroll", () => { rects = null }, { signal, passive: true, capture: true })
    svg.addEventListener("pointerover", (event) => {
      const column = event.target.closest(".u-chart-col")
      if (column) show(Number(column.dataset.index))
    }, { signal })
    svg.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "touch") hide()
    }, { signal })

    // One Tab stop, named by data-label; the arrow keys read each column through the same tooltip as hover.
    plot.tabIndex = 0
    plot.setAttribute("role", "img")
    if (this.name()) plot.setAttribute("aria-label", this.name())
    plot.addEventListener("focus", () => show(active ?? (current === -1 ? rows.length - 1 : current)), { signal })
    plot.addEventListener("blur", hide, { signal })
    plot.addEventListener("keydown", (event) => {
      const at = active ?? rows.length - 1
      const next = { ArrowLeft: at - 1, ArrowRight: at + 1, Home: 0, End: rows.length - 1 }[event.key]
      if (event.key === "Escape" && active !== null) {
        event.preventDefault()
        return hide()
      }
      if (next === undefined) return
      event.preventDefault()
      show(Math.max(0, Math.min(next, rows.length - 1)))
    }, { signal })
  }

  stacked(rows) {
    const wrap = chartHtml("div", "u-chart-stacked")
    wrap.setAttribute("aria-hidden", "true")
    const bar = chartHtml("div", "u-chart-stack")
    const legend = chartHtml("ul", "u-chart-legend")
    rows.forEach((row) => {
      const value = chartNumber(row.cells[0]) || 0
      const segment = chartHtml("span", `u-chart-segment u-chart-${row.tone}`)
      segment.style.setProperty("--u-chart-share", value)
      bar.append(segment)
      const item = chartHtml("li")
      item.append(chartHtml("span", `u-badge u-badge-${row.tone}`, row.label), chartHtml("span", "u-meta", this.text(row.cells[0])))
      legend.append(item)
    })
    wrap.append(bar, legend)
    this.mark(wrap)
    this.describe(rows.map((row) => `${row.label} ${this.text(row.cells[0])}`).join(", "))
  }

  meter(rows) {
    const meter = chartHtml("meter", "u-chart-meter")
    meter.setAttribute("aria-hidden", "true")
    meter.min = 0
    meter.max = chartNumber(rows[1]?.cells[0]) || Number(this.getAttribute("max")) || 100
    meter.value = chartNumber(rows[0].cells[0]) || 0
    this.mark(meter)
    this.describe(`${this.text(rows[0].cells[0])} / ${rows[1] ? this.text(rows[1].cells[0]) : this.format(meter.max)}`)
  }

  spark(rows) {
    const values = rows.map((row) => chartNumber(row.cells[0])).filter((value) => value != null)
    const low = Math.min(...values)
    const range = Math.max(...values) - low || 1
    const step = 96 / Math.max(1, values.length - 1)
    const points = values.map((value, i) => [i * step, 22 - (20 * (value - low)) / range])
    const id = `u-chart-fade-${++chartFades}`
    const svg = chartSvg("svg", { class: "u-chart-spark", viewBox: "0 0 96 24", preserveAspectRatio: "none", "aria-hidden": "true" })
    const defs = chartSvg("defs")
    const fade = chartSvg("linearGradient", { id, x1: 0, x2: 0, y1: 0, y2: 1 })
    fade.append(chartSvg("stop", { class: "u-chart-fade-top", offset: "0" }), chartSvg("stop", { class: "u-chart-fade-bottom", offset: "1" }))
    defs.append(fade)
    const curve = chartCurve(points)
    svg.append(defs, chartSvg("path", { class: "u-chart-area", fill: `url(#${id})`, d: `${curve} L96 24 L0 24 Z` }), chartSvg("path", { class: "u-chart-line u-chart-current", d: curve }))
    this.mark(svg)
    const last = rows.findLast((row) => chartNumber(row.cells[0]) != null)
    this.describe(last ? `${last.label} ${this.text(last.cells[0])}` : "")
  }
})

const timeFormats = {
  time: { hour: "numeric", minute: "2-digit" },
  date: { month: "short", day: "numeric" },
  datetime: { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
}
const formatters = new Map()
const cached = (Format, lang, options) => {
  const key = `${Format.name}|${lang}|${JSON.stringify(options)}`
  if (!formatters.has(key)) formatters.set(key, new Format(lang, options))
  return formatters.get(key)
}
const timeNow = (element) => {
  const pinned = element.closest("[data-time-now]")?.dataset.timeNow
  return pinned ? new Date(pinned) : new Date()
}
const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timeZone = (element) => element.closest("[data-time-zone]")?.dataset.timeZone || localZone
const zoneName = (date, lang, zone) => cached(Intl.DateTimeFormat, lang, { timeZone: zone, timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value
const clockTime = (date, lang, zone) => {
  if (!lang.toLowerCase().startsWith("en")) return cached(Intl.DateTimeFormat, lang, { ...timeFormats.time, timeZone: zone }).format(date)
  const parts = Object.fromEntries(cached(Intl.DateTimeFormat, lang, { hour: "numeric", minute: "2-digit", hour12: true, timeZone: zone }).formatToParts(date).map((part) => [part.type, part.value]))
  return `${parts.hour}${parts.minute === "00" ? "" : `:${parts.minute}`}${parts.dayPeriod.replace(/\W/g, "").toLowerCase()}`
}
// The day a moment falls on in a zone, as UTC midnight. The ISO calendar keeps the arithmetic Gregorian whatever the language.
const calendarDay = (date, zone) => {
  const parts = Object.fromEntries(cached(Intl.DateTimeFormat, "en-u-ca-iso8601-nu-latn", { timeZone: zone, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(date).map((part) => [part.type, Number(part.value)]))
  return Date.UTC(parts.year, parts.month - 1, parts.day)
}
const timeElements = new Set()
let timeTicker = null

define("u-relative-time", class extends UniformElement {
  setup(signal) {
    this.time = this.querySelector("time[datetime]")
    if (!this.time) return
    const value = this.time.getAttribute("datetime")
    // A date with no time is a calendar day, the same in every zone, not UTC midnight.
    const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    this.day = dateOnly ? Date.UTC(dateOnly[1], dateOnly[2] - 1, dateOnly[3]) : undefined
    this.date = dateOnly ? new Date(dateOnly[1], dateOnly[2] - 1, dateOnly[3]) : new Date(value)
    if (Number.isNaN(this.date.getTime())) return
    this.time.title ||= dateOnly
      ? cached(Intl.DateTimeFormat, langOf(this), { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(this.day)
      : cached(Intl.DateTimeFormat, langOf(this), { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: timeZone(this), timeZoneName: "short" }).format(this.date)
    this.render()
    timeElements.add(this)
    timeTicker ??= setInterval(() => timeElements.forEach((element) => element.render()), 60000)
    signal.addEventListener("abort", () => {
      timeElements.delete(this)
      if (!timeElements.size) { clearInterval(timeTicker); timeTicker = null }
    })
  }

  render() {
    const lang = langOf(this)
    const format = this.getAttribute("format") || "datetime"
    const now = timeNow(this)
    const zone = timeZone(this)
    const relative = cached(Intl.RelativeTimeFormat, lang, { numeric: "auto" })
    if (format === "relative") {
      const seconds = Math.round((this.date - now) / 1000)
      const units = [["day", 86400], ["hour", 3600], ["minute", 60]]
      const [unit, size] = units.find(([, size]) => Math.abs(seconds) >= size) || ["minute", 60]
      this.time.textContent = relative.format(Math.abs(seconds) < 60 ? 0 : Math.round(seconds / size), Math.abs(seconds) < 60 ? "minute" : unit)
      return
    }
    const day = this.day ?? calendarDay(this.date, zone)
    const today = calendarDay(now, zone)
    const sameYear = new Date(day).getUTCFullYear() === new Date(today).getUTCFullYear()
    const date = this.day === undefined
      ? cached(Intl.DateTimeFormat, lang, { ...timeFormats.date, timeZone: zone, year: sameYear ? undefined : "numeric" }).format(this.date)
      : cached(Intl.DateTimeFormat, lang, { ...timeFormats.date, timeZone: "UTC", year: sameYear ? undefined : "numeric" }).format(this.day)
    if (format === "day") {
      const diff = Math.round((day - today) / 86400000)
      const text = Math.abs(diff) <= 1 ? relative.format(diff, "day") : date
      this.time.textContent = text.charAt(0).toLocaleUpperCase(lang) + text.slice(1)
      return
    }
    if (format === "date" || this.day !== undefined) { this.time.textContent = date; return }
    const home = this.getAttribute("zone")
    const away = home && home !== zone ? ` ${zoneName(this.date, lang, zone)}` : ""
    if (format === "time") { this.time.textContent = clockTime(this.date, lang, zone) + away; return }
    this.time.textContent = `${date}, ${clockTime(this.date, lang, zone)}${away}`
  }
})

define("u-time-zone", class extends UniformElement {
  setup() {
    const input = this.querySelector(":scope > input")
    if (input && !input.value) input.value = localZone
  }
})

define("u-toast", class extends UniformElement {
  setup(signal) {
    const region = this
    let before = null
    region.addEventListener("focusin", (event) => {
      if (!region.contains(event.relatedTarget)) before = event.relatedTarget
    }, { signal })
    const leave = (toast) => {
      if (toast.classList.contains("u-toast-leaving")) return
      toast.classList.add("u-toast-leaving")
      toast.inert = true
      const done = () => toast.remove()
      toast.addEventListener("transitionend", (event) => { if (event.target === toast) done() })
      setTimeout(done, 300)
    }
    const close = (toast) => {
      const hadFocus = toast.contains(document.activeElement)
      leave(toast)
      if (hadFocus && before?.isConnected) before.focus()
    }
    const watch = (toast) => {
      const wait = Number(toast.dataset.timeout ?? (toast.classList.contains("u-toast-danger") ? 0 : toast.querySelector(":scope > button:not(.u-btn-close)") ? 10000 : 5000))
      let timer = null
      let left = wait
      let started = 0
      let hovered = false
      let focused = false
      let dragging = false
      if (wait) toast.style.setProperty("--u-toast-time", `${wait}ms`)
      // One idempotent sync: mouseenter + focusin both pause, so pausing per event would subtract the elapsed time twice.
      const sync = () => {
        if (!wait) return
        const hold = hovered || focused || dragging
        if (hold && timer) {
          clearTimeout(timer)
          timer = null
          left -= Date.now() - started
        }
        if (!hold && !timer) {
          started = Date.now()
          timer = setTimeout(() => close(toast), left)
        }
        toast.toggleAttribute("data-paused", hold)
      }
      signal.addEventListener("abort", () => clearTimeout(timer))
      toast.addEventListener("mouseenter", () => { hovered = true; sync() }, { signal })
      toast.addEventListener("mouseleave", () => { hovered = false; sync() }, { signal })
      toast.addEventListener("focusin", () => { focused = true; sync() }, { signal })
      toast.addEventListener("focusout", (event) => { if (!toast.contains(event.relatedTarget)) { focused = false; sync() } }, { signal })
      toast.querySelectorAll(":scope > button").forEach((button) => button.addEventListener("click", () => close(toast), { signal }))
      let from = null
      toast.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button, a")) return
        from = event.clientY
        toast.setPointerCapture(event.pointerId)
        toast.dataset.dragging = ""
        dragging = true
        sync()
      }, { signal })
      toast.addEventListener("pointermove", (event) => {
        if (from === null) return
        const down = Math.max(0, event.clientY - from)
        toast.style.translate = `0 ${down}px`
        toast.style.opacity = String(Math.max(0, 1 - down / 96))
      }, { signal })
      const release = (event) => {
        if (from === null) return
        const down = event.clientY - from
        from = null
        delete toast.dataset.dragging
        dragging = false
        if (down > 48) {
          clearTimeout(timer)
          toast.style.translate = "0 100%"
          toast.style.opacity = "0"
          setTimeout(() => close(toast), 160)
          return
        }
        toast.style.translate = ""
        toast.style.opacity = ""
        sync()
      }
      toast.addEventListener("pointerup", release, { signal })
      toast.addEventListener("pointercancel", release, { signal })
      sync()
    }
    // A dialog opened after the region would cover it, so each new toast puts the region back on top.
    const raise = () => {
      if (!region.hasAttribute("popover")) return
      if (region.matches(":popover-open")) region.hidePopover()
      region.showPopover()
    }
    region.querySelectorAll(":scope > div").forEach(watch)
    raise()
    const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node.parentElement !== region || node.localName !== "div") return
      region.querySelectorAll(":scope > div:not(.u-toast-leaving)").forEach((old) => { if (old !== node) leave(old) })
      raise()
      watch(node)
    })))
    observer.observe(region, { childList: true })
    signal.addEventListener("abort", () => observer.disconnect())
  }
})

define("u-data-grid", class extends UniformElement {
  setup(signal) {
    const table = this.querySelector("table")
    if (!table?.tBodies[0]) return
    const on = (target, type, listener) => target.addEventListener(type, listener, { signal })
    const tbody = table.tBodies[0]
    const headers = table.tHead ? [...table.tHead.rows[0].cells] : []
    const key = this.id && `u-data-grid:${this.id}`
    const stored = () => { try { return JSON.parse(localStorage.getItem(key)) || {} } catch { return {} } }
    const store = (patch) => { if (!key) return; try { localStorage.setItem(key, JSON.stringify({ ...stored(), ...patch })) } catch {} }
    const words = (name, fallback) => this.dataset[name] || fallback
    this.semantics(table)
    this.keepNarrow(tbody, headers)
    this.selection(on, tbody)
    this.rowLinks(on, tbody)
    this.columns(on, table, headers, stored, store)
    this.editing(on, signal, tbody, headers, words)
  }

  semantics(table) {
    const scroller = this.querySelector(".u-table")
    if (scroller) {
      if (!scroller.hasAttribute("role")) scroller.setAttribute("role", "region")
      if (!scroller.hasAttribute("tabindex")) scroller.tabIndex = 0
      if (!scroller.hasAttribute("aria-label") && !scroller.hasAttribute("aria-labelledby")) {
        const caption = table.caption
        if (caption) {
          caption.id ||= `${this.id || this.anchorName("u-data-grid").slice(2)}-caption`
          scroller.setAttribute("aria-labelledby", caption.id)
        } else {
          scroller.setAttribute("aria-label", this.getAttribute("aria-label") || this.title || "Table")
        }
      }
    }
    const role = (node, name) => { if (node && !node.hasAttribute("role")) node.setAttribute("role", name) }
    // display: block on the stacked cells makes browsers drop the native table semantics.
    role(table, "table")
    ;[table.tHead, ...table.tBodies, table.tFoot].forEach((group) => role(group, "rowgroup"))
    ;[...table.rows].forEach((row) => {
      role(row, "row")
      ;[...row.cells].forEach((cell) => role(cell, cell.localName === "th" ? (row.parentElement === table.tHead ? "columnheader" : "rowheader") : "cell"))
    })
  }

  keepNarrow(tbody, headers) {
    const kept = headers.map((th) => th.hasAttribute("data-keep-narrow"))
    if (!kept.includes(true)) return
    // The header row is gone on a phone, so each kept cell carries its column's name.
    const labels = headers.map((th) => th.textContent.trim() || th.getAttribute("aria-label") || "")
    ;[...tbody.rows].forEach((row) => [...row.cells].forEach((cell, i) => {
      cell.toggleAttribute("data-keep-narrow", kept[i])
      if (kept[i] && i > 0 && labels[i]) cell.dataset.label = labels[i]
    }))
  }

  narrow() {
    return this.clientWidth < 600 && !!this.querySelector("thead [data-keep-narrow]")
  }

  selection(on, tbody) {
    const all = this.querySelector("thead input[type=checkbox]")
    const rows = () => [...tbody.querySelectorAll("input[type=checkbox]")].filter((box) => !box.closest("tr").hidden)
    const counts = this.querySelectorAll("form output")
    const update = () => {
      const boxes = rows()
      const n = boxes.filter((box) => box.checked).length
      if (all) {
        all.checked = n > 0 && n === boxes.length
        all.indeterminate = n > 0 && n < boxes.length
      }
      counts.forEach((count) => { count.value = n })
      this.dispatchEvent(new CustomEvent("data-grid:select", { bubbles: true, detail: { count: n } }))
    }
    if (all) on(all, "change", () => { rows().forEach((box) => { box.checked = all.checked }); update() })
    on(tbody, "change", (event) => { if (event.target.matches("input[type=checkbox]")) update() })
    this.querySelectorAll("form:has(output)").forEach((form) => on(form, "reset", () => {
      requestAnimationFrame(() => { rows().forEach((box) => { box.checked = false }); update(); all?.focus() })
    }))
    update()
  }

  // The frozen first cell is sticky, so its link can't stretch over the row
  // the way it does in a plain table. A click on the row follows it instead.
  rowLinks(on, tbody) {
    on(tbody, "click", (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.target.closest("a, button, input, label, select, summary, textarea, [popover], .u-data-grid-editor, .u-table-actions")) return
      const cell = event.target.closest("td, th")
      if (!cell || cell.querySelector(":scope > template")) return
      const link = cell.parentElement.cells[0]?.querySelector("a:not(.u-btn)")
      if (!link || getSelection()?.toString()) return
      if (event.metaKey || event.ctrlKey) window.open(link.href, "_blank", "noopener")
      else link.click()
    })
  }

  columns(on, table, headers, stored, store) {
    this.querySelectorAll(".u-menu > [data-column-toggle]").forEach((node) => node.remove())
    const menu = [...this.querySelectorAll(".u-menu")].find((item) => !item.querySelector("input, a, button"))
    if (!menu || headers.length < 2) return
    const hidden = new Set(stored().hidden ?? headers.flatMap((th, i) => th.hidden ? [i] : []))
    const show = (index, visible) => [...table.rows].forEach((row) => { if (row.cells[index]) row.cells[index].hidden = !visible })
    headers.slice(1).forEach((th, offset) => {
      const index = offset + 1
      if (!th.textContent.trim()) return
      const label = document.createElement("label")
      const box = document.createElement("input")
      const text = document.createElement("span")
      label.className = "u-checkbox"
      label.dataset.columnToggle = ""
      box.type = "checkbox"
      box.checked = !hidden.has(index)
      text.textContent = th.textContent.trim()
      label.append(box, text)
      menu.append(label)
      show(index, box.checked)
      on(box, "change", () => {
        show(index, box.checked)
        if (box.checked) hidden.delete(index)
        else hidden.add(index)
        store({ hidden: [...hidden] })
      })
    })
  }

  editing(on, signal, tbody, headers, words) {
    const cells = () => [...tbody.querySelectorAll("td")].filter((cell) => cell.querySelector(":scope > template"))
    const valueOf = (cell) => cell.querySelector(":scope > .u-data-grid-value")
    // A real button gives the cell a role, a name, and Enter and Space.
    cells().forEach((cell) => {
      if (valueOf(cell)) return
      const button = document.createElement("button")
      button.type = "button"
      button.className = "u-data-grid-value"
      button.setAttribute("aria-description", cell.getAttribute("aria-description") || words("editHint", "Press Enter to change"))
      cell.removeAttribute("aria-description")
      button.append(...[...cell.childNodes].filter((node) => node.nodeName !== "TEMPLATE"))
      cell.prepend(button)
    })
    // On a phone the row is one link and cells don't edit.
    let was = null
    const fit = () => {
      const narrow = this.narrow()
      if (narrow === was) return
      was = narrow
      cells().forEach((cell) => { if (valueOf(cell)) valueOf(cell).disabled = narrow })
    }
    const resize = new ResizeObserver(fit)
    resize.observe(this)
    signal.addEventListener("abort", () => resize.disconnect())
    const toast = (message, action) => {
      const region = document.querySelector("u-toast")
      if (!region) return
      const item = document.createElement("div")
      const text = document.createElement("p")
      const close = document.createElement("button")
      text.textContent = message
      close.type = "button"
      close.className = "u-btn-close"
      close.setAttribute("aria-label", words("dismiss", "Dismiss"))
      item.append(text)
      if (action) {
        const button = document.createElement("button")
        button.type = "button"
        button.textContent = action.label
        button.addEventListener("click", action.run, { once: true, signal })
        item.append(button)
      } else {
        item.className = "u-toast-danger"
      }
      item.append(close)
      region.append(item)
    }
    const show = (cell, html) => { valueOf(cell).innerHTML = trustedHTML(html) }
    const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
    const save = async (cell, form, field, previous) => {
      const before = valueOf(cell).innerHTML
      const label = field.selectedOptions?.[0]?.textContent.trim() ?? field.value
      const detail = { cell, form, field, value: field.value, previous, label, html: null }
      const change = new CustomEvent("data-grid:change", { bubbles: true, cancelable: true, detail })
      let ok = true
      if (this.dispatchEvent(change)) {
        try {
          const token = document.querySelector('meta[name="csrf-token"]')?.content
          const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "text/html", ...(token && { "X-CSRF-Token": token }) } })
          ok = response.ok
          if (ok) detail.html = (await response.text()).trim() || null
        } catch {
          ok = false
        }
      }
      if (!ok) {
        field.value = previous
        toast(words("failed", "Couldn't save that change. Try again."))
        return
      }
      show(cell, detail.html ?? escape(label))
      cell.classList.add("u-data-grid-changed")
      return before
    }
    const edit = (cell) => {
      if (this.narrow() || cell.querySelector(".u-data-grid-editor")) return
      const template = cell.querySelector(":scope > template")
      const editor = document.createElement("div")
      editor.className = "u-data-grid-editor"
      editor.append(template.content.cloneNode(true))
      cell.append(editor)
      const form = editor.querySelector("form")
      const field = form?.querySelector("select, textarea, input:not([type=hidden])")
      if (!field) { editor.remove(); return }
      const header = headers[cell.cellIndex]?.textContent.trim()
      if (header && !field.labels?.length && !field.hasAttribute("aria-label")) field.setAttribute("aria-label", header)
      const previous = field.value
      field.focus()
      const session = new AbortController()
      signal.addEventListener("abort", () => session.abort(), { signal: session.signal })
      const listen = (target, type, listener) => target.addEventListener(type, listener, { signal: session.signal })
      const finish = async (keep) => {
        if (session.signal.aborted) return
        session.abort()
        const changed = keep && field.value !== previous
        const value = field.value
        editor.remove()
        valueOf(cell).focus()
        if (!changed) return
        const fieldName = field.name
        const before = await save(cell, form, field, previous)
        if (before === undefined) return
        const kept = template.content.querySelector(`[name="${CSS.escape(fieldName)}"]`)
        if (kept) setValue(kept, value)
        toast(words("saved", "Saved"), { label: words("undo", "Undo"), run: async () => {
          const again = template.content.cloneNode(true).querySelector("form")
          const field2 = again.querySelector(`[name="${CSS.escape(fieldName)}"]`)
          setValue(field2, previous)
          const undone = await save(cell, again, field2, value)
          if (undone === undefined) return
          if (kept) setValue(kept, previous)
          cell.classList.remove("u-data-grid-changed")
        } })
      }
      listen(field, "keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) return
        event.stopPropagation()
        if (event.key === "Enter") { event.preventDefault(); finish(true) }
        if (event.key === "Escape") { event.preventDefault(); finish(false) }
      })
      listen(field, "blur", () => finish(true))
      listen(form, "submit", (event) => { event.preventDefault(); finish(true) })
    }
    const setValue = (field, value) => {
      if (field.tagName === "SELECT") [...field.options].forEach((option) => { option.toggleAttribute("selected", option.value === value) })
      else field.setAttribute("value", value)
      field.value = value
    }
    on(tbody, "click", (event) => {
      const cell = event.target.closest("td")
      if (cell && cells().includes(cell) && !event.target.closest(".u-data-grid-editor, a, input, button:not(.u-data-grid-value)")) edit(cell)
    })
    on(tbody, "keydown", (event) => {
      if (event.key !== "F2" || !event.target.matches?.(".u-data-grid-value")) return
      event.preventDefault()
      edit(event.target.parentElement)
    })
  }
})

let lastCopyMessage = ""

const COPY_ICON_DONE = '<path d="M20 6 9 17l-5-5"/>'
const COPY_ICON_FAILED = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'

define("u-copy", class extends UniformElement {
  setup(signal) {
    const button = this.querySelector("[data-copy]")
    if (!button || !navigator.clipboard) return
    const label = this.querySelector("[data-copy-label]") || button
    const icon = label === button && !button.textContent.trim() ? button.querySelector("svg") : null
    const original = icon ? icon.innerHTML : label.textContent
    // A button's children aren't announced reliably, so the message goes in a status beside it.
    let status = this.querySelector('[role="status"]')
    if (!status) {
      status = document.createElement("span")
      status.className = "sr-only"
      status.setAttribute("role", "status")
      button.after(status)
    }
    let timer = null
    signal.addEventListener("abort", () => clearTimeout(timer))
    button.hidden = false
    button.addEventListener("click", async () => {
      let message = button.dataset.copied
      try {
        await navigator.clipboard.writeText(button.dataset.copy)
      } catch {
        message = button.dataset.copyFailed
      }
      if (signal.aborted) return
      clearTimeout(timer)
      if (icon) icon.innerHTML = message === button.dataset.copied ? COPY_ICON_DONE : COPY_ICON_FAILED
      else label.textContent = message
      this.toggleAttribute("data-copied", true)
      status.textContent = ""
      // VoiceOver skips a message that repeats the last one, and the no-break space isn't read.
      requestAnimationFrame(() => { status.textContent = message === lastCopyMessage ? `${message}\u00A0` : message; lastCopyMessage = status.textContent })
      timer = setTimeout(() => {
        if (icon) icon.innerHTML = original
        else label.textContent = original
        this.removeAttribute("data-copied")
        status.textContent = ""
      }, 1500)
    }, { signal })
  }
})

const storedChoice = (group) => {
  try { return localStorage.getItem(`u-toggle-panels:${group}`) } catch { return null }
}

define("u-toggle-panels", class extends UniformElement {
  setup(signal) {
    const fieldset = this.querySelector(":scope > .u-fieldset")
    const radios = [...(fieldset?.querySelectorAll(".u-toggle-group input[type=radio]") || [])]
    const panels = [...this.querySelectorAll(":scope > [data-value]")]
    if (!radios.length || !panels.length) return
    const group = this.dataset.group

    const show = (value) => {
      const radio = radios.find((each) => each.value === value)
      if (!radio) return
      radio.checked = true
      panels.forEach((panel) => { panel.hidden = panel.dataset.value !== value })
    }

    panels.forEach((panel) => panel.querySelector(":scope > :is(h2, h3, h4):first-child")?.setAttribute("hidden", ""))
    const remembered = group && storedChoice(group)
    show(radios.some((radio) => radio.value === remembered) ? remembered : (radios.find((radio) => radio.checked) || radios[0]).value)
    fieldset.hidden = false

    fieldset.addEventListener("change", (event) => {
      if (!radios.includes(event.target)) return
      show(event.target.value)
      if (!group) return
      try { localStorage.setItem(`u-toggle-panels:${group}`, event.target.value) } catch {}
      document.dispatchEvent(new CustomEvent("toggle-panels:change", { detail: { group, value: event.target.value, source: this } }))
    }, { signal })

    document.addEventListener("toggle-panels:change", ({ detail }) => {
      if (detail.group === group && detail.source !== this) show(detail.value)
    }, { signal })
  }
})

const applyTheme = (value) => {
  if (value === "light" || value === "dark") document.documentElement.dataset.uTheme = value
  else delete document.documentElement.dataset.uTheme
}

try { applyTheme(localStorage.getItem("u-theme-preference")) } catch {}

define("u-theme-preference", class extends UniformElement {
  setup(signal) {
    const buttons = [...this.querySelectorAll(":scope > button[value]")]
    if (!buttons.length) return
    const mark = () => {
      const current = document.documentElement.dataset.uTheme || "system"
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.value === current)))
    }
    mark()
    this.addEventListener("click", (event) => {
      const button = event.target.closest("button[value]")
      if (!buttons.includes(button)) return
      applyTheme(button.value)
      try { localStorage.setItem("u-theme-preference", button.value) } catch {}
      document.dispatchEvent(new CustomEvent("theme-preference:change", { detail: { value: button.value, source: this } }))
    }, { signal })
    document.addEventListener("theme-preference:change", mark, { signal })
  }
})

// Page-wide behaviour and platform fallbacks: document listeners, set up once however often this file loads.
const pageReady = Symbol.for("uniform.page")

const menuItems = (menu) => [...menu.querySelectorAll(":scope > :is(a[href], button), :scope > form > button")]
  .filter((item) => !item.disabled && item.getAttribute("aria-disabled") !== "true")

// Opening on the item after the current one makes "move to the next step" two key presses.
const firstMenuItem = (menu) => {
  const items = menuItems(menu)
  const current = menu.querySelector(':scope > [aria-current]:not([aria-current="false"]), :scope > form > [aria-current]:not([aria-current="false"])')
  let node = current?.closest(".u-menu > *")?.nextElementSibling
  while (node && !node.matches("hr")) {
    const item = items.find((candidate) => candidate === node || candidate.parentElement === node)
    if (item) return item
    node = node.nextElementSibling
  }
  return items[0]
}

// Arrow keys only where every item is a command or a link. Checkboxes, radios and pickers keep Tab.
const asMenu = (menu, invoker) => {
  if (menu.getAttribute("role") === "menu") return true
  const plain = 'a[href], button:not([role], [aria-pressed], [aria-checked])'
  const fits = [...menu.children].every((child) => child.matches(`${plain}, hr, hgroup`)
    || (child.matches("form") && [...child.children].every((each) => each.matches(`${plain}, input[type="hidden"]`))))
  if (!fits || !menuItems(menu).length) return false
  menu.setAttribute("role", "menu")
  menuItems(menu).forEach((item) => {
    item.setAttribute("role", "menuitem")
    item.tabIndex = -1
  })
  const heading = menu.querySelector(":scope > hgroup")
  if (!menu.hasAttribute("aria-label") && !menu.hasAttribute("aria-labelledby")) {
    if (heading) {
      heading.id ||= `${menu.id || `u-menu-${++anchors}`}-heading`
      menu.setAttribute("aria-labelledby", heading.id)
    } else if (invoker) {
      menu.setAttribute("aria-label", invoker.getAttribute("aria-label") || invoker.textContent.trim())
    }
  }
  // A menu holds only items and separators, so the heading names it instead of sitting in it.
  heading?.setAttribute("aria-hidden", "true")
  invoker?.setAttribute("aria-haspopup", "menu")
  return true
}

const anchoredPopovers = '.u-menu[popover], .u-popover[popover], u-combobox > [role="listbox"][popover]'
let lastInvoker = null

const invokerOf = (popover, event) => {
  if (event.source) return event.source
  if (!popover.id) return null
  const id = CSS.escape(popover.id)
  const invokers = [...document.querySelectorAll(`[popovertarget="${id}"], [commandfor="${id}"]`)]
  return invokers.find((each) => each === lastInvoker) ?? invokers[0] ?? null
}

const anchorOf = (popover, event) => {
  if (popover.matches('u-combobox > [role="listbox"]')) return popover.parentElement.querySelector(':scope > input[role="combobox"]')
  return popover.closest("u-input-colour") ?? invokerOf(popover, event)
}

// Below the anchor, above when there's more room there, kept inside the viewport.
const placePopover = (popover, anchor) => {
  const gap = 8
  const box = anchor.getBoundingClientRect()
  const { style } = popover
  style.setProperty("position", "fixed")
  style.setProperty("inset", "auto")
  style.setProperty("margin", "0")
  if (popover.matches('[role="listbox"]')) style.setProperty("width", `${box.width}px`)
  const { width, height } = popover.getBoundingClientRect()
  const viewWidth = document.documentElement.clientWidth
  const viewHeight = document.documentElement.clientHeight
  const below = viewHeight - box.bottom - gap
  const above = box.top - gap
  const top = below >= height || below >= above ? box.bottom + gap : box.top - gap - height
  const left = popover.matches(".u-split-btn + .u-menu") ? box.right - width : box.left
  style.setProperty("left", `${Math.max(gap, Math.min(left, viewWidth - width - gap))}px`)
  style.setProperty("top", `${Math.max(gap, Math.min(top, viewHeight - height - gap))}px`)
}

const unplacePopover = (popover) => ["position", "inset", "margin", "width", "left", "top"].forEach((name) => popover.style.removeProperty(name))

if (!document[pageReady]) {
  document[pageReady] = true
  const anchorFallback = !CSS.supports("position-area: bottom")
  const commandFallback = !("commandForElement" in HTMLButtonElement.prototype)
  const following = new WeakMap()

  document.addEventListener("click", (event) => {
    lastInvoker = event.target.closest?.("[popovertarget], [commandfor]") ?? lastInvoker
  }, true)

  // beforetoggle places it before the first paint, so it never shows in the middle of the screen. toggle corrects it once it has a size.
  if (anchorFallback) {
    document.addEventListener("beforetoggle", (event) => {
      const popover = event.target
      if (event.newState !== "open" || !popover.matches?.(anchoredPopovers)) return
      const anchor = anchorOf(popover, event)
      if (anchor) placePopover(popover, anchor)
    }, true)
  }

  document.addEventListener("beforetoggle", (event) => {
    const nav = event.target
    if (event.newState !== "open" || !nav.matches?.(".u-site-header > .u-container > nav")) return
    nav.style.setProperty("--u-site-header-bottom", `${nav.closest(".u-site-header").getBoundingClientRect().bottom}px`)
  }, true)

  document.addEventListener("toggle", (event) => {
    const popover = event.target
    if (!popover.matches?.(anchoredPopovers)) return
    const open = event.newState === "open"
    if (!open && popover.matches(".u-menu")) popover.querySelectorAll("details[open]").forEach((details) => { details.open = false })
    if (commandFallback && popover.id) {
      document.querySelectorAll(`button[commandfor="${CSS.escape(popover.id)}"][command="toggle-popover"]`).forEach((button) => button.setAttribute("aria-expanded", String(open)))
    }
    if (anchorFallback) {
      following.get(popover)?.abort()
      following.delete(popover)
      if (!open) unplacePopover(popover)
      const anchor = open && anchorOf(popover, event)
      if (anchor) {
        const follow = new AbortController()
        following.set(popover, follow)
        const place = () => placePopover(popover, anchor)
        place()
        addEventListener("resize", place, { signal: follow.signal })
        addEventListener("scroll", place, { signal: follow.signal, capture: true, passive: true })
      }
    }
    if (open && popover.matches(".u-menu") && asMenu(popover, invokerOf(popover, event))) firstMenuItem(popover)?.focus({ preventScroll: true })
  }, true)

  document.addEventListener("keydown", (event) => {
    const menu = event.target.closest?.('.u-menu[role="menu"]')
    if (!menu || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
    const items = menuItems(menu)
    const at = items.indexOf(event.target)
    if (at === -1) return
    event.preventDefault()
    const next = { Home: 0, End: items.length - 1, ArrowDown: (at + 1) % items.length, ArrowUp: (at - 1 + items.length) % items.length }[event.key]
    items[next].focus()
  })

  // A popover opener marked data-u-hover also opens on hover where a pointer can
  // hover. Leaving both for a moment closes it; a click pins it open.
  const canHover = matchMedia("(hover: hover)")
  let hoverClose = null
  const hoverTarget = (opener) => document.getElementById(opener?.getAttribute("popovertarget") ?? "")
  document.addEventListener("pointerover", (event) => {
    if (!canHover.matches || event.pointerType === "touch") return
    const opener = event.target.closest?.("[popovertarget][data-u-hover]")
    const popover = opener ? hoverTarget(opener) : event.target.closest?.("[popover][data-u-hover-open]")
    if (!popover) return
    clearTimeout(hoverClose)
    if (!opener || popover.matches(":popover-open")) return
    try { popover.showPopover({ source: opener }) } catch { popover.showPopover() }
    popover.dataset.uHoverOpen = ""
  })
  document.addEventListener("pointerout", (event) => {
    const from = event.target.closest?.("[popovertarget][data-u-hover]")
    const popover = from ? hoverTarget(from) : event.target.closest?.("[popover][data-u-hover-open]")
    if (!popover?.hasAttribute("data-u-hover-open")) return
    const to = event.relatedTarget
    const opener = document.querySelector(`[popovertarget="${popover.id}"][data-u-hover]`)
    if (to && (popover.contains(to) || opener?.contains(to))) return
    hoverClose = setTimeout(() => {
      if (!popover.hasAttribute("data-u-hover-open")) return
      popover.hidePopover()
      delete popover.dataset.uHoverOpen
    }, 100)
  })
  document.addEventListener("click", (event) => {
    const opener = event.target.closest?.("[popovertarget][data-u-hover]")
    const popover = hoverTarget(opener)
    if (!popover?.hasAttribute("data-u-hover-open")) return
    event.preventDefault()
    clearTimeout(hoverClose)
    delete popover.dataset.uHoverOpen
  })
  document.addEventListener("toggle", (event) => {
    if (event.newState === "closed") delete event.target.dataset?.uHoverOpen
  }, true)

  // Escape hides a tooltip without moving the pointer or focus (WCAG 1.4.13). It stays hidden until both leave it.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented) return
    const showing = ".u-tooltip:is(:hover, :has(:focus-visible))"
    const tips = [...document.querySelectorAll(`${showing}:not([data-dismissed])`)]
    if (!tips.length) return
    // The first Escape closes the tooltip, not the dialog it sits in.
    event.preventDefault()
    tips.forEach((tip) => {
      tip.toggleAttribute("data-dismissed", true)
      const left = new AbortController()
      const check = () => setTimeout(() => {
        if (tip.matches(showing)) return
        tip.removeAttribute("data-dismissed")
        left.abort()
      })
      tip.addEventListener("pointerleave", check, { signal: left.signal })
      tip.addEventListener("focusout", check, { signal: left.signal })
    })
  })

  // Tab leaves a menu, so it closes rather than staying open behind the next field.
  document.addEventListener("focusout", (event) => {
    const menu = event.target.closest?.('.u-menu[role="menu"]')
    if (menu?.matches(":popover-open") && event.relatedTarget && !menu.contains(event.relatedTarget)) menu.hidePopover()
  })

  const closeDialog = (dialog, value) => {
    if (dialog.requestClose) return dialog.requestClose(value)
    if (dialog.dispatchEvent(new Event("cancel", { cancelable: true }))) dialog.close(value)
  }

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    document.addEventListener("click", (event) => {
      const dialog = event.target
      if (!(dialog instanceof HTMLDialogElement) || !dialog.open || dialog.getAttribute("closedby") !== "any" || !dialog.matches(":modal")) return
      const box = dialog.getBoundingClientRect()
      const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom
      if (!inside) closeDialog(dialog)
    })
  }

  // Invoker commands for browsers without them. The press records whether the popover was open, because light dismiss closes it before the click.
  if (commandFallback) {
    let pressed = null
    document.addEventListener("pointerdown", (event) => {
      const button = event.target.closest?.("button[commandfor]")
      const target = button && document.getElementById(button.getAttribute("commandfor"))
      pressed = target ? { button, open: target.matches(":popover-open") } : null
    }, true)
    document.addEventListener("click", (event) => {
      const button = event.target.closest?.("button[commandfor][command]")
      const target = button && !button.disabled && document.getElementById(button.getAttribute("commandfor"))
      if (!target) return
      const command = button.getAttribute("command").toLowerCase()
      const wasOpen = pressed?.button === button ? pressed.open : target.matches(":popover-open")
      pressed = null
      if (target instanceof HTMLDialogElement) {
        if (command === "show-modal" && !target.open) target.showModal()
        if (command === "close" && target.open) target.close(button.value)
        if (command === "request-close" && target.open) {
          closeDialog(target, button.value)
        }
      }
      if (!target.hasAttribute("popover")) return
      const isOpen = target.matches(":popover-open")
      const show = command === "show-popover" || (command === "toggle-popover" && !wasOpen)
      const hide = command === "hide-popover" || (command === "toggle-popover" && wasOpen)
      if (show && !isOpen) target.showPopover({ source: button })
      if (hide && isOpen) target.hidePopover()
    })
  }

  // iPadOS 17 ignores popovertarget on a button inside a form, so once the browser has had its turn, the popover is set to what the press asked for.
  let pressedInForm = null
  document.addEventListener("pointerdown", (event) => {
    const button = event.target.closest?.("form button[popovertarget]")
    const target = button && document.getElementById(button.getAttribute("popovertarget"))
    pressedInForm = target ? { button, open: target.matches(":popover-open") } : null
  }, true)
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("form button[popovertarget]")
    const target = button && !button.disabled && document.getElementById(button.getAttribute("popovertarget"))
    if (!target?.hasAttribute("popover")) return
    const wasOpen = pressedInForm?.button === button ? pressedInForm.open : target.matches(":popover-open")
    pressedInForm = null
    const action = (button.getAttribute("popovertargetaction") || "toggle").toLowerCase()
    const show = action === "show" || (action === "toggle" && !wasOpen)
    const hide = action === "hide" || (action === "toggle" && wasOpen)
    setTimeout(() => {
      const isOpen = target.matches(":popover-open")
      if (show && !isOpen) target.showPopover({ source: button })
      if (hide && isOpen) target.hidePopover()
    })
  })
}

// Keyboard shortcuts: data-u-hotkey goes on the button, link, field or dialog that already does the action.
const isMac = /Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform || "")
const modifierKeys = ["Control", "Meta", "Alt"]
const keyLabels = {
  Control: "Ctrl", Meta: "⌘", Alt: isMac ? "⌥" : "Alt", Shift: isMac ? "⇧" : "Shift",
  Escape: "Esc", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→"
}

const hotkeysOf = (element) => element.dataset.uHotkey.split(",").map((hotkey) =>
  hotkey.split("+").map((part) => part.trim()).filter(Boolean).map((part) => part === "Mod" ? (isMac ? "Meta" : "Control") : part))

const keyLabel = (part) => keyLabels[part] ?? (part.length === 1 ? part.toUpperCase() : part)

const usesModifier = (parts) => parts.some((part) => modifierKeys.includes(part))

const hotkeyMatches = (parts, event) => {
  const key = parts.at(-1)
  const held = (name) => parts.slice(0, -1).includes(name)
  if (event.ctrlKey !== held("Control") || event.metaKey !== held("Meta") || event.altKey !== held("Alt")) return false
  if (/^[a-z]$/i.test(key)) return event.key.toLowerCase() === key.toLowerCase() && event.shiftKey === held("Shift")
  // A character like ? already needs Shift on most layouts, so Shift doesn't count against it.
  if (key.length === 1) return event.key === key
  return event.key === key && event.shiftKey === held("Shift")
}

const characterKeysOff = () => document.body?.dataset.uCharacterKeys === "off"

const hotkeyAvailable = (element) => !element.disabled && element.getAttribute("aria-disabled") !== "true"
  && !element.closest("[hidden], [inert], fieldset:disabled")

const typingIn = (target) => target.closest?.('textarea, select, [contenteditable]:not([contenteditable="false"]), input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"])')

const hotkeyTarget = (event) => {
  const typing = typingIn(event.target)
  const scope = document.querySelector("dialog:modal") || document
  const form = event.target.closest?.("form")
  const candidates = [...scope.querySelectorAll("[data-u-hotkey]")]
  if (scope !== document && scope.matches("[data-u-hotkey]")) candidates.push(scope)
  const matches = candidates.filter((element) => hotkeyAvailable(element)
    && hotkeysOf(element).some((parts) => hotkeyMatches(parts, event)
      && (usesModifier(parts) || (!typing && !characterKeysOff()))))
  return matches.find((element) => form && (form.contains(element) || element.form === form))
    || matches.find((element) => element.checkVisibility?.() ?? true)
    || matches[0]
}

const runHotkey = (element) => {
  if (element instanceof HTMLDialogElement) return element.open ? element.close() : element.showModal()
  if (element.hasAttribute("popover")) return element.togglePopover()
  if (typingIn(element)) {
    element.focus()
    element.select?.()
    return
  }
  element.click()
}

const kbdFor = (parts) => {
  const group = document.createElement("kbd")
  group.className = "u-kbd-group"
  group.dataset.uKeys = parts.join("+")
  group.append(...parts.map((part) => Object.assign(document.createElement("kbd"), { className: "u-kbd", textContent: keyLabel(part) })))
  return group
}

const markHotkeys = () => {
  document.querySelectorAll("[data-u-hotkey]:not([aria-keyshortcuts])").forEach((element) => {
    element.setAttribute("aria-keyshortcuts", hotkeysOf(element).map((parts) => parts.join("+")).join(" "))
  })
  if (!isMac) return
  document.querySelectorAll("kbd[data-u-keys*='Mod']").forEach((kbd) => {
    const keys = kbdFor(kbd.dataset.uKeys.split("+").map((part) => part === "Mod" ? "Meta" : part))
    if (kbd.hasAttribute("aria-hidden")) keys.setAttribute("aria-hidden", "true")
    kbd.replaceWith(keys)
  })
}

const hotkeysReady = Symbol.for("uniform.hotkeys")
if (!document[hotkeysReady]) {
  document[hotkeysReady] = true

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.repeat || event.isComposing) return
    if (event.key === "Escape" && document.querySelector(':popover-open:not([popover="manual"]), dialog:modal')) return
    const element = hotkeyTarget(event)
    if (!element) return
    event.preventDefault()
    element.dispatchEvent(new CustomEvent("hotkey:run", { bubbles: true, detail: { keys: element.dataset.uHotkey } }))
    runHotkey(element)
  })

  for (const name of ["DOMContentLoaded", "turbo:load", "turbo:render", "turbo:frame-load", "turbo:morph"]) {
    addEventListener(name, markHotkeys)
  }
  if (document.readyState !== "loading") markHotkeys()
}

// Lists the shortcuts the page has right now, each element's label next to its keys, whenever its dialog opens.
define("u-hotkey-list", class extends UniformElement {
  setup(signal) {
    const dialog = this.closest("dialog")
    if (!dialog) return
    const observer = new MutationObserver(() => { if (dialog.open) this.render(dialog) })
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] })
    signal.addEventListener("abort", () => observer.disconnect())
  }

  render(dialog) {
    const sections = [...this.querySelectorAll(":scope > section")]
    const groups = sections.length ? sections : [this]
    const fallback = groups.find((group) => !group.dataset.group) || groups[0]
    const rows = new Map(groups.map((group) => [group, []]))
    const seen = new Set()
    document.querySelectorAll("[data-u-hotkey]").forEach((element) => {
      if ((element !== dialog && dialog.contains(element)) || !hotkeyAvailable(element)) return
      const parts = hotkeysOf(element)[0]
      const keys = parts.join("+")
      if (seen.has(keys) || (!usesModifier(parts) && characterKeysOff())) return
      const label = this.labelOf(element)
      if (!label) return
      seen.add(keys)
      const term = Object.assign(document.createElement("dt"), { textContent: label })
      const keysCell = document.createElement("dd")
      keysCell.append(kbdFor(parts))
      const group = groups.find((candidate) => candidate.dataset.group
        && candidate.dataset.group === element.dataset.uHotkeyGroup) || fallback
      rows.get(group).push(term, keysCell)
    })
    let total = 0
    rows.forEach((groupRows, group) => {
      const list = group.querySelector("dl")
      if (!list) return
      list.replaceChildren(...groupRows)
      ;(group === this ? list : group).hidden = groupRows.length === 0
      total += groupRows.length
    })
    const empty = this.querySelector(":scope > p")
    if (empty) empty.hidden = total > 0
  }

  labelOf(element) {
    if (element.dataset.uHotkeyLabel) return element.dataset.uHotkeyLabel
    if (element.getAttribute("aria-label")) return element.getAttribute("aria-label")
    const labelledBy = element.getAttribute("aria-labelledby")
    if (labelledBy) return document.getElementById(labelledBy)?.textContent.trim()
    if (element.labels?.length) return element.labels[0].textContent.trim()
    const copy = element.cloneNode(true)
    copy.querySelectorAll("kbd, svg, [aria-hidden='true']").forEach((part) => part.remove())
    return copy.textContent.replace(/\s+/g, " ").trim()
  }
})

if (!document.querySelector("[data-u-audience]")) console.error("Uniform: set data-u-audience=\"business\" or data-u-audience=\"consumer\" on <html>.")
