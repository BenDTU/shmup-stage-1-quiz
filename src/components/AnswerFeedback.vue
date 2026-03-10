<script setup lang="ts">
import { computed } from 'vue'
import type { AdvancedFeedbackDetails } from '../types'
import { AnswerType } from '../types'

const props = defineProps<{
    answerType: AnswerType
    details?: AdvancedFeedbackDetails
}>()

const iconClass = computed(() =>
    isCorrect.value
        ? 'bi bi-check-circle-fill text-success'
        : 'bi bi-x-circle-fill text-danger',
)

const label = computed(() => {
    if (isCorrect.value) return 'Correct!'
    return isAlmostCorrect.value ? 'Almost!' : 'Incorrect.'
})

const isCorrect = computed(() => props.answerType === AnswerType.Correct)
const isAlmostCorrect = computed(() => props.answerType === AnswerType.AlmostCorrect)
</script>

<template>
    <div
        class="alert mb-3"
        :class="isCorrect ? 'alert-success' : 'alert-danger'"
    >
        <div class="d-flex">
            <span class="me-2 text-nowrap"><i :class="iconClass" /></span>
            <span>
                <strong>{{ label }}</strong>
                <template v-if="details">
                    The song was <em>{{ details.songName }} from {{ details.gameName }}</em><template v-if="details.source"> ({{ details.source }} version)</template>.
                    <template v-if="!isCorrect && details.guessedName">
                        You guessed: <em>{{ details.guessedName }}</em>.
                    </template>
                </template>
            </span>
        </div>
    </div>
</template>
