/** Formats a 'YYYY-MM-DD' date string as e.g. '9 September 2026', treating it as UTC. */
export function formatUtcDate(dateStr: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(dateStr + 'T00:00:00Z'));
}

/** Whole days from `fromDate` to `toDate` (both 'YYYY-MM-DD', UTC). Negative if `toDate` is earlier. */
export function daysBetweenDates(fromDate: string, toDate: string): number {
    const [fy, fm, fd] = fromDate.split('-').map(Number);
    const [ty, tm, td] = toDate.split('-').map(Number);
    return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86_400_000);
}
