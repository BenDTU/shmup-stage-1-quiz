<template>
    <AppNavbar />
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
</script>
