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
    'submit': [id: number, viaKeyboard: boolean]
}>()

function optionClass(optionId: number): string {
    if (!props.isAnswered) {
        return optionId === props.modelValue ? 'btn-primary' : 'btn-outline-secondary'
    }
    if (optionId === props.correctId) return 'btn-success'
    if (optionId === props.answeredId) return 'btn-danger'
    return 'btn-outline-secondary'
}

function handleSelect(event: MouseEvent, optionId: number) {
    if (props.isAnswered) return
    emit('update:modelValue', optionId)
    emit('submit', optionId, event.detail === 0)
}
</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 g-2">
        <div
            v-for="optionId in options"
            :key="optionId"
            class="col"
        >
            <button
                class="btn text-start w-100 h-100"
                :class="[optionClass(optionId), { 'novice-option-done': isAnswered }]"
                :aria-disabled="isAnswered ? 'true' : undefined"
                @click="handleSelect($event, optionId)"
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
    </div>
</template>

<style scoped>
.novice-option-done {
    cursor: default;
    pointer-events: none;
}
</style>
