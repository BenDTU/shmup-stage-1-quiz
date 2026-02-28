export enum Franchise {
  Dodonpachi = 'Dodonpachi',
  Gradius = 'Gradius',
  RType = 'R-Type',
  Raiden = 'Raiden',
  SpaceInvaders = 'Space Invaders',
  Touhou = 'Touhou',
}

export interface SongSource {
  songName: string
  videoId: string
  startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
}

export type GameEntry =
  | { name: string; franchise?: Franchise; singleSongSource: SongSource }
  | { name: string; franchise?: Franchise; multipleSongSource: SongSource[] }

export type GameListEntry = { id: number; name: string; franchise?: Franchise }

export type Game = {
  name: string
  songName: string
  videoId: string
  startTime: number
  id: number
  franchise?: Franchise
}
