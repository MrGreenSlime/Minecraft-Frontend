// stores/auth.js
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const token = localStorage.getItem('token');
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
        }
        return {
            token: token || null,
            user: user || null
        };
    },
    actions: {
        async login(email, password) {
            try {
                const response = await fetch('https://minecraftapi.thibeprovost.ikdoeict.be/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.token) {
                    this.token = data.token;
                    this.user = data.user;
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                    throw new Error('Invalid login');
                }
            } catch (error) {
                throw new Error('Login failed');
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});
