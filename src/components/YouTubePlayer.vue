<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  hidden?: boolean
}>()

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&start=${start}&rel=0&modestbranding=1`
})
</script>

<template>
  <!-- Audio-only placeholder shown while the answer is hidden; wrapped in ratio-16x9 to
       match the size of the YouTube iframe that appears after the user submits. -->
  <div v-if="hidden" class="ratio ratio-16x9">
    <div class="audio-placeholder rounded-3 text-center">
      <div class="bars mb-3" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <p class="mb-0 fw-semibold fs-5">🎵 Now Playing…</p>
      <p class="mb-0 text-muted small">Listen carefully and enter your guess below!</p>
    </div>
  </div>

  <!-- Always keep the iframe in the DOM so audio keeps playing.
       When hidden, it is visually clipped to 1 px so it remains loaded. -->
  <div :class="hidden ? 'player-offscreen' : 'ratio ratio-16x9'" :aria-hidden="hidden ? 'true' : undefined">
    <iframe
      :key="videoId"
      :src="embedSrc"
      title="Stage 1 theme"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
/* Keeps the iframe loaded & audio playing without being visible.
   Uses the standard screen-reader-only visually-hidden pattern so the element
   occupies no layout space and is invisible without removing it from the DOM. */
.player-offscreen {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.audio-placeholder {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Animated sound bars */
.bars {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 48px;
}

.bars span {
  display: block;
  width: 8px;
  border-radius: 4px;
  background: #53d8fb;
  animation: bounce 1.2s ease-in-out infinite;
}

.bars span:nth-child(1) { height: 24px; animation-delay: 0s; }
.bars span:nth-child(2) { height: 40px; animation-delay: 0.15s; }
.bars span:nth-child(3) { height: 32px; animation-delay: 0.3s; }
.bars span:nth-child(4) { height: 48px; animation-delay: 0.1s; }
.bars span:nth-child(5) { height: 20px; animation-delay: 0.25s; }

@keyframes bounce {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1); }
}
</style>
