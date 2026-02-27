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
  { id: 17, name: 'Armed Police Batrider',                videoId: '4FsqkdT9mfI', startTime: 0   },
  { id: 4,  name: 'Battle Garegga',                       videoId: 'Szr0TSXcWok', startTime: 0   },
  { id: 14, name: 'Blazing Star',                         videoId: '9HA-sHHYA38', startTime: 0   },
  { id: 9,  name: 'Crimzon Clover',                       videoId: 'yYF3x1hACIU', startTime: 0   },
  { id: 7,  name: 'Deathsmiles',                          videoId: 'LI3Z5UqqlrQ', startTime: 0   },
  { id: 2,  name: 'DoDonPachi',                           videoId: 'nDMjMv6COIU', startTime: 0   },
  { id: 16, name: 'DoDonPachi DaiFukkatsu',               videoId: 'sXFpLiCTRRY', startTime: 0   },
  { id: 11, name: 'ESP Ra.De.',                           videoId: 'P3_U1wyESiA', startTime: 0   },
  { id: 8,  name: 'Espgaluda',                            videoId: '5A6oJRZSFBg', startTime: 0   },
  { id: 26, name: 'Gradius',                              videoId: '2yHZDaXL-YM', startTime: 0   },
  { id: 18, name: 'Gradius III',                          videoId: 'uNjScRoJEyI', startTime: 0   },
  { id: 12, name: 'Guwange',                              videoId: 'Jx_7lQvSPKo', startTime: 0   },
  { id: 28, name: 'Hellsinker',                           videoId: 'nNKxC5-kKbA', startTime: 0   },
  { id: 1,  name: 'Ikaruga',                              videoId: 'fAn6XxsDDTI', startTime: 0   },
  { id: 27, name: 'Jamestown',                            videoId: 'QJ2u1GMQNCE', startTime: 0   },
  { id: 6,  name: 'Ketsui',                               videoId: 'z472pIce5CY', startTime: 0   },
  { id: 5,  name: 'Mushihimesama',                        videoId: 'F9D-NmXX_h4', startTime: 0   },
  { id: 10, name: 'Progear no Arashi',                    videoId: 'h-lt6fiIqvM', startTime: 0   },
  { id: 29, name: 'Psyvariar 2',                          videoId: 'tTobwWf1Kus', startTime: 0   },
  { id: 19, name: 'R-Type',                               videoId: 'r-vBNPAW0Dw', startTime: 0   },
  { id: 15, name: 'Radiant Silvergun',                    videoId: '3bK_hRxTyTg', startTime: 0   },
  { id: 20, name: 'Raiden',                               videoId: '7Dp0JKJVF-4', startTime: 0   },
  { id: 30, name: 'RefleX',                               videoId: 'S2Z6KTt0hew', startTime: 0   },
  { id: 13, name: 'Strikers 1945 II',                     videoId: '1RXtMBfJ1PY', startTime: 0   },
  { id: 3,  name: 'Thunder Force IV',                     videoId: 'IJE-iAE1Mt8', startTime: 0   },
  { id: 21, name: 'Touhou: Embodiment of Scarlet Devil',  videoId: 'oOqv9GHBYWE', startTime: 0   },
  { id: 23, name: 'Touhou: Imperishable Night',           videoId: 'V7ZnkLwNXeo', startTime: 0   },
  { id: 24, name: 'Touhou: Mountain of Faith',            videoId: 'D6kPpXi9zyQ', startTime: 0   },
  { id: 22, name: 'Touhou: Perfect Cherry Blossom',       videoId: 'KaUnGnHWO7o', startTime: 0   },
  { id: 25, name: 'Touhou: Subterranean Animism',         videoId: 'gxGRIMqpjYM', startTime: 0   },
]
