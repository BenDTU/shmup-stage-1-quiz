<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  hidden?: boolean
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

// Tracks whether the YouTube player has initialised and whether it is playing.
// Used to show a manual "click to play" fallback when autoplay is blocked
// (e.g. macOS Safari) – the first video will not autoplay without a direct
// user gesture, but clicking the placeholder IS a gesture Safari accepts.
const isReady = ref(false)
const isPlaying = ref(false)

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&start=${start}&rel=0&modestbranding=1&enablejsapi=1`
})

function sendPlayCommand() {
  iframeRef.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
    'https://www.youtube-nocookie.com',
  )
}

function handleYouTubeMessage(event: MessageEvent) {
  if (event.origin !== 'https://www.youtube-nocookie.com') return
  if (event.source !== iframeRef.value?.contentWindow) return

  let data: { event?: string; info?: unknown } = {}
  try {
    const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    if (typeof parsed !== 'object' || parsed === null) return
    data = parsed as { event?: string; info?: unknown }
  } catch {
    return
  }

  if (data.event === 'onReady') {
    isReady.value = true
    // Attempt automatic play – works on Chrome/Firefox; Safari ignores this
    // when there is no user gesture, but the placeholder click below handles that.
    sendPlayCommand()
  }

  if (data.event === 'onStateChange') {
    // YouTube player state: 1 = playing, anything else = not playing
    isPlaying.value = data.info === 1
  }
}

onMounted(() => {
  window.addEventListener('message', handleYouTubeMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleYouTubeMessage)
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
      <!-- Shown when the player is ready but autoplay was blocked (e.g. macOS Safari).
           Clicking this button IS a direct user gesture, which Safari accepts. -->
      <button
        v-if="isReady && !isPlaying"
        class="btn btn-outline-light btn-sm mt-3"
        type="button"
        @click="sendPlayCommand"
      >
        ▶ Click to play
      </button>
    </div>
  </div>

  <!-- Always keep the iframe in the DOM so audio keeps playing.
       When hidden, it is visually clipped to 1 px so it remains loaded. -->
  <div :class="hidden ? 'player-offscreen' : 'ratio ratio-16x9'" :aria-hidden="hidden ? 'true' : undefined">
    <iframe
      ref="iframeRef"
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
