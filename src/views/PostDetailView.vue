<template>
    <div class="main-container d-flex flex-row align-items-stretch justify-content-center">
        <!-- 가운데 영역 (헤더, 본문, 푸터) -->
        <div class="center-layout d-flex flex-column align-items-center">
            <!-- 헤더 -->
            <nav class="navbar navbar-dark bg-light header-bar mx-auto">
                <div class="w-100 d-flex align-items-center justify-content-center position-relative">
                    <button class="btn d-md-none position-absolute start-0" type="button" style="z-index:2;"
                        @click="stateStore.openSidebar">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                            <rect y="4" width="32" height="4" rx="2" fill="#fff" />
                            <rect y="14" width="32" height="4" rx="2" fill="#fff" />
                            <rect y="24" width="32" height="4" rx="2" fill="#fff" />
                        </svg>
                    </button>
                    <a class="navbar-brand m-0" href="#" style="font-weight:bold;font-size:1.0rem;">MySite</a>
                </div>
            </nav>

            <!-- 메인 레이아웃 (레프트 메뉴+바디) -->
            <div class="content-row d-flex w-100 flex-grow-1">

                <LeftMenu></LeftMenu>

                <!-- 바디(본문) -->
                <main class="body-content flex-grow-1 px-4 py-3">
                    {{ postId }}
                    <!-- 제목 -->
                    <h6 class="mt-2 mb-2">{{ data.title }}</h6>

                    <!-- 글쓴이(왼쪽) / 작성일(오른쪽) -->
                    <div class="d-flex justify-content-between mb-1">
                        <div class="small text-muted">{{ data.reg_name }}</div>
                        <div class="small text-muted">{{ data.reg_datetime }}</div>
                    </div>

                    <!-- 조회수(왼쪽) / 댓글수(오른쪽) -->
                    <div class="d-flex justify-content-between mb-1">
                        <div class="small text-muted">댓글수 {{ data.reply_count }}</div>
                        <div class="small text-muted">조회수 {{ data.view_count }}</div>
                    </div>

                    <!-- 구분선 -->
                    <hr class="mb-4">

                    <!-- 내용 -->
                    <div class="mb-4">
                        <div class="mb-2">{{ data.content }}</div>
                    </div>

                    <!-- 구분선 -->
                    <hr class="mb-4">

                    <!-- 댓글 영역 -->
                    <div class="mb-5">
                        <div class="fw-bold mb-3">댓글</div>
                        <div class="border rounded p-3">
                            <div v-for="item in replys" :key="item.reply_id">
                                <div class="mb-3" style="white-space: pre-line;">{{ item.content }}</div>
                            </div>
                            <!-- 댓글 입력창 -->
                            <div class="mb-3">
                                <textarea v-model="replyContent" ref="replyContentRef" class="form-control" rows="2" placeholder="댓글을 입력하세요"></textarea>
                                <button class="btn btn-sm btn-primary mt-2" @click="addReply">등록</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <!-- 푸터 -->
            <footer class="footer text-center footer-bar mx-auto">
                &copy; 2025 MySite. All rights reserved.
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import LeftMenu from '@/components/LeftMenu.vue'

import mockPosts from '@/mock/posts.json'
import { useStateStore } from '@/stores/useStateStore'

const stateStore = useStateStore();
const route = useRoute()
const postId = Number(route.params.postId)
const data = ref({});
const replys = ref([]);
const replyContent = ref('')
const replyContentRef = ref(null)

const fetchPost = async() => {
    let tempPosts = mockPosts;
    let tempPost = tempPosts.filter((d) => {
        return d.post_id === postId
    })
    data.value = tempPost[0] || {}
}

const fetchReply = async() => {
    replys.value = [
        {'reply_id': 1, 'content': '댓글이당1', 'reg_name': '댓글러', 'reg_datetime': new Date().toLocaleString()}, 
        {'reply_id': 2, 'content': '댓글이당2', 'reg_name': '댓글러', 'reg_datetime': new Date().toLocaleString()}, 
        {'reply_id': 3, 'content': '댓글이당3', 'reg_name': '댓글러', 'reg_datetime': new Date().toLocaleString()}, 
    ];
}

const addReply = () => {
    if(replyContent.value === ''){
        alert('내용빔')
        replyContentRef.value.focus()
        return;
    }
    const maxReplyId = replys.value.length ? Math.max(...replys.value.map(reply => reply.reply_id)) : 0;
    console.log(maxReplyId)
    replys.value.push({
        'reply_id': maxReplyId + 1, 
        'content': replyContent.value, 
        'reg_name': '댓글러', 
        'reg_datetime': new Date().toLocaleString()
    });
    replyContent.value = ''
}

onMounted(() => {
    fetchPost();
    fetchReply();
})
</script>

<style></style>
