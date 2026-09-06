import { Series } from '../types';

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
    /** CSS color used for the results message text. */
    resultsMessageColor?: string
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
        resultsMessageColor: 'lightblue',
    },
];

/** Returns the special event active for the given 'YYYY-MM-DD' date string, if any. */
export function getActiveSpecialEvent(sessionDate: string): SpecialEvent | undefined {
    const monthDay = sessionDate.slice(5);
    return specialEvents.find((event) => event.date === monthDay);
}
