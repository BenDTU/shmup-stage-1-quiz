<script setup lang="ts">
import { guessedGameName } from '../functions'

const props = defineProps<{
    options: number[]
    modelValue: number | null
    isAnswered: boolean
    correctId: number
    answeredId?: number
    songName?: string
    source?: string
}>()

const emit = defineEmits<{
    'update:modelValue': [id: number]
}>()

function optionClass(optionId: number): string {
    if (!props.isAnswered) {
        return optionId === props.modelValue ? 'btn-primary' : 'btn-outline-secondary'
    }
    if (optionId === props.correctId) return 'btn-success'
    if (optionId === props.answeredId) return 'btn-danger'
    return 'btn-outline-secondary'
}

function handleSelect(optionId: number) {
    if (props.isAnswered) return
    emit('update:modelValue', optionId)
}
</script>

<template>
    <div class="d-grid gap-2">
        <button
            v-for="optionId in options"
            :key="optionId"
            class="btn text-start"
            :class="[optionClass(optionId), { 'novice-option-done': isAnswered }]"
            @click="handleSelect(optionId)"
        >
            <div>{{ guessedGameName(optionId) }}</div>
            <div
                v-if="isAnswered && optionId === correctId && songName"
                class="small opacity-75"
            >
                {{ songName }}<template v-if="source">
                    ({{ source }} version)
                </template>
            </div>
        </button>
    </div>
</template>

<style scoped>
.novice-option-done {
    cursor: default;
    pointer-events: none;
}
</style>
