<script setup lang="ts">
import { ref } from 'vue'
import { games } from '@/data/games'
import type { SongEntry } from '@/data/games'
import SongLinks from '@/components/SongLinks.vue'

interface GameGroup {
    gameName: string
    aliases: string[]
    songs: SongEntry[]
}

function normalizeAlias(alias: string | string[]): string[] {
    if (Array.isArray(alias)) {
        return alias
    }
    return [alias]
}

const gameGroups: GameGroup[] = games.map((game) => {
    const sources = Array.isArray(game.songSource) ? game.songSource : [game.songSource]
    return {
        gameName: game.name,
        aliases: game.alias ? normalizeAlias(game.alias) : [],
        songs: sources,
    }
})

const hoveredGame = ref<string | null>(null)
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
                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Game
                                </th>
                                <th scope="col">
                                    Song
                                </th>
                                <th
                                    scope="col"
                                    class="d-none d-sm-table-cell"
                                >
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template
                                v-for="group in gameGroups"
                                :key="group.gameName"
                            >
                                <tr
                                    v-for="(song, songIndex) in group.songs"
                                    :key="`${group.gameName}|${songIndex}|${song.songName}`"
                                    :class="{ 'row-hovered': hoveredGame === group.gameName }"
                                    @mouseenter="hoveredGame = group.gameName"
                                    @mouseleave="hoveredGame = null"
                                >
                                    <td
                                        v-if="songIndex === 0"
                                        :rowspan="group.songs.length"
                                        class="align-middle"
                                    >
                                        <div>{{ group.gameName }}</div>
                                        <div
                                            v-for="(alias, aliasIndex) in group.aliases"
                                            :key="aliasIndex"
                                            class="text-muted small"
                                        >
                                            {{ alias }}
                                        </div>
                                    </td>
                                    <td>
                                        {{ song.songName }}
                                        <div class="d-sm-none mt-1">
                                            <SongLinks :entry="song" />
                                        </div>
                                    </td>
                                    <td class="text-nowrap d-none d-sm-table-cell">
                                        <SongLinks :entry="song" />
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
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
tr.row-hovered > td {
    background-color: var(--bs-table-hover-bg, rgba(0, 0, 0, 0.075));
}
</style>
