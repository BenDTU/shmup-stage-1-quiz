<template>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-2 mt-3">
        <img
            v-for="n in REPEAT"
            :key="n"
            :src="CIRNO_GIF_URL"
            alt="Cirno"
            class="cirno-day-gif"
            loading="lazy"
            decoding="async"
        >
    </div>
    <div class="d-flex justify-content-center mt-3">
        <div class="ratio ratio-16x9 cirno-day-video position-relative">
            <iframe
                ref="iframeRef"
                :src="CIRNO_VIDEO_EMBED_URL"
                title="Cirno Day video"
                allow="autoplay; encrypted-media"
                allowfullscreen
            />
            <button
                v-if="!unmuted"
                class="btn btn-sm btn-outline-light unmute-button"
                type="button"
                @click="unmute"
            >
                <i class="bi bi-volume-mute-fill" /> Tap for sound
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Cirno Day (Sep 9) flourish shown on the results page below "Happy Cirno Day!".
// Wired up via the `resultsExtra` field on the event in `src/data/specialEvents.ts`.
const CIRNO_GIF_URL = 'https://media.tenor.com/h6r2C_HGamMAAAAi/cirno-touhou.gif';
const REPEAT = 3;
const CIRNO_VIDEO_ID = '6mkZ6Wqb-xg';

// Browsers only permit autoplay when muted (see YouTubePlayer.vue for the
// same constraint elsewhere in this app). enablejsapi=1 lets the unMute
// button below send a postMessage command without reloading the iframe.
const CIRNO_VIDEO_EMBED_URL = `https://www.youtube.com/embed/${CIRNO_VIDEO_ID}?autoplay=1&mute=1&enablejsapi=1`;

const iframeRef = ref<HTMLIFrameElement | null>(null);
const unmuted = ref(false);

function unmute() {
    // Sent inside the click handler so the user gesture transfers into the
    // iframe, which browsers require before they'll allow audio to start.
    iframeRef.value?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
        'https://www.youtube.com',
    );
    unmuted.value = true;
}
</script>

<style scoped>
/* Constrain by height only so the gif keeps its natural aspect ratio. */
.cirno-day-gif {
    height: 7.5rem;
    width: auto;
}

.cirno-day-video {
    width: 100%;
    max-width: 32rem;
}

.unmute-button {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
}
</style>
