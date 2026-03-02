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
  <main class="container mx-auto px-4 py-10">
    <div class="flex justify-center">
      <div class="w-full max-w-lg">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-3">
            Quiz Complete! 🏆
          </h1>
          <p class="text-lg mb-4">
            You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>.
          </p>
          <progress
            class="progress w-full max-w-xs mx-auto mb-3"
            :class="score / total >= 0.7 ? 'progress-success' : score / total >= 0.4 ? 'progress-warning' : 'progress-error'"
            :value="score"
            :max="total"
          />
          <p class="text-sm opacity-60 mb-1">
            {{ Math.round((score / total) * 100) }}%
          </p>
          <p class="opacity-70">
            <span v-if="score === total">Perfect score! You're a true shmup fan. 🎖️</span>
            <span v-else-if="score / total >= 0.7">Great job! You clearly know your shmups.</span>
            <span v-else-if="score / total >= 0.4">Not bad! Keep practicing.</span>
            <span v-else>Time to play more shmups! ��</span>
          </p>
        </div>

        <!-- Answer breakdown -->
        <h2 class="text-lg font-semibold mb-3">
          All Answers
        </h2>
        <div class="join join-vertical w-full mb-8">
          <div
            v-for="(answer, index) in state.answers"
            :key="answer.game.id"
            class="join-item border border-base-300 px-4 py-3"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-start gap-2">
                <span class="font-semibold text-nowrap">#{{ index + 1 }}</span>
                <span class="text-nowrap">{{ answer.isCorrect ? '✅' : '❌' }}</span>
                <div>
                  <div class="font-semibold">
                    {{ answer.game.name }}
                  </div>
                  <div class="text-sm opacity-60">
                    {{ answer.game.songName }}<template v-if="answer.game.source">
                      ({{ answer.game.source }} version)
                    </template>
                  </div>
                  <div
                    v-if="!answer.isCorrect"
                    class="text-sm opacity-60"
                  >
                    You guessed: <em>{{ answer.userGuess || '(no answer)' }}</em>
                  </div>
                </div>
              </div>
              <a
                :href="`https://www.youtube.com/watch?v=${encodeURIComponent(answer.game.videoId)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="link link-primary text-sm text-nowrap ml-3"
              >▶ YouTube</a>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            class="btn btn-primary btn-lg px-10"
            @click="playAgain"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
