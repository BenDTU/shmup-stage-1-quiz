# Game Data

This folder contains `games.ts`, the list of games and their stage 1 themes used by the quiz.

## Adding a new game

Add a new object to the `gameEntries` array in `games.ts`. The array **must stay sorted alphabetically** by `name`, in a case-insensitive and numeric-aware way (matching the `local/sorted-games` ESLint rule). Run `npm run lint` to verify ordering — the custom `local/sorted-games` ESLint rule will report an error if any entry is out of order.

Each entry must have a `name` and a `songSource`. IDs are auto-assigned from the array position, so you don't need to set one.

### Common fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Display name of the game — see [Name vs alias](#name-vs-alias) below |
| `songSource` | `SongEntry \| [SongEntry, ...SongEntry[]]` | ✅ | The stage 1 theme(s) — see below for the three variants. When supplying an array it must be non-empty (TypeScript will reject an empty array). |
| `alias` | `string \| string[]` | ❌ | Alternative name(s) the game is known by — see [Name vs alias](#name-vs-alias) below |
| `sortName` | `string` | ❌ | Override the sort key when the display name would sort incorrectly (e.g. `'Gradius 2'` for `'Gradius II'`) |
| `series` | `Series` | ❌ | Groups related games together so they cannot appear as wrong-answer options for each other |
| `forceFirst` | `boolean` | ❌ | If `true`, this game is moved to the start of the quiz. All games with this flag set appear first (in their existing order). **For local testing purposes only, do not commit any entries up with this enabled.** |

### `songSource` variants

`songSource` has three forms depending on the game:

#### 1. Single theme — `SongEntry` with `videoId`

Use this for most games with one stage 1 theme.

| Field | Type | Required | Description |
|---|---|---|---|
| `songName` | `string` | ✅ | Track name shown on the results screen |
| `videoId` | `string` | ✅ | YouTube video ID (the part after `?v=` in the URL) |
| `startTime` | `number` | ❌ | Seconds into the video where the stage 1 theme begins (omit to start from the beginning) |
| `endTime` | `number` | ❌ | Seconds into the video where playback should stop |

#### 2. Multiple themes — array of `SongEntry`

Use this when the game has multiple distinct stage 1 themes (e.g. route-based games where different paths play different music). One is chosen at random per quiz session.

Set `songSource` to an array of `SongEntry` objects, each with a `videoId` (and optional `startTime`/`endTime`).

#### 3. Arranged — `SongEntry` with `arrangements`

Use this when the same stage 1 song has multiple notable arrangements across platforms or versions. One arrangement is chosen at random per quiz session.

Instead of `videoId`, supply an `arrangements` array:

| Field | Type | Required | Description |
|---|---|---|---|
| `songName` | `string` | ✅ | Track name shown on the results screen |
| `arrangements` | `[SongArrangement, ...SongArrangement[]]` | ✅ | At least one arrangement; one is chosen at random per quiz session. When supplying an array it must be non-empty (TypeScript will reject an empty array). |

Each `SongArrangement` has:

| Field | Type | Required | Description |
|---|---|---|---|
| `source` | `string` | ✅ | Label for the platform / version (e.g. `'Arcade'`, `'Mega Drive'`) |
| `videoId` | `string` | ✅ | YouTube video ID |
| `startTime` | `number` | ❌ | Seconds into the video where the stage 1 theme begins |
| `endTime` | `number` | ❌ | Seconds into the video where playback should stop |

### `Series` enum

If the game belongs to a series already in the `Series` enum (defined in `src/types.ts`), set the `series` field so that games from the same series are never shown as answer options for each other. Current values:

- `Series.Darius`
- `Series.Dodonpachi`
- `Series.Gradius`
- `Series.RType`
- `Series.Raiden`
- `Series.SpaceInvaders`
- `Series.Strikers1945`
- `Series.Touhou`

To add a new series, add a new entry to the `Series` enum in `src/types.ts`.

## Name vs alias

The `name` field should generally be the most recent official English name for the game. Aliases are for any other names the game is known by — alternate regional titles, older localisation names, or names from earlier releases. As examples:

- **Shienryu** has been released as *Gekioh Shooting King* and *Steel Dragon* within the *Steel Dragon EX* release, but an upcoming Console Archives release refers to it as *ShienRyu* again. `name: 'Shienryu'` with `alias: ['Gekioh Shooting King', 'Steel Dragon EX']` is appropriate. Also literally nobody calls it any of those localised names these days.
- **Gradius II** was released as *Vulcan Venture* in North America, which is out of step with the rest of the series, so Vulcan Venture as an alias is fine.
- **Dodonpachi Blissful Death** is the localised name from the old mobile port, even though *DaiOuJou* is generally what this game tends to be referred to as within the community.

As a rule of thumb: if someone typed the alias into the autocomplete to find the game, it should be there. There's probably going to be a bunch of other cases that come up where the localised name isn't generally used or liked so feel free to just use common sense where appropriate.

### Example with aliases

```ts
{
  name: 'Dodonpachi Blissful Death',
  sortName: 'Dodonpachi 2',
  alias: 'DoDonPachi DaiOuJou',
  series: Series.Dodonpachi,
  songSource: { songName: 'Stage 1', videoId: 'example' },
},
```

## Examples

### Single theme

```ts
{
  name: 'Ikaruga',
  songSource: { songName: 'Ideal', videoId: 'fAn6XxsDDTI' },
},
```

### Single theme starting partway through a video

```ts
{
  name: 'REZON',
  songSource: { songName: 'Stage 1 & 4', videoId: 'ZAKUutWAdDM', startTime: 2, endTime: 31 },
},
```

### Multiple stage 1 themes (route-based game)

```ts
{
  name: 'ESP Ra.De.',
  songSource: [
    { songName: 'DESPERATE SCHOOL (STAGE-A)', videoId: 'P3_U1wyESiA' },
    { songName: 'NIGHTMARE (STAGE-B)', videoId: 'ZoxoMoDZ-0A' },
    { songName: 'ACT IN JUDGE (STAGE-C)', videoId: 'q8s0A1R_c6k' },
  ]
},
```

### Same song across multiple platform arrangements

```ts
{
  name: 'Truxton',
  songSource: {
    songName: 'Brave Man, Far Away',
    arrangements: [
      { source: 'Arcade',     videoId: 'HjuWpzKt5QQ' },
      { source: 'Mega Drive', videoId: 'rWD0BEHbl2I' },
      { source: 'PC Engine',  videoId: 'BpT6wqbxeeM' },
    ]
  }
},
```

### Game belonging to a series, with a sort name override

```ts
{
  name: 'Gradius II',
  sortName: 'Gradius 2',
  series: Series.Gradius,
  songSource: { songName: 'Burning Heat', videoId: 'FLc1msji0_w' },
},
```

### Platform releases with entirely different soundtracks

When a port has a substantially different soundtrack — not just a different mix or arrangement of the same tracks — it is listed as a separate game entry rather than grouped with `arrangements`.

- **In the Hunt (PlayStation)** includes a completely different soundtrack from the arcade original, so it is its own entry rather than an arrangement of the arcade entry.
- **Space Invaders Extreme** on the PSP and Xbox 360 features a different soundtrack from the DS / Steam / Switch releases, so they have been included under their own entry using the not quite official name 'Space Invaders Extreme HD'
- **Space Invaders (Game Boy Advance)** is a shrunk down version of Space Invaders (1999), with its own unique soundtrack, so it is listed independently.

```ts
// Arcade original
{
  name: 'In the Hunt',
  songSource: { songName: 'THE SOUTH POLE', videoId: '9F8SiVzU1QI' },
},
// PlayStation port — different soundtrack, separate entry
{
  name: 'In the Hunt (PlayStation)',
  songSource: { songName: 'Stage 1', videoId: '7fI0-TLbPkY' },
},
```

## Other edge cases

### Tracks with no official name

If a soundtrack has no known tracklisting, use the in-game context where the song is heard as the `songName`. In most cases this will be `'Stage 1'`, but it can be more specific if the track is shared across multiple stages (e.g. `'Stage 1 & 4'`).

If a game has very few tracks and the song has no name, numbering it by position is acceptable:

```ts
// Space Invaders (GBA) only has three tracks used throughout the game
{
  name: 'Space Invaders (Game Boy Advance)',
  series: Series.SpaceInvaders,
  songSource: { songName: 'Track 1', videoId: 'XUXYxZjt2VI' },
},
```

### Many versions rolled into one entry

When a game has been released across many versions with different stage 1 songs, but can reasonably be considered the same game, they can be grouped into a single `songSource` array to avoid quiz questions that amount to "which sub-release of *DariusBurst* are you hearing?":

```ts
{
  name: 'DariusBurst',
  series: Series.Darius,
  songSource: [
    { songName: 'Good-bye My Earth', videoId: 'Hi1sF3AKPHk' },
    { songName: 'Freedom', videoId: 'eKSsVzGkcqs' },
    { songName: 'Mortification of the Flesh', videoId: 'Vke1mMHGjJA' },
    { songName: 'Suite Photoconductivity ~First Tune Iron Fossil~', videoId: 'h52k2Et3AXk' },
  ]
},
```
