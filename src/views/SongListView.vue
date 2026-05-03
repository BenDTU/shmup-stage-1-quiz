<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <h1 class="display-5 fw-bold mb-2 text-center">
                    Song List
                </h1>
                <p class="text-center text-muted mb-4">
                    There are currently <strong>{{ totalSongs }}</strong> songs from <strong>{{ totalShmups }}</strong> shmups loaded in!
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
                                            <SongLinks
                                                v-if="song.entry"
                                                :entry="song.entry"
                                            />
                                            <span
                                                v-else
                                                class="icon-link text-secondary small"
                                            ><i class="bi bi-youtube lh-1" /> Unavailable</span>
                                        </div>
                                    </td>
                                    <td class="text-nowrap d-none d-sm-table-cell">
                                        <SongLinks
                                            v-if="song.entry"
                                            :entry="song.entry"
                                        />
                                        <span
                                            v-else
                                            class="icon-link text-secondary small"
                                        ><i class="bi bi-youtube lh-1" /> Unavailable</span>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-4">
                    <RouterLink
                        to="/"
                        class="btn btn-outline-secondary icon-link"
                    >
                        <i class="lh-1 bi bi-arrow-left" />
                        Back to Home
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { games, noSoundTrackGameEntries, totalSongs, totalShmups } from '@/data/games';
import type { SongEntry } from '@/data/games';
import SongLinks from '@/components/SongLinks.vue';

interface GameGroup {
    gameName: string
    sortKey: string
    aliases: string[]
    songs: Array<{ songName: string; entry?: SongEntry }>
}

function normalizeAlias(alias: string | string[]): string[] {
    return Array.isArray(alias) ? alias : [alias];
}

const availableGroups: GameGroup[] = games.map((game) => {
    const sources = Array.isArray(game.songSource) ? game.songSource : [game.songSource];
    return {
        gameName: game.name,
        sortKey: (game.sortName ?? game.name).toLowerCase(),
        aliases: game.alias ? normalizeAlias(game.alias) : [],
        songs: sources.map((entry) => ({ songName: entry.songName, entry })),
    };
});

const unavailableGroups: GameGroup[] = noSoundTrackGameEntries.map((game) => {
    const source = game.songSource;
    return {
        gameName: game.name,
        sortKey: (game.sortName ?? game.name).toLowerCase(),
        aliases: game.alias ? normalizeAlias(game.alias) : [],
        songs: 'arrangements' in source
            ? source.arrangements.map(() => ({ songName: source.songName }))
            : [{ songName: source.songName }],
    };
});

const gameGroups: GameGroup[] = [...availableGroups, ...unavailableGroups]
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));

const hoveredGame = ref<string | null>(null);
</script>

<style scoped lang="scss">
tr.row-hovered > td {
    background-color: var(--bs-table-hover-bg, rgba(0, 0, 0, 0.075));
}
</style>
