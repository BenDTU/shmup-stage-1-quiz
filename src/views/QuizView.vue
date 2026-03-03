<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import AutocompleteInput from '../components/AutocompleteInput.vue'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const { state, isFinished, usedGameIds, seriesLimitedGameIds, submitGuess, nextQuestion } = useQuiz()

const selectedGameId = ref(-1)
const audioUnlocked = ref(false)
const nextBtn = ref<HTMLButtonElement | null>(null)
const autocompleteRef = ref<{ focus: () => void; reset: () => void } | null>(null)

onMounted(() => {
    if (!state.isStarted || state.questions.length === 0) {
        router.replace('/')
    }
})

const currentQuestion = computed(() => state.questions[state.currentIndex])
const questionNumber = computed(() => state.currentIndex + 1)

// Only allow submitting a guess that corresponds to an available game in the pool
const isValidGuess = computed(() => {
    if (selectedGameId.value === -1) return false
    return !usedGameIds.value.has(selectedGameId.value) && !seriesLimitedGameIds.value.has(selectedGameId.value)
})
async function handleSubmit(viaKeyboard = false) {
    if (!isValidGuess.value || state.isAnswered) return
    submitGuess(selectedGameId.value)
    if (viaKeyboard) {
        await nextTick()
        nextBtn.value?.focus()
    }
}

async function handleSkipClick(event: MouseEvent) {
    if (state.isAnswered) return
    // event.detail is 0 for keyboard-triggered clicks (Enter/Space) and ≥1 for mouse clicks
    const isKeyboard = event.detail === 0
    submitGuess(-1)
    if (isKeyboard) {
        await nextTick()
        nextBtn.value?.focus()
    }
}

function handleNext() {
    if (isFinished.value) {
        router.push('/results')
    } else {
        selectedGameId.value = -1
        autocompleteRef.value?.reset()
        nextQuestion()
    }
}

async function handleNextClick(event: MouseEvent) {
    // event.detail is 0 for keyboard-triggered clicks (Enter/Space) and ≥1 for mouse clicks
    const isKeyboard = event.detail === 0
    const wasFinished = isFinished.value
    handleNext()
    if (isKeyboard && !wasFinished) {
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
                    <span class="text-muted small">Score: {{ state.answers.filter((a) => a.isCorrect).length }} / {{ state.answers.length }}</span>
                </div>
                <div
                    class="progress mb-4"
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

                        <div v-if="!state.isAnswered">
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
                                    Skip ⏭
                                </button>
                            </div>
                        </div>

                        <!-- Result -->
                        <div v-else>
                            <div
                                class="alert mb-3"
                                :class="state.answers[state.currentIndex]?.isCorrect ? 'alert-success' : 'alert-danger'"
                            >
                                <span v-if="state.answers[state.currentIndex]?.isCorrect">
                                    ✅ <strong>Correct!</strong> The song was <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em><template v-if="currentQuestion.source"> ({{ currentQuestion.source }} version)</template>.
                                </span>
                                <span v-else>
                                    ❌ <strong>Incorrect.</strong> The song was
                                    <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em><template v-if="currentQuestion.source"> ({{ currentQuestion.source }} version)</template>.
                                    <span v-if="state.answers[state.currentIndex]?.userGuess">
                                        You guessed: <em>{{ state.answers[state.currentIndex]?.userGuess }}</em>.
                                    </span>
                                </span>
                            </div>
                            <button
                                ref="nextBtn"
                                class="btn btn-success w-100"
                                @click="handleNextClick"
                            >
                                {{ isFinished ? 'See Results 🏆' : 'Next Question →' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
