<template>
    <div>
        <h2 class="list-title mb-3">
            공지사항
        </h2>
        <div class="post-list-responsive mb-4">
            <!-- 테이블 헤더 -->
            <div class="post-table-header d-flex px-3 py-2 border-bottom bg-light fw-semibold">
                <div class="post-title-col flex-grow-1 text-truncate">
                    제목
                </div>
                <div class="post-writer-col text-center">
                    작성자
                </div>
                <div class="post-date-col text-center">
                    작성일
                </div>
                <div class="post-comments-col text-center">
                    댓글
                </div>
            </div>
            <div
                v-for="post in props.posts"
                :key="post.id"
                class="post-table-row d-flex align-items-center px-3 py-2 border-bottom flex-wrap"
            >
                <div class="post-title-col flex-grow-1 d-flex align-items-center">
                    <a
                        href="#"
                        class="post-title-link whitespace-title"
                        @click.prevent="onTitleClick(post.id)"
                    >
                        {{ post.title }}
                    </a>
                </div>
                <div class="post-writer-col text-center">
                    {{ post.writer }}
                </div>
                <div class="post-date-col text-center">
                    {{ post.date }}
                </div>
                <div class="post-comments-col text-center">
                    <span class="badge bg-secondary rounded-pill reply-count">
                        {{ post.comments }} <i class="bi bi-chat-left-text ms-1" />
                    </span>
                </div>
            </div>
        </div>
        <!-- 페이징 (Bootstrap 스타일) -->
        <nav aria-label="게시글 페이지네이션">
            <ul class="pagination justify-content-center mb-0">
                <li class="page-item disabled">
                    <a
                        class="page-link"
                        href="#"
                        tabindex="-1"
                    >이전</a>
                </li>
                <li class="page-item active">
                    <a
                        class="page-link"
                        href="#"
                    >1</a>
                </li>
                <li class="page-item">
                    <a
                        class="page-link"
                        href="#"
                    >2</a>
                </li>
                <li class="page-item">
                    <a
                        class="page-link"
                        href="#"
                    >3</a>
                </li>
                <li class="page-item">
                    <a
                        class="page-link"
                        href="#"
                    >다음</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
const props = defineProps({
    posts: Array
});
const emit = defineEmits(['titleClick']);
function onTitleClick(id) {
    emit('titleClick', id);
}
</script>
