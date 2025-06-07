<template>
    <div class="main-container d-flex flex-row align-items-stretch justify-content-center">
        <!-- 좌측 배너 -->
        <!--
        <aside class="banner-left d-none d-md-flex align-items-center justify-content-center">
        <div class="banner-box">좌측<br>배너</div>
        </aside>
        -->
        <!-- 가운데 영역 (헤더, 본문, 푸터) -->
        <div class="center-layout d-flex flex-column align-items-center">
            <!-- 헤더 -->
            <nav class="navbar navbar-light bg-light header-bar mx-auto">
                <div class="w-100 d-flex align-items-center justify-content-center position-relative">
                    <button class="btn btn-outline-primary d-md-none position-absolute start-0 ms-2" type="button"
                        @click="openSidebar" style="z-index:2;">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand m-0" href="#" style="font-weight:bold;font-size:1.5rem;">MySite</a>
                </div>
            </nav>

            <!-- 오버레이: 모바일에서만 사이드바 열릴 때 표시 -->
            <div v-if="sidebarOpen && isMobile" class="offcanvas-backdrop fade show" @click="closeSidebar"
                style="z-index: 1040;"></div>

            <!-- 메인 레이아웃 (레프트 메뉴+바디) -->
            <div class="content-row d-flex w-100 flex-grow-1">
                <!-- 레프트 메뉴(PC: 항상, 모바일: 토글/푸시) -->
                <nav :class="[
                    'sidebar',
                    'bg-light',
                    'border-end',
                    'vh-100',
                    'p-3',
                    isMobile && sidebarOpen ? 'sidebar-open' : ''
                ]">
                    <!-- 영역1: 로고 + 설정버튼 -->
                    <div class="sidebar-section d-flex align-items-center justify-content-between mb-3">
                        <span class="sidebar-logo fw-bold" style="font-size:1.2rem;">LOGO</span>
                        <button class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-gear"></i> <!-- Bootstrap Icons 사용시 -->
                            설정
                        </button>
                    </div>
                    <!-- 영역2: 로그인 버튼 -->
                    <div class="sidebar-section mb-3">
                        <button class="btn btn-primary w-100">로그인</button>
                    </div>
                    <!-- 영역3: 기존 메뉴 -->
                    <ul class="nav flex-column">
                        <li class="nav-item"><a class="nav-link active" href="#">대시보드</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">메뉴A</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">메뉴B</a></li>
                    </ul>
                </nav>

                <!-- 바디(본문) -->
                <main class="body-content flex-grow-1 px-4 py-3">
                    <!-- 검색 영역 -->
                    <form class="search-bar mb-4 d-flex" @submit.prevent>
                        <input type="text" class="form-control me-2" placeholder="검색어를 입력하세요" v-model="searchKeyword" />
                        <button type="submit" class="btn btn-primary">검색</button>
                    </form>

                    <PostListPc v-if="!isMobile" :posts="posts" @titleClick="goDetail" />
                    <PostListMobile v-else :posts="posts" @rowClick="goDetail" />

                </main>
            </div>

            <!-- 푸터 -->
            <footer class="footer bg-dark text-white text-center footer-bar mx-auto">
                &copy; 2025 MySite. All rights reserved.
            </footer>
        </div>

        <!-- 우측 배너 -->
        <!--
        <aside class="banner-right d-none d-md-flex align-items-center justify-content-center">
        <div class="banner-box">우측<br>배너</div>
        </aside>
        -->
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PostListPc from '../components/PostListPc.vue'
import PostListMobile from '../components/PostListMobile.vue'

const sidebarOpen = ref(false)
const isMobile = ref(window.innerWidth < 768)

const handleResize = () => {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) sidebarOpen.value = false
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

const openSidebar = () => (sidebarOpen.value = true)
const closeSidebar = () => (sidebarOpen.value = false)

function goDetail(id) {
    // 상세 페이지 이동 로직
    alert('상세 페이지 이동: ' + id)
}

const posts = [
    { id: 1, title: '1아주아주아주아주아주아주아주아주아주아주 긴 게시글 제목 예시입니다', writer: '홍길동', date: '2025-06-07', comments: 5 },
    { id: 2, title: '2아주아주아주아주아주아주아주아주아주아주 긴 게시글 제목 예시입니다', writer: '홍길동', date: '2025-06-07', comments: 5 },
    // ...더 많은 게시글
]

</script>

<style></style>
