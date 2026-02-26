# Shmup Stage 1 Quiz

A quiz to see how well you know Shmup stage 1 themes.

Built with Vue 3, TypeScript, Vite and Bootstrap 5.

## How to play

1. Press **Start Quiz** — 20 stage 1 themes are randomly selected from the pool.
2. Listen to the embedded YouTube video and guess which game the theme belongs to using the autocomplete search box.
3. You get **one guess** per song. The answer is revealed before you move on.
4. Games that have already appeared as questions are disabled in the autocomplete for later songs.
5. After all 20 questions your score and a full answer breakdown are shown.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
```

## Updating the game list

The list of games and their YouTube video IDs lives in [`src/data/games.ts`](src/data/games.ts).
Each entry has a `videoId` (YouTube video ID) and an optional `startTime` (seconds) to jump to the stage 1 theme in a full-OST video.
