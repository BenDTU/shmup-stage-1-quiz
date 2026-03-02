<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <nav class="navbar sticky-top border-bottom py-2">
    <div class="container">
      <button
        class="btn btn-sm ms-auto"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleDark"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
  </nav>
  <RouterView />
</template>
