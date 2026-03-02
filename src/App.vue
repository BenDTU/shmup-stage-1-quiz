<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <nav class="navbar sticky-top border-bottom px-3 py-2">
    <button
      class="btn btn-sm"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleDark"
    >
      {{ isDark ? '☀️' : '🌙' }}
    </button>
  </nav>
  <RouterView />
</template>
