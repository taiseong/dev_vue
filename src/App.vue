<template>
<<<<<<< HEAD
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
=======
    <router-link to="/">홈</router-link>
>>>>>>> 80a1b01834c9a832519de1b1807f340d1133deee
    <br>
    <router-link to="/about">소개</router-link>
    <router-view></router-view>
</template>

<script setup>

</script>

<style>

</style>
