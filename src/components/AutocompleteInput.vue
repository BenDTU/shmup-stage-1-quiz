<script setup lang="ts">
import { ref, computed } from 'vue'
import { games } from '../data/games'
import { type GameListEntry } from '../types'

const props = defineProps<{
  modelValue: string
  disabledGameIds: Set<number>
  franchiseLimitedGameIds?: Set<number>
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputRef.value?.focus() })

const allGames = computed<GameListEntry[]>(() =>
  games.map(({ id, name, franchise }) => ({ id, name, franchise })),
)

const filteredGames = computed(() => {
  const query = props.modelValue.toLowerCase().trim()
  if (!query) return allGames.value
  return allGames.value.filter((g) => g.name.toLowerCase().includes(query))
})

function selectGame(game: GameListEntry) {
  if (props.disabledGameIds.has(game.id)) return
  if (props.franchiseLimitedGameIds?.has(game.id)) return
  emit('update:modelValue', game.name)
  isOpen.value = false
  highlightedIndex.value = -1
}

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
  isOpen.value = true
  highlightedIndex.value = -1
}

function onFocus() {
  isOpen.value = true
}

function onBlur() {
  setTimeout(() => {
    isOpen.value = false
    highlightedIndex.value = -1
  }, 150)
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      isOpen.value = true
    } else if (event.key === 'Enter') {
      event.preventDefault()
      emit('submit')
    }
    return
  }

  const enabledGames = filteredGames.value.filter(
    (g) => !props.disabledGameIds.has(g.id) && !props.franchiseLimitedGameIds?.has(g.id),
  )

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    let next = highlightedIndex.value + 1
    while (next < filteredGames.value.length) {
      const game = filteredGames.value[next]
      if (!game || (!props.disabledGameIds.has(game.id) && !props.franchiseLimitedGameIds?.has(game.id))) break
      next++
    }
    if (next < filteredGames.value.length) {
      highlightedIndex.value = next
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    let prev = highlightedIndex.value - 1
    while (prev >= 0) {
      const game = filteredGames.value[prev]
      if (!game || (!props.disabledGameIds.has(game.id) && !props.franchiseLimitedGameIds?.has(game.id))) break
      prev--
    }
    highlightedIndex.value = prev
  } else if (event.key === 'Enter') {
    event.preventDefault()
    if (highlightedIndex.value >= 0) {
      const game = filteredGames.value[highlightedIndex.value]
      if (game && !props.disabledGameIds.has(game.id) && !props.franchiseLimitedGameIds?.has(game.id)) {
        selectGame(game)
      }
    } else if (enabledGames.length === 1 && enabledGames[0]) {
      selectGame(enabledGames[0])
    } else {
      emit('submit')
    }
  } else if (event.key === 'Escape') {
    isOpen.value = false
    highlightedIndex.value = -1
  } else if (event.key === 'Tab') {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}
</script>

<template>
  <div class="relative">
    <input
      ref="inputRef"
      type="text"
      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder="Type to search for a game…"
      :value="modelValue"
      :disabled="disabled"
      role="combobox"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      aria-haspopup="listbox"
      aria-controls="autocomplete-listbox"
      aria-autocomplete="list"
      :aria-expanded="isOpen && filteredGames.length > 0"
      :aria-activedescendant="isOpen && highlightedIndex >= 0 && filteredGames[highlightedIndex] ? `autocomplete-option-${filteredGames[highlightedIndex]!.id}` : undefined"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    >
    <ul
      v-if="isOpen && filteredGames.length > 0"
      id="autocomplete-listbox"
      role="listbox"
      tabindex="-1"
      class="absolute w-full bg-white border border-gray-200 rounded-md shadow-lg z-[1000] max-h-72 overflow-y-auto"
      style="top: 100%"
    >
      <li
        v-for="(game, index) in filteredGames"
        :id="`autocomplete-option-${game.id}`"
        :key="game.id"
        role="option"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        :class="{
          'opacity-50 cursor-not-allowed pointer-events-none': disabledGameIds.has(game.id) || franchiseLimitedGameIds?.has(game.id),
          'bg-blue-100': index === highlightedIndex && !disabledGameIds.has(game.id) && !franchiseLimitedGameIds?.has(game.id),
        }"
        :aria-selected="index === highlightedIndex && !disabledGameIds.has(game.id) && !franchiseLimitedGameIds?.has(game.id)"
        :aria-disabled="disabledGameIds.has(game.id) || franchiseLimitedGameIds?.has(game.id) || undefined"
        @mousedown.prevent="selectGame(game)"
      >
        {{ game.name }}
        <span
          v-if="disabledGameIds.has(game.id)"
          class="ml-2 text-xs bg-gray-200 text-gray-600 rounded px-1 py-0.5"
        >
          Already played
        </span>
        <span
          v-else-if="franchiseLimitedGameIds?.has(game.id)"
          class="ml-2 text-xs bg-gray-200 text-gray-600 rounded px-1 py-0.5"
        >
          Franchise limit reached
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
