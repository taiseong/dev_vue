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
            <nav class="navbar navbar-dark bg-light header-bar mx-auto">
                <div class="w-100 d-flex align-items-center justify-content-center position-relative">
                    <button
                        class="btn d-md-none position-absolute start-0"
                        type="button"
                        style="z-index:2;"
                        @click="openSidebar"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <rect
                                y="4"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                            <rect
                                y="14"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                            <rect
                                y="24"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                        </svg>
                    </button>
                    <a
                        class="navbar-brand m-0"
                        href="#"
                        style="font-weight:bold;font-size:1.0rem;"
                    >MySite</a>
                </div>
            </nav>

            <!-- 오버레이: 모바일에서만 사이드바 열릴 때 표시 -->
            <div
                v-if="sidebarOpen && isMobile"
                class="offcanvas-backdrop fade show"
                style="z-index: 1040;"
                @click="closeSidebar"
            />

            <!-- 메인 레이아웃 (레프트 메뉴+바디) -->
            <div class="content-row d-flex w-100 flex-grow-1">
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

                <!-- 바디(본문) -->
                <main class="body-content flex-grow-1 px-4 py-3">
                    <!-- 검색 영역 -->
                    <form
                        class="search-bar mb-4 d-flex"
                        @submit.prevent
                    >
                        <div class="position-relative w-100">
  <input
    v-model="searchKeyword"
    type="text"
    class="form-control"  
    placeholder="검색어를 입력하세요"
    aria-label="검색"
  >
  <i
    class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
    style="cursor: pointer;"
    @click="검색함수"
  ></i>
</div>
                    </form>

                    <BestListMobile
                        :list="posts"
                        @clickItem="moveDetail"
                    />
                    <div ref="sentinel">{{ sentinelText }}</div>

                    <button @click="fetchPosts">더보기</button>
                    
                </main>
            </div>

            <!-- 푸터 -->
            <footer class="footer text-center footer-bar mx-auto">
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
import { ref, onMounted, onBeforeUnmount, onUpdated, watch } from 'vue'
import { useRouter } from 'vue-router'
import BestListMobile from '@/components/BestListMobile.vue'
//import PostListPc from '@/components/PostListPc.vue'
//import PostListMobile from '@/components/PostListMobile.vue'

//import { useCodeStore } from '@/stores/codeStore'
//import { useCommonFunctions } from '@/composables/useCommonFunctions';
import mockPosts from '@/mock/posts.json'
//import { faker, Faker, ko } from '@faker-js/faker'

//const codeStore = useCodeStore();
//const { getRandomPastDate } = useCommonFunctions();

const router = useRouter()
const posts = ref([])
const pageNum = ref(1)
const pageSize = 20;
const sentinel = ref(null)
const sentinelText = ref('로딩중...')
const isLoading = ref(false)
const hasMore = ref(true)
let observer
const sidebarOpen = ref(false)
const isMobile = ref(window.innerWidth < 768)
const searchKeyword = ref('')

const handleResize = () => {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) sidebarOpen.value = false
}

onMounted(() => {
    console.log('onMounted')
    window.addEventListener('resize', handleResize)
    //fetchPosts();
    observer = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting && hasMore.value){
            fetchPosts();
        }
    },{
        root: null,
        threshold: 1.0
    })
    if(sentinel.value){
        observer.observe(sentinel.value)
    }
})
onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
    window.removeEventListener('resize', handleResize)
    if(observer && sentinel.value){
        observer.unobserve(sentinel.value)
    }
})
onUpdated(() => {
    console.log('onUpdated')
})

const openSidebar = () => {
    console.log('openSidebar 클릭됨', Date.now())
    sidebarOpen.value = true
}
const closeSidebar = () => (sidebarOpen.value = false)

watch(sidebarOpen, (val) => {
  console.log('sidebarOpen 값 변경:', val, Date.now())
})
document.addEventListener('touchstart', () => {
  console.time('touch-click delay');
});
document.addEventListener('click', () => {
  console.timeEnd('touch-click delay');
});
const fetchPosts = async () => {
    console.log('fetchPosts')
    if(isLoading.value || !hasMore.value){
        return;
    }
    isLoading.value = true;
    await setTimeout(()=>{}, 1000) // 로딩 딜레이 흉내
    try{
        const response = await fetch('https://api.example.com/posts');
        if(!response.ok){
            throw new Error('error fetch 1')
        }
        posts.value = await response.json();
    } catch(error) {
        console.error('error fetch 2', error);

        let tempPosts = mockPosts;
        tempPosts.sort((a, b) => b.view_count - a.view_count)
        tempPosts = tempPosts.slice(pageNum.value * pageSize, (pageNum.value * pageSize) + pageSize);
        tempPosts.sort((a, b) => new Date(b.reg_datetime) - new Date(a.reg_datetime))
        console.log(tempPosts)
        posts.value.push(...tempPosts);
        pageNum.value++;
        console.log(posts.value)

        if (pageNum.value > 5){
            sentinelText.value = '마지막이당';
            hasMore.value = false;
        }
        /*
        const now = new Date()
        const fakerKO = new Faker({ locale: [ko] })
        const boardIds = Object.keys(codeStore.boardId).map(Number);
        const postLength = 1000;
        posts.value = Array.from({ length: postLength }, (_, i) => {
            const boardId = boardIds[Math.floor(Math.random() * boardIds.length)];
            const boardTypes = Object.keys(codeStore.boardType[boardId]).map(Number);
            const boardType = boardTypes[Math.floor(Math.random() * boardTypes.length)];
            const regDatetime = getRandomPastDate(now, 1, 120, i)
            return {
                post_id: postLength - i,
                board_id: boardId,
                board_type: boardType,
                title: fakerKO.lorem.sentence({min:1, max:6}),
                content: fakerKO.lorem.paragraph(),
                like_count: faker.number.int({ min: 0, max: 20 }),
                dislike_count: faker.number.int({ min: 0, max: 20 }),
                view_count: faker.number.int({ min: 0, max: 1000 }),
                reply_count: faker.number.int({ min: 0, max: 12 }),
                reg_name: fakerKO.person.lastName() + fakerKO.person.firstName(),
                reg_datetime: regDatetime.toISOString()
                .replace('T', ' ')
                .slice(0, 19)
            }
        })
        //posts.value.sort((a, b) => new Date(b.reg_datetime) - new Date(a.reg_datetime))
        console.log(posts.value)
        */
    }
    isLoading.value = false
}


function moveDetail(postId) {
    // 상세 페이지 이동 로직
    //alert('상세 페이지 이동: ' + postId111111222111)
    router.push({ name: 'postDetail', params: { postId } })
}




</script>

<style>
.loading {
  text-align: center;
  padding: 16px;
  color: #888;
}
</style>
