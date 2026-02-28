<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  endTime?: number
  hidden?: boolean
  loopEnabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'audioUnlocked'): void
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

// Whether the user has performed the one-time audio-unlock interaction.
// Component-level: persists while the quiz view is mounted; automatically
// resets when the user navigates away (component is destroyed).
const audioUnlocked = ref(false)

// Muted autoplay is permitted by every browser including Safari.
// enablejsapi=1 lets us send postMessage commands (unMute, loadVideoById)
// to the running player without ever changing the iframe's src again.
// origin= is required by the IFrame Player API so postMessage commands
// (seekTo, unMute, loadVideoById) are accepted when deployed.
const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  const origin =
    typeof window !== 'undefined'
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : ''
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&mute=1&enablejsapi=1&start=${start}&rel=0&modestbranding=1${origin}`
})

// Send a postMessage command to the YouTube player.
function sendCommand(func: string, args: unknown[] = []) {
  iframeRef.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    'https://www.youtube-nocookie.com',
  )
}

// Loop timer: when endTime is set, seek back to startTime when it is reached.
let loopTimer: ReturnType<typeof setTimeout> | null = null

function clearLoopTimer() {
  if (loopTimer !== null) {
    clearTimeout(loopTimer)
    loopTimer = null
  }
}

function scheduleLoop() {
  clearLoopTimer()
  if (!props.endTime || !audioUnlocked.value || props.loopEnabled === false) return
  const duration = (props.endTime - (props.startTime ?? 0)) * 1000
  if (duration <= 0) return
  loopTimer = setTimeout(() => {
    sendCommand('seekTo', [props.startTime ?? 0, true])
    scheduleLoop()
  }, duration)
}

// Perform the listener handshake required by the YouTube IFrame API.
// Without this, the player will not send onStateChange postMessages back.
function registerPlayerListener() {
  iframeRef.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'listening', id: 1 }),
    'https://www.youtube-nocookie.com',
  )
}

// Listen for the YouTube player's onStateChange event (state 0 = video ended).
// When no endTime is set, seek back to startTime to loop the video naturally.
function handleMessage(event: MessageEvent) {
  if (event.origin !== 'https://www.youtube-nocookie.com') return
  if (props.loopEnabled === false || props.endTime) return
  if (!audioUnlocked.value) return
  try {
    const data = JSON.parse(typeof event.data === 'string' ? event.data : JSON.stringify(event.data))
    if (data?.event === 'onStateChange' && data?.info === 0) {
      sendCommand('seekTo', [props.startTime ?? 0, true])
      sendCommand('playVideo')
    }
  } catch {
    // ignore non-JSON messages
  }
}

watch(() => props.loopEnabled, (enabled) => {
  if (enabled === false) {
    clearLoopTimer()
  }
})

onUnmounted(() => {
  clearLoopTimer()
  window.removeEventListener('message', handleMessage)
})

// Start the first video playing silently so the player is active
// by the time the user clicks Play.
onMounted(() => {
  window.addEventListener('message', handleMessage)
  if (iframeRef.value) {
    iframeRef.value.src = embedSrc.value
  }
})

// When the question changes:
// • If audio is already unlocked, use loadVideoById so the same player
//   instance (and its user-activation state) is reused — no src reload.
// • Otherwise reload the iframe for a fresh muted-autoplay start.
watch(() => props.videoId, () => {
  clearLoopTimer()
  if (audioUnlocked.value) {
    sendCommand('loadVideoById', [props.videoId, props.startTime ?? 0])
    scheduleLoop()
    registerPlayerListener()
  } else if (iframeRef.value) {
    iframeRef.value.src = embedSrc.value
  }
}, { flush: 'post' })

function startAudio() {
  // Seek back to the configured start time before unmuting, so the
  // listener always hears the track from the beginning regardless of
  // how long the silent pre-roll has been running.
  // Calling postMessage inside the click handler transfers user
  // activation into the iframe — the mechanism Safari requires to
  // permit audio on a muted embed.
  sendCommand('seekTo', [props.startTime ?? 0, true])
  sendCommand('unMute')
  audioUnlocked.value = true
  emit('audioUnlocked')
  scheduleLoop()
  registerPlayerListener()
}
</script>

<template>
  <div class="ratio ratio-16x9">
    <!-- One-time Start overlay — only shown before the user's first
         audio interaction. The iframe behind it is already playing the
         video muted (muted autoplay is permitted by every browser).
         Clicking Play sends an unMute command via postMessage inside the
         gesture, which transfers user activation into the iframe and
         allows Safari (and all other browsers) to enable audio. -->
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
    <!-- src is managed imperatively (onMounted + watcher + startAudio).
         No :key so the same element — and its user-activation state —
         persists for every question without a src reload. -->
    <iframe
      ref="iframeRef"
      src=""
      title="Stage 1 theme"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      @load="registerPlayerListener"
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
