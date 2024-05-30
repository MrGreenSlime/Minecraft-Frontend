// middleware/auth.js
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.token && to.name !== 'login') {
        return next('/login')
    }

    next()
})
