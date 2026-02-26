<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import YouTubePlayer from '../components/YouTubePlayer.vue'
import AutocompleteInput from '../components/AutocompleteInput.vue'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const { state, isFinished, usedGameIds, submitGuess, nextQuestion } = useQuiz()

const guess = ref('')

onMounted(() => {
  if (!state.isStarted || state.questions.length === 0) {
    router.replace('/')
  }
})

const currentQuestion = computed(() => state.questions[state.currentIndex])
const questionNumber = computed(() => state.currentIndex + 1)

function handleSubmit() {
  if (!guess.value.trim() || state.isAnswered) return
  submitGuess(guess.value)
}

function handleNext() {
  if (isFinished.value) {
    router.push('/results')
  } else {
    guess.value = ''
    nextQuestion()
  }
}
</script>

<template>
  <main v-if="currentQuestion" class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Progress bar -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="fw-semibold">Question {{ questionNumber }} of {{ state.questions.length }}</span>
          <span class="text-muted small">Score: {{ state.answers.filter((a) => a.isCorrect).length }} / {{ state.answers.length }}</span>
        </div>
        <div class="progress mb-4" style="height: 8px">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: `${(questionNumber / state.questions.length) * 100}%` }"
          ></div>
        </div>

        <!-- YouTube player -->
        <div class="mb-4">
          <YouTubePlayer :video-id="currentQuestion.videoId" :start-time="currentQuestion.startTime" :hidden="!state.isAnswered" />
        </div>

        <!-- Guess form -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Which game is this stage 1 theme from?</h5>

            <div v-if="!state.isAnswered">
              <AutocompleteInput
                v-model="guess"
                :disabled-game-ids="usedGameIds"
                class="mb-3"
              />
              <button
                class="btn btn-primary w-100"
                :disabled="!guess.trim()"
                @click="handleSubmit"
              >
                Submit Guess
              </button>
            </div>

            <!-- Result -->
            <div v-else>
              <div
                class="alert mb-3"
                :class="state.answers[state.currentIndex]?.isCorrect ? 'alert-success' : 'alert-danger'"
              >
                <span v-if="state.answers[state.currentIndex]?.isCorrect">
                  ✅ <strong>Correct!</strong>
                </span>
                <span v-else>
                  ❌ <strong>Incorrect.</strong> The answer was
                  <em>{{ currentQuestion.name }}</em>.
                  <span v-if="state.answers[state.currentIndex]?.userGuess">
                    You guessed: <em>{{ state.answers[state.currentIndex]?.userGuess }}</em>.
                  </span>
                </span>
              </div>
              <button class="btn btn-success w-100" @click="handleNext">
                {{ isFinished ? 'See Results 🏆' : 'Next Question →' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
