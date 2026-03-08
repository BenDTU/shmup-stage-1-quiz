<script setup lang="ts">
import type { AdvancedFeedbackDetails } from '../types'

defineProps<{
    isCorrect: boolean
    details?: AdvancedFeedbackDetails
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
                <template v-if="details">
                    The song was <em>{{ details.songName }} from {{ details.gameName }}</em><template v-if="details.source"> ({{ details.source }} version)</template>.
                </template>
            </span>
        </div>
        <div v-else class="d-flex">
            <span class="me-1 text-nowrap"><i class="bi bi-x-circle-fill text-danger" /></span>
            <span>
                <strong>{{ details?.isAlmostCorrect ? 'Almost!' : 'Incorrect.' }}</strong>
                <template v-if="details">
                    The song was <em>{{ details.songName }} from {{ details.gameName }}</em><template v-if="details.source"> ({{ details.source }} version)</template>.
                    You guessed: <em>{{ details.guessedName }}</em>.
                </template>
            </span>
        </div>
    </div>
</template>
