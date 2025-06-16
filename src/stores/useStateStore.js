import { defineStore } from 'pinia'

export const useStateStore = defineStore('states', {
    state: () => ({
        isMobile: window.innerWidth < 768,
        sidebarOpen: false
    }),
    actions: {
        openSidebar() {
            console.log('openSidebar 클릭됨', Date.now())
            this.sidebarOpen = true
        }
    }
    //persist: { storage: sessionStorage }
})