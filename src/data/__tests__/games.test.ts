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
  const response = await fetch(url)
  return response.ok
}

const allVideoIds: { gameName: string; videoId: string }[] = games.flatMap((game) =>
  getVideoIds(game).map((videoId) => ({ gameName: game.name, videoId })),
)

describe('YouTube video IDs in games.ts', () => {
  it.each(allVideoIds)(
    'video "$videoId" for "$gameName" must be publicly embeddable',
    async ({ videoId }) => {
      const embeddable = await isEmbeddable(videoId)
      expect(embeddable, `Video ID "${videoId}" is not embeddable (private, premium-only, or embedding disabled)`).toBe(true)
    },
    15_000, // 15 second timeout per video to account for network latency
  )
})
