import "$styles/index.css"
import "$styles/syntax-highlighting.css"

import { uploads } from "../../uniform/assets/uniform/uniform.js"

// Docs examples upload nowhere: progress runs on a timer and each file gets a made-up id.
uploads.upload = (file, { progress, signal }) => new Promise((resolve, reject) => {
  let sent = 0
  const timer = setInterval(() => {
    sent = Math.min(1, sent + 0.1)
    progress(sent)
    if (sent < 1) return
    clearInterval(timer)
    resolve(`demo-${file.name}`)
  }, 120)
  signal.addEventListener("abort", () => { clearInterval(timer); reject(new Error("Cancelled")) }, { once: true })
})

import components from "$components/**/*.{js,jsx,js.rb,css}"

const root = document.documentElement

const settings = {
  "site-audience": {
    key: "uniform-audience",
    fallback: "business",
    read: () => root.dataset.uAudience,
    write: (value) => { root.dataset.uAudience = value },
  },
}

const showSetting = (name, value) => {
  document.querySelectorAll(`input[name='${name}']`).forEach((input) => { input.checked = input.value === value })
}

Object.entries(settings).forEach(([name, setting]) => showSetting(name, setting.read()))

document.addEventListener("change", (event) => {
  const setting = settings[event.target.name]
  if (!setting) return
  const value = event.target.value
  setting.write(value)
  showSetting(event.target.name, value)
  try {
    if (value === setting.fallback) localStorage.removeItem(setting.key)
    else localStorage.setItem(setting.key, value)
  } catch (error) {}
})

// The sidebar itself doesn't scroll; its .u-nav does.
const siteNav = document.querySelector("#site-nav > .u-nav")
if (siteNav) {
  let saved = null
  try { saved = sessionStorage.getItem("uniform-nav-scroll") } catch {}
  if (saved !== null) {
    siteNav.scrollTop = Number(saved)
  } else {
    const current = siteNav.querySelector("[aria-current='page']")
    if (current) siteNav.scrollTop += current.getBoundingClientRect().top - siteNav.getBoundingClientRect().top - siteNav.clientHeight / 2
  }
  addEventListener("pagehide", () => {
    try { sessionStorage.setItem("uniform-nav-scroll", siteNav.scrollTop) } catch {}
  })
}
