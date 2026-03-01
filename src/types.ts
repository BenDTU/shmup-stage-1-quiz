export enum Franchise {
  Darius = 'Darius',
  Dodonpachi = 'Dodonpachi',
  Gradius = 'Gradius',
  RType = 'R-Type',
  Raiden = 'Raiden',
  Strikers1945 = 'Strikers 1945',
  SpaceInvaders = 'Space Invaders',
  Touhou = 'Touhou',
}

export interface SongSource {
  songName: string
  videoId: string
  startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
  endTime?: number // seconds into the video where playback should stop (video will be paused)
}

export interface ArrangedSongSource {
  songName: string
  arrangements: [SongArrangement, ...SongArrangement[]]
}

export interface SongArrangement {
  source: string
  videoId: string
  startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
  endTime?: number // seconds into the video where playback should stop (video will be paused)
}

interface GameEntryBase {
  name: string
  sortName?: string // optional override used for alphabetical sorting (e.g. 'Gradius 2' for 'Gradius II')
  franchise?: Franchise
  forceFirst?: boolean // if true, this game will always be the first question in the quiz
}

export type GameEntry =
  | (GameEntryBase & {
      singleSongSource: SongSource
      multipleSongSource?: never
      arrangedSongSource?: never
    })
  | (GameEntryBase & {
      singleSongSource?: never
      multipleSongSource: [SongSource, ...SongSource[]]
      arrangedSongSource?: never
    })
  | (GameEntryBase & {
      singleSongSource?: never
      multipleSongSource?: never
      arrangedSongSource: ArrangedSongSource
    })

export type GameEntryWithId = GameEntry & { id: number }

export type GameListEntry = { id: number; name: string; franchise?: Franchise }

export type Game = {
  name: string
  songName: string
  videoId: string
  startTime: number
  endTime?: number
  id: number
  franchise?: Franchise
  source?: string // for arrangedSongSource, indicates the specific arrangement used
}
