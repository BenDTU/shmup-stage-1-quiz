<template>
    <Analytics />
    <AppNavbar />
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Analytics } from '@vercel/analytics/vue';
import AppNavbar from './components/AppNavbar.vue';
import { todaysSpecialEvent } from './data/specialEvents';

if (todaysSpecialEvent?.themeColor) {
    document.documentElement.classList.add(`special-event-${todaysSpecialEvent.themeColor}`);
}
</script>
