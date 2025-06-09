//import { computed } from 'vue'
//import { useCodeStore } from '@/stores/codeStore'

export function useCommonFunctions() {
    //const codeStore = useCodeStore()

    const formatBestDatetime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffMins < 60) {
            // 1시간 이내
            return `${diffMins}분 전`;
        } else if (diffHours < 24) {
            // 24시간 이내
            return `${diffHours}시간 전`;
        } else {
            // 24시간 초과
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const currentYear = now.getFullYear();

            // 올해면 mm-dd, 올해 이전이면 yy-mm-dd
            if (year === currentYear) {
                return `${month}.${day}`;
            } else {
                // 연도 끝 두자리만 표시 (yy-mm-dd)
                const shortYear = String(year).slice(-2);
                return `${shortYear}.${month}.${day}`;
            }
        }
    };

    const formatPostDatetime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);

        // 오늘인지 확인: 년/월/일이 모두 같으면 오늘
        const isToday =
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate();

        if (isToday) {
            // 오늘: HH:MM
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const currentYear = now.getFullYear();

            if (year === currentYear) {
                // 올해지만 오늘은 아님: MM.DD
                return `${month}.${day}`;
            } else {
                // 올해가 아님: YY.MM.DD
                const shortYear = String(year).slice(-2);
                return `${shortYear}.${month}.${day}`;
            }
        }
    };

    return { formatBestDatetime, formatPostDatetime };
}