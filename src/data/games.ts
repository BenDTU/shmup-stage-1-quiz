export interface Game {
  id: number
  name: string
  videoId: string
  startTime: number // seconds into the video where the stage 1 theme begins
}

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
export const games: Game[] = [
  { id: 17, name: 'Armed Police Batrider',                videoId: 'UFc72Qz3S34', startTime: 0   },
  { id: 4,  name: 'Battle Garegga',                       videoId: 'Szr0TSXcWok', startTime: 0   },
  { id: 14, name: 'Blazing Star',                         videoId: 'WIeUpFJ4LY4', startTime: 0   },
  { id: 9,  name: 'Crimzon Clover',                       videoId: 'yYF3x1hACIU', startTime: 0   },
  { id: 7,  name: 'Deathsmiles',                          videoId: 'LI3Z5UqqlrQ', startTime: 0   },
  { id: 2,  name: 'DoDonPachi',                           videoId: 'nDMjMv6COIU', startTime: 0   },
  { id: 16, name: 'DoDonPachi DaiFukkatsu',               videoId: 'sXFpLiCTRRY', startTime: 0   },
  { id: 11, name: 'ESP Ra.De.',                           videoId: 'P3_U1wyESiA', startTime: 0   },
  { id: 8,  name: 'Espgaluda',                            videoId: '5A6oJRZSFBg', startTime: 0   },
  { id: 26, name: 'Gradius',                              videoId: '2yHZDaXL-YM', startTime: 0   },
  { id: 18, name: 'Gradius III',                          videoId: 'NyQzfqNIKTI', startTime: 0   },
  { id: 12, name: 'Guwange',                              videoId: 'EWYuTxCV11U', startTime: 0   },
  { id: 28, name: 'Hellsinker',                           videoId: 'M7vl9LzMAa8', startTime: 0   },
  { id: 1,  name: 'Ikaruga',                              videoId: 'fAn6XxsDDTI', startTime: 0   },
  { id: 27, name: 'Jamestown',                            videoId: 'zhgBx6vSApM', startTime: 0   },
  { id: 6,  name: 'Ketsui',                               videoId: 'z472pIce5CY', startTime: 0   },
  { id: 5,  name: 'Mushihimesama',                        videoId: 'F9D-NmXX_h4', startTime: 0   },
  { id: 10, name: 'Progear no Arashi',                    videoId: 'h-lt6fiIqvM', startTime: 0   },
  { id: 29, name: 'Psyvariar 2',                          videoId: 'wZrKXcoHkKw', startTime: 0   },
  { id: 19, name: 'R-Type',                               videoId: 'tXrxov_0oj0', startTime: 0   },
  { id: 15, name: 'Radiant Silvergun',                    videoId: 'BJnkpw2dyAs', startTime: 0   },
  { id: 20, name: 'Raiden',                               videoId: 'vaGenJ5GXxE', startTime: 0   },
  { id: 30, name: 'RefleX',                               videoId: 'HmAJEvPLmVs', startTime: 0   },
  { id: 13, name: 'Strikers 1945 II',                     videoId: '1RXtMBfJ1PY', startTime: 0   },
  { id: 3,  name: 'Thunder Force IV',                     videoId: 'IJE-iAE1Mt8', startTime: 0   },
  { id: 21, name: 'Touhou: Embodiment of Scarlet Devil',  videoId: 'nazi6JmAV_c', startTime: 0   },
  { id: 23, name: 'Touhou: Imperishable Night',           videoId: 'buarznoa7ms', startTime: 0   },
  { id: 24, name: 'Touhou: Mountain of Faith',            videoId: '-NJWjmBT1qo', startTime: 0   },
  { id: 22, name: 'Touhou: Perfect Cherry Blossom',       videoId: 'hzTtdlTAapw', startTime: 0   },
  { id: 25, name: 'Touhou: Subterranean Animism',         videoId: 'MFCAB3KfBcI', startTime: 0   },
]
