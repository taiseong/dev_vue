import { defineStore } from 'pinia'

export const useClickedStore = defineStore('clicked', {
    state: () => ({
        clickedPostIds: []
    }),
    persist: true,   // 이 한 줄이면 localStorage에 자동 저장됨
    //persist: { storage: sessionStorage }
})

