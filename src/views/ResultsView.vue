<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <template v-if="total > 0">
                    <div class="text-center mb-5">
                        <h1
                            class="fw-bold"
                            :class="isDaily ? 'display-6 text-warning-emphasis mb-1' : 'display-5 mb-3'"
                        >
                            {{ isDaily ? 'Daily Challenge Complete!' : 'Quiz Complete!' }} <i class="bi bi-trophy-fill" />
                        </h1>
                        <p
                            v-if="isDaily"
                            class="text-warning-emphasis opacity-75 small mb-3"
                        >
                            {{ SESSION_DATE_FORMATTED }}
                        </p>
                        <p class="h5 text-muted mb-3">
                            <span
                                class="badge"
                                :class="state.mode === 'novice' ? 'bg-success' : 'bg-danger'"
                            >{{ state.mode === 'novice' ? 'Novice' : 'Advanced' }}</span>
                        </p>
                        <p
                            class="lead"
                            :class="isDaily ? 'text-warning-emphasis' : ''"
                        >
                            You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>.
                        </p>
                        <div
                            class="progress mb-3 mx-auto"
                            style="height: 20px; max-width: 360px"
                        >
                            <div
                                class="progress-bar"
                                :class="score / total >= 0.7 ? 'bg-success' : score / total >= 0.4 ? 'bg-warning text-dark' : 'bg-danger'"
                                role="progressbar"
                                :style="{ width: `${(score / total) * 100}%` }"
                            >
                                {{ Math.round((score / total) * 100) }}%
                            </div>
                        </div>
                        <p class="text-muted">
                            <span v-if="score === total">Perfect score! You're a true shmup fan. <i class="bi bi-award-fill" /></span>
                            <span v-else-if="score / total >= 0.7">Great job! You clearly know your shmups.</span>
                            <span v-else-if="score / total >= 0.4">Not bad! Keep practicing.</span>
                            <span v-else>Time to play more shmups! <i class="bi bi-emoji-smile" /></span>
                        </p>
                        <div
                            v-if="isDaily"
                            class="text-center mt-4"
                        >
                            <DailyCountdown />
                        </div>
                    </div>

                    <!-- Answer breakdown -->
                    <h5 class="mb-3">
                        All Answers
                    </h5>
                    <div
                        class="list-group mb-5"
                        :class="isDaily ? 'list-group-daily' : ''"
                    >
                        <div
                            v-for="(guessId, index) in state.answers"
                            :key="index"
                            class="list-group-item"
                        >
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                    <span class="fw-semibold me-2 text-nowrap">#{{ index + 1 }}</span>
                                    <span class="me-2 text-nowrap">
                                        <i
                                            :class="state.questions[index]?.id === guessId ? 'bi bi-check-circle-fill text-success' : 'bi bi-x-circle-fill text-danger'"
                                            role="img"
                                            :aria-label="state.questions[index]?.id === guessId ? 'Correct answer' : 'Incorrect answer'"
                                        />
                                    </span>
                                    <div>
                                        <div class="fw-semibold">
                                            {{ state.questions[index]?.name }}
                                        </div>
                                        <div class="text-muted small">
                                            {{ state.questions[index]?.songName }}<template v-if="state.questions[index]?.source">
                                                ({{ state.questions[index]?.source }} version)
                                            </template>
                                        </div>
                                        <div
                                            v-if="state.questions[index]?.id !== guessId"
                                            class="text-muted small"
                                        >
                                            You guessed: <em>{{ guessedGameName(guessId) }}</em>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    v-if="state.questions[index]?.videoId"
                                    :href="`https://www.youtube.com/watch?v=${encodeURIComponent(state.questions[index]!.videoId)}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="icon-link ms-3 small"
                                ><i class="bi bi-youtube lh-1" /> YouTube</a>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-4">
                        <RouterLink
                            to="/"
                            class="btn btn-outline-secondary icon-link"
                        >
                            <i class="lh-1 bi bi-arrow-left" />
                            Back to Home
                        </RouterLink>
                    </div>
                </template>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuiz } from '../composables/useQuiz';
import { SESSION_DATE_FORMATTED } from '../storage/dailyProgressStorage';
import { guessedGameName } from '../functions';
import DailyCountdown from '../components/DailyCountdown.vue';


const router = useRouter();
const { state, isDaily } = useQuiz();

onMounted(() => {
    if (!state.isStarted || state.answers.length === 0) {
        router.replace('/');
    }
});

const score = state.answers.filter((id, i) => state.questions[i]?.id === id).length;
const total = state.answers.length;

</script>

<style scoped>
.list-group-daily {
    --bs-list-group-border-color: var(--bs-warning-text-emphasis);
    box-shadow: var(--daily-glow);

    .list-group-item {
        border-color: var(--bs-warning-text-emphasis);
    }
}
</style>
