// store/index.js
export const state = () => ({
    token: null,
    user: null
})

export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    },
    CLEAR_AUTH(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    async login({ commit }, { username, password }) {
        try {
            const { data } = await this.$axios.post('/auth/login', {
                username,
                password
            })
            commit('SET_TOKEN', data.token)
            this.$axios.setToken(data.token, 'Bearer')
        } catch (error) {
            throw new Error('Login failed')
        }
    },
    async fetchUser({ commit }) {
        try {
            const { data } = await this.$axios.get('/auth/user')
            commit('SET_USER', data)
        } catch (error) {
            commit('CLEAR_AUTH')
        }
    },
    logout({ commit }) {
        commit('CLEAR_AUTH')
        this.$axios.setToken(false)
    }
}

export const getters = {
    isAuthenticated(state) {
        return !!state.token
    },
    loggedInUser(state) {
        return state.user
    }
}
