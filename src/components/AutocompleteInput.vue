<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { games } from '../data/games'
import { type GameListEntry } from '../types'

const props = defineProps<{
    modelValue: number | null   // selected game id, or null for no selection
    disabledGameIds: Set<number>
    seriesLimitedGameIds?: Set<number>
    disabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: number | null]
    submit: []
}>()

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const internalUpdate = ref(false)

watch(() => props.modelValue, (newId) => {
    if (internalUpdate.value) {
        internalUpdate.value = false
        return
    }
    if (newId === null) {
        inputText.value = ''
    } else {
        const game = games.find((g) => g.id === newId)
        if (game) inputText.value = game.name
    }
})

defineExpose({
    focus: () => inputRef.value?.focus(),
    reset: () => { inputText.value = '' },
})

type AutocompleteItem = GameListEntry & { displayName: string }

const allGames = computed<GameListEntry[]>(() =>
    games.map(({ id, name, alias, series }) => ({ id, name, alias, series })),
)

const filteredGames = computed<AutocompleteItem[]>(() => {
    const query = inputText.value.toLowerCase().trim()
    if (!query) return allGames.value.map((g) => ({ ...g, displayName: g.name }))
    return allGames.value
        .filter((g) => {
            if (g.name.toLowerCase().includes(query)) return true
            const aliases = Array.isArray(g.alias) ? g.alias : g.alias ? [g.alias] : []
            return aliases.some(
                (a) =>
                    a.toLowerCase().includes(query) ||
                    `${g.name} (${a})`.toLowerCase().includes(query),
            )
        })
        .map((g) => {
            if (g.name.toLowerCase().includes(query)) return { ...g, displayName: g.name }
            const aliases = Array.isArray(g.alias) ? g.alias : g.alias ? [g.alias] : []
            const matchedAlias = aliases.find(
                (a) =>
                    a.toLowerCase().includes(query) ||
                    `${g.name} (${a})`.toLowerCase().includes(query),
            )
            return { ...g, displayName: matchedAlias ? `${g.name} (${matchedAlias})` : g.name }
        })
})

function matchGameToText(text: string): number | null {
    const lower = text.toLowerCase().trim()
    for (const g of allGames.value) {
        if (g.name.toLowerCase() === lower) return g.id
        const aliases = Array.isArray(g.alias) ? g.alias : g.alias ? [g.alias] : []
        if (aliases.some((a) => `${g.name} (${a})`.toLowerCase() === lower)) return g.id
    }
    return null
}

watch(inputText, (text) => {
    const matchedId = matchGameToText(text)
    const isSelectable = matchedId !== null
        && !props.disabledGameIds.has(matchedId)
        && !props.seriesLimitedGameIds?.has(matchedId)
    internalUpdate.value = true
    emit('update:modelValue', isSelectable ? matchedId : null)
    queueMicrotask(() => {
        if (internalUpdate.value) {
            internalUpdate.value = false
        }
    })
}, { flush: 'sync' })

function selectGame(game: AutocompleteItem) {
    if (props.disabledGameIds.has(game.id)) return
    if (props.seriesLimitedGameIds?.has(game.id)) return
    inputText.value = game.displayName
    isOpen.value = false
    highlightedIndex.value = -1
}

function onInput(event: Event) {
    inputText.value = (event.target as HTMLInputElement).value
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
        (g) => !props.disabledGameIds.has(g.id) && !props.seriesLimitedGameIds?.has(g.id),
    )

    if (event.key === 'ArrowDown') {
        event.preventDefault()
        let next = highlightedIndex.value + 1
        while (next < filteredGames.value.length) {
            const game = filteredGames.value[next]
            if (!game || (!props.disabledGameIds.has(game.id) && !props.seriesLimitedGameIds?.has(game.id))) break
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
            if (!game || (!props.disabledGameIds.has(game.id) && !props.seriesLimitedGameIds?.has(game.id))) break
            prev--
        }
        highlightedIndex.value = prev
    } else if (event.key === 'Enter') {
        event.preventDefault()
        if (highlightedIndex.value >= 0) {
            const game = filteredGames.value[highlightedIndex.value]
            if (game && !props.disabledGameIds.has(game.id) && !props.seriesLimitedGameIds?.has(game.id)) {
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
            :value="inputText"
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
            class="list-group position-absolute w-100 autocomplete-dropdown shadow"
        >
            <li
                v-for="(game, index) in filteredGames"
                :id="`autocomplete-option-${game.id}`"
                :key="game.id"
                role="option"
                class="list-group-item list-group-item-action"
                :class="{
                    disabled: disabledGameIds.has(game.id) || seriesLimitedGameIds?.has(game.id),
                    active: index === highlightedIndex && !disabledGameIds.has(game.id) && !seriesLimitedGameIds?.has(game.id),
                }"
                :aria-selected="index === highlightedIndex && !disabledGameIds.has(game.id) && !seriesLimitedGameIds?.has(game.id)"
                :aria-disabled="disabledGameIds.has(game.id) || seriesLimitedGameIds?.has(game.id) || undefined"
                @mousedown.prevent="selectGame(game)"
            >
                {{ game.displayName }}
                <span
                    v-if="disabledGameIds.has(game.id)"
                    class="ms-2 badge text-bg-secondary"
                >
                    Already played
                </span>
                <span
                    v-else-if="seriesLimitedGameIds?.has(game.id)"
                    class="ms-2 badge text-bg-secondary"
                >
                    Series limit reached
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.autocomplete-dropdown {
  top: 100%;
  z-index: 1000;
  max-height: 280px;
  overflow-y: auto;
  background-color: var(--bs-body-bg);
}

.list-group-item.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
