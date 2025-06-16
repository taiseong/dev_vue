<template>
    <div>
    <!-- 레프트 메뉴(PC: 항상, 모바일: 토글/푸시) -->
    <nav
        :class="[
            'sidebar',
            'bg-light',
            'border-end',
            'vh-100',
            'p-3',
            stateStore.isMobile && stateStore.sidebarOpen ? 'sidebar-open' : ''
        ]"
    >
        <!-- 영역1: 로고 + 설정버튼 -->
        <div class="sidebar-section d-flex align-items-center justify-content-between mb-3">
            <span
                class="sidebar-logo fw-bold"
                style="font-size:1.2rem;"
            >LOGO</span>
            <button class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-gear" /> <!-- Bootstrap Icons 사용시 -->
                설정
            </button>
        </div>
        <!-- 영역2: 로그인 버튼 -->
        <div class="sidebar-section mb-3">
            <button class="btn btn-primary w-100">
                로그인
            </button>
        </div>
        <!-- 영역3: 기존 메뉴 -->
        <ul class="nav flex-column">
            <li class="nav-item">
                <a
                    class="nav-link active"
                    href="#"
                >대시보드</a>
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                >메뉴A</a>
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                >메뉴B</a>
            </li>
        </ul>
    </nav>
    <div
                v-if="stateStore.sidebarOpen && stateStore.isMobile"
                class="offcanvas-backdrop fade show"
                style="z-index: 1040;"
                @click="closeSidebar"
            />
            </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, watch, onActivated, onDeactivated } from 'vue'
import { useStateStore } from '@/stores/useStateStore'

const stateStore = useStateStore();

const closeSidebar = () => (stateStore.sidebarOpen = false)

const handleResize = () => {
    if (!stateStore.isMobile) stateStore.sidebarOpen = false
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    stateStore.sidebarOpen = false;
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

watch(stateStore.sidebarOpen, (val) => {
  console.log('sidebarOpen 값 변경:', val, Date.now())
})
onActivated(() => {
  console.log('메뉴 활성화됨!') // 뒤로가기 등으로 다시 나타날 때마다 실행
    stateStore.sidebarOpen = false;
})
onDeactivated(() => {
  console.log('메뉴 비활성화됨!') // 상세로 이동 등으로 사라질 때 실행
    stateStore.sidebarOpen = false;
})
</script>