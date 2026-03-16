<template>
    <p class="mb-0">
        Time until next daily challenge: <strong>{{ timeUntilNextDaily }}</strong>
    </p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

function getTimeUntilMidnightUTC(): string {
    const now = new Date();
    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diff = midnight.getTime() - now.getTime();
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const timeUntilNextDaily = ref(getTimeUntilMidnightUTC());
let timer: ReturnType<typeof setInterval>;
onMounted(() => { timer = setInterval(() => { timeUntilNextDaily.value = getTimeUntilMidnightUTC(); }, 1000); });
onUnmounted(() => { clearInterval(timer); });
</script>
