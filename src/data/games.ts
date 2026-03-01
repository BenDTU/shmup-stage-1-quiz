import { Series, type GameEntry, type GameEntryWithId } from '../types'

export { Series } from '../types'
export type { SongSource, GameEntry, GameListEntry, Game } from '../types'

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// Use the optional sortName property to override the sort key if the alphabetical order of the
// name alone would be misleading (e.g. sortName: 'Gradius 2' for 'Gradius II').
// IDs are auto-assigned from the array position — just add entries with singleSongSource, multipleSongSource, or arrangedSongSource.
// startTime (seconds) is optional; omit it to start from the beginning of the video.
const gameEntries: GameEntry[] = [
  {
    name: 'Armed Police Batrider',
    singleSongSource: { songName: 'Easy to Go', videoId: 'UFc72Qz3S34' },
  },
  {
    name: 'Battle Bakraid',
    singleSongSource: { songName: 'Sky Gunner', videoId: 'gb39c-VlJkA' },
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
    name: 'Cygni: All Guns Blazing',
    singleSongSource: { songName: 'Battle Over the White Sands', videoId: 'a-9kcVAaXXQ' },
  },
  {
    name: 'Daioh',
    singleSongSource: { songName: 'Stage 1', videoId: 'vqi1eM9MNPw', startTime: 62, endTime: 213 },
  },
  {
    name: 'Darius',
    series: Series.Darius,
    singleSongSource: { songName: 'CAPTAIN NEO', videoId: 'a_GP2FBiK2o' },
  },
  {
    name: 'Darius Gaiden',
    series: Series.Darius,
    singleSongSource: { songName: 'VISIONNERZ ~HALLUCINATED PEOPLE~', videoId: 'kG30WhHCnN4' },
  },
  {
    name: 'DariusBurst',
    series: Series.Darius,
    multipleSongSource: [
      { songName: 'Good-bye My Earth', videoId: 'Hi1sF3AKPHk' },
      { songName: 'Freedom', videoId: 'eKSsVzGkcqs' },
      { songName: 'Mortification of the Flesh', videoId: 'Vke1mMHGjJA' },
      { songName: 'Suite Photoconductivity ~First Tune Iron Fossil~', videoId: 'h52k2Et3AXk' },
    ]
  },
  {
    name: 'Deathsmiles',
    singleSongSource: { songName: 'Burning Halloween Town - Stage A-1', videoId: 'LI3Z5UqqlrQ' },
  },
  {
    name: 'DoDonPachi',
    series: Series.Dodonpachi,
    singleSongSource: { songName: '1 & 4 Scene BGM', videoId: 'nDMjMv6COIU' },
  },
  {
    name: 'DoDonPachi DaiFukkatsu',
    series: Series.Dodonpachi,
    singleSongSource: { songName: 'The Year 2008, Tokyo', videoId: 'ZCaPtpNyjf4' },
  },
  {
    name: 'DoDonPachi DaiOuJou',
    series: Series.Dodonpachi,
    arrangedSongSource: {
      songName: 'East Asia',
      arrangements: [
        {
          source: 'White Label',
          videoId: 'muuApOJSP9E',
        },
        {
          source: 'Black Label',
          videoId: '4nzbL7kvhBk',
        },
      ]
    }
  },
  {
    name: 'Dogyuun',
    singleSongSource: { songName: 'Dogyuun Magic', videoId: 'B5fpCSNNKsM' },
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
    series: Series.Gradius,
    singleSongSource: { songName: 'Challenger 1985', videoId: 'nYES6OmvQFQ' },
  },
  {
    name: 'Gradius II',
    sortName: 'Gradius 2',
    series: Series.Gradius,
    singleSongSource: { songName: 'Burning Heat', videoId: 'FLc1msji0_w' },
  },
  {
    name: 'Gradius III',
    series: Series.Gradius,
    singleSongSource: { songName: 'Sand Storm', videoId: 'NyQzfqNIKTI' },
  },
  {
    name: 'Gradius IV',
    series: Series.Gradius,
    singleSongSource: { songName: 'Apollon', videoId: 'kGc9HIKnqB8' },
  },
  {
    name: 'Gradius V',
    series: Series.Gradius,
    singleSongSource: { songName: 'Universe', videoId: 'KCDS-T2E_Lg' },
  },
  {
    name: 'Gun Frontier',
    singleSongSource: { songName: 'Gale in the Desert', videoId: 'JjsSvAsxTxY' },
  },
  {
    name: 'Gunnail',
    singleSongSource: { songName: 'Stage 1 & 2', videoId: 'hpzlZb-z7Kc', startTime: 97, endTime: 524 },
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
    name: 'Image Fight',
    singleSongSource: { songName: 'Introduction', videoId: 'IiT-60Y3J70' },
  },
  {
    name: 'Image Fight II: Operation Deep Striker',
    singleSongSource: { songName: 'Front Line', videoId: '9cN-9MU5-4s' },
  },
  {
    name: 'In the Hunt',
    singleSongSource: { songName: 'THE SOUTH POLE', videoId: '9F8SiVzU1QI' },
  },
  {
    name: 'In the Hunt (PlayStation)',
    singleSongSource: { songName: 'Stage 1', videoId: '7fI0-TLbPkY' },
  },
  {
    name: 'Ironclad',
    singleSongSource: { songName: 'Theme of Super Iron Brikinger', videoId: 'an9E8DuCAg8' },
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
    name: 'Mad Shark',
    singleSongSource: { songName: 'Round 1, Round 2, Round 5', videoId: '4eTABytlJZY', startTime: 9, endTime: 140 },
  },
  {
    name: 'Mazinger Z',
    singleSongSource: { songName: 'Theme of Z (Part 2)', videoId: 'uHktcVQgXys' },
  },
  {
    name: 'MUSHA',
    singleSongSource: { songName: 'Fullmetal Fighter', videoId: '0MIqgHu3tsg' },
  },
  {
    name: 'Mushihimesama',
    arrangedSongSource: {
      songName: 'To Shinju Forest',
      arrangements: [
        {
          source: '1.0',
          videoId: 'F9D-NmXX_h4',
        },
        {
          source: '1.5',
          videoId: '-NQDwvJqu6w',
        },
        {
          source: 'Arrange',
          videoId: 'y9n4Z_baho0',
        }
      ]
    }
  },
  {
    name: 'Mushihimesama Futari',
    singleSongSource: { songName: 'Setting Off Together', videoId: '2qoyJbieTOc' },
  },
  {
    name: 'Plus Alpha',
    singleSongSource: { songName: 'Wind Dancer', videoId: 'SdHAikpTE2w', startTime: 120, endTime: 207 },
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
    name: 'Pulstar',
    singleSongSource: { songName: 'Front Line on the Earth', videoId: 'IexMUkiPg-M' },
  },
  {
    name: 'R-Type',
    series: Series.RType,
    arrangedSongSource: {
      songName: 'Battle Theme',
      arrangements: [
        {
          source: 'Arcade',
          videoId: 'tXrxov_0oj0',
        },
        {
          source: 'Game Boy',
          videoId: 'co0nkC6tKrI',
        },
        {
          source: 'Dimensions',
          videoId: 'q5CBa69BhLo',
        }
      ]
    },
  },
  {
    name: 'R-Type II',
    sortName: 'R-Type 2',
    series: Series.RType,
    arrangedSongSource: {
      songName: 'Counter Attack',
      arrangements: [
        {
          source: 'Arcade',
          videoId: 'idU8lvOP9qA',
        },
        {
          source: 'Game Boy',
          videoId: 'hIC-xECNR2c',
        },
        {
          source: 'Dimensions',
          videoId: 'KtzwUQgMuZ8',
        }
      ]
    }
  },
  {
    name: 'R-Type III: The Third Lightning',
    sortName: 'R-Type 3: The Third Lightning',
    series: Series.RType,
    singleSongSource: { songName: 'Catapult Dimension', videoId: 'EsLgLrM2CbY' },
  },
  {
    name: 'R-Type Delta',
    series: Series.RType,
    singleSongSource: { songName: 'Crazy Machine', videoId: 'BMecwpal5GE' },
  },
  {
    name: 'R-Type Final',
    series: Series.RType,
    singleSongSource: { songName: 'Metropolis Quietus: Anxiety', videoId: 'n-IoVZMzlAk' },
  },
  {
    name: 'R-Type Final 2',
    series: Series.RType,
    singleSongSource: { songName: 'Investigation- Abandoned Space City', videoId: '2Gt2FHkpR4Q' },
  },
  {
    name: 'R-Type Leo',
    series: Series.RType,
    singleSongSource: { songName: 'Paradise Planet', videoId: 'yu7_I3CnDP8' },
  },
  {
    name: 'Radiant Silvergun',
    singleSongSource: { songName: 'Return', videoId: 'BJnkpw2dyAs' },
  },
  {
    name: 'Raiden',
    series: Series.Raiden,
    singleSongSource: { songName: 'Gallantry', videoId: 'vaGenJ5GXxE' },
  },
  {
    name: 'Raiden II',
    sortName: 'Raiden 2',
    series: Series.Raiden,
    singleSongSource: { songName: 'Repeated Tragedy', videoId: 'zDS4EMmETsE' },
  },
  {
    name: 'Raiden III',
    sortName: 'Raiden 3',
    series: Series.Raiden,
    arrangedSongSource: {
      songName: 'Lightning Strikes',
      arrangements: [
        {
          source: 'Original',
          videoId: 'eZ3GNGBZ3Z4',
        },
        {
          source: 'Raiden III x MIKADO MANIAX',
          videoId: 'uk0J0hEHJmU',
        },
      ]
    }
  },
  {
    name: 'Raiden IV',
    sortName: 'Raiden 4',
    series: Series.Raiden,
    arrangedSongSource: {
      songName: 'A stormy front',
      arrangements: [
        {
          source: 'Original',
          videoId: 'Yp1GUIUWyK8',
        },
        {
          source: 'Raiden IV x MiKADO Remix',
          videoId: 'lI3Yl2Hygww',
        },
      ]
    }
  },
  {
    name: 'Raiden V',
    sortName: 'Raiden 5',
    series: Series.Raiden,
    singleSongSource: { songName: 'Unknown Pollution', videoId: 'PX3vEQ-KQvs' },
  },
  {
    name: 'Raiden Fighters',
    series: Series.Raiden,
    multipleSongSource: [
      { songName: 'Souring Nature', videoId: '1r4xBHYos5A' },
      { songName: 'Task Force', videoId: '7pEYtbtAKpw' },
    ]
  },
  {
    name: 'Raiden Fighters 2: Operation Hell Dive',
    series: Series.Raiden,
    multipleSongSource: [
      { songName: 'Scramble Attack', videoId: 'epWWOylKxrc' },
      { songName: 'Tight Rope', videoId: '13nezOfe6Oc' },
    ]
  },
  {
    name: 'Raiden Fighters Jet',
    series: Series.Raiden,
    singleSongSource: { songName: 'Simulation Level 01 (Launch Base)', videoId: 'C4DFwgSpO00' },
  },
  {
    name: 'RayCrisis',
    singleSongSource: { songName: 'Lavande Bleu', videoId: 'bCBXUBBZVDU' },
  },
  {
    name: 'RayForce',
    singleSongSource: { songName: 'Penetration', videoId: '234tjx8yO1I' },
  },
  {
    name: 'RayStorm',
    singleSongSource: { songName: 'Geometric City', videoId: 'kP5huZQRAY4' },
  },
  {
    name: 'RefleX',
    singleSongSource: { songName: 'An Unavoidable Choice', videoId: 'HmAJEvPLmVs' },
  },
  {
    name: 'REZON',
    singleSongSource: { songName: 'Stage 1 & 4', videoId: 'ZAKUutWAdDM', startTime: 2, endTime: 31 },
  },
  {
    name: 'Shienryu',
    singleSongSource: { songName: 'Stage 1', videoId: '4tk9RUiRplw' },
  },
  {
    name: 'Space Invaders (1999)',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Pluto', videoId: 'ufKFko1q5XM' },
  },
  {
    name: 'Space Invaders (Game Boy Advance)',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Track 1', videoId: 'XUXYxZjt2VI' },
  },
  {
    name: 'Space Invaders (Game Boy Color)',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Mercury', videoId: 'DPQlZDOJPSw' },
  },
  {
    name: 'Space Invaders Extreme',
    series: Series.SpaceInvaders,
    arrangedSongSource: {
      songName: 'invAde yOu',
      arrangements: [
        {
          source: 'DS',
          videoId: 'qpZdqEgRNYA',
        },
        {
          source: 'Steam',
          videoId: 'hY93BSMTU4A',
        },
      ]
    }
  },
  {
    name: 'Space Invaders Extreme 2',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Invader Disco', videoId: 'hAOBf-JY1kU' },
  },
  {
    name: 'Space Invaders Extreme HD',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Digging My Scene', videoId: 'HVI6UPyqPuk' },
  },
  {
    name: 'Space Invaders Infinity Gene',
    series: Series.SpaceInvaders,
    singleSongSource: { songName: 'Selection (Genetic)', videoId: 'N3EJltfL7ok' },
  },
  {
    name: 'Strikers 1945',
    series: Series.Strikers1945,
    multipleSongSource: [
      { songName: 'Rising Sun', videoId: 'TDPkOiNPqQA' },
      { songName: 'Shadow of Reich', videoId: 'pCVV3uTgqrE' },
      { songName: 'Flying Wing', videoId: 'lnHOTuI5jHU' },
      { songName: 'White Hell', videoId: 'VoPpcldi1Qc' },
    ]
  },
  {
    name: 'Strikers 1945 II',
    series: Series.Strikers1945,
    multipleSongSource: [
      { songName: "Devil's Tower", videoId: 'siwfJgcFYKI' },
      { songName: 'Far from Cloud City', videoId: 'qOuf82IRzH0' },
      { songName: 'Battle of Extreme North', videoId: 'jQRQlpPJwE0' },
      { songName: 'Infinity Orbit', videoId: 'BhPYYhzPcSE' },
    ]
  },
  {
    name: 'Strikers 1945 III',
    series: Series.Strikers1945,
    multipleSongSource: [
      { songName: 'Interval of a Huge Gorge', videoId: 'I1qn96QAQXA' },
      { songName: 'Sea of Battle', videoId: 'tvw-jInWc_o' },
      { songName: 'Turn Red', videoId: '-xGu9BfDTnE' },
      { songName: 'Rest of a Bomb', videoId: 'A8dyebZ-Thk' },
    ]
  },
  {
    name: 'Strikers 1945 Plus',
    series: Series.Strikers1945,
    multipleSongSource: [
      { songName: 'Sky Stage', videoId: 'Hwm6PLQ3X6s' },
      { songName: 'Sea Stage', videoId: 'skJr2TO7u3E' },
      { songName: 'Colliery Stage', videoId: '1valAlFDLRI' },
      { songName: 'Street Stage', videoId: 'NcSIHrnG5lA' },
    ]
  },
  {
    name: 'Super R-Type',
    series: Series.RType,
    singleSongSource: { songName: 'Super Sortie', videoId: 'YuGRrVMLkxk' },
  },
  {
    name: 'Super Spacefortress Macross',
    singleSongSource: { songName: 'Stage 1 & 4', videoId: 'FyVBI2GA_mg', startTime: 220, endTime: 322 },
  },
  {
    name: 'Super Spacefortress Macross II',
    singleSongSource: { songName: 'SCOOPER', videoId: 'wnlpgkfsor0' }, // NOTE: Medium and Expert course themes don't seem to be on Youtube
  },
  {
    name: 'Thunder Dragon',
    singleSongSource: { songName: 'Wild Thunder', videoId: 'W6GrFBQUVKE', startTime: 72, endTime: 538 },
  },
  {
    name: 'Thunder Dragon II',
    singleSongSource: { songName: 'Fly to Live I', videoId: 'Gtz9ZfaG2m8' },
  },
  {
    name: 'Thunder Force IV',
    singleSongSource: { songName: 'Fighting Back', videoId: 'IJE-iAE1Mt8' },
  },
  {
    name: 'Touhou 6: Embodiment of Scarlet Devil',
    series: Series.Touhou,
    singleSongSource: { songName: 'A Soul as Red as a Ground Cherry', videoId: 'nazi6JmAV_c' },
  },
  {
    name: 'Touhou 7: Perfect Cherry Blossom',
    series: Series.Touhou,
    singleSongSource: { songName: 'Paradise ~ Deep Mountain', videoId: 'hzTtdlTAapw' },
  },
  {
    name: 'Touhou 8: Imperishable Night',
    series: Series.Touhou,
    singleSongSource: { songName: 'Illusionary Night ~ Ghostly Eyes', videoId: 'buarznoa7ms' },
  },
  {
    name: 'Touhou 9: Phantasmagoria of Flower View',
    series: Series.Touhou,
    singleSongSource: { songName: 'Spring Lane ~ Colorful Path', videoId: 'LfqQa6JDlS8' },
  },
  {
    name: 'Touhou 10: Mountain of Faith',
    series: Series.Touhou,
    singleSongSource: {
      songName: 'A God That Misses People ~ Romantic Fall',
      videoId: '-NJWjmBT1qo',
    },
  },
  {
    name: 'Touhou 11: Subterranean Animism',
    series: Series.Touhou,
    singleSongSource: { songName: 'The Dark Blowhole', videoId: 'MFCAB3KfBcI' },
  },
  {
    name: 'Touhou 12: Undefined Fantastic Object',
    series: Series.Touhou,
    singleSongSource: { songName: 'At the End of Spring', videoId: 'nn2BUBM-hQ4' },
  },
  {
    name: 'Touhou 13: Ten Desires',
    series: Series.Touhou,
    singleSongSource: { songName: 'Night Sakura of Dead Spirits', videoId: 'S_s2InH_pFk' },
  },
  {
    name: 'Touhou 14: Double Dealing Character',
    series: Series.Touhou,
    singleSongSource: { songName: 'Mist Lake', videoId: 'mo1glRtlyTg' },
  },
  {
    name: 'Touhou 15: Legacy of Lunatic Kingdom',
    series: Series.Touhou,
    singleSongSource: { songName: 'Unforgettable, the Nostalgic Greenery', videoId: 'ucuIXF4YwNY' },
  },
  {
    name: 'Touhou 16: Hidden Star in Four Seasons',
    series: Series.Touhou,
    singleSongSource: { songName: 'A Star of Hope Rises in the Blue Sky', videoId: 'PVva0VzDAR8' },
  },
  {
    name: 'Touhou 17: Wily Beast and Weakest Creature',
    series: Series.Touhou,
    singleSongSource: { songName: 'The Lamentations Known Only by Jizo', videoId: 'uJ6VscWKMzA' },
  },
  {
    name: 'Touhou 18: Unconnected Marketeers',
    series: Series.Touhou,
    singleSongSource: { songName: 'A Shower of Strange Occurrences', videoId: 'W3HOWV3aY_s' },
  },
  {
    name: 'Touhou 19: Unfinished Dream of All Living Ghost',
    series: Series.Touhou,
    singleSongSource: { songName: 'The World is Made in an Adorable Way', videoId: 'RpvCTe2FN1E' },
  },
  {
    name: 'Touhou 20: Fossilized Wonders',
    series: Series.Touhou,
    singleSongSource: { songName: 'Beloved Dwelling of Dust', videoId: 'SSZT4pV3RFA' },
  },
  {
    name: 'Truxton',
    arrangedSongSource: {
      songName: 'Brave Man, Far Away',
      arrangements: [
        {
          source: 'Arcade',
          videoId: 'HjuWpzKt5QQ',
        },
        {
          source: 'Mega Drive',
          videoId: 'rWD0BEHbl2I',
        },
        {
          source: 'PC Engine',
          videoId: 'BpT6wqbxeeM',
        },
      ]
    }
  },
  {
    name: 'Truxton II',
    singleSongSource: { songName: 'Live in Future', videoId: 'xgxFHJZrAfc' },
  },
  {
    name: 'Turbo Force',
    singleSongSource: { songName: 'Stage 1 & 6', videoId: 'QB4vsrMuWNM' },
  },
  {
    name: 'Tyrian',
    singleSongSource: { songName: 'Tyrian , the level', videoId: 'wNnTGbbDJfo' },
  },
  {
    name: 'Viper Phase 1',
    singleSongSource: { songName: 'Go Straight Ahead', videoId: 'GUILDdRfmxw' },
  },
  {
    name: 'X-Multiply',
    singleSongSource: { songName: 'Into the Human Body', videoId: 'MwwduquIWIo' },
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
