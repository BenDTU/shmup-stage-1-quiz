export interface Game {
  id: number
  name: string
  videoId: string
  startTime: number // seconds into the video where the stage 1 theme begins
}

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
export const games: Game[] = [
  { id: 1,  name: 'Ikaruga',                              videoId: 'XLunK8a_0Xo', startTime: 0   },
  { id: 2,  name: 'DoDonPachi',                           videoId: 'W7HgCnfuH7M', startTime: 0   },
  { id: 3,  name: 'Thunder Force IV',                     videoId: '8YQpT9TpNdY', startTime: 0   },
  { id: 4,  name: 'Battle Garegga',                       videoId: 'L_MqL5SRFzg', startTime: 0   },
  { id: 5,  name: 'Mushihimesama',                        videoId: 'g9vWPcVQSWw', startTime: 0   },
  { id: 6,  name: 'Ketsui',                               videoId: 'v3N6Xsrfcz8', startTime: 0   },
  { id: 7,  name: 'Deathsmiles',                          videoId: 'KP_OEyvbBbM', startTime: 0   },
  { id: 8,  name: 'Espgaluda',                            videoId: 'YfWRnEiswqg', startTime: 0   },
  { id: 9,  name: 'Crimzon Clover',                       videoId: 'GwAXr2pVMIU', startTime: 0   },
  { id: 10, name: 'Progear no Arashi',                    videoId: '2ZbMaM9Vxf4', startTime: 0   },
  { id: 11, name: 'ESP Ra.De.',                           videoId: '4xq7M0MGCGE', startTime: 0   },
  { id: 12, name: 'Guwange',                              videoId: 'Jx_7lQvSPKo', startTime: 0   },
  { id: 13, name: 'Strikers 1945 II',                     videoId: '1RXtMBfJ1PY', startTime: 0   },
  { id: 14, name: 'Blazing Star',                         videoId: '9HA-sHHYA38', startTime: 0   },
  { id: 15, name: 'Radiant Silvergun',                    videoId: '3bK_hRxTyTg', startTime: 0   },
  { id: 16, name: 'DoDonPachi DaiFukkatsu',               videoId: 'sXFpLiCTRRY', startTime: 0   },
  { id: 17, name: 'Armed Police Batrider',                videoId: '4FsqkdT9mfI', startTime: 0   },
  { id: 18, name: 'Gradius III',                          videoId: 'uNjScRoJEyI', startTime: 0   },
  { id: 19, name: 'R-Type',                               videoId: 'r-vBNPAW0Dw', startTime: 0   },
  { id: 20, name: 'Raiden',                               videoId: '7Dp0JKJVF-4', startTime: 0   },
  { id: 21, name: 'Touhou: Embodiment of Scarlet Devil',  videoId: 'oOqv9GHBYWE', startTime: 0   },
  { id: 22, name: 'Touhou: Perfect Cherry Blossom',       videoId: 'KaUnGnHWO7o', startTime: 0   },
  { id: 23, name: 'Touhou: Imperishable Night',           videoId: 'V7ZnkLwNXeo', startTime: 0   },
  { id: 24, name: 'Touhou: Mountain of Faith',            videoId: 'D6kPpXi9zyQ', startTime: 0   },
  { id: 25, name: 'Touhou: Subterranean Animism',         videoId: 'gxGRIMqpjYM', startTime: 0   },
  { id: 26, name: 'Gradius',                              videoId: '2yHZDaXL-YM', startTime: 0   },
  { id: 27, name: 'Jamestown',                            videoId: 'QJ2u1GMQNCE', startTime: 0   },
  { id: 28, name: 'Hellsinker',                           videoId: 'nNKxC5-kKbA', startTime: 0   },
  { id: 29, name: 'Psyvariar 2',                          videoId: 'tTobwWf1Kus', startTime: 0   },
  { id: 30, name: 'RefleX',                               videoId: 'S2Z6KTt0hew', startTime: 0   },
]
