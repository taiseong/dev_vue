<template>
    <div>
        <h2 class="list-title">
            추천게시물
        </h2>
        <div class="post-list-responsive mb-4">
            <div
                v-for="item in props.list"
                :key="item.post_id"
                class="post-table-row d-flex align-items-center py-1 border-bottom flex-wrap clickable-row"
                style="cursor:pointer;"
                @click="clickItem(item.post_id)"
            >
                <div class="post-title-col flex-grow-1 d-flex align-items-center">

                    <span 
                        class="post-title text-truncate whitespace-title" 
                        :class="{clicked: clickedStore.clickedPostIds.includes(item.post_id)}"
                    >
                        {{ item.title }}
                    </span>
                    <span 
                        v-if="item.reply_count > 0" 
                        class="badge bg-secondary rounded-pill ms-2 flex-shrink-0 reply-count"
                    >
                        {{ item.reply_count }} <i class="bi bi-chat-left-text ms-1" />
                    </span>
                </div>
                <div class="d-block w-100 mt-1">
                    <div class="post-meta text-muted small d-flex justify-content-between">
                        <span>
                            {{ codeStore.getBoardName(item.board_id) }} <span class="separator"> | </span> {{ codeStore.getBoardType(item.board_id, item.board_type) }} <span class="separator"> | </span>조회 {{ item.view_count }}
                            <i class="bi bi-hand-thumbs-up-fill text-danger" />{{ item.like_count }} <i class="bi bi-hand-thumbs-down-fill text-primary" />{{ item.like_count }}
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
import { formatBestDatetime } from '@/utils/commonUtil';
import { useCodeStore } from '@/stores/useCodeStore'
import { useClickedStore } from '@/stores/useClickedStore'

const codeStore = useCodeStore();
const clickedStore = useClickedStore();
const props = defineProps({
    list: Array
});
const emit = defineEmits(['clickItem']);
function clickItem(postId) {
    if(!clickedStore.clickedPostIds.includes(postId)){
        clickedStore.clickedPostIds.push(postId);
    }
    emit('clickItem', postId);
}
</script>
