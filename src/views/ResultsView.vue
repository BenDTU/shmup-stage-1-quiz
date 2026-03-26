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

                        <!-- Shareable results grid -->
                        <div class="results-grid my-3">
                            <div
                                v-for="(guessId, index) in state.answers"
                                :key="index"
                                class="result-square"
                                :class="state.questions[index]?.id === guessId ? 'result-square--correct' : 'result-square--wrong'"
                                :title="`#${index + 1}: ${state.questions[index]?.name}`"
                            />
                        </div>
                        <button
                            class="btn btn-sm btn-outline-secondary"
                            @click="copyResults"
                        >
                            <i
                                class="bi"
                                :class="copied ? 'bi-check2' : 'bi-share'"
                            />
                            {{ copied ? 'Copied!' : 'Share' }}
                        </button>
                        <div
                            v-if="isDaily"
                            class="text-center mt-4"
                        >
                            <DailyCountdown />
                        </div>
                        <div
                            v-if="masteredSeries.length > 0"
                            class="mt-5"
                        >
                            <p
                                v-for="series in masteredSeries"
                                :key="series"
                                class="mb-1"
                                :class="isDaily ? 'text-warning-emphasis' : ''"
                            >
                                {{ series }} master! <i class="bi bi-trophy-fill" />
                            </p>
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
import { onMounted, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuiz } from '../composables/useQuiz';
import { SESSION_DATE_FORMATTED } from '../storage/dailyProgressStorage';
import { guessedGameName } from '../functions';
import DailyCountdown from '../components/DailyCountdown.vue';
import { SERIES_LIMIT } from '../composables/useQuiz';


const router = useRouter();
const route = useRoute();
const { state, isDaily, startQuiz, startDailyQuiz, fillDebugAnswers } = useQuiz();

onMounted(() => {
    if (!import.meta.env.PROD) {
        const params = route.query;
        const scoreParam = 'fill-score' in params ? parseInt(params['fill-score'] as string, 10) : undefined;
        const targetScore = scoreParam !== undefined && !isNaN(scoreParam) ? scoreParam : undefined;

        if ('fill-basic' in params) {
            startQuiz('novice');
            fillDebugAnswers(targetScore);
            return;
        }
        if ('fill-advanced' in params) {
            startQuiz('advanced');
            fillDebugAnswers(targetScore);
            return;
        }
        if ('fill-daily-basic' in params) {
            startDailyQuiz('novice');
            fillDebugAnswers(targetScore);
            return;
        }
        if ('fill-daily-advanced' in params) {
            startDailyQuiz('advanced');
            fillDebugAnswers(targetScore);
            return;
        }
    }

    if (!state.isStarted || state.answers.length === 0) {
        router.replace('/');
    }
});

const score = computed(() => state.answers.filter((id, i) => state.questions[i]?.id === id).length);
const total = computed(() => state.answers.length);

const copied = ref(false);

function copyResults() {
    const mode = state.mode === 'novice' ? 'Novice' : 'Advanced';
    const prefix = isDaily.value
        ? `Shmup Stage 1 Quiz Daily (${SESSION_DATE_FORMATTED}) – ${mode}`
        : `Shmup Stage 1 Quiz – ${mode}`;
    const squares = state.answers
        .map((guessId, i) => (state.questions[i]?.id === guessId ? '🟩' : '🟥'))
        .join('');
    const text = `${prefix}\n${score.value}/${total.value} ${squares}\n${window.location.origin}`;
    navigator.clipboard.writeText(text).then(() => {
        copied.value = true;
        setTimeout(() => { copied.value = false; }, 2000);
    });
}

const masteredSeries = computed(() => {
    const seriesCorrectCounts = new Map<string, number>();
    for (let i = 0; i < state.questions.length; i++) {
        const series = state.questions[i]?.series;
        if (series && state.answers[i] === state.questions[i]?.id) {
            seriesCorrectCounts.set(series, (seriesCorrectCounts.get(series) ?? 0) + 1);
        }
    }
    return [...seriesCorrectCounts.entries()]
        .filter(([, correct]) => correct === SERIES_LIMIT)
        .map(([series]) => series);
});

</script>

<style scoped lang="scss">
.results-grid {
    display: grid;
    grid-template-rows: repeat(2, 28px);
    grid-auto-flow: column;
    justify-content: center;
    gap: 4px;

    @media (min-width: 576px) {
        display: flex;
        flex-wrap: nowrap;
    }
}

.result-square {
    width: 28px;
    height: 28px;
    border-radius: 3px;
}

.result-square--correct {
    background-color: var(--bs-success);
}

.result-square--wrong {
    background-color: var(--bs-danger);
}

.list-group-daily {
    --bs-list-group-border-color: var(--bs-warning-text-emphasis);
    box-shadow: var(--daily-glow);

    .list-group-item {
        border-color: var(--bs-warning-text-emphasis);
    }
}
</style>
