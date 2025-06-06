<template>
  <div class="main-container d-flex flex-row align-items-stretch justify-content-center">
    <!-- 좌측 배너 -->
    <aside class="banner-left d-none d-md-flex align-items-center justify-content-center">
      <div class="banner-box">좌측<br>배너</div>
    </aside>

    <!-- 가운데 영역 (헤더, 본문, 푸터) -->
    <div class="center-layout d-flex flex-column align-items-center">
      <!-- 헤더 -->
      <nav class="navbar navbar-light bg-light header-bar mx-auto">
  <div class="w-100 d-flex align-items-center justify-content-center position-relative">
    <button
      class="btn btn-outline-primary d-md-none position-absolute start-0 ms-2"
      type="button"
      @click="openSidebar"
      style="z-index:2;"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand m-0" href="#" style="font-weight:bold;font-size:1.5rem;">MySite</a>
  </div>
</nav>

      <!-- 오버레이: 모바일에서만 사이드바 열릴 때 표시 -->
<div
  v-if="sidebarOpen && isMobile"
  class="offcanvas-backdrop fade show"
  @click="closeSidebar"
  style="z-index: 1040;"
></div>

      <!-- 메인 레이아웃 (레프트 메뉴+바디) -->
      <div class="content-row d-flex w-100 flex-grow-1">
        <!-- 레프트 메뉴(PC: 항상, 모바일: 토글) -->
        <!-- 레프트 메뉴(PC: 항상, 모바일: 토글/푸시) -->
<nav
  :class="[
    'sidebar',
    'bg-light',
    'border-end',
    'vh-100',
    'p-3',
    isMobile && sidebarOpen ? 'sidebar-open' : ''
  ]"
>
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
    <input
      type="text"
      class="form-control me-2"
      placeholder="검색어를 입력하세요"
      v-model="searchKeyword"
    />
    <button type="submit" class="btn btn-primary">검색</button>
  </form>
          <h1>메인 컨텐츠</h1>
          <p>여기에 본문 내용이 들어갑니다.</p>
        </main>
      </div>

      <!-- 푸터 -->
      <footer class="footer bg-dark text-white text-center footer-bar mx-auto">
        &copy; 2025 MySite. All rights reserved.
      </footer>
    </div>

    <!-- 우측 배너 -->
    <aside class="banner-right d-none d-md-flex align-items-center justify-content-center">
      <div class="banner-box">우측<br>배너</div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
</script>

<style>
html, body {
  height: 100%;
  min-height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background: #f8f9fa;
}
.main-container {
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  box-shadow: 0 0 8px rgba(0,0,0,0.04);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
}
.center-layout {
  width: 1024px; /* 1024 - 100 - 100 */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-bar, .footer-bar {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-bar .navbar-brand {
  margin: 0 auto;
  left: 0; right: 0;
  text-align: center;
}
.header-bar {
  min-height: 60px;
  height: 60px;
  background: #fff;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  margin-bottom: 0;
}
.footer-bar {
  min-height: 48px;
  height: 48px;
  background: #222;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  margin-bottom: 24px;
  margin-top: 0;
  font-size: 0.95rem;
  color: #fff;
}
.content-row {
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}
.banner-left, .banner-right {
  width: 100px;
  min-width: 100px;
  background: #f1f3f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 배너가 전체 세로를 채우게 */
}
.banner-box {
  width: 80px;
  height: 250px;
  background: #e9ecef;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sidebar {
  min-width: 160px;
  max-width: 160px;
  height: 100%;
  background: #f8f9fa;
  z-index: 1050;
}
.sidebar-section {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}
.sidebar-section:last-child {
  border-bottom: none;
}
.sidebar-logo {
  letter-spacing: 1px;
}
.body-content {
  min-width: 0;
  background: #fff;
  flex-grow: 1;
}
.search-bar input {
  max-width: 100vw;
}
.footer {
  flex-shrink: 0;
}
@media (max-width: 1024px) {
  .main-container, .center-layout {
    max-width: 100vw !important;
    width: 100vw !important;
    min-width: 0;
  }
  .center-layout {
    width: 100vw !important;
  }
}
@media (max-width: 767.98px) {
  .header-bar, .footer-bar {
    width: 100vw !important;
    min-width: 0;
    border-radius: 0;
    padding: 0 8px;
  }
  .banner-left, .banner-right {
    display: none !important;
  }
  .content-row {
    flex-direction: column;
    max-width: 100vw !important;
    width: 100vw !important;
  }
  .body-content {
    width: 100vw !important; 
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .center-layout {
    width: 100vw !important;
    min-width: 0;
  }
  .sidebar {
    position: fixed !important;
    left: 0;
    top: 0;
    z-index: 1050;
    height: 100vh;
    max-width: 80vw;
    width: 400px;
    background: #fff;
    box-shadow: 2px 0 8px rgba(0,0,0,0.08);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    transform: translateX(-100%);
    /* 항상 렌더링, 기본은 숨김 */
  }
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
}
</style>
