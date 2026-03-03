import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
            component: () => import('../views/QuizView.vue'),
        },
        {
            path: '/results',
            name: 'results',
            component: () => import('../views/ResultsView.vue'),
        },
        {
            path: '/song-list',
            name: 'song-list',
            component: () => import('../views/SongListView.vue'),
        },
    ],
})

export default router
