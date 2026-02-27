export interface GameEntry {
  name: string
  songName: string
  videoId: string
  startTime: number // seconds into the video where the stage 1 theme begins
}

export interface Game extends GameEntry {
  id: number
}

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// IDs are auto-assigned from the array position — just add { name, songName, videoId, startTime }.
const gameEntries: GameEntry[] = [
  { name: 'Armed Police Batrider',                songName: 'Down Town',                                         videoId: 'UFc72Qz3S34', startTime: 0   },
  { name: 'Battle Garegga',                       songName: 'Stab and Stomp!',                                   videoId: 'Szr0TSXcWok', startTime: 0   },
  { name: 'Blazing Star',                         songName: 'Scramble',                                          videoId: 'WIeUpFJ4LY4', startTime: 0   },
  { name: 'Crimzon Clover',                       songName: 'BOOST!',                                            videoId: 'yYF3x1hACIU', startTime: 0   },
  { name: 'Deathsmiles',                          songName: 'Titania',                                           videoId: 'LI3Z5UqqlrQ', startTime: 0   },
  { name: 'DoDonPachi',                           songName: 'DoDonPachi',                                        videoId: 'nDMjMv6COIU', startTime: 0   },
  { name: 'DoDonPachi DaiFukkatsu',               songName: 'Resurrection',                                      videoId: 'ZCaPtpNyjf4', startTime: 0   },
  { name: 'ESP Ra.De.',                           songName: 'Full Metal Fighter',                                videoId: 'P3_U1wyESiA', startTime: 0   },
  { name: 'Espgaluda',                            songName: 'Blue Planet',                                       videoId: '5A6oJRZSFBg', startTime: 0   },
  { name: 'Gradius',                              songName: 'Challenger 1985',                                   videoId: 'nYES6OmvQFQ', startTime: 0   },
  { name: 'Gradius III',                          songName: 'Departure for Space',                               videoId: 'NyQzfqNIKTI', startTime: 0   },
  { name: 'Guwange',                              songName: 'Guwange',                                           videoId: 'EWYuTxCV11U', startTime: 0   },
  { name: 'Hellsinker',                           songName: 'Crimson Knife',                                     videoId: 'M7vl9LzMAa8', startTime: 0   },
  { name: 'Ikaruga',                              songName: 'Ideal',                                             videoId: 'fAn6XxsDDTI', startTime: 0   },
  { name: 'Jamestown',                            songName: 'Croatoa',                                           videoId: 'zhgBx6vSApM', startTime: 0   },
  { name: 'Ketsui',                               songName: "DON'T STOP CARRY ON",                               videoId: 'z472pIce5CY', startTime: 0   },
  { name: 'Mushihimesama',                        songName: 'Tribal Wind',                                       videoId: 'F9D-NmXX_h4', startTime: 0   },
  { name: 'Progear no Arashi',                    songName: 'Theme of Progear',                                  videoId: 'h-lt6fiIqvM', startTime: 0   },
  { name: 'Psyvariar 2',                          songName: 'Ouroboros',                                         videoId: 'wZrKXcoHkKw', startTime: 0   },
  { name: 'R-Type',                               songName: 'The War to End All Wars',                           videoId: 'tXrxov_0oj0', startTime: 0   },
  { name: 'Radiant Silvergun',                    songName: 'Silversword',                                       videoId: 'BJnkpw2dyAs', startTime: 0   },
  { name: 'Raiden',                               songName: 'Holy War',                                          videoId: 'vaGenJ5GXxE', startTime: 0   },
  { name: 'RefleX',                               songName: 'Wanderer',                                          videoId: 'HmAJEvPLmVs', startTime: 0   },
  { name: 'Space Invaders Extreme 2',             songName: 'Stage 1',                                           videoId: 'hAOBf-JY1kU', startTime: 0   },
  { name: 'Strikers 1945 II',                     songName: 'Take Off',                                          videoId: 'siwfJgcFYKI', startTime: 0   },
  { name: 'Thunder Force IV',                     songName: 'Lightning Strikes Again',                           videoId: 'IJE-iAE1Mt8', startTime: 0   },
  { name: 'Touhou: Embodiment of Scarlet Devil',  songName: 'Apparitions Stalk the Night',                      videoId: 'nazi6JmAV_c', startTime: 0   },
  { name: 'Touhou: Imperishable Night',           songName: 'Illusionary Night ~ Ghostly Eyes',                 videoId: 'buarznoa7ms', startTime: 0   },
  { name: 'Touhou: Mountain of Faith',            songName: 'The Road of the Misfortune God ~ Dark Road',        videoId: '-NJWjmBT1qo', startTime: 0   },
  { name: 'Touhou: Perfect Cherry Blossom',       songName: 'Mystic Oriental Love Consultation',                 videoId: 'hzTtdlTAapw', startTime: 0   },
  { name: 'Touhou: Subterranean Animism',         songName: "Darkness of Bhava-Agra ~ As Seen Through a Child's Eyes", videoId: 'MFCAB3KfBcI', startTime: 0   },
  { name: 'Tyrian',                               songName: 'Asteroid Dance (Part 1)',                           videoId: 'wNnTGbbDJfo', startTime: 0   },
]

export const games: Game[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }))
