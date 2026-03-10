import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue';
import ResultsView from '../views/ResultsView.vue';
import SongListView  from '../views/SongListView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: QuizView,
        },
        {
            path: '/results',
            name: 'results',
            component: ResultsView,
        },
        {
            path: '/song-list',
            name: 'song-list',
            component: SongListView,
        },
    ],
})

export default router
