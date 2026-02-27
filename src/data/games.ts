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
  {
    name: 'Armed Police Batrider',
    songName: 'Easy to Go', 
    videoId: 'UFc72Qz3S34', 
    startTime: 0
  },
  { 
    name: 'Battle Garegga', 
    songName: 'Fly to the Leaden Sky', 
    videoId: 'Szr0TSXcWok',
    startTime: 0 
  },
  { 
    name: 'Blazing Star', 
    songName: 'Apocalypse ~ Stage 1A', 
    videoId: 'WIeUpFJ4LY4', 
    startTime: 0 
  },
  { 
    name: 'Crimzon Clover', 
    songName: 'BOOST!', 
    videoId: 'UL-stage1',
    startTime: 0 
  },
  { 
    name: 'Deathsmiles', 
    songName: 'Burning Halloween Town - Stage A-1', 
    videoId: 'LI3Z5UqqlrQ', 
    startTime: 0 
  },
  { 
    name: 'DoDonPachi', 
    songName: '', 
    videoId: 'nDMjMv6COIU', 
    startTime: 0 
  },
  { 
    name: 'DoDonPachi DaiFukkatsu', 
    songName: 'The Year 2008, Tokyo', 
    videoId: 'ZCaPtpNyjf4',
    startTime: 0 
  },
  { 
    name: 'ESP Ra.De.', 
    songName: 'DESPERATE SCHOOL (STAGE-A)', 
    videoId: 'P3_U1wyESiA', 
    startTime: 0 
  },
  { 
    name: 'Espgaluda', 
    songName: 'Bloody Separation ~ Bloody Arrival (Stage 1/Stage 5.2)', 
    videoId: '5A6oJRZSFBg', 
    startTime: 0 
  },
  { 
    name: 'Gradius', 
    songName: 'Challenger 1985', 
    videoId: 'nYES6OmvQFQ', 
    startTime: 0 
  },
  { 
    name: 'Gradius III', 
    songName: 'Sand Storm', 
    videoId: 'NyQzfqNIKTI', 
    startTime: 0 
  },
  { 
    name: 'Guwange', 
    songName: 'Falling Cherry Blossoms', 
    videoId: 'EWYuTxCV11U', 
    startTime: 0 
  },
  { 
    name: 'Hellsinker', 
    songName: 'Segment 1 BEHIND', 
    videoId: 'M7vl9LzMAa8', 
    startTime: 0 
  },
  { 
    name: 'Ikaruga', 
    songName: 'Ideal', 
    videoId: 'fAn6XxsDDTI', 
    startTime: 0 
  },
  { 
    name: 'Jamestown', 
    songName: 'War Upon the East Frontier', 
    videoId: 'zhgBx6vSApM', 
    startTime: 0 
  },
  { 
    name: 'Ketsui', 
    songName: "INTERCEPTION - Noisy Town", 
    videoId: 'z472pIce5CY', 
    startTime: 0 
  },
  { 
    name: 'Mushihimesama', 
    songName: 'To Shinju Forest', 
    videoId: 'F9D-NmXX_h4', 
    startTime: 0 
  },
  { 
    name: 'Progear no Arashi', 
    songName: 'To the Blue Sky –Stage 1–', 
    videoId: 'h-lt6fiIqvM', 
    startTime: 0 
  },
  { 
    name: 'Psyvariar 2', 
    songName: 'Weakboson - Gorge City', 
    videoId: 'wZrKXcoHkKw', 
    startTime: 0 
  },
  { 
    name: 'R-Type', 
    songName: 'START ~ BATTLE THEME (Start ~ Stage1)', 
    videoId: 'tXrxov_0oj0', 
    startTime: 0 
  },
  { 
    name: 'Radiant Silvergun', 
    songName: 'Arrival', 
    videoId: 'BJnkpw2dyAs', 
    startTime: 0 
  },
  { 
    name: 'Raiden', 
    songName: 'Gallantry', 
    videoId: 'vaGenJ5GXxE', 
    startTime: 0 
  },
  { 
    name: 'RefleX', 
    songName: 'An Unavoidable Choice', 
    videoId: 'HmAJEvPLmVs', 
    startTime: 0 
  },
  { 
    name: 'Space Invaders Extreme 2', 
    songName: 'Invader Disco', 
    videoId: 'hAOBf-JY1kU', 
    startTime: 0
  },
  { 
    name: 'Strikers 1945 II', 
    songName: "Devil's Tower",
    videoId: 'siwfJgcFYKI', 
    startTime: 0 
  },
  { 
    name: 'Thunder Force IV', 
    songName: 'Fighting Back', 
    videoId: 'IJE-iAE1Mt8', 
    startTime: 0 
  },
  { 
    name: 'Touhou 10: Mountain of Faith', 
    songName: 'A God That Misses People ~ Romantic Fall', 
    videoId: '-NJWjmBT1qo', 
    startTime: 0 
  },  
  { 
    name: 'Touhou 11: Subterranean Animism', 
    songName: 'The Dark Blowhole', 
    videoId: 'MFCAB3KfBcI', 
    startTime: 0 
  },  
  { 
    name: 'Touhou 6: Embodiment of Scarlet Devil', 
    songName: 'A Soul as Red as a Ground Cherry', 
    videoId: 'nazi6JmAV_c', 
    startTime: 0 
  },
  { 
    name: 'Touhou 7: Perfect Cherry Blossom', 
    songName: 'Paradise ~ Deep Mountain', 
    videoId: 'hzTtdlTAapw', 
    startTime: 0 
  },
  { 
    name: 'Touhou 8: Imperishable Night', 
    songName: 'Illusionary Night ~ Ghostly Eyes', 
    videoId: 'buarznoa7ms', 
    startTime: 0 
  },    
  { 
    name: 'Tyrian', 
    songName: 'Tyrian , the level', 
    videoId: 'wNnTGbbDJfo', 
    startTime: 0 
  },
]

export const games: Game[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }))
