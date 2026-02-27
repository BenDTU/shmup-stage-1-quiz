<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  hidden?: boolean
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

// Whether the user has clicked Play for the current question.
// Starts false so the iframe src is never set automatically —
// that is the only reliable way to satisfy Safari's autoplay policy,
// which requires the media navigation to be initiated synchronously
// within a user-gesture call stack.
const hasStarted = ref(false)

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&start=${start}&rel=0&modestbranding=1`
})

// Each new question resets the player so the user must click Play again.
watch(() => props.videoId, () => {
  hasStarted.value = false
})

function startPlayback() {
  // Setting src DIRECTLY on the DOM element, synchronously inside the click
  // handler, is the only approach that works on Safari. Using a reactive
  // binding (:src="...") goes through Vue's microtask queue and falls outside
  // Safari's user-gesture window, causing autoplay to be blocked.
  if (iframeRef.value) {
    iframeRef.value.src = embedSrc.value
    hasStarted.value = true
  }
}
</script>

<template>
  <div class="ratio ratio-16x9">
    <!-- Overlay: shown while the user hasn't pressed Play yet, or while
         the answer is still hidden (to prevent spoilers). -->
    <div v-if="!hasStarted || hidden" class="audio-overlay audio-placeholder rounded-3 text-center">
      <template v-if="hasStarted">
        <div class="bars mb-3" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p class="mb-0 fw-semibold fs-5">🎵 Now Playing…</p>
        <p class="mb-0 text-muted small">Listen carefully and enter your guess below!</p>
      </template>
      <button
        v-else
        class="btn btn-outline-light btn-lg"
        type="button"
        @click="startPlayback"
      >
        ▶ Play
      </button>
    </div>
    <!-- src starts empty; startPlayback() sets it directly inside the click
         handler so browsers honour autoplay=1. The key forces a fresh iframe
         (and therefore a fresh src="") for every new question. -->
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
