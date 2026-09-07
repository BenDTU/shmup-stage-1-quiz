import { ref, computed } from 'vue';
import {
    getActiveEventSelection,
    setActiveEventSelection,
    clearActiveEventSelection,
    type ActiveEventSelection,
} from '../storage/eventProgressStorage';
import { todaysSpecialEvent, getEventById, type SpecialEvent } from '../data/specialEvents';

// Shared across the whole app (not per-component) so App.vue's site-wide theming and
// HomeView's Daily Challenge section always agree on which event, if any, is active.
const activeEventSelection = ref<ActiveEventSelection | null>(getActiveEventSelection());

// The event currently driving the site's theme: either a visitor-toggled replay of a past
// event, or today's own special event (if today happens to be one).
const activeThemeEvent = computed<SpecialEvent | undefined>(() => (
    activeEventSelection.value ? getEventById(activeEventSelection.value.eventId) : todaysSpecialEvent
));

function setActiveEvent(selection: ActiveEventSelection) {
    setActiveEventSelection(selection);
    activeEventSelection.value = selection;
}

function clearActiveEvent() {
    clearActiveEventSelection();
    activeEventSelection.value = null;
}

export function useActiveEvent() {
    return { activeEventSelection, activeThemeEvent, setActiveEvent, clearActiveEvent };
}
