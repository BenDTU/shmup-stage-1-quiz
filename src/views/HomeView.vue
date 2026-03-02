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
  <main class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-xl w-full text-center">
      <h1 class="text-5xl font-extrabold mb-4">🎮 Shmup Stage 1 Quiz</h1>
      <p class="text-lg mb-6">
        Think you know your shmup stage&nbsp;1 themes? Listen to the music and guess which game
        it's from! A random set of <strong>20 tracks</strong> will be selected for you.
      </p>
      <ul class="menu bg-base-200 rounded-box text-left mb-8 mx-auto w-full max-w-sm">
        <li><span>🎵 Each track plays automatically — listen carefully!</span></li>
        <li><span>🔍 Use the autocomplete box to find your answer.</span></li>
        <li><span>☝️ You only get <strong>one guess</strong> per song.</span></li>
        <li><span>🚫 Games already shown are disabled in later questions.</span></li>
        <li><span>📊 See your full score and all answers at the end.</span></li>
        <li><span>🎮 There are currently <strong>{{ totalGames }}</strong> shmups loaded in!</span></li>
      </ul>
      <button class="btn btn-primary btn-lg px-10" @click="begin">Start Quiz</button>
    </div>
  </main>
</template>
