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

// Only allow submitting a guess that exactly matches an available game in the pool
const isValidGuess = computed(() => {
  const normalizedGuess = guess.value.trim().toLowerCase()
  if (!normalizedGuess) return false

  return games.some(
    (g) =>
      g.name.toLowerCase() === normalizedGuess &&
      !usedGameIds.value.has(g.id) &&
      !franchiseLimitedGameIds.value.has(g.id),
  )
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
    class="container mx-auto px-4 py-8"
  >
    <div class="flex justify-center">
      <div class="w-full max-w-2xl">
        <!-- Progress bar -->
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">Question {{ questionNumber }} of {{ state.questions.length }}</span>
          <span class="text-gray-500 text-sm">Score: {{ state.answers.filter((a) => a.isCorrect).length }} / {{ state.answers.length }}</span>
        </div>
        <div class="bg-gray-200 rounded-full h-2 mb-4">
          <div
            class="bg-blue-500 h-2 rounded-full transition-all"
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
          class="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div class="p-6">
            <h5 class="text-lg font-semibold mb-3">
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
              <div class="flex gap-2">
                <button
                  class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition"
                  :disabled="!isValidGuess"
                  @click="handleSubmit()"
                >
                  Submit Guess
                </button>
                <button
                  class="border border-gray-400 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded transition"
                  @click="handleSkipClick"
                >
                  Skip ⏭
                </button>
              </div>
            </div>

            <!-- Result -->
            <div v-else>
              <div
                class="rounded p-3 mb-3"
                :class="state.answers[state.currentIndex]?.isCorrect ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'"
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
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
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
