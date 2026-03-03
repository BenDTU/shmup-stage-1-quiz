# Game Data

This folder contains `games.ts`, the list of games and their stage 1 themes used by the quiz.

## Adding a new game

Add a new object to the `gameEntries` array in `games.ts`. The array **must stay sorted alphabetically** by `name`. Run `npm run lint` to verify ordering — the custom `local/sorted-games` ESLint rule will report an error if any entry is out of order.

Each entry must have a `name` and a `songSource`. IDs are auto-assigned from the array position, so you don't need to set one.

### Common fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Display name of the game |
| `songSource` | `SongEntry \| SongEntry[]` | ✅ | The stage 1 theme(s) — see below for the three variants |
| `sortName` | `string` | ❌ | Override the sort key when the display name would sort incorrectly (e.g. `'Gradius 2'` for `'Gradius II'`) |
| `series` | `Series` | ❌ | Groups related games together so they cannot appear as wrong-answer options for each other |
| `forceFirst` | `boolean` | ❌ | If `true`, this game will always be the first question in a quiz |

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
| `arrangements` | `SongArrangement[]` | ✅ | At least one arrangement; one is chosen at random per quiz session |

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
