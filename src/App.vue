<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
    <div class="navbar-end w-full">
      <button
        class="btn btn-ghost btn-sm"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleDark"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
  </div>
  <RouterView />
</template>
