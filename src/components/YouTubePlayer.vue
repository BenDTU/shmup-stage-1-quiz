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
  <!-- Audio-only placeholder shown while the answer is hidden -->
  <div v-if="hidden" class="audio-placeholder d-flex flex-column align-items-center justify-content-center rounded-3 p-4 text-center">
    <div class="bars mb-3" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <p class="mb-0 fw-semibold fs-5">🎵 Now Playing…</p>
    <p class="mb-0 text-muted small">Listen carefully and enter your guess below!</p>
  </div>

  <!-- Always keep the iframe in the DOM so audio keeps playing.
       When hidden, it is positioned off-screen and clipped to 1 px. -->
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
/* Keeps the iframe loaded & audio playing without being visible */
.player-offscreen {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.audio-placeholder {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #e0e0e0;
  min-height: 200px;
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
