export interface GameEntry {
  name: string
  videoId: string
  startTime: number // seconds into the video where the stage 1 theme begins
}

export interface Game extends GameEntry {
  id: number
}

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// IDs are auto-assigned from the array position — just add { name, videoId, startTime }.
const gameEntries: GameEntry[] = [
  { name: 'Armed Police Batrider',                videoId: 'UFc72Qz3S34', startTime: 0   },
  { name: 'Battle Garegga',                       videoId: 'Szr0TSXcWok', startTime: 0   },
  { name: 'Blazing Star',                         videoId: 'WIeUpFJ4LY4', startTime: 0   },
  { name: 'Crimzon Clover',                       videoId: 'yYF3x1hACIU', startTime: 0   },
  { name: 'Deathsmiles',                          videoId: 'LI3Z5UqqlrQ', startTime: 0   },
  { name: 'DoDonPachi',                           videoId: 'nDMjMv6COIU', startTime: 0   },
  { name: 'DoDonPachi DaiFukkatsu',               videoId: 'ZCaPtpNyjf4', startTime: 0   },
  { name: 'ESP Ra.De.',                           videoId: 'P3_U1wyESiA', startTime: 0   },
  { name: 'Espgaluda',                            videoId: '5A6oJRZSFBg', startTime: 0   },
  { name: 'Gradius',                              videoId: 'nYES6OmvQFQ', startTime: 0   },
  { name: 'Gradius III',                          videoId: 'NyQzfqNIKTI', startTime: 0   },
  { name: 'Guwange',                              videoId: 'EWYuTxCV11U', startTime: 0   },
  { name: 'Hellsinker',                           videoId: 'M7vl9LzMAa8', startTime: 0   },
  { name: 'Ikaruga',                              videoId: 'fAn6XxsDDTI', startTime: 0   },
  { name: 'Jamestown',                            videoId: 'zhgBx6vSApM', startTime: 0   },
  { name: 'Ketsui',                               videoId: 'z472pIce5CY', startTime: 0   },
  { name: 'Mushihimesama',                        videoId: 'F9D-NmXX_h4', startTime: 0   },
  { name: 'Progear no Arashi',                    videoId: 'h-lt6fiIqvM', startTime: 0   },
  { name: 'Psyvariar 2',                          videoId: 'wZrKXcoHkKw', startTime: 0   },
  { name: 'R-Type',                               videoId: 'tXrxov_0oj0', startTime: 0   },
  { name: 'Radiant Silvergun',                    videoId: 'BJnkpw2dyAs', startTime: 0   },
  { name: 'Raiden',                               videoId: 'vaGenJ5GXxE', startTime: 0   },
  { name: 'RefleX',                               videoId: 'HmAJEvPLmVs', startTime: 0   },
  { name: 'Space Invaders Extreme 2',             videoId: 'hAOBf-JY1kU', startTime: 0   },
  { name: 'Strikers 1945 II',                     videoId: 'siwfJgcFYKI', startTime: 0   },
  { name: 'Thunder Force IV',                     videoId: 'IJE-iAE1Mt8', startTime: 0   },
  { name: 'Touhou: Embodiment of Scarlet Devil',  videoId: 'nazi6JmAV_c', startTime: 0   },
  { name: 'Touhou: Imperishable Night',           videoId: 'buarznoa7ms', startTime: 0   },
  { name: 'Touhou: Mountain of Faith',            videoId: '-NJWjmBT1qo', startTime: 0   },
  { name: 'Touhou: Perfect Cherry Blossom',       videoId: 'hzTtdlTAapw', startTime: 0   },
  { name: 'Touhou: Subterranean Animism',         videoId: 'MFCAB3KfBcI', startTime: 0   },
  { name: 'Tyrian',                               videoId: 'wNnTGbbDJfo', startTime: 0   },
]

export const games: Game[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }))
