<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  videoId: string
  startTime?: number
  hidden?: boolean
}>()

const iframeRef = ref<HTMLIFrameElement | null>(null)

const embedSrc = computed(() => {
  const start = props.startTime ?? 0
  // mute=1 guarantees autoplay on every browser — muted autoplay is universally
  // permitted (Chrome, Firefox, Safari, iOS Safari).  enablejsapi=1 lets the
  // YouTube player send us an onReady postMessage so we can unmute immediately.
  return `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&mute=1&start=${start}&rel=0&modestbranding=1&enablejsapi=1`
})

function handleMessage(event: MessageEvent) {
  if (event.origin !== 'https://www.youtube-nocookie.com') return
  if (event.source !== iframeRef.value?.contentWindow) return
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    if (data.event === 'onReady') {
      // The video is now playing (muted). Unmute it so the user can hear it.
      const win = iframeRef.value?.contentWindow
      if (win) {
        win.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), 'https://www.youtube-nocookie.com')
        win.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), 'https://www.youtube-nocookie.com')
      }
    }
  } catch {
    // ignore malformed messages
  }
}

onMounted(() => window.addEventListener('message', handleMessage))
onUnmounted(() => window.removeEventListener('message', handleMessage))
</script>

<template>
  <!-- The iframe is always rendered at full 16:9 size so that browsers honour
       autoplay (browsers block autoplay on invisible/zero-size iframes).
       When the answer is hidden, an overlay sits on top to prevent spoilers
       while the audio keeps playing underneath. -->
  <div class="ratio ratio-16x9">
    <div v-if="hidden" class="audio-overlay audio-placeholder rounded-3 text-center">
      <div class="bars mb-3" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <p class="mb-0 fw-semibold fs-5">🎵 Now Playing…</p>
      <p class="mb-0 text-muted small">Listen carefully and enter your guess below!</p>
    </div>
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
