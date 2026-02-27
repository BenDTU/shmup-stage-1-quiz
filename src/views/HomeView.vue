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
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-7 text-center">
        <h1 class="display-4 fw-bold mb-3">🎮 Shmup Stage 1 Quiz</h1>
        <p class="lead mb-4">
          Think you know your shmup stage&nbsp;1 themes? Listen to the music and guess which game
          it's from! A random set of <strong>20 tracks</strong> will be selected for you.
        </p>
        <ul class="list-group list-group-flush text-start mb-5 mx-auto" style="max-width: 440px">
          <li class="list-group-item">🎵 Each track plays automatically — listen carefully!</li>
          <li class="list-group-item">🔍 Use the autocomplete box to find your answer.</li>
          <li class="list-group-item">☝️ You only get <strong>one guess</strong> per song.</li>
          <li class="list-group-item">🚫 Games already shown are disabled in later questions.</li>
          <li class="list-group-item">📊 See your full score and all answers at the end.</li>
          <li class="list-group-item">🎮 There are currently <strong>{{ totalGames }}</strong> shmups loaded in!</li>
        </ul>
        <button class="btn btn-primary btn-lg px-5" @click="begin">Start Quiz</button>
      </div>
    </div>
  </main>
</template>
