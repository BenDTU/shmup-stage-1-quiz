<script setup lang="ts">
import { ref } from 'vue'
import { BTable } from 'bootstrap-vue-next'
import { games } from '@/data/games'
import type { SongEntry } from '@/data/games'

interface SongRow {
    songName: string
    links: { label: string; url: string }[]
}

interface TableItem {
    game: string
    aliases: string[]
    songName: string
    links: { label: string; url: string }[]
    isFirstInGroup: boolean
    isLastInGroup: boolean
}

function songEntryToRow(entry: SongEntry): SongRow {
    if ('arrangements' in entry) {
        return {
            songName: entry.songName,
            links: entry.arrangements.map((a) => ({
                label: a.source,
                url: `https://www.youtube.com/watch?v=${encodeURIComponent(a.videoId)}${a.startTime ? `&t=${a.startTime}` : ''}`,
            })),
        }
    }
    return {
        songName: entry.songName,
        links: [
            {
                label: 'YouTube',
                url: `https://www.youtube.com/watch?v=${encodeURIComponent(entry.videoId)}${entry.startTime ? `&t=${entry.startTime}` : ''}`,
            },
        ],
    }
}

function normalizeAlias(alias: string | string[]): string[] {
    if (Array.isArray(alias)) {
        return alias
    }
    return [alias]
}

const fields = [
    { key: 'game', label: 'Game' },
    { key: 'songName', label: 'Song' },
    { key: 'links', label: 'Link' },
]

const items: TableItem[] = games.flatMap((game) => {
    const sources = Array.isArray(game.songSource) ? game.songSource : [game.songSource]
    const aliases = game.alias ? normalizeAlias(game.alias) : []
    const songs = sources.map(songEntryToRow)
    return songs.map((song, i) => ({
        game: game.name,
        aliases: i === 0 ? aliases : [],
        songName: song.songName,
        links: song.links,
        isFirstInGroup: i === 0,
        isLastInGroup: i === songs.length - 1,
    }))
})

const hoveredGame = ref<string | null>(null)

function rowClass(item: TableItem | null) {
    return {
        'row-hovered': item !== null && hoveredGame.value === item.game,
        'no-bottom-border': item !== null && !item.isLastInGroup,
    }
}

function handleRowHovered(item: TableItem) {
    hoveredGame.value = item.game
}
</script>

<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <h1 class="display-5 fw-bold mb-1 text-center">
                    <i class="bi bi-music-note-beamed" /> Song List
                </h1>
                <p class="text-center text-muted mb-4">
                    All <strong>{{ games.length }}</strong> games and their stage&nbsp;1 themes in the quiz.
                </p>
                <BTable
                    :fields="fields"
                    :items="items"
                    responsive
                    align="middle"
                    :tbody-tr-class="rowClass"
                    @row-hovered="({ item }) => handleRowHovered(item as TableItem)"
                    @row-unhovered="hoveredGame = null"
                >
                    <template #cell(game)="{ item }">
                        <template v-if="(item as TableItem).isFirstInGroup">
                            <div>{{ (item as TableItem).game }}</div>
                            <div
                                v-for="(alias, aliasIndex) in (item as TableItem).aliases"
                                :key="aliasIndex"
                                class="text-muted small"
                            >
                                {{ alias }}
                            </div>
                        </template>
                    </template>
                    <template #cell(links)="{ item }">
                        <div class="d-flex flex-column gap-1 text-nowrap">
                            <a
                                v-for="link in (item as TableItem).links"
                                :key="link.url"
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="icon-link me-2 small"
                            ><i class="bi bi-youtube lh-1" /> {{ link.label }}</a>
                        </div>
                    </template>
                </BTable>
                <div class="text-center mt-4">
                    <RouterLink
                        to="/"
                        class="btn btn-outline-secondary"
                    >
                        ← Back to Home
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
:deep(tr.row-hovered > td) {
    background-color: var(--bs-table-hover-bg, rgba(0, 0, 0, 0.075));
}

:deep(tr.no-bottom-border > td) {
    border-bottom: none;
}
</style>
