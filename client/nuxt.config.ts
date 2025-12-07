export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    future: {
        compatibilityVersion: 4
    },
    // Add this:
    modules: ['@nuxtjs/tailwindcss'],

    // Keep your existing CSS imports here so old styles still work!
    css: [
        '~/assets/css/tailwind.css', // Tailwind first
        '~/assets/css/css.css'       // Your legacy styles second
    ]
})