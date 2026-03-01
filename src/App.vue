<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <button
    class="btn btn-sm dark-mode-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark"
  >
    {{ isDark ? '☀️' : '🌙' }}
  </button>
  <RouterView />
</template>

<style scoped>
.dark-mode-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1050;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

@media (max-width: 575.98px) {
  .dark-mode-toggle {
    top: auto;
    bottom: 1rem;
  }
}
</style>
