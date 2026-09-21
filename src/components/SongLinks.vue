<template>
    <div class="d-flex flex-column gap-1">
        <template
            v-for="link in links"
            :key="link.label"
        >
            <a
                v-if="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-link me-2 small"
            ><i class="bi bi-youtube lh-1" /> {{ link.label }}</a>
            <span
                v-else
                class="icon-link text-secondary small"
            ><i class="bi bi-youtube lh-1" /> {{ link.label }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SongEntry } from '@/data/games';

const props = defineProps<{ entry: SongEntry }>();

function youtubeUrl(videoId: string, startTime?: number): string {
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}${startTime ? `&t=${startTime}` : ''}`;
}

const links = computed(() => {
    if ('arrangements' in props.entry) {
        return props.entry.arrangements.map((a) => ({
            label: a.source,
            url: a.videoId ? youtubeUrl(a.videoId, a.startTime) : undefined,
        }));
    }
    return [
        {
            label: 'YouTube',
            url: props.entry.videoId ? youtubeUrl(props.entry.videoId, props.entry.startTime) : undefined,
        },
    ];
});
</script>
