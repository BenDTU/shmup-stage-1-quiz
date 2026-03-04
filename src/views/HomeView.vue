<script setup lang="ts">
import { h, Fragment } from 'vue'
import type { VNode } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import { games } from '@/data/games'

const router = useRouter()
const { startQuiz } = useQuiz()

const totalGames = games.length

interface Tip {
    icon: string
    label: () => VNode
}

const tips: Tip[] = [
    { icon: 'bi-music-note-beamed', label: () => h('span', 'Each track plays automatically — listen carefully!') },
    { icon: 'bi-search',            label: () => h('span', 'Use the autocomplete box to find your answer.') },
    { icon: 'bi-hand-index-thumb',  label: () => h('span', ['You only get ', h('strong', 'one guess'), ' per song.']) },
    { icon: 'bi-slash-circle',      label: () => h('span', 'Games already shown are disabled in later questions.') },
    { icon: 'bi-bar-chart-fill',    label: () => h('span', 'See your full score and all answers at the end.') },
    { icon: 'bi-controller',        label: () => h('span', ['There are currently ', h('strong', String(totalGames)), ' shmups loaded in!']) },
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
                        v-for="tip in tips"
                        :key="tip.icon"
                        class="list-group-item"
                    >
                        <div class="d-flex">
                            <i :class="['bi', 'me-2', tip.icon]" />
                            <component :is="tip.label" />
                        </div>
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
