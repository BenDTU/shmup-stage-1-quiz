import { games } from './data/games'

export function guessedGameName(guessId: number | undefined): string {
    if (guessId === undefined || guessId === -1) return 'Song Skipped'
    return games.find((g) => g.id === guessId)?.name ?? '(no answer)'
}
