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
                class="navbar-brand"
                to="/"
                @click="closeMenu"
            >
                <i class="bi bi-controller" />
            </RouterLink>

            <button
                class="navbar-toggler border-0"
                type="button"
                :aria-expanded="isMenuOpen"
                aria-controls="navOffcanvas"
                aria-label="Toggle navigation"
                @click="toggleMenu"
            >
                <span class="navbar-toggler-icon" />
            </button>

            <div
                id="navOffcanvas"
                :class="['offcanvas', 'offcanvas-start', { show: isMenuOpen }]"
                tabindex="-1"
                aria-label="Navigation"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">
                        <i class="bi bi-controller me-1" />Shmup Stage 1 Quiz
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closeMenu"
                    />
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <RouterLink
                                class="nav-link icon-link"
                                to="/"
                                @click="closeMenu"
                            >
                                <i
                                    class="bi bi-house"
                                />Home
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link icon-link"
                                href="#"
                                @click.prevent="beginQuiz"
                            >
                                <i
                                    class="bi bi-play-circle"
                                />New Quiz
                            </a>
                        </li>
                        <li class="nav-item">
                            <RouterLink
                                class="nav-link icon-link"
                                to="/song-list"
                                @click="closeMenu"
                            >
                                <i
                                    class="bi bi-music-note-list"
                                />Song List
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
        </div>
        <div
            v-if="isMenuOpen"
            class="offcanvas-backdrop fade show"
            @click="closeMenu"
        />
    </nav>
    <RouterView />
</template>
