import type { QuizMode } from '../types';
import { games } from '../data/games';

const STORAGE_KEY = 'shmup-quiz-daily';

let dataVersionMismatch = false;

export function wasProgressInvalidated(): boolean {
    return dataVersionMismatch;
}

// Captured once when the module first loads — fixed for the lifetime of this page session
const SESSION_DATE: string = new Date().toISOString().slice(0, 10);

// Hash of the structure that drives PRNG consumption in resolveGame:
// game ID, number of song sources, and arrangement count per source.
// Changes whenever games are added/removed/reordered or song sources/arrangements change.
const DATA_VERSION: number = (() => {
    let hash = 0;
    for (const g of games) {
        const sources = Array.isArray(g.songSource) ? g.songSource : [g.songSource];
        for (const s of sources) {
            const count = 'arrangements' in s ? s.arrangements.length : 0;
            hash = (Math.imul(31, hash) + g.id) | 0;
            hash = (Math.imul(31, hash) + count) | 0;
        }
    }
    return hash >>> 0;
})();

export interface DailyProgress {
    date: string;
    dataVersion: number;
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
        if (parsed.dataVersion !== DATA_VERSION) {
            dataVersionMismatch = true;
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

export function saveDailyProgress(progress: Omit<DailyProgress, 'date' | 'dataVersion'>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, date: SESSION_DATE, dataVersion: DATA_VERSION }));
}
