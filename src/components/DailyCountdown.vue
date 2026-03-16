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
import { ref, onMounted, onUnmounted } from 'vue';

function getMsUntilMidnightUTC(): number {
    const now = new Date();
    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    return midnight.getTime() - now.getTime();
}

function formatCountdown(ms: number): string {
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    const s = Math.floor((ms % 60_000) / 1_000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const expired = ref(false);
const timeUntilNextDaily = ref(formatCountdown(getMsUntilMidnightUTC()));

function refresh() {
    window.location.href = '/';
}

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
    timer = setInterval(() => {
        const ms = getMsUntilMidnightUTC();
        if (ms <= 0) {
            expired.value = true;
            clearInterval(timer);
        } else {
            timeUntilNextDaily.value = formatCountdown(ms);
        }
    }, 1000);
});
onUnmounted(() => { clearInterval(timer); });
</script>
