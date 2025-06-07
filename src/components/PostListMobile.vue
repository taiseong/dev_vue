<template>
    <div>
        <h2 class="list-title mb-3">공지사항</h2>
        <div class="post-list-responsive mb-4">
            <div v-for="post in props.posts" :key="post.id"
                class="post-table-row d-flex align-items-center px-3 py-2 border-bottom flex-wrap clickable-row"
                @click="onRowClick(post.id)" style="cursor:pointer;">
                <div class="post-title-col flex-grow-1 d-flex align-items-center">
                    <span class="post-title text-truncate whitespace-title">
                        {{ post.title }}
                    </span>
                    <span class="badge bg-secondary rounded-pill ms-2 flex-shrink-0 reply-count">
                        {{ post.comments }} <i class="bi bi-chat-left-text ms-1"></i>
                    </span>
                </div>
                <!-- 작성자/작성일은 아래에 노출 -->
                <div class="d-block w-100 mt-1">
                    <div class="post-meta text-muted small">
                        작성자1: {{ post.writer }} &nbsp;|&nbsp; {{ post.date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    posts: Array
});
const emit = defineEmits(['rowClick']);
function onRowClick(id) {
    emit('rowClick', id);
}
</script>
