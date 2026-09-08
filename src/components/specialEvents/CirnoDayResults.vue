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
</template>

<script setup lang="ts">
// Cirno Day (Sep 9) flourish shown on the results page below "Happy Cirno Day!".
// Wired up via the `resultsExtra` field on the event in `src/data/specialEvents.ts`.
const CIRNO_GIF_URL = 'https://media.tenor.com/h6r2C_HGamMAAAAi/cirno-touhou.gif';
const REPEAT = 3;
</script>

<style scoped>
/* Constrain by height only so the gif keeps its natural aspect ratio. */
.cirno-day-gif {
    height: 7.5rem;
    width: auto;
}
</style>
