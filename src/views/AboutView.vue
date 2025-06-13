<template>
  <div
    id="scroll-container"
    v-infinite-scroll="fetchPosts"
    infinite-scroll-distance="10"
    @scroll="a"
    style="overflow: auto; height: 200px; border: 1px solid red;"
  >
    <div v-for="n in 20" :key="n" style="height: 30px; border-bottom: 1px solid #eee">
      Item {{ n }}
    </div>
  </div>
</template>

<script setup>
function fetchPosts() {
  console.log('fetchPosts called');
}
function a(){
    const container = document.getElementById('scroll-container')
    console.log(container.scrollTop + container.clientHeight, container.scrollHeight - 10, container.scrollTop + container.clientHeight >= container.scrollHeight - 10)
}
</script>