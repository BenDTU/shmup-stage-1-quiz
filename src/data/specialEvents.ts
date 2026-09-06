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
        resultsMessage: 'Happy Cirno Day!',
        themeColor: 'info',
    },
];

/** Returns the special event active for the given 'YYYY-MM-DD' date string, if any. */
export function getActiveSpecialEvent(sessionDate: string): SpecialEvent | undefined {
    const monthDay = sessionDate.slice(5);
    return specialEvents.find((event) => event.date === monthDay);
}

/** The special event active for the current page session's date, if any. */
export const todaysSpecialEvent: SpecialEvent | undefined = getActiveSpecialEvent(SESSION_DATE);
