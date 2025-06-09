import { defineStore } from 'pinia'

export const useCodeStore = defineStore('code', {
    state: () => ({
        boardId: {
            1: '정치',
            2: '젠더',
            3: '세대',
            4: '수저',
            5: '지역',
            6: '이민',
            7: '종교',
            8: '채식',
        },
        boardType: {
            1: {
                1: '파랑',
                2: '빨강',
                99: '기타',
            },
            2: {
                1: '군대',
                2: '임신',
                99: '기타',
            },
            3: {
                1: '2030',
                2: '4050',
                99: '기타',
            },
            4: {
                1: '흙',
                2: '금',
                99: '기타',
            },
            5: {
                1: '서울',
                2: '수도권',
                3: '지방',
                99: '기타',
            },
            6: {
                1: '찬',
                2: '반',
                99: '기타',
            },
            7: {
                1: '개독',
                2: '불교',
                99: '기타',
            },
            8: {
                1: '찬',
                2: '반',
                99: '기타',
            },
        }
    }),
    getters: {
        getBoardName: (state) => (boardId) => state.boardId[boardId],
        getBoardType: (state) => (boardId, boardType) => state.boardType[boardId]?.[boardType] || ''
    }
})
