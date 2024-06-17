
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt'
    ],
    devtools: { enabled: true },
    router: {
        middleware: ['auth']
    },
    css: [
        '@/assets/css/main.sass'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/css/base/_vars.scss"`
                },
                sass: {
                    additionalData: `@import "@/assets/css/base/_vars.sass"`
                }
            }
        }
    },
    plugins: [
        '~/plugins/initAuth.js'
    ]
})
