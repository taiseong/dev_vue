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
                    <span v-if="item.reply_count > 0" class="badge bg-secondary rounded-pill ms-2 flex-shrink-0 reply-count">
                        {{ item.reply_count }} <i class="bi bi-chat-left-text ms-1" />
                    </span>
                </div>
                <div class="d-block w-100 mt-1">
                    <div class="post-meta text-muted small d-flex justify-content-between">
                        <span>
                            {{ codeStore.getBoardName(item.board_id) }} ({{ codeStore.getBoardType(item.board_id, item.board_type) }})<span class="separator"> | </span>조회 {{ item.view_count }}
                            <i class="bi bi-hand-thumbs-up-fill text-danger"></i>{{ item.like_count }} <i class="bi bi-hand-thumbs-down-fill text-primary"></i>{{ item.like_count }}
                        </span>
                        <span class="ms-auto">
                            {{ formatBestDatetime(item.reg_datetime) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCommonFunctions } from '@/composables/useCommonFunctions';
import { useCodeStore } from '@/stores/codeStore'

const { formatBestDatetime } = useCommonFunctions();

const codeStore = useCodeStore();
const props = defineProps({
    list: Array
});
const emit = defineEmits(['moveDetail']);
function moveDetail(id) {
    emit('moveDetail', id);
}
</script>
