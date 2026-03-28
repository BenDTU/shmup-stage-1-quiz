<template>
    <p class="mb-0">
        Time until next daily challenge:
        <a
            v-if="expired"
            class="text-warning-emphasis text-decoration-underline"
            href="/"
            @click.prevent="refresh"
        >Now!</a>
        <strong v-else>{{ timeUntilNextDaily }}</strong>
    </p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { SESSION_DATE } from '../storage/dailyProgressStorage';

function getMsUntilMidnightUTC(now: Date): number {
    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    return midnight.getTime() - now.getTime();
}

function formatCountdown(ms: number): string {
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    const s = Math.floor((ms % 60_000) / 1_000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const now = ref(new Date());
const expired = computed(() => now.value.toISOString().slice(0, 10) !== SESSION_DATE);
const timeUntilNextDaily = computed(() => formatCountdown(getMsUntilMidnightUTC(now.value)));

// Full page reload is intentional — it re-initialises SESSION_DATE and DATA_VERSION
// in dailyProgressStorage so the new day's quiz is picked up correctly.
function refresh() {
    window.location.href = '/';
}

let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
    timer = setInterval(() => {
        now.value = new Date();
        if (expired.value) {
            clearInterval(timer ?? undefined);
            timer = null;
        }
    }, 1000);
});
onUnmounted(() => { clearInterval(timer ?? undefined); });
</script>
