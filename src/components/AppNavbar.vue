<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { BOffcanvas } from 'bootstrap-vue-next'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
const route = useRoute()
const isPlayActive = computed(() => !route.path.startsWith('/song-list'))

const isMenuOpen = ref(false)
const togglerRef = ref<HTMLButtonElement | null>(null)
const closedByNavigation = ref(false)

function onHidden() {
    if (!closedByNavigation.value) {
        togglerRef.value?.focus()
    }
    closedByNavigation.value = false
}

function closeMenuViaNavigation() {
    if (isMenuOpen.value) {
        closedByNavigation.value = true
        isMenuOpen.value = false
    } else {
        closedByNavigation.value = false
    }
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
                @click="isMenuOpen = !isMenuOpen"
            >
                <span class="navbar-toggler-icon" />
            </button>

            <BOffcanvas
                id="navOffcanvas"
                v-model="isMenuOpen"
                class="flex-grow-1"
                placement="start"
                responsive="md"
                teleport-disabled
                :body-class="['d-flex', 'flex-column', 'flex-md-row', 'align-items-md-center']"
                @hidden="onHidden"
            >
                <template #title>
                    <i
                        class="bi bi-controller me-1"
                        aria-hidden="true"
                        role="presentation"
                    />Shmup Stage 1 Quiz
                </template>
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
                <ul class="navbar-nav mt-auto mt-md-0 align-items-md-center">
                    <li class="nav-item">
                        <a
                            href="https://github.com/BenDTU/shmup-stage-1-quiz"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="nav-link icon-link"
                            aria-label="GitHub repository"
                        >
                            <i
                                class="bi bi-github lh-1"
                                aria-hidden="true"
                            />
                            <span class="d-md-none">GitHub</span>
                        </a>
                    </li>
                    <li class="d-flex align-items-center">
                        <hr
                            class="w-100 d-md-none my-2"
                            aria-hidden="true"
                        >
                        <div
                            class="vr d-none d-md-inline-block mx-2"
                            aria-hidden="true"
                        />
                    </li>
                    <li class="nav-item">
                        <button
                            type="button"
                            class="nav-link icon-link"
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
                    </li>
                </ul>
            </BOffcanvas>
        </div>
    </nav>
</template>
