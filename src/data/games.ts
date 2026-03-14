import { Series, type GameEntry, type GameEntryWithId, type NoSoundTrackGameEntry } from '../types';

export { Series } from '../types';
export type { SongEntry, GameEntry, GameListEntry, Game, NoSoundTrackGameEntry } from '../types';

// Update videoId and startTime values with the correct YouTube video IDs and
// timestamps for each game's stage 1 theme.
// Keep this array sorted alphabetically by name (enforced by ESLint local/sorted-games rule).
// Use the optional sortName property to override the sort key if the alphabetical order of the
// name alone would be misleading (e.g. sortName: 'Gradius 2' for 'Gradius II').
// IDs are auto-assigned from the array position — just add entries with songSource.
// startTime (seconds) is optional; omit it to start from the beginning of the video.
const gameEntries: GameEntry[] = [
    {
        name: '1942',
        sortName: '194X 1',
        series: Series._194X,
        songSource: {
            songName: 'Stage BGM',
            arrangements: [
                { source: 'Arcade', videoId: 'M3yi_zFe6Ic' },
                { source: 'NES', videoId: 'dDwivbWwnt8' },
            ],
        },
    },
    {
        name: '1943: The Battle of Midway',
        sortName: '194X 2',
        series: Series._194X,
        songSource: {
            songName: 'Air Battle A',
            arrangements: [
                { source: 'Arcade', videoId: 'L8Xlqpw27wE' },
                { source: 'NES', videoId: 'MviUoCEbuO4' },
            ],
        },
    },
    {
        name: '1943 Kai: Midway Kaisen',
        sortName: '194X 2.5',
        series: Series._194X,
        songSource: {
            songName: 'Air Battle A',
            arrangements: [
                { source: 'Arcade', videoId: 'NMraQpOe6gI' },
                { source: 'PC Engine', videoId: 'x2MU_2KlTX0' },
            ],
        },
    },
    {
        name: '1941: Counter Attack',
        sortName: '194X 3',
        series: Series._194X,
        songSource: {
            songName: 'Stage 1',
            arrangements: [
                { source: 'Arcade', videoId: 'ql-CxJSw0Qg' },
                { source: 'PC Engine', videoId: 'dslqYml4T_c' },
            ],
        },
    },
    {
        name: '19XX: The War Against Destiny',
        sortName: '194X 4',
        series: Series._194X,
        songSource: { songName: 'A bit of blue sky between the clouds', videoId: 'fggwm2Rdmds' },
    },
    {
        name: '1944: The Loop Master',
        sortName: '194X 5',
        series: Series._194X,
        songSource: { songName: 'The Deep Blue', videoId: 'BWltBoObR7s' },
    },
    {
        name: '1942: Joint Strike',
        sortName: '194X 6',
        series: Series._194X,
        songSource: { songName: 'Retro Blitz', videoId: 'o-SVBG4IYSY' },
    },
    {
        name: 'Air Duel',
        songSource: { songName: 'Stage 1', videoId: '8WsKeA4v01U' },
    },
    {
        name: 'Air Assault',
        alias: 'Fire Barrel',
        sortName: 'Air Duel 2',
        songSource: { songName: 'Stage 1', videoId: 'SF4fQlJ58V8' },
    },
    {
        name: 'Air Gallet',
        songSource: { songName: 'Stage 1', videoId: 'YbM2D2_QJMY' },
    },
    {
        name: 'Air Zonk',
        songSource: { songName: 'Aqua Base stage', videoId: '9IJcqceH3CM' },
    },
    {
        name: 'Alpha Mission',
        series: Series.AlphaMission,
        songSource: {
            songName: "SYD's Theme",
            arrangements: [
                { source: 'Arcade', videoId: '2nRERYlmKDE' },
                { source: 'NES', videoId: 'ObVdeqcyFek' },
            ],
        },
    },
    {
        name: 'Alpha Mission II',
        series: Series.AlphaMission,
        songSource: { songName: 'The Space Flight', videoId: 'KAZ5n-C9JlM' },
    },
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
        name: 'Batsugun',
        songSource: { songName: 'Heart Beat', videoId: 'cHXIKk-5o_0' },
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
        name: 'Bio-Hazard Battle',
        songSource: { songName: 'Stage 1 & 8', videoId: 'oInjf0-talM' },
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
        name: 'Blazing Lazers',
        alias: 'Gunhed',
        songSource: { songName: 'Thunder Blaze', videoId: 'im7qZmxOSUI' },
    },
    {
        name: 'Blazing Star',
        songSource: { songName: 'Apocalypse ~ Stage 1A', videoId: 'WIeUpFJ4LY4' },
    },
    {
        name: 'Blue Revolver',
        songSource: { songName: 'Qygenomics', videoId: 'dTbpYrrSRPY' },
    },
    {
        name: 'Bullet Soul',
        alias: 'Bullet Soul: Infinite Burst',
        songSource: { songName: 'Relentless Force', videoId: 'ahK-7dPcI6w' },
    },
    {
        name: 'Carrier Air Wing',
        alias: 'U.S. Navy',
        songSource: { songName: 'Mission 1', videoId: 'xBNq6tCJVcE' },
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
        name: 'Cho Ren Sha 68K',
        songSource: { songName: 'Planet the E.A.R.T.H', videoId: 'aT3z4k1BlDg' },
    },
    {
        name: 'Cosmo Dreamer',
        series: Series.Dreamer,
        songSource: { songName: 'InstaVista', videoId: 'A-SqHyJa-jU' },
    },
    {
        name: 'Cotton: Fantastic Night Dreams',
        alias: 'Cotton Reboot!',
        sortName: 'Cotton 1',
        series: Series.Cotton,
        songSource: {
            songName: 'Stage 1',
            arrangements: [
                { source: 'Arcade', videoId: '2lYaiHRuFxA', startTime: 7, endTime: 193 },
                { source: 'PC Engine', videoId: 'AzV4izkjzfA' },
                { source: 'Softbank', videoId: 'pE-K6FqfK6A' },
                { source: 'Reboot', videoId: 'uFDFFWKvBWE' },
                // Neo Geo pocket arrangement not on Youtube
            ] },
    },
    {
        name: 'Cotton 100%',
        sortName: 'Cotton 1.5',
        series: Series.Cotton,
        songSource: { songName: 'Temple in the Wood', videoId: 'cMuoCgjdP9s' },
    },
    {
        name: 'Cotton 2: Magical Night Dreams',
        alias: 'Cotton Boomerang: Magical Night Dreams',
        series: Series.Cotton,
        songSource: { songName: 'Wataboushi Hill', videoId: 'JB4dmAwRZs8' },
    },
    {
        name: 'Cotton Fantasy: Superlative Night Dreams',
        series: Series.Cotton,
        songSource: { songName: 'Castle Garden', videoId: '8kDo9g846ug' },
    },
    {
        name: 'Cotton Reboot! High Tension!',
        series: Series.Cotton,
        songSource: { songName: 'Into the Adventure!', videoId: '6RcWxVWiWLo' },
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
        name: 'Danmaku Unlimited 2',
        series: Series.DanmakuUnlimited,
        songSource: { songName: 'First Sortie', videoId: 'vHREMLcVciY' },
    },
    {
        name: 'Danmaku Unlimited 3',
        series: Series.DanmakuUnlimited,
        songSource: { songName: "Yesterday's Tomorrow", videoId: '0-mq-HozJkA' },
    },
    {
        name: 'Darius',
        series: Series.Darius,
        songSource: { songName: 'Captain Neo', videoId: 'YPM0APOpXmE' },
    },
    {
        name: 'Darius II',
        sortName: 'Darius 2',
        alias: [
            'Sagaia',
            'Super Darius II',
        ],
        series: Series.Darius,
        songSource: {
            songName: 'Olga Breeze',
            arrangements: [
                {
                    source: 'Arcade',
                    videoId: 'BpjXgNbpTqU',
                },
                {
                    source: 'Mega Drive',
                    videoId: 'X3E1UgUGf8A',
                },
                {
                    source: 'PC Engine',
                    videoId: 'sZeE-HciN9g',
                },
            ],
        },
    },
    {
        name: 'Darius Force',
        alias: 'Super Nova',
        series: Series.Darius,
        songSource: { songName: 'A King', videoId: 'mtEtEeEfo0Y' },
    },
    {
        name: 'Darius Gaiden',
        series: Series.Darius,
        songSource: { songName: 'Visionnerz ~Hallucinated People~', videoId: 'kG30WhHCnN4' },
    },
    {
        name: 'Darius Twin',
        series: Series.Darius,
        songSource: { songName: 'A Flasing Dual Hawk', videoId: '0wvJb9bgdCk' },
    },
    {
        name: 'Dariusburst',
        alias: [
            'Dariusburst: Another Chronicle',
            'Dariusburst: Another Chronicle EX',
            'Dariusburst: Second Prologue',
            'Dariusburst: Chronicle Saviours',
            'Dariusburst: Another Chronicle EX+',
            'Dariusburst: CS Core + Taito/Sega Pack',
        ],
        series: Series.Darius,
        songSource: [
            { songName: 'Good-bye My Earth', videoId: 'Hi1sF3AKPHk' },
            { songName: 'Freedom', videoId: 'eKSsVzGkcqs' },
            { songName: 'Mortification of the Flesh', videoId: 'Vke1mMHGjJA' },
            { songName: 'Suite Photoconductivity ~First Tune Iron Fossil~', videoId: 'h52k2Et3AXk' },
        ],
    },
    {
        name: 'Deathsmiles',
        songSource: [
            { songName: 'Burning Halloween Town', videoId: 'NMwYXwclFN4' },
            { songName: 'Fury Of The Gravekeepers', videoId: 'zGcGQUryyPc' },
            { songName: 'Disturbance At The Lakeshore', videoId: 'LUtn9Kqkakc' },
        ],
    },
    {
        name: 'Deltazeal',
        alias: 'G-Stream G2020',
        series: Series.Zeal,
        songSource: { songName: 'Stage 1 & 4', videoId: '6xG4t2wE0rM' },
    },
    {
        name: 'DonPachi',
        sortName: 'Dodonpachi 0',
        series: Series.Dodonpachi,
        songSource: { songName: 'Silent Outpost Base', videoId: 'qiAb1O5ix2g' },
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
            ],
        },
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
        name: 'Dragon Blaze',
        songSource: [
            { songName: 'Swamplands stage', videoId: '00JwDgLdAMw', startTime: 43, endTime: 145 },
            { songName: 'Underwater stage', videoId: '00JwDgLdAMw', startTime: 223, endTime: 318 },
            { songName: 'Desert stage', videoId: '00JwDgLdAMw', startTime: 319, endTime: 397 },
            { songName: 'Jungle stage', videoId: '00JwDgLdAMw', startTime: 398, endTime: 304 },
        ],
    },
    {
        name: 'Drainus',
        songSource: { songName: 'Determination', videoId: 'ppgo1QkNNxk' },
    },
    {
        name: 'Einhander',
        songSource: { songName: 'Capital, Street', videoId: 'g0fmLsocKdg', startTime: 55 },
    },
    {
        name: 'Eschatos',
        songSource: { songName: 'Silver Lining', videoId: 'kqv4NiiVwI4' },
    },
    {
        name: 'ESP Ra.De.',
        songSource: [
            { songName: 'Desperate School', videoId: 'P3_U1wyESiA' },
            { songName: 'Nightmare', videoId: 'ZoxoMoDZ-0A' },
            { songName: 'Act in Judge', videoId: 'q8s0A1R_c6k' },
        ],
    },
    {
        name: 'Espgaluda',
        series: Series.Espgaluda,
        songSource: {
            songName: 'Bloody Separation ~ Bloody Arrival',
            videoId: '5A6oJRZSFBg',
        },
    },
    {
        name: 'Espgaluda II',
        series: Series.Espgaluda,
        songSource: {
            songName: 'Mutiny ~ Fate is with the Girl',
            arrangements: [
                { source: 'White Label', videoId: '1gALhcCbn4A' },
                { source: 'Black Label', videoId: 'MUdtYy9UGAM' },
            ] },
    },
    {
        name: 'Ex-Calibre',
        songSource: { songName: "Cruisin'", videoId: 'ddJJ_geDcYU' },
    },
    {
        name: 'Explosive Breaker',
        songSource: { songName: 'Stage 1, 3-2', videoId: '69wGmxanW20' },
    },
    {
        name: 'Fantasy Zone',
        series: Series.FantasyZone,
        songSource: {
            songName: 'Opa Opa!',
            arrangements: [
                { source: 'Arcade', videoId: 'iyljD9_TY90' },
                { source: 'Master System', videoId: 'KcJuHpHmf_0' },
                { source: 'NES', videoId: 'qAeS1eXaCNQ' },
                { source: 'Sega Ages', videoId: 'Kvp_vit1Ljo' },
            ],
        },
    },
    {
        name: 'Fantasy Zone II: The Tears of Opa-Opa',
        sortName: 'Fantasy Zone 2',
        series: Series.FantasyZone,
        songSource: {
            songName: 'Round 1 (Cholacoray)',
            arrangements: [
                { source: 'Arcade', videoId: '_QIpZt0lMKY' },
                { source: 'Master System', videoId: 'qTCv1HuZqxQ' },
                { source: 'NES', videoId: 'A8tt3jxuNiQ' },
            ],
        },
    },
    {
        name: 'Fantasy Zone Gear',
        series: Series.FantasyZone,
        songSource: { songName: 'Wood stage', videoId: 'evHiKhEU54U' },
    },
    {
        name: 'Fever SOS',
        alias: 'Dangun Feveron',
        songSource: { songName: 'Dancing Bomber', videoId: 'FOXIDqkCXaY' },
    },
    {
        name: 'Fighter & Attacker',
        alias: 'F/A',
        songSource: { songName: 'Desert Storm', videoId: 'H23ZWktzasc' },
    },
    {
        name: 'Fire Shark',
        alias: 'Same! Same! Same!',
        series: Series.FlyingShark,
        songSource: {
            songName: 'Fire Shark',
            arrangements: [
                { source: 'Arcade', videoId: 'EBIn673qfHM' },
                { source: 'Mega Drive', videoId: 'QDSzs97Mhzw' },
            ],
        },
    },
    {
        name: 'FixEight',
        series: Series.OutZone,
        songSource: { songName: 'Fixer', videoId: 'pyefFS8SwiA', startTime: 10, endTime: 119 },
    },
    {
        name: 'Flying Shark',
        series: Series.FlyingShark,
        alias: 'Sky Shark',
        songSource: {
            songName: 'Asia',
            arrangements: [
                { source: 'Arcade', videoId: 'pA-RGIQMAlY' },
                { source: 'Atari ST', videoId: 'F2xGseAZMeo' },
                { source: 'Sharp X68000', videoId: 'FkxXKMwjJTQ' },
            ],
        },
    },
    {
        name: 'Flying Shark (NES)',
        series: Series.FlyingShark,
        alias: 'Sky Shark',
        songSource: { songName: 'Stage 1', videoId: 'yxsKzGZ8WHg' },
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
        name: 'Giga Wing',
        songSource: [
            { songName: 'Nighttime Battle', videoId: 'pnGYJToUTFk' },
            { songName: 'On Lava Base', videoId: '9OmTsaHdDiI' },
        ],
    },
    {
        name: 'Ginga Force',
        songSource: { songName: 'Aeronaut', videoId: 'Go5MfC8S02o' },
    },
    {
        name: 'Gradius',
        alias: 'Nemesis',
        series: Series.Gradius,
        songSource: { songName: 'Challenger 1985', videoId: '-Fcpo6qCXMY' },
    },
    {
        name: 'Gradius II',
        alias: 'Vulcan Venture',
        sortName: 'Gradius 2',
        series: Series.Gradius,
        songSource: { songName: 'Burning Heat', videoId: '76kJEPGvvMg' },
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
        name: 'Gradius: The Interstellar Assault',
        series: Series.Gradius,
        songSource: { songName: 'The Chase, A Ruins, Toadstool', videoId: '05L6GWxUugg', startTime: 103, endTime: 326 },
    },
    {
        name: 'Grind Stormer',
        alias: 'V・V',
        songSource: {
            songName: 'Wonderful Dreamer',
            arrangements: [
                { source: 'Arcade', videoId: 'Qe4Fy2oYehw' },
                { source: 'Mega Drive', videoId: '3Cg7Tgp-d7k' },
            ],
        },
    },
    {
        name: 'Gun Frontier',
        songSource: { songName: 'Gale in the Desert', videoId: 'JjsSvAsxTxY' },
    },
    {
        name: 'Gun-Nac',
        songSource: { songName: 'Area 1', videoId: 'LSrJYxcYRPs' },
    },
    {
        name: 'Gunbird',
        alias: 'Mobile Light Force',
        series: Series.Gunbird,
        songSource: [
            {
                songName: "Backstar's Fortress",
                arrangements: [
                    { source: 'Arcade', videoId: 'hkY01Kia99w' },
                    { source: 'Console', videoId: 'PckgVYSPARg' },
                    { source: 'Special Edition', videoId: 'aKKux5rXaNk' },
                ],
            },
            {
                songName: 'Pointed Square',
                arrangements: [
                    { source: 'Arcade', videoId: 'aF1k24OJxls' },
                    { source: 'Console', videoId: 'L_tBZ7QGIIM' },
                    { source: 'Special Edition', videoId: '0Vf5Ja4Wb0Y' },
                ],
            },
            {
                songName: 'Trick Tramp Train',
                arrangements: [
                    { source: 'Arcade', videoId: 'VJaghpy5MY8' },
                    { source: 'Console', videoId: 'Mn6ksDyqM88' },
                    { source: 'Special Edition', videoId: 'Q2gDybAhq7Q' },
                ],
            },
            {
                songName: 'Shot in the Underground',
                arrangements: [
                    { source: 'Arcade', videoId: 'N2tIuHbnFPs' },
                    { source: 'Console', videoId: '9oHbJjnWTlc' },
                    { source: 'Special Edition', videoId: 'kszfcopzkF0' },
                ],
            },
        ],
    },
    {
        name: 'Gunbird 2',
        series: Series.Gunbird,
        songSource: [
            { songName: 'Just Fly, The Dreamers', videoId: 'yel5KUMiwb8', startTime: 214, endTime: 396 },
            { songName: 'Type of Essence', videoId: 'yel5KUMiwb8', startTime: 451, endTime: 572 },
            { songName: 'Why Do You Wanna Fly?', videoId: 'yel5KUMiwb8', startTime: 573, endTime: 756 },
            { songName: 'Gunbird', videoId: 'yel5KUMiwb8', startTime: 757, endTime: 937 },
        ],
    },
    {
        name: 'Gunnail',
        songSource: { songName: 'Stage 1', videoId: 'hpzlZb-z7Kc', startTime: 97, endTime: 524 },
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
        name: 'Ibara',
        series: Series.Ibara,
        songSource: [
            { songName: 'Show Time', videoId: 'T65Zmc6iWCc' },
            { songName: 'Bonds of Steel', videoId: 'XgSMvKTaMXU' },
        ] ,
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
        songSource: { songName: 'The South Pole', videoId: '9F8SiVzU1QI' },
    },
    {
        name: 'In the Hunt (PlayStation)',
        songSource: { songName: 'Stage 1', videoId: '7fI0-TLbPkY' },
    },
    {
        name: 'Ironclad',
        songSource: { songName: "Theme of Super Iron Brikin'ger", videoId: 'an9E8DuCAg8' },
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
        songSource: { songName: 'Interception - Noisy Town', videoId: 'z472pIce5CY' },
    },
    {
        name: 'Last Resort',
        songSource: { songName: 'Jack to the Metro', videoId: 'HAGArKEC_M8' },
    },
    {
        name: 'Like Dreamer',
        series: Series.Dreamer,
        songSource: { songName: 'Cat Mischief', videoId: '1iEJRCaanBY' },
    },
    {
        name: 'Lords of Thunder',
        songSource: [
            {
                songName: 'Dezant',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: 'pu_pNnEymLY',
                    },
                    {
                        source: 'Sega CD',
                        videoId: 'fKymzvR4hE0',
                    },
                ],
            },
            {
                songName: 'Auzal',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: 'iyvdraPERr8',
                    },
                    {
                        source: 'Sega CD',
                        videoId: '6FYYwj6iyAA',
                    },
                ],
            },
            {
                songName: 'Lamarada',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: '76zevuMEbkg',
                    },
                    {
                        source: 'Sega CD',
                        videoId: 'fnbcvp9E4n0',
                    },
                ],
            },
            {
                songName: 'Bosque',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: 'ubBdRb1f5A8',
                    },
                    {
                        source: 'Sega CD',
                        videoId: 'dknJeoMiNfY',
                    },
                ],
            },
            {
                songName: 'Helado',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: '78anoPGi4Hk',
                    },
                    {
                        source: 'Sega CD',
                        videoId: 'ONJlKmFHUMY',
                    },
                ],
            },
            {
                songName: 'Cielom',
                arrangements: [
                    {
                        source: 'PC Engine',
                        videoId: 'sya6mhmygyM',
                    },
                    {
                        source: 'Sega CD',
                        videoId: '4C0zHb4fGAA',
                    },
                ],
            },
        ],
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
        name: 'Mars Matrix',
        songSource: { songName: 'Armed Satellite Phobos', videoId: 'thei1zxfJWA' },
    },
    {
        name: 'Mazinger Z',
        songSource: { songName: 'Theme of Z (Part 2)', videoId: 'uHktcVQgXys' },
    },
    {
        name: 'Mecha Ritz: Steel Rondo',
        songSource: { songName: 'Alone', videoId: 'UqKmOiETJeI' },
    },
    {
        name: 'Mega Zone',
        songSource: { songName: 'Main BGM', videoId: 'Eww_CkmhF1M' },
    },
    {
        name: 'Metal Black',
        songSource: { songName: 'Take off ~ Born to be free', videoId: 'GBS6KfJRyIg' },
    },
    {
        name: 'Muchi Muchi Pork!',
        songSource: { songName: 'Doki Doki in the Sky', videoId: 'iTb0FEaqsv4' },
    },
    {
        name: 'M.U.S.H.A.: Metallic Uniframe Super Hybrid Armor',
        alias: 'Musha Aleste: Full Metal Fighter Ellinor',
        sortName: 'MUSHA',
        series: Series.Aleste,
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
                },
            ],
        },
    },
    {
        name: 'Mushihimesama Futari',
        songSource: { songName: 'Setting Off Together', videoId: '2qoyJbieTOc' },
    },
    {
        name: 'Mystic Riders',
        songSource: { songName: 'Midnight Town', videoId: 'GjcgS4o0HFg' },
    },
    {
        name: 'Natsuki Chronicles',
        songSource: { songName: 'Hopeful Morning Glow', videoId: 'HuzP7m6Us28' },
    },
    {
        name: 'NebulasRay',
        songSource: { songName: 'Exeo', videoId: 'PyHmUSQaNYM' },
    },
    {
        name: 'Out Zone',
        series: Series.OutZone,
        songSource: { songName: 'To The Earth', videoId: 'zfefU4y8P00' },
    },
    {
        name: 'Parodius',
        alias: [
            'Parodius Da!',
            'Parodius! From Myth to Laughter',
            'Parodius: Non-Sense Fantasy',
        ],
        songSource: {
            songName: 'Island of Pirates',
            arrangements: [
                {
                    source: 'Arcade',
                    videoId: 'IvCOyEYL6oI',
                },
                {
                    source: 'Game Boy',
                    videoId: 'Rk4AT-mZMgA',
                },
                {
                    source: 'PC Engine',
                    videoId: '-JzS-0aab2c',
                },
                {
                    source: 'NES',
                    videoId: 'StFAI1Sto7Y',
                    startTime: 219,
                    endTime: 314,
                },
                {
                    source: 'Sharp X68000',
                    videoId: 'Q2QWtH8HPi0',
                },
                {
                    source: 'Super Nintendo',
                    videoId: 'r8u0HF_wRuE',
                },
            ],
        },
    },
    {
        name: 'PD Ultraman Invader',
        songSource: { songName: 'Ultraman', videoId: 'UD8ILryBKPY' },
    },
    {
        name: 'Pink Sweets: Ibara Sorekara',
        series: Series.Ibara,
        songSource: { songName: 'Mama! Ora va!', videoId: '48L8QKOFehc' },
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
        name: "Pop'n Twinbee",
        songSource: { songName: 'Village Sky', videoId: 'AGt-RJr-khA' },
    },
    {
        name: 'Prehistoric Isle in 1930',
        sortName: 'Prehistoric Isle',
        songSource: { songName: 'Flying the Dinosaur', videoId: 'H7CYh7Y3E6w' },
    },
    {
        name: 'Prehistoric Isle 2',
        songSource: { songName: 'Stage 1', videoId: 'xbZlw0nzDNo' },
    },
    {
        name: 'Progear',
        songSource: { songName: 'To the Blue Sky', videoId: 'h-lt6fiIqvM' },
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
        name: 'Q-Side',
        songSource: { songName: 'Q-Side', videoId: 'THAVdbVqh8U' },
    },
    {
        name: 'QP Shooting - Dangerous!!',
        songSource: { songName: 'Lucky Star', videoId: 'xOcPTLBEWGY' },
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
                    source: 'Amiga',
                    videoId: '42xjbdXze8E',
                },
                {
                    source: 'Amstrad CPC',
                    videoId: 'TUqxvufguZY',
                    startTime: 270,
                    endTime: 321,
                },
                {
                    source: 'Atari ST',
                    videoId: 'B-xGUTHedU0',
                    startTime: 50,
                    endTime: 101,
                },
                {
                    source: 'Commodore 64',
                    videoId: 'VOcgGc6CLss',
                },
                {
                    source: 'Game Boy',
                    videoId: 'co0nkC6tKrI',
                },
                {
                    source: 'Master System',
                    videoId: 'Bz4yJTi4OvA',
                },
                {
                    source: 'MSX2',
                    videoId: 'QKTRx-Ub7EQ',
                    startTime: 60,
                    endTime: 168,
                },
                {
                    source: 'PC Engine',
                    videoId: 'ZWTTEcsY_Ow',
                },
                {
                    source: 'Sharp X68000',
                    videoId: 'E1_INrNo8WA',
                },
                {
                    source: 'Dimensions',
                    videoId: 'bZey0kKpwHk',
                },
            ],
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
                    source: 'Amiga',
                    videoId: 'r1E2SN1hmRI',
                },
                {
                    source: 'Atari ST',
                    videoId: 'zJr19m40eDk',
                },
                {
                    source: 'Game Boy',
                    videoId: 'hIC-xECNR2c',
                },
                {
                    source: 'Dimensions',
                    videoId: 'KtzwUQgMuZ8',
                },
            ],
        },
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
            ],
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
            ],
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
            ],
        },
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
            ],
        },
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
        ],
    },
    {
        name: 'Raiden Fighters 2: Operation Hell Dive',
        series: Series.Raiden,
        songSource: [
            { songName: 'Scramble Attack', videoId: 'epWWOylKxrc' },
            { songName: 'Tight Rope', videoId: '13nezOfe6Oc' },
        ],
    },
    {
        name: 'Raiden Fighters Jet',
        series: Series.Raiden,
        songSource: { songName: 'Simulation Level 01 (Launch Base)', videoId: 'C4DFwgSpO00' },
    },
    {
        name: 'Rainchaser',
        songSource: { songName: 'Rapid Approach', videoId: 'EXL2ur8D7iM', startTime: 323, endTime: 568 },
    },
    {
        name: 'RayForce',
        sortName: 'Rayforce 1',
        alias: ['Layer Section', 'Galactic Attack', 'Gunlock'],
        songSource: { songName: 'Penetration', videoId: '234tjx8yO1I' },
    },
    {
        name: 'RayStorm',
        sortName: 'Rayforce 2',
        alias: 'Layer Section II',
        songSource: { songName: 'Geometric City', videoId: 'kP5huZQRAY4' },
    },
    {
        name: 'RayCrisis',
        sortName: 'Rayforce 3',
        alias: 'RayCrisis: Series Termination',
        songSource: { songName: 'Lavande Bleu', videoId: 'bCBXUBBZVDU' },
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
        name: 'Sagaia (Game Boy)',
        series: Series.Darius,
        songSource: { songName: 'Cosmic Air Way', videoId: 'ekMGtD9cDhQ' },
    },
    {
        name: 'Salamander',
        alias: 'Life Force',
        series: Series.Gradius,
        songSource: { songName: 'Power of Anger', videoId: 'gle0JLhaRxw' },
    },
    {
        name: 'Salamander 2',
        series: Series.Gradius,
        songSource: { songName: 'Silver Wings Again', videoId: 'Y0CFKk8WDTM' },
    },
    {
        name: 'Salamander III',
        series: Series.Gradius,
        songSource: { songName: 'Courage of Pride', videoId: '6VRkKpoJADc' },
    },
    {
        name: 'Samurai Aces',
        alias: 'Sengoku Ace',
        series: Series.SengokuAce,
        songSource: [
            { songName: 'Lake stage', videoId: 'niwt7Y0kbc8', startTime: 43, endTime: 131 },
            { songName: 'Mountain stage', videoId: 'niwt7Y0kbc8', startTime: 141, endTime: 193 },
            { songName: 'Fields stage', videoId: 'niwt7Y0kbc8', startTime: 194, endTime: 203 },
            { songName: 'Town stage', videoId: 'niwt7Y0kbc8', startTime: 204, endTime: 234 },
        ],
    },
    {
        name: 'Samurai Aces III – Sengoku Cannon',
        series: Series.SengokuAce,
        songSource: { songName: 'Stage 1', videoId: '5OADukw2FAA', startTime: 283, endTime: 401 },
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
            ],
        },
    },
    {
        name: 'Silver Surfer',
        songSource: { songName: 'Stage BGM 1', videoId: 'BGNSHNf-nlU' },
    },
    {
        name: 'Sol Divide',
        songSource: [
            { songName: 'Knight of Darkness', videoId: '-2yayHs2-JA', startTime: 75, endTime: 158 },
            { songName: 'Winged Fighter', videoId: '-2yayHs2-JA', startTime: 201, endTime: 277 },
            { songName: 'Evil Monk of Ancient Times', videoId: '-2yayHs2-JA', startTime: 323, endTime: 397 },
        ],
    },
    {
        name: 'Soldier Blade',
        songSource: { songName: 'Operation 1', videoId: 'pEyJV4nVBTU' },
    },
    // Sonic Wings 1-3 released in English as Aero Fighters, but series has since gone to using the Sonic Wings brand universally - will use this across the board for consistency.
    {
        name: 'Sonic Wings',
        alias: ['Aero Fighters'],
        series: Series.SonicWings,
        songSource: [
            { songName: 'New York, USA stage', videoId: 'O8TqZpvmcaw' },
            { songName: 'Tokyo, Japan stage', videoId: 'S8ckubBlgkc' },
            { songName: 'The Alps, Sweden stage', videoId: 'onjC2AbOaf8' },
            { songName: 'Dover, England stage', videoId: 'CzH-9UCtfCw' },
        ],
    },
    {
        name: 'Sonic Wings (Super Nintendo)',
        alias: ['Aero Fighters'],
        series: Series.SonicWings,
        songSource: [
            { songName: 'New York, USA stage', videoId: 'DoNQbck9w4U' },
            { songName: 'Tokyo, Japan stage', videoId: 'EeIRCfIkmYQ' },
            { songName: 'The Alps, Sweden stage', videoId: 'xT_DYRoxgo8' },
            { songName: 'Dover, England stage', videoId: 'XdYZsgvmlRQ' },
        ],
    },
    {
        name: 'Sonic Wings 2',
        alias: ['Aero Fighters 2'],
        series: Series.SonicWings,
        songSource: { songName: 'Japan stage', videoId: 'pOD8u68tauY' },
    },
    {
        name: 'Sonic Wings 3',
        alias: ['Aero Fighters 3'],
        series: Series.SonicWings,
        songSource: { songName: 'Dirty City', videoId: 'iaa-1mR60No' },
    },
    {
        name: 'Sonic Wings Special',
        alias: ['Sonic Wings Limited', 'Aero Fighters Special'],
        series: Series.SonicWings,
        songSource: { songName: 'Japan stage', videoId: 'sXCTZsRJ6y8' },
    },
    {
        name: "Space Invaders '91",
        series: Series.SpaceInvaders,
        songSource: { songName: 'Round 1 & 9', videoId: 'hicMw4XOMSQ' },
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
            ],
        },
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
        name: 'Space Megaforce',
        alias: 'Super Aleste',
        series: Series.Aleste,
        songSource: { songName: 'Stage 1', videoId: 'C--eV-L3gfE' },
    },
    {
        name: 'Strike Gunner S.T.G.',
        // The theme has no official name; songName describes where it appears. The same melody is used in different stages across the Arcade and Super Nintendo versions.
        songSource: [
            { songName: 'Stages 1, 4 & Ending', arrangements: [{ source: 'Arcade', videoId: 'Zi0fezKPdH0' }] },
            { songName: 'Stages 1, 3 & 5', arrangements: [{ source: 'Super Nintendo', videoId: 'g3L79GW6T7s' }] },
        ],
    },
    {
        name: 'Strikers 1945',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Rising Sun', videoId: 'TDPkOiNPqQA' },
            { songName: 'Shadow of Reich', videoId: 'pCVV3uTgqrE' },
            { songName: 'Flying Wing', videoId: 'lnHOTuI5jHU' },
            { songName: 'White Hell', videoId: 'VoPpcldi1Qc' },
        ],
    },
    {
        name: 'Strikers 1945 II',
        series: Series.Strikers1945,
        songSource: [
            { songName: "Devil's Tower", videoId: 'siwfJgcFYKI' },
            { songName: 'Far from Cloud City', videoId: 'qOuf82IRzH0' },
            { songName: 'Battle of Extreme North', videoId: 'jQRQlpPJwE0' },
            { songName: 'Infinity Orbit', videoId: 'BhPYYhzPcSE' },
        ],
    },
    {
        name: 'Strikers 1945 III',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Interval of a Huge Gorge', videoId: 'I1qn96QAQXA' },
            { songName: 'Sea of Battle', videoId: 'tvw-jInWc_o' },
            { songName: 'Turn Red', videoId: '-xGu9BfDTnE' },
            { songName: 'Rest of a Bomb', videoId: 'A8dyebZ-Thk' },
        ],
    },
    {
        name: 'Strikers 1945 Plus',
        series: Series.Strikers1945,
        songSource: [
            { songName: 'Sky Stage', videoId: 'Hwm6PLQ3X6s' },
            { songName: 'Sea Stage', videoId: 'skJr2TO7u3E' },
            { songName: 'Colliery Stage', videoId: '1valAlFDLRI' },
            { songName: 'Street Stage', videoId: 'NcSIHrnG5lA' },
        ],
    },
    {
        name: "Summer Carnival '92 Recca",
        songSource: { songName: 'Jetter', videoId: 'tYg-HtcobKY' },
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
        songSource: { songName: 'Scooper', videoId: 'wnlpgkfsor0' }, // NOTE: Medium and Expert course themes don't seem to be on Youtube
    },
    {
        name: 'Super SWIV', // Super SWIV is SNES title, Firepower 2000 is US SNES title, Mega SWIV is Genesis / Mega Drive title
        alias: ['Firepower 2000', 'Mega SWIV'],
        songSource: [
            { songName: 'Stage 1', arrangements: [{ source: 'Super Nintendo', videoId: 't5IEOuoVOYo' }] },
            { songName: 'Stage 1 & 6', arrangements: [{ source: 'Mega Drive', videoId: 'fSoAOxs5ZCk' }] },
        ],
    },
    {
        name: 'Tengai',
        alias: ['Sengoku Blade', 'Sengoku Ace Episode II'],
        series: Series.SengokuAce,
        songSource: [
            { songName: 'Dance of the Sky', videoId: 'TLdSuLnUGmw' },
            { songName: 'Silence Breaker', videoId: 'Lck806a7DkQ' },
            { songName: 'Somberness', videoId: 'HXJ9x-DTSJo' },
            { songName: 'A High Ceder', videoId: 'B4-xPSqb4f0' },
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
        songSource: [
            { songName: 'Adventure of the Lovestruck Tomboy', videoId: 'QYYHxR4Ry4E' },
            { songName: 'Ghostly Band ~ Phantom Ensemble', videoId: 'GW4v7sU5JAs' },
            { songName: 'Deaf to All but the Song ~ Flower Mix', videoId: 'wBqeCV6H5zo' },
        ],
    },
    {
        name: 'Touhou 9.5: Shoot the Bullet',
        series: Series.Touhou,
        songSource: { songName: 'Wind Circulation ~ Wind Tour', videoId: 'UbmTCwrdtkM' },
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
        name: 'Touhou 12.5: Double Spoiler',
        series: Series.Touhou,
        songSource: { songName: 'The Mystery in Your Town', videoId: 'Sl5szUesJEk' },
    },
    {
        name: 'Touhou 12.8: Great Fairy Wars',
        series: Series.Touhou,
        songSource: { songName: 'The Refrain of the Lovely Great War', videoId: 'IrCcyn7qzdA' },
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
        name: 'Touhou 14.3: Impossible Spell Card',
        series: Series.Touhou,
        songSource: { songName: 'Cheat Against the Impossible Danmaku', videoId: 'CDwMR67w2HA' },
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
        name: 'Touhou 16.5: Violet Detector',
        series: Series.Touhou,
        songSource: { songName: 'Lucid Dreamer', videoId: '2xI9Gm_CGbI' },
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
        name: 'Touhou 18.5: 100th Black Market',
        series: Series.Touhou,
        songSource: { songName: 'An Exciting and Familiar Gensokyo', videoId: 'JsUmqNi0Hhk' },
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
        name: 'Trouble Witches Episode 1 ~Daughters of Amalgam~',
        alias: [
            'Trouble Witches AC',
            'Trouble Witches NEO!',
        ],
        songSource: { songName: 'Catch up with and overtake that express train!', videoId: 'SP42NFfj-FA' },
    },
    {
        name: 'Truxton',
        series: Series.Truxton,
        alias: 'Tatsujin',
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
            ],
        },
    },
    {
        name: 'Truxton II',
        alias: 'Tatsujin Oh',
        songSource: { songName: 'Live in Future', videoId: 'xgxFHJZrAfc' },
    },
    {
        name: 'Turbo Force',
        songSource: { songName: 'Stage 1 & 6', videoId: 'QB4vsrMuWNM' },
    },
    {
        name: 'Tyrian',
        songSource: { songName: 'Tyrian, the level', videoId: 'wNnTGbbDJfo' },
    },
    {
        name: 'U.N. Squadron',
        alias: 'Area 88',
        songSource: {
            songName: 'Oil Field',
            arrangements: [
                {
                    source: 'Arcade',
                    videoId: 'DZnMcxaTI5Q',
                },
                {
                    source: 'Super Nintendo',
                    videoId: 'zSFm_EaLRmQ',
                },
            ],
        },
    },
    {
        name: 'Under Defeat',
        songSource: {
            songName: "Don't Look Back", // Original song is listed in soundtrack as 'Can't Come Back' but HD soundtrack refers to it as 'Don't Look Back', will use most recent translation
            arrangements: [
                { source: 'Original', videoId: 'ynspAkuNVSg' },
                { source: 'HD', videoId: '4T6uakczxfU' },
            ],
        },
    },
    {
        name: 'Varth: Operation Thunderstorm',
        songSource: { songName: 'Stage 1, 16', videoId: 'x1H0Otv5R_E' },
    },
    {
        name: 'Viper Phase 1',
        songSource: { songName: 'Go Straight Ahead', videoId: 'GUILDdRfmxw' },
    },
    {
        name: 'Vulgus',
        songSource: { songName: 'Main BGM', videoId: 'Y6gEyApB4b4' },
    },
    {
        name: 'X Multiply',
        songSource: { songName: 'Into the Human Body', videoId: 'MwwduquIWIo' },
    },
    {
        name: 'Xevious',
        songSource: { songName: 'BGM', videoId: 'w4vXIMFt9QU' },
    },
    {
        name: 'Xevious 3D/G',
        songSource: { songName: 'Area 1', videoId: 'enZ-rEt7U_A' },
    },
    {
        name: 'Xevious Arrangement',
        songSource: { songName: 'Area 1 & 4', videoId: 'tQMQJKFb4DU' },
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
        name: 'Zero Gunner',
        series: Series.ZeroGunner,
        songSource: { songName: 'The Omen of Destruction', videoId: 'G2I1fsIpJUk' },
    },
    {
        name: 'Zero Gunner 2',
        series: Series.ZeroGunner,
        songSource: [
            { songName: 'Submergence City 1', videoId: 'bOIVzez4boc' },
            { songName: 'Marine Base 1', videoId: 'OKp8lpLtQ9Y' },
            { songName: 'Alpine Armored Train 1', videoId: 'fXQvL6Yw1C4' },
            { songName: 'Sea of Cloud 1', videoId: 'dgeuBFgpIvc' },
        ],
    },
    {
        name: 'Zero Wing',
        songSource: {
            songName: 'Open Your Eyes',
            arrangements: [
                {
                    source: 'Arcade',
                    videoId: 'u9GfzfjAFNo',
                },
                {
                    source: 'Mega Drive',
                    videoId: 'heMdH4ne0JQ',
                },
                {
                    source: 'PC Engine',
                    videoId: 'jYqboWg4KOc',
                },
            ],
        },
    },
    {
        name: 'ZeroRanger',
        songSource: { songName: 'It May Be Greenish', videoId: 'U0MXZ_WXtsM' },
    },
    {
        name: 'Zip Zip Zing',
        songSource: { songName: 'Stage 1, 3, 5', videoId: 'RXFcfd1oh4g', startTime: 2, endTime: 51 },
    },
];

// Games without relevant YouTube links yet.
// When a suitable YouTube video becomes available, replace '---' with the real videoId and move the entry into gameEntries above.
export const noSoundTrackGameEntries: NoSoundTrackGameEntry[] = [
    {
        name: 'Exzeal',
        series: Series.Zeal,
        songSource: { songName: 'Typhoon #12' },
    },
    {
        name: 'Sonic Wings Reunion',
        alias: ['Aero Fighters Reunion'],
        series: Series.SonicWings,
        songSource: { songName: 'Abu Dhabi, UAE stage' },
    },
];

export const games: GameEntryWithId[] = gameEntries.map((entry, index) => ({ ...entry, id: index + 1 }));

export const totalShmups: number = games.length;

export const totalSongs: number = games.reduce((count, game) => {
    const sources = Array.isArray(game.songSource) ? game.songSource : [game.songSource];
    return count + sources.reduce((c, source) => c + ('arrangements' in source ? source.arrangements.length : 1), 0);
}, 0);
