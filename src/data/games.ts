import { Series, type GameEntry, type GameEntryWithId, type NoSoundTrackGameEntry } from '../types'

export { Series } from '../types'
export type { SongEntry, GameEntry, GameListEntry, Game, NoSoundTrackGameEntry } from '../types'

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// Use the optional sortName property to override the sort key if the alphabetical order of the
// name alone would be misleading (e.g. sortName: 'Gradius 2' for 'Gradius II').
// IDs are auto-assigned from the array position — just add entries with songSource.
// startTime (seconds) is optional; omit it to start from the beginning of the video.
const gameEntries: GameEntry[] = [
    {
        name: 'Armed Police Batrider',
        songSource: { songName: 'Easy to Go', videoId: 'UFc72Qz3S34' },
    },
    {
        name: 'Assault Shell',
        songSource: { songName: 'Assault Launch', videoId: 'ypFovFbi0dw' },
    },
    {
        name: 'Axelay',
        songSource: { songName: 'Unkai', videoId: 'pTQ_jezNUxE' },
    },
    {
        name: 'Battle Bakraid',
        songSource: { songName: 'Sky Gunner', videoId: 'gb39c-VlJkA' },
    },
    {
        name: 'Battle Garegga',
        songSource: { songName: 'Fly to the Leaden Sky', videoId: 'Szr0TSXcWok' },
    },
    {
        name: 'BioMetal (JP)',
        songSource: { songName: 'Dark Clouds', videoId: 'DMhmwXbPcYg' },
    },
    {
        name: 'BioMetal (US)',
        songSource: { songName: 'Twilight Zone', videoId: '6N3Bfm057xM' },
    },
    {
        name: 'Blazing Star',
        songSource: { songName: 'Apocalypse ~ Stage 1A', videoId: 'WIeUpFJ4LY4' },
    },
    {
        name: 'Castle of Shikigami',
        alias: ['Mobile Light Force 2'],
        series: Series.CastleOfShikigami,
        songSource: { songName: 'July 23rd - 00:12', videoId: '5IjDEcQpCpw' },
    },
    {
        name: 'Castle of Shikigami 2',
        alias: ['Castle Shikigami 2', 'Castle Shikigami II: War of the Worlds'],
        series: Series.CastleOfShikigami,
        songSource: { songName: 'Flying', videoId: 'XTHF0LHUOo8' },
    },
    {
        name: 'Castle of Shikigami 3',
        alias: ['Castle of Shikigami III'],
        series: Series.CastleOfShikigami,
        songSource: { songName: 'In the Heavens', videoId: 'dKjPet2iESs' },
    },
    {
        name: 'Crimzon Clover',
        songSource: { songName: 'UL-stage1', videoId: 'yYF3x1hACIU' },
    },
    {
        name: 'Cygni: All Guns Blazing',
        songSource: { songName: 'Battle Over the White Sands', videoId: 'a-9kcVAaXXQ' },
    },
    {
        name: 'Cyvern: The Dragon Weapons',
        songSource: { songName: 'Stage 1', videoId: 'RcwYz6ZLgy0' },
    },
    {
        name: 'Daioh',
        songSource: { songName: 'Stage 1', videoId: 'vqi1eM9MNPw', startTime: 62, endTime: 213 },
    },
    {
        name: 'Darius',
        series: Series.Darius,
        songSource: { songName: 'CAPTAIN NEO', videoId: 'a_GP2FBiK2o' },
    },
    {
        name: 'Darius Gaiden',
        series: Series.Darius,
        songSource: { songName: 'VISIONNERZ ~HALLUCINATED PEOPLE~', videoId: 'kG30WhHCnN4' },
    },
    {
        name: 'Dariusburst',
        alias: [
            'Dariusburst: Another Chronicle',
            'Dariusburst: Another Chronicle EX',
            'Dariusburst: Second Prologue',
            'Dariusburst: Chronicle Saviours',
            'Dariusburst: Another Chronicle EX+',
            'Dariusburst: CS Core + Taito/Sega Pack'
        ],
        series: Series.Darius,
        songSource: [
            { songName: 'Good-bye My Earth', videoId: 'Hi1sF3AKPHk' },
            { songName: 'Freedom', videoId: 'eKSsVzGkcqs' },
            { songName: 'Mortification of the Flesh', videoId: 'Vke1mMHGjJA' },
            { songName: 'Suite Photoconductivity ~First Tune Iron Fossil~', videoId: 'h52k2Et3AXk' },
        ]
    },
    {
        name: 'Deathsmiles',
        songSource: { songName: 'Burning Halloween Town - Stage A-1', videoId: 'LI3Z5UqqlrQ' },
    },
    {
        name: 'Deltazeal',
        alias: 'G-Stream G2020',
        series: Series.Zeal,
        songSource: { songName: 'Stage 1 & 4', videoId: '6xG4t2wE0rM' },
    },
    {
        name: 'DoDonPachi',
        sortName: 'Dodonpachi 1',
        series: Series.Dodonpachi,
        songSource: { songName: '1 & 4 Scene BGM', videoId: 'nDMjMv6COIU' },
    },
    {
        name: 'DoDonPachi Blissful Death',
        alias: 'DoDonPachi DaiOuJou',
        sortName: 'Dodonpachi 2',
        series: Series.Dodonpachi,
        songSource: {
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
        name: 'DoDonPachi Resurrection',
        alias: 'DoDonPachi DaiFukkatsu',
        sortName: 'Dodonpachi 3',
        series: Series.Dodonpachi,
        songSource: { songName: 'The Year 2008, Tokyo', videoId: 'ZCaPtpNyjf4' },
    },
    {
        name: 'DoDonPachi SaiDaiOuJou',
        sortName: 'Dodonpachi 4',
        series: Series.Dodonpachi,
        songSource: { songName: 'Ran', videoId: 'GFlCCYlXcE8' },
    },
    {
        name: 'Dogyuun',
        songSource: { songName: 'Dogyuun Magic', videoId: 'B5fpCSNNKsM' },
    },
    {
        name: 'Drainus',
        songSource: { songName: 'Determination -STAGE 1-', videoId: 'ppgo1QkNNxk' },
    },
    {
        name: 'ESP Ra.De.',
        songSource: [
            { songName: 'DESPERATE SCHOOL (STAGE-A)', videoId: 'P3_U1wyESiA' },
            { songName: 'NIGHTMARE (STAGE-B)', videoId: 'ZoxoMoDZ-0A' },
            { songName: 'ACT IN JUDGE (STAGE-C)', videoId: 'q8s0A1R_c6k' },
        ]
    },
    {
        name: 'Espgaluda',
        songSource: {
            songName: 'Bloody Separation ~ Bloody Arrival (Stage 1/Stage 5.2)',
            videoId: '5A6oJRZSFBg',
        },
    },
    {
        name: 'Ex-Calibre',
        songSource: { songName: "Cruisin'", videoId: 'ddJJ_geDcYU' },
    },
    {
        name: 'G-Darius',
        series: Series.Darius,
        songSource: { songName: 'G-Zero', videoId: 'yratOaX9qhY' },
    },
    {
        name: 'Gekirindan',
        songSource: { songName: 'Pure Spirit', videoId: 'OijiF6r1Xfc' },
    },
    {
        name: 'Gradius',
        alias: 'Nemesis',
        series: Series.Gradius,
        songSource: { songName: 'Challenger 1985', videoId: 'nYES6OmvQFQ' },
    },
    {
        name: 'Gradius II',
        alias: 'Vulcan Venture',
        sortName: 'Gradius 2',
        series: Series.Gradius,
        songSource: { songName: 'Burning Heat', videoId: 'FLc1msji0_w' },
    },
    {
        name: 'Gradius III',
        sortName: 'Gradius 3',
        series: Series.Gradius,
        songSource: { songName: 'Sand Storm', videoId: 'NyQzfqNIKTI' },
    },
    {
        name: 'Gradius IV',
        sortName: 'Gradius 4',
        series: Series.Gradius,
        songSource: { songName: 'Apollon', videoId: 'kGc9HIKnqB8' },
    },
    {
        name: 'Gradius V',
        sortName: 'Gradius 5',
        series: Series.Gradius,
        songSource: { songName: 'Universe', videoId: 'KCDS-T2E_Lg' },
    },
    {
        name: 'Gradius Gaiden',
        series: Series.Gradius,
        songSource: { songName: 'Sky 1 & 2', videoId: '4zZXuvaq5sA' },
    },
    {
        name: 'Gun Frontier',
        songSource: { songName: 'Gale in the Desert', videoId: 'JjsSvAsxTxY' },
    },
    {
        name: 'Gunnail',
        songSource: { songName: 'Stage 1 & 2', videoId: 'hpzlZb-z7Kc', startTime: 97, endTime: 524 },
    },
    {
        name: 'Gunvein',
        songSource: { songName: 'Highway Chaos', videoId: 'vpYeipFZ0kQ' },
    },
    {
        name: 'Guwange',
        songSource: { songName: 'Falling Cherry Blossoms', videoId: 'EWYuTxCV11U' },
    },
    {
        name: 'Hellfire',
        songSource: { songName: 'Captain Lancer', videoId: '1VUMGMKTnKs' },
    },
    {
        name: 'Hellsinker',
        songSource: { songName: 'Segment 1 BEHIND', videoId: 'M7vl9LzMAa8' },
    },
    {
        name: 'Hotdog Storm',
        songSource: { songName: 'Stage 1', videoId: 'lHGdbyX82TE' },
    },
    {
        name: 'Ikaruga',
        songSource: { songName: 'Ideal', videoId: 'fAn6XxsDDTI' },
    },
    {
        name: 'Image Fight',
        songSource: { songName: 'Introduction', videoId: 'IiT-60Y3J70' },
    },
    {
        name: 'Image Fight II: Operation Deep Striker',
        songSource: { songName: 'Front Line', videoId: '9cN-9MU5-4s' },
    },
    {
        name: 'In the Hunt',
        songSource: { songName: 'THE SOUTH POLE', videoId: '9F8SiVzU1QI' },
    },
    {
        name: 'In the Hunt (PlayStation)',
        songSource: { songName: 'Stage 1', videoId: '7fI0-TLbPkY' },
    },
    {
        name: 'Ironclad',
        songSource: { songName: 'Theme of Super Iron Brikinger', videoId: 'an9E8DuCAg8' },
    },
    {
        name: 'Jamestown',
        songSource: { songName: 'War Upon the East Frontier', videoId: 'zhgBx6vSApM' },
    },
    {
        name: 'Judgement Silversword',
        songSource: { songName: 'BGM 01', videoId: '-VIXuLTGoYo', startTime: 0, endTime: 123 },
    },
    {
        name: 'Ketsui',
        songSource: { songName: 'INTERCEPTION - Noisy Town', videoId: 'z472pIce5CY' },
    },
    {
        name: 'Last Resort',
        songSource: { songName: 'Jack to the Metro', videoId: 'HAGArKEC_M8' },
    },
    {
        name: 'Macross Plus',
        series: Series.Macross,
        songSource: { songName: 'Area 1', videoId: 'h-VuFFy7LRA' },
    },
    {
        name: 'Macross: Scrambled Valkyrie',
        series: Series.Macross,
        songSource: { songName: 'Space', videoId: 'FZQhG8E6sQ8' },
    },
    {
        name: 'Mad Shark',
        songSource: { songName: 'Round 1, Round 2, Round 5', videoId: '4eTABytlJZY', startTime: 9, endTime: 140 },
    },
    {
        name: 'Mazinger Z',
        songSource: { songName: 'Theme of Z (Part 2)', videoId: 'uHktcVQgXys' },
    },
    {
        name: 'MUSHA',
        songSource: { songName: 'Fullmetal Fighter', videoId: '0MIqgHu3tsg' },
    },
    {
        name: 'Mushihimesama',
        songSource: {
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
        songSource: { songName: 'Setting Off Together', videoId: '2qoyJbieTOc' },
    },
    {
        name: 'PD Ultraman Invader',
        songSource: { songName: 'Ultraman', videoId: 'UD8ILryBKPY' },
    },
    {
        name: 'Platypus',
        songSource: { songName: 'Stage 1', videoId: 'UJ-9PA9bXY0' },
    },
    {
        name: 'Platypus II',
        songSource: { songName: 'Stage 1', videoId: '4gV49IcGS30' },
    },
    {
        name: 'Plus Alpha',
        songSource: { songName: 'Wind Dancer', videoId: 'SdHAikpTE2w', startTime: 120, endTime: 207 },
    },
    {
        name: 'Progear no Arashi',
        songSource: { songName: 'To the Blue Sky –Stage 1–', videoId: 'h-lt6fiIqvM' },
    },
    {
        name: 'ProtoCorgi',
        songSource: { songName: 'Leviathan 1', videoId: 'UzpRYgSCwds' },
    },
    {
        name: 'Psyvariar 2',
        songSource: { songName: 'Weakboson - Gorge City', videoId: 'wZrKXcoHkKw' },
    },
    {
        name: 'Pulstar',
        songSource: { songName: 'Front Line on the Earth', videoId: 'IexMUkiPg-M' },
    },
    {
        name: 'R-Type',
        series: Series.RType,
        songSource: {
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
        songSource: {
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
        songSource: { songName: 'Catapult Dimension', videoId: 'EsLgLrM2CbY' },
    },
    {
        name: 'R-Type Delta',
        series: Series.RType,
        songSource: { songName: 'Crazy Machine', videoId: 'BMecwpal5GE' },
    },
    {
        name: 'R-Type Final',
        series: Series.RType,
        songSource: { songName: 'Metropolis Quietus: Anxiety', videoId: 'n-IoVZMzlAk' },
    },
    {
        name: 'R-Type Final 2',
        series: Series.RType,
        songSource: { songName: 'Investigation- Abandoned Space City', videoId: '2Gt2FHkpR4Q' },
    },
    {
        name: 'R-Type Leo',
        series: Series.RType,
        songSource: { songName: 'Paradise Planet', videoId: 'yu7_I3CnDP8' },
    },
    {
        name: 'Radiant Silvergun',
        songSource: { songName: 'Return', videoId: 'BJnkpw2dyAs' },
    },
    {
        name: 'Raiden',
        series: Series.Raiden,
        songSource: {
            songName: 'Gallantry',
            arrangements: [
                {
                    source: 'Original',
                    videoId: 'vaGenJ5GXxE',
                },
                {
                    source: 'The Raiden Project',
                    videoId: 'W6DvMtQGTpY',
                },
            ]
        },
    },
    {
        name: 'Raiden II',
        alias: 'Raiden DX',
        sortName: 'Raiden 2',
        series: Series.Raiden,
        songSource: {
            songName: 'Repeated Tragedy',
            arrangements: [
                {
                    source: 'Original',
                    videoId: 'zDS4EMmETsE',
                },
                {
                    source: 'The Raiden Project',
                    videoId: 'dT_6ixCATBw',
                },
            ]
        },
    },
    {
        name: 'Raiden III',
        sortName: 'Raiden 3',
        series: Series.Raiden,
        songSource: {
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
        songSource: {
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
        songSource: { songName: 'Unknown Pollution', videoId: 'PX3vEQ-KQvs' },
    },
    {
        name: 'Raiden Fighters',
        series: Series.Raiden,
        songSource: [
            { songName: 'Souring Nature', videoId: '1r4xBHYos5A' },
            { songName: 'Task Force', videoId: '7pEYtbtAKpw' },
        ]
    },
    {
        name: 'Raiden Fighters 2: Operation Hell Dive',
        series: Series.Raiden,
        songSource: [
            { songName: 'Scramble Attack', videoId: 'epWWOylKxrc' },
            { songName: 'Tight Rope', videoId: '13nezOfe6Oc' },
        ]
    },
    {
        name: 'Raiden Fighters Jet',
        series: Series.Raiden,
        songSource: { songName: 'Simulation Level 01 (Launch Base)', videoId: 'C4DFwgSpO00' },
    },
    {
        name: 'RayCrisis',
        songSource: { songName: 'Lavande Bleu', videoId: 'bCBXUBBZVDU' },
    },
    {
        name: 'RayForce',
        songSource: { songName: 'Penetration', videoId: '234tjx8yO1I' },
    },
    {
        name: 'RayStorm',
        songSource: { songName: 'Geometric City', videoId: 'kP5huZQRAY4' },
    },
    {
        name: 'RefleX',
        songSource: { songName: 'An Unavoidable Choice', videoId: 'HmAJEvPLmVs' },
    },
    {
        name: 'REZON',
        songSource: { songName: 'Stage 1 & 4', videoId: 'ZAKUutWAdDM', startTime: 2, endTime: 31 },
    },
    {
        name: 'Rolling Gunner',
        songSource: { songName: 'The Last Shining Star', videoId: 'iklxp3EUUi4' },
    },
    {
        name: 'Shienryu',
        alias: ['Gekioh Shooting King', 'Steel Dragon'],
        songSource: {
            songName: 'Stage 1',
            arrangements: [
                {
                    source: 'Original',
                    videoId: '4tk9RUiRplw',
                },
                {
                    source: 'Playstation',
                    videoId: 'ycQgBx7gfFQ',
                },
            ]
        },
    },
    {
        name: 'Silver Surfer',
        songSource: { songName: 'Stage BGM 1', videoId: 'BGNSHNf-nlU' },
    },
    {
        name: 'Space Invaders (1999)',
        series: Series.SpaceInvaders,
        songSource: { songName: 'Pluto', videoId: 'ufKFko1q5XM' },
    },
    {
        name: 'Space Invaders (Game Boy Advance)',
        series: Series.SpaceInvaders,
        songSource: { songName: 'Track 1', videoId: 'XUXYxZjt2VI' },
    },
    {
        name: 'Space Invaders (Game Boy Color)',
        series: Series.SpaceInvaders,
        songSource: { songName: 'Mercury', videoId: 'DPQlZDOJPSw' },
    },
    {
        name: 'Space Invaders Extreme',
        series: Series.SpaceInvaders,
        songSource: {
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
        songSource: { songName: 'Invader Disco', videoId: 'hAOBf-JY1kU' },
    },
    {
        name: 'Space Invaders Extreme HD',
        series: Series.SpaceInvaders,
        songSource: { songName: 'Digging My Scene', videoId: 'HVI6UPyqPuk' },
    },
    {
        name: 'Space Invaders Infinity Gene',
        series: Series.SpaceInvaders,
        songSource: { songName: 'Selection (Genetic)', videoId: 'N3EJltfL7ok' },
    },
    {
        name: 'Strike Gunner S.T.G.',
        // The theme has no official name; songName describes where it appears. The same melody is used in different stages across the Arcade and Super Nintendo versions.
        songSource: [
            { songName: 'Stages 1, 4 & Ending', arrangements: [{ source: 'Arcade', videoId: 'Zi0fezKPdH0' }] },
            { songName: 'Stages 1, 3 & 5', arrangements: [{ source: 'Super Nintendo', videoId: 'g3L79GW6T7s' }] },
        ]
    },
    {
        name: 'Strikers 1945',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Rising Sun', videoId: 'TDPkOiNPqQA' },
            { songName: 'Shadow of Reich', videoId: 'pCVV3uTgqrE' },
            { songName: 'Flying Wing', videoId: 'lnHOTuI5jHU' },
            { songName: 'White Hell', videoId: 'VoPpcldi1Qc' },
        ]
    },
    {
        name: 'Strikers 1945 II',
        series: Series.Strikers1945,
        songSource: [
            { songName: "Devil's Tower", videoId: 'siwfJgcFYKI' },
            { songName: 'Far from Cloud City', videoId: 'qOuf82IRzH0' },
            { songName: 'Battle of Extreme North', videoId: 'jQRQlpPJwE0' },
            { songName: 'Infinity Orbit', videoId: 'BhPYYhzPcSE' },
        ]
    },
    {
        name: 'Strikers 1945 III',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Interval of a Huge Gorge', videoId: 'I1qn96QAQXA' },
            { songName: 'Sea of Battle', videoId: 'tvw-jInWc_o' },
            { songName: 'Turn Red', videoId: '-xGu9BfDTnE' },
            { songName: 'Rest of a Bomb', videoId: 'A8dyebZ-Thk' },
        ]
    },
    {
        name: 'Strikers 1945 Plus',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Sky Stage', videoId: 'Hwm6PLQ3X6s' },
            { songName: 'Sea Stage', videoId: 'skJr2TO7u3E' },
            { songName: 'Colliery Stage', videoId: '1valAlFDLRI' },
            { songName: 'Street Stage', videoId: 'NcSIHrnG5lA' },
        ]
    },
    {
        name: 'Super R-Type',
        series: Series.RType,
        songSource: { songName: 'Super Sortie', videoId: 'YuGRrVMLkxk' },
    },
    {
        name: 'Super Spacefortress Macross',
        series: Series.Macross,
        songSource: { songName: 'Stage 1 & 4', videoId: 'FyVBI2GA_mg', startTime: 220, endTime: 322 },
    },
    {
        name: 'Super Spacefortress Macross II',
        series: Series.Macross,
        songSource: { songName: 'SCOOPER', videoId: 'wnlpgkfsor0' }, // NOTE: Medium and Expert course themes don't seem to be on Youtube
    },
    {
        name: 'Super SWIV', // Super SWIV is SNES title, Firepower 2000 is US SNES title, Mega SWIV is Genesis / Mega Drive title
        alias: ['Firepower 2000', 'Mega SWIV'],
        songSource: [
            { songName: 'Stage 1', arrangements: [{ source: 'Super Nintendo', videoId: 't5IEOuoVOYo' }] },
            { songName: 'Stage 1 & 6', arrangements: [{ source: 'Genesis', videoId: 'fSoAOxs5ZCk' }] },
        ],
    },
    {
        name: 'Thunder Dragon',
        songSource: { songName: 'Wild Thunder', videoId: 'W6GrFBQUVKE', startTime: 72, endTime: 538 },
    },
    {
        name: 'Thunder Dragon II',
        songSource: { songName: 'Fly to Live I', videoId: 'Gtz9ZfaG2m8' },
    },
    {
        name: 'Thunder Force IV',
        songSource: { songName: 'Fighting Back', videoId: 'IJE-iAE1Mt8' },
    },
    {
        name: 'Touhou 6: Embodiment of Scarlet Devil',
        series: Series.Touhou,
        songSource: { songName: 'A Soul as Red as a Ground Cherry', videoId: 'nazi6JmAV_c' },
    },
    {
        name: 'Touhou 7: Perfect Cherry Blossom',
        series: Series.Touhou,
        songSource: { songName: 'Paradise ~ Deep Mountain', videoId: 'hzTtdlTAapw' },
    },
    {
        name: 'Touhou 8: Imperishable Night',
        series: Series.Touhou,
        songSource: { songName: 'Illusionary Night ~ Ghostly Eyes', videoId: 'buarznoa7ms' },
    },
    {
        name: 'Touhou 9: Phantasmagoria of Flower View',
        series: Series.Touhou,
        songSource: { songName: 'Spring Lane ~ Colorful Path', videoId: 'LfqQa6JDlS8' },
    },
    {
        name: 'Touhou 10: Mountain of Faith',
        series: Series.Touhou,
        songSource: {
            songName: 'A God That Misses People ~ Romantic Fall',
            videoId: '-NJWjmBT1qo',
        },
    },
    {
        name: 'Touhou 11: Subterranean Animism',
        series: Series.Touhou,
        songSource: { songName: 'The Dark Blowhole', videoId: 'MFCAB3KfBcI' },
    },
    {
        name: 'Touhou 12: Undefined Fantastic Object',
        series: Series.Touhou,
        songSource: { songName: 'At the End of Spring', videoId: 'nn2BUBM-hQ4' },
    },
    {
        name: 'Touhou 13: Ten Desires',
        series: Series.Touhou,
        songSource: { songName: 'Night Sakura of Dead Spirits', videoId: 'S_s2InH_pFk' },
    },
    {
        name: 'Touhou 14: Double Dealing Character',
        series: Series.Touhou,
        songSource: { songName: 'Mist Lake', videoId: 'mo1glRtlyTg' },
    },
    {
        name: 'Touhou 15: Legacy of Lunatic Kingdom',
        series: Series.Touhou,
        songSource: { songName: 'Unforgettable, the Nostalgic Greenery', videoId: 'ucuIXF4YwNY' },
    },
    {
        name: 'Touhou 16: Hidden Star in Four Seasons',
        series: Series.Touhou,
        songSource: { songName: 'A Star of Hope Rises in the Blue Sky', videoId: 'PVva0VzDAR8' },
    },
    {
        name: 'Touhou 17: Wily Beast and Weakest Creature',
        series: Series.Touhou,
        songSource: { songName: 'The Lamentations Known Only by Jizo', videoId: 'uJ6VscWKMzA' },
    },
    {
        name: 'Touhou 18: Unconnected Marketeers',
        series: Series.Touhou,
        songSource: { songName: 'A Shower of Strange Occurrences', videoId: 'W3HOWV3aY_s' },
    },
    {
        name: 'Touhou 19: Unfinished Dream of All Living Ghost',
        series: Series.Touhou,
        songSource: { songName: 'The World is Made in an Adorable Way', videoId: 'RpvCTe2FN1E' },
    },
    {
        name: 'Touhou 20: Fossilized Wonders',
        series: Series.Touhou,
        songSource: { songName: 'Beloved Dwelling of Dust', videoId: 'SSZT4pV3RFA' },
    },
    {
        name: 'Trizeal',
        series: Series.Zeal,
        songSource: { songName: 'Cloudy Today, Again!', videoId: '1BiLJgH3hCM', startTime: 41, endTime: 162 },
    },
    {
        name: 'Truxton',
        songSource: {
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
        songSource: { songName: 'Live in Future', videoId: 'xgxFHJZrAfc' },
    },
    {
        name: 'Turbo Force',
        songSource: { songName: 'Stage 1 & 6', videoId: 'QB4vsrMuWNM' },
    },
    {
        name: 'Tyrian',
        songSource: { songName: 'Tyrian , the level', videoId: 'wNnTGbbDJfo' },
    },
    {
        name: 'Viper Phase 1',
        songSource: { songName: 'Go Straight Ahead', videoId: 'GUILDdRfmxw' },
    },
    {
        name: 'X-Multiply',
        songSource: { songName: 'Into the Human Body', videoId: 'MwwduquIWIo' },
    },
    {
        name: 'Xiizeal',
        alias: 'XII Stag',
        series: Series.Zeal,
        songSource: { songName: 'Stage 1', videoId: 'CbFsLpKZcUA' },
    },
    {
        name: 'Zed Blade',
        songSource: { songName: 'Shootaholic [Shockout MIX]', videoId: 'h35vxyOrmrA' },
    },
    {
        name: 'Zero Wing',
        songSource: {
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
    },
    {
        name: 'ZeroRanger',
        songSource: { songName: 'It May Be Greenish', videoId: 'U0MXZ_WXtsM' },
    },
]

// Games without relevant YouTube links yet.
// When a suitable YouTube video becomes available, replace '---' with the real videoId and move the entry into gameEntries above.
export const noSoundTrackGameEntries: NoSoundTrackGameEntry[] = [
    {
        name: 'Exzeal',
        series: Series.Zeal,
        songSource: { songName: 'Typhoon #12' },
    },
]

export const games: GameEntryWithId[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }))
