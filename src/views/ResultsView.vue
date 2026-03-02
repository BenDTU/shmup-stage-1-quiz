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
  <main class="container mx-auto px-4 py-20">
    <div class="flex justify-center">
      <div class="w-full max-w-2xl">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold">
            Quiz Complete! 🏆
          </h1>
          <p class="text-xl">
            You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>.
          </p>
          <div class="bg-gray-200 rounded-full h-5 mb-3 mx-auto max-w-sm overflow-hidden">
            <div
              class="h-5 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all"
              :class="score / total >= 0.7 ? 'bg-green-500' : score / total >= 0.4 ? 'bg-yellow-400' : 'bg-red-500'"
              :style="{ width: `${(score / total) * 100}%` }"
            >
              {{ Math.round((score / total) * 100) }}%
            </div>
          </div>
          <p class="text-gray-500">
            <span v-if="score === total">Perfect score! You're a true shmup fan. 🎖️</span>
            <span v-else-if="score / total >= 0.7">Great job! You clearly know your shmups.</span>
            <span v-else-if="score / total >= 0.4">Not bad! Keep practicing.</span>
            <span v-else>Time to play more shmups! 😄</span>
          </p>
        </div>

        <!-- Answer breakdown -->
        <h5 class="mb-3">
          All Answers
        </h5>
        <div class="divide-y divide-gray-200 border border-gray-200 rounded-lg mb-10">
          <div
            v-for="(answer, index) in state.answers"
            :key="answer.game.id"
            class="px-4 py-3"
          >
            <div class="flex justify-between items-center">
              <div class="flex">
                <span class="font-semibold mr-1 whitespace-nowrap">#{{ index + 1 }}</span>
                <span class="mr-2 whitespace-nowrap">{{ answer.isCorrect ? '✅' : '❌' }}</span>
                <div>
                  <div class="font-semibold">
                    {{ answer.game.name }}
                  </div>
                  <div class="text-gray-500 text-sm">
                    {{ answer.game.songName }}<template v-if="answer.game.source">
                      ({{ answer.game.source }} version)
                    </template>
                  </div>
                  <div
                    v-if="!answer.isCorrect"
                    class="text-gray-500 text-sm"
                  >
                    You guessed: <em>{{ answer.userGuess || '(no answer)' }}</em>
                  </div>
                </div>
              </div>
              <a
                :href="`https://www.youtube.com/watch?v=${encodeURIComponent(answer.game.videoId)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-3 whitespace-nowrap text-sm text-blue-600 hover:underline"
              >▶ YouTube</a>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg text-lg transition"
            @click="playAgain"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
