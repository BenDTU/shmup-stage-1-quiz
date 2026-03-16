<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 text-center">
                <h1 class="display-4 fw-bold mb-3">
                    Shmup Stage 1 Quiz
                </h1>
                <p class="lead mb-5">
                    Think you know your shmups? How many can you pick from their stage 1 song? Test your knowledge with a random set of <strong class="fw-bold">20</strong> tracks.
                </p>
                <h2 class="h5 mb-3">
                    Choose your Difficulty
                </h2>
                <div class="d-flex flex-column align-items-center gap-3 mb-5">
                    <button
                        class="btn btn-success btn-lg w-100 py-3"
                        style="max-width: 400px"
                        @click="begin('novice')"
                    >
                        <div class="fw-bold fs-5">
                            Novice
                        </div>
                        <div class="small opacity-75">
                            Select from a list of 4 games
                        </div>
                    </button>
                    <button
                        class="btn btn-danger btn-lg w-100 py-3"
                        style="max-width: 400px"
                        @click="begin('advanced')"
                    >
                        <div class="fw-bold fs-5">
                            Advanced
                        </div>
                        <div class="small opacity-75">
                            Select from the whole list of games
                        </div>
                    </button>
                </div>
                <br>
                <hr class="mt-1 mb-5 text-warning-emphasis opacity-100">
                <h2 class="mb-2 text-warning-emphasis">
                    Daily Challenge
                </h2>

                <!-- Finished state -->
                <template v-if="dailyProgress?.status === 'finished'">
                    <p class="mb-3">
                        You've completed today's challenge!
                    </p>
                    <div class="mb-4">
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            style="width: auto"
                            @click="viewDailyResults"
                        >
                            <div class="fw-bold">
                                View Full Results
                            </div>
                        </button>
                    </div>
                </template>

                <!-- In-progress state -->
                <template v-else-if="dailyProgress?.status === 'in-progress'">
                    <p class="mb-4">
                        You have an unfinished daily challenge — pick up where you left off!
                    </p>
                    <div class="mb-4">
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            style="width: auto"
                            @click="resumeDaily"
                        >
                            <div class="fw-bold fs-5">
                                Resume Daily {{ dailyProgress.mode === 'novice' ? 'Novice' : 'Advanced' }}
                            </div>
                        </button>
                    </div>
                </template>

                <!-- Default: no progress -->
                <template v-else>
                    <p class="mb-4">
                        Once per day - challenge the same set of songs as everyone else!
                    </p>
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 mb-4">
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            @click="beginDaily('novice')"
                        >
                            <div class="fw-bold fs-5">
                                Daily Novice
                            </div>
                        </button>
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            @click="beginDaily('advanced')"
                        >
                            <div class="fw-bold fs-5">
                                Daily Advanced
                            </div>
                        </button>
                    </div>
                </template>

                <DailyCountdown class="mb-5" />
                <hr class="mb-5 text-warning-emphasis opacity-100">
                <p class="text-muted small mb-2">
                    There are currently <strong>{{ totalSongs }}</strong> songs from <strong>{{ totalShmups }}</strong> shmups loaded in!
                </p>
                <div>
                    <RouterLink to="/song-list">
                        View Full Song List
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuiz } from '@/composables/useQuiz';
import { getDailyProgress } from '@/composables/useDailyProgress';
import { totalSongs, totalShmups } from '@/data/games';
import type { QuizMode } from '@/types';
import DailyCountdown from '@/components/DailyCountdown.vue';

const router = useRouter();
const { startQuiz, startDailyQuiz, resumeDailyQuiz } = useQuiz();

const dailyProgress = ref(getDailyProgress());


function begin(mode: QuizMode) {
    startQuiz(mode);
    router.push('/quiz');
}

function beginDaily(mode: QuizMode) {
    startDailyQuiz(mode);
    router.push('/quiz');
}

function resumeDaily() {
    resumeDailyQuiz();
    router.push('/quiz');
}

function viewDailyResults() {
    resumeDailyQuiz();
    router.push('/results');
}
</script>

<style scoped>
.daily-btn {
    box-shadow: var(--daily-glow);
    transition: box-shadow 0.2s ease;
    width: 200px;
    color: var(--bs-warning-text-emphasis);
    border-color: var(--bs-warning-text-emphasis);
}

.daily-btn:hover {
    box-shadow: var(--daily-glow-intense);
    color: var(--bs-warning-text-emphasis);
    background-color: var(--bs-warning-bg-subtle);
    border-color: var(--bs-warning-text-emphasis);
}

hr {
    box-shadow: var(--daily-glow);
}


</style>
