<script setup lang="ts">
import { games } from '@/data/games'
import type { SongEntry } from '@/data/games'

interface SongRow {
    gameName: string
    songName: string
    links: { label: string; url: string }[]
}

function songEntryToRows(gameName: string, entry: SongEntry): SongRow {
    if ('arrangements' in entry) {
        return {
            gameName,
            songName: entry.songName,
            links: entry.arrangements.map((a) => ({
                label: a.source,
                url: `https://www.youtube.com/watch?v=${encodeURIComponent(a.videoId)}${a.startTime ? `&t=${a.startTime}` : ''}`,
            })),
        }
    }
    return {
        gameName,
        songName: entry.songName,
        links: [
            {
                label: 'YouTube',
                url: `https://www.youtube.com/watch?v=${encodeURIComponent(entry.videoId)}${entry.startTime ? `&t=${entry.startTime}` : ''}`,
            },
        ],
    }
}

const rows: SongRow[] = games.flatMap((game) => {
    const sources = Array.isArray(game.songSource) ? game.songSource : [game.songSource]
    return sources.map((entry) => songEntryToRows(game.name, entry))
})
</script>

<template>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <h1 class="display-5 fw-bold mb-1 text-center">
                    🎵 Song List
                </h1>
                <p class="text-center text-muted mb-4">
                    All <strong>{{ games.length }}</strong> games and their stage&nbsp;1 themes in the quiz.
                </p>
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Game
                                </th>
                                <th scope="col">
                                    Song
                                </th>
                                <th scope="col">
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(row, index) in rows"
                                :key="`${row.gameName}|${row.songName}|${index}`"
                            >
                                <td>{{ row.gameName }}</td>
                                <td>{{ row.songName }}</td>
                                <td class="text-nowrap">
                                    <a
                                        v-for="link in row.links"
                                        :key="link.url"
                                        :href="link.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="me-2"
                                    >▶ {{ link.label }}</a>
                                </td>
                            </tr>
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
