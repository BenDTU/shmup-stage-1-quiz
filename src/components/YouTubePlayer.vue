<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { quotes } from '../constants/quotes'

const props = defineProps<{
    videoId: string
    startTime?: number
    endTime?: number
    hidden?: boolean
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

// Stop timer: when endTime is set, pause the video when it is reached.
let stopTimer: ReturnType<typeof setTimeout> | null = null

function clearStopTimer() {
    if (stopTimer !== null) {
        clearTimeout(stopTimer)
        stopTimer = null
    }
}

function scheduleStop() {
    clearStopTimer()
    if (!props.endTime || !audioUnlocked.value) return
    const duration = (props.endTime - (props.startTime ?? 0)) * 1000
    if (duration <= 0) return
    stopTimer = setTimeout(() => {
        sendCommand('pauseVideo')
    }, duration)
}

onUnmounted(() => {
    clearStopTimer()
})

function pickRandomQuote(): string {
    return quotes[Math.floor(Math.random() * quotes.length)]!
}

const currentQuote = ref(pickRandomQuote())

// Start the first video playing silently so the player is active
// by the time the user clicks Play.
onMounted(() => {
    if (iframeRef.value) {
        iframeRef.value.src = embedSrc.value
    }
})

// When the question changes:
// • If audio is already unlocked, use loadVideoById so the same player
//   instance (and its user-activation state) is reused — no src reload.
// • Otherwise reload the iframe for a fresh muted-autoplay start.
watch(() => props.videoId, () => {
    clearStopTimer()
    currentQuote.value = pickRandomQuote()
    if (audioUnlocked.value) {
        sendCommand('loadVideoById', [props.videoId, props.startTime ?? 0])
        scheduleStop()
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
    scheduleStop()
}

const restartSpinning = ref(false)

function restartAudio() {
    sendCommand('seekTo', [props.startTime ?? 0, true])
    sendCommand('unMute');
    sendCommand('playVideo')
    scheduleStop()
    // Retrigger the spin animation: remove then re-add the class via a tick
    restartSpinning.value = false
    nextTick(() => { restartSpinning.value = true })
}

function onRestartAnimationEnd() {
    restartSpinning.value = false
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
        <div
            v-if="!audioUnlocked"
            class="audio-overlay audio-placeholder rounded-3 text-center"
        >
            <button
                class="btn btn-outline-light btn-lg"
                type="button"
                @click="startAudio"
            >
                Start!
            </button>
        </div>
        <!-- Spoiler overlay — shown while the answer is still hidden -->
        <div
            v-else-if="hidden"
            class="audio-overlay audio-placeholder rounded-3 text-center"
        >
            <div
                class="bars mb-3"
                aria-hidden="true"
            >
                <span /><span /><span /><span /><span />
            </div>
            <p class="mb-0 fw-semibold fs-5">
                <i class="bi bi-music-note-beamed" /> Now Playing…
            </p>
            <p class="mb-2 text-muted small">
                {{ currentQuote }}
            </p>
            <button
                class="btn btn-outline-light btn-sm"
                type="button"
                @click="restartAudio"
            >
                <i
                    class="bi bi-arrow-counterclockwise"
                    :class="{ 'spin-once': restartSpinning }"
                    @animationend="onRestartAnimationEnd"
                /> Restart
            </button>
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
        />
    </div>
</template>

<style scoped lang="scss">
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

  span {
    display: block;
    width: 8px;
    border-radius: 4px;
    background: #53d8fb;
    animation: bounce 1.2s ease-in-out infinite;

    &:nth-child(1) { height: 24px; animation-delay: 0s; }
    &:nth-child(2) { height: 40px; animation-delay: 0.15s; }
    &:nth-child(3) { height: 32px; animation-delay: 0.3s; }
    &:nth-child(4) { height: 48px; animation-delay: 0.1s; }
    &:nth-child(5) { height: 20px; animation-delay: 0.25s; }
  }
}

@keyframes bounce {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1); }
}

/* One-shot anticlockwise spin for the restart icon */
.spin-once {
  display: inline-block;
  animation: spin-ccw 0.5s ease-in-out;
}

@keyframes spin-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
</style>
