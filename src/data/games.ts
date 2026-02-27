export interface GameEntry {
  name: string
  songName: string
  videoId: string
  startTime?: number // seconds into the video where the stage 1 theme begins (defaults to 0)
}

export interface Game extends GameEntry {
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
    songName: 'BOOST!', 
    videoId: 'UL-stage1',
  },
  { 
    name: 'Deathsmiles', 
    songName: 'Burning Halloween Town - Stage A-1', 
    videoId: 'LI3Z5UqqlrQ', 
  },
  { 
    name: 'DoDonPachi', 
    songName: '', 
    videoId: 'nDMjMv6COIU', 
  },
  { 
    name: 'DoDonPachi DaiFukkatsu', 
    songName: 'The Year 2008, Tokyo', 
    videoId: 'ZCaPtpNyjf4',
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
    name: 'RefleX', 
    songName: 'An Unavoidable Choice', 
    videoId: 'HmAJEvPLmVs', 
  },
  { 
    name: 'Space Invaders Extreme 2', 
    songName: 'Invader Disco', 
    videoId: 'hAOBf-JY1kU', 
  },
  { 
    name: 'Strikers 1945 II', 
    songName: "Devil's Tower",
    videoId: 'siwfJgcFYKI', 
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
