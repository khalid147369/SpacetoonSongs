export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    future: {
        compatibilityVersion: 4
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/image'
    ],
    image: {
        domains: ['res.cloudinary.com']
    },
    css: [
        '~/assets/css/tailwind.css'
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/webp',
                    href: '/favicon.png'
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL
        }
    },
    routeRules: {
        '/api/**': { proxy: 'https://spacesongsbackend.onrender.com/api/**' }
    }
})