import { reactive, computed } from 'vue'
import { games } from '../data/games'
import { type Game, type GameEntryWithId, Series } from '../types'

function resolveGame(entry: GameEntryWithId): Game {
    const { name, alias, series, id } = entry
    const sources = Array.isArray(entry.songSource) ? entry.songSource : [entry.songSource]
    const songEntry = sources[Math.floor(Math.random() * sources.length)]!

    if (!('arrangements' in songEntry)) {
        const { songName, videoId, startTime = 0, endTime } = songEntry
        return { name, alias, series, id, songName, videoId, startTime, endTime }
    }
  
    const arrangements = songEntry.arrangements
    const arrangement = arrangements[Math.floor(Math.random() * arrangements.length)]!
    const { songName } = songEntry;
    const { videoId, startTime = 0, endTime, source } = arrangement

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
    }
}

interface QuizState {
    questions: Game[]
    currentIndex: number
    answers: number[] // guessed game id per question, -1 for a skip
    isStarted: boolean
    isAnswered: boolean
}

const QUIZ_SIZE = 20
const SERIES_LIMIT = 3

const state = reactive<QuizState>({
    questions: [],
    currentIndex: 0,
    answers: [],
    isStarted: false,
    isAnswered: false,
})

const isFinished = computed(
    () =>
        state.isAnswered &&
        state.questions.length > 0 &&
        state.currentIndex === state.questions.length - 1,
)

// IDs of games already shown as questions (excluding the current question)
const usedGameIds = computed<Set<number>>(
    () => new Set(state.questions.slice(0, state.currentIndex).map((g) => g.id)),
)

// The series whose last appearance in the quiz was just answered (while the result is being shown), or null.
// Only triggers when the series limit was actually hit (i.e. the quiz contains SERIES_LIMIT songs from that series).
const seriesJustCompleted = computed<Series | null>(() => {
    if (!state.isAnswered) return null
    const currentQuestion = state.questions[state.currentIndex]
    if (!currentQuestion?.series) return null
    const series = currentQuestion.series
    const seriesQuestions = state.questions.filter((q) => q.series === series)
    if (seriesQuestions.length < SERIES_LIMIT) return null
    const lastIndexOfSeries = state.questions.reduce<number>(
        (maxIdx, q, i) => (q.series === series ? i : maxIdx),
        -1,
    )
    return lastIndexOfSeries === state.currentIndex ? series : null
})

// Whether the user got more than half the questions from the just-completed series correct
const seriesJustCompletedMajorityCorrect = computed<boolean>(() => {
    const series = seriesJustCompleted.value
    if (!series) return false
    let correct = 0
    let total = 0
    for (let i = 0; i <= state.currentIndex; i++) {
        if (state.questions[i]?.series === series) {
            total++
            if (state.answers[i] === state.questions[i]?.id) correct++
        }
    }
    return total > 0 && correct > total / 2
})

// IDs of games belonging to series that have reached the per-series limit (SERIES_LIMIT) in the current quiz
const seriesLimitedGameIds = computed<Set<number>>(() => {
    const shownSeriesCounts: Partial<Record<Series, number>> = {}
    for (const game of state.questions.slice(0, state.currentIndex)) {
        if (game.series) {
            shownSeriesCounts[game.series] = (shownSeriesCounts[game.series] ?? 0) + 1
        }
    }
    const limitedSeries = new Set<Series>(
        (Object.entries(shownSeriesCounts) as [Series, number][])
            .filter(([, count]) => count >= SERIES_LIMIT)
            .map(([series]) => series),
    )
    if (limitedSeries.size === 0) return new Set<number>()
    return new Set(
        games.filter((g) => g.series && limitedSeries.has(g.series)).map((g) => g.id),
    )
})

function startQuiz() {
    const forceFirstGames = games.filter((g) => g.forceFirst)
    const shuffled = [...games].filter((g) => !g.forceFirst).sort(() => Math.random() - 0.5)
    const seriesCounts: Partial<Record<Series, number>> = {}
    const selected: Game[] = []
    for (const game of [...forceFirstGames, ...shuffled]) {
        if (selected.length >= QUIZ_SIZE) break
        if (game.series) {
            const count = seriesCounts[game.series] ?? 0
            if (count >= SERIES_LIMIT) continue
            seriesCounts[game.series] = count + 1
        }
        selected.push(resolveGame(game))
    }
    state.questions = selected
    state.currentIndex = 0
    state.answers = []
    state.isStarted = true
    state.isAnswered = false
}

function submitGuess(gameId: number) {
    if (state.isAnswered) return
    const currentGame = state.questions[state.currentIndex]
    if (!currentGame) return
    const isSkip = gameId === -1
    if (!isSkip && !games.find((g) => g.id === gameId)) return
    state.answers.push(gameId)
    state.isAnswered = true
}

function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++
        state.isAnswered = false
    }
}

function resetQuiz() {
    state.questions = []
    state.currentIndex = 0
    state.answers = []
    state.isStarted = false
    state.isAnswered = false
}

export function useQuiz() {
    return { state, isFinished, usedGameIds, seriesLimitedGameIds, seriesJustCompleted, seriesJustCompletedMajorityCorrect, startQuiz, submitGuess, nextQuestion, resetQuiz }
}
