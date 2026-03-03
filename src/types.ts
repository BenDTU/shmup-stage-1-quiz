export enum Series {
    Darius = 'Darius',
    Dodonpachi = 'Dodonpachi',
    Gradius = 'Gradius',
    RType = 'R-Type',
    Raiden = 'Raiden',
    Strikers1945 = 'Strikers 1945',
    SpaceInvaders = 'Space Invaders',
    Touhou = 'Touhou',
}

export interface SongArrangement {
    source: string
    videoId: string
    startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
    endTime?: number // seconds into the video where playback should stop (video will be paused)
}

export type SongEntry =
  | { songName: string; videoId: string; startTime?: number; endTime?: number }
  | { songName: string; arrangements: [SongArrangement, ...SongArrangement[]] }

interface GameEntryBase {
    name: string
    sortName?: string // optional override used for alphabetical sorting (e.g. 'Gradius 2' for 'Gradius II')
    alias?: string | string[] // optional alternative name(s) for the game used in autocomplete search
    series?: Series
    forceFirst?: boolean // if true, this game will always be the first question in the quiz
}

export function gameDisplayName(name: string, alias?: string | string[]): string {
    if (!alias) return name
    const aliases = Array.isArray(alias) ? alias : [alias]
    if (aliases.length === 0) return name
    return `${name} (${aliases.join(', ')})`
}

export function gameMatchesGuess(name: string, alias: string | string[] | undefined, guess: string): boolean {
    const lower = guess.trim().toLowerCase()
    if (name.toLowerCase() === lower) return true
    if (!alias) return false
    const aliases = Array.isArray(alias) ? alias : [alias]
    if (gameDisplayName(name, alias).toLowerCase() === lower) return true
    return aliases.some((a) => `${name} (${a})`.toLowerCase() === lower)
}

export type GameEntry = GameEntryBase & {
    songSource: SongEntry | [SongEntry, ...SongEntry[]]
}

export type GameEntryWithId = GameEntry & { id: number }

export type GameListEntry = { id: number; name: string; alias?: string | string[]; series?: Series }

export type Game = {
    name: string
    alias?: string | string[] // optional alternative name(s) carried through from the game entry
    songName: string
    videoId: string
    startTime: number
    endTime?: number
    id: number
    series?: Series
    source?: string // for songs with arrangements, indicates the specific arrangement used
}
