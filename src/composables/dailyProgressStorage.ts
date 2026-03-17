import type { QuizMode } from '../types';

const STORAGE_KEY = 'shmup-quiz-daily';

// Captured once when the module first loads — fixed for the lifetime of this page session
const SESSION_DATE: string = new Date().toISOString().slice(0, 10);

export interface DailyProgress {
    date: string;
    mode: QuizMode;
    answers: number[];
}

// Returns the actual current date — used by DailyCountdown to detect day rollover
export function getTodayDate(): string {
    return new Date().toISOString().slice(0, 10);
}

// Returns the date as of page load — used for seed/progress so they don't shift mid-session
export function getSessionDate(): string {
    return SESSION_DATE;
}

export function getDailyProgress(): DailyProgress | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as DailyProgress;
        if (parsed.date !== SESSION_DATE) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveDailyProgress(progress: Omit<DailyProgress, 'date'>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, date: SESSION_DATE }));
}
