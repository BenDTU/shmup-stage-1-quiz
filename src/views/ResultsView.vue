<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '../composables/useQuiz'

const router = useRouter()
const { state, resetQuiz } = useQuiz()

onMounted(() => {
  if (!state.isStarted || state.answers.length === 0) {
    router.replace('/')
  }
})

const score = state.answers.filter((a) => a.isCorrect).length
const total = state.answers.length

function playAgain() {
  resetQuiz()
  router.push('/')
}
</script>

<template>
  <main class="container mx-auto max-w-xl py-10 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold mb-2">
        Quiz Complete! 🏆
      </h1>
      <p class="text-lg">
        You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>.
      </p>
      <div class="flex justify-center my-4">
        <progress
          class="progress w-80 h-5"
          :class="score / total >= 0.7 ? 'progress-success' : score / total >= 0.4 ? 'progress-warning' : 'progress-error'"
          :value="score"
          :max="total"
        />
      </div>
      <p class="text-sm opacity-60">
        <span v-if="score === total">Perfect score! You're a true shmup fan. 🎖️</span>
        <span v-else-if="score / total >= 0.7">Great job! You clearly know your shmups.</span>
        <span v-else-if="score / total >= 0.4">Not bad! Keep practicing.</span>
        <span v-else>Time to play more shmups! 😄</span>
      </p>
    </div>

    <!-- Answer breakdown -->
    <h2 class="text-xl font-bold mb-3">All Answers</h2>
    <ul class="list-none mb-8 space-y-2">
      <li
        v-for="(answer, index) in state.answers"
        :key="answer.game.id"
        class="card bg-base-200"
      >
        <div class="card-body py-3 px-4 flex-row items-center justify-between gap-2">
          <div class="flex items-start gap-2">
            <span class="font-semibold whitespace-nowrap">#{{ index + 1 }}</span>
            <span class="whitespace-nowrap">{{ answer.isCorrect ? '✅' : '❌' }}</span>
            <div>
              <div class="font-semibold">{{ answer.game.name }}</div>
              <div class="text-sm opacity-60">
                {{ answer.game.songName }}<template v-if="answer.game.source">
                  ({{ answer.game.source }} version)
                </template>
              </div>
              <div v-if="!answer.isCorrect" class="text-sm opacity-60">
                You guessed: <em>{{ answer.userGuess || '(no answer)' }}</em>
              </div>
            </div>
          </div>
          <a
            :href="`https://www.youtube.com/watch?v=${encodeURIComponent(answer.game.videoId)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-xs btn-outline whitespace-nowrap"
          >▶ YouTube</a>
        </div>
      </li>
    </ul>

    <div class="text-center">
      <button class="btn btn-primary btn-lg px-10" @click="playAgain">
        Play Again
      </button>
    </div>
  </main>
</template>
