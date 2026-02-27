<script setup lang="ts">
import { ref, computed } from 'vue'
import { games, type Game } from '../data/games'

const props = defineProps<{
  modelValue: string
  disabledGameIds: Set<number>
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

const filteredGames = computed<Game[]>(() => {
  const query = props.modelValue.toLowerCase().trim()
  if (!query) return games
  return games.filter((g) => g.name.toLowerCase().includes(query))
})

function selectGame(game: Game) {
  if (props.disabledGameIds.has(game.id)) return
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

  const enabledGames = filteredGames.value.filter((g) => !props.disabledGameIds.has(g.id))

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    let next = highlightedIndex.value + 1
    while (next < filteredGames.value.length) {
      const game = filteredGames.value[next]
      if (!game || !props.disabledGameIds.has(game.id)) break
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
      if (!game || !props.disabledGameIds.has(game.id)) break
      prev--
    }
    highlightedIndex.value = prev
  } else if (event.key === 'Enter') {
    event.preventDefault()
    if (highlightedIndex.value >= 0) {
      const game = filteredGames.value[highlightedIndex.value]
      if (game && !props.disabledGameIds.has(game.id)) {
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
  <div class="position-relative">
    <input
      ref="inputRef"
      type="text"
      class="form-control"
      placeholder="Type to search for a game…"
      :value="modelValue"
      :disabled="disabled"
      role="combobox"
      autocomplete="off"
      aria-haspopup="listbox"
      aria-controls="autocomplete-listbox"
      aria-autocomplete="list"
      :aria-expanded="isOpen && filteredGames.length > 0"
      :aria-activedescendant="isOpen && highlightedIndex >= 0 && filteredGames[highlightedIndex] ? `autocomplete-option-${filteredGames[highlightedIndex].id}` : undefined"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    />
    <ul
      v-if="isOpen && filteredGames.length > 0"
      id="autocomplete-listbox"
      role="listbox"
      tabindex="-1"
      class="list-group position-absolute w-100 autocomplete-dropdown shadow"
    >
      <li
        v-for="(game, index) in filteredGames"
        :id="`autocomplete-option-${game.id}`"
        :key="game.id"
        role="option"
        class="list-group-item list-group-item-action"
        :class="{
          disabled: disabledGameIds.has(game.id),
          active: index === highlightedIndex && !disabledGameIds.has(game.id),
        }"
        :aria-selected="index === highlightedIndex && !disabledGameIds.has(game.id)"
        :aria-disabled="disabledGameIds.has(game.id) || undefined"
        @mousedown.prevent="selectGame(game)"
      >
        {{ game.name }}
        <span v-if="disabledGameIds.has(game.id)" class="ms-2 badge text-bg-secondary">
          Already played
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.autocomplete-dropdown {
  top: 100%;
  z-index: 1000;
  max-height: 280px;
  overflow-y: auto;
  background: white;
}

.list-group-item.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
