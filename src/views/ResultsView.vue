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
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7">
                <div class="text-center mb-5">
                    <h1 class="display-5 fw-bold">
                        Quiz Complete! 🏆
                    </h1>
                    <p class="lead">
                        You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>.
                    </p>
                    <div
                        class="progress mb-3 mx-auto"
                        style="height: 20px; max-width: 360px"
                    >
                        <div
                            class="progress-bar"
                            :class="score / total >= 0.7 ? 'bg-success' : score / total >= 0.4 ? 'bg-warning' : 'bg-danger'"
                            role="progressbar"
                            :style="{ width: `${(score / total) * 100}%` }"
                        >
                            {{ Math.round((score / total) * 100) }}%
                        </div>
                    </div>
                    <p class="text-muted">
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
                <div class="list-group mb-5">
                    <div
                        v-for="(answer, index) in state.answers"
                        :key="answer.game.id"
                        class="list-group-item"
                    >
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <span class="fw-semibold me-1 text-nowrap">#{{ index + 1 }}</span>
                                <span class="me-2 text-nowrap">{{ answer.isCorrect ? '✅' : '❌' }}</span>
                                <div>
                                    <div class="fw-semibold">
                                        {{ answer.game.name }}
                                    </div>
                                    <div class="text-muted small">
                                        {{ answer.game.songName }}<template v-if="answer.game.source">
                                            ({{ answer.game.source }} version)
                                        </template>
                                    </div>
                                    <div
                                        v-if="!answer.isCorrect"
                                        class="text-muted small"
                                    >
                                        You guessed: <em>{{ answer.userGuess || '(no answer)' }}</em>
                                    </div>
                                </div>
                            </div>
                            <a
                                :href="`https://www.youtube.com/watch?v=${encodeURIComponent(answer.game.videoId)}`"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="ms-3 text-nowrap small"
                            >▶ YouTube</a>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button
                        class="btn btn-primary btn-lg px-5"
                        @click="playAgain"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
