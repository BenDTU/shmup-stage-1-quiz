<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import AutocompleteInput from '../components/AutocompleteInput.vue'
import { useQuiz } from '../composables/useQuiz'
import { games } from '../data/games'

const router = useRouter()
const { state, isFinished, usedGameIds, franchiseLimitedGameIds, submitGuess, nextQuestion } = useQuiz()

const guess = ref('')
const audioUnlocked = ref(false)
const nextBtn = ref<HTMLButtonElement | null>(null)
const autocompleteRef = ref<{ focus: () => void } | null>(null)

onMounted(() => {
  if (!state.isStarted || state.questions.length === 0) {
    router.replace('/')
  }
})

const currentQuestion = computed(() => state.questions[state.currentIndex])
const questionNumber = computed(() => state.currentIndex + 1)

// Only allow submitting a guess that exactly matches a game in the pool
const isValidGuess = computed(() => {
  const normalizedGuess = guess.value.trim().toLowerCase()
  if (!normalizedGuess) return false

  const usedIds: any = usedGameIds as any

  const isGameUsed = (gameId: unknown): boolean => {
    if (gameId == null) return false

    // Handle Set-like, Array-like, or ref-wrapped collections of used IDs
    const checkCollection = (collection: any): boolean => {
      if (!collection) return false
      if (typeof collection.has === 'function') {
        return collection.has(gameId)
      }
      if (Array.isArray(collection) && typeof collection.includes === 'function') {
        return collection.includes(gameId)
      }
      return false
    }

    if (checkCollection(usedIds)) return true
    if (usedIds && 'value' in usedIds) {
      return checkCollection((usedIds as any).value)
    }

    return false
  }

  return games.some((g: any) => {
    const matchesName =
      typeof g.name === 'string' && g.name.toLowerCase() === normalizedGuess

    if (!matchesName) return false

    // If there is no id, fall back to name-only behavior
    const gameId = g.id
    if (gameId === undefined || gameId === null) {
      return true
    }

    return !isGameUsed(gameId) && !franchiseLimitedGameIds.value.has(gameId)
  })
})
async function handleSubmit(viaKeyboard = false) {
  if (!isValidGuess.value || state.isAnswered) return
  submitGuess(guess.value)
  if (viaKeyboard) {
    await nextTick()
    nextBtn.value?.focus()
  }
}

async function handleSkipClick(event: MouseEvent) {
  if (state.isAnswered) return
  // event.detail is 0 for keyboard-triggered clicks (Enter/Space) and ≥1 for mouse clicks
  const isKeyboard = event.detail === 0
  submitGuess('Song skipped')
  if (isKeyboard) {
    await nextTick()
    nextBtn.value?.focus()
  }
}

function handleNext() {
  if (isFinished.value) {
    router.push('/results')
  } else {
    guess.value = ''
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
                v-model="guess"
                :disabled-game-ids="usedGameIds"
                :franchise-limited-game-ids="franchiseLimitedGameIds"
                class="mb-3"
                @submit="handleSubmit(true)"
              />
              <div class="d-flex gap-2">
                <button
                  class="btn btn-primary flex-grow-1"
                  :disabled="!isValidGuess"
                  @click="handleSubmit"
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
                  ✅ <strong>Correct!</strong> The song was <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em>.
                </span>
                <span v-else>
                  ❌ <strong>Incorrect.</strong> The song was
                  <em>{{ currentQuestion.songName }} from {{ currentQuestion.name }}</em>.
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
