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
            // 뒤로가기/앞으로가기 시 이전 스크롤 위치로 이동
            return savedPosition
        } else {
            // 그 외에는 맨 위로 이동
            return { top: 0 }
        }
    },
    routes
})

export default router