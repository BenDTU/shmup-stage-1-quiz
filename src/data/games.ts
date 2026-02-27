export interface GameEntry {
  name: string
  songName: string
  videoId: string
  startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
}

export type Game = Omit<GameEntry, 'startTime'> & {
  startTime: number
  id: number
}

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// IDs are auto-assigned from the array position — just add { name, songName, videoId }.
// startTime (seconds) is optional; omit it to start from the beginning of the video.
const gameEntries: GameEntry[] = [
  {
    name: 'Armed Police Batrider',
    songName: 'Easy to Go',
    videoId: 'UFc72Qz3S34',
  },
  {
    name: 'Battle Garegga',
    songName: 'Fly to the Leaden Sky',
    videoId: 'Szr0TSXcWok',
  },
  {
    name: 'Blazing Star',
    songName: 'Apocalypse ~ Stage 1A',
    videoId: 'WIeUpFJ4LY4',
  },
  {
    name: 'Crimzon Clover',
    songName: 'UL-stage1',
    videoId: 'yYF3x1hACIU',
  },
  {
    name: 'Deathsmiles',
    songName: 'Burning Halloween Town - Stage A-1',
    videoId: 'LI3Z5UqqlrQ',
  },
  {
    name: 'DoDonPachi',
    songName: '1 & 4 Scene BGM',
    videoId: 'nDMjMv6COIU',
  },
  {
    name: 'DoDonPachi DaiFukkatsu',
    songName: 'The Year 2008, Tokyo',
    videoId: 'ZCaPtpNyjf4',
  },
  {
    name: 'DoDonPachi DaiOuJou',
    songName: 'East Asia',
    videoId: 'muuApOJSP9E',
  },
  {
    name: 'ESP Ra.De.',
    songName: 'DESPERATE SCHOOL (STAGE-A)',
    videoId: 'P3_U1wyESiA',
  },
  {
    name: 'Espgaluda',
    songName: 'Bloody Separation ~ Bloody Arrival (Stage 1/Stage 5.2)',
    videoId: '5A6oJRZSFBg',
  },
  {
    name: 'Gradius',
    songName: 'Challenger 1985',
    videoId: 'nYES6OmvQFQ',
  },
  {
    name: 'Gradius II',
    songName: 'Burning Heat',
    videoId: 'FLc1msji0_w',
  },
  {
    name: 'Gradius III',
    songName: 'Sand Storm',
    videoId: 'NyQzfqNIKTI',
  },
  {
    name: 'Guwange',
    songName: 'Falling Cherry Blossoms',
    videoId: 'EWYuTxCV11U',
  },
  {
    name: 'Hellfire',
    songName: 'Captain Lancer',
    videoId: '1VUMGMKTnKs',
  },
  {
    name: 'Hellsinker',
    songName: 'Segment 1 BEHIND',
    videoId: 'M7vl9LzMAa8',
  },
  {
    name: 'Ikaruga',
    songName: 'Ideal',
    videoId: 'fAn6XxsDDTI',
  },
  {
    name: 'Jamestown',
    songName: 'War Upon the East Frontier',
    videoId: 'zhgBx6vSApM',
  },
  {
    name: 'Ketsui',
    songName: "INTERCEPTION - Noisy Town",
    videoId: 'z472pIce5CY',
  },
  {
    name: 'MUSHA',
    songName: 'Fullmetal Fighter',
    videoId: '0MIqgHu3tsg',
  },
  {
    name: 'Mushihimesama',
    songName: 'To Shinju Forest',
    videoId: 'F9D-NmXX_h4',
  },
  {
    name: 'Progear no Arashi',
    songName: 'To the Blue Sky –Stage 1–',
    videoId: 'h-lt6fiIqvM',
  },
  {
    name: 'Psyvariar 2',
    songName: 'Weakboson - Gorge City',
    videoId: 'wZrKXcoHkKw',
  },
  {
    name: 'R-Type',
    songName: 'START ~ BATTLE THEME (Start ~ Stage1)',
    videoId: 'tXrxov_0oj0',
  },
  {
    name: 'R-Type II',
    songName: 'Counter Attack',
    videoId: 'idU8lvOP9qA',
  },
  {
    name: 'R-Type Leo',
    songName: 'Paradise Planet',
    videoId: 'yu7_I3CnDP8',
  },
  {
    name: 'Radiant Silvergun',
    songName: 'Arrival',
    videoId: 'BJnkpw2dyAs',
  },
  {
    name: 'Raiden',
    songName: 'Gallantry',
    videoId: 'vaGenJ5GXxE',
  },
  {
    name: 'Raiden II',
    songName: 'Repeated Tragedy',
    videoId: 'zDS4EMmETsE',
  },
  {
    name: 'RefleX',
    songName: 'An Unavoidable Choice',
    videoId: 'HmAJEvPLmVs',
  },
  {
    name: 'Space Invaders (Game Boy Advance)',
    songName: 'Track 1',
    videoId: 'XUXYxZjt2VI',
  },
  {
    name: 'Space Invaders (Game Boy Color)',
    songName: 'Mercury',
    videoId: 'DPQlZDOJPSw',
  },
  {
    name: 'Space Invaders Extreme',
    songName: 'invAde yOu',
    videoId: 'qpZdqEgRNYA'
  },
  {
    name: 'Space Invaders Extreme 2',
    songName: 'Invader Disco',
    videoId: 'hAOBf-JY1kU',
  },
  {
    name: 'Space Invaders Infinity Gene',
    songName: 'Selection (Genetic)',
    videoId: 'N3EJltfL7ok',
  },
  {
    name: 'Strikers 1945 II',
    songName: "Devil's Tower",
    videoId: 'siwfJgcFYKI',
  },
  {
    name: 'Super R-Type',
    songName: 'Super Sortie',
    videoId: 'YuGRrVMLkxk'
  },
  {
    name: 'Thunder Force IV',
    songName: 'Fighting Back',
    videoId: 'IJE-iAE1Mt8',
  },
  {
    name: 'Touhou 6: Embodiment of Scarlet Devil',
    songName: 'A Soul as Red as a Ground Cherry',
    videoId: 'nazi6JmAV_c',
  },
  {
    name: 'Touhou 7: Perfect Cherry Blossom',
    songName: 'Paradise ~ Deep Mountain',
    videoId: 'hzTtdlTAapw',
  },
  {
    name: 'Touhou 8: Imperishable Night',
    songName: 'Illusionary Night ~ Ghostly Eyes',
    videoId: 'buarznoa7ms',
  },
  {
    name: 'Touhou 10: Mountain of Faith',
    songName: 'A God That Misses People ~ Romantic Fall',
    videoId: '-NJWjmBT1qo',
  },
  {
    name: 'Touhou 11: Subterranean Animism',
    songName: 'The Dark Blowhole',
    videoId: 'MFCAB3KfBcI',
  },
  {
    name: 'Tyrian',
    songName: 'Tyrian , the level',
    videoId: 'wNnTGbbDJfo',
  },
]

export const games: Game[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1, startTime: entry.startTime ?? 0 }))
