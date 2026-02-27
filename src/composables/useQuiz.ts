import { reactive, computed } from 'vue'
import { games, type Game, Franchise } from '../data/games'

export interface QuizAnswer {
  game: Game
  userGuess: string
  isCorrect: boolean
}

interface QuizState {
  questions: Game[]
  currentIndex: number
  answers: QuizAnswer[]
  isStarted: boolean
  isAnswered: boolean
}

const QUIZ_SIZE = 20
const FRANCHISE_LIMIT = 3

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

// IDs of games belonging to franchises that have reached the 3-game limit in the current quiz
const franchiseLimitedGameIds = computed<Set<number>>(() => {
  const shownFranchiseCounts: Partial<Record<Franchise, number>> = {}
  for (const game of state.questions.slice(0, state.currentIndex + 1)) {
    if (game.franchise) {
      shownFranchiseCounts[game.franchise] = (shownFranchiseCounts[game.franchise] ?? 0) + 1
    }
  }
  const limitedFranchises = new Set<Franchise>(
    (Object.entries(shownFranchiseCounts) as [Franchise, number][])
      .filter(([, count]) => count >= FRANCHISE_LIMIT)
      .map(([franchise]) => franchise),
  )
  if (limitedFranchises.size === 0) return new Set<number>()
  return new Set(
    games.filter((g) => g.franchise && limitedFranchises.has(g.franchise)).map((g) => g.id),
  )
})

function startQuiz() {
  const shuffled = [...games].sort(() => Math.random() - 0.5)
  const franchiseCounts: Partial<Record<Franchise, number>> = {}
  const selected: Game[] = []
  for (const game of shuffled) {
    if (selected.length >= QUIZ_SIZE) break
    if (game.franchise) {
      const count = franchiseCounts[game.franchise] ?? 0
      if (count >= FRANCHISE_LIMIT) continue
      franchiseCounts[game.franchise] = count + 1
    }
    selected.push(game)
  }
  state.questions = selected
  state.currentIndex = 0
  state.answers = []
  state.isStarted = true
  state.isAnswered = false
}

function submitGuess(guess: string) {
  if (state.isAnswered) return
  const currentGame = state.questions[state.currentIndex]
  if (!currentGame) return
  const isCorrect = guess.trim().toLowerCase() === currentGame.name.toLowerCase()
  state.answers.push({ game: currentGame, userGuess: guess.trim(), isCorrect })
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
  return { state, isFinished, usedGameIds, franchiseLimitedGameIds, startQuiz, submitGuess, nextQuestion, resetQuiz }
}
