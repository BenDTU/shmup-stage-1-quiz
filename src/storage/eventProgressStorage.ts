import type { QuizMode } from '../types';
import { DATA_VERSION } from './dailyProgressStorage';

export const ACTIVE_EVENT_KEY = 'shmup-quiz-active-event';
export const EVENT_PROGRESS_KEY = 'shmup-quiz-event-progress';

/** Identifies which special event occurrence a visitor has opted into replaying (see specialEvents.ts). */
export interface ActiveEventSelection {
    eventId: string;
    /** The 'YYYY-MM-DD' of the specific occurrence being replayed. */
    occurrenceDate: string;
}

export function getActiveEventSelection(): ActiveEventSelection | null {
    try {
        const raw = localStorage.getItem(ACTIVE_EVENT_KEY);
        return raw ? (JSON.parse(raw) as ActiveEventSelection) : null;
    } catch {
        return null;
    }
}

export function setActiveEventSelection(selection: ActiveEventSelection): void {
    localStorage.setItem(ACTIVE_EVENT_KEY, JSON.stringify(selection));
}

export function clearActiveEventSelection(): void {
    localStorage.removeItem(ACTIVE_EVENT_KEY);
}

export interface EventProgress extends ActiveEventSelection {
    dataVersion: number;
    mode: QuizMode;
    answers: number[];
}

/** Progress for the given event selection, kept separate from daily progress so switching between them is non-destructive. */
export function getEventProgress(selection: ActiveEventSelection): EventProgress | null {
    try {
        const raw = localStorage.getItem(EVENT_PROGRESS_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as EventProgress;
        if (parsed.eventId !== selection.eventId || parsed.occurrenceDate !== selection.occurrenceDate) return null;
        if (parsed.dataVersion !== DATA_VERSION) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveEventProgress(selection: ActiveEventSelection, progress: Omit<EventProgress, keyof ActiveEventSelection | 'dataVersion'>): void {
    localStorage.setItem(EVENT_PROGRESS_KEY, JSON.stringify({ ...progress, ...selection, dataVersion: DATA_VERSION }));
}
