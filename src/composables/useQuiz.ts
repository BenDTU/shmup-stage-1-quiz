import { reactive, computed, ref } from 'vue';
import { games } from '../data/games';
import type { Series } from '../types';
import { type Game, type GameEntryWithId, type QuizMode } from '../types';
import { getDailyProgress, saveDailyProgress, getSessionDate } from './dailyProgressStorage';

type RandomFn = () => number;

function mulberry32(seed: number): RandomFn {
    let s = seed;
    return function () {
        s |= 0;
        s = (s + 0x6D2B79F5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function getDailySeed(): number {
    const today = getSessionDate();
    let hash = 0;
    for (const char of today) {
        hash = (Math.imul(31, hash) + char.charCodeAt(0)) | 0;
    }
    // Run one round of Mulberry32 mixing to avoid adjacent-seed correlation
    hash = (hash + 0x6D2B79F5) | 0;
    let t = Math.imul(hash ^ (hash >>> 15), 1 | hash);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return (t ^ (t >>> 14)) >>> 0;
}

function shuffle<T>(arr: T[], random: RandomFn = Math.random): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
}

function resolveGame(entry: GameEntryWithId, random: RandomFn = Math.random): Game {
    const { name, alias, series, id } = entry;
    const sources = Array.isArray(entry.songSource) ? entry.songSource : [entry.songSource];
    const songEntry = sources[Math.floor(random() * sources.length)]!;

    if (!('arrangements' in songEntry)) {
        const { songName, videoId, startTime = 0, endTime } = songEntry;
        return { name, alias, series, id, songName, videoId, startTime, endTime };
    }

    const arrangements = songEntry.arrangements;
    const arrangement = arrangements[Math.floor(random() * arrangements.length)]!;
    const { songName } = songEntry;
    const { videoId, startTime = 0, endTime, source } = arrangement;

    return {
        name,
        alias,
        series,
        id,
        songName,
        videoId,
        startTime,
        endTime,
        source,
    };
}

interface QuizState {
    questions: Game[]
    currentIndex: number
    answers: number[] // guessed game id per question, -1 for a skip
    isStarted: boolean
    isAnswered: boolean
    mode: QuizMode
    noviceOptions: number[][] // 4 option IDs per question (populated in novice mode only)
}

export const QUIZ_SIZE = 20;
const SERIES_LIMIT = 3;

const state = reactive<QuizState>({
    questions: [],
    currentIndex: 0,
    answers: [],
    isStarted: false,
    isAnswered: false,
    mode: 'advanced',
    noviceOptions: [],
});

const isDaily = ref(false);
const isResumed = ref(false);

const isFinished = computed(
    () =>
        state.isAnswered &&
        state.questions.length > 0 &&
        state.currentIndex === state.questions.length - 1,
);

// IDs of games already shown as questions (excluding the current question)
const usedGameIds = computed<Set<number>>(
    () => new Set(state.questions.slice(0, state.currentIndex).map((g) => g.id)),
);

// The series whose last appearance in the quiz was just answered (while the result is being shown), or null.
// Only triggers when the series limit was actually hit (i.e. the quiz contains SERIES_LIMIT songs from that series).
const seriesJustCompleted = computed<Series | null>(() => {
    if (!state.isAnswered)
        return null;
    const currentQuestion = state.questions[state.currentIndex];

    if (!currentQuestion?.series)
        return null;

    const series = currentQuestion.series;

    // Don't show series completion if the series doesn't have enough entries to go beyond the series limit.
    if (games.filter((g) => g.series === series).length <= SERIES_LIMIT)
        return null;

    const seriesQuestions = state.questions.filter((q) => q.series === series);

    if (seriesQuestions.length < SERIES_LIMIT)
        return null;

    const lastIndexOfSeries = state.questions.reduce<number>(
        (maxIdx, q, i) => (q.series === series ? i : maxIdx),
        -1,
    );
    return lastIndexOfSeries === state.currentIndex ? series : null;
});

// Whether the user got more than half the questions from the just-completed series correct
const seriesJustCompletedMajorityCorrect = computed<boolean>(() => {
    const series = seriesJustCompleted.value;
    if (!series) return false;
    let correct = 0;
    let total = 0;
    for (let i = 0; i <= state.currentIndex; i++) {
        if (state.questions[i]?.series === series) {
            total++;
            if (state.answers[i] === state.questions[i]?.id) correct++;
        }
    }
    return total > 0 && correct > total / 2;
});

// IDs of games belonging to series that have reached the per-series limit (SERIES_LIMIT) in the current quiz
const seriesLimitedGameIds = computed<Set<number>>(() => {
    const shownSeriesCounts: Partial<Record<Series, number>> = {};
    for (const game of state.questions.slice(0, state.currentIndex)) {
        if (game.series) {
            shownSeriesCounts[game.series] = (shownSeriesCounts[game.series] ?? 0) + 1;
        }
    }
    const limitedSeries = new Set<Series>(
        (Object.entries(shownSeriesCounts) as [Series, number][])
            .filter(([, count]) => count >= SERIES_LIMIT)
            .map(([series]) => series),
    );
    if (limitedSeries.size === 0) return new Set<number>();
    return new Set(
        games.filter((g) => g.series && limitedSeries.has(g.series)).map((g) => g.id),
    );
});

function buildQuiz(mode: QuizMode, random: RandomFn) {
    const forceFirstGames = games.filter((g) => g.forceFirst);
    const shuffled = shuffle([...games].filter((g) => !g.forceFirst), random);
    const seriesCounts: Partial<Record<Series, number>> = {};
    const selected: Game[] = [];
    for (const game of [...forceFirstGames, ...shuffled]) {
        if (selected.length >= QUIZ_SIZE) break;
        if (game.series) {
            const count = seriesCounts[game.series] ?? 0;
            if (count >= SERIES_LIMIT) continue;
            seriesCounts[game.series] = count + 1;
        }
        selected.push(resolveGame(game, random));
    }

    let noviceOptions: number[][] = [];
    if (mode === 'novice') {
        noviceOptions = selected.map((question, i) => {
            const priorIds = new Set(selected.slice(0, i).map((q) => q.id));
            const priorSeriesCounts: Partial<Record<Series, number>> = {};
            for (const q of selected.slice(0, i)) {
                if (q.series) {
                    priorSeriesCounts[q.series] = (priorSeriesCounts[q.series] ?? 0) + 1;
                }
            }
            const limitedSeries = new Set<Series>(
                (Object.entries(priorSeriesCounts) as [Series, number][])
                    .filter(([, count]) => count >= SERIES_LIMIT)
                    .map(([series]) => series),
            );
            const eligible = games.filter(
                (g) =>
                    g.id !== question.id &&
                    !priorIds.has(g.id) &&
                    !(g.series && limitedSeries.has(g.series)),
            );
            const shuffledEligible = shuffle([...eligible], random);
            const incorrectIds = shuffledEligible.slice(0, 3).map((g) => g.id);
            return shuffle([...incorrectIds, question.id], random);
        });
    }

    state.questions = selected;
    state.currentIndex = 0;
    state.answers = [];
    state.isStarted = true;
    state.isAnswered = false;
    state.mode = mode;
    state.noviceOptions = noviceOptions;
}

function startQuiz(mode: QuizMode = 'advanced') {
    isDaily.value = false;
    isResumed.value = false;
    buildQuiz(mode, Math.random);
}

function startDailyQuiz(mode: QuizMode = 'advanced') {
    isDaily.value = true;
    isResumed.value = false;
    buildQuiz(mode, mulberry32(getDailySeed()));
    saveDailyProgress({ mode, answers: [] });
}

function submitGuess(gameId: number) {
    if (state.isAnswered) return;
    const currentGame = state.questions[state.currentIndex];
    if (!currentGame) return;
    const isSkip = gameId === -1;
    if (!isSkip && !games.find((g) => g.id === gameId)) return;
    state.answers.push(gameId);
    state.isAnswered = true;
    if (isDaily.value) {
        saveDailyProgress({
            mode: state.mode,
            answers: [...state.answers],
        });
    }
}

function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        state.isAnswered = false;
    }
}

function resumeDailyQuiz(): boolean {
    const progress = getDailyProgress();
    if (!progress) return false;
    isDaily.value = true;
    isResumed.value = true;
    buildQuiz(progress.mode, mulberry32(getDailySeed()));
    state.answers = [...progress.answers];
    const finished = progress.answers.length === state.questions.length;
    state.currentIndex = finished ? state.questions.length - 1 : progress.answers.length;
    state.isAnswered = finished;
    return true;
}

function resetQuiz() {
    state.questions = [];
    state.currentIndex = 0;
    state.answers = [];
    state.isStarted = false;
    state.isAnswered = false;
    state.mode = 'advanced';
    state.noviceOptions = [];
    isResumed.value = false;
}

export function useQuiz() {
    return {
        state,
        isDaily,
        isResumed,
        isFinished,
        usedGameIds,
        seriesLimitedGameIds,
        seriesJustCompleted,
        seriesJustCompletedMajorityCorrect,
        startQuiz,
        startDailyQuiz,
        resumeDailyQuiz,
        submitGuess,
        nextQuestion,
        resetQuiz,
    };
}
