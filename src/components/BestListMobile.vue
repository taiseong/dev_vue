<template>
    <div>
        <h2 class="list-title mb-3">
            추천게시물
        </h2>
        <div class="post-list-responsive mb-4">
            <div
                v-for="item in props.list"
                :key="item.id"
                class="post-table-row d-flex align-items-center px-3 py-2 border-bottom flex-wrap clickable-row"
                style="cursor:pointer;"
                @click="moveDetail(item.id)"
            >
                <div class="post-title-col flex-grow-1 d-flex align-items-center">
                    <span class="post-title text-truncate whitespace-title">
                        {{ item.title }}
                    </span>
                    <span class="badge bg-secondary rounded-pill ms-2 flex-shrink-0 reply-count">
                        {{ item.comments }} <i class="bi bi-chat-left-text ms-1" />
                    </span>
                </div>
                <div class="d-block w-100 mt-1">
                    <div class="post-meta text-muted small">
                        작성자1: {{ item.writer }} &nbsp;|&nbsp; {{ item.date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    list: Array
});
const emit = defineEmits(['moveDetail']);
function moveDetail(id) {
    emit('moveDetail', id);
}
</script>
