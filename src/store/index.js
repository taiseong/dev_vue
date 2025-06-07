import { defineStore } from 'pinia'

export const useMyStore = defineStore('my', {
  state: () => ({
    clickedIds: []
  }),
  persist: true   // 이 한 줄이면 localStorage에 자동 저장됨
})

