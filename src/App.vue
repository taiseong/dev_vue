<template>
    <div>
        <ul>
            <li
                v-for="item in items" 
                :key="item.id" 
                style="height:200px;"
                @click="$event => {console.log(item.id)}"
            >
                {{ item.text }}
            </li>
        </ul>
        <div
            v-if="!isEnd"
            ref="loadMoreRef"
            class="loading"
        >
            더 불러오는 중...111
        </div>
    </div>
    <div />
    <br>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = ref([])
const page = ref(1)
const pageSize = 10
const isEnd = ref(false)
const loadMoreRef = ref(null)
let observer = null

// 더미 데이터 fetch 함수 (실제 API로 대체 가능)
async function fetchItems(page) {
    // 예시: 50개 데이터 중에서 10개씩 반환
    const total = 50
    const start = (page - 1) * pageSize
    //const end = start + pageSize
    if (start >= total) return []
    return Array.from({ length: Math.min(pageSize, total - start) }, (_, i) => ({
        id: start + i + 1,
        text: `아이템 ${start + i + 1}`
    }))
}

async function loadMore() {
    if (isEnd.value) return
    const newItems = await fetchItems(page.value)
    if (newItems.length < pageSize) isEnd.value = true
    items.value.push(...newItems)
    page.value += 1
}

onMounted(() => {
    loadMore() // 첫 페이지 로드

    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isEnd.value) {
            loadMore()
        }
    })
    if (loadMoreRef.value) {
        observer.observe(loadMoreRef.value)
    }
})

onUnmounted(() => {
    if (observer && loadMoreRef.value) {
        observer.unobserve(loadMoreRef.value)
    }
})
</script>

<style>
.loading {
  text-align: center;
  padding: 16px;
  color: #888;
}
</style>
