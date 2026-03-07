<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import AutocompleteInput from '../components/AutocompleteInput.vue'
import NoviceOptions from '../components/NoviceOptions.vue'
import { useQuiz } from '../composables/useQuiz'
import { guessedGameName } from '../functions'
import { games } from '../data/games'

const router = useRouter()
const { state, isFinished, usedGameIds, seriesLimitedGameIds, submitGuess, nextQuestion } = useQuiz()

const selectedGameId = ref<number | null>(null)
const audioUnlocked = ref(false)
const nextBtn = ref<HTMLButtonElement | null>(null)
const autocompleteRef = ref<{ focus: () => void } | null>(null)
const feedbackState = ref<'correct' | 'wrong' | null>(null)
let feedbackTimer: ReturnType<typeof setTimeout> | null = null

function setFeedback(value: 'correct' | 'wrong') {
    if (feedbackTimer !== null) clearTimeout(feedbackTimer)
    feedbackState.value = value
    feedbackTimer = setTimeout(() => {
        feedbackState.value = null
        feedbackTimer = null
    }, value === 'correct' ? 800 : 600)
}

function setFeedbackFromAnswer() {
    setFeedback(
        state.answers[state.currentIndex] === state.questions[state.currentIndex]?.id
            ? 'correct'
            : 'wrong',
    )
}

onMounted(() => {
    if (!state.isStarted || state.questions.length === 0) {
        router.replace('/')
    }
})

const currentQuestion = computed(() => state.questions[state.currentIndex])
const questionNumber = computed(() => state.currentIndex + 1)

const isAlmostCorrect = computed(() => {
    const answerId = state.answers[state.currentIndex]
    if (!answerId || answerId === -1) return false
    const correctSeries = currentQuestion.value?.series
    if (correctSeries === undefined) return false
    const guessedGame = games.find((g) => g.id === answerId)
    return guessedGame?.series === correctSeries
})

// Only allow submitting a guess that corresponds to an available game in the pool
const isValidGuess = computed(() => {
    if (selectedGameId.value === null) return false
    if (state.mode === 'novice') return true
    return !usedGameIds.value.has(selectedGameId.value) && !seriesLimitedGameIds.value.has(selectedGameId.value)
})

async function handleSubmit(viaKeyboard = false) {
    if (!isValidGuess.value || state.isAnswered) return
    submitGuess(selectedGameId.value!)
    setFeedbackFromAnswer()
    if (viaKeyboard) {
        await nextTick()
        nextBtn.value?.focus()
    }
}

function handleNoviceSubmit(optionId: number) {
    if (state.isAnswered) return
    selectedGameId.value = optionId
    submitGuess(optionId)
    setFeedbackFromAnswer()
}

async function handleSkipClick(event: MouseEvent) {
    if (state.isAnswered) return
    // event.detail is 0 for keyboard-triggered clicks (Enter/Space) and ≥1 for mouse clicks
    const isKeyboard = event.detail === 0
    submitGuess(-1)
    setFeedback('wrong')
    if (isKeyboard) {
        await nextTick()
        nextBtn.value?.focus()
    }
}

function handleNext() {
    if (isFinished.value) {
        router.push('/results')
    } else {
        selectedGameId.value = null
        if (feedbackTimer !== null) {
            clearTimeout(feedbackTimer)
            feedbackTimer = null
        }
        feedbackState.value = null
        nextQuestion()
    }
}

async function handleNextClick(event: MouseEvent) {
    // event.detail is 0 for keyboard-triggered clicks (Enter/Space) and ≥1 for mouse clicks
    const isKeyboard = event.detail === 0
    const wasFinished = isFinished.value
    handleNext()
    if (isKeyboard && !wasFinished && state.mode === 'advanced') {
        await nextTick()
        autocompleteRef.value?.focus()
    }
}
</script>

