<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 text-center">
                <h1 class="display-4 fw-bold mb-3">
                    Shmup Stage 1 Quiz
                </h1>
                <p class="lead mb-5">
                    Think you know your shmups? How many can you pick from their stage 1 song? Test your knowledge with a random set of <strong class="fw-bold">{{ QUIZ_SIZE }}</strong> tracks.
                </p>
                <h2 class="h5 mb-3">
                    Choose your Difficulty
                </h2>
                <div class="d-flex flex-column align-items-center gap-3 mb-5">
                    <button
                        v-for="{ mode, subtitle } in DIFFICULTY_MODES"
                        :key="mode"
                        :class="`btn btn-${MODE_COLOR[mode]} btn-lg w-100 py-3`"
                        style="max-width: 350px"
                        @click="begin(mode)"
                    >
                        <div class="fw-bold fs-5">
                            {{ MODE_LABEL[mode] }}
                        </div>
                        <div class="small opacity-75">
                            {{ subtitle }}
                        </div>
                    </button>
                </div>
                <br>
                <p
                    v-if="activeEventSelection"
                    class="mb-3"
                >
                    <a
                        href="#"
                        :class="`text-${activeEvent?.themeColor ?? 'warning'}-emphasis text-decoration-underline fw-semibold`"
                        @click.prevent="backToDaily"
                    >← Back to Daily</a>
                </p>
                <p
                    v-else-if="missedEventWindow"
                    class="mb-3"
                >
                    <a
                        href="#"
                        :class="`text-${missedEventWindow.event.themeColor ?? 'warning'}-emphasis text-decoration-underline fw-semibold`"
                        @click.prevent="activateMissedEvent"
                    >I missed {{ missedEventWindow.event.name }}!</a>
                </p>
                <p
                    v-else-if="upcomingEventCountdown"
                    :class="`text-${upcomingEventCountdown.themeColor ?? 'warning'}-emphasis fw-semibold mb-3`"
                >
                    {{ upcomingEventCountdown.daysUntil }} day{{ upcomingEventCountdown.daysUntil === 1 ? '' : 's' }} until {{ upcomingEventCountdown.name }}!
                </p>
                <hr class="mt-1 mb-5 text-warning-emphasis opacity-100">
                <h2 class="mb-2 text-warning-emphasis">
                    {{ challengeHeading }}
                </h2>

                <!-- Finished state -->
                <template v-if="challengeProgress && challengeProgress.answers.length === QUIZ_SIZE">
                    <p class="mb-3">
                        {{ completedMessage }}
                    </p>
                    <div class="mb-4">
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            style="width: auto"
                            @click="viewChallengeResults"
                        >
                            <div class="fw-bold">
                                View Full Results
                            </div>
                        </button>
                    </div>
                </template>

                <!-- In-progress state -->
                <template v-else-if="challengeProgress">
                    <p class="mb-4">
                        {{ inProgressMessage }}
                    </p>
                    <div class="mb-4">
                        <button
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            style="width: auto"
                            @click="resumeChallenge"
                        >
                            <div class="fw-bold fs-5">
                                Resume {{ challengeLabel }} {{ MODE_LABEL[challengeProgress.mode] }}
                            </div>
                        </button>
                    </div>
                </template>

                <!-- Default: no progress -->
                <template v-else>
                    <p
                        v-if="progressInvalidated && !activeEventSelection"
                        class="text-warning-emphasis small mb-3"
                    >
                        Today's daily challenge has been updated — your previous progress has been cleared.
                    </p>
                    <p class="mb-4">
                        {{ defaultMessage }}
                    </p>
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 mb-4">
                        <button
                            v-for="{ mode } in DIFFICULTY_MODES"
                            :key="mode"
                            class="btn btn-outline-warning btn-lg py-3 daily-btn"
                            @click="beginChallenge(mode)"
                        >
                            <div class="fw-bold fs-5">
                                {{ challengeLabel }} {{ MODE_LABEL[mode] }}
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuiz, QUIZ_SIZE, NOVICE_OPTION_COUNT, INTERMEDIATE_OPTION_COUNT } from '@/composables/useQuiz';
import { MODE_LABEL, MODE_COLOR } from '@/utils/modeStyle';
import { getDailyProgress, wasProgressInvalidated, STORAGE_KEY } from '@/storage/dailyProgressStorage';
import {
    getActiveEventSelection,
    getEventProgress,
    ACTIVE_EVENT_KEY,
    EVENT_PROGRESS_KEY,
} from '@/storage/eventProgressStorage';
import { useActiveEvent } from '@/composables/useActiveEvent';
import { totalSongs, totalShmups } from '@/data/games';
import { upcomingEventCountdown, missedEventWindow } from '@/data/specialEvents';
import type { QuizMode } from '@/types';
import DailyCountdown from '@/components/DailyCountdown.vue';

