import "$styles/index.css"
import "$styles/syntax-highlighting.css"

import "../../uniform/assets/uniform/uniform.js"

import components from "$components/**/*.{js,jsx,js.rb,css}"

const root = document.documentElement

const settings = {
  "site-theme": {
    key: "uniform-theme",
    fallback: "system",
    read: () => root.dataset.uTheme || "system",
    write: (value) => { if (value === "system") delete root.dataset.uTheme; else root.dataset.uTheme = value },
  },
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

const siteNav = document.getElementById("site-nav")
if (siteNav) {
  let saved = null
  try { saved = sessionStorage.getItem("uniform-nav-scroll") } catch {}
  if (saved !== null) {
    siteNav.scrollTop = Number(saved)
  } else {
    const current = siteNav.querySelector("[aria-current='page']")
    if (current) siteNav.scrollTop = current.offsetTop - siteNav.clientHeight / 2
  }
  addEventListener("pagehide", () => {
    try { sessionStorage.setItem("uniform-nav-scroll", siteNav.scrollTop) } catch {}
  })
}
