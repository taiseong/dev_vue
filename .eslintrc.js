module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-recommended', // Vue 3용 추천 규칙
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module', // import/export 사용 필수
    },
    plugins: [
        'import',
        'node',
        'promise',
        'standard',
    ],
    rules: {
        // 커스텀 규칙 추가
        'vue/html-indent': ['warn', 4], // Vue 템플릿 들여쓰기 4칸
        'indent': ['warn', 4] // JS/TS 들여쓰기 4칸
    }
};