const DIFFICULTY_MODES: { mode: QuizMode; subtitle: string }[] = [
    { mode: 'novice', subtitle: `Select from a list of ${NOVICE_OPTION_COUNT} games` },
    { mode: 'intermediate', subtitle: `Select from a list of ${INTERMEDIATE_OPTION_COUNT} games` },
    { mode: 'advanced', subtitle: 'Select from the whole list of games' },
];

const router = useRouter();
const { startQuiz, startDailyQuiz, startEventReplay, resumeDailyQuiz, resumeEventReplay } = useQuiz();
const { activeEventSelection, activeThemeEvent: activeEvent, setActiveEvent, clearActiveEvent } = useActiveEvent();

const dailyProgress = ref(getDailyProgress());
const eventProgress = ref(activeEventSelection.value ? getEventProgress(activeEventSelection.value) : null);
const progressInvalidated = wasProgressInvalidated();

const challengeProgress = computed(() => (activeEventSelection.value ? eventProgress.value : dailyProgress.value));
const challengeLabel = computed(() => activeEvent.value?.name ?? 'Daily');
const challengeHeading = computed(() => `${challengeLabel.value} Challenge`);

const completedMessage = computed(() => (
    activeEvent.value ? `You've completed the ${activeEvent.value.name} challenge!` : "You've completed today's challenge!"
));
const inProgressMessage = computed(() => (
    activeEvent.value
        ? `You have an unfinished ${activeEvent.value.name} challenge — pick up where you left off!`
        : 'You have an unfinished daily challenge — pick up where you left off!'
));
const defaultMessage = computed(() => (
    activeEventSelection.value
        ? `Replaying the ${activeEvent.value?.name} challenge — a one-time chance to catch up!`
        : 'Once per day - challenge the same set of songs as everyone else!'
));

function handleStorageChange(e: StorageEvent) {
    if (e.key === null || e.key === STORAGE_KEY) {
        dailyProgress.value = getDailyProgress();
    }
    if (e.key === null || e.key === ACTIVE_EVENT_KEY) {
        activeEventSelection.value = getActiveEventSelection();
    }
    if (e.key === null || e.key === EVENT_PROGRESS_KEY) {
        eventProgress.value = activeEventSelection.value ? getEventProgress(activeEventSelection.value) : null;
    }
}

onMounted(() => {
    dailyProgress.value = getDailyProgress();
    activeEventSelection.value = getActiveEventSelection();
    eventProgress.value = activeEventSelection.value ? getEventProgress(activeEventSelection.value) : null;
    window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
});

function begin(mode: QuizMode) {
    startQuiz(mode);
    router.push('/quiz');
}

function activateMissedEvent() {
    if (!missedEventWindow) return;
    const selection = { eventId: missedEventWindow.event.id, occurrenceDate: missedEventWindow.occurrenceDate };
    setActiveEvent(selection);
    eventProgress.value = getEventProgress(selection);
}

function backToDaily() {
    clearActiveEvent();
    dailyProgress.value = getDailyProgress();
}

function beginChallenge(mode: QuizMode) {
    if (activeEventSelection.value) {
        const existing = getEventProgress(activeEventSelection.value);
        if (existing) {
            eventProgress.value = existing;
            return;
        }
        startEventReplay(activeEventSelection.value, mode);
    } else {
        const existing = getDailyProgress();
        if (existing) {
            dailyProgress.value = existing;
            return;
        }
        startDailyQuiz(mode);
    }
    router.push('/quiz');
}

function resumeChallenge() {
    if (activeEventSelection.value) {
        const current = getEventProgress(activeEventSelection.value);
        if (!current || current.answers.length >= QUIZ_SIZE) {
            eventProgress.value = current;
            return;
        }
        resumeEventReplay();
    } else {
        const current = getDailyProgress();
        if (!current || current.answers.length >= QUIZ_SIZE) {
            dailyProgress.value = current;
            return;
        }
        resumeDailyQuiz();
    }
    router.push('/quiz');
}

function viewChallengeResults() {
    if (activeEventSelection.value) {
        const current = getEventProgress(activeEventSelection.value);
        if (!current || current.answers.length < QUIZ_SIZE) {
            eventProgress.value = current;
            return;
        }
        resumeEventReplay();
    } else {
        const current = getDailyProgress();
        if (!current || current.answers.length < QUIZ_SIZE) {
            dailyProgress.value = current;
            return;
        }
        resumeDailyQuiz();
    }
    router.push('/results');
}
</script>

<style scoped lang="scss">
.daily-btn {
    box-shadow: var(--daily-glow);
    transition: box-shadow 0.2s ease;
    width: 230px;
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
