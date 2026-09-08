<template>
    <Analytics />
    <AppNavbar />
    <RouterView />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import { Analytics } from '@vercel/analytics/vue';
import AppNavbar from './components/AppNavbar.vue';
import { useActiveEvent } from './composables/useActiveEvent';

const { activeThemeEvent } = useActiveEvent();

// Reactive so toggling an event replay on/off (see HomeView) re-themes the whole app
// immediately, without a page reload.
let appliedThemeClass: string | null = null;
watchEffect(() => {
    if (appliedThemeClass) document.documentElement.classList.remove(appliedThemeClass);
    appliedThemeClass = activeThemeEvent.value?.themeColor ? `special-event-${activeThemeEvent.value.themeColor}` : null;
    if (appliedThemeClass) document.documentElement.classList.add(appliedThemeClass);
});
</script>
