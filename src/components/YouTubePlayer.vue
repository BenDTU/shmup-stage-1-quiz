<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  hidden?: boolean
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

// Whether the user has performed the one-time audio-unlock interaction.
// Component-level: persists while the quiz view is mounted; automatically
// resets when the user navigates away (component is destroyed).
const audioUnlocked = ref(false)

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&start=${start}&rel=0&modestbranding=1`
})

// After the session is unlocked, load each new question's video automatically.
// flush:'post' ensures iframeRef.value already points to the newly-mounted
// iframe (the :key on the iframe causes it to be recreated per question).
watch(() => props.videoId, () => {
  if (audioUnlocked.value && iframeRef.value) {
    iframeRef.value.src = embedSrc.value
  }
}, { flush: 'post' })

function startAudio() {
  // Set the iframe src synchronously inside the click handler.
  // This is the one required user gesture that unlocks audio autoplay
  // for the rest of the session.
  // embedSrc always reflects the current videoId, so this is safe even
  // if the question somehow changed before the user pressed Play.
  if (iframeRef.value) {
    iframeRef.value.src = embedSrc.value
  }
  audioUnlocked.value = true
}
</script>

<template>
  <div class="ratio ratio-16x9">
    <!-- One-time Start overlay — only shown before the user's first
         audio interaction. Clicking it initiates playback synchronously
         inside the gesture, which is required for audio autoplay. -->
    <div v-if="!audioUnlocked" class="audio-overlay audio-placeholder rounded-3 text-center">
      <button
        class="btn btn-outline-light btn-lg"
        type="button"
        @click="startAudio"
      >
        ▶ Play
      </button>
    </div>
    <!-- Spoiler overlay — shown while the answer is still hidden -->
    <div v-else-if="hidden" class="audio-overlay audio-placeholder rounded-3 text-center">
      <div class="bars mb-3" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <p class="mb-0 fw-semibold fs-5">🎵 Now Playing…</p>
      <p class="mb-0 text-muted small">Listen carefully and enter your guess below!</p>
    </div>
    <!-- The iframe src is managed entirely by JS (startAudio / the watcher)
         so Vue never re-renders it and causes an unwanted reload.
         The :key forces a fresh iframe element for every new question. -->
    <iframe
      ref="iframeRef"
      :key="videoId"
      src=""
      title="Stage 1 theme"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
/* The overlay sits on top of the iframe, covering the video while
   keeping the iframe fully active so autoplay=1 is honoured. */
.audio-overlay {
  z-index: 1;
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
