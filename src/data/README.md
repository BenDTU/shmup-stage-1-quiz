# Game Data

This folder contains `games.ts`, the list of games and their stage 1 themes used by the quiz.

## Adding a new game

Add a new object to the `gameEntries` array in `games.ts`. The array **must stay sorted alphabetically** by `name` (with Roman numerals treated as numbers). Run `npm run lint` to verify ordering — the custom `local/sorted-games` ESLint rule will report an error if any entry is out of order.

Each entry must have a `name` and exactly one of the three song source fields: `singleSongSource`, `multipleSongSource`, or `arrangedSongSource`. IDs are auto-assigned from the array position, so you don't need to set one.

### Common fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✅ | Display name of the game |
| `singleSongSource` | `SongSource` | One of three | Use when there is one stage 1 theme |
| `multipleSongSource` | `SongSource[]` | One of three | Use when the game has multiple distinct stage 1 themes (e.g. route-based games) |
| `arrangedSongSource` | `ArrangedSongSource` | One of three | Use when the same stage 1 song has multiple notable arrangements across platforms |
| `franchise` | `Franchise` | ❌ | Groups related games together so they cannot appear as wrong-answer options for each other |
| `forceFirst` | `boolean` | ❌ | If `true`, this game will always be the first question in a quiz |

### `SongSource` (used by `singleSongSource` and `multipleSongSource`)

| Field | Type | Required | Description |
|---|---|---|---|
| `songName` | `string` | ✅ | Track name shown on the results screen |
| `videoId` | `string` | ✅ | YouTube video ID (the part after `?v=` in the URL) |
| `startTime` | `number` | ❌ | Seconds into the video where the stage 1 theme begins (omit to start from the beginning) |
| `endTime` | `number` | ❌ | Seconds into the video where playback should stop |

### `ArrangedSongSource` (used by `arrangedSongSource`)

Use this when the same stage 1 song exists in several platform-specific arrangements you want to include separately.

| Field | Type | Required | Description |
|---|---|---|---|
| `songName` | `string` | ✅ | Track name shown on the results screen |
| `arrangements` | `SongArrangement[]` | ✅ | At least one arrangement (see below); one is chosen at random per quiz session |

Each arrangement in the `arrangements` array has:

| Field | Type | Required | Description |
|---|---|---|---|
| `source` | `string` | ✅ | Label for the platform / version (e.g. `"Arcade"`, `"Mega Drive"`) |
| `videoId` | `string` | ✅ | YouTube video ID |
| `startTime` | `number` | ❌ | Seconds into the video where the stage 1 theme begins |
| `endTime` | `number` | ❌ | Seconds into the video where playback should stop |

### `Franchise` enum

If the game belongs to a series already in the `Franchise` enum (defined in `src/types.ts`), set the `franchise` field so that games from the same series are never shown as answer options for each other. Current values:

- `Franchise.Darius`
- `Franchise.Dodonpachi`
- `Franchise.Gradius`
- `Franchise.RType`
- `Franchise.Raiden`
- `Franchise.SpaceInvaders`
- `Franchise.Touhou`

To add a new franchise, add a new entry to the `Franchise` enum in `src/types.ts`.

## Examples

### Single theme

```ts
{
  name: 'Ikaruga',
  singleSongSource: { songName: 'Ideal', videoId: 'fAn6XxsDDTI' },
},
```

### Single theme starting partway through a video

```ts
{
  name: 'REZON',
  singleSongSource: { songName: 'Stage 1 & 4', videoId: 'ZAKUutWAdDM', startTime: 2, endTime: 31 },
},
```

### Multiple stage 1 themes (route-based game)

```ts
{
  name: 'ESP Ra.De.',
  multipleSongSource: [
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
  arrangedSongSource: {
    songName: 'Stage 1',
    arrangements: [
      { source: 'Arcade',      videoId: 'HjuWpzKt5QQ' },
      { source: 'Mega Drive',  videoId: 'rWD0BEHbl2I' },
      { source: 'PC Engine',   videoId: 'BpT6wqbxeeM' },
    ]
  }
},
```

### Game belonging to a franchise

```ts
{
  name: 'DoDonPachi',
  franchise: Franchise.Dodonpachi,
  singleSongSource: { songName: '1 & 4 Scene BGM', videoId: 'nDMjMv6COIU' },
},
```
