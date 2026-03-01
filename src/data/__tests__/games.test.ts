import { describe, it, expect } from 'vitest'
import { games } from '../games'
import type { GameEntryWithId } from '../../types'

/**
 * Extracts all YouTube video IDs from a game entry.
 */
function getVideoIds(game: GameEntryWithId): string[] {
  if ('singleSongSource' in game && game.singleSongSource) {
    return [game.singleSongSource.videoId]
  }
  if ('multipleSongSource' in game && game.multipleSongSource) {
    return game.multipleSongSource.map((s) => s.videoId)
  }
  if ('arrangedSongSource' in game && game.arrangedSongSource) {
    return game.arrangedSongSource.arrangements.map((a) => a.videoId)
  }
  return []
}

/**
 * Checks whether a YouTube video is publicly embeddable via the oEmbed API.
 * Returns false if the video is private, requires YouTube Premium, has
 * embedding disabled, or does not exist.
 */
async function isEmbeddable(videoId: string): Promise<boolean> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)
  try {
    const response = await fetch(url, { signal: controller.signal })
    return response.ok
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return false
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

// Build a map from videoId -> list of game names that reference it, then
// de-duplicate so each videoId is only checked once regardless of how many
// games share it.
const videoIdToGames = new Map<string, string[]>()
for (const game of games) {
  for (const videoId of getVideoIds(game)) {
    const names = videoIdToGames.get(videoId) ?? []
    names.push(game.name)
    videoIdToGames.set(videoId, names)
  }
}

const uniqueVideoIds: { videoId: string; gameNames: string }[] = Array.from(
  videoIdToGames.entries(),
).map(([videoId, names]) => ({ videoId, gameNames: names.join(', ') }))

describe('YouTube video IDs in games.ts', () => {
  it.each(uniqueVideoIds)(
    'video "$videoId" (used by: $gameNames) must be publicly embeddable',
    async ({ videoId }) => {
      const embeddable = await isEmbeddable(videoId)
      expect(embeddable, `Video ID "${videoId}" is not embeddable (private, premium-only, or embedding disabled)`).toBe(true)
    },
    15_000, // 15 second timeout per video to account for network latency
  )
})
