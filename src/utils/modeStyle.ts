import type { QuizMode } from '../types';

export const MODE_COLOR: Record<QuizMode, string> = {
    novice: 'primary',
    intermediate: 'success',
    advanced: 'danger',
};

export const MODE_LABEL: Record<QuizMode, string> = {
    novice: 'Novice',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
};
