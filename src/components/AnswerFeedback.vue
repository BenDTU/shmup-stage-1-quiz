<script setup lang="ts">
defineProps<{
    isCorrect: boolean
    isAlmostCorrect?: boolean
    showDetails?: boolean
    songName?: string
    gameName?: string
    source?: string
    guessedName?: string
}>()
</script>

<template>
    <div
        class="alert mb-3"
        :class="isCorrect ? 'alert-success' : 'alert-danger'"
    >
        <div v-if="isCorrect" class="d-flex">
            <span class="me-1 text-nowrap"><i class="bi bi-check-circle-fill text-success" /></span>
            <span>
                <strong>Correct!</strong>
                <template v-if="showDetails">
                    The song was <em>{{ songName }} from {{ gameName }}</em><template v-if="source"> ({{ source }} version)</template>.
                </template>
            </span>
        </div>
        <div v-else class="d-flex">
            <span class="me-1 text-nowrap"><i class="bi bi-x-circle-fill text-danger" /></span>
            <span>
                <strong>{{ isAlmostCorrect ? 'Almost!' : 'Incorrect.' }}</strong>
                <template v-if="showDetails">
                    The song was <em>{{ songName }} from {{ gameName }}</em><template v-if="source"> ({{ source }} version)</template>.
                    You guessed: <em>{{ guessedName }}</em>.
                </template>
            </span>
        </div>
    </div>
</template>
