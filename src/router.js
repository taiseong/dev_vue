import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostDetailView from '@/views/PostDetailView.vue'

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: HomeView 
    },
    { 
        path: '/about', 
        name: 'about', 
        component: AboutView 
    },
    { path: 
        '/post/:postId', 
        name: 'postDetail', 
        component: PostDetailView 
    },
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            //return savedPosition;
            return { ...savedPosition, behavior: 'instant' } // { left, top }만 있으면 즉시 이동
        }
        return { top: 0 }
    },
    routes
})

export default router