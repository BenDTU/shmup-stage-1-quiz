import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'shmup-quiz-dark-mode'

function getInitialDark(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialDark())

watchEffect(() => {
  document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light')
})

export function useDarkMode() {
  function toggleDark() {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, String(isDark.value))
  }

  return { isDark, toggleDark }
}
