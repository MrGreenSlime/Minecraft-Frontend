// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
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
                    additionalData: `@import "@/assets/css/base/_vars.sass"`
                },
                sass: {
                    additionalData: `@import "@/assets/css/base/_vars.sass"`
                }
            }
        }
    }
})

