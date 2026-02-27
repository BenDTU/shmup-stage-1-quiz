import { reactive, computed } from 'vue'
import { games, type Game } from '../data/games'

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

function startQuiz() {
  const shuffled = [...games].sort(() => Math.random() - 0.5)
  state.questions = shuffled.slice(0, QUIZ_SIZE)
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
  return { state, isFinished, usedGameIds, startQuiz, submitGuess, nextQuestion, resetQuiz }
}
