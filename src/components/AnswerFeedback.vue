<script setup lang="ts">
import { computed } from 'vue'
import type { AdvancedFeedbackDetails } from '../types'

const props = defineProps<{
    isCorrect: boolean
    details?: AdvancedFeedbackDetails
}>()

const iconClass = computed(() =>
    props.isCorrect
        ? 'bi bi-check-circle-fill text-success'
        : 'bi bi-x-circle-fill text-danger',
)

const label = computed(() => {
    if (props.isCorrect) return 'Correct!'
    return props.details?.isAlmostCorrect ? 'Almost!' : 'Incorrect.'
})
</script>

<template>
    <div
        class="alert mb-3"
        :class="isCorrect ? 'alert-success' : 'alert-danger'"
    >
        <div class="d-flex">
            <span class="me-1 text-nowrap"><i :class="iconClass" /></span>
            <span>
                <strong>{{ label }}</strong>
                <template v-if="details">
                    The song was <em>{{ details.songName }} from {{ details.gameName }}</em><template v-if="details.source"> ({{ details.source }} version)</template>.
                    <template v-if="!isCorrect">
                        You guessed: <em>{{ details.guessedName }}</em>.
                    </template>
                </template>
            </span>
        </div>
    </div>
</template>
