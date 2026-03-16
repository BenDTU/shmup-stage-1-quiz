import type { QuizMode } from '../types';

const STORAGE_KEY = 'shmup-quiz-daily';

export interface DailyProgress {
    date: string;
    mode: QuizMode;
    answers: number[];
}

function getTodayDate(): string {
    return new Date().toISOString().slice(0, 10);
}

export function getDailyProgress(): DailyProgress | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as DailyProgress;
        if (parsed.date !== getTodayDate()) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveDailyProgress(progress: Omit<DailyProgress, 'date'>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, date: getTodayDate() }));
}
