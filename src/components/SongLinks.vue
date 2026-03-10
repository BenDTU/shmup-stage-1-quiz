<script setup lang="ts">
import { computed } from 'vue'
import type { SongEntry } from '@/data/games'

const props = defineProps<{ entry: SongEntry }>()

function youtubeUrl(videoId: string, startTime?: number): string {
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}${startTime ? `&t=${startTime}` : ''}`
}

const links = computed(() => {
    if ('arrangements' in props.entry) {
        return props.entry.arrangements.map((a) => ({
            label: a.source,
            url: youtubeUrl(a.videoId, a.startTime),
        }))
    }
    return [
        {
            label: 'YouTube',
            url: youtubeUrl(props.entry.videoId, props.entry.startTime),
        },
    ]
})
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
