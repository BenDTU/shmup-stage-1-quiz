<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
const route = useRoute()
const isPlayActive = computed(() => !route.path.startsWith('/song-list'))

const isMenuOpen = ref(false)
const togglerRef = ref<HTMLButtonElement | null>(null)
const offcanvasRef = ref<HTMLElement | null>(null)
const closedByNavigation = ref(false)

watch(isMenuOpen, async (open) => {
    if (open) {
        await nextTick()
        if (isMenuOpen.value) {
            offcanvasRef.value?.focus()
        }
    } else if (!closedByNavigation.value) {
        togglerRef.value?.focus()
    }
    closedByNavigation.value = false
})

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    closedByNavigation.value = false
    isMenuOpen.value = false
}

function closeMenuViaNavigation() {
    closedByNavigation.value = true
    isMenuOpen.value = false
}
</script>

<template>
    <nav class="navbar navbar-expand-md sticky-top border-bottom bg-body">
        <div class="container">
            <RouterLink
                class="navbar-brand"
                to="/"
                @click="closeMenuViaNavigation"
            >
                <i
                    class="bi bi-controller"
                    aria-hidden="true"
                />
                <span class="visually-hidden">Home</span>
            </RouterLink>

            <button
                ref="togglerRef"
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
                ref="offcanvasRef"
                :class="['offcanvas', 'offcanvas-start', { show: isMenuOpen }]"
                tabindex="-1"
                aria-labelledby="navOffcanvasLabel"
                @keydown.esc="closeMenu"
            >
                <div class="offcanvas-header">
                    <h5
                        id="navOffcanvasLabel"
                        class="offcanvas-title"
                    >
                        <i
                            class="bi bi-controller me-1"
                            aria-hidden="true"
                            role="presentation"
                        />Shmup Stage 1 Quiz
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closeMenu"
                    />
                </div>
                <div class="offcanvas-body d-flex flex-column flex-md-row align-items-md-center">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <RouterLink
                                class="nav-link icon-link"
                                :class="{ active: isPlayActive }"
                                to="/"
                                @click="closeMenuViaNavigation"
                            >
                                <i
                                    class="bi bi-play-fill lh-1 d-md-none"
                                    aria-hidden="true"
                                />Play
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink
                                class="nav-link icon-link"
                                active-class="active"
                                to="/song-list"
                                @click="closeMenuViaNavigation"
                            >
                                <i
                                    class="bi bi-music-note-list lh-1 d-md-none"
                                    aria-hidden="true"
                                />Song List
                            </RouterLink>
                        </li>
                    </ul>
                    <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center mt-auto mt-md-0">
                        <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm p-2 d-inline-flex align-items-center gap-1"
                            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                            @click="toggleDark"
                        >
                            <i
                                :class="['lh-1', isDark ? 'bi bi-sun' : 'bi bi-moon']"
                                aria-hidden="true"
                            />
                            <span class="d-md-none">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="isMenuOpen"
            class="offcanvas-backdrop fade show"
            aria-hidden="true"
            role="presentation"
            @click="closeMenu"
        />
    </nav>
    <RouterView />
</template>