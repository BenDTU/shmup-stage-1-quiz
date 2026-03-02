<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import { games } from '@/data/games'

const router = useRouter()
const { startQuiz } = useQuiz()

const totalGames = games.length

function begin() {
  startQuiz()
  router.push('/quiz')
}
</script>

<template>
  <main class="container mx-auto px-4 py-20">
    <div class="flex justify-center">
      <div class="w-full max-w-2xl text-center">
        <h1 class="text-5xl font-bold mb-3">
          🎮 Shmup Stage 1 Quiz
        </h1>
        <p class="text-xl mb-4">
          Think you know your shmup stage&nbsp;1 themes? Listen to the music and guess which game
          it's from! A random set of <strong>20 tracks</strong> will be selected for you.
        </p>
        <ul class="divide-y divide-gray-200 border border-gray-200 rounded text-left mb-10 mx-auto max-w-md">
          <li class="px-4 py-3">
            🎵 Each track plays automatically — listen carefully!
          </li>
          <li class="px-4 py-3">
            🔍 Use the autocomplete box to find your answer.
          </li>
          <li class="px-4 py-3">
            ☝️ You only get <strong>one guess</strong> per song.
          </li>
          <li class="px-4 py-3">
            🚫 Games already shown are disabled in later questions.
          </li>
          <li class="px-4 py-3">
            📊 See your full score and all answers at the end.
          </li>
          <li class="px-4 py-3">
            🎮 There are currently <strong>{{ totalGames }}</strong> shmups loaded in!
          </li>
        </ul>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg text-lg transition"
          @click="begin"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </main>
</template>
