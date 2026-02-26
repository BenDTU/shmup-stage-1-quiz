<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
}>()

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&start=${start}&rel=0&modestbranding=1`
})
</script>

<template>
  <div class="ratio ratio-16x9">
    <iframe
      :key="videoId"
      :src="embedSrc"
      title="Stage 1 theme"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
