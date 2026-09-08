import type { QuizMode } from '../types';
import { DATA_VERSION, peekStoredDailyProgress, SESSION_DATE } from './dailyProgressStorage';
import { getEventById } from '../data/specialEvents';
import { daysBetweenDates } from '../utils/date';

export const ACTIVE_EVENT_KEY = 'shmup-quiz-active-event';
export const EVENT_PROGRESS_KEY = 'shmup-quiz-event-progress';

/** Identifies which special event occurrence a visitor has opted into replaying (see specialEvents.ts). */
export interface ActiveEventSelection {
    eventId: string;
    /** The 'YYYY-MM-DD' of the specific occurrence being replayed. */
    occurrenceDate: string;
}

// Auto-expires: a selection is only honored while today is still within that event's
// postEventDays window, so a stale toggle left over from a previous visit (or a previous
// year's occurrence) doesn't silently keep showing a replay long after it should have.
export function getActiveEventSelection(): ActiveEventSelection | null {
    try {
        const raw = localStorage.getItem(ACTIVE_EVENT_KEY);
        if (!raw) return null;
        const selection = JSON.parse(raw) as ActiveEventSelection;
        const event = getEventById(selection.eventId);
        const daysSince = daysBetweenDates(selection.occurrenceDate, SESSION_DATE);
        if (!event?.postEventDays || daysSince < 0 || daysSince > event.postEventDays) {
            localStorage.removeItem(ACTIVE_EVENT_KEY);
            return null;
        }
        return selection;
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

function readStoredEventProgress(): EventProgress | null {
    try {
        const raw = localStorage.getItem(EVENT_PROGRESS_KEY);
        return raw ? (JSON.parse(raw) as EventProgress) : null;
    } catch {
        return null;
    }
}

/** Progress for the given event selection, kept separate from daily progress so switching between them is non-destructive. */
export function getEventProgress(selection: ActiveEventSelection): EventProgress | null {
    const stored = readStoredEventProgress();
    if (
        stored
        && stored.eventId === selection.eventId
        && stored.occurrenceDate === selection.occurrenceDate
        && stored.dataVersion === DATA_VERSION
    ) {
        return stored;
    }

    // If the visitor played this event live on the day itself, that run is saved as ordinary
    // daily progress — which "expires" the moment the date rolls past it, since daily progress
    // only ever matches *today*. Adopt that now-orphaned entry instead of starting them over:
    // the quiz it produced is deterministically identical to what a replay would build (same
    // date seed, same event override), so the stored answers are directly reusable.
    const daily = peekStoredDailyProgress();
    if (daily && daily.date === selection.occurrenceDate && daily.dataVersion === DATA_VERSION) {
        return { ...selection, dataVersion: daily.dataVersion, mode: daily.mode, answers: daily.answers };
    }

    return null;
}

export function saveEventProgress(selection: ActiveEventSelection, progress: Omit<EventProgress, keyof ActiveEventSelection | 'dataVersion'>): void {
    localStorage.setItem(EVENT_PROGRESS_KEY, JSON.stringify({ ...progress, ...selection, dataVersion: DATA_VERSION }));
}
