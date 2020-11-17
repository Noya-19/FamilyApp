import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        chores: [],
        events: []
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        },
        setChores (state, chores) {
            state.chores = chores
        },
        setEvents (state, events) {
            state.events = events
        }
    },
    actions: {
        // invoke actions from Vue components
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        },
        setChores ({commit}, chores) {
            commit('setChores', chores)
        },
        setEvents ({commit}, events) {
            commit('setEvents', events)
        }
    },
    getters: {
        getChores: state => {
            return state.chores
        },
        getEvents: state => {
            return state.events
        },
    }
})