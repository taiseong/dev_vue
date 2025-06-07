<template>
    <!-- 게시글 목록 (반응형) -->
    <h2 class="list-title mb-3">공지사항</h2>
    <div class="post-list-responsive mb-4">
        <!-- PC: 테이블 헤더 -->
        <div class="post-table-header d-none d-md-flex px-3 py-2 border-bottom bg-light fw-semibold"
            style="font-size:1rem;">
            <div class="post-title-col flex-grow-1 text-truncate">제목</div>
            <div class="post-writer-col text-center">작성자</div>
            <div class="post-date-col text-center">작성일</div>
            <div class="post-comments-col text-center">댓글</div>
        </div>
        <div class="post-table-row d-flex align-items-center px-3 py-2 border-bottom flex-wrap"
            :class="{ 'clickable-row': isMobile }">
            <div class="post-title-col flex-grow-1 d-flex align-items-center">
                <a v-if="!isMobile" href="#" class="post-title-link whitespace-title"
                    @click.stop="onTitleClick(post.id)">
                    아주아주아주아주아주아주아주아주아주아주 긴 게시글 제목 예시입니다
                </a>
                <span v-else class="post-title text-truncate whitespace-title">
                    아주아주아주아주아주아주아주아주아주아주 긴 게시글 제목 예시입니다
                </span>
                <span class="badge bg-secondary rounded-pill ms-2 flex-shrink-0 d-md-none reply-count">
                    5 <i class="bi bi-chat-left-text ms-1"></i>
                </span>
            </div>
            <div class="post-writer-col text-center d-none d-md-block">홍길동</div>
            <div class="post-date-col text-center d-none d-md-block">2025-06-07</div>
            <div class="post-comments-col text-center d-none d-md-block">
                <span class="badge bg-secondary rounded-pill reply-count">
                    5 <i class="bi bi-chat-left-text ms-1"></i>
                </span>
            </div>
            <!-- 모바일용 작성자/작성일 (아래로 떨어지게) -->
            <div class="d-block d-md-none w-100 mt-1">
                <div class="post-meta text-muted small">
                    작성자: 홍길동 &nbsp;|&nbsp; 2025-06-07
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style></style>