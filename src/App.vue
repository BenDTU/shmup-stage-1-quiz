<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { BOffcanvas } from 'bootstrap-vue-next'
import { useDarkMode } from './composables/useDarkMode'

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
            </BOffcanvas>
        </div>
    </nav>
    <RouterView />
</template>