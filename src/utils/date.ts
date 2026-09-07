/** Formats a 'YYYY-MM-DD' date string as e.g. '9 September 2026', treating it as UTC. */
export function formatUtcDate(dateStr: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(dateStr + 'T00:00:00Z'));
}
