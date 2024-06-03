import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null
    }),
    actions: {
        initAuth() {
            if (process.client) {
                const token = localStorage.getItem('token')
                let user = null
                try {
                    user = JSON.parse(localStorage.getItem('user'))
                } catch (error) {
                    console.error('Failed to parse user from localStorage', error)
                }
                this.token = token || null
                this.user = user || null
            }
        },
        async login(email, password) {
            try {
                const response = await fetch('https://minecraftapi.thibeprovost.ikdoeict.be/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })

                const data = await response.json()

                if (data.token) {
                    this.token = data.token
                    this.user = data.user
                    if (process.client) {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', JSON.stringify(data.user))
                    }
                } else {
                    throw new Error('Invalid login')
                }
            } catch (error) {
                throw new Error('Login failed')
            }
        },
        logout() {
            this.token = null
            this.user = null
            if (process.client) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }
    }
})
