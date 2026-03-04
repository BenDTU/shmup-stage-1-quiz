<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'
import { useQuiz } from './composables/useQuiz'

const { isDark, toggleDark } = useDarkMode()
const { startQuiz } = useQuiz()
const router = useRouter()

const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}

function beginQuiz() {
    startQuiz()
    router.push('/quiz')
    closeMenu()
}
</script>

<template>
    <nav class="navbar navbar-expand-md sticky-top border-bottom bg-body">
        <div class="container">
            <RouterLink
                class="navbar-brand fw-semibold"
                to="/"
                @click="closeMenu"
            >
                <i class="bi bi-controller me-1" />Shmup Stage 1 Quiz
            </RouterLink>

            <button
                class="navbar-toggler border-0"
                type="button"
                :aria-expanded="isMenuOpen"
                aria-label="Toggle navigation"
                @click="toggleMenu"
            >
                <span class="navbar-toggler-icon" />
            </button>

            <div :class="['collapse', 'navbar-collapse', { show: isMenuOpen }]">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            to="/"
                            @click="closeMenu"
                        >
                            <i class="bi bi-house me-1" />Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="#"
                            @click.prevent="beginQuiz"
                        >
                            <i class="bi bi-play-circle me-1" />New Quiz
                        </a>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            to="/song-list"
                            @click="closeMenu"
                        >
                            <i class="bi bi-music-note-list me-1" />Song List
                        </RouterLink>
                    </li>
                </ul>

                <button
                    class="btn btn-outline-secondary btn-sm"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    @click="toggleDark"
                >
                    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'" />
                </button>
            </div>
        </div>
    </nav>
    <RouterView />
</template>