<template>
    <main
        v-if="currentQuestion"
        class="container py-4"
    >
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <!-- Progress bar -->
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-semibold">Question {{ questionNumber }} of {{ state.questions.length }}</span>
                    <span class="text-muted small">Score: {{ state.answers.filter((id, i) => state.questions[i]?.id === id).length }} / {{ state.answers.length }}</span>
                </div>
                <div
                    class="progress mb-4"
                    :class="{
                        'feedback-wrong': feedbackState === 'wrong',
                        'feedback-correct': feedbackState === 'correct',
                    }"
                    style="height: 8px"
                >
                    <div
                        class="progress-bar"
                        role="progressbar"
                        :style="{ width: `${(questionNumber / state.questions.length) * 100}%` }"
                    />
                </div>

                <!-- YouTube player -->
                <div class="mb-4">
                    <YouTubePlayer
                        :video-id="currentQuestion.videoId"
                        :start-time="currentQuestion.startTime"
                        :end-time="currentQuestion.endTime"
                        :hidden="!state.isAnswered"
                        @audio-unlocked="audioUnlocked = true"
                    />
                </div>

                <!-- Guess form -->
                <div
                    v-show="audioUnlocked"
                    class="card"
                >
                    <div class="card-body">
                        <h5 class="card-title mb-3">
                            Which game is this stage 1 theme from?
                        </h5>

                        <!-- Novice mode: correct/incorrect alert (above options, shown when answered) -->
                        <div
                            v-if="state.mode === 'novice' && state.isAnswered"
                            class="alert mb-3"
                            :class="state.questions[state.currentIndex]?.id === state.answers[state.currentIndex] ? 'alert-success' : 'alert-danger'"
                        >
                            <span v-if="state.questions[state.currentIndex]?.id === state.answers[state.currentIndex]">
                                <i class="bi bi-check-circle-fill text-success me-1" /> <strong>Correct!</strong>
                            </span>
                            <span v-else>
                                <i class="bi bi-x-circle-fill text-danger me-1" /> <strong>Incorrect.</strong>
                            </span>
                        </div>

                        <!-- Novice mode: 4 option buttons -->
                        <NoviceOptions
                            v-if="state.mode === 'novice'"
                            v-model="selectedGameId"
                            :options="state.noviceOptions[state.currentIndex] ?? []"
                            :is-answered="state.isAnswered"
                            :correct-id="currentQuestion.id"
                            :answered-id="state.answers[state.currentIndex]"
                            :song-name="currentQuestion.songName"
                            :source="currentQuestion.source"
                            :class="state.isAnswered ? 'mb-4' : 'mb-0'"
                            @submit="handleNoviceSubmit"
                        />

                        <!-- Advanced mode: autocomplete + submit/skip buttons -->
                        <div v-if="state.mode === 'advanced' && !state.isAnswered">
                            <AutocompleteInput
                                ref="autocompleteRef"
                                v-model="selectedGameId"
                                :disabled-game-ids="usedGameIds"
                                :series-limited-game-ids="seriesLimitedGameIds"
                                class="mb-3"
                                @submit="handleSubmit(true)"
                            />
                            <div class="d-flex gap-2">
                                <button
                                    class="btn btn-primary flex-grow-1"
                                    :disabled="!isValidGuess"
                                    @click="handleSubmit()"
                                >
                                    Submit Guess
                                </button>
                                <button
                                    class="btn btn-outline-secondary"
                                    @click="handleSkipClick"
                                >
                                    Skip <i class="bi bi-skip-forward-fill ms-1" />
                                </button>
                            </div>
                        </div>

                        <!-- Result section (answered state) -->
                        <template v-if="state.isAnswered">
                            <!-- Advanced mode: correct/incorrect alert -->
                            <div
                                v-if="state.mode === 'advanced'"
                                class="alert mb-3"
                                :class="state.questions[state.currentIndex]?.id === state.answers[state.currentIndex] ? 'alert-success' : 'alert-danger'"
                            >
                                <span v-if="state.questions[state.currentIndex]?.id === state.answers[state.currentIndex]">
                                    <i class="bi bi-check-circle-fill text-success me-1" /> <strong>Correct!</strong> The song was <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em><template v-if="currentQuestion.source"> ({{ currentQuestion.source }} version)</template>.
                                </span>
                                <span v-else>
                                    <i class="bi bi-x-circle-fill text-danger me-1" /> <strong>{{ isAlmostCorrect ? 'Almost!' : 'Incorrect.' }}</strong> The song was
                                    <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em><template v-if="currentQuestion.source"> ({{ currentQuestion.source }} version)</template>.
                                    You guessed: <em>{{ guessedGameName(state.answers[state.currentIndex]!) }}</em>.
                                </span>
                            </div>
                            <button
                                ref="nextBtn"
                                class="btn btn-success w-100"
                                @click="handleNextClick"
                            >
                                <template v-if="isFinished">
                                    See Results <i class="bi bi-trophy-fill ms-1" />
                                </template>
                                <template v-else>
                                    Next Question <i class="bi bi-arrow-right ms-1" />
                                </template>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@keyframes shake {
    0%,  100% { transform: translate(0, 0); }
    15%       { transform: translate(-4px, -2px); }
    30%       { transform: translate(4px, -2px); }
    45%       { transform: translate(-3px, 1.5px); }
    60%       { transform: translate(3px, -1.5px); }
    75%       { transform: translate(1.5px, 1px); }
    90%       { transform: translate(-1.5px, 1px); }
}

@keyframes flash-red {
    50% {
        background-color: var(--bs-danger);
        box-shadow: 0 0 20px 12px rgba(var(--bs-danger-rgb), 0.9);
    }
}

@keyframes pulse-green {
    50% {
        background-color: var(--bs-success);
        box-shadow: 0 0 20px 12px rgba(var(--bs-success-rgb), 0.9);
    }
}

.feedback-wrong {
    overflow: visible;
    animation: shake 0.6s ease-in-out;
}

.feedback-wrong .progress-bar {
    animation: flash-red 0.6s ease-in-out;
}

.feedback-correct {
    overflow: visible;
}

.feedback-correct .progress-bar {
    animation: pulse-green 0.8s ease-in-out;
}
</style>
