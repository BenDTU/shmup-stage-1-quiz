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
  <main class="container mx-auto px-4 py-10">
    <div class="flex justify-center">
      <div class="w-full max-w-lg text-center">
        <h1 class="text-5xl font-bold mb-3">
          🎮 Shmup Stage 1 Quiz
        </h1>
        <p class="text-lg mb-6">
          Think you know your shmup stage&nbsp;1 themes? Listen to the music and guess which game
          it's from! A random set of <strong>20 tracks</strong> will be selected for you.
        </p>
        <ul class="bg-base-200 rounded-box text-left mb-8 mx-auto w-full max-w-md divide-y divide-base-300">
          <li class="px-4 py-2">
            🎵 Each track plays automatically — listen carefully!
          </li>
          <li class="px-4 py-2">
            🔍 Use the autocomplete box to find your answer.
          </li>
          <li class="px-4 py-2">
            ☝️ You only get <strong>one guess</strong> per song.
          </li>
          <li class="px-4 py-2">
            🚫 Games already shown are disabled in later questions.
          </li>
          <li class="px-4 py-2">
            📊 See your full score and all answers at the end.
          </li>
          <li class="px-4 py-2">
            🎮 There are currently <strong>{{ totalGames }}</strong> shmups loaded in!
          </li>
        </ul>
        <button
          class="btn btn-primary btn-lg px-10"
          @click="begin"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </main>
</template>
