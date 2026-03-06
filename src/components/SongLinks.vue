<script setup lang="ts">
defineProps<{
    links: { label: string; url: string }[]
}>()
</script>

<template>
    <div class="d-flex flex-column gap-1">
        <a
            v-for="link in links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="icon-link me-2 small"
        ><i class="bi bi-youtube lh-1" /> {{ link.label }}</a>
    </div>
</template>
