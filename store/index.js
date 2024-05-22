import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            token: null,
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = null
        },
    },
    actions: {
        login({ commit }, token) {
            commit('setToken', token)
            localStorage.setItem('token', token) // Store token in localStorage
        },
        logout({ commit }) {
            commit('clearToken')
            localStorage.removeItem('token') // Remove token from localStorage
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token
        },
    },
})

export default store
