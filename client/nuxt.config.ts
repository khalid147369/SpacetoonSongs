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
      provider: 'ipx', 
        format: ['webp'],
      providers: {
         cloudinary: {
          baseURL: 'https://res.cloudinary.com/dwxkdvgxk/image/upload/'
         }
     },
 
  format: ['webp', 'avif', 'png', 'jpeg'],
},
    css: [
        '~/assets/css/tailwind.css'
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '48x48',
                    href: '/favicon-48.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '96x96',
                    href: '/favicon-96.png'
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png'
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
