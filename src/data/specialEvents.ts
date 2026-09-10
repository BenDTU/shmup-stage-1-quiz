import { Series } from '../types';
import { SESSION_DATE } from '../storage/dailyProgressStorage';

/**
 * The Bootstrap theme color used to reskin the daily-quiz "gold" UI (home page
 * daily buttons, quiz header, results page daily styling, etc) for an event.
 * See the `.special-event-*` classes in `src/assets/main.scss` for how each
 * color is wired up.
 */
export type BootstrapThemeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'light' | 'dark';

/**
 * A themed override applied to the daily quiz on a specific recurring date.
 * Add new events to the `specialEvents` array below to introduce more of them.
 */
export interface SpecialEvent {
    id: string
    name: string
    /** Month and day this event recurs on every year, as 'MM-DD' (UTC). */
    date: string
    /**
     * If set, the daily quiz is built entirely from this series, bypassing the
     * usual per-series limit (SERIES_LIMIT) for both question selection and
     * multiple-choice wrong-answer options.
     */
    seriesOverride?: Series
    /** If set, forces this specific song to be the final question of the daily quiz. */
    finalSong?: {
        gameName: string
        songName: string
    }
    /** Message shown on the results page, above the mastered-series awards. */
    resultsMessage?: string
    /** Recolors the usual gold "daily" theme throughout the app. Defaults to gold when omitted. */
    themeColor?: BootstrapThemeColor
    /** If set, a home-page countdown ('X days until <name>!') is shown starting this many days before the event. */
    countdownDays?: number
    /** If set, a home-page 'I missed <name>!' link is shown for this many days after the event, letting a visitor opt into replaying it. */
    postEventDays?: number
}

const specialEvents: SpecialEvent[] = [
    {
        id: 'cirno-day',
        name: 'Cirno Day',
        date: '09-09',
        seriesOverride: Series.Touhou,
        finalSong: {
            gameName: 'Touhou 9: Phantasmagoria of Flower View',
            songName: 'Adventure of the Lovestruck Tomboy',
        },
        resultsMessage: 'Happy Cirno Day! ⑨',
        themeColor: 'info',
        countdownDays: 7,
        postEventDays: 7,
    },
];

/** Returns the special event active for the given 'YYYY-MM-DD' date string, if any. */
export function getActiveSpecialEvent(sessionDate: string): SpecialEvent | undefined {
    const monthDay = sessionDate.slice(5);
    return specialEvents.find((event) => event.date === monthDay);
}

/** Returns the event with the given id, if any (e.g. one stored in an ActiveEventSelection). */
export function getEventById(id: string): SpecialEvent | undefined {
    return specialEvents.find((event) => event.id === id);
}

/** Days from `sessionDate` ('YYYY-MM-DD') until the next occurrence of `monthDay` ('MM-DD'), 0 if it's today. */
function daysUntilNextOccurrence(monthDay: string, sessionDate: string): number {
    const [year, month, day] = sessionDate.split('-').map(Number);
    const [eventMonth, eventDay] = monthDay.split('-').map(Number);
    const from = Date.UTC(year, month - 1, day);
    let target = Date.UTC(year, eventMonth - 1, eventDay);
    if (target < from) target = Date.UTC(year + 1, eventMonth - 1, eventDay);
    return Math.round((target - from) / 86_400_000);
}

export interface UpcomingEventCountdown {
    name: string
    daysUntil: number
    themeColor?: BootstrapThemeColor
}

/** The nearest upcoming event whose countdown window has started, for the given session date, if any. */
export function getUpcomingEventCountdown(sessionDate: string): UpcomingEventCountdown | undefined {
    for (const event of specialEvents) {
        if (!event.countdownDays) continue;
        const daysUntil = daysUntilNextOccurrence(event.date, sessionDate);
        if (daysUntil > 0 && daysUntil <= event.countdownDays) {
            return { name: event.name, daysUntil, themeColor: event.themeColor };
        }
    }
    return undefined;
}

/** Days since (and the 'YYYY-MM-DD' of) the most recent occurrence of `monthDay` on or before `sessionDate`. */
function daysSinceLastOccurrence(monthDay: string, sessionDate: string): { daysSince: number; occurrenceDate: string } {
    const [year, month, day] = sessionDate.split('-').map(Number);
    const [eventMonth, eventDay] = monthDay.split('-').map(Number);
    const from = Date.UTC(year, month - 1, day);
    let target = Date.UTC(year, eventMonth - 1, eventDay);
    if (target > from) target = Date.UTC(year - 1, eventMonth - 1, eventDay);
    const daysSince = Math.round((from - target) / 86_400_000);
    const occurrenceDate = new Date(target).toISOString().slice(0, 10);
    return { daysSince, occurrenceDate };
}

export interface MissedEventWindow {
    event: SpecialEvent
    /** The 'YYYY-MM-DD' of the specific occurrence that was missed, used to rebuild that exact quiz. */
    occurrenceDate: string
}

/** The event whose "I missed it" replay window is currently open, for the given session date, if any. */
export function getMissedEventWindow(sessionDate: string): MissedEventWindow | undefined {
    for (const event of specialEvents) {
        if (!event.postEventDays) continue;
        const { daysSince, occurrenceDate } = daysSinceLastOccurrence(event.date, sessionDate);
        if (daysSince > 0 && daysSince <= event.postEventDays) {
            return { event, occurrenceDate };
        }
    }
    return undefined;
}

const DEBUG_EVENT_STORAGE_KEY = 'shmup-quiz-debug-event';

// Dev-only test hook: `?debug-event=<id>` persists an override to localStorage (so it
// sticks across page navigation, unlike the query param itself). `?debug-event=off`
// clears it. No effect in production builds.
if (!import.meta.env.PROD && typeof window !== 'undefined') {
    const override = new URLSearchParams(window.location.search).get('debug-event');
    if (override === 'off') {
        localStorage.removeItem(DEBUG_EVENT_STORAGE_KEY);
    } else if (override && specialEvents.some((event) => event.id === override)) {
        localStorage.setItem(DEBUG_EVENT_STORAGE_KEY, override);
    }
}

function getDebugEventOverride(): SpecialEvent | undefined {
    if (import.meta.env.PROD || typeof localStorage === 'undefined') return undefined;
    const id = localStorage.getItem(DEBUG_EVENT_STORAGE_KEY);
    return id ? specialEvents.find((event) => event.id === id) : undefined;
}

/** The special event active for the current page session, if any (see getDebugEventOverride for how to force one on outside production). */
export const todaysSpecialEvent: SpecialEvent | undefined = getDebugEventOverride() ?? getActiveSpecialEvent(SESSION_DATE);

/** The upcoming event countdown to show on the home page for the current page session, if any. */
export const upcomingEventCountdown: UpcomingEventCountdown | undefined = getUpcomingEventCountdown(SESSION_DATE);

/** The "I missed it" replay window to offer on the home page for the current page session, if any. */
export const missedEventWindow: MissedEventWindow | undefined = getMissedEventWindow(SESSION_DATE);
