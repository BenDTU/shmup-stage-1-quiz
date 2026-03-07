<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import { totalSongs, totalShmups } from '@/data/games'
import type { QuizMode } from '@/types'

const router = useRouter()
const { startQuiz } = useQuiz()

function begin(mode: QuizMode) {
    startQuiz(mode)
    router.push('/quiz')
}
</script>

<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 text-center">
                <h1 class="display-4 fw-bold mb-3">
                    Shmup Stage 1 Quiz
                </h1>
                <p class="lead mb-5">
                    Think you know your shmups? How many can you pick from their stage 1 theme? A random set of <strong>20 tracks</strong> will be selected for you.
                </p>
                <h2 class="h5 mb-3">
                    Choose your Difficulty
                </h2>
                <div class="d-flex flex-column align-items-center gap-3 mb-5">
                    <button
                        class="btn btn-success btn-lg w-100 py-3"
                        style="max-width: 400px"
                        @click="begin('novice')"
                    >
                        <div class="fw-bold fs-5">
                            Novice
                        </div>
                        <div class="small opacity-75">
                            Select from a list of 4 games
                        </div>
                    </button>
                    <button
                        class="btn btn-danger btn-lg w-100 py-3"
                        style="max-width: 400px"
                        @click="begin('advanced')"
                    >
                        <div class="fw-bold fs-5">
                            Advanced
                        </div>
                        <div class="small opacity-75">
                            Select from the whole list of games
                        </div>
                    </button>
                </div>
                <p class="text-muted small mb-2">
                    There are currently <strong>{{ totalSongs }}</strong> songs from <strong>{{ totalShmups }}</strong> shmups loaded in this quiz
                </p>
                <div>
                    <RouterLink to="/song-list">
                        View Full Song List
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>
