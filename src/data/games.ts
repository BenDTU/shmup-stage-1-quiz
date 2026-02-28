import { Franchise, type GameEntry, type GameEntryWithId } from '../types'

export { Franchise } from '../types'
export type { SongSource, GameEntry, GameListEntry, Game } from '../types'

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// IDs are auto-assigned from the array position — just add entries with singleSongSource, multipleSongSource, or arrangedSongSource.
// startTime (seconds) is optional; omit it to start from the beginning of the video.
const gameEntries: GameEntry[] = [
  {
    name: 'Armed Police Batrider',
    singleSongSource: { songName: 'Easy to Go', videoId: 'UFc72Qz3S34' },
  },
  {
    name: 'Battle Garegga',
    singleSongSource: { songName: 'Fly to the Leaden Sky', videoId: 'Szr0TSXcWok' },
  },
  {
    name: 'Blazing Star',
    singleSongSource: { songName: 'Apocalypse ~ Stage 1A', videoId: 'WIeUpFJ4LY4' },
  },
  {
    name: 'Crimzon Clover',
    singleSongSource: { songName: 'UL-stage1', videoId: 'yYF3x1hACIU' },
  },
  {
    name: 'Deathsmiles',
    singleSongSource: { songName: 'Burning Halloween Town - Stage A-1', videoId: 'LI3Z5UqqlrQ' },
  },
  {
    name: 'DoDonPachi',
    franchise: Franchise.Dodonpachi,
    singleSongSource: { songName: '1 & 4 Scene BGM', videoId: 'nDMjMv6COIU' },
  },
  {
    name: 'DoDonPachi DaiFukkatsu',
    franchise: Franchise.Dodonpachi,
    singleSongSource: { songName: 'The Year 2008, Tokyo', videoId: 'ZCaPtpNyjf4' },
  },
  {
    name: 'DoDonPachi DaiOuJou',
    franchise: Franchise.Dodonpachi,
    singleSongSource: { songName: 'East Asia', videoId: 'muuApOJSP9E' },
  },
  {
    name: 'ESP Ra.De.',
    multipleSongSource: [
      { songName: 'DESPERATE SCHOOL (STAGE-A)', videoId: 'P3_U1wyESiA' },
      { songName: 'NIGHTMARE (STAGE-B)', videoId: 'ZoxoMoDZ-0A' },
      { songName: 'ACT IN JUDGE (STAGE-C)', videoId: 'q8s0A1R_c6k' },
    ]
  },
  {
    name: 'Espgaluda',
    singleSongSource: {
      songName: 'Bloody Separation ~ Bloody Arrival (Stage 1/Stage 5.2)',
      videoId: '5A6oJRZSFBg',
    },
  },
  {
    name: 'Gradius',
    franchise: Franchise.Gradius,
    singleSongSource: { songName: 'Challenger 1985', videoId: 'nYES6OmvQFQ' },
  },
  {
    name: 'Gradius II',
    franchise: Franchise.Gradius,
    singleSongSource: { songName: 'Burning Heat', videoId: 'FLc1msji0_w' },
  },
  {
    name: 'Gradius III',
    franchise: Franchise.Gradius,
    singleSongSource: { songName: 'Sand Storm', videoId: 'NyQzfqNIKTI' },
  },
  {
    name: 'Guwange',
    singleSongSource: { songName: 'Falling Cherry Blossoms', videoId: 'EWYuTxCV11U' },
  },
  {
    name: 'Hellfire',
    singleSongSource: { songName: 'Captain Lancer', videoId: '1VUMGMKTnKs' },
  },
  {
    name: 'Hellsinker',
    singleSongSource: { songName: 'Segment 1 BEHIND', videoId: 'M7vl9LzMAa8' },
  },
  {
    name: 'Ikaruga',
    singleSongSource: { songName: 'Ideal', videoId: 'fAn6XxsDDTI' },
  },
  {
    name: 'Jamestown',
    singleSongSource: { songName: 'War Upon the East Frontier', videoId: 'zhgBx6vSApM' },
  },
  {
    name: 'Ketsui',
    singleSongSource: { songName: 'INTERCEPTION - Noisy Town', videoId: 'z472pIce5CY' },
  },
  {
    name: 'MUSHA',
    singleSongSource: { songName: 'Fullmetal Fighter', videoId: '0MIqgHu3tsg' },
  },
  {
    name: 'Mushihimesama',
    singleSongSource: { songName: 'To Shinju Forest', videoId: 'F9D-NmXX_h4' },
  },
  {
    name: 'Progear no Arashi',
    singleSongSource: { songName: 'To the Blue Sky –Stage 1–', videoId: 'h-lt6fiIqvM' },
  },
  {
    name: 'Psyvariar 2',
    singleSongSource: { songName: 'Weakboson - Gorge City', videoId: 'wZrKXcoHkKw' },
  },
  {
    name: 'R-Type',
    franchise: Franchise.RType,
    singleSongSource: { songName: 'START ~ BATTLE THEME (Start ~ Stage1)', videoId: 'tXrxov_0oj0' },
  },
  {
    name: 'R-Type II',
    franchise: Franchise.RType,
    singleSongSource: { songName: 'Counter Attack', videoId: 'idU8lvOP9qA' },
  },
  {
    name: 'R-Type Leo',
    franchise: Franchise.RType,
    singleSongSource: { songName: 'Paradise Planet', videoId: 'yu7_I3CnDP8' },
  },
  {
    name: 'Radiant Silvergun',
    singleSongSource: { songName: 'Return', videoId: 'BJnkpw2dyAs' },
  },
  {
    name: 'Raiden',
    franchise: Franchise.Raiden,
    singleSongSource: { songName: 'Gallantry', videoId: 'vaGenJ5GXxE' },
  },
  {
    name: 'Raiden II',
    franchise: Franchise.Raiden,
    singleSongSource: { songName: 'Repeated Tragedy', videoId: 'zDS4EMmETsE' },
  },
  {
    name: 'RefleX',
    singleSongSource: { songName: 'An Unavoidable Choice', videoId: 'HmAJEvPLmVs' },
  },
  {
    name: 'Space Invaders (Game Boy Advance)',
    franchise: Franchise.SpaceInvaders,
    singleSongSource: { songName: 'Track 1', videoId: 'XUXYxZjt2VI' },
  },
  {
    name: 'Space Invaders (Game Boy Color)',
    franchise: Franchise.SpaceInvaders,
    singleSongSource: { songName: 'Mercury', videoId: 'DPQlZDOJPSw' },
  },
  {
    name: 'Space Invaders Extreme',
    franchise: Franchise.SpaceInvaders,
    singleSongSource: { songName: 'invAde yOu', videoId: 'qpZdqEgRNYA' },
  },
  {
    name: 'Space Invaders Extreme 2',
    franchise: Franchise.SpaceInvaders,
    singleSongSource: { songName: 'Invader Disco', videoId: 'hAOBf-JY1kU' },
  },
  {
    name: 'Space Invaders Infinity Gene',
    franchise: Franchise.SpaceInvaders,
    singleSongSource: { songName: 'Selection (Genetic)', videoId: 'N3EJltfL7ok' },
  },
  {
    name: 'Strikers 1945 II',
    singleSongSource: { songName: "Devil's Tower", videoId: 'siwfJgcFYKI' },
  },
  {
    name: 'Super R-Type',
    franchise: Franchise.RType,
    singleSongSource: { songName: 'Super Sortie', videoId: 'YuGRrVMLkxk' },
  },
  {
    name: 'Super Spacefortress Macross',
    singleSongSource: { songName: 'Stage 1 & 4', videoId: 'FyVBI2GA_mg', startTime: 220, endTime: 322 },
  },
  {
    name: 'Thunder Force IV',
    singleSongSource: { songName: 'Fighting Back', videoId: 'IJE-iAE1Mt8' },
  },
  {
    name: 'Touhou 6: Embodiment of Scarlet Devil',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'A Soul as Red as a Ground Cherry', videoId: 'nazi6JmAV_c' },
  },
  {
    name: 'Touhou 7: Perfect Cherry Blossom',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Paradise ~ Deep Mountain', videoId: 'hzTtdlTAapw' },
  },
  {
    name: 'Touhou 8: Imperishable Night',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Illusionary Night ~ Ghostly Eyes', videoId: 'buarznoa7ms' },
  },
  {
    name: 'Touhou 9: Phantasmagoria of Flower View',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Spring Lane ~ Colorful Path', videoId: 'LfqQa6JDlS8' },
  },
  {
    name: 'Touhou 10: Mountain of Faith',
    franchise: Franchise.Touhou,
    singleSongSource: {
      songName: 'A God That Misses People ~ Romantic Fall',
      videoId: '-NJWjmBT1qo',
    },
  },
  {
    name: 'Touhou 11: Subterranean Animism',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'The Dark Blowhole', videoId: 'MFCAB3KfBcI' },
  },
  {
    name: 'Touhou 12: Undefined Fantastic Object',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'At the End of Spring', videoId: 'nn2BUBM-hQ4' },
  },
  {
    name: 'Touhou 13: Ten Desires',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Night Sakura of Dead Spirits', videoId: 'S_s2InH_pFk' },
  },
  {
    name: 'Touhou 14: Double Dealing Character',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Mist Lake', videoId: 'mo1glRtlyTg' },
  },
  {
    name: 'Touhou 15: Legacy of Lunatic Kingdom',
    franchise: Franchise.Touhou,
    singleSongSource: {
      songName: 'Unforgettable, the Nostalgic Greenery',
      videoId: 'ucuIXF4YwNY',
    },
  },
  {
    name: 'Touhou 16: Hidden Star in Four Seasons',
    franchise: Franchise.Touhou,
    singleSongSource: {
      songName: 'A Star of Hope Rises in the Blue Sky',
      videoId: 'PVva0VzDAR8',
    },
  },
  {
    name: 'Touhou 17: Wily Beast and Weakest Creature',
    franchise: Franchise.Touhou,
    singleSongSource: {
      songName: 'The Lamentations Known Only by Jizo',
      videoId: 'uJ6VscWKMzA',
    },
  },
  {
    name: 'Touhou 18: Unconnected Marketeers',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'A Shower of Strange Occurrences', videoId: 'W3HOWV3aY_s' },
  },
  {
    name: 'Touhou 19: Unfinished Dream of All Living Ghost',
    franchise: Franchise.Touhou,
    singleSongSource: {
      songName: 'The World is Made in an Adorable Way',
      videoId: 'RpvCTe2FN1E',
    },
  },
  {
    name: 'Touhou 20: Fossilized Wonders',
    franchise: Franchise.Touhou,
    singleSongSource: { songName: 'Beloved Dwelling of Dust', videoId: 'SSZT4pV3RFA' },
  },
  {
    name: 'Tyrian',
    singleSongSource: { songName: 'Tyrian , the level', videoId: 'wNnTGbbDJfo' },
  },
  {
    name: 'Zero Wing',
    arrangedSongSource: {
      songName: 'Open Your Eyes',
      arrangements: [
        {
          source: 'Mega Drive',
          videoId: 'heMdH4ne0JQ',
        },
        {
          source: 'Arcade',
          videoId: 'u9GfzfjAFNo',
        },
        {
          source: 'PC Engine',
          videoId: 'jYqboWg4KOc',
        },
      ]
    },
  }
]

export const games: GameEntryWithId[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }))
