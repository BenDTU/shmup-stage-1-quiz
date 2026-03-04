<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import { games } from '@/data/games'

const router = useRouter()
const { startQuiz } = useQuiz()

const totalGames = games.length

interface Tip {
    icon: string
    html: string
}

const tips: Tip[] = [
    { icon: 'bi-music-note-beamed', html: 'Each track plays automatically — listen carefully!' },
    { icon: 'bi-search',            html: 'Use the autocomplete box to find your answer.' },
    { icon: 'bi-hand-index-thumb',  html: 'You only get <strong>one guess</strong> per song.' },
    { icon: 'bi-slash-circle',      html: 'Games already shown are disabled in later questions.' },
    { icon: 'bi-bar-chart-fill',    html: 'See your full score and all answers at the end.' },
    { icon: 'bi-controller',        html: `There are currently <strong>${totalGames}</strong> shmups loaded in!` },
]

function begin() {
    startQuiz()
    router.push('/quiz')
}
</script>

<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 text-center">
                <h1 class="display-4 fw-bold mb-3">
                    <i class="bi bi-controller" /> Shmup Stage 1 Quiz
                </h1>
                <p class="lead mb-4">
                    Think you know your shmup stage&nbsp;1 themes? Listen to the music and guess which game
                    it's from! A random set of <strong>20 tracks</strong> will be selected for you.
                </p>
                <ul
                    class="list-group list-group-flush text-start mb-5 mx-auto"
                    style="max-width: 440px"
                >
                    <li
                        v-for="(tip, index) in tips"
                        :key="index"
                        class="list-group-item"
                    >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <i :class="['bi', tip.icon]" /> <span v-html="tip.html" />
                    </li>
                </ul>
                <button
                    class="btn btn-primary btn-lg px-5"
                    @click="begin"
                >
                    Start Quiz
                </button>
                <div class="mt-3">
                    <RouterLink to="/song-list">
                        View Full Song List
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>
