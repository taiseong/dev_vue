<template>
    <div class="main-container d-flex flex-row align-items-stretch justify-content-center">
        <!-- 가운데 영역 (헤더, 본문, 푸터) -->
        <div class="center-layout d-flex flex-column align-items-center">
            <!-- 헤더 -->
            <nav class="navbar navbar-dark bg-light header-bar mx-auto">
                <div class="w-100 d-flex align-items-center justify-content-center position-relative">
                    <button
                        class="btn d-md-none position-absolute start-0"
                        type="button"
                        style="z-index:2;"
                        @click="openSidebar"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <rect
                                y="4"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                            <rect
                                y="14"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                            <rect
                                y="24"
                                width="32"
                                height="4"
                                rx="2"
                                fill="#fff"
                            />
                        </svg>
                    </button>
                    <a
                        class="navbar-brand m-0"
                        href="#"
                        style="font-weight:bold;font-size:1.0rem;"
                    >MySite</a>
                </div>
            </nav>

            <!-- 메인 레이아웃 (레프트 메뉴+바디) -->
            <div class="content-row d-flex w-100 flex-grow-1">
                

                <!-- 바디(본문) -->
                <main class="body-content flex-grow-1 px-4 py-3">
                    {{ postId }}
                </main>
            </div>

            <!-- 푸터 -->
            <footer class="footer text-center footer-bar mx-auto">
                &copy; 2025 MySite. All rights reserved.
            </footer>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = route.params.postId
</script>

<style></style>
